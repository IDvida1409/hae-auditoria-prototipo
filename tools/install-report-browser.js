const { spawnSync } = require("node:child_process");
const path = require("node:path");

if (process.env.RENDER !== "true" && process.env.INSTALL_REPORT_BROWSER !== "true") process.exit(0);

const root = path.resolve(__dirname, "..");
const browserPath = path.join(root, ".playwright-browsers");
const playwrightCli = path.join(path.dirname(require.resolve("playwright/package.json")), "cli.js");
const result = spawnSync(process.execPath, [playwrightCli, "install", "--with-deps", "chromium"], {
  cwd: root,
  env: { ...process.env, PLAYWRIGHT_BROWSERS_PATH: browserPath },
  stdio: "inherit"
});

if (result.error) throw result.error;
if (result.status !== 0) process.exit(result.status || 1);
