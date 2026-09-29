const test = require("node:test");
const assert = require("node:assert/strict");
const { enqueueOrganizationMonthlyReport, organizationMonthlyCompletion } = require("../lib/report-service");
const hierarchy = require("../assets/area-hierarchy");
const completedAreas = () => hierarchy.groupById("conforto-medico").subareaIds.map((slug) => ({ slug, active: true, finished: true }));

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

test("todas as subáreas concluídas agendam consolidado da área-pai", async () => {
  const calls = [];
  const db = {
    async query(sql, params) {
      calls.push({ sql, params });
      if (sql.startsWith("select slug from audit_areas")) return { rows: [{ slug: "cozinha-catering" }] };
      if (sql.startsWith("select ar.slug,ar.active")) return { rows: completedAreas() };
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
      if (sql.startsWith("select ar.slug,ar.active")) return { rows: completedAreas() };
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
      if (sql.startsWith("select ar.slug,ar.active")) return { rows: completedAreas() };
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

test("subárea pendente impede consolidado sem consultar ou criar jobs", async () => {
  const db = { async query(sql) {
    if (sql.startsWith("select slug from audit_areas")) return { rows: [{ slug: "cozinha-catering" }] };
    if (sql.startsWith("select ar.slug,ar.active")) return { rows: completedAreas().map((row, index) => ({ ...row, finished: index !== 1 })) };
    throw new Error("Não deve agendar relatório parcial");
  } };
  assert.equal(await enqueueOrganizationMonthlyReport(db, audit(), "user-1"), null);
});

test("subárea ausente não é tratada como concluída", async () => {
  const result = await organizationMonthlyCompletion({ query: async () => ({ rows: completedAreas().slice(1) }) }, "unit-1", "cycle-1", hierarchy.groupById("conforto-medico"));
  assert.equal(result.ready, false);
});

test("subárea arquivada não bloqueia as subáreas ativas", async () => {
  const result = await organizationMonthlyCompletion({ query: async () => ({ rows: completedAreas().map((row, index) => index ? row : { ...row, active: false, finished: false }) }) }, "unit-1", "cycle-1", hierarchy.groupById("conforto-medico"));
  assert.equal(result.ready, true);
  assert.equal(result.areaSlugs.length, 7);
});
