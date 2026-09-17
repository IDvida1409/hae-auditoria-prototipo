async function notify(db, event) {
  if (!event.recipientId) return null;
  const result = await db.query(
    "insert into notifications (unit_id,recipient_user_id,title,body,notification_type,entity_type,entity_id,event_key) values ($1,$2,$3,$4,$5,$6,$7,$8) on conflict (recipient_user_id,event_key) where event_key is not null do nothing returning *",
    [event.unitId, event.recipientId, event.title, event.body || null, event.type, event.entityType, event.entityId, event.key]
  );
  return result.rows[0] || null;
}

module.exports = { notify };
