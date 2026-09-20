const assert = require("node:assert/strict");
const path = require("node:path");
const { pathToFileURL } = require("node:url");
const { chromium } = require("playwright");

async function main() {
  const browser = await chromium.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true });
  try {
    const context = await browser.newContext();
    const page = await context.newPage();
    const url = pathToFileURL(path.resolve(__dirname, "../index.html")).href;
    await page.goto(url);
    await page.evaluate(async () => {
      const area = HAE_CHECKLIST_DATA["cozinha-catering"];
      const blocks = area.blocks.map((block, blockIndex) => ({
        id: `00000000-0000-4000-8000-${String(blockIndex + 1).padStart(12, "0")}`,
        title: block.title,
        display_order: blockIndex + 1,
        questions: block.questions.map((question, questionIndex) => ({
          id: `10000000-${String(blockIndex + 1).padStart(4, "0")}-4000-8000-${String(questionIndex + 1).padStart(12, "0")}`,
          question_number: question.number
        }))
      }));
      await HAE_OFFLINE.cacheBootstrap({
        areas: [{ id: "30000000-0000-4000-8000-000000000001", slug: "cozinha-catering" }],
        checklists: [{ id: "20000000-0000-4000-8000-000000000001", area_id: "30000000-0000-4000-8000-000000000001", blocks }]
      });
      localStorage.setItem("hae-auditoria-state-v1", JSON.stringify({ view: "start" }));
    });
    await page.reload();
    await page.locator('[data-start-area="cozinha-catering"]').click();
    await page.locator('[data-answer="NC"]').first().click();
    await page.locator("[data-audit-note]").first().fill("Registro offline de teste");
    await page.locator("[data-audit-note]").first().dispatchEvent("change");
    await page.locator("[data-evidence-file]").first().setInputFiles({ name: "evidencia.jpg", mimeType: "image/jpeg", buffer: Buffer.from("foto") });
    await page.waitForFunction(async () => (await HAE_OFFLINE.listSyncableOperations()).length >= 4);
    const result = await page.evaluate(async () => {
      const operations = await HAE_OFFLINE.listSyncableOperations();
      const create = operations.find((item) => item.entityType === "audit" && item.operation === "create");
      return {
        operations: operations.map((item) => ({ entityType: item.entityType, operation: item.operation, payload: item.payload, dependsOn: item.dependsOn })),
        snapshot: await HAE_OFFLINE.getAuditSnapshot(create.payload.localAuditId),
        finalizeButton: Boolean(document.querySelector("[data-finalize-audit]"))
      };
    });
    assert.equal(result.operations[0].operation, "create");
    assert.ok(result.operations.filter((item) => item.entityType === "audit_answer").length >= 2);
    assert.equal(result.operations.at(-1).entityType, "stored_file");
    assert.ok(result.operations.at(-1).dependsOn.length > 0);
    assert.equal(result.snapshot.answers[0].answer, "NC");
    assert.equal(result.snapshot.answers[0].notes, "Registro offline de teste");
    assert.equal(result.snapshot.files.length, 1);
    assert.equal(result.finalizeButton, true);
    console.log("PASS: checklist inicia auditoria local, salva resposta/observação/foto e mantém dependências de sincronização.");
  } finally {
    await browser.close();
  }
}

main().catch((error) => { console.error(error); process.exitCode = 1; });
