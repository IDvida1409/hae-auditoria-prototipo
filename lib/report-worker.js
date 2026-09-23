const crypto = require("node:crypto");
const path = require("node:path");
if (process.env.RENDER === "true" && !process.env.REPORT_CHROME_PATH) {
  process.env.PLAYWRIGHT_BROWSERS_PATH = path.resolve(__dirname, "..", ".playwright-browsers");
}
const { chromium } = require("playwright");
const { notify } = require("./notifications");
const { REPORT_LAYOUT_VERSION } = require("./report-layout");

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]);
}

async function reportData(pool, job) {
  const unit = await pool.query("select * from units where id=$1", [job.unit_id]);
  const anchor = job.cycle_id ? await pool.query("select month_start from audit_cycles where id=$1 and unit_id=$2", [job.cycle_id, job.unit_id]) : null;
  if (job.cycle_id && !anchor.rows[0]) throw new Error("Ciclo não pertence à unidade");
  const endMonth = anchor ? new Date(anchor.rows[0].month_start) : new Date();
  const span = { monthly: 1, comparison: 2, quarterly: 3, semiannual: 6, annual: 12, general: 12, action_plan: 1 }[job.report_type];
  if (!span) throw new Error("Tipo de relatório inválido");
  const start = new Date(Date.UTC(endMonth.getUTCFullYear(), endMonth.getUTCMonth() - span + 1, 1)).toISOString().slice(0, 10);
  const end = new Date(Date.UTC(endMonth.getUTCFullYear(), endMonth.getUTCMonth() + 1, 1)).toISOString().slice(0, 10);
  const audits = await pool.query(
    "select a.*,ar.name as area_name,ar.slug as area_slug,c.label as cycle_label,c.month_start,u.full_name as auditor_name,r.full_name as responsible_name from audits a join audit_areas ar on ar.id=a.area_id join audit_cycles c on c.id=a.cycle_id left join app_users u on u.id=a.auditor_user_id left join app_users r on r.id=coalesce(a.responsible_user_id,ar.responsible_user_id) where a.unit_id=$1 and a.status='finished' and ($2::uuid is null or a.area_id=$2) and c.month_start>=$3 and c.month_start<$4 order by c.month_start desc,ar.display_order,a.finished_at desc",
    [job.unit_id, job.area_id, start, end]
  );
  if (!audits.rows.length) throw new Error("Não há auditorias finalizadas para esse relatório");
  const answers = await pool.query(
    "select aa.*,q.requirement_text from audit_answers aa join checklist_questions q on q.id=aa.question_id where aa.audit_id=any($1::uuid[]) order by aa.audit_id,q.question_number",
    [audits.rows.map((audit) => audit.id)]
  );
  const plans = await pool.query("select * from action_plans where unit_id=$1 and origin_audit_id=any($2::uuid[]) order by due_at nulls last", [job.unit_id, audits.rows.map((audit) => audit.id)]);
  const linked = await pool.query("select f.*,l.entity_type,l.entity_id,s.contents from stored_files f join file_links l on l.file_id=f.id join stored_file_contents s on s.file_id=f.id where f.unit_id=$1 and f.storage_provider='local_private' and f.mime_type in ('image/jpeg','image/png','image/webp') and ((l.entity_type='audit' and l.entity_id=any($2::uuid[])) or (l.entity_type='audit_answer' and l.entity_id=any($3::uuid[])))", [job.unit_id, audits.rows.map((audit) => audit.id), answers.rows.map((answer) => answer.id)]);
  let totalBytes = 0;
  const photos = [];
  for (const file of linked.rows) {
    totalBytes += Number(file.file_size_bytes);
    if (totalBytes > 50 * 1024 * 1024) throw new Error("Evidências excedem 50 MB; gere relatórios por área");
    photos.push({ ...file, contents: undefined, src: "data:" + file.mime_type + ";base64," + file.contents.toString("base64") });
  }
  return { unit: unit.rows[0], audits: audits.rows, answers: answers.rows, plans: plans.rows, photos };
}

function reportHtml(job, data) {
  const title = "Relatório de auditoria";
  let content;
  if (job.report_type === "action_plan") {
    content = "<h2>Planos de ação</h2><table><thead><tr><th>Plano</th><th>Correção</th><th>Status</th><th>Prazo</th></tr></thead><tbody>" +
      data.plans.map((plan) => "<tr><td>" + escapeHtml(plan.title) + "</td><td>" + escapeHtml(plan.corrective_action) + "</td><td>" + escapeHtml(plan.status) + "</td><td>" + escapeHtml(plan.due_at?.toISOString?.().slice(0, 10) || "") + "</td></tr>").join("") + "</tbody></table>";
  } else {
    content = data.audits.map((audit) => {
      const answers = data.answers.filter((answer) => answer.audit_id === audit.id);
      const counts = Object.fromEntries(["C", "NC", "X"].map((answer) => [answer, answers.filter((row) => row.answer === answer).length]));
      const answerIds = new Set(answers.map((answer) => answer.id));
      const evidence = (data.photos || []).filter((photo) => photo.entity_type === "audit" ? photo.entity_id === audit.id : answerIds.has(photo.entity_id));
      return "<section><h2>" + escapeHtml(audit.area_name) + "</h2><p>Período: " + escapeHtml(audit.cycle_label) + " | Auditor: " + escapeHtml(audit.auditor_name) + " | Responsável: " + escapeHtml(audit.responsible_name || "Não atribuído") + "</p><p class='summary'>Nota: " + escapeHtml(audit.final_score) + " / 10 &nbsp; C: " + counts.C + " &nbsp; NC: " + counts.NC + " &nbsp; X: " + counts.X + "</p><table><thead><tr><th>Requisito</th><th>Resposta</th><th>Risco</th><th>Observação</th></tr></thead><tbody>" +
        answers.map((answer) => "<tr><td>" + escapeHtml(answer.requirement_text) + "</td><td>" + escapeHtml(answer.answer) + "</td><td>" + escapeHtml(answer.risk_level_snapshot) + "</td><td>" + escapeHtml(answer.notes) + "</td></tr>").join("") + "</tbody></table>" +
        (evidence.length ? "<h3>Evidências fotográficas</h3>" + evidence.map((photo) => "<figure><img style='max-width:100%;max-height:180mm' src='" + photo.src + "'><figcaption>" + escapeHtml(photo.original_filename) + "</figcaption></figure>").join("") : "") + "</section>";
    }).join("");
  }
  return "<!doctype html><html lang='pt-BR'><head><meta charset='utf-8'><title>" + title + "</title><style>@page{size:A4;margin:18mm}body{font-family:Arial,sans-serif;font-size:11px;color:#182b40}h1{font-size:22px}h2{font-size:16px;margin-top:24px}table{width:100%;border-collapse:collapse;table-layout:fixed}th,td{border:1px solid #ccd4dd;padding:7px;overflow-wrap:anywhere;text-align:left;vertical-align:top}th{background:#edf2f7}thead{display:table-header-group}tr{break-inside:avoid}.summary{font-weight:bold;font-size:14px}footer{font-size:9px;color:#667085}</style></head><body><header><h1>" + title + "</h1><p>" + escapeHtml(data.unit?.name) + "</p><p>Tipo: " + escapeHtml(job.report_type) + "</p></header>" + content + "<footer>Gerado em " + new Date().toISOString() + "</footer></body></html>";
}

async function renderPdf(html) {
  let browser;
  try {
    browser = await chromium.launch({
      headless: true,
      ...(process.env.REPORT_CHROME_PATH ? { executablePath: process.env.REPORT_CHROME_PATH } : {})
    });
    const context = await browser.newContext({ javaScriptEnabled: false });
    await context.route("**/*", (route) => route.abort());
    const page = await context.newPage();
    await page.setContent(html, { waitUntil: "load", timeout: 30000 });
    return await page.pdf({ format: "A4", printBackground: true, preferCSSPageSize: true });
  } finally { await browser.close(); }
}

async function renderApprovedMonthlyPdf(pool, job, data) {
  const audit = data.audits[0];
  const userId = job.requested_by_user_id || audit.auditor_user_id;
  if (!userId || !audit.area_slug) throw new Error("Relatório sem usuário ou área para renderização");
  const token = crypto.randomBytes(32).toString("hex");
  const tokenHash = crypto.createHash("sha256").update(token).digest("hex");
  const origin = String(process.env.REPORT_RENDER_ORIGIN || `http://127.0.0.1:${process.env.PORT || 3000}`).replace(/\/$/, "");
  await pool.query(
    "insert into user_sessions (user_id,token_hash,user_agent,expires_at,last_seen_at) values ($1,$2,'internal-report-worker',now()+interval '5 minutes',now())",
    [userId, tokenHash]
  );
  const browser = await chromium.launch({
    headless: true,
    ...(process.env.REPORT_CHROME_PATH ? { executablePath: process.env.REPORT_CHROME_PATH } : {})
  });
  try {
    const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
    await context.addCookies([{ name: "idvida_access", value: token, url: origin, httpOnly: true, sameSite: "Strict" }]);
    const page = await context.newPage();
    const url = `${origin}/?reportFile=monthly&area=${encodeURIComponent(audit.area_slug)}&reportWorker=1`;
    await page.goto(url, { waitUntil: "networkidle", timeout: 90000 });
    await page.waitForFunction(() => window.__IDAUDITOR_REPORT_READY__ === true, null, { timeout: 90000 });
    await page.waitForFunction(() => Array.from(document.images).every((image) => image.complete), null, { timeout: 30000 });
    await page.emulateMedia({ media: "print" });
    return await page.pdf({ format: "A4", printBackground: true, preferCSSPageSize: true, margin: { top: 0, right: 0, bottom: 0, left: 0 } });
  } finally {
    if (browser) await browser.close();
    await pool.query("delete from user_sessions where token_hash=$1", [tokenHash]).catch(() => {});
  }
}

async function processNext(pool) {
  const token = crypto.randomUUID();
  const claimClient = await pool.connect();
  let claimed;
  try {
    await claimClient.query("begin");
    await claimClient.query("select pg_advisory_xact_lock(hashtextextended('idauditor-report-claim',0))");
    await claimClient.query("update report_generation_jobs set status='failed',error_message='Limite de tentativas atingido',finished_at=now() where status='processing' and lease_expires_at<now() and attempts>=3");
    claimed = await claimClient.query(
      `update report_generation_jobs
          set status='processing',claim_token=$1,attempts=attempts+1,started_at=now(),
              lease_expires_at=now()+interval '2 minutes',error_message=null
        where id=(
          select id from report_generation_jobs
           where ((status='queued' and (lease_expires_at is null or lease_expires_at<now()))
                  or (status='processing' and lease_expires_at<now()))
             and attempts<3
             and not exists (
               select 1 from report_generation_jobs active
                where active.status='processing' and active.lease_expires_at>=now()
             )
           order by created_at,id for update skip locked limit 1
        ) returning *`,
      [token]
    );
    await claimClient.query("commit");
  } catch (error) {
    await claimClient.query("rollback").catch(() => {});
    throw error;
  } finally { claimClient.release(); }
  const job = claimed.rows[0];
  if (!job) return null;
  try {
    const data = await reportData(pool, job);
    const pdf = job.report_type === "monthly"
      ? await renderApprovedMonthlyPdf(pool, job, data)
      : await renderPdf(reportHtml(job, data));
    const checksum = crypto.createHash("sha256").update(pdf).digest("hex");
    const client = await pool.connect();
    try {
      await client.query("begin");
      const active = await client.query("select id from report_generation_jobs where id=$1 and claim_token=$2 and status='processing' for update", [job.id, token]);
      if (!active.rows.length) throw new Error("Job foi retomado por outro worker");
      const audit = data.audits[0];
      const month = new Date(audit.month_start).toISOString().slice(0, 7);
      const filename = job.report_type === "monthly"
        ? `hae-consolidado-mes-${audit.area_slug}-${month}-${REPORT_LAYOUT_VERSION}.pdf`
        : `relatorio-${job.id}.pdf`;
      const file = await client.query("insert into stored_files (unit_id,uploaded_by_user_id,file_type,storage_provider,storage_key,original_filename,mime_type,file_size_bytes,checksum) values ($1,$2,'report_pdf','local_private',$3,$4,'application/pdf',$5,$3) returning *", [job.unit_id, job.requested_by_user_id, checksum, filename, pdf.length]);
      await client.query("insert into stored_file_contents (file_id,contents) values ($1,$2)", [file.rows[0].id, pdf]);
      const title = "Relatório " + job.report_type;
      const period = data.audits[0].cycle_label;
      const report = await client.query(
        "insert into reports (unit_id,area_id,audit_id,cycle_id,generated_by_user_id,pdf_file_id,report_type,title,period_label,file_url,file_name,download_name,available_from) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$11,current_date) on conflict (area_id,cycle_id,report_type) where area_id is not null and cycle_id is not null do update set audit_id=excluded.audit_id,pdf_file_id=excluded.pdf_file_id,file_url=excluded.file_url,file_name=excluded.file_name,download_name=excluded.download_name,status='generated' returning *",
        [job.unit_id, job.area_id, audit.id, job.cycle_id, job.requested_by_user_id, file.rows[0].id, job.report_type, title, period, "/api/files/" + file.rows[0].id + "/content", file.rows[0].original_filename]
      );
      const completed = await client.query("update report_generation_jobs set status='completed',report_id=$3,finished_at=now(),lease_expires_at=null where id=$1 and claim_token=$2 returning *", [job.id, token, report.rows[0].id]);
      await client.query("insert into report_artifacts (report_id,file_id,job_id) values ($1,$2,$3) on conflict (job_id) do update set report_id=excluded.report_id,file_id=excluded.file_id,created_at=now()", [report.rows[0].id, file.rows[0].id, job.id]);
      await client.query("insert into activity_logs (unit_id,actor_user_id,entity_type,entity_id,action,metadata) values ($1,$2,'report',$3,'report.generated',$4::jsonb)", [job.unit_id, job.requested_by_user_id, report.rows[0].id, JSON.stringify({ jobId: job.id, reportType: job.report_type, auditId: audit.id, layoutVersion: job.report_type === "monthly" ? REPORT_LAYOUT_VERSION : null })]);
      await notify(client, { unitId: job.unit_id, recipientId: job.requested_by_user_id, title: "Relatório pronto", type: "report_ready", entityType: "report", entityId: report.rows[0].id, key: "report-ready:" + job.id });
      const responsible = job.area_id ? await client.query(
        `select coalesce(a.responsible_user_id,(
           select p.user_id from user_area_permissions p join app_users u on u.id=p.user_id
           where p.area_id=a.id and p.active=true and u.active=true and u.role='area_responsible'
           order by p.created_at,p.id limit 1
         )) as user_id from audit_areas a where a.id=$1`,
        [job.area_id]
      ) : { rows: [] };
      if (responsible.rows[0]?.user_id && responsible.rows[0].user_id !== job.requested_by_user_id) {
        await notify(client, { unitId: job.unit_id, recipientId: responsible.rows[0].user_id, title: "Relatório da auditoria disponível", type: "report_ready", entityType: "report", entityId: report.rows[0].id, key: "responsible-report-ready:" + job.id });
      }
      await client.query("commit");
      return completed.rows[0];
    } catch (error) { await client.query("rollback"); throw error; }
    finally { client.release(); }
  } catch (error) {
    const result = await pool.query(
      `update report_generation_jobs
          set status=case when attempts<3 then 'queued' else 'failed' end,
              error_message=$3,
              finished_at=case when attempts<3 then null else now() end,
              lease_expires_at=case when attempts<3 then now()+interval '20 seconds' else null end,
              claim_token=null,
              updated_at=now()
        where id=$1 and claim_token=$2 returning *`,
      [job.id, token, error.message]
    );
    return result.rows[0] || null;
  }
}

module.exports = { processNext, renderPdf, renderApprovedMonthlyPdf, reportHtml, escapeHtml, REPORT_LAYOUT_VERSION };
