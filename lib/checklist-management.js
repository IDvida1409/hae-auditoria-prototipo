const allowedRiskLevels = new Set(["low", "moderate", "medium", "high", "critical"]);
const allowedAnswers = new Set(["C", "NC", "X"]);

function checklistName(areaName) {
  return `Checklist ${areaName}`;
}

function validateQuestion(question, blockIndex, questionIndex) {
  const number = Number(question.number ?? question.question_number);
  const text = String(question.text ?? question.requirement_text ?? "").trim();
  const weight = Number(question.weight);
  const riskLevel = String(question.riskLevel ?? question.risk_level ?? "low");
  const legalReference = String(question.reference ?? question.legal_reference ?? "").trim();
  const answers = Array.isArray(question.allowedAnswers ?? question.answer_options)
    ? [...new Set(question.allowedAnswers ?? question.answer_options)].filter((value) => allowedAnswers.has(value))
    : ["C", "NC", "X"];
  if (!Number.isInteger(number) || number < 1) throw new Error(`Número de pergunta inválido no bloco ${blockIndex + 1}, item ${questionIndex + 1}.`);
  if (!text || text.length > 4000) throw new Error(`Texto inválido no bloco ${blockIndex + 1}, pergunta ${number}.`);
  if (!Number.isFinite(weight) || weight <= 0 || weight > 100) throw new Error(`Peso inválido na pergunta ${number}.`);
  if (!allowedRiskLevels.has(riskLevel)) throw new Error(`Risco inválido na pergunta ${number}.`);
  if (!answers.length) throw new Error(`A pergunta ${number} precisa ter ao menos uma opção de resposta.`);
  return {
    number,
    text,
    weight,
    riskLevel,
    legalReference,
    allowedAnswers: answers,
    requiredEvidenceOnNc: question.requiredEvidenceOnNc !== false
  };
}

function validateBlocks(input) {
  if (!Array.isArray(input) || !input.length) throw new Error("O checklist precisa ter ao menos um bloco.");
  const blockOrders = new Set();
  return input.map((block, blockIndex) => {
    const title = String(block.title || "").trim();
    if (!title || title.length > 250) throw new Error(`Título inválido no bloco ${blockIndex + 1}.`);
    const displayOrder = Number(block.displayOrder ?? block.display_order ?? blockIndex + 1);
    if (!Number.isInteger(displayOrder) || displayOrder < 1 || blockOrders.has(displayOrder)) throw new Error("A ordem dos blocos deve ser única.");
    blockOrders.add(displayOrder);
    const questionNumbers = new Set();
    const questions = (Array.isArray(block.questions) ? block.questions : []).map((question, questionIndex) => {
      const normalized = validateQuestion(question, blockIndex, questionIndex);
      if (questionNumbers.has(normalized.number)) throw new Error(`A pergunta ${normalized.number} está repetida no bloco ${blockIndex + 1}.`);
      questionNumbers.add(normalized.number);
      return normalized;
    });
    if (!questions.length) throw new Error(`O bloco ${blockIndex + 1} precisa ter ao menos uma pergunta.`);
    return { title, displayOrder, weight: Number(block.weight) > 0 ? Number(block.weight) : 1, questions };
  }).sort((a, b) => a.displayOrder - b.displayOrder);
}

async function getActiveChecklist(db, unitId, areaId) {
  const result = await db.query(
    `select c.*,a.name as area_name,a.slug as area_slug
       from checklists c
       join audit_areas a on a.id=c.area_id
      where c.unit_id=$1 and c.area_id=$2 and c.is_active=true and a.active=true
      order by c.created_at desc,c.id desc limit 1`,
    [unitId, areaId]
  );
  const checklist = result.rows[0];
  if (!checklist) return null;
  const blocks = await db.query(
    "select * from checklist_blocks where checklist_id=$1 and active=true order by display_order,id",
    [checklist.id]
  );
  const questions = await db.query(
    "select * from checklist_questions where block_id=any($1::uuid[]) and active=true order by block_id,question_number,id",
    [blocks.rows.map((block) => block.id)]
  );
  return {
    ...checklist,
    blocks: blocks.rows.map((block) => ({
      ...block,
      questions: questions.rows.filter((question) => String(question.block_id) === String(block.id))
    }))
  };
}

async function publishChecklist(db, { unitId, areaId, blocks, versionLabel }) {
  const normalizedBlocks = validateBlocks(blocks);
  await db.query("select id from audit_areas where id=$1 and unit_id=$2 and active=true for update", [areaId, unitId]);
  const currentResult = await db.query(
    "select * from checklists where unit_id=$1 and area_id=$2 and is_active=true order by created_at desc,id desc limit 1 for update",
    [unitId, areaId]
  );
  const current = currentResult.rows[0];
  if (!current) throw new Error("A área não possui um checklist ativo para criar uma nova versão.");
  const label = String(versionLabel || "").trim() || `v${new Date().toISOString().replace(/[-:.TZ]/g, "").slice(0, 14)}`;
  if (label.length > 80) throw new Error("O identificador da versão é muito longo.");
  await db.query("update checklists set is_active=false,active_until=current_date,updated_at=now() where id=$1", [current.id]);
  const insertedChecklist = await db.query(
    `insert into checklists (unit_id,area_id,name,version_label,legal_base,active_from,is_active,imported_at)
     values ($1,$2,$3,$4,$5,current_date,true,now()) returning *`,
    [unitId, areaId, current.name || checklistName(current.area_name || ""), label, current.legal_base]
  );
  const checklist = insertedChecklist.rows[0];
  for (const block of normalizedBlocks) {
    const insertedBlock = await db.query(
      "insert into checklist_blocks (checklist_id,title,display_order,weight,active) values ($1,$2,$3,$4,true) returning id",
      [checklist.id, block.title, block.displayOrder, block.weight]
    );
    for (const question of block.questions) {
      await db.query(
        `insert into checklist_questions
          (block_id,question_number,requirement_text,legal_reference,risk_level,answer_options,required_evidence_on_nc,weight,active)
         values ($1,$2,$3,$4,$5,$6::jsonb,$7,$8,true)`,
        [insertedBlock.rows[0].id, question.number, question.text, question.legalReference, question.riskLevel,
          JSON.stringify(question.allowedAnswers), question.requiredEvidenceOnNc, question.weight]
      );
    }
  }
  return getActiveChecklist(db, unitId, areaId);
}

module.exports = { getActiveChecklist, publishChecklist, validateBlocks };
