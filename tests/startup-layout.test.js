const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const assert = require("node:assert/strict");
const { chromium } = require("playwright");

const stylesheet = fs.readFileSync(path.join(__dirname, "..", "styles.css"), "utf8");
const installedChrome = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

test("post-login startup remains centered on mobile and desktop web", async () => {
  const browser = await chromium.launch({
    headless: true,
    ...(fs.existsSync(installedChrome) ? { executablePath: installedChrome } : {})
  });
  try {
    for (const width of [390, 430, 1440]) {
      const page = await browser.newPage({ viewport: { width, height: 900 } });
      await page.setContent(`
        <style>${stylesheet}</style>
        <body class="show-app-startup">
          <div class="app-startup">
            <img alt="IDAuditor" />
            <div class="app-startup-copy"><strong>Preparando o IDAuditor</strong><span>Carregando dados seguros...</span></div>
            <div class="app-startup-track"><i></i></div>
            <b>50%</b>
          </div>
        </body>
      `);
      const geometry = await page.evaluate(() => {
        const startup = document.querySelector(".app-startup").getBoundingClientRect();
        const logo = document.querySelector(".app-startup img").getBoundingClientRect();
        const copy = document.querySelector(".app-startup-copy").getBoundingClientRect();
        return {
          startupCenter: startup.left + startup.width / 2,
          logoCenter: logo.left + logo.width / 2,
          copyCenter: copy.left + copy.width / 2,
          viewportCenter: innerWidth / 2
        };
      });
      assert.ok(Math.abs(geometry.logoCenter - geometry.viewportCenter) < 1, `${width}px logo is not centered`);
      assert.ok(Math.abs(geometry.copyCenter - geometry.viewportCenter) < 1, `${width}px copy is not centered`);
      assert.ok(Math.abs(geometry.startupCenter - geometry.viewportCenter) < 1, `${width}px overlay is not centered`);
      await page.close();
    }
  } finally {
    await browser.close();
  }
});
