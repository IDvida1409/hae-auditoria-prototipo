const crypto = require("node:crypto");
const { notify } = require("./notifications");

function publicCode() {
  return `PA-${new Date().getUTCFullYear()}-${crypto.randomBytes(4).toString("hex").toUpperCase()}`;
}

async function generateForAudit(db, audit, options = {}) {
  const existing = await db.query(
    "select * from action_plan_documents where origin_audit_id=$1 order by created_at desc limit 1",
    [audit.id]
  );
  if (existing.rows[0]) {
    const plans = await db.query("select * from action_plans where action_plan_document_id=$1 order by created_at", [existing.rows[0].id]);
    return { document: existing.rows[0], actionPlans: plans.rows, created: false };
  }

  const ncAnswers = await db.query(
    `select aa.id as answer_id,aa.question_id,aa.notes,cq.requirement_text,cq.risk_level,aa.risk_level_snapshot,
       coalesce(array_agg(fl.file_id) filter (where fl.file_id is not null),'{}'::uuid[]) as evidence_file_ids
     from audit_answers aa
     join checklist_questions cq on cq.id=aa.question_id
     left join file_links fl on fl.entity_type='audit_answer' and fl.entity_id=aa.id
     where aa.audit_id=$1 and aa.answer='NC'
     group by aa.id,cq.id
     order by cq.question_number`,
    [audit.id]
  );
  if (!ncAnswers.rows.length) return { document: null, actionPlans: [], created: false };

  const context = await db.query(
    `select a.name as area_name,
       coalesce(a.responsible_user_id,(
         select p.user_id
         from user_area_permissions p
         join app_users u on u.id=p.user_id
         where p.area_id=a.id and p.unit_id=a.unit_id and p.active=true and u.active=true and u.role='area_responsible'
         order by p.created_at,p.id limit 1
       )) as responsible_user_id,
       coalesce(s.action_plan_due_days,d.action_plan_due_days,30) as due_days,
       coalesce(s.require_evidence_photo,d.require_evidence_photo,true) as require_photo
     from audit_areas a
     left join audit_workflow_settings s on s.area_id=a.id and s.active=true
     left join audit_workflow_settings d on d.unit_id=a.unit_id and d.area_id is null and d.active=true
     where a.id=$1`,
    [audit.area_id]
  );
  const config = context.rows[0];
  if (!config) throw new Error("Area da auditoria nao encontrada.");

  const generationMode = options.generationMode === "automatic" ? "automatic" : "automatic_reviewed";
  const available = generationMode === "automatic";
  const documentStatus = available ? "available_to_responsible" : "under_auditor_review";
  const planStatus = available ? "available_to_responsible" : "under_auditor_review";
  const dueDays = Number(options.dueDays || config.due_days || 30);
  const dueAt = new Date(Date.now() + dueDays * 86400000).toISOString();
  const documentResult = await db.query(
    `insert into action_plan_documents
       (public_code,unit_id,area_id,subarea_id,origin_audit_id,created_by_user_id,assigned_to_user_id,generation_mode,
        title,summary,complementary_instructions,locked_snapshot,due_at,status,generated_at,sent_to_responsible_at)
     values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12::jsonb,$13,$14,now(),case when $15 then now() else null end)
     returning *`,
    [publicCode(), audit.unit_id, audit.area_id, audit.subarea_id, audit.id, audit.auditor_user_id,
      config.responsible_user_id, generationMode, `Plano de ação - ${config.area_name}`,
      `${ncAnswers.rows.length} não conformidade(s) identificada(s) na auditoria.`,
      "Responda cada item, anexe a evidência da correção e solicite novo prazo somente quando necessário.",
      JSON.stringify({ auditId: audit.id, areaName: config.area_name, generatedAt: new Date().toISOString() }),
      dueAt, documentStatus, available]
  );
  const document = documentResult.rows[0];
  const actionPlans = [];

  for (const [index, nc] of ncAnswers.rows.entries()) {
    const correction = options.defaultCorrection || "Corrigir a não conformidade e anexar evidência da ação realizada.";
    const planResult = await db.query(
      `insert into action_plans
        (unit_id,area_id,subarea_id,origin_audit_id,origin_answer_id,question_id,generated_cycle_id,created_by_user_id,
         assigned_to_user_id,action_plan_document_id,title,problem_description,corrective_action,due_at,status,creation_source,
         automatic_correction_text,locked_question_snapshot,locked_risk_snapshot,locked_audit_notes_snapshot,
         locked_original_evidence_file_ids,sent_to_responsible_at)
       values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,'audit_nc',$13,$12,$16,$17,$18,
         case when $19 then now() else null end)
       on conflict (origin_answer_id) where origin_answer_id is not null do update set updated_at=now()
       returning *`,
      [audit.unit_id, audit.area_id, audit.subarea_id, audit.id, nc.answer_id, nc.question_id, audit.cycle_id,
        audit.auditor_user_id, config.responsible_user_id, document.id,
        `NC ${index + 1} - ${String(nc.requirement_text).slice(0, 80)}`, nc.requirement_text, correction,
        dueAt, planStatus, nc.risk_level_snapshot || nc.risk_level, nc.notes || null, nc.evidence_file_ids, available]
    );
    const plan = planResult.rows[0];
    actionPlans.push(plan);
    await db.query(
      `insert into action_plan_document_items
        (action_plan_document_id,action_plan_id,audit_answer_id,item_order,question_text,risk_level,nonconformity_description,
         required_correction,evidence_file_ids,response_photo_required,auditor_notes,metadata)
       values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12::jsonb)
       on conflict (action_plan_document_id,item_order) do update set action_plan_id=excluded.action_plan_id,updated_at=now()`,
      [document.id, plan.id, nc.answer_id, index + 1, nc.requirement_text, nc.risk_level_snapshot || nc.risk_level,
        nc.notes || nc.requirement_text, correction, nc.evidence_file_ids, Boolean(config.require_photo), nc.notes || null,
        JSON.stringify({ questionId: nc.question_id })]
    );
    await db.query(
      "insert into action_plan_timeline_events (action_plan_id,actor_user_id,event_type,title,detail) values ($1,$2,'generated',$3,$4)",
      [plan.id, audit.auditor_user_id, "Plano gerado", `Item ${index + 1} incluído no documento ${document.public_code}.`]
    );
  }

  if (available && config.responsible_user_id) {
    await notify(db, {
      unitId: audit.unit_id,
      recipientId: config.responsible_user_id,
      title: `Plano de ação disponível - ${config.area_name}`,
      body: `${ncAnswers.rows.length} item(ns) aguardam ciência e devolutiva.`,
      type: "action_plan_assigned",
      entityType: "action_plan_document",
      entityId: document.id,
      key: `action-plan-document:${document.id}`
    });
  }
  return { document, actionPlans, created: true };
}

module.exports = { generateForAudit };
