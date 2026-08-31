const { chromium } = require("playwright");

async function main() {
  const browser = await chromium.launch({
    executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
    headless: true,
  });
  const page = await browser.newPage({
    viewport: { width: 1600, height: 900 },
    deviceScaleFactor: 1,
  });

  await page.goto("http://127.0.0.1:4173", { waitUntil: "networkidle" });
  await page.screenshot({ path: "hae-auditoria-prototipo/preview-home.png", fullPage: true });
  await page.click("[data-toggle-sidebar]");
  await page.screenshot({ path: "hae-auditoria-prototipo/preview-sidebar-collapsed.png", fullPage: true });
  await page.click("[data-toggle-sidebar]");
  await page.click("[data-clear-selection]");
  await page.screenshot({ path: "hae-auditoria-prototipo/preview-home-closed.png", fullPage: true });
  await page.click('[data-area="area-residuos"]');

  await page.click('[data-area-detail="area-residuos"]');
  await page.screenshot({ path: "hae-auditoria-prototipo/preview-area.png", fullPage: true });

  await page.click("[data-nav=charts]");
  await page.screenshot({ path: "hae-auditoria-prototipo/preview-charts.png", fullPage: true });
  await page.click('[data-month="ago/26"]');
  await page.screenshot({ path: "hae-auditoria-prototipo/preview-charts-current.png", fullPage: true });
  await page.click('[data-month="jul/26"]');
  await page.click('[data-chart-area="cozinha-catering"]');
  await page.screenshot({ path: "hae-auditoria-prototipo/preview-charts-catering.png", fullPage: true });
  await page.click("[data-clear-chart-focus]");
  await page.click("[data-toggle-chart-size]");
  await page.screenshot({ path: "hae-auditoria-prototipo/preview-charts-expanded.png", fullPage: true });

  await page.click("[data-nav=reports]");
  await page.screenshot({ path: "hae-auditoria-prototipo/preview-reports.png", fullPage: true });

  await page.click("[data-nav=start]");
  await page.click('[data-start-area="cozinha-catering"]');
  await page.screenshot({ path: "hae-auditoria-prototipo/preview-checklist.png", fullPage: true });

  const metrics = await page.evaluate(() => ({
    tiny: [...document.querySelectorAll(".tiny-icon")]
      .slice(0, 5)
      .map((element) => ({
        w: Math.round(element.getBoundingClientRect().width),
        h: Math.round(element.getBoundingClientRect().height),
      })),
    cards: document.querySelectorAll(".question-card").length,
    ncPanels: [...document.querySelectorAll(".question-card")].map((element) =>
      element.classList.contains("has-nc")
    ),
  }));

  console.log(JSON.stringify(metrics));
  await browser.close();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
