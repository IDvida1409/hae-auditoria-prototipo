const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const source = fs.readFileSync(path.join(root, "assets", "icons-operacionais-corrigidos.svg"), "utf8");

const names = {
  "Inicio": "home",
  "Painel": "dashboard",
  "Iniciar auditoria": "audit",
  "Auditorias": "audits",
  "Graficos": "chart",
  "Plano de acao": "action-plan",
  "Documentacao": "documents",
  "Relatorios": "reports",
  "Tabelas": "tables",
  "NCs": "ncs",
  "Critico": "critical",
  "Areas atrasadas": "late",
  "Queda de ponto": "trend-down",
  "Subida de ponto": "trend-up",
  "Painel web": "web",
  "Configuracoes": "settings"
};

const palettes = {
  white: {
    line: "#ffffff",
    fine: "#ffffff",
    blue: "#ffffff",
    teal: "#ffffff",
    green: "#ffffff",
    orange: "#ffffff",
    red: "#ffffff",
    softBlue: "#ffffff",
    softGreen: "#ffffff",
    softOrange: "#ffffff",
    softRed: "#ffffff"
  },
  blue: {
    line: "#1f6fbd",
    fine: "#1f6fbd",
    blue: "#58a6ff",
    teal: "#14aeb6",
    green: "#35b85a",
    orange: "#f4a338",
    red: "#ef4c55",
    softBlue: "#58a6ff",
    softGreen: "#35b85a",
    softOrange: "#f4a338",
    softRed: "#ef4c55"
  }
};

function styleFor(palette) {
  return `
    .line { fill: none; stroke: ${palette.line}; stroke-width: 6; stroke-linecap: round; stroke-linejoin: round; }
    .fine { fill: none; stroke: ${palette.fine}; stroke-width: 4.8; stroke-linecap: round; stroke-linejoin: round; }
    .blue { fill: none; stroke: ${palette.blue}; stroke-width: 5.3; stroke-linecap: round; stroke-linejoin: round; }
    .teal { fill: none; stroke: ${palette.teal}; stroke-width: 5.3; stroke-linecap: round; stroke-linejoin: round; }
    .green { fill: none; stroke: ${palette.green}; stroke-width: 5.3; stroke-linecap: round; stroke-linejoin: round; }
    .orange { fill: none; stroke: ${palette.orange}; stroke-width: 5.3; stroke-linecap: round; stroke-linejoin: round; }
    .red { fill: none; stroke: ${palette.red}; stroke-width: 5.3; stroke-linecap: round; stroke-linejoin: round; }
    .softBlue { fill: ${palette.softBlue}; opacity: .14; stroke: none; }
    .softGreen { fill: ${palette.softGreen}; opacity: .14; stroke: none; }
    .softOrange { fill: ${palette.softOrange}; opacity: .14; stroke: none; }
    .softRed { fill: ${palette.softRed}; opacity: .14; stroke: none; }
  `;
}

const groupPattern = /<!--\s*\d+\s+([^>]+?)\s*-->\s*<g transform="translate\([^"]+\)">([\s\S]*?)<\/g>/g;
const groups = [...source.matchAll(groupPattern)];

for (const variant of Object.keys(palettes)) {
  fs.mkdirSync(path.join(root, "assets", "ui-icons", variant), { recursive: true });
}

for (const match of groups) {
  const label = match[1].trim();
  const fileName = names[label];
  if (!fileName) continue;

  const body = match[2]
    .replace(/^\s*<circle class="tile" r="116"\/>\s*/m, "")
    .trim();

  for (const [variant, palette] of Object.entries(palettes)) {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-88 -88 176 176" width="176" height="176">
  <defs>
    <style>${styleFor(palette)}</style>
  </defs>
  ${body}
</svg>
`;
    fs.writeFileSync(path.join(root, "assets", "ui-icons", variant, `${fileName}.svg`), svg);
  }
}

console.log(`Exported ${groups.length} icon groups.`);
