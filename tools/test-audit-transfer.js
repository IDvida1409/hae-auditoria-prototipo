const assert = require("node:assert/strict");
const fs = require("node:fs/promises");
const path = require("node:path");
const net = require("node:net");
const crypto = require("node:crypto");
const { Pool } = require("pg");
const { migrate } = require("../lib/database");
const { importChecklistData } = require("../lib/checklist-import");
const session = require("../lib/audit-session");
const sync = require("../lib/sync-service");

async function freePort() {
  const server = net.createServer();
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const port = server.address().port;
  await new Promise((resolve) => server.close(resolve));
  return port;
}

async function main() {
  const { default: EmbeddedPostgres } = await import("embedded-postgres");
  const testRoot = path.resolve(__dirname, "..", ".backend-tests");
  await fs.mkdir(testRoot, { recursive: true });
  const folder = await fs.mkdtemp(path.join(testRoot, "audit-transfer-"));
  const port = await freePort();
  const password = crypto.randomBytes(24).toString("hex");
  const database = new EmbeddedPostgres({ databaseDir: path.join(folder, "db"), user: "postgres", password,
    port, persistent: true, postgresFlags: ["-c", "listen_addresses=127.0.0.1"], onLog() {}, onError: console.error });
  let pool;
  try {
    await database.initialise();
    await database.start();
    pool = new Pool({ connectionString: `postgres://postgres:${password}@127.0.0.1:${port}/postgres` });
    await migrate(pool);
    await importChecklistData(pool, { force: true });
    const area = (await pool.query("select a.id,a.unit_id,c.id as checklist_id from audit_areas a join checklists c on c.area_id=a.id where c.is_active=true order by a.name limit 1")).rows[0];
    const questions = (await pool.query("select q.id from checklist_questions q join checklist_blocks b on b.id=q.block_id where b.checklist_id=$1 order by b.display_order,q.question_number limit 3", [area.checklist_id])).rows;
    assert.equal(questions.length, 3);
    const users = [];
    for (const name of ["Editor 1", "Editor 2"]) {
      const row = await pool.query("insert into app_users (unit_id,full_name,email,role) values ($1,$2,$3,'auditor') returning *",
        [area.unit_id, name, `${crypto.randomUUID()}@test.local`]);
      users.push(row.rows[0]);
    }
    const started = await session.start(pool, { unitId: area.unit_id, areaId: area.id, user: users[0],
      deviceUid: "test-device-1", localAuditId: "local-1" });
    assert.equal(started.audit.status, "in_progress");
    await assert.rejects(session.start(pool, { unitId: area.unit_id, areaId: area.id, user: users[1],
      deviceUid: "test-device-2", localAuditId: "local-2" }), (error) => error.code === "AUDIT_EXISTS");
    const device1 = started.audit.active_device_id;
    const oldOp = { user_id: users[0].id, device_id: device1, created_at: new Date(),
      entity_type: "audit_answer", payload: { auditId: started.audit.id, localAuditId: "local-1", questionId: questions[0].id, answer: "C" } };
    await sync.applyOperation(pool, oldOp);
    await sync.applyOperation(pool, { ...oldOp, payload: { ...oldOp.payload, questionId: questions[1].id, answer: "NC" } });
    const moved = await session.transfer(pool, { auditId: started.audit.id, unitId: area.unit_id, user: users[1],
      deviceUid: "test-device-2", allowedAreaIds: [], allAreas: true });
    assert.equal(moved.retainedAnswerCount, 1);
    await assert.rejects(session.transfer(pool, { auditId: started.audit.id, unitId: area.unit_id, user: users[0],
      deviceUid: "test-device-1", allowedAreaIds: [], allAreas: true }), (error) => error.code === "AUDIT_TRANSFERRED");
    const locks = (await pool.query("select question_id from audit_transfer_answer_locks where audit_id=$1", [started.audit.id])).rows;
    assert.deepEqual(locks.map((row) => row.question_id), [questions[0].id]);
    await assert.rejects(sync.applyOperation(pool, { ...oldOp, payload: { ...oldOp.payload, questionId: questions[2].id } }),
      (error) => error.code === "AUDIT_TRANSFERRED");
    const newOp = { ...oldOp, user_id: users[1].id, device_id: moved.audit.active_device_id };
    await assert.rejects(sync.applyOperation(pool, newOp), (error) => error.code === "ANSWER_LOCKED");
    await sync.applyOperation(pool, { ...newOp, payload: { ...newOp.payload, questionId: questions[1].id, answer: "C" } });
    await sync.applyOperation(pool, { ...newOp, payload: { ...newOp.payload, questionId: questions[2].id, answer: "C" } });
    const answers = (await pool.query("select question_id,answer,answered_by_user_id from audit_answers where audit_id=$1", [started.audit.id])).rows;
    assert.equal(answers.length, 3);
    assert.equal(answers.find((row) => row.question_id === questions[0].id).answered_by_user_id, users[0].id);
    assert.equal(answers.find((row) => row.question_id === questions[2].id).answered_by_user_id, users[1].id);
    const resumed = await session.start(pool, { unitId: area.unit_id, areaId: area.id, user: users[1],
      deviceUid: "test-device-2", localAuditId: "local-3" });
    assert.equal(resumed.resumed, true);
    assert.equal(resumed.audit.id, started.audit.id);
    const secondArea = (await pool.query("select a.id,c.id as checklist_id from audit_areas a join checklists c on c.area_id=a.id where c.is_active=true and a.unit_id=$1 and a.id<>$2 order by a.name limit 1", [area.unit_id, area.id])).rows[0];
    const ownQuestion = (await pool.query("select q.id from checklist_questions q join checklist_blocks b on b.id=q.block_id where b.checklist_id=$1 order by b.display_order,q.question_number limit 1", [secondArea.checklist_id])).rows[0];
    const ownStart = await session.start(pool, { unitId: area.unit_id, areaId: secondArea.id, user: users[0],
      deviceUid: "own-device-1", localAuditId: "own-local-1" });
    await sync.applyOperation(pool, { user_id: users[0].id, device_id: ownStart.audit.active_device_id,
      created_at: new Date(), entity_type: "audit_answer", payload: { auditId: ownStart.audit.id,
        localAuditId: "own-local-1", questionId: ownQuestion.id, answer: "C" } });
    await assert.rejects(session.start(pool, { unitId: area.unit_id, areaId: secondArea.id, user: users[0],
      deviceUid: "own-device-2", localAuditId: "own-local-2" }), (error) => error.code === "AUDIT_EXISTS");
    const ownContinue = await session.transfer(pool, { auditId: ownStart.audit.id, unitId: area.unit_id,
      user: users[0], deviceUid: "own-device-2", allowedAreaIds: [], allAreas: true });
    assert.equal(ownContinue.continuedOnAnotherDevice, true);
    assert.equal(ownContinue.audit.auditor_user_id, users[0].id);
    assert.equal(ownContinue.retainedAnswerCount, 1);
    await assert.rejects(sync.applyOperation(pool, { user_id: users[0].id, device_id: ownStart.audit.active_device_id,
      created_at: new Date(), entity_type: "audit_answer", payload: { auditId: ownStart.audit.id,
        localAuditId: "own-local-1", questionId: ownQuestion.id, answer: "C" } }),
    (error) => error.code === "AUDIT_TRANSFERRED" && /outro aparelho/.test(error.message));
    console.log("PASS: real PostgreSQL transfer, same-auditor device continuation, retained answers, old-device rejection and first incomplete answer.");
  } finally {
    if (pool) await pool.end().catch(() => {});
    await Promise.race([database.stop(), new Promise((resolve) => setTimeout(resolve, 10000))]);
  }
}

main().then(() => process.exit(0)).catch((error) => { console.error(error); process.exit(1); });
