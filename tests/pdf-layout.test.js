const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const assert = require("node:assert/strict");
const { chromium } = require("playwright");

const stylesheet = fs.readFileSync(path.join(__dirname, "..", "styles.css"), "utf8");

test("PDF report layout is invariant across browser widths", async () => {
  const browser = await chromium.launch({ headless: true });
  try {
    const snapshots = [];
    for (const width of [390, 1440]) {
      const page = await browser.newPage({ viewport: { width, height: 900 } });
      await page.setContent(`
        <style>${stylesheet}</style>
        <div class="report-pdf-render-root is-portrait">
          <div class="technical-report">
            <article class="report-doc-page report-monthly-page">
              <header class="report-doc-header">
                <div>Marca</div>
                <div class="report-doc-heading">Relatório</div>
              </header>
              <main class="report-doc-body">
                <p class="report-doc-lead">Texto do relatório mensal aprovado.</p>
                <div class="report-mini-kpis"></div>
              </main>
              <footer class="report-doc-footer"><span>Fonte</span><span>Página</span></footer>
            </article>
          </div>
        </div>
      `);
      snapshots.push(await page.evaluate(() => {
        const reportPage = getComputedStyle(document.querySelector(".report-doc-page"));
        const header = getComputedStyle(document.querySelector(".report-doc-header"));
        const footer = getComputedStyle(document.querySelector(".report-doc-footer"));
        const lead = getComputedStyle(document.querySelector(".report-doc-lead"));
        return {
          width: reportPage.width,
          minWidth: reportPage.minWidth,
          padding: reportPage.padding,
          headerColumns: header.gridTemplateColumns,
          footerDirection: footer.flexDirection,
          fontSize: lead.fontSize,
          lineHeight: lead.lineHeight
        };
      }));
      await page.close();
    }
    assert.deepEqual(snapshots[0], snapshots[1]);
    assert.equal(snapshots[0].width, "794px");
    assert.equal(snapshots[0].minWidth, "794px");
    assert.equal(snapshots[0].footerDirection, "row");
  } finally {
    await browser.close();
  }
});
