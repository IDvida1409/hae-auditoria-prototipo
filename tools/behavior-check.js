const path = require("path");
const { chromium } = require("playwright");

const root = path.resolve(__dirname, "..");
const url = `file:///${path.join(root, "index.html").replace(/\\/g, "/")}`;

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function main() {
  const browser = await chromium.launch({
    executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
    headless: true,
  });
  const page = await browser.newPage({
    viewport: { width: 1912, height: 879 },
    deviceScaleFactor: 1,
  });

  await page.goto(`${url}?behavior-check=${Date.now()}`, { waitUntil: "load" });
  await page.waitForTimeout(200);

  const totalQuestions = await page.evaluate(() =>
    Object.values(window.HAE_CHECKLIST_DATA || {}).reduce((sum, area) => sum + area.totalQuestions, 0)
  );
  assert(totalQuestions === 437, `Expected 437 checklist questions, got ${totalQuestions}`);

  await page.locator("[data-nav=start]").click();
  await page.locator("[data-start-area='cozinha-catering']").click();
  await page.waitForTimeout(150);

  const questionCount = await page.locator(".question-card").count();
  assert(questionCount === 3, `Expected 3 visible Cozinha Catering questions on the guided audit page, got ${questionCount}`);

  const compactBlockNavCount = await page.locator("[data-checklist-block]").count();
  assert(compactBlockNavCount === 1, `Expected 1 visible block shortcut by default, got ${compactBlockNavCount}`);

  await page.locator("[data-checklist-blocks]").click();
  await page.waitForTimeout(100);

  const expandedBlockNavCount = await page.locator("[data-checklist-block]").count();
  assert(expandedBlockNavCount === 7, `Expected 7 Cozinha Catering block shortcuts after toggle, got ${expandedBlockNavCount}`);

  await page.locator("[data-checklist-blocks]").click();
  await page.waitForTimeout(100);

  const visibleEvidenceBefore = await page.locator(".nc-evidence:visible").count();
  assert(visibleEvidenceBefore === 0, `Expected no visible NC evidence before selecting NC, got ${visibleEvidenceBefore}`);

  await page.locator("[data-answer='NC']").first().click();
  await page.waitForTimeout(150);

  const visibleEvidenceAfter = await page.locator(".nc-evidence:visible").count();
  assert(visibleEvidenceAfter === 1, `Expected one visible NC evidence after selecting NC, got ${visibleEvidenceAfter}`);

  await page.locator("[data-nav=home]").click();
  await page.locator("[data-area='area-residuos']").click();
  await page.locator("[data-area-detail='area-residuos']").first().click();
  await page.waitForTimeout(150);

  const detailBefore = await page.locator(".detail-modal").count();
  assert(detailBefore === 0, `Expected detail modal to start closed, got ${detailBefore}`);

  const blockButtonCount = await page.locator("[data-detail-block]").count();
  assert(blockButtonCount > 0, "Expected block buttons in area detail page");

  await page.locator("[data-detail-block]").first().click();
  await page.waitForTimeout(150);

  const detailOpen = await page.locator(".detail-modal").count();
  assert(detailOpen === 1, `Expected detail modal to open from block click, got ${detailOpen}`);

  await page.locator("[data-detail-filter='NC']").click();
  await page.waitForTimeout(80);

  const activeFilter = await page.locator("[data-detail-filter='NC']").evaluate((el) => el.classList.contains("is-active"));
  assert(activeFilter, "Expected NC detail filter to become active");

  await page.locator("[data-close-details]").click();
  await page.waitForTimeout(150);

  const detailAfter = await page.locator(".detail-modal").count();
  assert(detailAfter === 0, `Expected detail modal to close, got ${detailAfter}`);

  await page.locator("[data-toggle-sidebar]").click();
  await page.mouse.move(1000, 120);
  await page.waitForTimeout(80);

  const collapsedScroll = await page.locator(".nav-list").evaluate((el) => ({
    scrollbarWidth: getComputedStyle(el).scrollbarWidth,
    webkitWidth: getComputedStyle(el, "::-webkit-scrollbar").width,
    webkitDisplay: getComputedStyle(el, "::-webkit-scrollbar").display,
  }));
  assert(
    collapsedScroll.scrollbarWidth === "none" || collapsedScroll.webkitWidth === "0px" || collapsedScroll.webkitDisplay === "none",
    `Expected collapsed nav scrollbar hidden, got ${JSON.stringify(collapsedScroll)}`
  );

  await page.locator(".sidebar").hover();
  await page.waitForTimeout(80);

  const hoverScroll = await page.locator(".nav-list").evaluate((el) => ({
    scrollbarWidth: getComputedStyle(el).scrollbarWidth,
    webkitWidth: getComputedStyle(el, "::-webkit-scrollbar").width,
  }));
  assert(
    hoverScroll.scrollbarWidth === "thin" || hoverScroll.webkitWidth === "6px",
    `Expected collapsed nav scrollbar on hover, got ${JSON.stringify(hoverScroll)}`
  );

  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  assert(overflow <= 2, `Expected no horizontal overflow, got ${overflow}`);

  await browser.close();
  console.log("Behavior check passed: 437 questions, guided audit pagination, NC evidence toggle, block detail modal, hover-only collapsed nav scroll, no horizontal overflow.");
}

main().catch(async (error) => {
  console.error(error);
  process.exit(1);
});
