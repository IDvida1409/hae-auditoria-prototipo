const reviewToken = new URLSearchParams(window.location.search).get("token") || "nutricao-2026";
const reviewStatus = document.querySelector("[data-review-status]");
const saveButton = document.querySelector("[data-save-review]");
const reviewState = { active: "monthly", saved: {}, saving: false, ready: false };

function setReviewStatus(text, type = "") {
  reviewStatus.textContent = text;
  reviewStatus.className = `report-review-status${type ? ` is-${type}` : ""}`;
}

function reviewKey(kind) { return `idauditor-approved-review:${reviewToken}:${kind}`; }

function reviewEditableNodes() {
  const root = document.querySelector(".report-review-preview .technical-report");
  if (!root) return [];
  return [...root.querySelectorAll(".report-doc-body > h1, .report-doc-lead, .report-doc-text, .report-doc-section > h2, .report-doc-section > h3, .report-note-box > strong, .report-note-box > p, .report-footnote")]
    .filter((node) => !node.closest("table, figure, svg, .report-signatures"));
}

function markReviewFields() {
  const saved = reviewState.saved[reviewState.active] || {};
  let index = 0;
  for (const node of reviewEditableNodes()) {
    let editable = node;
    if (node.matches("h2") && node.querySelector(":scope > span")) {
      const existingEditable = node.querySelector(":scope > [data-review-editable]");
      if (existingEditable) {
        editable = existingEditable;
      } else {
      const number = node.querySelector(":scope > span");
      const text = [...node.childNodes].filter((child) => child.nodeType === Node.TEXT_NODE).map((child) => child.textContent).join("").trim();
      [...node.childNodes].filter((child) => child.nodeType === Node.TEXT_NODE).forEach((child) => child.remove());
      editable = document.createElement("span");
      editable.textContent = text;
      node.append(editable);
      if (number) number.contentEditable = "false";
      }
    }
    editable.dataset.reviewEditable = String(index);
    editable.contentEditable = "true";
    editable.spellcheck = true;
    editable.title = "Texto editável. Indicadores, gráficos, tabelas e fotos são protegidos.";
    if (Object.prototype.hasOwnProperty.call(saved, String(index))) editable.textContent = saved[String(index)];
    index += 1;
  }
}

function currentReviewContent() {
  return Object.fromEntries([...document.querySelectorAll("[data-review-editable]")].map((node) => [node.dataset.reviewEditable, node.innerText.trim()]));
}

function saveReviewLocally() {
  localStorage.setItem(reviewKey(reviewState.active), JSON.stringify(reviewState.saved[reviewState.active] || {}));
}

async function loadReviewContent() {
  try {
    for (const kind of ["monthly", "comparison", "organization-monthly"]) {
      const local = JSON.parse(localStorage.getItem(reviewKey(kind)) || "null");
      if (local && typeof local === "object") reviewState.saved[kind] = local;
    }
  } catch { /* A cópia remota continua sendo usada quando disponível. */ }
  try {
    const response = await fetch(`/api/report-review?token=${encodeURIComponent(reviewToken)}`, { credentials: "same-origin" });
    if (!response.ok) throw new Error("Falha ao carregar sugestões");
    const data = await response.json();
    for (const [kind, report] of Object.entries(data.reports || {})) {
      if (report?.content && typeof report.content === "object") reviewState.saved[kind] = report.content;
    }
    if (reviewState.ready) markReviewFields();
    setReviewStatus("Modelo aprovado carregado");
  } catch {
    setReviewStatus("Modelo aprovado carregado; sugestões locais", "error");
  }
}

async function saveReview() {
  if (reviewState.saving) return;
  reviewState.saved[reviewState.active] = currentReviewContent();
  saveReviewLocally();
  reviewState.saving = true;
  saveButton.disabled = true;
  setReviewStatus("Salvando sugestões...");
  try {
    const response = await fetch(`/api/report-review?token=${encodeURIComponent(reviewToken)}`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ token: reviewToken, reportType: reviewState.active, content: reviewState.saved[reviewState.active] })
    });
    if (!response.ok) throw new Error("Não foi possível salvar");
    setReviewStatus("Sugestões salvas no banco", "success");
  } catch {
    setReviewStatus("Salvo neste aparelho; tente novamente", "error");
  } finally {
    reviewState.saving = false;
    saveButton.disabled = false;
  }
}

function renderReviewModel(kind) {
  reviewState.active = kind;
  if (typeof window.renderExternalReportReview !== "function") return;
  setReviewStatus("Abrindo modelo aprovado...");
  window.renderExternalReportReview(kind);
}

function handleReviewReady(kind) {
  reviewState.active = kind;
  reviewState.ready = true;
  markReviewFields();
  setReviewStatus("Modelo aprovado carregado");
}

document.addEventListener("idauditor-review-ready", (event) => handleReviewReady(event.detail.kind));

document.querySelectorAll("[data-model]").forEach((button) => button.addEventListener("click", () => {
  const previous = document.querySelector("[data-review-editable]");
  if (previous) { reviewState.saved[reviewState.active] = currentReviewContent(); saveReviewLocally(); }
  document.querySelectorAll("[data-model]").forEach((item) => item.classList.toggle("is-active", item === button));
  renderReviewModel(button.dataset.model);
}));

saveButton.addEventListener("click", saveReview);
loadReviewContent();
if (window.__IDAUDITOR_EXTERNAL_REPORT_KIND__) handleReviewReady(window.__IDAUDITOR_EXTERNAL_REPORT_KIND__);
