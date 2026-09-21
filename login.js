(function () {
  const nativeApiOrigin = window.Capacitor?.isNativePlatform?.() ? "https://hae-auditoria-prototipo.onrender.com" : "";
  const modal = document.querySelector(".access-modal");
  const title = document.getElementById("access-title");
  const status = document.getElementById("access-status");
  const logo = document.querySelector(".product-logo");
  const defaultLogo = "assets/idvida-login-logo.png";
  function applyBranding(branding) {
    logo.classList.remove("is-loading-brand");
    if (!branding?.logoPath) { logo.classList.remove("is-unit-logo"); return; }
    const url = new URL(branding.logoPath, nativeApiOrigin || location.href);
    if (!url.pathname.startsWith("/assets/")) return;
    logo.onerror = () => { logo.onerror = null; logo.src = defaultLogo; logo.alt = "IDvida"; logo.classList.remove("is-loading-brand", "is-unit-logo"); };
    logo.src = url.href;
    logo.alt = branding.name || "Hospital";
    logo.classList.add("is-unit-logo");
  }
  const forms = { login: document.getElementById("login-form"), change: document.getElementById("change-form") };
  window.addEventListener("pageshow", () => {
    if (!forms.login.hidden) forms.login.reset();
  });
  const icons = () => window.lucide?.createIcons();
  function message(text, success = false) { status.textContent = text; status.classList.toggle("success", success); }
  function setMode(next) {
    Object.entries(forms).forEach(([key, form]) => { form.hidden = key !== next; });
    modal.classList.toggle("changing", next === "change");
    title.textContent = next === "change" ? "Defina sua nova senha" : "LOGIN";
    message("");
    forms[next].querySelector("input")?.focus();
  }
  async function api(path, options = {}) {
    const response = await fetch(nativeApiOrigin + "/api/access/" + path, { credentials: nativeApiOrigin ? "include" : "same-origin", ...options,
      headers: { "content-type": "application/json", ...options.headers } });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      if (response.status === 503) throw new Error("O acesso ainda não foi ativado neste ambiente.");
      throw new Error(data.error || "Não foi possível concluir. Tente novamente.");
    }
    return data;
  }
  function busy(form, value) { form.querySelectorAll("button,input,select").forEach((element) => { element.disabled = value; }); }
  async function submit(form, callback) {
    const values = Object.fromEntries(new FormData(form));
    message(""); busy(form, true);
    let keepBusy = false;
    try { keepBusy = await callback(values) === "navigating"; }
    catch (error) { message(error.message); }
    finally { if (!keepBusy) busy(form, false); }
  }
  forms.login.addEventListener("submit", (event) => {
    event.preventDefault();
    submit(forms.login, async (values) => {
      const data = await api("login", { method: "POST", body: JSON.stringify({ ...values, remember: values.remember === "on" }) });
      applyBranding(data.branding);
      if (data.user.must_change_password) { forms.login.reset(); setMode("change"); return; }
      sessionStorage.setItem("idauditor-user", JSON.stringify(data.user));
      forms.login.querySelector('.primary-button span').textContent = "Entrando...";
      message("Autenticação concluída. Abrindo o painel.", true);
      location.replace("/");
      return "navigating";
    });
  });
  forms.change.addEventListener("submit", (event) => {
    event.preventDefault();
    submit(forms.change, async (values) => {
      if (values.password !== values.confirmation) throw new Error("As senhas não coincidem.");
      await api("password", { method: "POST", body: JSON.stringify(values) });
      forms.change.reset(); setMode("login"); message("Senha alterada. Entre novamente.", true);
    });
  });
  document.getElementById("help-button").addEventListener("click", () => {
    const username = forms.login.elements.username.value.trim();
    if (!username) { message("Informe seu usuário antes de solicitar a redefinição."); forms.login.elements.username.focus(); return; }
    submit(forms.login, async () => {
      const data = await api("forgot-password", { method: "POST", body: JSON.stringify({ username }) });
      message(data.message, true);
    });
  });
  let brandingTimer;
  forms.login.elements.username.addEventListener("input", () => {
    clearTimeout(brandingTimer);
    const username = forms.login.elements.username.value.trim();
    if (username.length < 3) { logo.src = defaultLogo; logo.alt = "IDvida"; logo.classList.remove("is-loading-brand", "is-unit-logo"); return; }
    logo.classList.add("is-loading-brand");
    brandingTimer = setTimeout(async () => {
      try {
        const data = await api("branding", { method: "POST", body: JSON.stringify({ username }) });
        if (forms.login.elements.username.value.trim() !== username) return;
        if (data.branding) applyBranding(data.branding);
        else { logo.src = defaultLogo; logo.alt = "IDvida"; logo.classList.remove("is-unit-logo"); }
      } catch { /* A marca padrão permanece quando não houver conexão. */ }
      finally { logo.classList.remove("is-loading-brand"); }
    }, 300);
  });
  document.addEventListener("click", (event) => {
    const button = event.target.closest("[data-password-toggle]");
    if (!button) return;
    const input = button.parentElement.querySelector("input");
    const showing = input.type === "password";
    input.type = showing ? "text" : "password";
    button.setAttribute("aria-label", showing ? "Ocultar senha" : "Mostrar senha");
    button.title = button.getAttribute("aria-label");
    button.innerHTML = showing ? '<i data-lucide="eye-off" aria-hidden="true"></i>' : '<i data-lucide="eye" aria-hidden="true"></i>';
    icons();
  });
  api("me").then((data) => {
    if (!data.user.must_change_password) location.replace("/");
  }).catch(() => {});
  icons();
})();
