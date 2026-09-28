const fs = require("node:fs/promises");
const path = require("node:path");
const { chromium } = require("playwright");
console.log("Starting approved PDF generation");

const root = path.resolve(__dirname, "..");
const outputDir = path.join(root, "assets", "reports");
const executablePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const reports = [
  {
    url: "http://localhost:3000/?preview=admin&previewDocument=1&reportFile=organization-monthly&parent=conforto-medico&reportWorker=1",
    file: "hae-consolidado-area-conforto-medico-set-26.pdf"
  },
  {
    url: "http://localhost:3000/?preview=admin&previewDocument=1&reportFile=monthly&area=cozinha-catering&reportWorker=1",
    file: "hae-consolidado-mes-cozinha-catering-set-26.pdf"
  },
  {
    url: "http://localhost:3000/?preview=admin&previewDocument=1&reportFile=comparison&area=cozinha-catering&reportWorker=1",
    file: "hae-comparativo-analitico-cozinha-catering-set-26.pdf"
  }
];

function fromBase64(value) {
  return Buffer.from(value, "base64");
}

async function renderReport(page, report) {
  await page.goto(report.url, { waitUntil: "networkidle", timeout: 90000 });
  await page.waitForFunction(() => window.__IDAUDITOR_REPORT_READY__ === true, null, { timeout: 90000 });
  await page.waitForFunction(() => Array.from(document.images).every((image) => image.complete), null, { timeout: 30000 });
  const encoded = await page.evaluate(async () => {
    if (typeof window.openReportPdf !== "function") throw new Error("Gerador aprovado de PDF indisponível");
    const blob = await window.openReportPdf(null, { mode: "archive" });
    const bytes = new Uint8Array(await blob.arrayBuffer());
    let binary = "";
    for (let offset = 0; offset < bytes.length; offset += 0x8000) {
      binary += String.fromCharCode(...bytes.subarray(offset, offset + 0x8000));
    }
    return btoa(binary);
  });
  await fs.writeFile(path.join(outputDir, report.file), fromBase64(encoded));
  console.log(`${report.file}: ${fromBase64(encoded).length} bytes`);
}

(async () => {
  await fs.mkdir(outputDir, { recursive: true });
  console.log(`Output: ${outputDir}`);
  const browser = await chromium.launch({ headless: true, executablePath });
  try {
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    for (const report of reports) await renderReport(page, report);
  } finally {
    await browser.close();
  }
})().catch((error) => {
  console.error(error.stack || error);
  process.exitCode = 1;
});
