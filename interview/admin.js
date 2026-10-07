(() => {
  const schema = window.CLINICAL_INTERVIEW_SCHEMA;
  const loginPanel = document.getElementById("login-panel");
  const adminContent = document.getElementById("admin-content");
  const list = document.getElementById("interview-list");
  const detail = document.getElementById("interview-detail");
  const message = document.getElementById("admin-message");
  let interviews = [];
  let selectedId = null;
  const escape = (value) => String(value ?? "").replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]);
  const date = (value) => value ? new Date(value).toLocaleString("pt-BR") : "—";
  async function api(path, method = "GET", body) {
    const response = await fetch(path, { method, credentials: "same-origin", cache: "no-store", headers: body ? { "Content-Type": "application/json" } : {}, body: body ? JSON.stringify(body) : undefined });
    const data = await response.json();
    if (!response.ok) throw Object.assign(new Error(data.error || "Não foi possível concluir a operação."), { status: response.status });
    return data;
  }
  function error(text) { message.textContent = text; message.className = "message-panel error"; message.hidden = false; }
  function showShare(link) {
    document.getElementById("share-link").value = new URL(link, location.origin).href;
    document.getElementById("share-box").hidden = false;
    document.getElementById("share-link").focus();
    document.getElementById("share-link").select();
  }
  function renderList() {
    document.getElementById("list-count").textContent = `${interviews.length} registro${interviews.length === 1 ? "" : "s"}`;
    if (!interviews.length) { list.innerHTML = `<div class="empty-state">Nenhum link criado ainda.</div>`; return; }
    list.innerHTML = interviews.map((row) => `<button type="button" class="interview-item ${row.id === selectedId ? "active" : ""}" data-id="${escape(row.id)}"><strong>${escape(row.professional || "Aguardando entrevistado")}</strong><small>${escape(row.institution || "Instituição ainda não informada")}</small><small>Criado em ${escape(date(row.created_at))}</small><span class="status-pill ${row.status === "submitted" ? "submitted" : ""}">${row.status === "submitted" ? "Enviada" : "Rascunho"}</span></button>`).join("");
    list.querySelectorAll("[data-id]").forEach((button) => button.addEventListener("click", () => openDetail(button.dataset.id)));
  }
  async function refresh() {
    const result = await api("/api/clinical-interviews/admin");
    interviews = result.interviews;
    renderList();
  }
  function field(label, value) { return `<div class="detail-field"><strong>${escape(label)}</strong><p>${escape(value || "Não informado")}</p></div>`; }
  function marks(label, selected) {
    const values = Array.isArray(selected) ? selected : selected ? [selected] : [];
    return `<div class="detail-field"><strong>${escape(label)}</strong><div class="marks">${values.length ? values.map((value) => `<span class="mark">✓ ${escape(value)}</span>`).join("") : `<p>Não informado</p>`}</div></div>`;
  }
  async function openDetail(id) {
    selectedId = id;
    renderList();
    detail.className = "";
    detail.innerHTML = `<div class="empty-state">Carregando respostas…</div>`;
    try {
      const { interview } = await api(`/api/clinical-interviews/admin/${encodeURIComponent(id)}`);
      const a = interview.answers || {};
      detail.innerHTML = `<div class="detail-head"><div><h2>${escape(a.professional || "Entrevista ainda não preenchida")}</h2><p>${interview.status === "submitted" ? `Enviada em ${escape(date(interview.submitted_at))}` : `Rascunho salvo em ${escape(date(interview.updated_at))}`}</p></div><div class="detail-actions"><button class="button secondary small" id="download-pdf">Gerar PDF</button>${interview.status === "draft" ? `<button class="button secondary small" id="renew-link">Novo link</button>` : ""}</div></div>
        <div class="detail-section"><h3>Registro inicial</h3>${field("Estudante / RGM", [a.studentName, a.rgm].filter(Boolean).join(" / "))}${field("Instituição / clínica", a.institution)}${marks("Tipo de serviço", a.serviceType)}${a.serviceTypeOther ? field("Outro tipo", a.serviceTypeOther) : ""}${field("Público atendido", a.audience)}${field("Profissional / CRP / função", [a.professional, a.crp, a.role].filter(Boolean).join(" / "))}${field("Equipe multiprofissional", a.team)}${marks("Faixas etárias", a.ageRanges)}${marks("Abordagem predominante", a.approach)}${a.approachOther ? field("Outra abordagem", a.approachOther) : ""}${marks("Modalidades", a.modalities)}${marks("Formas de acesso", a.accessPaths)}${marks("Instrumentos", a.instruments)}</div>
        ${schema.sections.map((section) => `<div class="detail-section"><h3>${section.number}. ${escape(section.title)}</h3>${section.questions.map((question) => `<div class="answer-card"><strong>${escape(question.text)}</strong><small>Tópicos ${escape(question.refs)}</small><p>${escape(a.responses?.[question.id] || "Ainda não respondida")}</p></div>`).join("")}</div>`).join("")}`;
      document.getElementById("download-pdf").addEventListener("click", () => downloadPdf(id));
      document.getElementById("renew-link")?.addEventListener("click", async () => {
        if (!confirm("Gerar um novo link? O link anterior deixará de funcionar, mas o rascunho ficará salvo.")) return;
        try { const result = await api(`/api/clinical-interviews/admin/${encodeURIComponent(id)}/renew`, "POST"); showShare(result.link); await refresh(); }
        catch (caught) { error(caught.message); }
      });
    } catch (caught) { detail.innerHTML = `<div class="empty-state">${escape(caught.message)}</div>`; }
  }
  async function downloadPdf(id) {
    try {
      const response = await fetch(`/api/clinical-interviews/admin/${encodeURIComponent(id)}/pdf`, { credentials: "same-origin", cache: "no-store" });
      if (!response.ok) { const data = await response.json(); throw new Error(data.error || "Não foi possível gerar o PDF."); }
      const url = URL.createObjectURL(await response.blob());
      const link = document.createElement("a");
      link.href = url; link.download = `entrevista-clinica-${id}.pdf`;
      document.body.append(link); link.click(); link.remove();
      setTimeout(() => URL.revokeObjectURL(url), 60000);
    } catch (caught) { error(caught.message); }
  }
  async function start() {
    try {
      await refresh();
      loginPanel.hidden = true;
      adminContent.hidden = false;
      document.getElementById("logout-button").hidden = false;
    } catch (caught) {
      adminContent.hidden = true;
      if (caught.status === 401) loginPanel.hidden = false;
      else error(caught.message);
    }
  }
  document.getElementById("login-form").addEventListener("submit", async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const button = form.querySelector("button");
    button.disabled = true;
    document.getElementById("login-status").textContent = "Entrando…";
    try {
      await api("/api/access/login", "POST", { username: form.elements.username.value, password: form.elements.password.value });
      document.getElementById("login-status").textContent = "";
      await start();
    } catch (caught) { document.getElementById("login-status").textContent = caught.message; }
    finally { button.disabled = false; }
  });
  document.getElementById("logout-button").addEventListener("click", async () => {
    try { await api("/api/access/logout", "POST"); } catch {}
    location.reload();
  });
  document.getElementById("new-link-button").addEventListener("click", async () => {
    const button = document.getElementById("new-link-button"); button.disabled = true;
    try { const result = await api("/api/clinical-interviews/admin", "POST"); showShare(result.link); await refresh(); await openDetail(result.interview.id); }
    catch (caught) { error(caught.message); }
    finally { button.disabled = false; }
  });
  document.getElementById("copy-link-button").addEventListener("click", async () => {
    const input = document.getElementById("share-link");
    try { await navigator.clipboard.writeText(input.value); document.getElementById("copy-link-button").textContent = "Copiado"; }
    catch { input.focus(); input.select(); document.getElementById("copy-link-button").textContent = "Selecione e copie"; }
  });
  start();
})();
