const reviewToken = new URLSearchParams(window.location.search).get("token") || "nutricao-2026";

const modelDefinitions = {
  monthly: {
    label: "Relatório individual mensal",
    code: "INDIVIDUAL / MENSAL",
    title: "Relatório individual mensal de auditoria",
    subtitle: "Acompanhamento dos resultados da auditoria realizada na área selecionada.",
    sections: [
      ["overviewTitle", "Resumo do período", "overviewText", "Este relatório reúne o resultado da auditoria mensal, as evidências registradas e os pontos que merecem acompanhamento pela área responsável."],
      ["findingsTitle", "Principais resultados", "findingsText", "A área apresentou evolução nos itens avaliados. Os registros detalhados, os indicadores e as evidências permanecem calculados pelo sistema."],
      ["closingTitle", "Considerações finais", "closingText", "Use este espaço para orientar a leitura do relatório e destacar o próximo passo da área."]
    ]
  },
  comparison: {
    label: "Relatório analítico comparativo",
    code: "ANALÍTICO / COMPARATIVO",
    title: "Relatório analítico comparativo",
    subtitle: "Leitura consolidada da evolução das áreas ao longo do período selecionado.",
    sections: [
      ["overviewTitle", "Leitura geral", "overviewText", "Este relatório compara os resultados dos períodos selecionados e organiza os principais movimentos observados nas áreas avaliadas."],
      ["trendTitle", "Evolução dos resultados", "trendText", "A evolução deve ser interpretada em conjunto com os indicadores, os registros das auditorias e os planos de ação armazenados no sistema."],
      ["attentionTitle", "Pontos de atenção", "attentionText", "Registre aqui a mensagem que deve acompanhar a leitura dos pontos de atenção, sem alterar os números ou os gráficos protegidos."],
      ["closingTitle", "Conclusão analítica", "closingText", "Use este espaço para concluir a análise do período comparado."]
    ]
  },
  "organization-monthly": {
    label: "Relatório consolidado da área",
    code: "CONSOLIDADO / ÁREA",
    title: "Relatório consolidado da área",
    subtitle: "Visão conjunta dos resultados e das subáreas vinculadas à área selecionada.",
    sections: [
      ["overviewTitle", "Desempenho da área", "overviewText", "Este relatório consolida os resultados das subáreas e apresenta uma visão única para apoiar a tomada de decisão da área."],
      ["areaTitle", "Resultados consolidados", "areaText", "A leitura consolidada considera as auditorias concluídas, as respostas registradas e os planos de ação relacionados à área."],
      ["actionsTitle", "Planos de ação", "actionsText", "Os planos de ação, as devolutivas, os prazos e as evidências são apresentados pelo sistema sem alteração manual dos indicadores."],
      ["closingTitle", "Encerramento", "closingText", "Use este espaço para a mensagem final do relatório consolidado."]
    ]
  }
};

const state = { active: "monthly", saved: {}, loaded: false, saving: false };
const sheet = document.querySelector("[data-report-sheet]");
const status = document.querySelector("[data-review-status]");
const modelLabel = document.querySelector("[data-model-label]");
const saveButton = document.querySelector("[data-save-review]");

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function setStatus(text, type = "") {
  status.textContent = text;
  status.className = `review-status${type ? ` is-${type}` : ""}`;
}

function field(key, value, className = "") {
  return `<textarea class="editable-field ${className}" data-edit-key="${escapeHtml(key)}" aria-label="Texto editável">${escapeHtml(value)}</textarea>`;
}

function autoGrow(textarea) {
  textarea.style.height = "auto";
  textarea.style.height = `${Math.max(textarea.scrollHeight, textarea.classList.contains("field-title") ? 44 : 28)}px`;
}

function currentContent() {
  return Object.fromEntries([...sheet.querySelectorAll("[data-edit-key]")].map((input) => [input.dataset.editKey, input.value]));
}

function localKey() { return `idauditor-review:${reviewToken}`; }

function renderModel() {
  const model = modelDefinitions[state.active];
  const saved = state.saved[state.active] || {};
  const value = (key, fallback) => Object.prototype.hasOwnProperty.call(saved, key) ? saved[key] : fallback;
  modelLabel.textContent = model.label;
  sheet.innerHTML = `
    <div class="sheet-topline"><span>IDAuditor</span><span>${escapeHtml(model.code)}</span></div>
    <div class="sheet-title">
      ${field("title", value("title", model.title), "field-title")}
      <div class="sheet-subtitle">${field("subtitle", value("subtitle", model.subtitle))}</div>
    </div>
    <p class="protected-label">Indicadores protegidos pelo sistema</p>
    <div class="protected-grid" aria-label="Indicadores protegidos">
      <div class="protected-card"><small>Nota consolidada</small><strong>—</strong><small>Calculada pelas auditorias</small></div>
      <div class="protected-card is-green"><small>Conformidade</small><strong>—</strong><small>Calculada pelas respostas</small></div>
      <div class="protected-card is-red"><small>Não conformidades</small><strong>—</strong><small>Calculadas pelas respostas</small></div>
    </div>
    ${model.sections.map(([titleKey, fallbackTitle, textKey, fallbackText], index) => `
      <section class="sheet-section">
        <h2>${field(titleKey, value(titleKey, fallbackTitle), "field-section")}</h2>
        <p>${field(textKey, value(textKey, fallbackText))}</p>
        ${index === 1 ? `<div class="protected-note">Indicadores, tabelas, gráficos e evidências desta seção são protegidos e serão preenchidos pelo sistema.</div>` : ""}
      </section>
    `).join("")}
    <section class="sheet-section">
      <h2>Conteúdo protegido</h2>
      <div class="sheet-table-wrap">
        <table class="protected-table"><thead><tr><th>Item</th><th>Resultado</th><th>Status</th></tr></thead><tbody><tr><td>Respostas auditadas</td><td>Calculado pelo sistema</td><td>Protegido</td></tr><tr><td>Planos de ação</td><td>Calculado pelo sistema</td><td>Protegido</td></tr></tbody></table>
      </div>
    </section>
  `;
  sheet.querySelectorAll("[data-edit-key]").forEach((input) => {
    input.addEventListener("input", () => autoGrow(input));
    autoGrow(input);
  });
}

function applySavedReportData(reports) {
  for (const [kind, report] of Object.entries(reports || {})) {
    if (modelDefinitions[kind] && report?.content && typeof report.content === "object") state.saved[kind] = report.content;
  }
  state.loaded = true;
  renderModel();
  setStatus("Pronto para revisar");
}

async function loadReview() {
  try {
    const local = JSON.parse(localStorage.getItem(localKey()) || "{}");
    if (local && typeof local === "object") state.saved = local;
  } catch { /* A cópia remota continua sendo a fonte principal. */ }
  try {
    const response = await fetch(`/api/report-review?token=${encodeURIComponent(reviewToken)}`, { credentials: "same-origin" });
    if (!response.ok) throw new Error("Não foi possível carregar a revisão.");
    const data = await response.json();
    applySavedReportData(data.reports);
  } catch {
    state.loaded = true;
    renderModel();
    setStatus("Modo local: a conexão será tentada ao salvar", "error");
  }
}

async function saveReview() {
  if (state.saving) return;
  state.saving = true;
  saveButton.disabled = true;
  state.saved[state.active] = currentContent();
  localStorage.setItem(localKey(), JSON.stringify(state.saved));
  setStatus("Salvando...");
  try {
    const response = await fetch(`/api/report-review?token=${encodeURIComponent(reviewToken)}`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ token: reviewToken, reportType: state.active, content: state.saved[state.active] })
    });
    if (!response.ok) throw new Error("Não foi possível salvar.");
    setStatus("Sugestões salvas", "success");
  } catch {
    setStatus("Salvo neste aparelho; tente novamente com internet", "error");
  } finally {
    state.saving = false;
    saveButton.disabled = false;
  }
}

document.querySelectorAll("[data-model]").forEach((button) => button.addEventListener("click", () => {
  if (state.active !== button.dataset.model) state.saved[state.active] = currentContent();
  state.active = button.dataset.model;
  document.querySelectorAll("[data-model]").forEach((item) => {
    const active = item === button;
    item.classList.toggle("is-active", active);
    item.setAttribute("aria-selected", String(active));
  });
  renderModel();
  setStatus(state.loaded ? "Pronto para revisar" : "Carregando modelos...");
}));

saveButton.addEventListener("click", saveReview);
renderModel();
loadReview();
