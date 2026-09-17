const { pageLimit } = require("./operational-api");

const definitions = {
  certificates: { required: ["name", "documentType"], fields: {
    areaId: ["area_id", "uuid", "audit_areas"], fileId: ["file_id", "uuid", "stored_files"],
    requirementId: ["requirement_id", "uuid", "document_requirements"], name: ["name", "text"],
    documentType: ["document_type", "text"], issuedAt: ["issued_at", "date"],
    expiresAt: ["expires_at", "date"], status: ["status", "enum", ["valid", "expiring", "expired", "waived"]],
    reviewNote: ["review_note", "text"]
  } },
  "document-requirements": { required: ["name", "documentType"], fields: {
    areaId: ["area_id", "uuid", "audit_areas"], restaurantId: ["restaurant_id", "uuid", "restaurants"],
    name: ["name", "text"], documentType: ["document_type", "text"], required: ["required", "boolean"],
    alertDays: ["alert_days_before_expiration", "integer"], active: ["active", "boolean"]
  } }
};

const settingsFields = {
  auditStartDay: ["audit_start_day", "day"], auditEndDay: ["audit_end_day", "day"],
  autoSelectBestAuditDates: ["auto_select_best_audit_dates", "boolean"],
  actionPlanDueDays: ["action_plan_due_days", "positive"],
  actionPlanDueStartsOn: ["action_plan_due_starts_on", "enum", ["audit_finished", "report_sent", "responsible_acknowledged"]],
  allowResubmissionAfterRejection: ["allow_resubmission_after_rejection", "boolean"],
  allowResubmissionAfterDueDate: ["allow_resubmission_after_due_date", "boolean"],
  maxResubmissionAttempts: ["max_resubmission_attempts", "integer"],
  reuseSameActionPlanOnRejection: ["reuse_same_action_plan_on_rejection", "boolean"],
  requireAcknowledgementSignature: ["require_acknowledgement_signature", "boolean"],
  requireEvidencePhoto: ["require_evidence_photo", "boolean"],
  allowDelayJustification: ["allow_delay_justification", "boolean"], active: ["active", "boolean"]
};

function fieldsFor(body, fields) {
  const result = [];
  for (const [key, definition] of Object.entries(fields)) {
    if (!Object.prototype.hasOwnProperty.call(body, key)) continue;
    const [column, type, options] = definition;
    const value = body[key];
    let valid = value == null && ["uuid", "date", "day", "integer"].includes(type);
    if (value != null) {
      if (type === "text") valid = typeof value === "string" && value.trim().length > 0 && value.length <= 10000;
      if (type === "boolean") valid = typeof value === "boolean";
      if (["integer", "positive", "day"].includes(type)) valid = Number.isSafeInteger(value) && value >= (type === "integer" ? 0 : 1) && (type !== "day" || value <= 31);
      if (type === "enum") valid = options.includes(value);
      if (type === "uuid") valid = typeof value === "string" && /^[0-9a-f]{8}-[0-9a-f-]{27}$/i.test(value);
      if (type === "date") valid = typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(value)) && new Date(value).toISOString().slice(0, 10) === value;
    }
    if (!valid) throw new Error("Campo invalido: " + key);
    result.push({ column, value, scopeTable: type === "uuid" ? options : null });
  }
  return result;
}

async function verifyLinks(db, unitId, fields) {
  for (const field of fields) {
    if (!field.scopeTable || !field.value) continue;
    const result = await db.query("select id from " + field.scopeTable + " where id=$1 and unit_id=$2", [field.value, unitId]);
    if (!result.rows.length) throw new Error("Vinculo nao pertence a unidade: " + field.column);
  }
}

async function handle(request, response, url, context) {
  const resource = url.pathname.match(/^\/api\/(certificates|document-requirements)(?:\/([0-9a-f-]+))?$/i);
  const settings = url.pathname === "/api/workflow-settings";
  if (!resource && !settings) return false;
  const { getPool, requireDatabase, defaultUnitId, currentUser, readJsonBody, sendJson } = context;
  try {
    const pool = await getPool();
    if (!requireDatabase(response, pool)) return true;
    const unitId = await defaultUnitId(pool);
    const user = await currentUser(pool, request, unitId);
    if (settings) {
      const areaId = url.searchParams.get("areaId") || null;
      if (areaId) await verifyLinks(pool, unitId, [{ value: areaId, column: "area_id", scopeTable: "audit_areas" }]);
      if (request.method === "GET") {
        const result = await pool.query("select * from audit_workflow_settings where unit_id=$1 and area_id is not distinct from $2::uuid", [unitId, areaId]);
        sendJson(response, 200, { settings: result.rows[0] || null });
        return true;
      }
      if (request.method === "PATCH") {
        const fields = fieldsFor(await readJsonBody(request), settingsFields);
        if (!fields.length) throw new Error("Nenhum campo configuravel informado");
        const client = await pool.connect();
        try {
          await client.query("begin");
          const scope = areaId ? "(unit_id,area_id)" : "(unit_id) where area_id is null";
          const columns = fields.map((field) => field.column);
          const placeholders = columns.map((_, index) => "$" + (index + 4));
          const updates = columns.map((column) => column + "=excluded." + column);
          const result = await client.query(
            "insert into audit_workflow_settings (unit_id,area_id,configured_by_user_id," + columns.join(",") + ") values ($1,$2,$3," + placeholders.join(",") + ") on conflict " + scope + " do update set " + updates.join(",") + ",configured_by_user_id=excluded.configured_by_user_id,updated_at=now() returning *",
            [unitId, areaId, user.id, ...fields.map((field) => field.value)]
          );
          await client.query("commit");
          sendJson(response, 200, { settings: result.rows[0] });
        } catch (error) { await client.query("rollback"); throw error; }
        finally { client.release(); }
        return true;
      }
    } else {
      const [_, name, id] = resource;
      const definition = definitions[name];
      const table = name === "certificates" ? "certificates" : "document_requirements";
      if (request.method === "GET") {
        const { limit, offset } = pageLimit(url);
        const result = await pool.query("select * from " + table + " where unit_id=$1 and ($2::uuid is null or id=$2) order by created_at desc,id limit $3 offset $4", [unitId, id || null, limit, offset]);
        sendJson(response, id && !result.rows.length ? 404 : 200, id ? { item: result.rows[0] || null } : { items: result.rows, limit, offset });
        return true;
      }
      if (request.method === "POST" && !id || request.method === "PATCH" && id) {
        const body = await readJsonBody(request);
        if (!id && definition.required.some((key) => !body[key])) throw new Error("Nome e tipo de documento obrigatorios");
        const fields = fieldsFor(body, definition.fields);
        if (!fields.length) throw new Error("Nenhum campo editavel informado");
        const client = await pool.connect();
        try {
          await client.query("begin");
          await verifyLinks(client, unitId, fields);
          const columns = fields.map((field) => field.column);
          const values = fields.map((field) => field.value);
          let result;
          if (id) {
            result = await client.query("update " + table + " set " + columns.map((column, index) => column + "=$" + (index + 3)).join(",") + ",updated_at=now() where id=$1 and unit_id=$2 returning *", [id, unitId, ...values]);
          } else {
            result = await client.query("insert into " + table + " (unit_id," + columns.join(",") + ") values ($1," + columns.map((_, index) => "$" + (index + 2)).join(",") + ") returning *", [unitId, ...values]);
          }
          await client.query("commit");
          sendJson(response, result.rows.length ? (id ? 200 : 201) : 404, { item: result.rows[0] || null });
        } catch (error) { await client.query("rollback"); throw error; }
        finally { client.release(); }
        return true;
      }
    }
    sendJson(response, 405, { error: "Metodo nao permitido" });
  } catch (error) { sendJson(response, 400, { error: error.message }); }
  return true;
}

module.exports = { handle, fieldsFor, settingsFields };
