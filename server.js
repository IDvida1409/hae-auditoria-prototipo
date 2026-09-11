const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

const root = __dirname;
const dataDir = path.join(root, "data");
const stateFile = path.join(dataDir, "app-state.json");
const migrationsDir = path.join(root, "migrations");
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
  ".svg": "image/svg+xml; charset=utf-8",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".ico": "image/x-icon"
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

function migrationFiles() {
  if (!fs.existsSync(migrationsDir)) return [];
  return fs.readdirSync(migrationsDir)
    .filter((file) => /^\d+_.+\.sql$/i.test(file))
    .sort();
}

async function runMigrations(pool) {
  await pool.query(`
    create table if not exists schema_migrations (
      id serial primary key,
      filename text not null unique,
      applied_at timestamptz not null default now()
    )
  `);

  for (const filename of migrationFiles()) {
    const applied = await pool.query(
      "select 1 from schema_migrations where filename = $1",
      [filename]
    );
    if (applied.rows.length) continue;

    const sql = fs.readFileSync(path.join(migrationsDir, filename), "utf8").trim();
    if (!sql) continue;

    const client = await pool.connect();
    try {
      await client.query("begin");
      await client.query(sql);
      await client.query(
        "insert into schema_migrations (filename) values ($1)",
        [filename]
      );
      await client.query("commit");
    } catch (error) {
      await client.query("rollback");
      throw new Error(`Falha ao aplicar migracao ${filename}: ${error.message}`);
    } finally {
      client.release();
    }
  }
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
      await pool.query(`
        create table if not exists app_state (
          id text primary key,
          state jsonb,
          updated_at timestamptz
        )
      `);
      await runMigrations(pool);
      return pool;
    })();
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

function staticPathFor(urlPath) {
  const cleanPath = decodeURIComponent(urlPath.split("?")[0]);
  const relativePath = cleanPath === "/" ? "index.html" : cleanPath.replace(/^\/+/, "");
  const resolved = path.resolve(root, relativePath);
  if (!resolved.startsWith(root)) return null;
  return resolved;
}

async function handleApi(request, response, url) {
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

  if (url.pathname.startsWith("/api/")) {
    sendJson(response, 404, { error: "Rota não encontrada" });
    return true;
  }

  return false;
}

function serveStatic(request, response, url) {
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
  const url = new URL(request.url, `http://${request.headers.host || "localhost"}`);
  if (await handleApi(request, response, url)) return;
  serveStatic(request, response, url);
});

server.listen(port, () => {
  console.log(`HAE Auditoria rodando em http://localhost:${port}`);
});
