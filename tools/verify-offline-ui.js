const path = require("node:path");
const { chromium } = require("playwright");
const assert = require("node:assert/strict");

async function main() {
  const browser = await chromium.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true });
  try {
    for (const viewport of [{ width: 1440, height: 900 }, { width: 390, height: 844 }]) {
      const page = await browser.newPage({ viewport });
      const file = "file:///" + path.resolve(__dirname, "../index.html").replace(/\\/g, "/");
      await page.goto(file);
      const emit = (detail) => page.evaluate((value) => window.dispatchEvent(new CustomEvent("offline:sync-status", { detail: value })), detail);
      await emit({ phase: "offline", pending: 2 });
      await page.getByText("Sem conexão", { exact: true }).waitFor();
      assert.match(await page.locator(".offline-status").innerText(), /2 itens pendentes/);
      await emit({ phase: "syncing", pending: 2, sent: 0 });
      await page.getByText("Sincronizando dados", { exact: true }).waitFor();
      await emit({ phase: "error", pending: 2, message: "network" });
      await page.getByText("Não foi possível sincronizar", { exact: true }).waitFor();
      await emit({ phase: "synced", pending: 0, sent: 2 });
      await page.getByText("Dados sincronizados", { exact: true }).waitFor();
      const box = await page.locator(".offline-status").boundingBox();
      assert.ok(box.x >= 0 && box.y >= 0 && box.x + box.width <= viewport.width && box.y + box.height <= viewport.height);
      await page.close();
    }
    console.log("PASS: automatic offline, syncing, error and synchronized notices fit desktop and mobile.");
  } finally {
    await browser.close();
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
