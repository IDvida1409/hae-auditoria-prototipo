const test = require("node:test");
const assert = require("node:assert/strict");
const schema = require("../interview/schema");
const interviews = require("../lib/clinical-interviews");

function completeAnswers() {
  return {
    institution: "Clínica Escola", serviceType: "Clínica-escola", audience: "Público geral",
    professional: "Maria Silva", crp: "06/12345", role: "Psicóloga clínica", team: "Psicólogos e assistentes sociais",
    ageRanges: ["Adultos"], approach: "Psicanálise", modalities: ["Individual", "Presencial"],
    accessPaths: ["Procura espontânea"], instruments: ["Entrevista"],
    responses: Object.fromEntries(schema.sections.flatMap((section) => section.questions.map((question) => [question.id, `Resposta sobre ${question.refs}.`])))
  };
}

test("o envio exige as 16 respostas e as marcações essenciais", () => {
  const valid = interviews.validateAnswers(completeAnswers(), true);
  assert.equal(Object.keys(valid.responses).length, 16);
  assert.deepEqual(valid.modalities, ["Individual", "Presencial"]);
  const incomplete = completeAnswers();
  incomplete.responses.q12 = "";
  assert.throws(() => interviews.validateAnswers(incomplete, true), /Preencha/);
  const invalid = completeAnswers();
  invalid.approach = "Abordagem inventada";
  assert.throws(() => interviews.validateAnswers(invalid, true), /opção marcada/);
});

test("o PDF inclui a entrevista completa", () => {
  const pdf = interviews.pdfBuffer({ id: "test", answers: completeAnswers(), submitted_at: new Date().toISOString() });
  assert.ok(pdf.length > 3000);
  assert.equal(pdf.subarray(0, 4).toString(), "%PDF");
});

test("a API privada exige login principal", async () => {
  let result;
  const response = { setHeader() {} };
  const context = {
    getPool: async () => ({ query: async () => { throw new Error("Não deveria consultar entrevistas"); } }),
    requireDatabase: () => true,
    sendJson: (_response, status, body) => { result = { status, body }; },
    authenticated: async () => null
  };
  await interviews.handle({ method: "GET", headers: { host: "localhost" } }, response, new URL("http://localhost/api/clinical-interviews/admin"), context);
  assert.equal(result.status, 401);
  context.authenticated = async () => ({ id: "other", username: "outro.admin", is_master: false });
  await interviews.handle({ method: "GET", headers: { host: "localhost" } }, response, new URL("http://localhost/api/clinical-interviews/admin"), context);
  assert.equal(result.status, 403);
  context.authenticated = async () => ({ id: "owner", username: "david.souza", is_master: true });
  context.getPool = async () => ({ query: async () => ({ rows: [{ password_hash: "hash" }] }) });
  context.verifyPassword = async () => true;
  await interviews.handle({ method: "GET", headers: { host: "localhost" } }, response, new URL("http://localhost/api/clinical-interviews/admin"), context);
  assert.equal(result.status, 403);
  assert.match(result.body.error, /senha inicial/);
});

test("o entrevistado pode salvar e enviar; após envio o link não mostra respostas", async () => {
  const row = { id: "00000000-0000-0000-0000-000000000001", answers: {}, status: "draft", updated_at: new Date().toISOString(), submitted_at: null };
  let result;
  const pool = { query: async (sql, params) => {
    if (sql.startsWith("select id,answers")) return { rows: [row] };
    if (sql.startsWith("update clinical_interviews")) {
      row.answers = JSON.parse(params[1]); row.updated_at = new Date().toISOString();
      if (sql.includes("status='submitted'")) { row.status = "submitted"; row.submitted_at = new Date().toISOString(); }
      return { rows: [{ updated_at: row.updated_at, submitted_at: row.submitted_at }] };
    }
    throw new Error("Consulta inesperada");
  } };
  const context = { getPool: async () => pool, requireDatabase: () => true,
    readJsonBody: async () => completeAnswers(), sendJson: (_response, status, body) => { result = { status, body }; } };
  const url = new URL(`http://localhost/api/clinical-interviews/respond/${interviews.freshToken()}`);
  const request = (method) => ({ method, headers: { host: "localhost", origin: "http://localhost" } });
  const response = { setHeader() {} };
  await interviews.handle(request("PUT"), response, url, context);
  assert.equal(result.body.status, "draft");
  await interviews.handle(request("POST"), response, url, context);
  assert.equal(result.body.status, "submitted");
  await interviews.handle(request("GET"), response, url, context);
  assert.deepEqual(Object.keys(result.body).sort(), ["status", "submittedAt"]);
});
