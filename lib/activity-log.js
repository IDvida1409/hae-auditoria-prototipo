async function record(db, { unitId, actorUserId = null, entityType, entityId = null, action, metadata = {} }) {
  if (!unitId || !entityType || !action) throw new Error("Evento de auditoria incompleto");
  await db.query(
    `insert into activity_logs (unit_id,actor_user_id,entity_type,entity_id,action,metadata)
     values ($1,$2,$3,$4,$5,$6::jsonb)`,
    [unitId, actorUserId, entityType, entityId, action, JSON.stringify(metadata)]
  );
}

module.exports = { record };
