const fs = require("node:fs");
const path = require("node:path");

async function migrate(pool) {
  const folder = path.join(__dirname, "..", "migrations");
  const files = fs.readdirSync(folder).filter((file) => /^\d+_.+\.sql$/i.test(file)).sort();
  const client = await pool.connect();
  let locked = false;
  try {
    await client.query("select pg_advisory_lock(hashtextextended('idauditor-schema-migrations',0))");
    locked = true;
    await client.query("create table if not exists schema_migrations (id serial primary key,filename text not null unique,applied_at timestamptz not null default now())");
    await client.query("create table if not exists app_state (id text primary key,state jsonb,updated_at timestamptz)");
    for (const file of files) {
      try {
        await client.query("begin");
        const applied = await client.query("select 1 from schema_migrations where filename=$1", [file]);
        if (!applied.rows.length) {
          await client.query(fs.readFileSync(path.join(folder, file), "utf8"));
          await client.query("insert into schema_migrations (filename) values ($1)", [file]);
        }
        await client.query("commit");
      } catch (error) {
        await client.query("rollback");
        throw new Error("Falha na migration " + file + ": " + error.message);
      }
    }
  } finally {
    try {
      if (locked) await client.query("select pg_advisory_unlock(hashtextextended('idauditor-schema-migrations',0))");
    } finally { client.release(); }
  }
}

module.exports = { migrate };
