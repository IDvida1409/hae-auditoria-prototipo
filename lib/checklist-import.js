const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const root = path.join(__dirname, "..");

function loadChecklistData() {
  const source = fs.readFileSync(path.join(root, "checklist-data.js"), "utf8");
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  vm.runInContext(source, sandbox, { filename: "checklist-data.js" });
  return sandbox.window.HAE_CHECKLIST_DATA || {};
}

function normalizeRiskLevel(value) {
  const normalized = String(value || "")
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase();

  if (normalized === "baixo") return "low";
  if (normalized === "moderado") return "moderate";
  if (normalized === "medio") return "medium";
  if (normalized === "alto") return "high";
  if (normalized === "critico") return "critical";
  return "low";
}

async function upsertChecklist(client, unitId, area, data) {
  const checklist = await client.query(
    `insert into checklists (unit_id,area_id,name,version_label,legal_base,source_key,imported_at,is_active)
     values ($1,$2,$3,$4,$5,$6,now(),true)
     on conflict (unit_id,area_id,name,version_label) where area_id is not null
     do update set legal_base=excluded.legal_base,source_key=excluded.source_key,imported_at=now(),is_active=true,updated_at=now()
     returning id`,
    [unitId, area.id, `Checklist ${area.name}`, "Portaria SMS 2619/2011", "Portaria SMS n. 2.619/2011", area.slug]
  );
  const checklistId = checklist.rows[0].id;
  const expectedBlockOrders = [];

  for (const [blockIndex, block] of (data.blocks || []).entries()) {
    const displayOrder = blockIndex + 1;
    expectedBlockOrders.push(displayOrder);
    const existing = await client.query(
      "select id from checklist_blocks where checklist_id=$1 and display_order=$2",
      [checklistId, displayOrder]
    );
    let blockId = existing.rows[0]?.id;
    if (blockId) {
      await client.query("update checklist_blocks set title=$1,active=true,updated_at=now() where id=$2", [block.title, blockId]);
    } else {
      const inserted = await client.query(
        "insert into checklist_blocks (checklist_id,title,display_order,active) values ($1,$2,$3,true) returning id",
        [checklistId, block.title, displayOrder]
      );
      blockId = inserted.rows[0].id;
    }

    const expectedQuestions = [];
    for (const question of (block.questions || [])) {
      expectedQuestions.push(Number(question.number));
      await client.query(
        `insert into checklist_questions (block_id,question_number,requirement_text,legal_reference,risk_level,answer_options,required_evidence_on_nc,weight,active)
         values ($1,$2,$3,$4,$5,$6::jsonb,true,$7,true)
         on conflict (block_id,question_number)
         do update set requirement_text=excluded.requirement_text,legal_reference=excluded.legal_reference,risk_level=excluded.risk_level,
           answer_options=excluded.answer_options,required_evidence_on_nc=true,weight=excluded.weight,active=true,updated_at=now()`,
        [blockId, question.number, question.text, question.reference || "Portaria SMS n. 2.619/2011",
          normalizeRiskLevel(question.riskLevel), JSON.stringify(question.allowedAnswers || ["C", "NC", "X"]), Number(question.risk || 1)]
      );
    }
    await client.query(
      "update checklist_questions set active=false,updated_at=now() where block_id=$1 and not (question_number=any($2::int[]))",
      [blockId, expectedQuestions]
    );
  }

  await client.query(
    "update checklist_blocks set active=false,updated_at=now() where checklist_id=$1 and not (display_order=any($2::int[]))",
    [checklistId, expectedBlockOrders]
  );
}

async function importChecklistData(pool, options = {}) {
  const data = loadChecklistData();
  const expectedAreas = Object.keys(data).length;
  const expectedQuestions = Object.values(data).reduce((total, checklist) => total + Number(checklist.totalQuestions || 0), 0);
  const current = await pool.query(
    `select count(distinct c.id)::int as areas,count(q.id)::int as questions
     from checklists c
     left join checklist_blocks b on b.checklist_id=c.id and b.active=true
     left join checklist_questions q on q.block_id=b.id and q.active=true
     where c.is_active=true`
  );
  if (!options.force && current.rows[0]?.areas >= expectedAreas && current.rows[0]?.questions >= expectedQuestions) {
    return { imported: false, areas: current.rows[0].areas, questions: current.rows[0].questions };
  }

  const client = await pool.connect();
  try {
    await client.query("begin");
    const unit = await client.query("select id from units where code=$1 order by created_at limit 1", ["einstein-morumbi"]);
    if (!unit.rows[0]) throw new Error("Unidade einstein-morumbi nao encontrada.");

    let importedAreas = 0;
    let importedQuestions = 0;
    for (const [slug, checklist] of Object.entries(data)) {
      const area = await client.query("select id,name,slug from audit_areas where unit_id=$1 and slug=$2", [unit.rows[0].id, slug]);
      if (!area.rows[0]) throw new Error(`Area nao encontrada para o checklist ${slug}.`);
      await upsertChecklist(client, unit.rows[0].id, area.rows[0], checklist);
      importedAreas += 1;
      importedQuestions += Number(checklist.totalQuestions || 0);
    }
    await client.query("commit");
    return { imported: true, areas: importedAreas, questions: importedQuestions };
  } catch (error) {
    await client.query("rollback");
    throw error;
  } finally {
    client.release();
  }
}

module.exports = { importChecklistData, loadChecklistData, normalizeRiskLevel };
