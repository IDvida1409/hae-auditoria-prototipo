const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const assert = require("node:assert/strict");
const { chromium } = require("playwright");

const stylesheet = fs.readFileSync(path.join(__dirname, "..", "styles.css"), "utf8");
const loginStylesheet = fs.readFileSync(path.join(__dirname, "..", "login.css"), "utf8");
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
          viewportCenter: innerWidth / 2,
          background: getComputedStyle(document.querySelector(".app-startup")).backgroundColor
        };
      });
      assert.ok(Math.abs(geometry.logoCenter - geometry.viewportCenter) < 1, `${width}px logo is not centered`);
      assert.ok(Math.abs(geometry.copyCenter - geometry.viewportCenter) < 1, `${width}px copy is not centered`);
      assert.ok(Math.abs(geometry.startupCenter - geometry.viewportCenter) < 1, `${width}px overlay is not centered`);
      assert.equal(geometry.background, "rgb(255, 255, 255)");
      await page.close();
    }
  } finally {
    await browser.close();
  }
});

test("login transition uses the same centered white presentation", async () => {
  const browser = await chromium.launch({
    headless: true,
    ...(fs.existsSync(installedChrome) ? { executablePath: installedChrome } : {})
  });
  try {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
    await page.setContent(`
      <style>${loginStylesheet}</style>
      <div class="login-transition is-active">
        <img alt="IDAuditor" />
        <div><strong>Preparando o IDAuditor</strong><span>Validando o acesso...</span></div>
        <div class="login-transition-track"><i></i></div>
        <b>50%</b>
      </div>
    `);
    const geometry = await page.evaluate(() => {
      const transition = document.querySelector(".login-transition");
      const logo = transition.querySelector("img").getBoundingClientRect();
      return {
        logoCenter: logo.left + logo.width / 2,
        viewportCenter: innerWidth / 2,
        background: getComputedStyle(transition).backgroundColor
      };
    });
    assert.ok(Math.abs(geometry.logoCenter - geometry.viewportCenter) < 1);
    assert.equal(geometry.background, "rgb(255, 255, 255)");
  } finally {
    await browser.close();
  }
});

test("mobile area score stays inside its dashboard card", async () => {
  const browser = await chromium.launch({
    headless: true,
    ...(fs.existsSync(installedChrome) ? { executablePath: installedChrome } : {})
  });
  try {
    for (const width of [360, 390, 430]) {
      const page = await browser.newPage({ viewport: { width, height: 844 } });
      await page.setContent(`
        <style>${stylesheet}</style>
        <main class="fichario-home">
          <div class="area-grid">
            <article class="area-tile">
              <div class="area-icon-wrap"><span class="area-icon"></span></div>
              <span class="area-name">Cozinha Pedido Especial</span>
              <strong class="area-score">10,0</strong>
            </article>
          </div>
        </main>
      `);
      const geometry = await page.evaluate(() => {
        const tile = document.querySelector(".area-tile").getBoundingClientRect();
        const score = document.querySelector(".area-score").getBoundingClientRect();
        return { tileBottom: tile.bottom, scoreBottom: score.bottom };
      });
      assert.ok(geometry.scoreBottom <= geometry.tileBottom - 7, `${width}px score has no bottom breathing room`);
      await page.close();
    }
  } finally {
    await browser.close();
  }
});
