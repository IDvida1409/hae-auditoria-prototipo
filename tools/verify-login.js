const { chromium } = require("playwright");
const assert = require("node:assert/strict");
const fs = require("node:fs/promises");
const path = require("node:path");
async function main() {
  const output = path.join(__dirname, "..", ".backend-tests", "login");
  await fs.mkdir(output, { recursive: true });
  const browser = await chromium.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true });
  try {
    for (const viewport of [{ width: 1440, height: 900 }, { width: 390, height: 844 }, { width: 320, height: 700 }, { width: 768, height: 500 }]) {
      const page = await browser.newPage({ viewport });
      const errors = [];
      let submitted;
      page.on("pageerror", error => errors.push(error.message));
      await page.route("**/api/access/me", route => route.fulfill({ status: 401, json: { error: "unauthenticated" } }));
      await page.route("**/api/access/branding", route => route.fulfill({ json: { branding: { name: "Einstein", logoPath: "/assets/hospital-einstein-logo.png" } } }));
      await page.route("**/api/access/login", route => {
        submitted = route.request().postDataJSON();
        return route.fulfill({ json: { user: { must_change_password: true }, branding: { name: "Einstein", logoPath: "/assets/hospital-einstein-logo.png" } } });
      });
      await page.goto("http://localhost:3012/login.html");
      await page.locator(".lucide").first().waitFor();
      const layout = await page.evaluate(() => {
        const modal = document.querySelector(".access-modal").getBoundingClientRect();
        const content = document.querySelector(".access-content").getBoundingClientRect();
        return { overflow: document.documentElement.scrollWidth > innerWidth, contained: content.top >= modal.top && content.bottom <= modal.bottom,
          proportional: modal.width > modal.height, width: modal.width,
          loaded: [...document.images].every(img => img.complete && img.naturalWidth > 0) };
      });
      assert.equal(layout.overflow, false);
      assert.equal(layout.contained, true);
      assert.ok(layout.width <= 1376);
      assert.equal(await page.locator(".access-footer").count(), 0);
      assert.equal(layout.loaded, true);
      assert.equal(await page.locator("#user-form,#mode-button").count(), 0);
      await page.screenshot({ path: path.join(output, "login-" + viewport.width + ".png"), fullPage: true });
      await page.getByRole("button", { name: "Mostrar senha", exact: true }).click();
      assert.equal(await page.locator('[name="password"]').first().getAttribute("type"), "text");
      await page.locator('[name="username"]').fill("david.souza");
      await page.waitForTimeout(350);
      assert.equal(await page.locator(".product-logo").getAttribute("alt"), "Einstein");
      assert.ok((await page.locator(".product-logo").evaluate((element) => element.getBoundingClientRect().width)) >= 350);
      await page.screenshot({ path: path.join(output, "login-hospital-" + viewport.width + ".png"), fullPage: true });
      await page.locator('#login-form [name="password"]').fill("Synthetic test only");
      await page.getByRole("button", { name: "Login", exact: true }).click();
      await page.locator("#change-form").waitFor({ state: "visible" });
      assert.equal(submitted.username, "david.souza");
      assert.equal(submitted.email, undefined);
      assert.deepEqual(errors, []);
      await page.close();
    }
    const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
    await page.route("**/api/access/me", route => route.fulfill({ status: 401, json: { error: "unauthenticated" } }));
    await page.route("**/api/access/branding", route => route.fulfill({ json: { branding: null } }));
    await page.route("**/api/access/login", route => route.fulfill({ json: { user: { id: "test", must_change_password: false }, branding: null } }));
    await page.route("http://localhost:3012/", route => route.fulfill({ contentType: "text/html", body: "<title>Painel</title>" }));
    await page.goto("http://localhost:3012/login.html");
    await page.evaluate(() => addEventListener("beforeunload", () => {
      const form = document.getElementById("login-form");
      sessionStorage.setItem("login-transition-test", JSON.stringify({
        username: form.elements.username.value,
        password: form.elements.password.value,
        buttonText: form.querySelector('.primary-button span').textContent,
        disabled: form.querySelector('.primary-button').disabled
      }));
    }));
    await page.locator('[name="username"]').fill("teste.01");
    await page.locator('#login-form [name="password"]').fill("12345678");
    await page.locator("#login-form").evaluate(form => form.requestSubmit());
    await page.waitForURL("http://localhost:3012/");
    const transition = JSON.parse(await page.evaluate(() => sessionStorage.getItem("login-transition-test")));
    assert.deepEqual(transition, { username: "teste.01", password: "12345678", buttonText: "Entrando...", disabled: true });
    await page.close();
    console.log("PASS: responsive reference layout, discreet logo, no registration and username submission on four viewports (mock API).");
  } finally { await browser.close(); }
}
main().catch(error => { console.error(error); process.exitCode = 1; });
