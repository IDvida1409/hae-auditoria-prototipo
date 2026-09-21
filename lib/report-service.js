async function enqueueMonthlyAuditReport(db, audit, requestedByUserId) {
  const existing = await db.query(
    `select * from report_generation_jobs
     where area_id=$1 and cycle_id=$2 and report_type='monthly'
       and status in ('queued','processing','completed')
     order by created_at desc limit 1`,
    [audit.area_id, audit.cycle_id]
  );
  if (existing.rows[0]) return existing.rows[0];

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

module.exports = { enqueueMonthlyAuditReport, validateAuditReadyToFinalize };
