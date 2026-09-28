const { REPORT_LAYOUT_VERSION } = require("./report-layout");
const areaHierarchy = require("../assets/area-hierarchy");

async function enqueueIndividualMonthlyAuditReport(db, audit, requestedByUserId) {
  const currentReport = await db.query(
    `select r.* from reports r
     where r.area_id=$1 and r.cycle_id=$2 and r.report_type='monthly'
       and r.status='generated' and r.pdf_file_id is not null
       and r.file_url is not null and r.file_name like $3
     order by r.created_at desc limit 1`,
    [audit.area_id, audit.cycle_id, `%-${REPORT_LAYOUT_VERSION}.pdf`]
  );
  if (currentReport.rows[0]) return { status: "completed", report_id: currentReport.rows[0].id, current: true };

  const existing = await db.query(
    `select * from report_generation_jobs
     where area_id=$1 and cycle_id=$2 and report_type='monthly'
     order by created_at desc limit 1`,
    [audit.area_id, audit.cycle_id]
  );
  if (["queued", "processing"].includes(existing.rows[0]?.status)) return existing.rows[0];

  if (existing.rows[0]) {
    const reopened = await db.query(
      `update report_generation_jobs
          set status='queued', attempts=0, claim_token=null, lease_expires_at=null,
              report_id=null, error_message=null, started_at=null, finished_at=null,
              requested_by_user_id=$2, payload=$3::jsonb, updated_at=now()
        where id=$1 returning *`,
      [existing.rows[0].id, requestedByUserId || audit.auditor_user_id,
        JSON.stringify({ auditId: audit.id, source: "report_reconciliation" })]
    );
    return reopened.rows[0];
  }

  const created = await db.query(
    `insert into report_generation_jobs
       (unit_id,area_id,cycle_id,requested_by_user_id,report_type,status,payload)
     values ($1,$2,$3,$4,'monthly','queued',$5::jsonb)
     returning *`,
    [audit.unit_id, audit.area_id, audit.cycle_id, requestedByUserId || audit.auditor_user_id,
      JSON.stringify({ auditId: audit.id, source: "audit_finalization" })]
  );
  return created.rows[0];
}

async function enqueueOrganizationMonthlyReport(db, audit, requestedByUserId) {
  const areaResult = await db.query("select slug from audit_areas where id=$1 and unit_id=$2", [audit.area_id, audit.unit_id]);
  const areaSlug = areaResult.rows?.[0]?.slug;
  const group = areaHierarchy.groupForSubarea(areaSlug);
  if (!group) return null;

  const payload = {
    auditId: audit.id,
    source: "audit_finalization",
    scopeType: "organization_area",
    scopeKey: group.id,
    scopeName: group.name,
    areaSlugs: group.subareaIds
  };
  const currentReport = await db.query(
    `select * from reports
      where unit_id=$1 and cycle_id=$2 and report_type='general'
        and scope_type='organization_area' and scope_key=$3
        and status='generated' and pdf_file_id is not null and file_url is not null
        and created_at>=coalesce($4::timestamptz,created_at)
      order by created_at desc limit 1`,
    [audit.unit_id, audit.cycle_id, group.id, audit.finished_at || null]
  );
  if (currentReport.rows?.[0]) return { status: "completed", report_id: currentReport.rows[0].id, current: true };
  const existing = await db.query(
    `select * from report_generation_jobs
      where unit_id=$1 and cycle_id=$2 and report_type='general'
        and payload->>'scopeType'='organization_area'
        and payload->>'scopeKey'=$3
      order by created_at desc limit 1`,
    [audit.unit_id, audit.cycle_id, group.id]
  );
  if (existing.rows?.[0]?.status === "queued") {
    const refreshed = await db.query(
      `update report_generation_jobs
          set area_id=$2,requested_by_user_id=$3,payload=$4::jsonb,updated_at=now()
        where id=$1 returning *`,
      [existing.rows[0].id, audit.area_id, requestedByUserId || audit.auditor_user_id, JSON.stringify(payload)]
    );
    return refreshed.rows[0];
  }
  // A second completion may arrive while the first consolidated PDF is rendering.
  // Queue a successor instead of treating the in-flight file as current.
  if (existing.rows?.[0]?.status === "processing") {
    const successor = await db.query(
      `insert into report_generation_jobs
         (unit_id,area_id,cycle_id,requested_by_user_id,report_type,status,payload)
       values ($1,$2,$3,$4,'general','queued',$5::jsonb)
       returning *`,
      [audit.unit_id, audit.area_id, audit.cycle_id, requestedByUserId || audit.auditor_user_id, JSON.stringify(payload)]
    );
    return successor.rows[0];
  }
  if (existing.rows?.[0]) {
    const reopened = await db.query(
      `update report_generation_jobs
          set area_id=$2,status='queued',attempts=0,claim_token=null,lease_expires_at=null,
              report_id=null,error_message=null,started_at=null,finished_at=null,
              requested_by_user_id=$3,payload=$4::jsonb,updated_at=now()
        where id=$1 returning *`,
      [existing.rows[0].id, audit.area_id, requestedByUserId || audit.auditor_user_id, JSON.stringify(payload)]
    );
    return reopened.rows[0];
  }
  const created = await db.query(
    `insert into report_generation_jobs
       (unit_id,area_id,cycle_id,requested_by_user_id,report_type,status,payload)
     values ($1,$2,$3,$4,'general','queued',$5::jsonb)
     returning *`,
    [audit.unit_id, audit.area_id, audit.cycle_id, requestedByUserId || audit.auditor_user_id, JSON.stringify(payload)]
  );
  return created.rows[0];
}

async function enqueueMonthlyAuditReport(db, audit, requestedByUserId) {
  const individual = await enqueueIndividualMonthlyAuditReport(db, audit, requestedByUserId);
  await enqueueOrganizationMonthlyReport(db, audit, requestedByUserId);
  return individual;
}

async function reconcileFinishedAuditReports(db) {
  const missing = await db.query(
    `select distinct on (a.area_id,a.cycle_id) a.*
       from audits a
      where a.status='finished'
        and not exists (
          select 1 from reports r
           where r.area_id=a.area_id and r.cycle_id=a.cycle_id
             and r.report_type='monthly' and r.status='generated'
             and r.pdf_file_id is not null and r.file_url is not null
             and r.file_name like $1
        )
      order by a.area_id,a.cycle_id,a.finished_at desc nulls last,a.created_at desc`,
    [`%-${REPORT_LAYOUT_VERSION}.pdf`]
  );
  const jobs = [];
  for (const audit of missing.rows) jobs.push(await enqueueIndividualMonthlyAuditReport(db, audit, audit.auditor_user_id));
  const latestFinished = await db.query(
    `select distinct on (a.area_id,a.cycle_id) a.*
       from audits a
      where a.status='finished'
      order by a.area_id,a.cycle_id,a.finished_at desc nulls last,a.created_at desc`
  );
  for (const audit of latestFinished.rows) {
    const organizationJob = await enqueueOrganizationMonthlyReport(db, audit, audit.auditor_user_id);
    if (organizationJob) jobs.push(organizationJob);
  }
  return jobs;
}

async function validateAuditReadyToFinalize(db, audit) {
  const counts = await db.query(
    `select
       (select count(*)::int
          from checklist_questions q
          join checklist_blocks b on b.id=q.block_id
         where b.checklist_id=$1 and b.active=true and q.active=true) as expected,
       (select count(*)::int from audit_answers aa where aa.audit_id=$2) as answered,
       (select count(*)::int
          from audit_answers aa
          join checklist_questions q on q.id=aa.question_id
         where aa.audit_id=$2 and aa.answer='NC' and q.required_evidence_on_nc=true
           and not exists (
             select 1 from file_links fl
              where fl.entity_type='audit_answer' and fl.entity_id=aa.id
           )) as nc_without_evidence`,
    [audit.checklist_id, audit.id]
  );
  const summary = counts.rows[0];
  if (!summary || summary.expected === 0) throw new Error("Checklist sem perguntas ativas.");
  if (summary.answered !== summary.expected) {
    throw new Error(`Sincronizacao incompleta: ${summary.answered} de ${summary.expected} respostas chegaram ao servidor.`);
  }
  if (summary.nc_without_evidence > 0) {
    throw new Error(`${summary.nc_without_evidence} nao conformidade(s) ainda aguardam o envio da foto.`);
  }
  return summary;
}

module.exports = { enqueueMonthlyAuditReport, enqueueOrganizationMonthlyReport, reconcileFinishedAuditReports, validateAuditReadyToFinalize };
