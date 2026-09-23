const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs/promises");
const path = require("node:path");
const { Readable } = require("node:stream");
const { validateOperation, canonical, enqueue, processOperations, applyOperation } = require("../lib/sync-service");
const { pageLimit, userValues } = require("../lib/operational-api");
const storage = require("../lib/file-storage");
const { migrate } = require("../lib/database");
const { enqueueMonthlyAuditReport, validateAuditReadyToFinalize } = require("../lib/report-service");

test("outdated completed report job is reopened instead of remaining stuck", async () => {
  const audit = { id: "audit-1", unit_id: "unit-1", area_id: "area-1", cycle_id: "cycle-1", auditor_user_id: "user-1" };
  const calls = [];
  const db = { async query(sql) {
    calls.push(sql);
    if (sql.includes("from reports r")) return { rows: [] };
    if (sql.includes("from report_generation_jobs")) return { rows: [{ id: "job-1", status: "completed" }] };
    if (sql.startsWith("update report_generation_jobs")) return { rows: [{ id: "job-1", status: "queued", attempts: 0 }] };
    throw new Error("Unexpected query");
  } };
  const result = await enqueueMonthlyAuditReport(db, audit, "user-1");
  assert.equal(result.status, "queued");
  assert.ok(calls.some((sql) => sql.startsWith("update report_generation_jobs")));
  assert.ok(!calls.some((sql) => sql.startsWith("insert into report_generation_jobs")));
});

test("finalization waits for every answer and required NC photo", async () => {
  const audit = { id: "audit-1", checklist_id: "checklist-1" };
  const db = { query: async () => ({ rows: [{ expected: 3, answered: 2, nc_without_evidence: 0 }] }) };
  await assert.rejects(validateAuditReadyToFinalize(db, audit), /2 de 3 respostas/);
  db.query = async () => ({ rows: [{ expected: 3, answered: 3, nc_without_evidence: 1 }] });
  await assert.rejects(validateAuditReadyToFinalize(db, audit), /foto/);
  db.query = async () => ({ rows: [{ expected: 3, answered: 3, nc_without_evidence: 0 }] });
  assert.equal((await validateAuditReadyToFinalize(db, audit)).answered, 3);
});

test("offline answers accept upsert and reject unsupported operations", () => {
  const operation = { clientOperationId: "operation-1", entityType: "audit_answer", operation: "upsert", payload: { answer: "C" } };
  assert.doesNotThrow(() => validateOperation(operation));
  assert.throws(() => validateOperation({ ...operation, operation: "execute" }), /nao suportada/);
  assert.throws(() => validateOperation({ ...operation, clientSequence: -1 }), /clientSequence/);
  assert.throws(() => validateOperation({ ...operation, dependsOn: ["operation-1"] }), /dependsOn/);
});

test("same id and changed payload cannot silently overwrite a received operation", async () => {
  const existing = { id: "row-1", user_id: "user-1", device_id: "device-1", entity_type: "audit_answer", operation: "upsert", payload: { answer: "NC" } };
  const calls = [];
  const client = {
    query: async (sql) => { calls.push(sql); return { rows: sql.startsWith("select *") ? [existing] : [] }; },
    release() {}
  };
  const pool = { connect: async () => client };
  await assert.rejects(enqueue(pool, { id: "user-1" }, { id: "device-1" }, [
    { clientOperationId: "operation-1", entityType: "audit_answer", operation: "upsert", payload: { answer: "C" } }
  ]), /dados diferentes/);
  assert.ok(calls.includes("rollback"));
  assert.ok(!calls.some((sql) => sql.startsWith("insert")));
});

test("receipt retry of identical payload returns original operation without duplication", async () => {
  const existing = { id: "row-1", user_id: "user-1", device_id: "device-1", entity_type: "audit_answer", operation: "upsert", payload: { notes: "ok", answer: "C" } };
  const calls = [];
  const client = { query: async (sql) => { calls.push(sql); return { rows: sql.startsWith("select *") ? [existing] : [] }; }, release() {} };
  const result = await enqueue({ connect: async () => client }, { id: "user-1" }, { id: "device-1" }, [
    { clientOperationId: "operation-1", entityType: "audit_answer", operation: "upsert", payload: { answer: "C", notes: "ok" } }
  ]);
  assert.equal(result[0], existing);
  assert.ok(calls.includes("commit"));
  assert.ok(!calls.some((sql) => sql.startsWith("insert")));
});

test("unresolved dependencies retain the operation as error, never as synced", async () => {
  const operation = { id: "row-1", user_id: "user-1", device_id: "device-1", entity_type: "audit_answer", operation: "upsert", payload: {}, depends_on: ["create-audit"] };
  const calls = [];
  const client = {
    async query(sql) {
      calls.push(sql);
      if (sql.startsWith("select * from sync_queue")) return { rows: [operation] };
      if (sql.startsWith("update sync_queue set status='error'")) return { rows: [{ ...operation, status: "error" }] };
      return { rows: [] };
    },
    release() {}
  };
  const result = await processOperations({ connect: async () => client }, "user-1", "device-1", null, 1);
  assert.equal(result[0].status, "error");
  assert.ok(calls.includes("rollback"));
  assert.ok(!calls.some((sql) => sql.startsWith("update sync_queue set status='synced'")));
});

test("a question from another checklist cannot be stored in an audit", async () => {
  const calls = [];
  const db = {
    async query(sql) {
      calls.push(sql);
      if (sql.startsWith("select a.* from audits")) return { rows: [{ id: "audit-1", checklist_id: "checklist-1", status: "in_progress" }] };
      return { rows: [] };
    }
  };
  await assert.rejects(applyOperation(db, { entity_type: "audit_answer", user_id: "user-1", payload: { answer: "C", questionId: "question-other" } }), /nao pertence/);
  assert.ok(!calls.some((sql) => sql.startsWith("insert")));
});

test("revision conflicts cannot silently overwrite collected answers", async () => {
  const db = { async query(sql) {
    if (sql.startsWith("select a.*")) return { rows: [{ id: "audit-1", checklist_id: "checklist-1", status: "in_progress" }] };
    if (sql.startsWith("select q.*")) return { rows: [{ risk_level: "high" }] };
    if (sql.startsWith("select * from audit_answers")) return { rows: [{ revision: 3 }] };
    throw new Error("Unexpected write");
  } };
  await assert.rejects(applyOperation(db, { entity_type: "audit_answer", payload: { answer: "C", questionId: "question-1", expectedRevision: 2 } }), /Conflito/);
});

test("pagination is bounded and user updates never accept password hashes", () => {
  assert.throws(() => pageLimit(new URL("http://localhost/api/users?limit=10000")), /Paginacao/);
  assert.throws(() => userValues({ active: "false" }), /booleano/);
  assert.deepEqual(userValues({ email: " TEST@example.com ", password_hash: "untrusted" }), [{ column: "email", value: "test@example.com" }]);
  assert.deepEqual(canonical({ b: 2, a: 1 }), { a: 1, b: 2 });
});

test("private storage disallows path traversal", () => {
  assert.throws(() => storage.storedPath("../server.js"), /Chave/);
});

test("acknowledgement is committed in the same transaction as audit finalization", async () => {
  const op = { id: "operation-row", user_id: "user-1", device_id: "device-1", entity_type: "audit", operation: "finalize", payload: { localAuditId: "local-audit" } };
  const calls = [];
  const client = {
    async query(sql) {
      calls.push(sql);
      if (sql.startsWith("select * from sync_queue")) return { rows: [op] };
      if (sql.startsWith("select a.* from audits")) return { rows: [{ id: "audit-1", unit_id: "unit-1", area_id: "area-1", checklist_id: "checklist-1", cycle_id: "cycle-1", auditor_user_id: "user-1", status: "in_progress" }] };
      if (sql.includes("as expected") && sql.includes("as answered")) return { rows: [{ expected: 1, answered: 1, nc_without_evidence: 0 }] };
      if (sql.startsWith("update audits")) return { rows: [{ id: "audit-1", unit_id: "unit-1", area_id: "area-1", checklist_id: "checklist-1", cycle_id: "cycle-1", auditor_user_id: "user-1", status: "finished", final_score: 8 }] };
      if (sql.startsWith("update sync_queue set status='synced'")) return { rows: [{ ...op, status: "synced" }] };
      return { rows: [] };
    },
    release() {}
  };
  const result = await processOperations({ connect: async () => client }, "user-1", "device-1", null, 1);
  assert.equal(result[0].status, "synced");
  const finalization = calls.findIndex((sql) => sql.startsWith("update audits"));
  const ack = calls.findIndex((sql) => sql.startsWith("update sync_queue set status='synced'"));
  const commit = calls.indexOf("commit");
  assert.ok(finalization < ack && ack < commit);
});

test("failed migration rolls back and releases the cross-process lock", async () => {
  const calls = [];
  let released = false;
  const client = {
    async query(sql) {
      calls.push(sql);
      if (sql.startsWith("create extension")) throw new Error("Migration failure");
      return { rows: [] };
    },
    release() { released = true; }
  };
  await assert.rejects(migrate({ connect: async () => client }), /Migration failure/);
  assert.ok(calls.includes("rollback"));
  assert.ok(calls.some((sql) => sql.includes("pg_advisory_unlock")));
  assert.ok(released);
});

test("database pool errors are handled instead of terminating the process", () => {
  const serverSource = require("node:fs").readFileSync(require("node:path").join(__dirname, "..", "server.js"), "utf8");
  assert.match(serverSource, /pool\.on\("error"/);
  assert.match(serverSource, /keepAlive:\s*true/);
});

test("only one report worker runs across overlapping server instances", () => {
  const serverSource = require("node:fs").readFileSync(require("node:path").join(__dirname, "..", "server.js"), "utf8");
  assert.match(serverSource, /pg_try_advisory_lock\(hashtextextended\('idauditor-report-worker',0\)\)/);
  assert.doesNotMatch(serverSource, /for \(let index = 0; index < 5/);
});

test("photo upload stores actual bytes, validates retransmission and cleans temporary files", async () => {
  const bytes = Buffer.concat([Buffer.from([0xff, 0xd8, 0xff, 0xe0]), Buffer.from("test evidence content"), Buffer.from([0xff, 0xd9])]);
  let saved = null;
  let savedContent = null;
  const calls = [];
  const client = {
    async query(sql, parameters) {
      calls.push(sql);
      if (sql.startsWith("select * from stored_files")) return { rows: saved ? [saved] : [] };
      if (sql.startsWith("insert into stored_files")) {
        saved = { id: "file-1", checksum: parameters[5], storage_key: parameters[5], file_size_bytes: parameters[8] };
        return { rows: [saved] };
      }
      if (sql.startsWith("insert into stored_file_contents")) savedContent = parameters[1];
      return { rows: [] };
    },
    release() {}
  };
  const pool = { connect: async () => client };
  const request = (content) => {
    const stream = Readable.from([content]);
    stream.headers = { "content-type": "image/jpeg", "x-local-file-id": "test-photo", "x-file-name": "photo.jpg" };
    return stream;
  };
  try {
    const first = await storage.upload(pool, request(bytes), { id: "user-1" }, { id: "device-1" }, "unit-1");
    assert.deepEqual(savedContent, bytes);
    const second = await storage.upload(pool, request(bytes), { id: "user-1" }, { id: "device-1" }, "unit-1");
    assert.equal(second.id, first.id);
    assert.equal(calls.filter((sql) => sql.startsWith("insert into stored_files")).length, 1);
    await assert.rejects(storage.upload(pool, request(Buffer.concat([Buffer.from([0xff, 0xd8, 0xff, 0xe0]), Buffer.from("changed"), Buffer.from([0xff, 0xd9])])) , { id: "user-1" }, { id: "device-1" }, "unit-1"), /conteudo diferente/);
    await assert.rejects(storage.upload(pool, request(Buffer.from("not an image")), { id: "user-1" }, { id: "device-2" }, "unit-1"), /não corresponde/);
  } finally { assert.equal(calls.includes("rollback"), true); }
});
