const CACHE_NAME = "idauditor-v38-ios-sync-queue";
const APP_SHELL = [
  "/",
  "/index.html",
  "/styles.css",
  "/checklist-data.js",
  "/offline-store.js",
  "/live-update.js",
  "/app.js",
  "/manifest.webmanifest",
  "/login.html",
  "/login.css",
  "/login.js",
  "/assets/idvida-login-logo.png",
  "/assets/hospital-einstein-logo.png",
  "/assets/login-reference.png",
  "/assets/app-icon-reference.png",
  "/assets/vendor/lucide.min.js"
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);
  if (url.pathname.startsWith("/api/")) return;
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        return response;
      })
      .catch(() => caches.match(event.request).then((cached) => cached || caches.match("/index.html")))
  );
});
