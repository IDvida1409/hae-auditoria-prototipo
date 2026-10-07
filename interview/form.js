(() => {
  const schema = window.CLINICAL_INTERVIEW_SCHEMA;
  const key = new URLSearchParams(location.search).get("key") || "";
  const form = document.getElementById("interview-form");
  const content = document.getElementById("content");
  const messagePanel = document.getElementById("message-panel");
  const status = document.getElementById("connection-status");
  const saveStatus = document.getElementById("save-status");
  const allQuestions = schema.sections.flatMap((section) => section.questions);
  let busy = false;
  let dirty = false;
  let editRevision = 0;

  const escape = (value) => String(value ?? "").replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]);
  const input = (name, label, opts = {}) => `<label class="field ${opts.full ? "full" : ""}"><span>${escape(label)}</span><input name="${name}" type="text" maxlength="${opts.max || 250}" autocomplete="off"><small>${escape(opts.help || "")}</small></label>`;
  const textarea = (name, label) => `<label class="field full"><span>${escape(label)}</span><textarea name="${name}" maxlength="2000" rows="3"></textarea></label>`;
  function choiceGroup(name, label, multiple = false) {
    const kind = multiple ? "checkbox" : "radio";
    return `<fieldset class="choice-group full"><legend>${escape(label)}</legend><div class="options">${schema.choices[name].map((choice) => `<label class="choice"><input type="${kind}" name="${name}" value="${escape(choice)}"><span>${escape(choice)}</span></label>`).join("")}</div></fieldset>`;
  }
  function render() {
    document.getElementById("identity-fields").innerHTML = `<div class="field-grid">
      ${input("studentName", "Nome do estudante")}${input("rgm", "RGM do estudante")}
      ${input("institution", "Nome da instituição / clínica", { full: true })}
      ${choiceGroup("serviceType", "Tipo de serviço")}${input("serviceTypeOther", "Se marcou Outro, qual?")}
      ${textarea("audience", "Público atendido")}
      ${input("professional", "Nome do profissional entrevistado")}${input("crp", "Número de CRP")}
      ${input("role", "Função na clínica")}${textarea("team", "Quem compõe a equipe multiprofissional? Se não houver equipe no local, como se articula com outros profissionais?")}
      ${choiceGroup("ageRanges", "Faixas etárias atendidas", true)}
      ${choiceGroup("approach", "Abordagem teórica predominante")}${input("approachOther", "Se marcou Outra, qual?")}
      ${choiceGroup("modalities", "Modalidades oferecidas", true)}
      ${choiceGroup("accessPaths", "Formas de acesso ao serviço", true)}
      ${choiceGroup("instruments", "Instrumentos utilizados", true)}
    </div>`;
    document.getElementById("question-sections").innerHTML = schema.sections.map((section) => `<section class="panel" id="${section.id}"><div class="section-head"><span class="section-number">${String(section.number).padStart(2, "0")}</span><div><p>Estrutura ${section.number}</p><h2>${escape(section.title)}</h2></div></div>${section.questions.map((question) => `<div class="question" id="${question.id}"><div class="question-top"><span class="question-number">${question.id.slice(1)}</span><label for="answer-${question.id}">${escape(question.text)}</label></div><div class="question-meta">Tópicos ${escape(question.refs)}</div><div class="field"><textarea id="answer-${question.id}" name="${question.id}" maxlength="6000" rows="5" placeholder="Escreva a resposta com suas próprias palavras. Se não se aplicar, explique por quê."></textarea></div></div>`).join("")}</section>`).join("");
    document.getElementById("section-nav").innerHTML = `<a class="nav-item" href="#identificacao-cadastral"><span class="nav-badge">00</span> Identificação</a>${schema.sections.map((section) => `<a class="nav-item" href="#${section.id}"><span class="nav-badge">${String(section.number).padStart(2, "0")}</span> ${escape(section.title)}</a>`).join("")}`;
  }
  function getValues() {
    const data = {};
    for (const name of ["studentName", "rgm", "institution", "serviceTypeOther", "audience", "professional", "crp", "role", "team", "approachOther"]) data[name] = form.elements[name]?.value || "";
    for (const name of ["serviceType", "approach"]) data[name] = form.querySelector(`input[name="${name}"]:checked`)?.value || "";
    for (const name of ["ageRanges", "modalities", "accessPaths", "instruments"]) data[name] = [...form.querySelectorAll(`input[name="${name}"]:checked`)].map((input) => input.value);
    data.responses = Object.fromEntries(allQuestions.map((question) => [question.id, form.elements[question.id]?.value || ""]));
    return data;
  }
  function setValues(data) {
    if (!data) return;
    for (const name of ["studentName", "rgm", "institution", "serviceTypeOther", "audience", "professional", "crp", "role", "team", "approachOther"]) if (form.elements[name]) form.elements[name].value = data[name] || "";
    for (const name of ["serviceType", "approach", "ageRanges", "modalities", "accessPaths", "instruments"]) {
      const selected = Array.isArray(data[name]) ? data[name] : [data[name]];
      form.querySelectorAll(`input[name="${name}"]`).forEach((input) => { input.checked = selected.includes(input.value); });
    }
    for (const question of allQuestions) form.elements[question.id].value = data.responses?.[question.id] || "";
    updateProgress();
  }
  function updateProgress() {
    const filled = allQuestions.filter((question) => form.elements[question.id].value.trim()).length;
    document.getElementById("progress-number").textContent = `${filled}/${allQuestions.length}`;
  }
  function showMessage(title, body, type = "error") {
    content.hidden = true;
    messagePanel.className = `message-panel ${type}`;
    messagePanel.innerHTML = `<h2>${escape(title)}</h2><p>${escape(body)}</p>`;
    messagePanel.hidden = false;
    status.textContent = type === "success" ? "Enviado" : "Indisponível";
  }
  async function request(method, body) {
    const response = await fetch(`/api/clinical-interviews/respond/${encodeURIComponent(key)}`, { method, credentials: "same-origin", headers: body ? { "Content-Type": "application/json" } : {}, body: body ? JSON.stringify(body) : undefined, cache: "no-store" });
    const data = await response.json();
    if (!response.ok) { const error = new Error(data.error || "Não foi possível concluir a operação."); error.missing = data.missing; throw error; }
    return data;
  }
  async function save(method) {
    if (busy) return;
    const values = getValues();
    if (method === "POST") {
      const missing = allQuestions.find((question) => !values.responses[question.id].trim());
      if (missing) { saveStatus.textContent = "Responda todas as perguntas antes de enviar. Se uma pergunta não se aplica, explique no campo."; document.getElementById(missing.id).scrollIntoView({ behavior: "smooth", block: "center" }); form.elements[missing.id].focus(); return; }
      if (!confirm("Enviar a entrevista agora? Depois do envio, as respostas não poderão ser alteradas por este link.")) return;
    }
    busy = true;
    const savedRevision = editRevision;
    if (method === "POST") form.querySelectorAll("input,textarea").forEach((field) => { field.disabled = true; });
    document.getElementById("save-button").disabled = true;
    document.getElementById("send-button").disabled = true;
    saveStatus.textContent = method === "POST" ? "Enviando…" : "Salvando…";
    try {
      const result = await request(method, values);
      dirty = editRevision !== savedRevision;
      if (result.status === "submitted") showMessage("Entrevista enviada", "As respostas foram recebidas. Obrigado por participar.", "success");
      else { saveStatus.textContent = dirty ? "Rascunho salvo; há alterações mais recentes ainda não salvas." : `Rascunho salvo em ${new Date(result.updatedAt).toLocaleString("pt-BR")}. Você pode voltar a este link para continuar.`; status.textContent = dirty ? "Alterações não salvas" : "Rascunho salvo"; }
    } catch (error) {
      saveStatus.textContent = error.message;
      if (error.missing?.length) {
        const first = error.missing.find((name) => name.startsWith("q"));
        if (first) document.getElementById(first)?.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    } finally { busy = false; form.querySelectorAll("input,textarea").forEach((field) => { field.disabled = false; }); document.getElementById("save-button").disabled = false; document.getElementById("send-button").disabled = false; }
  }
  render();
  function markDirty() { editRevision++; dirty = true; status.textContent = "Alterações não salvas"; updateProgress(); }
  form.addEventListener("input", markDirty);
  form.addEventListener("change", markDirty);
  window.addEventListener("beforeunload", (event) => { if (dirty && !content.hidden) { event.preventDefault(); event.returnValue = ""; } });
  document.getElementById("save-button").addEventListener("click", () => save("PUT"));
  form.addEventListener("submit", (event) => { event.preventDefault(); save("POST"); });
  if (!/^ci_[A-Za-z0-9_-]{43}$/.test(key)) showMessage("Link necessário", "Abra o link individual enviado para esta entrevista.");
  else request("GET").then((result) => {
    if (result.status === "submitted") showMessage("Entrevista já enviada", "As respostas foram recebidas. Obrigado por participar.", "success");
    else { setValues(result.answers); content.hidden = false; status.textContent = "Rascunho disponível"; }
  }).catch((error) => showMessage("Não foi possível abrir a entrevista", error.message));
})();
