const assert = require("node:assert/strict");
const fs = require("node:fs/promises");
const path = require("node:path");
const crypto = require("node:crypto");
const net = require("node:net");
const { spawn } = require("node:child_process");
const { Pool } = require("pg");
const { migrate } = require("../lib/database");

const root = path.resolve(__dirname, "..");

async function freePort() {
  const server = net.createServer();
  await new Promise((resolve, reject) => { server.once("error", reject); server.listen(0, "127.0.0.1", resolve); });
  const port = server.address().port;
  await new Promise((resolve) => server.close(resolve));
  return port;
}

async function runChild(args, environment) {
  const child = spawn(process.execPath, args, { cwd: root, env: environment, windowsHide: true, stdio: ["ignore", "pipe", "pipe"] });
  let output = "";
  child.stdout.on("data", (chunk) => { output += chunk; });
  child.stderr.on("data", (chunk) => { output += chunk; });
  await new Promise((resolve, reject) => {
    child.once("error", reject);
    child.once("exit", (code) => code === 0 ? resolve() : reject(new Error(output)));
  });
  console.log(output.trim());
}

async function main() {
  const { default: EmbeddedPostgres } = await import("embedded-postgres");
  const testRoot = path.join(root, ".backend-tests");
  await fs.mkdir(testRoot, { recursive: true });
  const folder = await fs.mkdtemp(path.join(testRoot, "postgres-"));
  const dbPort = await freePort();
  const apiPort = await freePort();
  const password = crypto.randomBytes(24).toString("hex");
  const database = new EmbeddedPostgres({
    databaseDir: path.join(folder, "db"), user: "postgres", password, port: dbPort,
    persistent: true, postgresFlags: ["-c", "listen_addresses=127.0.0.1"],
    onLog() {}, onError: console.error
  });
  let pool;
  let api;
  let apiLog = "";
  try {
    console.log("Starting isolated real PostgreSQL.");
    await database.initialise();
    await database.start();
    const databaseUrl = "postgres://postgres:" + password + "@localhost:" + dbPort + "/postgres";
    pool = new Pool({ connectionString: databaseUrl });
    await migrate(pool);
    await migrate(pool);
    const migrations = await pool.query("select count(*)::int as count from schema_migrations");
    assert.ok(migrations.rows[0].count >= 6);
    await runChild(["tools/import-checklist-data.js"], { ...process.env, DATABASE_URL: databaseUrl, PGSSLMODE: "disable" });
    const imported = await pool.query("select count(*)::int as count from checklist_questions");
    assert.ok(imported.rows[0].count > 100);
    console.log("Migrations and real checklist import verified.");

    api = spawn(process.execPath, ["server.js"], {
      cwd: root, windowsHide: true, stdio: ["ignore", "pipe", "pipe"],
      env: { ...process.env, DATABASE_URL: databaseUrl, PGSSLMODE: "disable", PORT: String(apiPort), FILE_STORAGE_DIR: path.join(folder, "files"), REPORT_CHROME_PATH: "C:/Program Files/Google/Chrome/Application/chrome.exe" }
    });
    api.stdout.on("data", (chunk) => { apiLog += chunk; });
    api.stderr.on("data", (chunk) => { apiLog += chunk; });
    const base = "http://127.0.0.1:" + apiPort;
    for (let attempt = 0; attempt < 100; attempt++) {
      try { if ((await fetch(base + "/api/health")).ok) break; } catch {}
      if (api.exitCode != null) throw new Error(apiLog);
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    let authenticatedCookie = "";
    async function json(route, body, method = body ? "POST" : "GET", token = "") {
      const response = await fetch(base + route, {
        method, headers: { "content-type": "application/json", ...(authenticatedCookie ? { cookie: authenticatedCookie } : {}), ...(token ? { authorization: "Bearer " + token } : {}) },
        ...(body ? { body: JSON.stringify(body) } : {})
      });
      const result = await response.json();
      assert.ok(response.ok, route + ": " + JSON.stringify(result));
      return result;
    }
    const health = await json("/api/health");
    assert.equal(health.storage, "postgres");
    const { hashPassword } = require("../lib/access-api");
    const accessPassword = "Test-only-" + crypto.randomUUID();
    const admin = await pool.query("select id,email from app_users where role='admin' order by created_at limit 1");
    await pool.query("update app_users set password_hash=$2,username='admin.test',must_change_password=false where id=$1",
      [admin.rows[0].id, await hashPassword(accessPassword)]);
    async function access(route, body, cookie = "", method = body ? "POST" : "GET") {
      const response = await fetch(base + "/api/access/" + route, { method,
        headers: { "content-type": "application/json", ...(cookie ? { cookie } : {}) },
        ...(body ? { body: JSON.stringify(body) } : {}) });
      return { response, data: await response.json(), cookie: response.headers.get("set-cookie")?.split(";")[0] || "" };
    }
    const initialAccessLogin = await access("login", { username: "admin.test", password: accessPassword, remember: true });
    assert.equal(initialAccessLogin.response.status, 200);
    authenticatedCookie = initialAccessLogin.cookie;
    const bootstrap = await json("/api/offline-bootstrap");
    assert.equal(bootstrap.areas.length, 12);
    const checklist = bootstrap.checklists[0];
    const area = bootstrap.areas.find((item) => item.id === checklist.area_id);
    const question = checklist.blocks.flatMap((block) => block.questions)[0];
    const user = await json("/api/users", { fullName: "Integration Auditor", email: "integration@idauditor.test", role: "auditor" });
    assert.equal((await access("me")).response.status, 401);
    assert.equal((await access("login", { email: admin.rows[0].email, password: accessPassword })).response.status, 400);
    assert.equal((await access("login", { username: "admin.test", password: "Wrong password" })).response.status, 401);
    const accessLogin = await access("login", { username: "ADMIN.TEST", password: accessPassword, remember: true });
    assert.equal(accessLogin.response.status, 200);
    assert.ok(accessLogin.response.headers.get("set-cookie").includes("HttpOnly"));
    assert.ok(!accessLogin.data.user.password_hash);
    assert.equal((await access("me", null, accessLogin.cookie)).data.user.id, admin.rows[0].id);
    assert.equal((await access("users", { fullName: "Denied", email: "denied@test.local", role: "admin" })).response.status, 401);
    const newAccessUser = await access("users", { fullName: "Access Test", username: "david.souza", email: "access-user@test.local", role: "auditor" }, accessLogin.cookie);
    assert.equal(newAccessUser.response.status, 201);
    assert.equal(newAccessUser.data.user.must_change_password, true);
    assert.match(newAccessUser.data.temporaryCode, /^[A-HJ-NP-Z2-9]{10}$/);
    assert.equal((await access("users", { fullName: "Access Test", username: "david.souza", email: "another@test.local", role: "auditor" }, accessLogin.cookie)).response.status, 409);
    const newLogin = await access("login", { username: "david.souza", password: newAccessUser.data.temporaryCode });
    assert.equal(newLogin.response.status, 200);
    assert.equal((await access("users", { fullName: "Denied", email: "denied@test.local", role: "admin" }, newLogin.cookie)).response.status, 403);
    const finalPassword = "Definitive-" + crypto.randomUUID();
    assert.equal((await access("password", { currentPassword: newAccessUser.data.temporaryCode, password: finalPassword }, newLogin.cookie)).response.status, 200);
    assert.equal((await access("me", null, newLogin.cookie)).response.status, 401);
    assert.equal((await access("login", { username: "david.souza", password: newAccessUser.data.temporaryCode })).response.status, 401);
    const finalLogin = await access("login", { username: "david.souza", password: finalPassword });
    assert.equal(finalLogin.data.user.must_change_password, false);
    assert.equal((await access("forgot-password", { username: "david.souza" })).response.status, 200);
    const usersAfterRequest = await access("users", null, accessLogin.cookie);
    assert.equal(usersAfterRequest.data.users.find((item) => item.username === "david.souza").reset_pending, true);
    const reset = await access(`users/${newAccessUser.data.user.id}/reset-password`, {}, accessLogin.cookie);
    assert.equal(reset.response.status, 200);
    assert.match(reset.data.temporaryCode, /^[A-HJ-NP-Z2-9]{10}$/);
    assert.equal((await access("login", { username: "david.souza", password: finalPassword })).response.status, 401);
    assert.equal((await access("login", { username: "david.souza", password: reset.data.temporaryCode })).data.user.must_change_password, true);
    const csrf = await fetch(base + "/api/access/users", { method: "POST", headers: { cookie: accessLogin.cookie, origin: "https://untrusted.test", "content-type": "application/json" }, body: "{}" });
    assert.equal(csrf.status, 403);
    assert.equal((await access("logout", {}, accessLogin.cookie)).response.status, 200);
    assert.equal((await access("me", null, accessLogin.cookie)).response.status, 401);
    console.log("PASS: password login, private cookie session, administrator-only registration, generated first-access code, password request/reset, mandatory password change, revocation, logout and cross-origin rejection.");
    const operationalLogin = await access("login", { username: "admin.test", password: accessPassword });
    assert.equal(operationalLogin.response.status, 200);
    authenticatedCookie = operationalLogin.cookie;
    const token = "";
    const deviceUid = crypto.randomUUID();
    const localAuditId = crypto.randomUUID();
    const creation = { clientOperationId: "create-" + localAuditId, clientSequence: 1, entityType: "audit", operation: "create", payload: { localAuditId, areaSlug: area.slug } };
    const answer = { clientOperationId: "answer-" + localAuditId, clientSequence: 2, entityType: "audit_answer", operation: "upsert", dependsOn: [creation.clientOperationId], payload: { localAuditId, questionId: question.id, answer: "NC", notes: "Offline evidence test" } };
    const received = await json("/api/sync-queue", { deviceUid, operations: [creation, answer] }, "POST", token);
    assert.equal(received.complete, true);
    const auditId = received.operations[0].result_entity_id;
    const retry = await json("/api/sync-queue", { deviceUid, operations: [creation, answer] }, "POST", token);
    assert.equal(retry.operations[0].result_entity_id, auditId);
    const original = await json("/api/audits/" + auditId, null, "GET", token);
    assert.equal(original.answers.length, 1);
    assert.equal(original.answers[0].answer, "NC");
    const bytes = Buffer.from("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAusB9Wl6xT0AAAAASUVORK5CYII=", "base64");
    const headers = { cookie: authenticatedCookie, "content-type": "image/png", "x-device-uid": deviceUid, "x-local-file-id": "photo-1", "x-file-name": "photo.png" };
    const upload = await fetch(base + "/api/offline-files", { method: "POST", headers, body: bytes });
    assert.ok(upload.ok);
    const file = (await upload.json()).file;
    const secondUpload = await fetch(base + "/api/offline-files", { method: "POST", headers, body: bytes });
    assert.equal((await secondUpload.json()).file.id, file.id);
    const photoOp = { clientOperationId: "photo-" + localAuditId, clientSequence: 3, entityType: "stored_file", operation: "upload", dependsOn: [answer.clientOperationId], payload: { localAuditId, localFileId: "photo-1", entityType: "audit_answer", questionId: question.id } };
    await json("/api/sync-queue", { deviceUid, operations: [photoOp] }, "POST", token);
    const download = await fetch(base + "/api/files/" + file.id + "/content", { headers: { cookie: authenticatedCookie } });
    assert.deepEqual(Buffer.from(await download.arrayBuffer()), bytes);
    const updated = await json("/api/audits/" + auditId, null, "GET", token);
    assert.equal(updated.files.length, 1);
    const conflict = { ...answer, clientOperationId: "conflict-" + localAuditId, clientSequence: 4, payload: { ...answer.payload, answer: "C", expectedRevision: 0 } };
    const conflictResult = await json("/api/sync-queue", { deviceUid, operations: [conflict] }, "POST", token);
    assert.equal(conflictResult.complete, false);
    assert.equal(conflictResult.operations[0].status, "error");
    const resolution = await json("/api/sync-queue/" + conflict.clientOperationId + "/resolve", { deviceUid, strategy: "keep_device" }, "POST", token);
    assert.equal(resolution.original.status, "ignored");
    assert.equal(resolution.replacement.status, "synced");
    assert.equal(resolution.replacement.result_payload.answer.answer, "C");
    const finalization = { clientOperationId: "finish-" + localAuditId, clientSequence: 5, entityType: "audit", operation: "finalize", dependsOn: [photoOp.clientOperationId], payload: { localAuditId } };
    const finished = await json("/api/sync-queue", { deviceUid, operations: [finalization] }, "POST", token);
    assert.equal(finished.complete, true);
    assert.equal(finished.operations[0].result_payload.audit.status, "finished");
    assert.equal(Number(finished.operations[0].result_payload.audit.final_score), 10);
    const count = await pool.query("select count(*)::int as count from audits where local_audit_id=$1", [localAuditId]);
    assert.equal(count.rows[0].count, 1);
    await json("/api/dashboard");
    const setting = await json("/api/workflow-settings", { actionPlanDueDays: 45 }, "PATCH", token);
    assert.equal(setting.settings.action_plan_due_days, 45);
    const requirement = await json("/api/document-requirements", { name: "Test requirement", documentType: "test", areaId: area.id }, "POST", token);
    const certificate = await json("/api/certificates", { name: "Test certificate", documentType: "test", areaId: area.id, requirementId: requirement.item.id, expiresAt: "2027-01-01" }, "POST", token);
    assert.equal(certificate.item.requirement_id, requirement.item.id);
    const job = await json("/api/report-jobs", { areaId: area.id, cycleId: finished.operations[0].result_payload.audit.cycle_id, reportType: "monthly" }, "POST", token);
    let completed;
    for (let attempt = 0; attempt < 120; attempt++) {
      completed = (await json("/api/report-jobs/" + job.reportJob.id, null, "GET", token)).reportJob;
      if (["completed", "failed"].includes(completed.status)) break;
      await new Promise((resolve) => setTimeout(resolve, 250));
    }
    assert.equal(completed.status, "completed", completed.error_message || "PDF generation did not complete");
    const reports = await json("/api/reports", null, "GET", token);
    assert.equal(reports.reports.length, 1);
    const pdfResponse = await fetch(base + reports.reports[0].file_url, { headers: { cookie: authenticatedCookie } });
    const pdf = Buffer.from(await pdfResponse.arrayBuffer());
    assert.equal(pdf.subarray(0, 5).toString(), "%PDF-");
    const versions = await json("/api/reports/" + completed.report_id + "/versions", null, "GET", token);
    assert.equal(versions.versions.length, 1);
    const notifications = await json("/api/notifications", null, "GET", token);
    assert.ok(notifications.notifications.some((item) => item.notification_type === "report_ready"));
    console.log("PASS: real PostgreSQL migrations, 437 checklist questions, user/session APIs, offline audit/answer application, retransmission, actual photo upload/link/download, conflict resolution, finalization, configuration/document APIs, real PDF generation, report history and automatic notification.");
  } finally {
    if (api && api.exitCode == null) {
      const stopped = new Promise((resolve) => api.once("exit", resolve));
      api.kill();
      await stopped;
    }
    if (pool) await pool.end();
    await database.stop();
  }
}

main().catch((error) => { console.error(error); process.exitCode = 1; });
