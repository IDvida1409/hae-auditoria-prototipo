const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const distDir = path.join(root, "dist");
const serverDir = path.join(distDir, "server");

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".webmanifest": "application/manifest+json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml; charset=utf-8"
};

const staticRoots = [
  "index.html",
  "styles.css",
  "checklist-data.js",
  "app.js",
  "manifest.webmanifest",
  "sw.js",
  "assets"
];

function collectFiles(entry) {
  const absolute = path.join(root, entry);
  const stat = fs.statSync(absolute);
  if (stat.isFile()) return [absolute];
  return fs.readdirSync(absolute).flatMap((child) => collectFiles(path.join(entry, child)));
}

function toRoute(filePath) {
  return `/${path.relative(root, filePath).replace(/\\/g, "/")}`;
}

function isText(filePath) {
  return [".html", ".js", ".css", ".json", ".webmanifest", ".svg"].includes(path.extname(filePath).toLowerCase());
}

function assetRecord(filePath) {
  const route = toRoute(filePath);
  const ext = path.extname(filePath).toLowerCase();
  const content = fs.readFileSync(filePath);
  return {
    route,
    type: mimeTypes[ext] || "application/octet-stream",
    text: isText(filePath),
    body: isText(filePath) ? content.toString("utf8") : content.toString("base64")
  };
}

function workerSource(records) {
  return `const ASSETS = ${JSON.stringify(records)};
let savedState = { state: null, updatedAt: null };

function binaryFromBase64(value) {
  const binary = atob(value);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) bytes[index] = binary.charCodeAt(index);
  return bytes;
}

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store"
    }
  });
}

function staticResponse(asset) {
  const body = asset.text ? asset.body : binaryFromBase64(asset.body);
  return new Response(body, {
    headers: {
      "content-type": asset.type,
      "cache-control": asset.route === "/index.html" ? "no-store" : "public, max-age=3600"
    }
  });
}

export default {
  async fetch(request) {
    const url = new URL(request.url);
    if (url.pathname === "/api/health") return json({ ok: true });
    if (url.pathname === "/api/state" && request.method === "GET") return json(savedState);
    if (url.pathname === "/api/state" && request.method === "PUT") {
      try {
        const payload = await request.json();
        savedState = { state: payload.state || null, updatedAt: new Date().toISOString() };
        return json(savedState);
      } catch (error) {
        return json({ error: error.message || "Estado inválido" }, 400);
      }
    }
    if (url.pathname.startsWith("/api/")) return json({ error: "Rota não encontrada" }, 404);

    const route = url.pathname === "/" ? "/index.html" : url.pathname;
    const asset = ASSETS.find((item) => item.route === route) || ASSETS.find((item) => item.route === "/index.html");
    return staticResponse(asset);
  }
};
`;
}

fs.rmSync(distDir, { recursive: true, force: true });
fs.mkdirSync(serverDir, { recursive: true });

const records = staticRoots.flatMap(collectFiles).map(assetRecord);
fs.writeFileSync(path.join(serverDir, "index.js"), workerSource(records));

console.log(`Build Sites gerado com ${records.length} arquivos.`);
