const test = require("node:test");
const assert = require("node:assert/strict");
const { enqueueOrganizationMonthlyReport } = require("../lib/report-service");

function audit(areaId = "area-1") {
  return {
    id: "audit-1",
    unit_id: "unit-1",
    area_id: areaId,
    cycle_id: "cycle-1",
    auditor_user_id: "user-1",
    finished_at: "2026-09-27T12:00:00.000Z"
  };
}

test("auditoria de subárea agenda consolidado da área-pai", async () => {
  const calls = [];
  const db = {
    async query(sql, params) {
      calls.push({ sql, params });
      if (sql.startsWith("select slug from audit_areas")) return { rows: [{ slug: "cozinha-catering" }] };
      if (sql.includes("from reports")) return { rows: [] };
      if (sql.includes("from report_generation_jobs")) return { rows: [] };
      if (sql.startsWith("insert into report_generation_jobs")) return { rows: [{ id: "job-1", status: "queued" }] };
      throw new Error(`Consulta inesperada: ${sql}`);
    }
  };
  const result = await enqueueOrganizationMonthlyReport(db, audit(), "user-1");
  assert.equal(result.id, "job-1");
  const insert = calls.find((call) => call.sql.startsWith("insert into report_generation_jobs"));
  const payload = JSON.parse(insert.params[4]);
  assert.equal(payload.scopeKey, "conforto-medico");
  assert.ok(payload.areaSlugs.includes("cozinha-catering"));
});

test("área isolada não agenda segundo relatório consolidado", async () => {
  const db = {
    async query(sql) {
      if (sql.startsWith("select slug from audit_areas")) return { rows: [{ slug: "documentacao" }] };
      throw new Error("Área isolada não deveria consultar relatórios de grupo");
    }
  };
  assert.equal(await enqueueOrganizationMonthlyReport(db, audit("area-documentacao"), "user-1"), null);
});

test("auditoria concluída durante geração agenda um consolidado sucessor", async () => {
  const calls = [];
  const db = {
    async query(sql, params) {
      calls.push({ sql, params });
      if (sql.startsWith("select slug from audit_areas")) return { rows: [{ slug: "cozinha-catering" }] };
      if (sql.includes("from reports")) return { rows: [] };
      if (sql.includes("from report_generation_jobs")) return { rows: [{ id: "job-processing", status: "processing" }] };
      if (sql.startsWith("insert into report_generation_jobs")) return { rows: [{ id: "job-successor", status: "queued" }] };
      throw new Error(`Consulta inesperada: ${sql}`);
    }
  };
  const result = await enqueueOrganizationMonthlyReport(db, audit(), "user-1");
  assert.equal(result.id, "job-successor");
  assert.ok(calls.some((call) => call.sql.startsWith("insert into report_generation_jobs")));
});

test("job consolidado ainda na fila recebe a auditoria mais recente", async () => {
  const calls = [];
  const db = {
    async query(sql, params) {
      calls.push({ sql, params });
      if (sql.startsWith("select slug from audit_areas")) return { rows: [{ slug: "cozinha-catering" }] };
      if (sql.includes("from reports")) return { rows: [] };
      if (sql.includes("from report_generation_jobs")) return { rows: [{ id: "job-queued", status: "queued" }] };
      if (sql.startsWith("update report_generation_jobs")) return { rows: [{ id: "job-queued", status: "queued" }] };
      throw new Error(`Consulta inesperada: ${sql}`);
    }
  };
  const result = await enqueueOrganizationMonthlyReport(db, audit(), "user-1");
  assert.equal(result.id, "job-queued");
  const update = calls.find((call) => call.sql.startsWith("update report_generation_jobs"));
  assert.equal(update.params[1], "area-1");
  assert.equal(JSON.parse(update.params[3]).scopeKey, "conforto-medico");
});
