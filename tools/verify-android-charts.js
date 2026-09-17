const assert = require("node:assert/strict");
const path = require("node:path");
const { pathToFileURL } = require("node:url");
const { chromium } = require("playwright");

async function main() {
  const root = path.resolve(__dirname, "..");
  const browser = await chromium.launch({
    executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
    headless: true
  });
  try {
    for (const width of [360, 412]) {
      const page = await browser.newPage({ viewport: { width, height: 820 } });
      await page.goto(pathToFileURL(path.join(root, "www/index.html")).href);
      await page.locator("[data-nav=charts]").first().click();
      const initial = await page.evaluate(() => {
        const panels = [...document.querySelectorAll(".graph-bottom .mini-panel")];
        return panels.map((panel) => {
          const bounds = panel.getBoundingClientRect();
          const content = panel.querySelector(".graph-card-body").getBoundingClientRect();
          return { height: bounds.height, bottom: bounds.bottom, contentBottom: content.bottom };
        });
      });
      assert.equal(initial.length, 3);
      initial.forEach((panel) => {
        assert.equal(panel.height, 220);
        assert.ok(panel.contentBottom <= panel.bottom, JSON.stringify(panel));
      });
      const delta = page.locator(".general-delta").first();
      assert.match(await delta.textContent(), /Ganho de/);
      const deltaFits = await delta.evaluate((element) => {
        const parent = element.closest(".mini-panel").getBoundingClientRect();
        const bounds = element.getBoundingClientRect();
        return bounds.bottom <= parent.bottom && bounds.right <= parent.right;
      });
      assert.ok(deltaFits, "Variation text must fit inside the card");
      const months = await page.locator(".general-sparkline text").allTextContents();
      assert.ok(months.includes("Jan") && months.includes("Ago"));
      assert.ok(!months.includes("Set"));
      await page.locator(".graph-bottom").scrollIntoViewIfNeeded();
      await page.screenshot({ path: path.join(root, `apk-download/charts-app-${width}.png`) });
      for (const index of [1, 2]) {
        await page.locator(".graph-bottom").evaluate((element, index) => {
          element.scrollLeft = element.children[index].offsetLeft - element.children[0].offsetLeft;
        }, index);
        await page.waitForTimeout(200);
        await page.screenshot({ path: path.join(root, `apk-download/charts-app-${width}-${index}.png`) });
      }
      await page.locator(".bar-group[data-chart-area]").first().click();
      const selected = await page.evaluate(() => ({
        compare: document.querySelector(".compare-panel.area-mode").getBoundingClientRect().top,
        chart: document.querySelector(".chart-panel-large").getBoundingClientRect().top
      }));
      assert.ok(selected.compare < selected.chart, JSON.stringify(selected));
      await page.waitForTimeout(400);
      await page.screenshot({ path: path.join(root, `apk-download/charts-selected-${width}.png`) });
      await page.locator("[data-clear-chart-focus]").click();
      const restored = await page.evaluate(() => ({
        compare: document.querySelector(".compare-panel").getBoundingClientRect().top,
        chart: document.querySelector(".chart-panel-large").getBoundingClientRect().top
      }));
      assert.ok(restored.compare > restored.chart, JSON.stringify(restored));
      assert.match(await page.locator(".compare-panel").textContent(), /Top 3 melhores/);
      console.log(JSON.stringify({ width, cards: initial, selected, restored, deltaFits }));
      await page.close();
    }
  } finally {
    await browser.close();
  }
}

main().catch((error) => { console.error(error); process.exitCode = 1; });
