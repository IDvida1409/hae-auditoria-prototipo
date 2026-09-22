const assert = require("node:assert/strict");
const fs = require("node:fs/promises");
const path = require("node:path");
const crypto = require("node:crypto");
const net = require("node:net");
const { Pool } = require("pg");
const { migrate } = require("../lib/database");

const root = path.resolve(__dirname, "..");

async function freePort() {
  const server = net.createServer();
  await new Promise((resolve, reject) => { server.once("error", reject); server.listen(0, "127.0.0.1", resolve); });
  const port = server.address().port;
  await new Promise((resolve) => server.close(resolve));
  return port;
}

async function main() {
  const { default: EmbeddedPostgres } = await import("embedded-postgres");
  const base = path.resolve(root, ".backend-tests");
  const folder = await fs.mkdtemp(path.join(base, "backup-restore-"));
  if (!folder.startsWith(base + path.sep)) throw new Error("Diretório temporário fora da área de testes");
  const databaseDir = path.join(folder, "db");
  const backupDir = path.join(folder, "backup", "db");
  const port = await freePort();
  const password = crypto.randomBytes(24).toString("hex");
  const options = { databaseDir, user: "postgres", password, port, persistent: true, postgresFlags: ["-c", "listen_addresses=127.0.0.1"], onLog() {}, onError: console.error };
  let database = new EmbeddedPostgres(options);
  let pool;
  try {
    await database.initialise();
    await database.start();
    const databaseUrl = `postgres://postgres:${password}@127.0.0.1:${port}/postgres`;
    pool = new Pool({ connectionString: databaseUrl });
    await migrate(pool);
    const unit = await pool.query("select id from units order by created_at limit 1");
    const marker = crypto.randomUUID();
    await pool.query("insert into activity_logs (unit_id,entity_type,action,metadata) values ($1,'backup_test','backup.marker',$2::jsonb)", [unit.rows[0].id, JSON.stringify({ marker })]);
    await pool.end(); pool = null;
    await database.stop();

    await fs.mkdir(path.dirname(backupDir), { recursive: true });
    await fs.cp(databaseDir, backupDir, { recursive: true, errorOnExist: true });
    await fs.rm(databaseDir, { recursive: true, force: true });
    await fs.cp(backupDir, databaseDir, { recursive: true, errorOnExist: true });

    database = new EmbeddedPostgres(options);
    await database.start();
    pool = new Pool({ connectionString: databaseUrl });
    const restored = await pool.query("select metadata->>'marker' as marker from activity_logs where action='backup.marker'");
    assert.equal(restored.rows[0]?.marker, marker);
    const migrations = await pool.query("select count(*)::int as count from schema_migrations");
    assert.ok(migrations.rows[0].count >= 15);
    console.log("PASS: physical PostgreSQL backup restored with migrations and persisted operational data intact.");
  } finally {
    if (pool) await pool.end().catch(() => {});
    await database.stop().catch(() => {});
  }
}

main().catch((error) => { console.error(error); process.exitCode = 1; });
