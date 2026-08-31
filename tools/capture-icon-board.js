const { chromium } = require("playwright");
const path = require("path");

async function main() {
  const project = path.resolve(__dirname, "..");
  const svgPath = path.join(project, "assets", "icons-operacionais-corrigidos.svg");
  const output = path.join(project, "assets", "icons-operacionais-corrigidos.png");

  const browser = await chromium.launch({
    executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
    headless: true,
  });
  const page = await browser.newPage({
    viewport: { width: 1600, height: 1200 },
    deviceScaleFactor: 1,
  });

  await page.goto(`file:///${svgPath.replace(/\\/g, "/")}`, { waitUntil: "load" });
  await page.screenshot({
    path: output,
    clip: { x: 0, y: 0, width: 1600, height: 1200 },
    timeout: 0,
  });
  console.log(output);
  await browser.close();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
