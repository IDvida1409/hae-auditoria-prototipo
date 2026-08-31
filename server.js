const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

const root = __dirname;
const dataDir = path.join(root, "data");
const stateFile = path.join(dataDir, "app-state.json");
const port = Number(process.env.PORT || 3000);

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".webmanifest": "application/manifest+json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml; charset=utf-8",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".ico": "image/x-icon"
};

function ensureStore() {
  fs.mkdirSync(dataDir, { recursive: true });
  if (!fs.existsSync(stateFile)) {
    fs.writeFileSync(stateFile, JSON.stringify({ state: null, updatedAt: null }, null, 2));
  }
}

function readStore() {
  ensureStore();
  try {
    return JSON.parse(fs.readFileSync(stateFile, "utf8"));
  } catch {
    return { state: null, updatedAt: null };
  }
}

function writeStore(state) {
  ensureStore();
  const payload = { state, updatedAt: new Date().toISOString() };
  fs.writeFileSync(stateFile, JSON.stringify(payload, null, 2));
  return payload;
}

function sendJson(response, status, body) {
  response.writeHead(status, {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store"
  });
  response.end(JSON.stringify(body));
}

function readBody(request) {
  return new Promise((resolve, reject) => {
    let body = "";
    request.on("data", (chunk) => {
      body += chunk;
      if (body.length > 1_000_000) {
        request.destroy();
        reject(new Error("Payload muito grande"));
      }
    });
    request.on("end", () => resolve(body));
    request.on("error", reject);
  });
}

function staticPathFor(urlPath) {
  const cleanPath = decodeURIComponent(urlPath.split("?")[0]);
  const relativePath = cleanPath === "/" ? "index.html" : cleanPath.replace(/^\/+/, "");
  const resolved = path.resolve(root, relativePath);
  if (!resolved.startsWith(root)) return null;
  return resolved;
}

async function handleApi(request, response, url) {
  if (url.pathname === "/api/health") {
    sendJson(response, 200, { ok: true });
    return true;
  }

  if (url.pathname === "/api/state" && request.method === "GET") {
    sendJson(response, 200, readStore());
    return true;
  }

  if (url.pathname === "/api/state" && request.method === "PUT") {
    try {
      const body = await readBody(request);
      const parsed = body ? JSON.parse(body) : {};
      sendJson(response, 200, writeStore(parsed.state || null));
    } catch (error) {
      sendJson(response, 400, { error: error.message || "Estado inválido" });
    }
    return true;
  }

  if (url.pathname.startsWith("/api/")) {
    sendJson(response, 404, { error: "Rota não encontrada" });
    return true;
  }

  return false;
}

function serveStatic(request, response, url) {
  const requestedPath = staticPathFor(url.pathname);
  const filePath = requestedPath && fs.existsSync(requestedPath) && fs.statSync(requestedPath).isFile()
    ? requestedPath
    : path.join(root, "index.html");
  const ext = path.extname(filePath).toLowerCase();
  response.writeHead(200, {
    "content-type": mimeTypes[ext] || "application/octet-stream",
    "cache-control": ext === ".html" ? "no-store" : "public, max-age=3600"
  });
  fs.createReadStream(filePath).pipe(response);
}

const server = http.createServer(async (request, response) => {
  const url = new URL(request.url, `http://${request.headers.host || "localhost"}`);
  if (await handleApi(request, response, url)) return;
  serveStatic(request, response, url);
});

server.listen(port, () => {
  console.log(`HAE Auditoria rodando em http://localhost:${port}`);
});
