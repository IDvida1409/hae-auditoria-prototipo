const crypto = require("node:crypto");
const { jsPDF } = require("jspdf");
const schema = require("../interview/schema");

const prefix = "/api/clinical-interviews";
const questionIds = schema.sections.flatMap((section) => section.questions.map((question) => question.id));
const textFields = ["studentName", "rgm", "institution", "serviceTypeOther", "audience", "professional", "crp", "role", "team", "approachOther"];
const choiceFields = ["serviceType", "approach"];
const multiFields = ["ageRanges", "modalities", "accessPaths", "instruments"];

function tokenHash(token) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

function freshToken() {
  return `ci_${crypto.randomBytes(32).toString("base64url")}`;
}

function cleanText(value, limit = 6000) {
  if (value == null) return "";
  if (typeof value !== "string" || value.length > limit) throw Object.assign(new Error("Um campo de texto excede o limite permitido."), { status: 400 });
  return value.trim();
}

function validateAnswers(input, final = false) {
  if (!input || typeof input !== "object" || Array.isArray(input)) throw Object.assign(new Error("Respostas inválidas."), { status: 400 });
  const result = { schemaVersion: schema.version, responses: {} };
  for (const field of textFields) result[field] = cleanText(input[field], field === "audience" || field === "team" ? 2000 : 250);
  for (const field of choiceFields) {
    const value = cleanText(input[field], 80);
    if (value && !schema.choices[field].includes(value)) throw Object.assign(new Error("Uma opção marcada é inválida."), { status: 400 });
    result[field] = value;
  }
  for (const field of multiFields) {
    const values = input[field] == null ? [] : input[field];
    if (!Array.isArray(values) || values.length > schema.choices[field].length || values.some((item) => typeof item !== "string" || !schema.choices[field].includes(item))) {
      throw Object.assign(new Error("Uma lista de opções marcadas é inválida."), { status: 400 });
    }
    result[field] = [...new Set(values)];
  }
  const responses = input.responses && typeof input.responses === "object" && !Array.isArray(input.responses) ? input.responses : {};
  for (const id of questionIds) result.responses[id] = cleanText(responses[id]);
  if (final) {
    const missing = [];
    for (const field of ["institution", "professional", "crp", "role", "serviceType", "audience", "team", "approach"]) if (!result[field]) missing.push(field);
    for (const field of ["ageRanges", "modalities", "accessPaths", "instruments"]) if (!result[field].length) missing.push(field);
    for (const id of questionIds) if (!result.responses[id]) missing.push(id);
    if (missing.length) throw Object.assign(new Error("Preencha a identificação e todas as perguntas antes de enviar. Se algo não se aplica, explique no campo correspondente."), { status: 400, missing });
  }
  return result;
}

function sameOrigin(request) {
  const origin = request.headers.origin;
  if (!origin) return true;
  try { return new URL(origin).host === request.headers.host; }
  catch { return false; }
}

function setPrivateHeaders(response) {
  response.setHeader("Cache-Control", "no-store");
  response.setHeader("Referrer-Policy", "no-referrer");
}

function pdfBuffer(row) {
  const answers = row.answers || {};
  const doc = new jsPDF({ unit: "mm", format: "a4", compress: true });
  const width = 210;
  let y = 24;
  let page = 1;
  const bottom = 276;
  function nextPage() {
    doc.setFontSize(9);
    doc.setTextColor(100, 115, 138);
    doc.text(`Página ${page}`, 190, 286, { align: "right" });
    doc.addPage(); page++;
    y = 22;
  }
  function keep(height) { if (y + height > bottom) nextPage(); }
  function drawLines(lines, font, size, color, step) {
    for (const line of lines) {
      keep(step);
      doc.setFont("helvetica", font);
      doc.setFontSize(size);
      doc.setTextColor(...color);
      doc.text(line, 19, y);
      y += step;
    }
  }
  function block(label, value, style = "normal") {
    const heading = style === "heading";
    const labelLines = doc.splitTextToSize(String(label).replace(/\u2013/g, "-"), 172);
    const valueLines = heading ? [] : doc.splitTextToSize(String(value || "Não informado").replace(/\u2013/g, "-"), 172);
    keep(heading ? labelLines.length * 7 + 4 : labelLines.length * 5 + Math.min(2, valueLines.length) * 5 + 8);
    doc.setFont("helvetica", "bold"); doc.setFontSize(heading ? 13 : 10);
    drawLines(labelLines, "bold", heading ? 13 : 10, heading ? [7, 51, 104] : [22, 42, 88], heading ? 7 : 5);
    if (!heading) {
      y += 1;
      doc.setFont("helvetica", "normal"); doc.setFontSize(10);
      drawLines(valueLines, "normal", 10, [20, 35, 57], 5);
    }
    y += heading ? 4 : 7;
  }
  function line(label, value) { block(label, value || "Não informado"); }
  function options(label, selected, all) {
    const values = Array.isArray(selected) ? selected : selected ? [selected] : [];
    block(label, all.map((item) => `${values.includes(item) ? "[X]" : "[ ]"} ${item}`).join("    "));
  }
  doc.setFillColor(3, 26, 53); doc.rect(0, 0, width, 14, "F");
  doc.setFont("helvetica", "bold"); doc.setFontSize(18); doc.setTextColor(3, 26, 53);
  doc.text("Entrevista - Estágios Clínicos", 19, y); y += 11;
  doc.setFont("helvetica", "normal"); doc.setFontSize(9); doc.setTextColor(83, 99, 122);
  doc.text(`Enviado em: ${row.submitted_at ? new Date(row.submitted_at).toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" }) : "Rascunho"}`, 19, y); y += 13;
  line("Estudante / RGM", [answers.studentName, answers.rgm].filter(Boolean).join(" / "));
  line("Instituição / clínica", answers.institution);
  options("Tipo de serviço", answers.serviceType, schema.choices.serviceType);
  if (answers.serviceTypeOther) line("Outro tipo de serviço", answers.serviceTypeOther);
  line("Público atendido", answers.audience);
  line("Profissional / CRP / função", [answers.professional, answers.crp, answers.role].filter(Boolean).join(" / "));
  line("Equipe multiprofissional", answers.team);
  options("Faixas etárias", answers.ageRanges, schema.choices.ageRanges);
  options("Abordagem predominante", answers.approach, schema.choices.approach);
  if (answers.approachOther) line("Outra abordagem", answers.approachOther);
  options("Modalidades", answers.modalities, schema.choices.modalities);
  options("Formas de acesso", answers.accessPaths, schema.choices.accessPaths);
  options("Instrumentos", answers.instruments, schema.choices.instruments);
  for (const section of schema.sections) {
    keep(22);
    doc.setDrawColor(203, 216, 230); doc.line(19, y - 4, 191, y - 4);
    block(`${section.number}. ${section.title}`, "", "heading");
    for (const question of section.questions) block(`${question.id.slice(1)}. ${question.text}`, answers.responses?.[question.id]);
  }
  doc.setFontSize(9); doc.setTextColor(100, 115, 138); doc.text(`Página ${page}`, 190, 286, { align: "right" });
  return Buffer.from(doc.output("arraybuffer"));
}

async function handle(request, response, url, context) {
  if (!url.pathname.startsWith(prefix)) return false;
  const { getPool, sendJson, readJsonBody, requireDatabase, authenticated, verifyPassword } = context;
  setPrivateHeaders(response);
  if (!["GET", "HEAD"].includes(request.method) && !sameOrigin(request)) { sendJson(response, 403, { error: "Origem não autorizada." }); return true; }
  try {
    const pool = await getPool();
    if (!requireDatabase(response, pool)) return true;
    const responder = url.pathname.match(/^\/api\/clinical-interviews\/respond\/(ci_[A-Za-z0-9_-]{43})$/);
    if (responder) {
      const token = responder[1];
      const selected = await pool.query("select id,answers,status,updated_at,submitted_at from clinical_interviews where invite_token_hash=$1", [tokenHash(token)]);
      const row = selected.rows[0];
      if (!row) { sendJson(response, 404, { error: "Link inválido ou expirado." }); return true; }
      if (request.method === "GET") {
        sendJson(response, 200, row.status === "submitted" ? { status: "submitted", submittedAt: row.submitted_at } : { status: "draft", answers: row.answers, updatedAt: row.updated_at });
        return true;
      }
      if (row.status !== "draft") { sendJson(response, 409, { error: "Esta entrevista já foi enviada." }); return true; }
      if (request.method === "PUT" || request.method === "POST") {
        const answers = validateAnswers(await readJsonBody(request), request.method === "POST");
        const result = await pool.query(
          request.method === "POST"
            ? "update clinical_interviews set answers=$2::jsonb,status='submitted',submitted_at=now(),updated_at=now() where id=$1 and status='draft' returning updated_at,submitted_at"
            : "update clinical_interviews set answers=$2::jsonb,updated_at=now() where id=$1 and status='draft' returning updated_at,submitted_at",
          [row.id, JSON.stringify(answers)]
        );
        if (!result.rows[0]) { sendJson(response, 409, { error: "Esta entrevista já foi enviada." }); return true; }
        sendJson(response, 200, request.method === "POST" ? { status: "submitted", submittedAt: result.rows[0].submitted_at } : { status: "draft", updatedAt: result.rows[0].updated_at });
        return true;
      }
      sendJson(response, 405, { error: "Método não permitido." }); return true;
    }
    if (!url.pathname.startsWith(prefix + "/admin")) { sendJson(response, 404, { error: "Rota não encontrada." }); return true; }
    const user = await authenticated(pool, request);
    if (!user) { sendJson(response, 401, { error: "Entre na sua conta para continuar." }); return true; }
    const ownerUsername = String(process.env.INTERVIEW_OWNER_USERNAME || process.env.PRIMARY_ADMIN_USERNAME || "david.souza").trim().toLowerCase();
    if (user.is_master !== true || String(user.username || "").toLowerCase() !== ownerUsername || user.must_change_password || user.password_reset_pending) {
      sendJson(response, 403, { error: "Somente o responsável pela entrevista pode consultar as respostas." }); return true;
    }
    const password = await pool.query("select password_hash from app_users where id=$1", [user.id]);
    if (!password.rows[0]?.password_hash || await verifyPassword("12345678", password.rows[0].password_hash)) {
      sendJson(response, 403, { error: "Altere a senha inicial no IDAuditor antes de acessar entrevistas privadas." }); return true;
    }
    if (url.pathname === prefix + "/admin") {
      if (request.method === "GET") {
        const result = await pool.query("select id,status,created_at,updated_at,submitted_at,answers->>'professional' as professional,answers->>'institution' as institution from clinical_interviews where owner_user_id=$1 order by created_at desc", [user.id]);
        sendJson(response, 200, { interviews: result.rows }); return true;
      }
      if (request.method === "POST") {
        const token = freshToken();
        const result = await pool.query("insert into clinical_interviews (owner_user_id,invite_token_hash) values ($1,$2) returning id,created_at", [user.id, tokenHash(token)]);
        sendJson(response, 201, { interview: result.rows[0], link: `/interview/index.html?key=${token}` }); return true;
      }
    }
    const match = url.pathname.match(/^\/api\/clinical-interviews\/admin\/([0-9a-f-]{36})(?:\/(pdf|renew))?$/i);
    if (!match) { sendJson(response, 404, { error: "Rota não encontrada." }); return true; }
    const id = match[1];
    if (match[2] === "renew" && request.method === "POST") {
      const token = freshToken();
      const result = await pool.query("update clinical_interviews set invite_token_hash=$3,updated_at=now() where id=$1 and owner_user_id=$2 and status='draft' returning id", [id, user.id, tokenHash(token)]);
      if (!result.rows[0]) { sendJson(response, 404, { error: "Rascunho não encontrado." }); return true; }
      sendJson(response, 200, { link: `/interview/index.html?key=${token}` }); return true;
    }
    if (request.method !== "GET") { sendJson(response, 405, { error: "Método não permitido." }); return true; }
    const result = await pool.query("select id,status,answers,created_at,updated_at,submitted_at from clinical_interviews where id=$1 and owner_user_id=$2", [id, user.id]);
    const row = result.rows[0];
    if (!row) { sendJson(response, 404, { error: "Entrevista não encontrada." }); return true; }
    if (match[2] === "pdf") {
      const pdf = pdfBuffer(row);
      response.writeHead(200, { "Content-Type": "application/pdf", "Content-Disposition": `attachment; filename="entrevista-clinica-${row.id}.pdf"`, "Content-Length": pdf.length, "Cache-Control": "no-store" });
      response.end(pdf);
      return true;
    }
    sendJson(response, 200, { interview: row }); return true;
  } catch (error) {
    if (!error.status) console.error("Entrevista clínica:", error);
    sendJson(response, error.status || 500, { error: error.status ? error.message : "Não foi possível concluir a operação.", ...(error.missing ? { missing: error.missing } : {}) });
    return true;
  }
}

module.exports = { handle, validateAnswers, pdfBuffer, freshToken };
