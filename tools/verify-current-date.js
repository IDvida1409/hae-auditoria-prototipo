const path = require("node:path");
const { chromium } = require("playwright");

async function main() {
  const browser = await chromium.launch({
    executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
    headless: true
  });
  try {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
    const file = "file:///" + path.resolve(__dirname, "../index.html").replace(/\\/g, "/");
    await page.goto(file);
    const displayed = await page.locator(".date-line span").textContent();
    const expected = await page.evaluate(() => {
      const value = new Intl.DateTimeFormat("pt-BR", {
        weekday: "long", day: "numeric", month: "long", year: "numeric"
      }).format(new Date());
      return value.charAt(0).toUpperCase() + value.slice(1);
    });
    if (displayed !== expected) throw new Error(`Data esperada: ${expected}; exibida: ${displayed}`);
    console.log(`PASS: painel exibe a data atual: ${displayed}`);
  } finally {
    await browser.close();
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
