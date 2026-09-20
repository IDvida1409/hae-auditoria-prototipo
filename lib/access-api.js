const crypto = require("node:crypto");
const { promisify } = require("node:util");
const scrypt = promisify(crypto.scrypt);
const attempts = new Map();
const roles = new Set(["admin", "quality", "auditor", "area_responsible", "restaurant_responsible", "viewer"]);
const publicColumns = "id,unit_id,full_name,username,email,role,platform_scope,active,must_change_password,last_login_at";
const dummyHash = "scrypt:16384:8:1:00000000000000000000000000000000:" + "00".repeat(64);

function validPassword(password) {
  if (typeof password !== "string" || password.length < 8 || password.length > 128) throw new Error("A senha deve ter entre 8 e 128 caracteres.");
}
async function hashPassword(password) {
  validPassword(password);
  const salt = crypto.randomBytes(16).toString("hex");
  const key = await scrypt(password, salt, 64, { N: 16384, r: 8, p: 1 });
  return ["scrypt", 16384, 8, 1, salt, key.toString("hex")].join(":");
}
async function verifyPassword(password, encoded) {
  if (typeof password !== "string" || password.length > 128) return false;
  const parts = String(encoded || dummyHash).split(":");
  if (parts.length !== 6 || parts[0] !== "scrypt" || parts[1] !== "16384" || parts[2] !== "8" || parts[3] !== "1" ||
      !/^[a-f0-9]{32}$/.test(parts[4]) || !/^[a-f0-9]{128}$/.test(parts[5])) return false;
  const key = await scrypt(password, parts[4], 64, { N: 16384, r: 8, p: 1 });
  return crypto.timingSafeEqual(key, Buffer.from(parts[5], "hex")) && Boolean(encoded);
}
function tokenHash(token) { return crypto.createHash("sha256").update(token).digest("hex"); }
async function branding(pool, user) {
  const result = await pool.query("select name,access_logo_path from units where id=$1 and active=true", [user.unit_id]);
  const unit = result.rows[0];
  if (!unit || !/^\/?assets\/[a-zA-Z0-9_./-]+\.(png|jpg|jpeg|webp)$/i.test(unit.access_logo_path || "") || unit.access_logo_path.includes("..")) return null;
  return { name: unit.name, logoPath: unit.access_logo_path };
}
function cookieToken(request) {
  return String(request.headers.cookie || "").split(";").map((item) => item.trim()).find((item) => item.startsWith("idvida_access="))?.slice(14) || null;
}
function requestToken(request) {
  const bearer = String(request.headers.authorization || "").match(/^Bearer\s+([a-f0-9]{64})$/i)?.[1];
  return bearer || cookieToken(request);
}
function sessionCookie(response, token, remember = false) {
  const secure = process.env.RENDER === "true" || process.env.ACCESS_COOKIE_SECURE === "true";
  response.setHeader("Set-Cookie", "idvida_access=" + token + "; Path=/; HttpOnly; SameSite=Strict" +
    (secure ? "; Secure" : "") + (!token ? "; Max-Age=0" : remember ? "; Max-Age=604800" : ""));
}
function temporaryCode() {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  return Array.from(crypto.randomBytes(10), (value) => alphabet[value % alphabet.length]).join("");
}
function isAdmin(user) { return user?.role === "admin" && !user.must_change_password; }
function userSelect(alias = "u") {
  return publicColumns.split(",").map((column) => `${alias}.${column}`).join(",");
}
async function authenticated(pool, request) {
  const token = requestToken(request);
  if (!token || !/^[a-f0-9]{64}$/.test(token)) return null;
  const result = await pool.query("select u." + publicColumns.split(",").join(",u.") +
    " from user_sessions s join app_users u on u.id=s.user_id where s.token_hash=$1 and s.revoked_at is null and s.expires_at>now() and u.active=true", [tokenHash(token)]);
  return result.rows[0] || null;
}
async function ensureBootstrapAdmin(pool) {
  const username = String(process.env.BOOTSTRAP_ADMIN_USERNAME || "teste.01").trim().toLowerCase();
  const password = String(process.env.BOOTSTRAP_ADMIN_PASSWORD || "12345678");
  if (!/^[a-z0-9][a-z0-9._-]{2,63}$/.test(username)) throw new Error("BOOTSTRAP_ADMIN_USERNAME inválido.");
  validPassword(password);
  const unit = await pool.query("select id from units where code='einstein-morumbi' order by created_at limit 1");
  if (!unit.rows[0]) return null;
  await pool.query("update units set access_logo_path=coalesce(access_logo_path,'/assets/hospital-einstein-logo.png') where id=$1", [unit.rows[0].id]);
  const existing = await pool.query("select id,password_hash from app_users where lower(username)=$1 limit 1", [username]);
  if (existing.rows[0]) return existing.rows[0].id;
  const reusable = await pool.query("select id from app_users where unit_id=$1 and role='admin' and username is null order by created_at limit 1", [unit.rows[0].id]);
  const encoded = await hashPassword(password);
  if (reusable.rows[0]) {
    await pool.query("update app_users set full_name='Administrador de teste',username=$2,password_hash=$3,must_change_password=false,active=true,platform_scope='unit',updated_at=now() where id=$1", [reusable.rows[0].id, username, encoded]);
    return reusable.rows[0].id;
  }
  const inserted = await pool.query(`insert into app_users (unit_id,full_name,email,password_hash,role,platform_scope,username,must_change_password,active)
    values ($1,'Administrador de teste','teste.01@idauditor.local',$2,'admin','unit',$3,false,true) returning id`, [unit.rows[0].id, encoded, username]);
  return inserted.rows[0].id;
}
function limited(request, email) {
  const now = Date.now();
  for (const [key, value] of attempts) if (value.until < now) attempts.delete(key);
  const address = request.socket.remoteAddress || "";
  const keys = ["ip:" + address, "account:" + email];
  if (keys.some((key) => (attempts.get(key)?.count || 0) >= (key.startsWith("ip:") ? 30 : 10))) return true;
  if (attempts.size > 10000) return true;
  for (const key of keys) {
    const value = attempts.get(key) || { count: 0, until: now + 15 * 60 * 1000 };
    value.count++; attempts.set(key, value);
  }
  return false;
}
async function handle(request, response, url, context) {
  if (!url.pathname.startsWith("/api/access/")) return false;
  const { getPool, sendJson, readJsonBody, requireDatabase } = context;
  try {
    const pool = await getPool();
    if (!requireDatabase(response, pool)) return true;
    if (request.method !== "GET" && request.headers.origin) {
      const origin = new URL(request.headers.origin);
      if (origin.host !== request.headers.host) { sendJson(response, 403, { error: "Origem não autorizada." }); return true; }
    }
    if (url.pathname === "/api/access/login" && request.method === "POST") {
      const body = await readJsonBody(request);
      const username = typeof body.username === "string" ? body.username.trim().toLowerCase() : "";
      if (!/^[a-z0-9][a-z0-9._-]{2,63}$/.test(username)) { sendJson(response, 400, { error: "Informe um usuário válido, como david.souza." }); return true; }
      if (limited(request, username)) { sendJson(response, 429, { error: "Muitas tentativas. Aguarde 15 minutos." }); return true; }
      const selected = await pool.query("select " + publicColumns + ",password_hash from app_users where lower(username)=$1 and active=true", [username]);
      const user = selected.rows[0];
      if (!await verifyPassword(body.password, user?.password_hash)) { sendJson(response, 401, { error: "Usuário ou senha inválidos." }); return true; }
      const token = crypto.randomBytes(32).toString("hex");
      const client = await pool.connect();
      try {
        await client.query("begin");
        await client.query("insert into user_sessions (user_id,token_hash,user_agent,expires_at,last_seen_at) values ($1,$2,$3,now()+($4::int*interval '1 hour'),now())",
          [user.id, tokenHash(token), String(request.headers["user-agent"] || "").slice(0, 512), body.remember === true ? 168 : 12]);
        await client.query("update app_users set last_login_at=now() where id=$1", [user.id]);
        await client.query("commit");
      } catch (error) { await client.query("rollback"); throw error; }
      finally { client.release(); }
      delete user.password_hash;
      sessionCookie(response, token, body.remember === true);
      sendJson(response, 200, { user, branding: await branding(pool, user) }); return true;
    }
    if (url.pathname === "/api/access/branding" && request.method === "POST") {
      const body = await readJsonBody(request);
      const username = typeof body.username === "string" ? body.username.trim().toLowerCase() : "";
      if (!/^[a-z0-9][a-z0-9._-]{2,63}$/.test(username)) { sendJson(response, 200, { branding: null }); return true; }
      const selected = await pool.query("select unit_id from app_users where lower(username)=$1 and active=true", [username]);
      sendJson(response, 200, { branding: selected.rows[0] ? await branding(pool, selected.rows[0]) : null }); return true;
    }
    if (url.pathname === "/api/access/forgot-password" && request.method === "POST") {
      const body = await readJsonBody(request);
      const username = typeof body.username === "string" ? body.username.trim().toLowerCase() : "";
      if (!/^[a-z0-9][a-z0-9._-]{2,63}$/.test(username)) { sendJson(response, 400, { error: "Informe seu usuário para solicitar a redefinição." }); return true; }
      const selected = await pool.query("select id,unit_id,full_name,username from app_users where lower(username)=$1 and active=true", [username]);
      const requestedUser = selected.rows[0];
      if (requestedUser) {
        const client = await pool.connect();
        try {
          await client.query("begin");
          await client.query("insert into password_reset_requests (user_id) values ($1) on conflict (user_id) where status='pending' do update set requested_at=now()", [requestedUser.id]);
          const admins = await client.query("select id from app_users where unit_id=$1 and role='admin' and active=true", [requestedUser.unit_id]);
          for (const admin of admins.rows) {
            await client.query(`insert into notifications (unit_id,recipient_user_id,title,body,notification_type,entity_type,entity_id,event_key)
              values ($1,$2,$3,$4,'password_reset','user',$5,$6)
              on conflict (recipient_user_id,event_key) where event_key is not null
              do update set title=excluded.title,body=excluded.body,read_at=null,created_at=now()`,
              [requestedUser.unit_id, admin.id, "Redefinição de senha", `${requestedUser.full_name} (${requestedUser.username}) solicitou uma nova senha.`, requestedUser.id, `password-reset:${requestedUser.id}`]);
          }
          await client.query("commit");
        } catch (error) { await client.query("rollback"); throw error; }
        finally { client.release(); }
      }
      sendJson(response, 200, { ok: true, message: "Solicitação registrada. Um administrador fará a redefinição." }); return true;
    }
    const user = await authenticated(pool, request);
    if (!user) { sendJson(response, 401, { error: "Entre na sua conta para continuar." }); return true; }
    if (url.pathname === "/api/access/me" && request.method === "GET") { sendJson(response, 200, { user, branding: await branding(pool, user) }); return true; }
    if (url.pathname === "/api/access/notifications" && request.method === "GET") {
      const result = await pool.query(`select id,title,body,notification_type,entity_type,entity_id,read_at,created_at
        from notifications where recipient_user_id=$1 order by created_at desc,id limit 40`, [user.id]);
      sendJson(response, 200, { notifications: result.rows }); return true;
    }
    const notificationMatch = url.pathname.match(/^\/api\/access\/notifications\/([0-9a-f-]+)\/read$/i);
    if (notificationMatch && request.method === "POST") {
      const result = await pool.query("update notifications set read_at=coalesce(read_at,now()) where id=$1 and recipient_user_id=$2 returning id,read_at", [notificationMatch[1], user.id]);
      sendJson(response, result.rows.length ? 200 : 404, { notification: result.rows[0] || null }); return true;
    }
    if (url.pathname === "/api/access/notifications/read-all" && request.method === "POST") {
      await pool.query("update notifications set read_at=coalesce(read_at,now()) where recipient_user_id=$1", [user.id]);
      sendJson(response, 200, { ok: true }); return true;
    }
    if (url.pathname === "/api/access/logout" && request.method === "POST") {
      await pool.query("update user_sessions set revoked_at=now() where token_hash=$1", [tokenHash(cookieToken(request))]);
      sessionCookie(response, ""); sendJson(response, 200, { ok: true }); return true;
    }
    if (url.pathname === "/api/access/password" && request.method === "POST") {
      const body = await readJsonBody(request);
      validPassword(body.password);
      if (body.currentPassword === body.password) { sendJson(response, 400, { error: "A nova senha deve ser diferente da atual." }); return true; }
      const current = await pool.query("select password_hash from app_users where id=$1", [user.id]);
      if (!await verifyPassword(body.currentPassword, current.rows[0]?.password_hash)) { sendJson(response, 401, { error: "Senha atual inválida." }); return true; }
      const encoded = await hashPassword(body.password);
      const client = await pool.connect();
      try {
        await client.query("begin");
        const changed = await client.query("update app_users set password_hash=$2,must_change_password=false,updated_at=now() where id=$1 and password_hash=$3 returning id",
          [user.id, encoded, current.rows[0].password_hash]);
        if (!changed.rows.length) throw new Error("A senha foi alterada em outro acesso. Entre novamente.");
        await client.query("update user_sessions set revoked_at=now() where user_id=$1 and revoked_at is null", [user.id]);
        await client.query("commit");
      } catch (error) { await client.query("rollback"); throw error; }
      finally { client.release(); }
      sessionCookie(response, ""); sendJson(response, 200, { ok: true }); return true;
    }
    if (url.pathname === "/api/access/users" && request.method === "GET") {
      if (!isAdmin(user)) { sendJson(response, 403, { error: "Consulta permitida somente ao administrador." }); return true; }
      const result = await pool.query(`select ${userSelect()},
        (select a.name from user_area_permissions p join audit_areas a on a.id=p.area_id where p.user_id=u.id and p.active=true order by a.display_order limit 1) as area_name,
        exists(select 1 from password_reset_requests r where r.user_id=u.id and r.status='pending') as reset_pending
        from app_users u where u.unit_id=$1 order by u.active desc,u.full_name`, [user.unit_id]);
      const areas = await pool.query("select id,name,slug from audit_areas where unit_id=$1 and active=true order by display_order,name", [user.unit_id]);
      sendJson(response, 200, { users: result.rows, areas: areas.rows }); return true;
    }
    if (url.pathname === "/api/access/users" && request.method === "POST") {
      if (!isAdmin(user)) { sendJson(response, 403, { error: "Cadastro permitido somente ao administrador com senha definitiva." }); return true; }
      const body = await readJsonBody(request);
      const name = typeof body.fullName === "string" ? body.fullName.trim() : "";
      const username = typeof body.username === "string" ? body.username.trim().toLowerCase() : "";
      const emailInput = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
      const email = emailInput || `${username}@sem-email.local`;
      if (!name || name.length > 250 || !/^[a-z0-9][a-z0-9._-]{2,63}$/.test(username) || email.length > 250 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !roles.has(body.role)) {
        sendJson(response, 400, { error: "Confira nome, usuário, e-mail de contato e perfil." }); return true;
      }
      const code = temporaryCode();
      const encoded = await hashPassword(code);
      const scope = ["admin", "quality"].includes(body.role) ? "unit" : "assigned_areas";
      const client = await pool.connect();
      try {
        await client.query("begin");
        const result = await client.query("insert into app_users (unit_id,full_name,email,password_hash,role,platform_scope,username,must_change_password,active,access_code_issued_at) values ($1,$2,$3,$4,$5,$6,$7,true,true,now()) returning " + publicColumns,
          [user.unit_id, name, email, encoded, body.role, scope, username]);
        if (body.areaId && scope === "assigned_areas") {
          await client.query(`insert into user_area_permissions (user_id,unit_id,area_id,can_view_area_dashboard,can_view_area_scores,can_view_reports,can_submit_action_plan_feedback,active)
            select $1,$4,id,true,true,true,$3,true from audit_areas where id=$2 and unit_id=$4`,
            [result.rows[0].id, body.areaId, body.role === "area_responsible", user.unit_id]);
        }
        await client.query("commit");
        sendJson(response, 201, { user: result.rows[0], temporaryCode: code }); return true;
      } catch (error) { await client.query("rollback"); throw error; }
      finally { client.release(); }
    }
    const resetMatch = url.pathname.match(/^\/api\/access\/users\/([0-9a-f-]+)\/reset-password$/i);
    if (resetMatch && request.method === "POST") {
      if (!isAdmin(user)) { sendJson(response, 403, { error: "Redefinição permitida somente ao administrador." }); return true; }
      const code = temporaryCode();
      const encoded = await hashPassword(code);
      const client = await pool.connect();
      try {
        await client.query("begin");
        const changed = await client.query(`update app_users set password_hash=$1,must_change_password=true,access_code_issued_at=now(),updated_at=now()
          where id=$2 and unit_id=$3 and active=true returning ${publicColumns}`, [encoded, resetMatch[1], user.unit_id]);
        if (!changed.rows.length) { await client.query("rollback"); sendJson(response, 404, { error: "Usuário ativo não encontrado." }); return true; }
        await client.query("update user_sessions set revoked_at=now() where user_id=$1 and revoked_at is null", [resetMatch[1]]);
        await client.query("update password_reset_requests set status='resolved',resolved_at=now(),resolved_by_user_id=$2 where user_id=$1 and status='pending'", [resetMatch[1], user.id]);
        await client.query("update notifications set read_at=now() where recipient_user_id=$1 and event_key=$2", [user.id, `password-reset:${resetMatch[1]}`]);
        await client.query("commit");
        sendJson(response, 200, { user: changed.rows[0], temporaryCode: code }); return true;
      } catch (error) { await client.query("rollback"); throw error; }
      finally { client.release(); }
    }
    const statusMatch = url.pathname.match(/^\/api\/access\/users\/([0-9a-f-]+)\/status$/i);
    if (statusMatch && request.method === "PATCH") {
      if (!isAdmin(user)) { sendJson(response, 403, { error: "Alteração permitida somente ao administrador." }); return true; }
      const body = await readJsonBody(request);
      if (typeof body.active !== "boolean" || statusMatch[1] === user.id) { sendJson(response, 400, { error: "Status de usuário inválido." }); return true; }
      const result = await pool.query(`update app_users set active=$1,updated_at=now() where id=$2 and unit_id=$3 returning ${publicColumns}`,
        [body.active, statusMatch[1], user.unit_id]);
      if (!result.rows.length) { sendJson(response, 404, { error: "Usuário não encontrado." }); return true; }
      if (!body.active) await pool.query("update user_sessions set revoked_at=now() where user_id=$1 and revoked_at is null", [statusMatch[1]]);
      sendJson(response, 200, { user: result.rows[0] }); return true;
    }
    sendJson(response, 404, { error: "Operação não encontrada." });
  } catch (error) {
    if (error.code === "23505") sendJson(response, 409, { error: "Usuário ou e-mail de contato já cadastrado." });
    else if (error instanceof SyntaxError || /^A senha/.test(error.message)) sendJson(response, 400, { error: error instanceof SyntaxError ? "Dados inválidos." : error.message });
    else { console.error("Access API:", error.message); sendJson(response, 500, { error: "Não foi possível concluir a operação." }); }
  }
  return true;
}
module.exports = { handle, hashPassword, verifyPassword, validPassword, authenticated, temporaryCode, ensureBootstrapAdmin };
