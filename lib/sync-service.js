const handlers = new Set(["audit:create", "audit:finalize", "audit_answer:upsert", "audit_answer:update", "stored_file:upload", "action_plan_feedback:create"]);
const { notify } = require("./notifications");
const actionPlanService = require("./action-plan-service");
const { enqueueMonthlyAuditReport, validateAuditReadyToFinalize } = require("./report-service");

function validateOperation(operation) {
  if (!operation || typeof operation.clientOperationId !== "string" || operation.clientOperationId.length > 200) {
    throw new Error("clientOperationId invalido");
  }
  if (!operation.clientOperationId.trim()) throw new Error("clientOperationId obrigatorio");
  if (!handlers.has(operation.entityType + ":" + operation.operation)) throw new Error("Operacao offline nao suportada");
  if (!operation.payload || typeof operation.payload !== "object" || Array.isArray(operation.payload)) throw new Error("payload invalido");
  if (operation.clientSequence != null && (!Number.isSafeInteger(operation.clientSequence) || operation.clientSequence < 1)) throw new Error("clientSequence invalido");
  if (operation.dependsOn != null && (!Array.isArray(operation.dependsOn) || operation.dependsOn.some((id) => typeof id !== "string" || id === operation.clientOperationId))) throw new Error("dependsOn invalido");
}

async function deviceFor(db, user, deviceUid) {
  if (typeof deviceUid !== "string" || !deviceUid.trim() || deviceUid.length > 200) throw new Error("deviceUid obrigatorio");
  const result = await db.query(
    "insert into mobile_devices (device_uid, user_id, last_seen_at) values ($1, $2, now()) on conflict (device_uid) do update set last_seen_at = now() returning *",
    [deviceUid, user.id]
  );
  if (result.rows[0].user_id !== user.id) throw new Error("Dispositivo pertence a outro usuario");
  return result.rows[0];
}

async function enqueue(pool, user, device, operations) {
  if (!Array.isArray(operations) || !operations.length || operations.length > 100) throw new Error("Envie de 1 a 100 operacoes");
  operations.forEach(validateOperation);
  const client = await pool.connect();
  try {
    await client.query("begin");
    const saved = [];
    for (const op of operations) {
      const existing = await client.query("select * from sync_queue where client_operation_id = $1", [op.clientOperationId]);
      if (existing.rows[0]) {
        const row = existing.rows[0];
        if (row.user_id !== user.id || row.device_id !== device.id) throw new Error("Identificador de operacao ja utilizado");
        if (row.entity_type !== op.entityType || row.operation !== op.operation ||
            JSON.stringify(canonical(row.payload)) !== JSON.stringify(canonical(op.payload))) throw new Error("Operacao reenviada com dados diferentes");
        saved.push(row);
        continue;
      }
      const result = await client.query(
        "insert into sync_queue (user_id, device_id, client_operation_id, entity_type, operation, payload, client_sequence, depends_on) values ($1,$2,$3,$4,$5,$6::jsonb,$7,$8) on conflict (client_operation_id) do nothing returning *",
        [user.id, device.id, op.clientOperationId, op.entityType, op.operation, JSON.stringify(op.payload), op.clientSequence || null, op.dependsOn || []]
      );
      if (!result.rows.length) throw new Error("Envio concorrente; repita a sincronizacao");
      saved.push(result.rows[0]);
    }
    await client.query("commit");
    return saved;
  } catch (error) {
    await client.query("rollback");
    throw error;
  } finally { client.release(); }
}

function canonical(value) {
  if (Array.isArray(value)) return value.map(canonical);
  if (value && typeof value === "object") return Object.fromEntries(Object.keys(value).sort().map((key) => [key, canonical(value[key])]));
  return value;
}

async function auditFor(db, op, payload) {
  const result = await db.query(
    "select a.* from audits a where a.auditor_user_id = $1 and ((a.id::text = $2) or (a.device_id = $3 and a.local_audit_id = $4)) for update",
    [op.user_id, payload.auditId || "", op.device_id, payload.localAuditId || ""]
  );
  if (!result.rows[0]) throw new Error("Auditoria nao encontrada; sincronize sua criacao primeiro");
  return result.rows[0];
}

async function applyOperation(db, op) {
  const p = op.payload;
  if (op.entity_type === "audit" && op.operation === "create") {
    if (!p.localAuditId) throw new Error("localAuditId obrigatorio");
    const area = await db.query(
      "select a.*, c.id as checklist_id from audit_areas a join checklists c on c.area_id = a.id and c.is_active = true where (a.id::text = $1 or a.slug = $1) and a.active = true and ($2::uuid is null or c.id = $2) order by c.created_at desc limit 1",
      [p.areaId || p.areaSlug || "", p.checklistId || null]
    );
    if (!area.rows[0]) throw new Error("Area/checklist nao encontrado");
    const a = area.rows[0];
    const month = p.monthStart || new Date().toISOString().slice(0, 7) + "-01";
    if (!/^\d{4}-\d{2}-01$/.test(month)) throw new Error("monthStart invalido");
    const cycle = await db.query(
      "insert into audit_cycles (unit_id, month_start, label) values ($1,$2,$3) on conflict (unit_id, month_start) do update set month_start = excluded.month_start returning id",
      [a.unit_id, month, month.slice(0, 7)]
    );
    const audit = await db.query(
      `insert into audits (unit_id,area_id,checklist_id,cycle_id,auditor_user_id,responsible_user_id,device_id,local_audit_id,source,status,started_at,offline_created,sync_status)
       values ($1,$2,$3,$4,$5,coalesce($9,(
         select p.user_id from user_area_permissions p join app_users u on u.id=p.user_id
         where p.area_id=$2 and p.active=true and u.active=true and u.role='area_responsible'
         order by p.created_at,p.id limit 1
       )),$6,$7,'tablet_android','in_progress',$8,true,'synced')
       on conflict (device_id,local_audit_id) where device_id is not null and local_audit_id is not null
       do update set local_audit_id=excluded.local_audit_id,responsible_user_id=coalesce(audits.responsible_user_id,excluded.responsible_user_id) returning *`,
      [a.unit_id, a.id, a.checklist_id, cycle.rows[0].id, op.user_id, op.device_id, p.localAuditId, p.startedAt || op.created_at, a.responsible_user_id]
    );
    return { entityType: "audit", entityId: audit.rows[0].id, localAuditId: p.localAuditId, audit: audit.rows[0] };
  }
  if (op.entity_type === "audit_answer") {
    const audit = await auditFor(db, op, p);
    if (audit.status === "finished" || audit.status === "cancelled") throw new Error("Auditoria encerrada; resposta nao pode ser alterada");
    if (!["C", "NC", "X"].includes(p.answer)) throw new Error("Resposta invalida");
    const question = await db.query(
      "select q.* from checklist_questions q join checklist_blocks b on b.id = q.block_id where q.id = $1 and b.checklist_id = $2",
      [p.questionId, audit.checklist_id]
    );
    if (!question.rows[0]) throw new Error("Pergunta nao pertence ao checklist da auditoria");
    const current = await db.query("select * from audit_answers where audit_id = $1 and question_id = $2", [audit.id, p.questionId]);
    if (p.expectedRevision != null && p.expectedRevision !== (current.rows[0]?.revision || 0)) throw new Error("Conflito de revisao; atualize a resposta antes de reenviar");
    const answer = await db.query(
      "insert into audit_answers (audit_id,question_id,answer,score_value,risk_level_snapshot,notes,answered_at) values ($1,$2,$3,$4,$5,$6,$7) on conflict (audit_id,question_id) do update set answer=excluded.answer,score_value=excluded.score_value,notes=excluded.notes,answered_at=excluded.answered_at,revision=audit_answers.revision+1,updated_at=now() returning *",
      [audit.id, p.questionId, p.answer, p.answer === "C" ? 10 : p.answer === "NC" ? 0 : null, question.rows[0].risk_level, p.notes || null, p.answeredAt || op.created_at]
    );
    return { entityType: "audit_answer", entityId: answer.rows[0].id, answer: answer.rows[0] };
  }
  if (op.entity_type === "audit" && op.operation === "finalize") {
    const audit = await auditFor(db, op, p);
    if (audit.status === "cancelled") throw new Error("Auditoria cancelada");
    await validateAuditReadyToFinalize(db, audit);
    const result = await db.query(
      "update audits set status='finished',finished_at=coalesce(finished_at,now()),final_score=(select round(10.0*count(*) filter (where answer='C')/nullif(count(*) filter (where answer in ('C','NC')),0),2) from audit_answers where audit_id=$1),sync_status='synced',updated_at=now() where id=$1 returning *",
      [audit.id]
    );
    const generated = await actionPlanService.generateForAudit(db, result.rows[0], {
      generationMode: p.generationMode,
      dueDays: p.dueDays
    });
    const reportJob = await enqueueMonthlyAuditReport(db, result.rows[0], op.user_id);
    await notify(db, { unitId: audit.unit_id, recipientId: op.user_id, title: "Auditoria sincronizada e finalizada", type: "audit_finished", entityType: "audit", entityId: audit.id, key: "audit-finished:" + audit.id });
    return { entityType: "audit", entityId: audit.id, audit: result.rows[0], actionPlanDocument: generated.document, actionPlans: generated.actionPlans, reportJob };
  }
  if (op.entity_type === "stored_file" && op.operation === "upload") {
    const file = await db.query("select * from stored_files where device_id=$1 and local_file_id=$2 and uploaded_by_user_id=$3", [op.device_id, p.localFileId, op.user_id]);
    if (!file.rows[0]) throw new Error("Arquivo ainda nao foi enviado");
    let entityId = p.entityId;
    if (p.entityType === "audit" || p.entityType === "audit_answer") {
      const audit = await auditFor(db, op, p);
      entityId = audit.id;
      if (p.entityType === "audit_answer") {
        const answer = await db.query("select id from audit_answers where audit_id=$1 and question_id=$2", [audit.id, p.questionId]);
        if (!answer.rows[0]) throw new Error("Resposta da foto ainda nao foi sincronizada");
        entityId = answer.rows[0].id;
      }
    } else {
      throw new Error("Vinculo offline de arquivo nao suportado");
    }
    const linked = await db.query("select 1 from file_links where file_id=$1 and entity_type=$2 and entity_id=$3", [file.rows[0].id, p.entityType, entityId]);
    if (!linked.rows.length) await db.query("insert into file_links (file_id,entity_type,entity_id,caption) values ($1,$2,$3,$4)", [file.rows[0].id, p.entityType, entityId, p.caption || null]);
    await db.query("insert into file_operation_links (operation_id,file_id) values ($1,$2) on conflict do nothing", [op.id, file.rows[0].id]);
    return { entityType: "stored_file", entityId: file.rows[0].id, file: file.rows[0] };
  }
  if (op.entity_type === "action_plan_feedback") {
    const plan = await db.query("select * from action_plans where id=$1 and assigned_to_user_id=$2 for update", [p.actionPlanId, op.user_id]);
    if (!plan.rows[0]) throw new Error("Plano nao pertence ao usuario");
    if (["approved", "cancelled"].includes(plan.rows[0].status)) throw new Error("Plano encerrado");
    const feedback = await db.query(
      "insert into action_plan_feedback (action_plan_id,submitted_by_user_id,observation,correction_summary,delay_justification,status) values ($1,$2,$3,$4,$5,'submitted') returning *",
      [p.actionPlanId, op.user_id, p.observation || null, p.correctionSummary || null, p.delayJustification || null]
    );
    await db.query("update action_plans set status='pending_review',submitted_at=now(),last_feedback_id=$2,updated_at=now() where id=$1", [p.actionPlanId, feedback.rows[0].id]);
    const auditor = await db.query("select auditor_user_id from audits where id=$1", [plan.rows[0].origin_audit_id]);
    await notify(db, { unitId: plan.rows[0].unit_id, recipientId: auditor.rows[0]?.auditor_user_id, title: "Devolutiva recebida", type: "plan_feedback", entityType: "action_plan", entityId: p.actionPlanId, key: "feedback:" + feedback.rows[0].id });
    return { entityType: "action_plan_feedback", entityId: feedback.rows[0].id, feedback: feedback.rows[0] };
  }
  throw new Error("Operacao nao suportada");
}

async function processOperations(pool, userId, deviceId, operationIds, limit = 50) {
  const output = [];
  for (let index = 0; index < Math.min(Math.max(Number(limit) || 50, 1), 100); index++) {
    const client = await pool.connect();
    let op;
    try {
      await client.query("begin");
      const row = await client.query(
        "select * from sync_queue where user_id=$1 and device_id=$2 and status in ('pending','error') and ($3::text[] is null or client_operation_id=any($3)) and not (id=any($4::uuid[])) order by client_sequence nulls last, created_at, id for update skip locked limit 1",
        [userId, deviceId, operationIds || null, output.map((item) => item.id)]
      );
      op = row.rows[0];
      if (!op) { await client.query("commit"); break; }
      if (op.depends_on?.length) {
        const dependencies = await client.query("select client_operation_id from sync_queue where user_id=$1 and device_id=$2 and status in ('synced','ignored') and client_operation_id=any($3::text[])", [userId, deviceId, op.depends_on]);
        if (dependencies.rows.length !== new Set(op.depends_on).size) throw new Error("Dependencia ainda nao sincronizada");
      }
      const result = await applyOperation(client, op);
      const saved = await client.query(
        "update sync_queue set status='synced',processed_at=now(),synced_at=now(),error_message=null,result_entity_type=$2,result_entity_id=$3,result_payload=$4::jsonb where id=$1 returning *",
        [op.id, result.entityType, result.entityId, JSON.stringify(result)]
      );
      await client.query("commit");
      output.push(saved.rows[0]);
    } catch (error) {
      await client.query("rollback");
      if (!op) throw error;
      const failed = await client.query("update sync_queue set status='error',retry_count=retry_count+1,error_message=$2 where id=$1 and status <> 'synced' returning *", [op.id, error.message]);
      if (failed.rows[0]) output.push(failed.rows[0]);
      else {
        const current = await client.query("select * from sync_queue where id=$1", [op.id]);
        output.push(current.rows[0]);
      }
    } finally { client.release(); }
  }
  return output;
}

async function resolveConflict(pool, user, device, clientOperationId, strategy) {
  if (!["keep_server", "keep_device"].includes(strategy)) throw new Error("Estrategia de conflito invalida");
  const client = await pool.connect();
  let replacement;
  let original;
  try {
    await client.query("begin");
    const selected = await client.query("select * from sync_queue where client_operation_id=$1 and user_id=$2 and device_id=$3 for update", [clientOperationId, user.id, device.id]);
    const op = selected.rows[0];
    if (!op || op.entity_type !== "audit_answer") throw new Error("Conflito de resposta nao encontrado");
    if (op.status === "ignored") {
      original = op;
      if (op.result_payload?.replacementOperationId) {
        const prior = await client.query("select * from sync_queue where client_operation_id=$1", [op.result_payload.replacementOperationId]);
        replacement = prior.rows[0];
      }
    } else {
      if (op.status !== "error") throw new Error("Operacao nao esta em conflito");
      const audit = await auditFor(client, op, op.payload);
      const answers = await client.query("select * from audit_answers where audit_id=$1 and question_id=$2", [audit.id, op.payload.questionId]);
      const answer = answers.rows[0];
      if (!answer) throw new Error("Resposta do servidor nao encontrada");
      if (strategy === "keep_device") {
        const payload = { ...op.payload, expectedRevision: answer.revision };
        const replacementId = "resolved-" + require("node:crypto").randomUUID();
        const queued = await client.query(
          "insert into sync_queue (user_id,device_id,client_operation_id,entity_type,operation,payload,client_sequence,depends_on) values ($1,$2,$3,'audit_answer','upsert',$4::jsonb,$5,$6) returning *",
          [user.id, device.id, replacementId, JSON.stringify(payload), op.client_sequence, op.depends_on]
        );
        replacement = queued.rows[0];
        await client.query("update sync_queue set depends_on=array_replace(depends_on,$3,$4) where user_id=$1 and device_id=$2 and status in ('pending','error') and $3=any(depends_on)", [user.id, device.id, clientOperationId, replacementId]);
      }
      const result = { strategy, entityType: "audit_answer", entityId: answer.id, answer,
        replacementOperationId: replacement?.client_operation_id || null };
      const ignored = await client.query("update sync_queue set status='ignored',processed_at=now(),error_message=null,result_payload=$2::jsonb where id=$1 returning *", [op.id, JSON.stringify(result)]);
      original = ignored.rows[0];
    }
    await client.query("commit");
  } catch (error) { await client.query("rollback"); throw error; }
  finally { client.release(); }
  if (replacement) {
    const results = await processOperations(pool, user.id, device.id, [replacement.client_operation_id], 1);
    replacement = results[0] || replacement;
  }
  return { original, replacement };
}

module.exports = { validateOperation, canonical, deviceFor, enqueue, applyOperation, processOperations, resolveConflict };
