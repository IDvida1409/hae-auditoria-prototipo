(function () {
  const isNative = window.Capacitor?.isNativePlatform?.() === true;
  const liveUpdate = window.Capacitor?.Plugins?.LiveUpdate;
  if (!isNative || !liveUpdate) return;

  const backendUrl = "https://hae-auditoria-prototipo.onrender.com";

  function announce(phase, detail = {}) {
    window.dispatchEvent(new CustomEvent("app:update-status", { detail: { phase, ...detail } }));
  }

  async function prepareUpdate() {
    try {
      const ready = await liveUpdate.ready();
      if (ready.rollback) announce("rollback");

      const response = await fetch(`${backendUrl}/api/mobile-update`, { cache: "no-store" });
      if (!response.ok) return;
      const release = await response.json();
      if (!release.enabled || !release.bundleId || !release.url) return;

      const [{ versionCode }, current, next] = await Promise.all([
        liveUpdate.getVersionCode(),
        liveUpdate.getCurrentBundle(),
        liveUpdate.getNextBundle()
      ]);
      if (Number(versionCode) < Number(release.minVersionCode || 0)) return;
      if (current.bundleId === release.bundleId) return;
      if (next.bundleId === release.bundleId) {
        announce("applying", { bundleId: release.bundleId });
        await liveUpdate.reload();
        return;
      }

      announce("downloading", { bundleId: release.bundleId });
      await liveUpdate.downloadBundle({
        bundleId: release.bundleId,
        url: release.url,
        artifactType: "zip"
      });
      await liveUpdate.setNextBundle({ bundleId: release.bundleId });
      announce("applying", { bundleId: release.bundleId });
      await liveUpdate.reload();
    } catch (error) {
      console.warn("Atualizacao automatica indisponivel:", error?.message || error);
      announce("error");
    }
  }

  prepareUpdate();
})();
