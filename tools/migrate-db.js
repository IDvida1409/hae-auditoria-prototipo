const { Pool } = require("pg");
const { migrate } = require("../lib/database");

async function main() {
  if (!process.env.DATABASE_URL) throw new Error("Configure DATABASE_URL antes de aplicar as migrations");
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: ["require", "verify-ca", "verify-full"].includes(String(process.env.PGSSLMODE || "").toLowerCase()) ? { rejectUnauthorized: false } : false
  });
  try {
    await migrate(pool);
    const result = await pool.query("select filename,applied_at from schema_migrations order by filename");
    console.log(JSON.stringify({ migrations: result.rows }, null, 2));
  } finally { await pool.end(); }
}

main().catch((error) => { console.error(error.message); process.exitCode = 1; });
