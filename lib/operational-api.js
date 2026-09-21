function pageLimit(url) {
  const limit = Number(url.searchParams.get("limit") || 50);
  const offset = Number(url.searchParams.get("offset") || 0);
  if (!Number.isInteger(limit) || limit < 1 || limit > 200 || !Number.isInteger(offset) || offset < 0) throw new Error("Paginacao invalida");
  return { limit, offset };
}

const userFields = new Map([
  ["fullName", "full_name"], ["email", "email"], ["role", "role"],
  ["platformScope", "platform_scope"], ["active", "active"]
]);

function userValues(body) {
  const fields = [];
  for (const [key, column] of userFields) {
    if (!Object.prototype.hasOwnProperty.call(body, key)) continue;
    let value = body[key];
    if (key === "active") {
      if (typeof value !== "boolean") throw new Error("active deve ser booleano");
    } else {
      if (typeof value !== "string" || !value.trim() || value.length > 250) throw new Error("Campo invalido: " + key);
      value = value.trim();
    }
    if (key === "email") {
      value = value.toLowerCase();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) throw new Error("E-mail invalido");
    }
    fields.push({ column, value });
  }
  return fields;
}

async function handle(request, response, url, context) {
  const auditDetail = url.pathname.match(/^\/api\/audits\/([0-9a-f-]+)$/i);
  const userDetail = url.pathname.match(/^\/api\/users\/([0-9a-f-]+)$/i);
  const notification = url.pathname.match(/^\/api\/notifications\/([0-9a-f-]+)\/read$/i);
  const reportVersions = url.pathname.match(/^\/api\/reports\/([0-9a-f-]+)\/versions$/i);
  const reportJob = url.pathname.match(/^\/api\/report-jobs\/([0-9a-f-]+)(\/retry)?$/i);
  const routes = new Set(["/api/offline-bootstrap", "/api/users", "/api/notifications", "/api/dashboard", "/api/reports"]);
  if (!routes.has(url.pathname) && !auditDetail && !userDetail && !notification && !reportVersions && !reportJob && !(url.pathname === "/api/audits" && request.method === "GET")) return false;
  const { getPool, defaultUnitId, currentUser, readJsonBody, sendJson, requireDatabase } = context;
  try {
    const pool = await getPool();
    if (!requireDatabase(response, pool)) return true;
    const unitId = await defaultUnitId(pool);
    const user = await currentUser(pool, request, unitId);
    const allAreas = Boolean(user.all_areas);
    const areaIds = user.area_ids || [];
    const { limit, offset } = pageLimit(url);
    if (url.pathname === "/api/reports" && request.method === "GET") {
      const result = await pool.query("select * from reports where unit_id=$1 and ($2::boolean or area_id=any($3::uuid[])) order by created_at desc,id limit $4 offset $5", [unitId, allAreas, areaIds, limit, offset]);
      sendJson(response, 200, { reports: result.rows, limit, offset, storage: "postgres" });
      return true;
    }
    if (reportVersions && request.method === "GET") {
      const result = await pool.query("select a.*,f.original_filename,f.file_size_bytes from report_artifacts a join reports r on r.id=a.report_id join stored_files f on f.id=a.file_id where r.id=$1 and r.unit_id=$2 and ($3::boolean or r.area_id=any($4::uuid[])) order by a.created_at desc,a.id", [reportVersions[1], unitId, allAreas, areaIds]);
      sendJson(response, 200, { versions: result.rows });
      return true;
    }
    if (reportJob && request.method === "GET" && !reportJob[2]) {
      const result = await pool.query("select * from report_generation_jobs where id=$1 and unit_id=$2", [reportJob[1], unitId]);
      sendJson(response, result.rows.length ? 200 : 404, { reportJob: result.rows[0] || null });
      return true;
    }
    if (reportJob && request.method === "POST" && reportJob[2]) {
      const result = await pool.query("update report_generation_jobs set status='queued',attempts=0,error_message=null,claim_token=null,lease_expires_at=null,finished_at=null where id=$1 and unit_id=$2 and status='failed' returning *", [reportJob[1], unitId]);
      sendJson(response, result.rows.length ? 202 : 409, { reportJob: result.rows[0] || null });
      return true;
    }
    if (url.pathname === "/api/offline-bootstrap" && request.method === "GET") {
      const [areas, checklists, blocks, questions, settings] = await Promise.all([
        pool.query("select a.*,u.full_name as responsible_name from audit_areas a left join app_users u on u.id=a.responsible_user_id where a.unit_id=$1 and a.active=true and ($2::boolean or a.id=any($3::uuid[])) order by a.display_order", [unitId, allAreas, areaIds]),
        pool.query("select * from checklists where unit_id=$1 and is_active=true and ($2::boolean or area_id=any($3::uuid[])) order by created_at", [unitId, allAreas, areaIds]),
        pool.query("select b.* from checklist_blocks b join checklists c on c.id=b.checklist_id where c.unit_id=$1 and c.is_active=true and ($2::boolean or c.area_id=any($3::uuid[])) order by b.display_order", [unitId, allAreas, areaIds]),
        pool.query("select q.* from checklist_questions q join checklist_blocks b on b.id=q.block_id join checklists c on c.id=b.checklist_id where c.unit_id=$1 and c.is_active=true and ($2::boolean or c.area_id=any($3::uuid[])) order by q.question_number", [unitId, allAreas, areaIds]),
        pool.query("select * from audit_workflow_settings where unit_id=$1 and active=true and ($2::boolean or area_id is null or area_id=any($3::uuid[]))", [unitId, allAreas, areaIds])
      ]);
      sendJson(response, 200, { unitId, downloadedAt: new Date().toISOString(), areas: areas.rows,
        checklists: checklists.rows.map((c) => ({ ...c, blocks: blocks.rows.filter((b) => b.checklist_id === c.id).map((b) => ({ ...b, questions: questions.rows.filter((q) => q.block_id === b.id) })) })),
        workflowSettings: settings.rows });
      return true;
    }
    const publicUser = "id,unit_id,full_name,email,role,platform_scope,active,created_at,updated_at";
    if (url.pathname === "/api/users" && request.method === "GET") {
      const result = await pool.query("select " + publicUser + " from app_users where unit_id=$1 order by full_name,id limit $2 offset $3", [unitId, limit, offset]);
      sendJson(response, 200, { users: result.rows, limit, offset });
      return true;
    }
    if (url.pathname === "/api/users" && request.method === "POST") {
      const body = await readJsonBody(request);
      if (!body.fullName || !body.email) throw new Error("Nome e e-mail obrigatorios");
      const fields = userValues(body);
      const values = fields.map((item) => item.value);
      const columns = fields.map((item) => item.column);
      const parameters = values.map((_, index) => "$" + (index + 2));
      const result = await pool.query("insert into app_users (unit_id," + columns.join(",") + ") values ($1," + parameters.join(",") + ") returning " + publicUser, [unitId, ...values]);
      sendJson(response, 201, { user: result.rows[0] });
      return true;
    }
    if (userDetail && request.method === "PATCH") {
      const fields = userValues(await readJsonBody(request));
      if (!fields.length) throw new Error("Nenhum campo editavel informado");
      const values = fields.map((item) => item.value);
      const assignments = fields.map((item, index) => item.column + "=$" + (index + 3));
      const result = await pool.query("update app_users set " + assignments.join(",") + ",updated_at=now() where id=$1 and unit_id=$2 returning " + publicUser, [userDetail[1], unitId, ...values]);
      sendJson(response, result.rows.length ? 200 : 404, result.rows.length ? { user: result.rows[0] } : { error: "Usuario nao encontrado" });
      return true;
    }
    if (url.pathname === "/api/audits" && request.method === "GET") {
      const result = await pool.query(
        `select a.*,au.full_name as auditor_name,ru.full_name as responsible_name
         from audits a
         left join app_users au on au.id=a.auditor_user_id
         left join audit_areas ar on ar.id=a.area_id
         left join app_users ru on ru.id=ar.responsible_user_id
         where a.unit_id=$1 and ($2::uuid is null or a.area_id=$2) and ($3::boolean or a.area_id=any($4::uuid[]))
         order by a.created_at desc,a.id limit $5 offset $6`,
        [unitId, url.searchParams.get("areaId") || null, allAreas, areaIds, limit, offset]
      );
      sendJson(response, 200, { audits: result.rows, limit, offset });
      return true;
    }
    if (auditDetail && request.method === "GET") {
      const audit = await pool.query("select * from audits where id=$1 and unit_id=$2 and ($3::boolean or area_id=any($4::uuid[]))", [auditDetail[1], unitId, allAreas, areaIds]);
      if (!audit.rows[0]) { sendJson(response, 404, { error: "Auditoria nao encontrada" }); return true; }
      const [answers, files] = await Promise.all([
        pool.query("select * from audit_answers where audit_id=$1 order by answered_at", [auditDetail[1]]),
        pool.query("select f.*,l.entity_type,l.entity_id from stored_files f join file_links l on l.file_id=f.id where (l.entity_type='audit' and l.entity_id=$1) or (l.entity_type='audit_answer' and l.entity_id in (select id from audit_answers where audit_id=$1))", [auditDetail[1]])
      ]);
      sendJson(response, 200, { audit: audit.rows[0], answers: answers.rows, files: files.rows });
      return true;
    }
    if (url.pathname === "/api/notifications" && request.method === "GET") {
      const result = await pool.query("select * from notifications where recipient_user_id=$1 order by created_at desc,id limit $2 offset $3", [user.id, limit, offset]);
      sendJson(response, 200, { notifications: result.rows, limit, offset });
      return true;
    }
    if (notification && request.method === "POST") {
      const result = await pool.query("update notifications set read_at=coalesce(read_at,now()) where id=$1 and recipient_user_id=$2 returning *", [notification[1], user.id]);
      sendJson(response, result.rows.length ? 200 : 404, { notification: result.rows[0] || null });
      return true;
    }
    if (url.pathname === "/api/dashboard" && request.method === "GET") {
      const month = url.searchParams.get("monthStart") || new Date().toISOString().slice(0, 7) + "-01";
      if (!/^\d{4}-\d{2}-01$/.test(month)) throw new Error("monthStart invalido");
      const [scores, risks, plans] = await Promise.all([
        pool.query("select a.area_id,avg(a.final_score)::numeric(5,2) as score,count(*)::int as audits from audits a join audit_cycles c on c.id=a.cycle_id where a.unit_id=$1 and c.month_start=$2 and a.status='finished' and ($3::boolean or a.area_id=any($4::uuid[])) group by a.area_id", [unitId, month, allAreas, areaIds]),
        pool.query("select aa.risk_level_snapshot as risk,count(*)::int as count from audit_answers aa join audits a on a.id=aa.audit_id join audit_cycles c on c.id=a.cycle_id where a.unit_id=$1 and c.month_start=$2 and aa.answer='NC' and ($3::boolean or a.area_id=any($4::uuid[])) group by aa.risk_level_snapshot", [unitId, month, allAreas, areaIds]),
        pool.query("select status,count(*)::int as count from action_plans where unit_id=$1 and ($2::boolean or area_id=any($3::uuid[])) group by status", [unitId, allAreas, areaIds])
      ]);
      sendJson(response, 200, { monthStart: month, scores: scores.rows, risks: risks.rows, actionPlans: plans.rows });
      return true;
    }
    sendJson(response, 405, { error: "Metodo nao permitido" });
  } catch (error) { sendJson(response, 400, { error: error.message }); }
  return true;
}

module.exports = { handle, userValues, pageLimit };
