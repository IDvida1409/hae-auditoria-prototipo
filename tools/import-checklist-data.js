const { Pool } = require("pg");
const { importChecklistData } = require("../lib/checklist-import");
const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.error("DATABASE_URL não está configurado.");
  process.exit(1);
}

async function main() {
  const pool = new Pool({
    connectionString: databaseUrl,
    ssl: databaseUrl.includes("localhost") ? false : { rejectUnauthorized: false }
  });

  try {
    const result = await importChecklistData(pool, { force: true });
    console.log(`Importacao concluida: ${result.areas} areas, ${result.questions} perguntas.`);
  } catch (error) {
    console.error(error);
    process.exitCode = 1;
  } finally {
    await pool.end();
  }
}

main();
