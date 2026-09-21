const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const output = path.join(root, "www");

const files = [
  "index.html",
  "styles.css",
  "checklist-data.js",
  "offline-store.js",
  "live-update.js",
  "app.js",
  "manifest.webmanifest",
  "sw.js",
  "login.html",
  "login.css",
  "login.js",
];

function copyDir(source, target, ignoredNames = new Set()) {
  fs.mkdirSync(target, { recursive: true });
  for (const entry of fs.readdirSync(source, { withFileTypes: true })) {
    if (ignoredNames.has(entry.name)) continue;
    const sourcePath = path.join(source, entry.name);
    const targetPath = path.join(target, entry.name);
    if (entry.isDirectory()) {
      copyDir(sourcePath, targetPath);
    } else if (entry.isFile()) {
      fs.copyFileSync(sourcePath, targetPath);
    }
  }
}

function buildAndroidWeb() {
  fs.rmSync(output, { recursive: true, force: true });
  fs.mkdirSync(output, { recursive: true });

  for (const file of files) {
    fs.copyFileSync(path.join(root, file), path.join(output, file));
  }

  const androidIndex = path.join(output, "index.html");
  fs.writeFileSync(androidIndex, fs.readFileSync(androidIndex, "utf8").replace("<body>", '<body class="android-app">'));
  const androidLogin = path.join(output, "login.html");
  fs.writeFileSync(androidLogin, fs.readFileSync(androidLogin, "utf8").replace("<body>", '<body class="android-app">'));

  copyDir(path.join(root, "assets"), path.join(output, "assets"), new Set(["reports"]));
  console.log(`Build Android web gerado em ${output}`);
  return output;
}

if (require.main === module) buildAndroidWeb();

module.exports = { buildAndroidWeb };
