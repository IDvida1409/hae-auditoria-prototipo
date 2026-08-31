const path = require("path");
const { chromium } = require("playwright");

const root = path.resolve(__dirname, "..");
const url = `file:///${path.join(root, "index.html").replace(/\\/g, "/")}`;

async function measure(page, label, screenshotName) {
  await page.screenshot({
    path: path.join(root, screenshotName),
    fullPage: false,
  });

  const data = await page.evaluate((label) => {
    const rect = (selector) => {
      const el = document.querySelector(selector);
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return {
        x: Math.round(r.x),
        y: Math.round(r.y),
        w: Math.round(r.width),
        h: Math.round(r.height),
        right: Math.round(r.right),
        bottom: Math.round(r.bottom),
      };
    };

    const viewport = {
      w: window.innerWidth,
      h: window.innerHeight,
      docW: document.documentElement.scrollWidth,
      docH: document.documentElement.scrollHeight,
    };

    const overflow = [...document.querySelectorAll("body *")]
      .map((el) => {
        const r = el.getBoundingClientRect();
        return {
          className: el.className && String(el.className).slice(0, 80),
          tag: el.tagName,
          right: Math.round(r.right),
          bottom: Math.round(r.bottom),
          width: Math.round(r.width),
          height: Math.round(r.height),
        };
      })
      .filter((item) => item.right > viewport.w + 2 || item.width > viewport.w + 2)
      .slice(0, 12);

    return {
      label,
      viewport,
      shell: rect(".app-shell"),
      main: rect(".main"),
      topbar: rect(".topbar"),
      content: rect(".content"),
      graphLayout: rect(".graph-layout"),
      dashboardGrid: rect(".dashboard-grid"),
      areaGrid: rect(".area-grid"),
      selectedPanel: rect(".selected-panel"),
      comparePanel: rect(".compare-panel"),
      chartPanel: rect(".chart-panel-large"),
      barChart: rect(".bar-chart"),
      graphBottom: rect(".graph-bottom"),
      detailKpis: rect(".detail-kpis"),
      detailModal: rect(".detail-modal"),
      overflow,
      contentScroll: {
        w: document.querySelector(".content")?.scrollWidth,
        h: document.querySelector(".content")?.scrollHeight,
        clientW: document.querySelector(".content")?.clientWidth,
        clientH: document.querySelector(".content")?.clientHeight,
      },
    };
  }, label);

  console.log(JSON.stringify(data, null, 2));
}

async function click(page, selector) {
  await page.locator(selector).first().click();
  await page.waitForTimeout(120);
}

async function main() {
  const browser = await chromium.launch({
    executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
    headless: true,
  });
  const page = await browser.newPage({
    viewport: {
      width: Number(process.env.LAYOUT_W || 1912),
      height: Number(process.env.LAYOUT_H || 879),
    },
    deviceScaleFactor: 1,
  });

  await page.goto(`${url}?layout-check=${Date.now()}`, { waitUntil: "load" });
  await page.waitForTimeout(250);

  await measure(page, "home-expanded", "layout-check-home-expanded.png");

  await click(page, "[data-nav=charts]");
  await measure(page, "charts-expanded-sidebar", "layout-check-charts-expanded-sidebar.png");
  await click(page, "[data-month='jul/26']");
  await measure(page, "charts-july-expanded-sidebar", "layout-check-charts-july-expanded-sidebar.png");
  await click(page, "[data-chart-area='cozinha-sarp']");
  await measure(page, "charts-area-summary-expanded-sidebar", "layout-check-charts-area-summary-expanded-sidebar.png");
  await click(page, "[data-clear-chart-focus]");

  await click(page, "[data-toggle-sidebar]");
  await measure(page, "charts-collapsed-sidebar", "layout-check-charts-collapsed-sidebar.png");

  await click(page, "[data-nav=start]");
  await measure(page, "start-collapsed-sidebar", "layout-check-start-collapsed-sidebar.png");

  await click(page, "[data-toggle-sidebar]");
  await measure(page, "start-expanded-sidebar", "layout-check-start-expanded-sidebar.png");

  await click(page, "[data-start-area='cozinha-catering']");
  await measure(page, "checklist-catering-expanded-sidebar", "layout-check-checklist-catering-expanded-sidebar.png");
  await click(page, "[data-answer='NC']");
  await measure(page, "checklist-catering-nc-expanded-sidebar", "layout-check-checklist-catering-nc-expanded-sidebar.png");

  await click(page, "[data-nav=home]");
  await click(page, "[data-area='area-residuos']");
  await click(page, "[data-area-detail='area-residuos']");
  await measure(page, "detail-expanded-sidebar", "layout-check-detail-expanded-sidebar.png");
  await click(page, "[data-detail-block]");
  await measure(page, "detail-block-modal-expanded-sidebar", "layout-check-detail-block-modal-expanded-sidebar.png");

  await browser.close();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
