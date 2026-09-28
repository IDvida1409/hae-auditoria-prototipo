const activityLog = require("./activity-log");
const syncService = require("./sync-service");

const activeStatuses = ["draft", "in_progress", "sync_pending", "sync_error"];

function monthStart() {
  const now = new Date();
  return `${now.getUTCFullYear()}-${String(now.getUTCMonth() + 1).padStart(2, "0")}-01`;
}

async function lockAreaCycle(db, areaId, cycleId) {
  await db.query("select pg_advisory_xact_lock(hashtext($1),hashtext($2))", [String(areaId), String(cycleId)]);
}

async function existingInCycle(db, areaId, cycleId) {
  const result = await db.query(
    "select a.*,u.full_name as auditor_name from audits a left join app_users u on u.id=a.auditor_user_id where a.area_id=$1 and a.cycle_id=$2 and a.status <> 'cancelled' order by a.created_at desc,a.id",
    [areaId, cycleId]
  );
  return result.rows;
}

async function start(pool, { unitId, areaId, user, deviceUid, localAuditId, source = "web" }) {
  if (!areaId || !deviceUid || !localAuditId) throw new Error("Área, aparelho e identificador da auditoria são obrigatórios.");
  const client = await pool.connect();
  try {
    await client.query("begin");
    const device = await syncService.deviceFor(client, user, deviceUid);
    const area = await client.query(
      "select a.*,c.id as checklist_id from audit_areas a join checklists c on c.area_id=a.id and c.is_active=true where a.id=$1 and a.unit_id=$2 and a.active=true order by c.created_at desc limit 1",
      [areaId, unitId]
    );
    if (!area.rows[0]) throw Object.assign(new Error("Área ou checklist não encontrado."), { status: 404 });
    const cycle = await client.query(
      "insert into audit_cycles (unit_id,month_start,label) values ($1,$2,$3) on conflict (unit_id,month_start) do update set month_start=excluded.month_start returning id",
      [unitId, monthStart(), monthStart().slice(0, 7)]
    );
    await lockAreaCycle(client, areaId, cycle.rows[0].id);
    const prior = await existingInCycle(client, areaId, cycle.rows[0].id);
    if (prior.length) {
      const revoked = await client.query("select 1 from audit_transfer_revoked_devices where audit_id=$1 and device_id=$2", [prior[0].id, device.id]);
      if (revoked.rows.length) throw Object.assign(new Error(
        String(prior[0].auditor_user_id) === String(user.id)
          ? "Você continuou esta auditoria em outro aparelho. Esta cópia não pode ser enviada novamente neste mês."
          : `A auditoria foi transferida para ${prior[0].auditor_name || "outro auditor"}. Este aparelho não pode reassumi-la neste mês.`), {
        status: 409, code: "AUDIT_TRANSFERRED", audit: prior[0]
      });
      const same = prior.length === 1 && activeStatuses.includes(prior[0].status)
        && String(prior[0].auditor_user_id) === String(user.id)
        && String(prior[0].active_device_id || prior[0].device_id) === String(device.id);
      if (!same) {
        throw Object.assign(new Error(prior.some((audit) => audit.status === "finished")
          ? "Esta área já possui uma auditoria concluída neste mês."
          : `Já existe uma auditoria em andamento com ${prior[0].auditor_name || "outro auditor"}.`), {
          status: 409, code: "AUDIT_EXISTS", audit: prior[0]
        });
      }
      await client.query("commit");
      return { audit: prior[0], resumed: true };
    }
    const created = await client.query(
      `insert into audits
       (unit_id,area_id,checklist_id,cycle_id,auditor_user_id,responsible_user_id,device_id,active_device_id,local_audit_id,source,status,started_at,offline_created,sync_status)
       values ($1,$2,$3,$4,$5,$6,$7,$7,$8,$9,'in_progress',now(),false,'synced') returning *`,
      [unitId, areaId, area.rows[0].checklist_id, cycle.rows[0].id, user.id,
        area.rows[0].responsible_user_id, device.id, localAuditId, source]
    );
    await activityLog.record(client, { unitId, actorUserId: user.id, entityType: "audit", entityId: created.rows[0].id, action: "audit.started", metadata: { areaId, cycleId: cycle.rows[0].id } });
    await client.query("commit");
    return { audit: created.rows[0], resumed: false };
  } catch (error) {
    await client.query("rollback");
    throw error;
  } finally { client.release(); }
}

async function transfer(pool, { auditId, unitId, user, deviceUid, allowedAreaIds, allAreas }) {
  if (!deviceUid) throw new Error("Identificador do aparelho obrigatório.");
  const client = await pool.connect();
  try {
    await client.query("begin");
    const device = await syncService.deviceFor(client, user, deviceUid);
    const selected = await client.query("select a.*,c.month_start from audits a join audit_cycles c on c.id=a.cycle_id where a.id=$1 and a.unit_id=$2", [auditId, unitId]);
    const audit = selected.rows[0];
    if (!audit || (!allAreas && !allowedAreaIds.some((id) => String(id) === String(audit.area_id)))) {
      throw Object.assign(new Error("Auditoria não encontrada para esta área."), { status: 404 });
    }
    const cycleMonth = audit.month_start instanceof Date ? audit.month_start.toISOString().slice(0, 10) : String(audit.month_start).slice(0, 10);
    if (cycleMonth !== monthStart()) throw Object.assign(new Error("A transferência só é permitida na auditoria do mês vigente."), { status: 409 });
    await lockAreaCycle(client, audit.area_id, audit.cycle_id);
    const locked = await client.query("select * from audits where id=$1 for update", [auditId]);
    if (!activeStatuses.includes(locked.rows[0]?.status)) throw Object.assign(new Error("Auditoria encerrada; atualize a tela."), { status: 409 });
    const revoked = await client.query("select 1 from audit_transfer_revoked_devices where audit_id=$1 and device_id=$2", [auditId, device.id]);
    if (revoked.rows.length) throw Object.assign(new Error("Este aparelho já foi retirado desta auditoria e não pode reassumi-la neste mês."), { status: 409, code: "AUDIT_TRANSFERRED" });
    const previous = locked.rows[0];
    const sameAuditor = String(previous.auditor_user_id) === String(user.id);
    if (sameAuditor
      && String(previous.active_device_id || previous.device_id) === String(device.id)) {
      await client.query("commit");
      return { audit: previous, transferred: false };
    }
    await client.query(
      `insert into audit_transfer_answer_locks (audit_id,question_id)
       select aa.audit_id,aa.question_id from audit_answers aa
       where aa.audit_id=$1 and (aa.answer <> 'NC' or exists (
         select 1 from file_links l where l.entity_type='audit_answer' and l.entity_id=aa.id
       )) on conflict do nothing`,
      [auditId]
    );
    const count = await client.query("select count(*)::int as count from audit_transfer_answer_locks where audit_id=$1", [auditId]);
    if (previous.active_device_id || previous.device_id) {
      await client.query("insert into audit_transfer_revoked_devices (audit_id,device_id) values ($1,$2) on conflict do nothing",
        [auditId, previous.active_device_id || previous.device_id]);
    }
    const updated = await client.query(
      "update audits set auditor_user_id=$2,active_device_id=$3,sync_status='synced',updated_at=now() where id=$1 returning *",
      [auditId, user.id, device.id]
    );
    const owner = await client.query("select full_name from app_users where id=$1", [user.id]);
    await activityLog.record(client, { unitId, actorUserId: user.id, entityType: "audit", entityId: auditId,
      action: sameAuditor ? "audit.device_changed" : "audit.transferred", metadata: { previousAuditorUserId: previous.auditor_user_id, newAuditorUserId: user.id,
        previousDeviceId: previous.active_device_id || previous.device_id, newDeviceId: device.id,
        retainedAnswerCount: count.rows[0].count } });
    await client.query("commit");
    return { audit: { ...updated.rows[0], auditor_name: owner.rows[0]?.full_name || user.full_name },
      transferred: !sameAuditor, continuedOnAnotherDevice: sameAuditor, retainedAnswerCount: count.rows[0].count };
  } catch (error) {
    await client.query("rollback");
    throw error;
  } finally { client.release(); }
}

module.exports = { activeStatuses, monthStart, lockAreaCycle, existingInCycle, start, transfer };
