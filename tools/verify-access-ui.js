const { chromium } = require("playwright");
const assert = require("node:assert/strict");
const fs = require("node:fs/promises");
const path = require("node:path");

async function main() {
  const output = path.join(__dirname, "..", ".backend-tests", "access-ui");
  await fs.mkdir(output, { recursive: true });
  const browser = await chromium.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true });
  try {
    for (const viewport of [{ width: 1440, height: 900 }, { width: 390, height: 844 }]) {
      const page = await browser.newPage({ viewport });
      const errors = [];
      page.on("pageerror", (error) => errors.push(error.message));
      await page.route("**/api/state", (route) => route.fulfill({ json: { state: null, updatedAt: null } }));
      await page.route("**/api/access/me", (route) => route.fulfill({ json: { user: { id: "admin-1", full_name: "Administrador de teste", username: "teste.01", role: "admin", active: true, must_change_password: false } } }));
      await page.route("**/api/access/users", (route) => route.fulfill({ json: {
        users: [
          { id: "admin-1", full_name: "Administrador de teste", username: "teste.01", email: "teste.01@idauditor.local", role: "admin", active: true, must_change_password: false, reset_pending: false },
          { id: "user-2", full_name: "David Souza", username: "david.souza", email: "david@hospital.local", role: "area_responsible", active: true, must_change_password: true, reset_pending: true, area_name: "Cozinha Catering" }
        ],
        areas: [{ id: "area-1", name: "Cozinha Catering", slug: "cozinha-catering" }]
      } }));
      await page.route("**/api/access/notifications", (route) => route.fulfill({ json: { notifications: [
        { id: "11111111-1111-1111-1111-111111111111", title: "Redefinição de senha", body: "David Souza solicitou uma nova senha.", notification_type: "password_reset", entity_type: "user", entity_id: "user-2", read_at: null, created_at: new Date().toISOString() },
        { id: "22222222-2222-2222-2222-222222222222", title: "Plano de ação enviado", body: "Cozinha Catering enviou uma devolutiva.", notification_type: "action_plan_submitted", entity_type: "action_plan", entity_id: null, read_at: null, created_at: new Date().toISOString() }
      ] } }));
      await page.goto("http://localhost:3012/#users");
      await page.getByRole("heading", { name: "Acessos do sistema" }).waitFor();
      await page.getByRole("button", { name: "Notificações" }).click();
      await page.getByRole("region", { name: "Notificações" }).waitFor();
      assert.equal(await page.locator(".notification-item").count(), 2);
      await page.screenshot({ path: path.join(output, `notifications-${viewport.width}.png`), fullPage: true });
      await page.getByRole("button", { name: "Notificações" }).click();
      await page.getByRole("button", { name: "Logins", exact: true }).click();
      await page.getByRole("button", { name: "Expandir lista" }).click();
      assert.equal(await page.getByText("Reset solicitado", { exact: true }).count(), 1);
      await page.screenshot({ path: path.join(output, `users-${viewport.width}.png`), fullPage: true });
      await page.getByRole("button", { name: "Cadastro", exact: true }).click();
      assert.equal(await page.locator('[name="password"]').count(), 0);
      assert.equal(await page.locator('[name="username"]').count(), 1);
      assert.equal(await page.locator('[name="areaId"] option').count(), 2);
      await page.screenshot({ path: path.join(output, `new-user-${viewport.width}.png`), fullPage: true });
      assert.deepEqual(errors, []);
      await page.close();
    }
    console.log("PASS: authenticated administrator shell, real user states and password-free registration form on desktop and mobile.");
  } finally {
    await browser.close();
  }
}

main().catch((error) => { console.error(error); process.exitCode = 1; });
