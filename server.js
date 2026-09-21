const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");
const syncService = require("./lib/sync-service");
const fileStorage = require("./lib/file-storage");
const operationalApi = require("./lib/operational-api");
const resourceApi = require("./lib/resource-api");
const { migrate: runMigrations } = require("./lib/database");
const reportWorker = require("./lib/report-worker");
const accessApi = require("./lib/access-api");
const { importChecklistData } = require("./lib/checklist-import");
const { notify } = require("./lib/notifications");
const actionPlanService = require("./lib/action-plan-service");

const root = __dirname;
const dataDir = path.join(root, "data");
const stateFile = path.join(dataDir, "app-state.json");
const port = Number(process.env.PORT || 3000);
const databaseUrl = process.env.DATABASE_URL;
let poolPromise = null;

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".webmanifest": "application/manifest+json; charset=utf-8",
  ".png": "image/png",
  ".pdf": "application/pdf",
  ".svg": "image/svg+xml; charset=utf-8",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".ico": "image/x-icon",
  ".zip": "application/zip"
};

function ensureStore() {
  fs.mkdirSync(dataDir, { recursive: true });
  if (!fs.existsSync(stateFile)) {
    fs.writeFileSync(stateFile, JSON.stringify({ state: null, updatedAt: null }, null, 2));
  }
}

function readFileStore() {
  ensureStore();
  try {
    return JSON.parse(fs.readFileSync(stateFile, "utf8"));
  } catch {
    return { state: null, updatedAt: null };
  }
}

function writeFileStore(state) {
  ensureStore();
  const payload = { state, updatedAt: new Date().toISOString() };
  fs.writeFileSync(stateFile, JSON.stringify(payload, null, 2));
  return payload;
}

function useSslForPostgres() {
  const mode = String(process.env.PGSSLMODE || "").toLowerCase();
  return mode === "require" || mode === "verify-ca" || mode === "verify-full";
}

async function schemaStatus(pool) {
  const result = await pool.query(`
    select
      count(*)::int as applied_count,
      max(filename) as latest_migration
    from schema_migrations
  `);
  return result.rows[0] || { applied_count: 0, latest_migration: null };
}

function toIso(value) {
  if (!value) return null;
  if (value instanceof Date) return value.toISOString();
  return new Date(value).toISOString();
}

async function getPool() {
  if (!databaseUrl) return null;
  if (!poolPromise) {
    poolPromise = (async () => {
      const { Pool } = require("pg");
      const pool = new Pool({
        connectionString: databaseUrl,
        ssl: useSslForPostgres() ? { rejectUnauthorized: false } : false
      });
      try {
        await runMigrations(pool);
        await accessApi.ensureBootstrapAdmin(pool);
        if (process.env.SEED_DEMO_USERS === "true") await accessApi.ensureDemoResponsible(pool);
        const checklistImport = await importChecklistData(pool);
        if (checklistImport.imported) {
          console.log(`Checklists sincronizados: ${checklistImport.areas} areas, ${checklistImport.questions} perguntas.`);
        }
      }
      catch (error) { await pool.end(); throw error; }
      return pool;
    })().catch((error) => {
      poolPromise = null;
      throw error;
    });
  }
  return poolPromise;
}

async function readStore() {
  const pool = await getPool();
  if (!pool) return readFileStore();

  const result = await pool.query(
    "select state, updated_at from app_state where id = $1",
    ["main"]
  );
  if (!result.rows.length) {
    return { state: null, updatedAt: null };
  }
  return {
    state: result.rows[0].state || null,
    updatedAt: toIso(result.rows[0].updated_at)
  };
}

async function writeStore(state) {
  const pool = await getPool();
  if (!pool) return writeFileStore(state);

  const result = await pool.query(
    `
      insert into app_state (id, state, updated_at)
      values ($1, $2::jsonb, now())
      on conflict (id)
      do update set state = excluded.state, updated_at = excluded.updated_at
      returning state, updated_at
    `,
    ["main", JSON.stringify(state || null)]
  );

  return {
    state: result.rows[0].state || null,
    updatedAt: toIso(result.rows[0].updated_at)
  };
}

function sendJson(response, status, body) {
  response.writeHead(status, {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store"
  });
  response.end(JSON.stringify(body));
}

function methodNotAllowed(response) {
  sendJson(response, 405, { error: "Método não permitido" });
}

function requireDatabase(response, pool) {
  if (pool) return true;
  sendJson(response, 503, {
    error: "Banco Postgres não configurado. Configure DATABASE_URL para usar esta API."
  });
  return false;
}

function readBody(request) {
  return new Promise((resolve, reject) => {
    let body = "";
    request.on("data", (chunk) => {
      body += chunk;
      if (body.length > 1_000_000) {
        request.destroy();
        reject(new Error("Payload muito grande"));
      }
    });
    request.on("end", () => resolve(body));
    request.on("error", reject);
  });
}

async function readJsonBody(request) {
  const body = await readBody(request);
  if (!body) return {};
  return JSON.parse(body);
}

function pathMatch(pathname, pattern) {
  const match = pathname.match(pattern);
  return match ? match.groups || match : null;
}

function currentMonthStart() {
  const now = new Date();
  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1)).toISOString().slice(0, 10);
}

function monthLabelFromStart(monthStart) {
  const [year, month] = String(monthStart).split("-");
  const labels = {
    "01": "Janeiro",
    "02": "Fevereiro",
    "03": "Março",
    "04": "Abril",
    "05": "Maio",
    "06": "Junho",
    "07": "Julho",
    "08": "Agosto",
    "09": "Setembro",
    "10": "Outubro",
    "11": "Novembro",
    "12": "Dezembro"
  };
  return `${labels[month] || month}/${year}`;
}

async function defaultUnitId(pool) {
  const result = await pool.query(
    "select id from units where code = $1 order by created_at asc limit 1",
    ["einstein-morumbi"]
  );
  if (!result.rows[0]) throw new Error("Unidade padrão não encontrada.");
  return result.rows[0].id;
}

async function currentUser(pool, request, unitId) {
  const user = request.accessUser || await accessApi.authenticated(pool, request);
  if (!user) {
    const error = new Error("Entre na sua conta para continuar.");
    error.status = 401;
    throw error;
  }
  return user;
}

function operationalAccessAllowed(user, pathname, method) {
  if (["admin", "quality", "auditor"].includes(user.role)) return true;
  if (user.role !== "area_responsible") return false;
  if (method === "GET" && (
    pathname === "/api/offline-bootstrap" ||
    pathname === "/api/dashboard" ||
    pathname === "/api/action-plans" ||
    pathname === "/api/action-plan-documents" ||
    pathname === "/api/reports" ||
    pathname === "/api/audits" ||
    pathname === "/api/notifications" ||
    /^\/api\/(?:reports|audits)\/[0-9a-f-]+(?:\/versions)?$/i.test(pathname) ||
    /^\/api\/action-plan-documents\/[0-9a-f-]+$/i.test(pathname) ||
    /^\/api\/files\/[0-9a-f-]+\/content$/i.test(pathname)
  )) return true;
  if (method === "POST" && (
    /^\/api\/action-plans\/[0-9a-f-]+\/feedback$/i.test(pathname) ||
    /^\/api\/action-plan-documents\/[0-9a-f-]+\/acknowledge$/i.test(pathname) ||
    pathname === "/api/offline-files" ||
    pathname === "/api/sync-queue" ||
    pathname === "/api/sync-queue/process" ||
    /^\/api\/sync-queue\/[^/]+\/resolve$/i.test(pathname) ||
    /^\/api\/notifications\/[0-9a-f-]+\/read$/i.test(pathname)
  )) return true;
  return false;
}

async function ensureCycle(pool, unitId, monthStart = currentMonthStart()) {
  const result = await pool.query(
    `
      insert into audit_cycles (unit_id, month_start, label, status)
      values ($1, $2, $3, 'open')
      on conflict (unit_id, month_start)
      do update set updated_at = now()
      returning *
    `,
    [unitId, monthStart, monthLabelFromStart(monthStart)]
  );
  return result.rows[0];
}

async function defaultChecklistForArea(pool, unitId, areaId) {
  const result = await pool.query(
    `
      select id
      from checklists
      where unit_id = $1
        and (area_id = $2 or area_id is null)
        and is_active = true
      order by area_id nulls last, imported_at desc nulls last, created_at desc
      limit 1
    `,
    [unitId, areaId]
  );
  return result.rows[0]?.id || null;
}

async function auditScore(pool, auditId) {
  const result = await pool.query(
    `
      select
        count(*) filter (where answer in ('C', 'NC'))::int as counted,
        count(*) filter (where answer = 'C')::int as conforming
      from audit_answers
      where audit_id = $1
    `,
    [auditId]
  );
  const counted = Number(result.rows[0]?.counted || 0);
  const conforming = Number(result.rows[0]?.conforming || 0);
  return counted ? Number(((conforming / counted) * 10).toFixed(2)) : null;
}

function publicPlanCode() {
  return `PA-${new Date().getUTCFullYear()}-${crypto.randomBytes(4).toString("hex").toUpperCase()}`;
}

function hashToken(token) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

function newToken(prefix = "tok") {
  return `${prefix}_${crypto.randomBytes(32).toString("base64url")}`;
}

function requestIp(request) {
  const forwarded = String(request.headers["x-forwarded-for"] || "").split(",")[0].trim();
  return forwarded || request.socket.remoteAddress || null;
}

function storageKeyFor(fileType, originalFilename = "") {
  const safeName = String(originalFilename || "arquivo")
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^a-zA-Z0-9._-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();
  const ext = path.extname(safeName);
  const base = path.basename(safeName, ext).slice(0, 64) || "arquivo";
  return `${fileType}/${new Date().toISOString().slice(0, 10)}/${crypto.randomUUID()}-${base}${ext}`;
}

function staticPathFor(urlPath) {
  const cleanPath = decodeURIComponent(urlPath.split("?")[0]);
  const relativePath = cleanPath === "/" ? "index.html" : cleanPath.replace(/^\/+/, "");
  const publicFiles = new Set(["index.html", "styles.css", "checklist-data.js", "offline-store.js", "live-update.js", "app.js", "manifest.webmanifest", "sw.js", "login.html", "login.css", "login.js", "plano-acao-preview.html", "idauditor-web.zip"]);
  if (!publicFiles.has(relativePath) && !relativePath.startsWith("assets/")) return null;
  const resolved = path.resolve(root, relativePath);
  if (!resolved.startsWith(root + path.sep)) return null;
  if (relativePath.startsWith("assets/") && !resolved.startsWith(path.join(root, "assets") + path.sep)) return null;
  return resolved;
}

function readStaticReports() {
  const reportsDir = path.join(root, "assets", "reports");
  if (!fs.existsSync(reportsDir)) return [];
  return fs.readdirSync(reportsDir)
    .filter((file) => file.toLowerCase().endsWith(".pdf"))
    .sort()
    .map((file) => {
      const match = file.match(/^hae-(consolidado-mes|comparativo-analitico)-(.+)-ago-26\.pdf$/i);
      return {
        fileName: file,
        fileUrl: `/assets/reports/${file}`,
        reportType: match?.[1] === "comparativo-analitico" ? "comparison" : "monthly",
        areaSlug: match?.[2] || null,
        periodLabel: match?.[1] === "comparativo-analitico" ? "Agosto/2026 / Julho/2026" : "Agosto/2026",
        status: "generated"
      };
    });
}

async function handleApi(request, response, url) {
  if (url.pathname === "/api/mobile-update" && request.method === "GET") {
    const commit = String(process.env.RENDER_GIT_COMMIT || "").trim();
    const enabled = /^[0-9a-f]{40}$/i.test(commit);
    const publicUrl = String(process.env.RENDER_EXTERNAL_URL || "https://hae-auditoria-prototipo.onrender.com").replace(/\/$/, "");
    sendJson(response, 200, {
      enabled,
      bundleId: enabled ? `web-${commit}` : null,
      url: enabled ? `${publicUrl}/idauditor-web.zip?v=${commit}` : null,
      minVersionCode: 14
    });
    return true;
  }
  if (await accessApi.handle(request, response, url, { getPool, sendJson, readJsonBody, requireDatabase })) return true;
  const structuredApisEnabled = process.env.STRUCTURED_APIS_ENABLED !== "false" &&
    !(process.env.RENDER === "true" && process.env.STRUCTURED_APIS_ENABLED !== "true");
  if (!structuredApisEnabled && url.pathname.startsWith("/api/") &&
      !["/api/health", "/api/state"].includes(url.pathname)) {
    sendJson(response, 503, { error: "APIs estruturadas aguardam ativacao do controle de acesso." });
    return true;
  }
  if (url.pathname.startsWith("/api/") && url.pathname !== "/api/health") {
    try {
      const pool = await getPool();
      if (!requireDatabase(response, pool)) return true;
      request.accessUser = await accessApi.authenticated(pool, request);
      if (!request.accessUser) {
        sendJson(response, 401, { error: "Entre na sua conta para continuar." });
        return true;
      }
      request.accessUser = await accessApi.withAccessAreas(pool, request.accessUser);
      if (!operationalAccessAllowed(request.accessUser, url.pathname, request.method)) {
        sendJson(response, 403, { error: "Seu perfil não possui permissão para esta operação." });
        return true;
      }
    } catch (error) {
      sendJson(response, 500, { error: "Não foi possível validar a sessão." });
      return true;
    }
  }
  const conflictMatch = pathMatch(url.pathname, /^\/api\/sync-queue\/(?<operationId>[^/]+)\/resolve$/);
  if (conflictMatch && request.method === "POST") {
    try {
      const pool = await getPool();
      if (!requireDatabase(response, pool)) return true;
      const user = await currentUser(pool, request, await defaultUnitId(pool));
      const body = await readJsonBody(request);
      const device = await syncService.deviceFor(pool, user, body.deviceUid);
      sendJson(response, 200, await syncService.resolveConflict(pool, user, device, decodeURIComponent(conflictMatch.operationId), body.strategy));
    } catch (error) { sendJson(response, 409, { error: error.message }); }
    return true;
  }
  if (await resourceApi.handle(request, response, url, { getPool, defaultUnitId, currentUser, readJsonBody, sendJson, requireDatabase })) return true;
  if (await operationalApi.handle(request, response, url, { getPool, defaultUnitId, currentUser, readJsonBody, sendJson, requireDatabase })) return true;
  if (url.pathname === "/api/offline-files" && request.method === "POST") {
    try {
      const pool = await getPool();
      if (!requireDatabase(response, pool)) return true;
      const unitId = await defaultUnitId(pool);
      const user = await currentUser(pool, request, unitId);
      const device = await syncService.deviceFor(pool, user, request.headers["x-device-uid"]);
      sendJson(response, 201, { file: await fileStorage.upload(pool, request, user, device, unitId) });
    } catch (error) {
      if (!response.headersSent && !response.destroyed) sendJson(response, 400, { error: error.message });
    }
    return true;
  }
  const downloadMatch = pathMatch(url.pathname, /^\/api\/files\/(?<id>[0-9a-f-]+)\/content$/i);
  if (downloadMatch && request.method === "GET") {
    try {
      const pool = await getPool();
      if (!requireDatabase(response, pool)) return true;
      const user = await currentUser(pool, request, await defaultUnitId(pool));
      if (!await fileStorage.download(pool, request, response, user, downloadMatch.id)) sendJson(response, 404, { error: "Arquivo nao encontrado" });
    } catch (error) {
      if (!response.headersSent) sendJson(response, 500, { error: "Arquivo indisponivel" });
    }
    return true;
  }
  if (url.pathname === "/api/health") {
    try {
      const pool = await getPool();
      const migrations = pool ? await schemaStatus(pool) : null;
      sendJson(response, 200, {
        ok: true,
        storage: pool ? "postgres" : "file",
        migrations
      });
    } catch (error) {
      sendJson(response, 500, {
        ok: false,
        storage: databaseUrl ? "postgres" : "file",
        error: error.message || "Erro ao verificar backend"
      });
    }
    return true;
  }

  if (url.pathname === "/api/state" && request.method === "GET") {
    try {
      sendJson(response, 200, await readStore());
    } catch (error) {
      sendJson(response, 500, { error: error.message || "Erro ao ler estado" });
    }
    return true;
  }

  if (url.pathname === "/api/state" && request.method === "PUT") {
    try {
      const body = await readBody(request);
      const parsed = body ? JSON.parse(body) : {};
      sendJson(response, 200, await writeStore(parsed.state ?? null));
    } catch (error) {
      const status = error instanceof SyntaxError ? 400 : 500;
      sendJson(response, status, { error: error.message || "Estado inválido" });
    }
    return true;
  }

  if (url.pathname === "/api/reports" && request.method === "GET") {
    try {
      sendJson(response, 200, {
        reports: readStaticReports(),
        storage: "static-prototype"
      });
    } catch (error) {
      sendJson(response, 500, { error: error.message || "Erro ao consultar relatórios" });
    }
    return true;
  }

  if (url.pathname === "/api/auth/login") {
    if (request.method !== "POST") {
      methodNotAllowed(response);
      return true;
    }
    try {
      const pool = await getPool();
      if (!requireDatabase(response, pool)) return true;
      const body = await readJsonBody(request);
      const email = String(body.email || "").trim().toLowerCase();
      if (!email) {
        sendJson(response, 400, { error: "E-mail obrigatório" });
        return true;
      }
      const result = await pool.query(
        `
          select id, unit_id, full_name, email, role, platform_scope, active
          from app_users
          where lower(email) = lower($1)
            and active = true
          limit 1
        `,
        [email]
      );
      if (!result.rows[0]) {
        sendJson(response, 401, { error: "Usuário não encontrado ou inativo" });
        return true;
      }
      const token = newToken("sess");
      const session = await pool.query(
        `
          insert into user_sessions (
            user_id,
            token_hash,
            ip_address,
            user_agent,
            expires_at,
            last_seen_at
          )
          values ($1, $2, $3, $4, now() + interval '12 hours', now())
          returning id, user_id, expires_at, created_at
        `,
        [
          result.rows[0].id,
          hashToken(token),
          requestIp(request),
          request.headers["user-agent"] || null
        ]
      );
      sendJson(response, 200, {
        user: result.rows[0],
        session: session.rows[0],
        token,
        tokenType: "bearer"
      });
    } catch (error) {
      sendJson(response, 500, { error: error.message || "Erro no login" });
    }
    return true;
  }

  if (url.pathname === "/api/auth/me" && request.method === "GET") {
    try {
      const pool = await getPool();
      if (!requireDatabase(response, pool)) return true;
      const unitId = await defaultUnitId(pool);
      const user = await currentUser(pool, request, unitId);
      if (!user) {
        sendJson(response, 401, { error: "Sessão inválida" });
        return true;
      }
      sendJson(response, 200, {
        user: {
          id: user.id,
          unit_id: user.unit_id,
          full_name: user.full_name,
          email: user.email,
          role: user.role,
          platform_scope: user.platform_scope,
          active: user.active
        }
      });
    } catch (error) {
      sendJson(response, 500, { error: error.message || "Erro ao consultar sessão" });
    }
    return true;
  }

  if (url.pathname === "/api/auth/logout" && request.method === "POST") {
    try {
      const pool = await getPool();
      if (!requireDatabase(response, pool)) return true;
      const authorization = String(request.headers.authorization || "");
      const bearer = authorization.match(/^Bearer\s+(.+)$/i)?.[1];
      if (bearer) {
        await pool.query(
          "update user_sessions set revoked_at = now() where token_hash = $1 and revoked_at is null",
          [hashToken(bearer)]
        );
      }
      sendJson(response, 200, { ok: true });
    } catch (error) {
      sendJson(response, 500, { error: error.message || "Erro ao encerrar sessão" });
    }
    return true;
  }

  if (url.pathname === "/api/bootstrap" && request.method === "GET") {
    try {
      const pool = await getPool();
      if (!requireDatabase(response, pool)) return true;
      const unitId = await defaultUnitId(pool);
      const [unit, areas, settings] = await Promise.all([
        pool.query("select * from units where id = $1", [unitId]),
        pool.query(
          `
            select id, name, slug, area_type, responsible_user_id, display_order
            from audit_areas
            where unit_id = $1 and active = true
            order by display_order, name
          `,
          [unitId]
        ),
        pool.query(
          "select * from audit_workflow_settings where unit_id = $1 and area_id is null limit 1",
          [unitId]
        )
      ]);
      sendJson(response, 200, {
        unit: unit.rows[0],
        areas: areas.rows,
        workflowSettings: settings.rows[0] || null
      });
    } catch (error) {
      sendJson(response, 500, { error: error.message || "Erro ao carregar bootstrap" });
    }
    return true;
  }

  if (url.pathname === "/api/areas" && request.method === "GET") {
    try {
      const pool = await getPool();
      if (!requireDatabase(response, pool)) return true;
      const unitId = await defaultUnitId(pool);
      const result = await pool.query(
        `
          select
            aa.id,
            aa.name,
            aa.slug,
            aa.area_type,
            aa.display_order,
            aa.responsible_user_id,
            u.full_name as responsible_name,
            count(distinct c.id)::int as checklist_count
          from audit_areas aa
          left join app_users u on u.id = aa.responsible_user_id
          left join checklists c on c.area_id = aa.id and c.is_active = true
          where aa.unit_id = $1 and aa.active = true
          group by aa.id, u.full_name
          order by aa.display_order, aa.name
        `,
        [unitId]
      );
      sendJson(response, 200, { areas: result.rows });
    } catch (error) {
      sendJson(response, 500, { error: error.message || "Erro ao listar áreas" });
    }
    return true;
  }

  if (url.pathname === "/api/checklists" && request.method === "GET") {
    try {
      const pool = await getPool();
      if (!requireDatabase(response, pool)) return true;
      const unitId = await defaultUnitId(pool);
      const areaId = url.searchParams.get("areaId");
      const areaSlug = url.searchParams.get("areaSlug");
      const result = await pool.query(
        `
          select
            c.id,
            c.name,
            c.version_label,
            c.legal_base,
            c.area_id,
            aa.name as area_name,
            aa.slug as area_slug,
            count(distinct cb.id)::int as block_count,
            count(cq.id)::int as question_count
          from checklists c
          left join audit_areas aa on aa.id = c.area_id
          left join checklist_blocks cb on cb.checklist_id = c.id and cb.active = true
          left join checklist_questions cq on cq.block_id = cb.id and cq.active = true
          where c.unit_id = $1
            and c.is_active = true
            and ($2::uuid is null or c.area_id = $2::uuid)
            and ($3::text is null or aa.slug = $3::text)
          group by c.id, aa.name, aa.slug
          order by aa.display_order nulls last, c.imported_at desc nulls last, c.created_at desc
        `,
        [unitId, areaId || null, areaSlug || null]
      );
      sendJson(response, 200, { checklists: result.rows });
    } catch (error) {
      sendJson(response, 500, { error: error.message || "Erro ao listar checklists" });
    }
    return true;
  }

  const checklistDetailMatch = pathMatch(url.pathname, /^\/api\/checklists\/(?<id>[0-9a-f-]+)$/i);
  if (checklistDetailMatch && request.method === "GET") {
    try {
      const pool = await getPool();
      if (!requireDatabase(response, pool)) return true;
      const checklist = await pool.query(
        `
          select c.*, aa.name as area_name, aa.slug as area_slug
          from checklists c
          left join audit_areas aa on aa.id = c.area_id
          where c.id = $1
        `,
        [checklistDetailMatch.id]
      );
      if (!checklist.rows[0]) {
        sendJson(response, 404, { error: "Checklist não encontrado" });
        return true;
      }
      const blocks = await pool.query(
        `
          select id, title, display_order
          from checklist_blocks
          where checklist_id = $1 and active = true
          order by display_order
        `,
        [checklistDetailMatch.id]
      );
      const questions = await pool.query(
        `
          select cq.*
          from checklist_questions cq
          join checklist_blocks cb on cb.id = cq.block_id
          where cb.checklist_id = $1 and cq.active = true
          order by cb.display_order, cq.question_number
        `,
        [checklistDetailMatch.id]
      );
      sendJson(response, 200, {
        checklist: checklist.rows[0],
        blocks: blocks.rows.map((block) => ({
          ...block,
          questions: questions.rows.filter((question) => question.block_id === block.id)
        }))
      });
    } catch (error) {
      sendJson(response, 500, { error: error.message || "Erro ao carregar checklist" });
    }
    return true;
  }

  if (url.pathname === "/api/audits" && request.method === "POST") {
    try {
      const pool = await getPool();
      if (!requireDatabase(response, pool)) return true;
      const body = await readJsonBody(request);
      const unitId = body.unitId || await defaultUnitId(pool);
      const user = await currentUser(pool, request, unitId);
      const device = body.deviceUid ? await syncService.deviceFor(pool, user, body.deviceUid) : null;
      if (body.localAuditId && !device) throw new Error("deviceUid obrigatorio quando localAuditId for informado");
      const areaId = body.areaId;
      if (!areaId) {
        sendJson(response, 400, { error: "areaId é obrigatório" });
        return true;
      }
      const checklistId = body.checklistId || await defaultChecklistForArea(pool, unitId, areaId);
      if (!checklistId) {
        sendJson(response, 400, { error: "Checklist da área não encontrado" });
        return true;
      }
      const cycle = await ensureCycle(pool, unitId, body.monthStart || currentMonthStart());
      const result = await pool.query(
        `
          insert into audits (
            unit_id,
            area_id,
            subarea_id,
            checklist_id,
            cycle_id,
            auditor_user_id,
            device_id,
            local_audit_id,
            source,
            status,
            started_at,
            offline_created,
            sync_status
          )
          values ($1, $2, $3, $4, $5, $6, $11, $7, $8, 'in_progress', now(), $9, $10)
          on conflict (device_id, local_audit_id)
          where device_id is not null and local_audit_id is not null
          do update set local_audit_id = excluded.local_audit_id
          returning *
        `,
        [
          unitId,
          areaId,
          body.subareaId || null,
          checklistId,
          cycle.id,
          user?.id || null,
          body.localAuditId || null,
          body.source || "web",
          Boolean(body.offlineCreated),
          body.offlineCreated ? "pending" : "synced",
          device?.id || null
        ]
      );
      sendJson(response, 201, { audit: result.rows[0] });
    } catch (error) {
      sendJson(response, 500, { error: error.message || "Erro ao iniciar auditoria" });
    }
    return true;
  }

  const auditAnswersMatch = pathMatch(url.pathname, /^\/api\/audits\/(?<id>[0-9a-f-]+)\/answers$/i);
  if (auditAnswersMatch && request.method === "POST") {
    try {
      const pool = await getPool();
      if (!requireDatabase(response, pool)) return true;
      const body = await readJsonBody(request);
      const answers = Array.isArray(body.answers) ? body.answers : [body];
      const saved = [];
      const client = await pool.connect();
      try {
        await client.query("begin");
        const audit = await client.query("select * from audits where id=$1 for update", [auditAnswersMatch.id]);
        if (!audit.rows[0] || ["finished", "cancelled"].includes(audit.rows[0].status)) throw new Error("Auditoria inexistente ou encerrada");
        for (const answer of answers) {
          if (!answer.questionId || !["C", "NC", "X"].includes(answer.answer)) {
            throw new Error("Cada resposta precisa ter questionId e answer C/NC/X.");
          }
          const question = await client.query(
            "select q.risk_level from checklist_questions q join checklist_blocks b on b.id=q.block_id where q.id=$1 and b.checklist_id=$2",
            [answer.questionId, audit.rows[0].checklist_id]
          );
          if (!question.rows[0]) throw new Error(`Pergunta não encontrada: ${answer.questionId}`);
          if (answer.expectedRevision != null) {
            const current = await client.query("select revision from audit_answers where audit_id=$1 and question_id=$2", [auditAnswersMatch.id, answer.questionId]);
            if (answer.expectedRevision !== (current.rows[0]?.revision || 0)) throw new Error("Conflito de revisao da resposta");
          }
          const result = await client.query(
            `
              insert into audit_answers (
                audit_id,
                question_id,
                answer,
                score_value,
                risk_level_snapshot,
                notes,
                answered_at
              )
              values ($1, $2, $3, $4, $5, $6, now())
              on conflict (audit_id, question_id)
              do update set
                answer = excluded.answer,
                score_value = excluded.score_value,
                risk_level_snapshot = excluded.risk_level_snapshot,
                notes = excluded.notes,
                revision = audit_answers.revision + 1,
                answered_at = now(),
                updated_at = now()
              returning *
            `,
            [
              auditAnswersMatch.id,
              answer.questionId,
              answer.answer,
              answer.answer === "C" ? 10 : answer.answer === "NC" ? 0 : null,
              question.rows[0].risk_level,
              answer.notes || null
            ]
          );
          saved.push(result.rows[0]);
        }
        await client.query("commit");
      } catch (error) {
        await client.query("rollback");
        throw error;
      } finally {
        client.release();
      }
      sendJson(response, 200, { answers: saved });
    } catch (error) {
      sendJson(response, 400, { error: error.message || "Erro ao salvar respostas" });
    }
    return true;
  }

  const auditFinalizeMatch = pathMatch(url.pathname, /^\/api\/audits\/(?<id>[0-9a-f-]+)\/finalize$/i);
  if (auditFinalizeMatch && request.method === "POST") {
    try {
      const pool = await getPool();
      if (!requireDatabase(response, pool)) return true;
      const body = await readJsonBody(request);
      const client = await pool.connect();
      let audit;
      const createdPlans = [];
      try {
        await client.query("begin");
        const score = await auditScore(client, auditFinalizeMatch.id);
        const auditResult = await client.query(
          `
            update audits
            set status = 'finished',
                finished_at = coalesce(finished_at, now()),
                final_score = $2,
                updated_at = now()
            where id = $1
            returning *
          `,
          [auditFinalizeMatch.id, score]
        );
        audit = auditResult.rows[0];
        if (!audit) throw new Error("Auditoria não encontrada");

        const generated = await actionPlanService.generateForAudit(client, audit, {
          generationMode: body.generationMode,
          defaultCorrection: body.defaultCorrection,
          dueDays: body.dueDays
        });
        createdPlans.push(...generated.actionPlans);
        await client.query("commit");
      } catch (error) {
        await client.query("rollback");
        throw error;
      } finally {
        client.release();
      }
      sendJson(response, 200, { audit, actionPlans: createdPlans });
    } catch (error) {
      sendJson(response, 500, { error: error.message || "Erro ao finalizar auditoria" });
    }
    return true;
  }

  if (url.pathname === "/api/action-plans" && request.method === "GET") {
    try {
      const pool = await getPool();
      if (!requireDatabase(response, pool)) return true;
      const unitId = await defaultUnitId(pool);
      const user = await currentUser(pool, request, unitId);
      const status = url.searchParams.get("status");
      const areaId = url.searchParams.get("areaId");
      const result = await pool.query(
        `
          select
            ap.*,
            dpi.id as document_item_id,
            aa.name as area_name,
            aa.slug as area_slug,
            u.full_name as assigned_to_name
          from action_plans ap
          join audit_areas aa on aa.id = ap.area_id
          left join action_plan_document_items dpi on dpi.action_plan_id=ap.id
          left join app_users u on u.id = ap.assigned_to_user_id
          where ap.unit_id = $1
            and ($2::text is null or ap.status = $2)
            and ($3::uuid is null or ap.area_id = $3)
            and ($4::boolean or ap.area_id = any($5::uuid[]))
          order by ap.due_at nulls last, ap.created_at desc
          limit 200
        `,
        [unitId, status || null, areaId || null, Boolean(user.all_areas), user.area_ids || []]
      );
      sendJson(response, 200, { actionPlans: result.rows });
    } catch (error) {
      sendJson(response, 500, { error: error.message || "Erro ao listar planos" });
    }
    return true;
  }

  if (url.pathname === "/api/action-plan-documents" && request.method === "GET") {
    try {
      const pool = await getPool();
      if (!requireDatabase(response, pool)) return true;
      const unitId = await defaultUnitId(pool);
      const user = await currentUser(pool, request, unitId);
      const result = await pool.query(
        `select d.*,a.name as area_name,a.slug as area_slug,u.full_name as assigned_to_name,
           count(i.id)::int as item_count,
           count(i.id) filter (where p.status='approved')::int as approved_item_count,
           count(i.id) filter (where p.status in ('pending_review','submitted'))::int as pending_review_count
         from action_plan_documents d
         join audit_areas a on a.id=d.area_id
         left join app_users u on u.id=d.assigned_to_user_id
         left join action_plan_document_items i on i.action_plan_document_id=d.id
         left join action_plans p on p.id=i.action_plan_id
         where d.unit_id=$1 and ($2::boolean or d.area_id=any($3::uuid[]))
         group by d.id,a.name,a.slug,u.full_name
         order by d.created_at desc limit 200`,
        [unitId, Boolean(user.all_areas), user.area_ids || []]
      );
      sendJson(response, 200, { actionPlanDocuments: result.rows });
    } catch (error) {
      sendJson(response, 500, { error: error.message || "Erro ao listar documentos de plano de ação" });
    }
    return true;
  }

  const planDocumentMatch = pathMatch(url.pathname, /^\/api\/action-plan-documents\/(?<id>[0-9a-f-]+)$/i);
  if (planDocumentMatch && request.method === "GET") {
    try {
      const pool = await getPool();
      if (!requireDatabase(response, pool)) return true;
      const unitId = await defaultUnitId(pool);
      const user = await currentUser(pool, request, unitId);
      const document = await pool.query(
        `select d.*,a.name as area_name,a.slug as area_slug,u.full_name as assigned_to_name,au.full_name as auditor_name
         from action_plan_documents d join audit_areas a on a.id=d.area_id
         left join app_users u on u.id=d.assigned_to_user_id
         left join audits audit on audit.id=d.origin_audit_id
         left join app_users au on au.id=audit.auditor_user_id
         where d.id=$1 and d.unit_id=$2 and ($3::boolean or d.area_id=any($4::uuid[]))`,
        [planDocumentMatch.id, unitId, Boolean(user.all_areas), user.area_ids || []]
      );
      if (!document.rows[0]) { sendJson(response, 404, { error: "Plano de ação não encontrado." }); return true; }
      const [items, acknowledgements, timeline] = await Promise.all([
        pool.query(
          `select i.*,p.status as action_plan_status,p.due_at,p.last_feedback_id,
             coalesce(json_agg(f order by f.created_at) filter (where f.id is not null),'[]'::json) as feedback
           from action_plan_document_items i
           left join action_plans p on p.id=i.action_plan_id
           left join action_plan_feedback f on f.action_plan_id=p.id
           where i.action_plan_document_id=$1 group by i.id,p.id order by i.item_order`, [planDocumentMatch.id]),
        pool.query("select a.*,u.full_name from action_plan_acknowledgements a join app_users u on u.id=a.responsible_user_id where a.action_plan_document_id=$1 order by a.signed_at desc", [planDocumentMatch.id]),
        pool.query("select t.*,u.full_name as actor_name from action_plan_timeline_events t left join app_users u on u.id=t.actor_user_id where t.action_plan_id in (select action_plan_id from action_plan_document_items where action_plan_document_id=$1) order by t.created_at", [planDocumentMatch.id])
      ]);
      sendJson(response, 200, { document: document.rows[0], items: items.rows, acknowledgements: acknowledgements.rows, timeline: timeline.rows });
    } catch (error) {
      sendJson(response, 500, { error: error.message || "Erro ao abrir plano de ação" });
    }
    return true;
  }

  const sendPlanDocumentMatch = pathMatch(url.pathname, /^\/api\/action-plan-documents\/(?<id>[0-9a-f-]+)\/send$/i);
  if (sendPlanDocumentMatch && request.method === "POST") {
    try {
      const pool = await getPool();
      if (!requireDatabase(response, pool)) return true;
      const unitId = await defaultUnitId(pool);
      const user = await currentUser(pool, request, unitId);
      const client = await pool.connect();
      let document;
      try {
        await client.query("begin");
        const result = await client.query(
          `update action_plan_documents set status='available_to_responsible',reviewed_by_user_id=$3,reviewed_at=now(),
             sent_to_responsible_at=now(),updated_at=now() where id=$1 and unit_id=$2 returning *`,
          [sendPlanDocumentMatch.id, unitId, user.id]
        );
        document = result.rows[0];
        if (!document) throw new Error("Documento não encontrado.");
        await client.query("update action_plans set status='available_to_responsible',auditor_reviewed_at=now(),sent_to_responsible_at=now(),updated_at=now() where action_plan_document_id=$1", [document.id]);
        if (document.assigned_to_user_id) {
          await notify(client, { unitId, recipientId: document.assigned_to_user_id, title: "Plano de ação disponível", body: document.title,
            type: "action_plan_assigned", entityType: "action_plan_document", entityId: document.id, key: `action-plan-document:${document.id}` });
        }
        await client.query("commit");
      } catch (error) { await client.query("rollback"); throw error; }
      finally { client.release(); }
      sendJson(response, 200, { document });
    } catch (error) { sendJson(response, 500, { error: error.message || "Erro ao enviar plano" }); }
    return true;
  }

  const acknowledgePlanMatch = pathMatch(url.pathname, /^\/api\/action-plan-documents\/(?<id>[0-9a-f-]+)\/acknowledge$/i);
  if (acknowledgePlanMatch && request.method === "POST") {
    try {
      const pool = await getPool();
      if (!requireDatabase(response, pool)) return true;
      const unitId = await defaultUnitId(pool);
      const user = await currentUser(pool, request, unitId);
      const body = await readJsonBody(request);
      const client = await pool.connect();
      let acknowledgement;
      try {
        await client.query("begin");
        const document = await client.query("select * from action_plan_documents where id=$1 and unit_id=$2 and assigned_to_user_id=$3 for update", [acknowledgePlanMatch.id, unitId, user.id]);
        if (!document.rows[0]) throw new Error("Este plano não está atribuído ao usuário conectado.");
        const result = await client.query(
          `insert into action_plan_acknowledgements
             (action_plan_document_id,responsible_user_id,acknowledgement_text,signature_name,ip_address,user_agent,metadata)
           values ($1,$2,$3,$4,$5,$6,$7::jsonb) returning *`,
          [acknowledgePlanMatch.id, user.id, body.acknowledgementText || "Declaro ciência do plano de ação e de seus prazos.",
            user.full_name, requestIp(request), String(request.headers["user-agent"] || "").slice(0, 512), JSON.stringify({ method: "authenticated_session" })]
        );
        acknowledgement = result.rows[0];
        await client.query("update action_plan_documents set status='acknowledged',acknowledged_at=now(),updated_at=now() where id=$1", [acknowledgePlanMatch.id]);
        await client.query("update action_plans set status='acknowledged',acknowledged_at=now(),updated_at=now() where action_plan_document_id=$1 and status in ('available_to_responsible','sent_to_responsible')", [acknowledgePlanMatch.id]);
        await client.query("commit");
      } catch (error) { await client.query("rollback"); throw error; }
      finally { client.release(); }
      sendJson(response, 201, { acknowledgement });
    } catch (error) { sendJson(response, 400, { error: error.message || "Erro ao registrar ciência" }); }
    return true;
  }

  const planFeedbackMatch = pathMatch(url.pathname, /^\/api\/action-plans\/(?<id>[0-9a-f-]+)\/feedback$/i);
  if (planFeedbackMatch && request.method === "POST") {
    try {
      const pool = await getPool();
      if (!requireDatabase(response, pool)) return true;
      const body = await readJsonBody(request);
      const unitId = await defaultUnitId(pool);
      const user = await currentUser(pool, request, unitId);
      const client = await pool.connect();
      let result;
      let plan;
      try {
        await client.query("begin");
        const selected = await client.query(
          `select ap.*,a.auditor_user_id from action_plans ap
           left join audits a on a.id=ap.origin_audit_id
           where ap.id=$1 and ap.unit_id=$2 and ($3::boolean or ap.assigned_to_user_id=$4) for update of ap`,
          [planFeedbackMatch.id, unitId, Boolean(user.all_areas), user.id]
        );
        plan = selected.rows[0];
        if (!plan) throw new Error("Plano não encontrado ou não pertence a este usuário.");
        if (["approved", "cancelled"].includes(plan.status)) throw new Error("Este plano já está encerrado.");
        result = await client.query(
        `
          insert into action_plan_feedback (
            action_plan_id,
            submitted_by_user_id,
            action_plan_document_item_id,
            evidence_file_id,
            response_file_id,
            observation,
            correction_summary,
            completion_status,
            delay_justification,
            capture_method,
            requested_due_at,
            status,
            deadline_status
          )
          values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11::timestamptz,'submitted',case when $11::timestamptz is null then null else 'requested' end)
          returning *
        `,
        [
          planFeedbackMatch.id,
          user?.id || null,
          body.documentItemId || null,
          body.evidenceFileId || null,
          body.responseFileId || null,
          body.observation || null,
          body.correctionSummary || null,
          body.completionStatus || "completed",
          body.delayJustification || null,
          body.captureMethod || "upload",
          body.requestedDueAt || null
        ]
        );
        await client.query(
        `
          update action_plans
          set status = 'pending_review',
              submitted_at = now(),
              last_feedback_id = $2,
              updated_at = now()
          where id = $1
        `,
        [planFeedbackMatch.id, result.rows[0].id]
        );
        if (plan.auditor_user_id && plan.auditor_user_id !== user.id) {
          await notify(client, {
            unitId,
            recipientId: plan.auditor_user_id,
            title: body.delayJustification ? "Novo prazo solicitado" : "Devolutiva recebida",
            body: body.delayJustification || `${user.full_name} enviou uma devolutiva para análise.`,
            type: body.delayJustification ? "action_plan_deadline_requested" : "action_plan_feedback",
            entityType: "action_plan",
            entityId: plan.id,
            key: `feedback:${result.rows[0].id}`
          });
        }
        await client.query("commit");
      } catch (error) {
        await client.query("rollback");
        throw error;
      } finally {
        client.release();
      }
      sendJson(response, 201, { feedback: result.rows[0] });
    } catch (error) {
      sendJson(response, 500, { error: error.message || "Erro ao enviar devolutiva" });
    }
    return true;
  }

  const planReviewMatch = pathMatch(url.pathname, /^\/api\/action-plans\/(?<id>[0-9a-f-]+)\/review$/i);
  if (planReviewMatch && request.method === "POST") {
    try {
      const pool = await getPool();
      if (!requireDatabase(response, pool)) return true;
      const body = await readJsonBody(request);
      if (!["approved", "rejected"].includes(body.decision)) {
        sendJson(response, 400, { error: "decision deve ser approved ou rejected" });
        return true;
      }
      const unitId = await defaultUnitId(pool);
      const user = await currentUser(pool, request, unitId);
      const nextStatus = body.decision === "approved" ? "approved" : body.allowResubmission ? "reopened" : "rejected";
      const client = await pool.connect();
      let plan;
      let event;
      try {
        await client.query("begin");
        const planResult = await client.query(
          `
            update action_plans
            set status = $2,
                approved_by_user_id = case when $2 = 'approved' then $3 else approved_by_user_id end,
                approved_at = case when $2 = 'approved' then now() else approved_at end,
                rejected_by_user_id = case when $4 = 'rejected' then $3 else rejected_by_user_id end,
                rejected_at = case when $4 = 'rejected' then now() else rejected_at end,
                rejection_reason = case when $4 = 'rejected' then $5 else rejection_reason end,
                resubmission_note = case when $2 = 'reopened' then $5 else resubmission_note end,
                reopened_at = case when $2 = 'reopened' then now() else reopened_at end,
                updated_at = now()
            where id = $1
            returning *
          `,
          [planReviewMatch.id, nextStatus, user?.id || null, body.decision, body.justification || null]
        );
        plan = planResult.rows[0];
        event = await client.query(
          `
            insert into action_plan_review_events (
              action_plan_id,
              action_plan_document_item_id,
              feedback_id,
              reviewer_user_id,
              decision,
              justification,
              allow_resubmission,
              resubmission_due_at,
              visible_to_responsible_at
            )
            values ($1,$2,$3,$4,$5,$6,$7,$8,now())
            returning *
          `,
          [
            planReviewMatch.id,
            body.documentItemId || null,
            body.feedbackId || plan?.last_feedback_id || null,
            user?.id || null,
            body.decision,
            body.justification || null,
            Boolean(body.allowResubmission),
            body.resubmissionDueAt || null
          ]
        );
        await client.query(
          `update action_plan_feedback set status=$2,reviewed_by_user_id=$3,reviewed_at=now(),review_note=$4,
             deadline_status=case when deadline_status='requested' then $2 else deadline_status end,
             deadline_reviewed_by_user_id=case when deadline_status='requested' then $3 else deadline_reviewed_by_user_id end,
             deadline_reviewed_at=case when deadline_status='requested' then now() else deadline_reviewed_at end,
             deadline_review_note=case when deadline_status='requested' then $4 else deadline_review_note end,updated_at=now()
           where id=coalesce($1,(select last_feedback_id from action_plans where id=$5))`,
          [body.feedbackId || null, body.decision, user.id, body.justification || null, planReviewMatch.id]
        );
        if (plan?.action_plan_document_id) {
          await client.query(
            `update action_plan_documents d set status=case
               when not exists(select 1 from action_plans p where p.action_plan_document_id=d.id and p.status<>'approved') then 'approved'
               when exists(select 1 from action_plans p where p.action_plan_document_id=d.id and p.status in ('rejected','reopened')) then 'reopened'
               else 'pending_review' end,
             closed_at=case when not exists(select 1 from action_plans p where p.action_plan_document_id=d.id and p.status<>'approved') then now() else null end,
             updated_at=now() where d.id=$1`, [plan.action_plan_document_id]
          );
        }
        if (plan?.assigned_to_user_id && plan.assigned_to_user_id !== user.id) {
          await notify(client, { unitId, recipientId: plan.assigned_to_user_id,
            title: body.decision === "approved" ? "Evidência aprovada" : "Correção solicitada",
            body: body.justification || (body.decision === "approved" ? "A evidência enviada foi aprovada." : "Revise o item e envie uma nova evidência."),
            type: body.decision === "approved" ? "action_plan_approved" : "action_plan_rejected",
            entityType: "action_plan", entityId: plan.id, key: `review:${event.rows[0].id}` });
        }
        await client.query("commit");
      } catch (error) {
        await client.query("rollback");
        throw error;
      } finally {
        client.release();
      }
      sendJson(response, 200, { actionPlan: plan, reviewEvent: event.rows[0] });
    } catch (error) {
      sendJson(response, 500, { error: error.message || "Erro ao revisar plano" });
    }
    return true;
  }

  if (url.pathname === "/api/report-jobs" && request.method === "POST") {
    try {
      const pool = await getPool();
      if (!requireDatabase(response, pool)) return true;
      const body = await readJsonBody(request);
      const unitId = body.unitId || await defaultUnitId(pool);
      const user = await currentUser(pool, request, unitId);
      const result = await pool.query(
        `
          insert into report_generation_jobs (
            unit_id,
            area_id,
            cycle_id,
            requested_by_user_id,
            report_type,
            status,
            payload
          )
          values ($1, $2, $3, $4, $5, 'queued', $6::jsonb)
          returning *
        `,
        [
          unitId,
          body.areaId || null,
          body.cycleId || null,
          user?.id || null,
          body.reportType || "monthly",
          JSON.stringify(body.payload || {})
        ]
      );
      sendJson(response, 202, { reportJob: result.rows[0] });
    } catch (error) {
      sendJson(response, 500, { error: error.message || "Erro ao criar job de relatório" });
    }
    return true;
  }

  if (url.pathname === "/api/report-jobs" && request.method === "GET") {
    try {
      const pool = await getPool();
      if (!requireDatabase(response, pool)) return true;
      const status = url.searchParams.get("status");
      const result = await pool.query(
        `
          select rj.*, aa.name as area_name, r.title as report_title
          from report_generation_jobs rj
          left join audit_areas aa on aa.id = rj.area_id
          left join reports r on r.id = rj.report_id
          where ($1::text is null or rj.status = $1)
          order by rj.created_at desc
          limit 100
        `,
        [status || null]
      );
      sendJson(response, 200, { reportJobs: result.rows });
    } catch (error) {
      sendJson(response, 500, { error: error.message || "Erro ao listar jobs de relatório" });
    }
    return true;
  }

  if (url.pathname === "/api/files/upload-intents" && request.method === "POST") {
    try {
      const pool = await getPool();
      if (!requireDatabase(response, pool)) return true;
      const body = await readJsonBody(request);
      const unitId = body.unitId || await defaultUnitId(pool);
      const user = await currentUser(pool, request, unitId);
      const fileType = body.fileType || "other";
      const storageKey = body.storageKey || storageKeyFor(fileType, body.originalFilename);
      const result = await pool.query(
        `
          insert into file_upload_intents (
            unit_id,
            requested_by_user_id,
            file_type,
            entity_type,
            entity_id,
            storage_provider,
            storage_bucket,
            storage_key,
            upload_url,
            public_file_url,
            expected_mime_type,
            expected_size_bytes,
            status
          )
          values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, 'created')
          returning *
        `,
        [
          unitId,
          user?.id || null,
          fileType,
          body.entityType || null,
          body.entityId || null,
          body.storageProvider || process.env.FILE_STORAGE_PROVIDER || "external",
          body.storageBucket || process.env.FILE_STORAGE_BUCKET || null,
          storageKey,
          body.uploadUrl || null,
          body.fileUrl || null,
          body.mimeType || null,
          body.fileSizeBytes || null
        ]
      );
      sendJson(response, 201, {
        uploadIntent: result.rows[0],
        uploadMode: "external-storage-metadata",
        note: "Use storage externo/privado para o binário e confirme depois em /api/files/upload-intents/:id/complete."
      });
    } catch (error) {
      sendJson(response, 500, { error: error.message || "Erro ao criar intenção de upload" });
    }
    return true;
  }

  const uploadCompleteMatch = pathMatch(url.pathname, /^\/api\/files\/upload-intents\/(?<id>[0-9a-f-]+)\/complete$/i);
  if (uploadCompleteMatch && request.method === "POST") {
    try {
      const pool = await getPool();
      if (!requireDatabase(response, pool)) return true;
      const body = await readJsonBody(request);
      const client = await pool.connect();
      let file;
      let intent;
      try {
        await client.query("begin");
        const intentResult = await client.query(
          "select * from file_upload_intents where id = $1 for update",
          [uploadCompleteMatch.id]
        );
        intent = intentResult.rows[0];
        if (!intent) throw new Error("Intenção de upload não encontrada");
        if (intent.status !== "created") throw new Error("Intenção de upload já foi processada");

        const fileResult = await client.query(
          `
            insert into stored_files (
              unit_id,
              uploaded_by_user_id,
              file_type,
              storage_provider,
              storage_bucket,
              storage_key,
              file_url,
              original_filename,
              mime_type,
              file_size_bytes,
              checksum
            )
            values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
            returning *
          `,
          [
            intent.unit_id,
            intent.requested_by_user_id,
            intent.file_type,
            intent.storage_provider,
            intent.storage_bucket,
            intent.storage_key,
            body.fileUrl || intent.public_file_url,
            body.originalFilename || null,
            body.mimeType || intent.expected_mime_type,
            body.fileSizeBytes || intent.expected_size_bytes,
            body.checksum || null
          ]
        );
        file = fileResult.rows[0];

        if (intent.entity_type && intent.entity_id) {
          await client.query(
            `
              insert into file_links (file_id, entity_type, entity_id, caption)
              values ($1, $2, $3, $4)
            `,
            [file.id, intent.entity_type, intent.entity_id, body.caption || null]
          );
        }

        const updatedIntent = await client.query(
          `
            update file_upload_intents
            set status = 'attached',
                stored_file_id = $2,
                updated_at = now()
            where id = $1
            returning *
          `,
          [intent.id, file.id]
        );
        intent = updatedIntent.rows[0];
        await client.query("commit");
      } catch (error) {
        await client.query("rollback");
        throw error;
      } finally {
        client.release();
      }
      sendJson(response, 200, { file, uploadIntent: intent });
    } catch (error) {
      sendJson(response, 400, { error: error.message || "Erro ao confirmar upload" });
    }
    return true;
  }

  if (url.pathname === "/api/files" && request.method === "POST") {
    try {
      const pool = await getPool();
      if (!requireDatabase(response, pool)) return true;
      const body = await readJsonBody(request);
      const unitId = body.unitId || await defaultUnitId(pool);
      const user = await currentUser(pool, request, unitId);
      const result = await pool.query(
        `
          insert into stored_files (
            unit_id,
            uploaded_by_user_id,
            file_type,
            storage_provider,
            storage_bucket,
            storage_key,
            file_url,
            original_filename,
            mime_type,
            file_size_bytes,
            checksum
          )
          values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
          returning *
        `,
        [
          unitId,
          user?.id || null,
          body.fileType || "other",
          body.storageProvider || "external",
          body.storageBucket || null,
          body.storageKey || null,
          body.fileUrl || null,
          body.originalFilename || null,
          body.mimeType || null,
          body.fileSizeBytes || null,
          body.checksum || null
        ]
      );
      sendJson(response, 201, {
        file: result.rows[0],
        note: "Arquivos grandes ficam no storage. O Postgres guarda somente metadados e chave/URL."
      });
    } catch (error) {
      sendJson(response, 500, { error: error.message || "Erro ao registrar arquivo" });
    }
    return true;
  }

  if (url.pathname === "/api/sync-queue" && request.method === "POST") {
    try {
      const pool = await getPool();
      if (!requireDatabase(response, pool)) return true;
      const body = await readJsonBody(request);
      const operations = Array.isArray(body.operations) ? body.operations : [body];
      const unitId = await defaultUnitId(pool);
      const user = await currentUser(pool, request, unitId);
      const device = await syncService.deviceFor(pool, user, body.deviceUid);
      const saved = await syncService.enqueue(pool, user, device, operations);
      const processed = await syncService.processOperations(pool, user.id, device.id, saved.map((item) => item.client_operation_id), saved.length);
      const updated = new Map(processed.map((item) => [item.id, item]));
      const results = saved.map((item) => updated.get(item.id) || item);
      const complete = results.every((item) => ["synced", "ignored"].includes(item.status));
      sendJson(response, complete ? 200 : 202, { operations: results, complete });
    } catch (error) {
      sendJson(response, 400, { error: error.message || "Erro ao registrar sincronização" });
    }
    return true;
  }

  if (url.pathname === "/api/sync-queue" && request.method === "GET") {
    try {
      const pool = await getPool();
      if (!requireDatabase(response, pool)) return true;
      const status = url.searchParams.get("status") || "pending";
      const user = await currentUser(pool, request, await defaultUnitId(pool));
      const device = await syncService.deviceFor(pool, user, url.searchParams.get("deviceUid"));
      const result = await pool.query(
        `
          select *
          from sync_queue
          where status = $1 and user_id = $2 and device_id = $3
          order by created_at asc
          limit 200
        `,
        [status, user.id, device.id]
      );
      sendJson(response, 200, { operations: result.rows });
    } catch (error) {
      sendJson(response, 500, { error: error.message || "Erro ao listar fila de sincronização" });
    }
    return true;
  }

  if (url.pathname === "/api/sync-queue/process" && request.method === "POST") {
    try {
      const pool = await getPool();
      if (!requireDatabase(response, pool)) return true;
      const body = await readJsonBody(request);
      const user = await currentUser(pool, request, await defaultUnitId(pool));
      const device = await syncService.deviceFor(pool, user, body.deviceUid);
      const processed = await syncService.processOperations(pool, user.id, device.id, null, body.limit);
      sendJson(response, 200, { processed });
    } catch (error) {
      sendJson(response, 500, { error: error.message || "Erro ao processar fila offline" });
    }
    return true;
  }

  if (url.pathname.startsWith("/api/")) {
    sendJson(response, 404, { error: "Rota não encontrada" });
    return true;
  }

  return false;
}

function serveStatic(request, response, url) {
  if (url.pathname === "/plano-acao-preview.html") {
    response.writeHead(302, {
      location: "/#actions",
      "cache-control": "no-store"
    });
    response.end();
    return;
  }
  const requestedPath = staticPathFor(url.pathname);
  const filePath = requestedPath && fs.existsSync(requestedPath) && fs.statSync(requestedPath).isFile()
    ? requestedPath
    : path.join(root, "index.html");
  const ext = path.extname(filePath).toLowerCase();
  const shouldSkipCache = ext === ".html" || ext === ".js" || ext === ".css" || ext === ".webmanifest";
  response.writeHead(200, {
    "content-type": mimeTypes[ext] || "application/octet-stream",
    "cache-control": shouldSkipCache ? "no-store" : "public, max-age=3600"
  });
  fs.createReadStream(filePath).pipe(response);
}

const server = http.createServer(async (request, response) => {
  const origin = request.headers.origin;
  const allowedOrigins = new Set(["https://localhost", "http://localhost", ...(process.env.CORS_ORIGINS || "").split(",").map((item) => item.trim()).filter(Boolean)]);
  if (origin && allowedOrigins.has(origin)) {
    response.setHeader("Access-Control-Allow-Origin", origin);
    response.setHeader("Vary", "Origin");
    response.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization,X-Device-Uid,X-Local-File-Id,X-File-Type,X-File-Name");
    response.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,OPTIONS");
  }
  if (request.method === "OPTIONS") {
    response.writeHead(origin && allowedOrigins.has(origin) ? 204 : 403);
    response.end();
    return;
  }
  const url = new URL(request.url, `http://${request.headers.host || "localhost"}`);
  if (await handleApi(request, response, url)) return;
  serveStatic(request, response, url);
});

let reportWorkerRunning = false;
const reportTimer = setInterval(async () => {
  if (!databaseUrl || reportWorkerRunning || process.env.REPORT_WORKER_ENABLED === "false" ||
      (process.env.RENDER === "true" && process.env.STRUCTURED_APIS_ENABLED !== "true")) return;
  reportWorkerRunning = true;
  try {
    const pool = await getPool();
    for (let index = 0; index < 5; index++) {
      if (!await reportWorker.processNext(pool)) break;
    }
  } catch (error) { console.error("Worker de relatorios:", error.message); }
  finally { reportWorkerRunning = false; }
}, 3000);
reportTimer.unref();

server.listen(port, () => {
  console.log(`HAE Auditoria rodando em http://localhost:${port}`);
});
