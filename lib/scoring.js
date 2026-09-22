function weightedScore(rows) {
  let achieved = 0;
  let possible = 0;
  for (const row of rows || []) {
    if (!row || !["C", "NC"].includes(row.answer)) continue;
    const weight = Number(row.weight);
    if (!Number.isFinite(weight) || weight <= 0) continue;
    possible += weight;
    if (row.answer === "C") achieved += weight;
  }
  return possible ? Number(((achieved / possible) * 10).toFixed(2)) : null;
}

async function weightedAuditScore(db, auditId) {
  const result = await db.query(
    `select aa.answer,q.weight
       from audit_answers aa
       join checklist_questions q on q.id=aa.question_id
      where aa.audit_id=$1`,
    [auditId]
  );
  return weightedScore(result.rows);
}

module.exports = { weightedScore, weightedAuditScore };
