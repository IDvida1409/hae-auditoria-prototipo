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
    await context.setOffline(true);
    await page.evaluate(async () => {
      const offline = window.HAE_OFFLINE;
      await offline.cacheBootstrap({ checklists: [{ id: "checklist-test" }] });
      await offline.queueAuditStart({ localAuditId: "audit-test", areaSlug: "area-test" });
      await offline.queueAuditAnswer({ localAuditId: "audit-test", questionId: "question-test", answer: "NC", notes: "Collected offline" });
      await offline.queueFileUpload(new File(["photo content"], "photo.jpg", { type: "image/jpeg" }), {
        localFileId: "photo-test", localAuditId: "audit-test", entityType: "audit_answer", questionId: "question-test"
      });
    });
    const first = await page.evaluate(async () => ({
      operations: await HAE_OFFLINE.listSyncableOperations(),
      snapshot: await HAE_OFFLINE.getAuditSnapshot("audit-test"),
      sync: await HAE_OFFLINE.syncPending()
    }));
    assert.equal(first.operations.length, 3);
    assert.equal(first.snapshot.answers[0].answer, "NC");
    assert.equal(first.snapshot.files.length, 1);
    assert.equal(first.sync.offline, true);
    assert.deepEqual(first.operations.map((item) => item.clientSequence), [1, 2, 3]);
    assert.ok(first.operations[2].dependsOn.includes(first.operations[1].clientOperationId));
    await page.reload();
    assert.equal(await page.evaluate(async () => (await HAE_OFFLINE.getAuditSnapshot("audit-test")).answers[0].notes), "Collected offline");
    assert.equal(await page.evaluate(async () => (await HAE_OFFLINE.getFile("photo-test")).file.text()), "photo content");

    let failRequest = true;
    const serverOperations = new Map();
    let uploads = 0;
    await page.route("https://offline-backend.test/**", async (route) => {
      if (route.request().url().endsWith("/api/offline-files")) {
        uploads++;
        assert.equal(route.request().postDataBuffer().toString(), "photo content");
        return route.fulfill({ json: { file: { id: "file-server" } } });
      }
      if (failRequest) {
        failRequest = false;
        return route.abort("failed");
      }
      const body = route.request().postDataJSON();
      const operations = body.operations.map((operation) => {
        if (!serverOperations.has(operation.clientOperationId)) serverOperations.set(operation.clientOperationId, operation);
        return {
          client_operation_id: operation.clientOperationId, status: "synced",
          result_entity_id: operation.entityType + "-server",
          result_payload: { entityType: operation.entityType, entityId: operation.entityType + "-server" }
        };
      });
      return route.fulfill({ json: { operations, complete: true } });
    });
    await page.evaluate(async () => {
      window.statusEvents = [];
      window.addEventListener("offline:sync-status", (event) => statusEvents.push(event.detail.phase));
      await HAE_OFFLINE.configure({ backendUrl: "https://offline-backend.test" });
    });
    await context.setOffline(false);
    await page.evaluate(() => HAE_OFFLINE.syncPending().catch(() => {}));
    assert.equal(await page.evaluate(async () => (await HAE_OFFLINE.listSyncableOperations()).length), 3);
    assert.equal(await page.evaluate(async () => (await HAE_OFFLINE.getFile("photo-test")).file.text()), "photo content");
    const synced = await page.evaluate(() => HAE_OFFLINE.syncPending());
    assert.equal(synced.pending, 0);
    assert.equal(serverOperations.size, 3);
    assert.equal(uploads, 1, "Upload confirmation survives response failure; binary is not resent");
    const events = await page.evaluate(() => statusEvents);
    assert.ok(events.includes("syncing") && events.includes("synced"));
    await page.reload();
    assert.equal(await page.evaluate(async () => (await HAE_OFFLINE.listSyncableOperations()).length), 0);
    assert.equal(await page.evaluate(async () => (await HAE_OFFLINE.getFile("photo-test")).status), "synced");
    console.log("PASS: offline save, photo persistence, restart recovery, failed response retry, dependency ordering and confirmed synchronization (real IndexedDB, simulated API).");
    await context.close();
  } finally { await browser.close(); }
}

main().catch((error) => { console.error(error); process.exitCode = 1; });
