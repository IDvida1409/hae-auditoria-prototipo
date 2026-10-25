const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const source = fs.readFileSync(path.join(__dirname, "..", "app.js"), "utf8");
const checklistImporter = fs.readFileSync(path.join(__dirname, "..", "lib", "checklist-import.js"), "utf8");
const resetMigration = fs.readFileSync(path.join(__dirname, "..", "migrations", "019_reset_operational_data_for_field_test.sql"), "utf8");
const masterMigration = fs.readFileSync(path.join(__dirname, "..", "migrations", "023_master_user_visibility.sql"), "utf8");

test("auditorias de subáreas são iniciadas individualmente", () => {
  assert.doesNotMatch(source, /data-start-audit-group/);
  assert.doesNotMatch(source, /data-continue-audit-queue/);
  assert.match(source, /Escolha uma subárea para realizar o checklist de forma independente/);
});

test("a decisão de enviar ou revisar pertence ao fim do checklist completo", () => {
  assert.match(source, /Checklist da subárea concluído/);
  assert.match(source, /data-send-complete-audit/);
  assert.match(source, /data-review-complete-audit/);
  assert.match(source, /reviewPending: true/);
});

test("perguntas sem resposta são listadas antes da finalização", () => {
  assert.match(source, /Há perguntas sem resposta/);
  assert.match(source, /data-go-unanswered-question/);
  assert.match(source, /state\.auditPendingQuestions = unansweredQuestions\.map/);
  assert.doesNotMatch(source, /data-finalize-audit disabled/);
});

test("sem risco é uma resposta positiva no checklist", () => {
  const checklistData = fs.readFileSync(path.join(__dirname, "..", "checklist-data.js"), "utf8");
  const syncSource = fs.readFileSync(path.join(__dirname, "..", "lib", "sync-service.js"), "utf8");
  const scoreSource = fs.readFileSync(path.join(__dirname, "..", "lib", "scoring.js"), "utf8");
  assert.match(checklistData, /"text": "Ausência de risco à saúde do consumidor"/);
  assert.match(checklistData, /"SR"/);
  assert.match(syncSource, /"SR"/);
  assert.match(scoreSource, /row\.answer === "SR"/);
});

test("a limpeza completa preserva as estruturas de configuração", () => {
  const fullReset = fs.readFileSync(path.join(__dirname, "..", "migrations", "031_clear_all_audit_test_data.sql"), "utf8");
  assert.match(fullReset, /reports/);
  assert.match(fullReset, /action_plans/);
  assert.match(fullReset, /stored_files/);
  assert.match(fullReset, /audit_cycles/);
  assert.doesNotMatch(fullReset, /truncate table[\s\S]*app_users/i);
  assert.doesNotMatch(fullReset, /truncate table[\s\S]*audit_areas/i);
  assert.doesNotMatch(fullReset, /truncate table[\s\S]*checklist_questions/i);
});

test("planos só são perguntados quando existem não conformidades", () => {
  assert.match(source, /hasNonConformities/);
  assert.match(source, /if \(hasNonConformities\)/);
  assert.match(source, /await finalizeAudit\(areaId, "automatic"\)/);
});

test("reutilização de plano não reaproveita prazo antigo", () => {
  assert.match(source, /correction: plan\.correction \|\| ""/);
  assert.match(source, /action: plan\.action \|\| ""/);
  assert.doesNotMatch(source, /deadline: plan\.dueAt/);
});

test("nova foto substitui a evidência oficial somente após sincronizar", () => {
  const offlineSource = fs.readFileSync(path.join(__dirname, "..", "offline-store.js"), "utf8");
  const syncSource = fs.readFileSync(path.join(__dirname, "..", "lib", "sync-service.js"), "utf8");
  assert.match(source, /replaceExistingEvidence: true/);
  assert.match(offlineSource, /replaceExistingEvidence: Boolean\(metadata\.replaceExistingEvidence\)/);
  assert.match(syncSource, /delete from file_links where entity_type='audit_answer' and entity_id=\$1 and file_id<>\$2/);
});

test("a limpeza de campo apaga somente dados operacionais", () => {
  assert.match(resetMigration, /audit_cycles/);
  assert.match(resetMigration, /stored_files/);
  assert.match(resetMigration, /report_generation_jobs/);
  assert.match(resetMigration, /operational_reset_at/);
  assert.doesNotMatch(resetMigration, /truncate table[\s\S]*app_users/i);
  assert.doesNotMatch(resetMigration, /truncate table[\s\S]*audit_areas/i);
  assert.doesNotMatch(resetMigration, /truncate table[\s\S]*checklists/i);
});

test("usuário master é persistido sem alterar a limpeza operacional", () => {
  assert.match(masterMigration, /add column if not exists is_master boolean/i);
  assert.match(masterMigration, /is_master=true/i);
  assert.doesNotMatch(masterMigration, /truncate table[\s\S]*app_users/i);

  const fieldReset = fs.readFileSync(path.join(__dirname, "..", "migrations", "024_reset_field_test_operational_data.sql"), "utf8");
  assert.match(fieldReset, /action_plan_documents/);
  assert.match(fieldReset, /audit_cycles/);
  assert.doesNotMatch(fieldReset, /truncate table[\s\S]*reports/i);
  assert.doesNotMatch(fieldReset, /truncate table[\s\S]*stored_files/i);
});

test("todas as áreas recebem uma cópia independente do checklist de referência", () => {
  assert.match(checklistImporter, /cloneChecklistToMissingAreas/);
  assert.match(checklistImporter, /not exists \([\s\S]*from checklists c[\s\S]*c\.area_id=a\.id/);
  assert.match(checklistImporter, /shared-reference-\$\{source\.area_id\}/);
});
