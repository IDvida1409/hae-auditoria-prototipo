const icons = {
  home: `<svg viewBox="0 0 24 24"><path d="M4 10.5 12 4l8 6.5"/><path d="M6.2 10v9.5h11.6V10"/><path d="M10 19.5v-5h4v5"/><path class="accent-blue" d="M12 8.2v3.6M10.2 10h3.6"/></svg>`,
  dashboard: `<svg viewBox="0 0 24 24"><rect x="4" y="4" width="6.2" height="6.2" rx="1.2"/><rect x="13.8" y="4" width="6.2" height="6.2" rx="1.2"/><rect x="4" y="13.8" width="6.2" height="6.2" rx="1.2"/><rect x="13.8" y="13.8" width="6.2" height="6.2" rx="1.2"/></svg>`,
  audit: `<svg viewBox="0 0 24 24"><path d="M8.7 5h6.6"/><path d="M9.4 3.3h5.2v3.3H9.4z"/><path d="M6.1 5.8h9.8c1 0 1.8.8 1.8 1.8v10.8c0 1-.8 1.8-1.8 1.8H6.1z"/><path class="accent-teal" d="m8.5 12.2 1.8 1.8 4.2-4.5"/><path class="accent-orange" d="m18.1 11 2.1.9-2.7 6.6-2.1-.9z"/></svg>`,
  list: `<svg viewBox="0 0 24 24"><path d="M8.1 4.7h7.1"/><path d="M7 5.8h9.2c1 0 1.8.8 1.8 1.8v10.2c0 1-.8 1.8-1.8 1.8H7z"/><path d="M18 7.5h1.1c.9 0 1.6.7 1.6 1.6v9.2"/><path class="accent-teal" d="m8.3 10 1.1 1.1 2.2-2.4M8.3 14.2l1.1 1.1 2.2-2.4"/><path d="M13 10.1h3M13 14.2h3"/></svg>`,
  grid: `<svg viewBox="0 0 24 24"><rect x="4" y="4" width="6.4" height="6.4" rx="1.4"/><rect x="13.6" y="4" width="6.4" height="6.4" rx="1.4"/><rect x="4" y="13.6" width="6.4" height="6.4" rx="1.4"/><rect x="13.6" y="13.6" width="6.4" height="6.4" rx="1.4"/></svg>`,
  chart: `<svg viewBox="0 0 24 24"><path d="M4 19.2h16"/><path d="M6 16.5v-4.2M10 16.5V9.5M14 16.5v-6M18 16.5V6.8"/><path class="accent-blue" d="M5.4 12.8 9.5 9.7l4.1 1.4 5-5"/><circle class="accent-blue" cx="9.5" cy="9.7" r="1"/><circle class="accent-blue" cx="13.6" cy="11.1" r="1"/><circle class="accent-blue" cx="18.6" cy="6.1" r="1"/></svg>`,
  action: `<svg viewBox="0 0 24 24"><path d="M5.6 5.4h9.9v13.2H5.6z"/><path d="M8.2 9.2h5.1M8.2 13h4.5"/><path class="accent-teal" d="m4.1 8.7 1 1 2.1-2.3M4.1 12.7l1 1 2.1-2.3"/><circle cx="17.6" cy="16.4" r="3.2"/><path class="accent-teal" d="m16.2 16.3 1 1 2.1-2.4"/></svg>`,
  document: `<svg viewBox="0 0 24 24"><path d="M4.6 8.3h6.1l1.7 2h6.9v7.7c0 1.1-.9 2-2 2H6.6c-1.1 0-2-.9-2-2z"/><path d="M6.2 5.4h6.4l2.1 2.5h3.2"/><path class="accent-teal" d="m14.6 15.9 1.3 1.3 3-3.3"/></svg>`,
  report: `<svg viewBox="0 0 24 24"><path d="M9 4.9h5.2l2.5 2.5V16H9z"/><path d="M14.2 4.9v2.5h2.5"/><circle cx="12.7" cy="10.8" r="3.5"/><path d="m15.3 13.4 3.8 3.8"/><path class="accent-orange" d="M5.2 19h1.6v-2.4M8.2 19h1.6v-4M11.2 19h1.6v-2.9"/><path class="accent-teal" d="m5.2 7.1 1 1 2-2.2"/></svg>`,
  plans: `<svg viewBox="0 0 24 24"><path d="M8.6 5h6.8"/><path d="M9.5 3.3h5v3.3h-5z"/><path d="M6.2 5.9h10.2v9.5H6.2z"/><path class="accent-teal" d="m8.2 10 1.1 1.1 2.2-2.4"/><path d="M12.8 10.1h2.2M8.2 14h4.2"/><circle cx="17" cy="17" r="3.5"/><path class="accent-orange" d="M17 14.8V17l1.6.9"/></svg>`,
  table: `<svg viewBox="0 0 24 24"><rect x="4" y="5" width="16" height="14" rx="1.4"/><path class="accent-blue" d="M4 9.7h16"/><path d="M4 14h16M9.4 5v14M14.8 5v14"/></svg>`,
  web: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.3"/><path d="M3.7 12h16.6"/><path d="M12 3.7c2 2.1 3 4.8 3 8.3s-1 6.2-3 8.3"/><path class="accent-teal" d="M12 3.7c-2 2.1-3 4.8-3 8.3s1 6.2 3 8.3"/></svg>`,
  settings: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3.2"/><path d="M19.2 13.6c.1-.5.1-1.1.1-1.6s0-1.1-.1-1.6l2-1.5-2-3.4-2.4 1a8 8 0 0 0-2.7-1.6L13.8 2h-3.6L9.8 4.9a8 8 0 0 0-2.7 1.6l-2.4-1-2 3.4 2 1.5a9 9 0 0 0 0 3.2l-2 1.5 2 3.4 2.4-1a8 8 0 0 0 2.7 1.6l.4 2.9h3.6l.4-2.9a8 8 0 0 0 2.7-1.6l2.4 1 2-3.4z"/></svg>`,
  calendar: `<svg viewBox="0 0 24 24"><path d="M7 3.5v3.2M17 3.5v3.2"/><rect x="4" y="5.8" width="16" height="14.2" rx="2"/><path d="M4 10h16"/><path d="M8 13.6h2.2M13.8 13.6H16M8 17h2.2"/></svg>`,
  filter: `<svg viewBox="0 0 24 24"><path d="M4.2 5.2h15.6l-6.1 7.1v5.1l-3.4 1.6v-6.7z"/></svg>`,
  bell: `<svg viewBox="0 0 24 24"><path d="M18 9.6a6 6 0 0 0-12 0c0 5.7-2.2 6.5-2.2 8h16.4c0-1.5-2.2-2.3-2.2-8z"/><path d="M10 20.3h4"/></svg>`,
  chevron: `<svg viewBox="0 0 24 24"><path d="m9 18 6-6-6-6"/></svg>`,
  arrow: `<svg viewBox="0 0 24 24"><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></svg>`,
  externalLink: `<svg viewBox="0 0 24 24"><path d="M14 4h6v6"/><path d="m10 14 10-10"/><path d="M20 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h5"/></svg>`,
  close: `<svg viewBox="0 0 24 24"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>`,
  warning: `<svg viewBox="0 0 24 24"><path d="m12 3.7 8.4 15.6H3.6z"/><path class="accent-red" d="M12 8.8v5.2M12 17.1h.01"/></svg>`,
  idea: `<svg viewBox="0 0 24 24"><path d="M9 18h6"/><path d="M10 21h4"/><path d="M8.4 14.2a6 6 0 1 1 7.2 0c-.6.5-.9 1.1-.9 1.8H9.3c0-.7-.3-1.3-.9-1.8z"/></svg>`,
  camera: `<svg viewBox="0 0 24 24"><path d="M5 7.5h3l2-3h4l2 3h3v12H5z"/><circle cx="12" cy="13.5" r="3.2"/></svg>`,
  target: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.8"/><circle cx="12" cy="12" r="1"/></svg>`,
  clock: `<svg viewBox="0 0 24 24"><circle cx="11.4" cy="11.4" r="7.5"/><path class="accent-orange" d="M11.4 7.2v4.5l3.2 1.8"/><rect x="15.1" y="15.1" width="5.2" height="5.2" rx="1"/><path d="M15.1 17.7h5.2M17.7 15.1v5.2"/></svg>`,
  trendingDown: `<svg viewBox="0 0 24 24"><path d="M4 6.5 8.8 11l3.8-2.1 4.4 4.3"/><path class="accent-red" d="M15.4 18.5h5v-5M20.4 18.5l-4.8-4.8"/><circle cx="8.8" cy="11" r=".9"/><circle cx="12.6" cy="8.9" r=".9"/></svg>`,
  trendingUp: `<svg viewBox="0 0 24 24"><path d="M4 17.5 8.8 13l3.8 2.1 4.4-4.3"/><path class="accent-green" d="M15.4 5.5h5v5M20.4 5.5l-4.8 4.8"/><circle cx="8.8" cy="13" r=".9"/><circle cx="12.6" cy="15.1" r=".9"/></svg>`,
  fileWarning: `<svg viewBox="0 0 24 24"><path d="M6.6 3.8h7l3.8 3.8v12.6H6.6z"/><path d="M13.6 3.8v3.8h3.8"/><path class="accent-orange" d="m15.8 12.2 3.8 6.7H12z"/><path class="accent-red" d="M15.8 14.6v1.8M15.8 18.1h.01"/></svg>`,
  shield: `<svg viewBox="0 0 24 24"><path d="M12 3 5 6v6c0 5 3.5 8 7 9 3.5-1 7-4 7-9V6z"/><path d="M12 8v8"/><path d="M8 12h8"/></svg>`
};

const areaData = [
  { id: "cozinha-catering", name: "Cozinha Catering", subtitle: "Preparo de refeições e distribuição", icon: "cozinha-catering.png", score: 9.3, last: 8.9, ncs: 1, critical: 0, pending: 1, status: "satisfatorio" },
  { id: "room-service", name: "Room Service", subtitle: "Serviço de quarto e atendimento", icon: "room-service.png", score: 8.8, last: 8.4, ncs: 2, critical: 0, pending: 1, status: "moderado" },
  { id: "cozinha-fria-sarp", name: "Cozinha Fria SARP", subtitle: "Preparo frio e conservação", icon: "cozinha-fria-sarp.png", score: 8.7, last: 8.2, ncs: 2, critical: 0, pending: 2, status: "moderado" },
  { id: "cozinha-sarp", name: "Cozinha SARP", subtitle: "Produção quente e preparo", icon: "cozinha-sarp.png", score: 8.6, last: 8.0, ncs: 3, critical: 0, pending: 2, status: "moderado" },
  { id: "cozinha-pedido-especial", name: "Cozinha Pedido Especial", subtitle: "Dietas especiais e enteral", icon: "cozinha-pedido-especial.png", score: 8.5, last: 8.1, ncs: 3, critical: 1, pending: 2, status: "moderado" },
  { id: "saladas", name: "Saladas", subtitle: "Preparo de saladas e alimentos frios", icon: "saladas.png", score: 8.4, last: 7.9, ncs: 4, critical: 1, pending: 2, status: "moderado" },
  { id: "distribuicao", name: "Distribuição", subtitle: "Fluxo de entrega quente e fria", icon: "distribuicao.png", score: 8.1, last: 7.7, ncs: 4, critical: 1, pending: 2, status: "moderado" },
  { id: "higienizacao-cubas", name: "Higienização de Cubas", subtitle: "Higienização de cubas e utensílios", icon: "higienizacao-cubas.png", score: 8.0, last: 7.8, ncs: 4, critical: 1, pending: 3, status: "moderado" },
  { id: "higienizacao-louca", name: "Higienização de Louça", subtitle: "Higienização de louças e talheres", icon: "higienizacao-louca.png", score: 7.9, last: 7.5, ncs: 5, critical: 1, pending: 3, status: "medio" },
  { id: "dml-produto-quimico", name: "DML - Produto Químico", subtitle: "Depósito de material de limpeza", icon: "dml-produto-quimico.png", score: 7.8, last: 7.2, ncs: 5, critical: 1, pending: 4, status: "medio" },
  { id: "area-residuos", name: "Área de Resíduos", subtitle: "Armazenamento e segregação de resíduos", icon: "area-residuos.png", score: 6.2, last: 7.1, ncs: 8, critical: 3, pending: 5, status: "critico" },
  { id: "documentacao", name: "Documentação", subtitle: "Documentos e registros obrigatórios", icon: "documentacao.png", score: 7.6, last: 7.3, ncs: 4, critical: 1, pending: 3, status: "medio" }
];

const statusMap = {
  satisfatorio: { label: "Baixo", legend: "Risco baixo", color: "#31aa42" },
  moderado: { label: "Moderado", legend: "Risco moderado", color: "#e9b300" },
  medio: { label: "Médio", legend: "Risco médio", color: "#f47b20" },
  critico: { label: "Alto", legend: "Risco alto", color: "#ee2f36" },
  naoAvaliado: { label: "Não avaliado", color: "#8a96a8" }
};

const subareaData = {
  "cozinha-catering": [
    { label: "Edificação e instalação", score: 9.4, status: "satisfatorio" },
    { label: "Pessoal: higiene, saúde e capacitação", score: 9.0, status: "satisfatorio" },
    { label: "Equipamentos, móveis e utensílios", score: 8.9, status: "moderado" },
    { label: "Acondicionamento", score: 9.2, status: "satisfatorio" },
    { label: "Preparo", score: 9.1, status: "satisfatorio" },
    { label: "Controle integrado de pragas", score: 8.8, status: "moderado" },
    { label: "Resíduos", score: 9.5, status: "satisfatorio" },
    { label: "Risco à saúde do consumidor", score: 9.3, status: "satisfatorio" }
  ],
  "room-service": [
    { label: "Entrega e conferência de refeições", score: 8.9, status: "moderado" },
    { label: "Controle de tempo e temperatura", score: 8.4, status: "moderado" },
    { label: "Higienização dos carros de transporte", score: 8.7, status: "moderado" },
    { label: "Identificação das dietas", score: 9.0, status: "satisfatorio" },
    { label: "Registros obrigatórios", score: 8.8, status: "moderado" }
  ],
  "cozinha-fria-sarp": [
    { label: "Recebimento e armazenamento frio", score: 8.9, status: "moderado" },
    { label: "Pré-preparo frio", score: 8.7, status: "moderado" },
    { label: "Higienização de hortifruti", score: 8.6, status: "moderado" },
    { label: "Controle de validade", score: 8.8, status: "moderado" },
    { label: "Utensílios e superfícies", score: 8.5, status: "moderado" }
  ],
  "cozinha-sarp": [
    { label: "Edificação e instalação", score: 8.8, status: "moderado" },
    { label: "Preparo e pré-preparo", score: 8.5, status: "moderado" },
    { label: "Cocção e tratamento térmico", score: 8.9, status: "moderado" },
    { label: "Manutenção térmica", score: 8.6, status: "moderado" },
    { label: "Controle integrado de pragas", score: 8.4, status: "moderado" }
  ],
  "cozinha-pedido-especial": [
    { label: "Dietas especiais", score: 8.7, status: "moderado" },
    { label: "Identificação e rastreabilidade", score: 8.6, status: "moderado" },
    { label: "Separação de fluxos", score: 8.3, status: "moderado" },
    { label: "Registros de preparo", score: 8.5, status: "moderado" }
  ],
  saladas: [
    { label: "Seleção e higienização", score: 8.5, status: "moderado" },
    { label: "Manipulação de alimentos frios", score: 8.2, status: "moderado" },
    { label: "Armazenamento e validade", score: 8.6, status: "moderado" },
    { label: "Utensílios e superfícies", score: 8.3, status: "moderado" }
  ],
  distribuicao: [
    { label: "Fluxo de distribuição", score: 8.3, status: "moderado" },
    { label: "Carros térmicos", score: 8.0, status: "moderado" },
    { label: "Tempo até entrega", score: 7.9, status: "medio" },
    { label: "Controle de temperatura", score: 8.1, status: "moderado" }
  ],
  "higienizacao-cubas": [
    { label: "Cubas e utensílios", score: 8.2, status: "moderado" },
    { label: "Produtos e diluição", score: 8.0, status: "moderado" },
    { label: "Secagem e armazenamento", score: 7.9, status: "medio" },
    { label: "Rotina de higienização", score: 8.1, status: "moderado" }
  ],
  "higienizacao-louca": [
    { label: "Lavagem e sanitização", score: 8.0, status: "moderado" },
    { label: "Controle de resíduos", score: 7.7, status: "medio" },
    { label: "Armazenamento pós-higienização", score: 7.9, status: "medio" }
  ],
  "dml-produto-quimico": [
    { label: "Armazenamento de químicos", score: 7.8, status: "medio" },
    { label: "Identificação dos produtos", score: 8.0, status: "moderado" },
    { label: "Validade e diluição", score: 7.6, status: "medio" },
    { label: "Acesso e organização", score: 7.9, status: "medio" }
  ],
  "area-residuos": [
    { label: "Segregação dos resíduos", score: 5.9, status: "critico" },
    { label: "Recipientes e tampas", score: 6.1, status: "critico" },
    { label: "Fluxo de armazenamento", score: 6.4, status: "critico" },
    { label: "Higienização da área", score: 6.2, status: "critico" },
    { label: "Risco à saúde do consumidor", score: 6.0, status: "critico" }
  ],
  documentacao: [
    { label: "Registros obrigatórios", score: 7.7, status: "medio" },
    { label: "Controle de validade", score: 7.4, status: "medio" },
    { label: "Evidências arquivadas", score: 7.8, status: "medio" },
    { label: "Planos de ação vinculados", score: 7.6, status: "medio" }
  ]
};

const actionStatusMeta = {
  pendente: { label: "Pendente", color: "var(--orange)" },
  andamento: { label: "Em andamento", color: "var(--blue-700)" },
  concluido: { label: "Concluído", color: "var(--green)" },
  atrasado: { label: "Atrasado", color: "var(--red)" }
};

const actionPlanData = {
  "area-residuos": [
    {
      title: "Reforçar segregação e tampa dos recipientes",
      block: "Recipientes e tampas",
      owner: "Higienização",
      status: "andamento",
      recurrent: true,
      improved: false,
      critical: true
    },
    {
      title: "Reorganizar armazenamento temporário",
      block: "Fluxo de armazenamento",
      owner: "Facilities",
      status: "pendente",
      recurrent: true,
      improved: false,
      critical: true
    },
    {
      title: "Registrar rotina diária de higienização",
      block: "Higienização da área",
      owner: "Supervisão",
      status: "pendente",
      recurrent: false,
      improved: null,
      critical: false
    }
  ],
  documentacao: [
    {
      title: "Atualizar licença sanitária no dossiê",
      block: "Documentos",
      owner: "Qualidade",
      status: "andamento",
      recurrent: true,
      improved: true,
      critical: true
    },
    {
      title: "Revisar planilhas de controle vencidas",
      block: "Planilhas",
      owner: "Nutrição",
      status: "pendente",
      recurrent: false,
      improved: null,
      critical: false
    },
    {
      title: "Vincular evidências do mês vigente",
      block: "Documentos",
      owner: "Auditoria",
      status: "concluido",
      recurrent: false,
      improved: true,
      critical: false
    }
  ],
  "dml-produto-quimico": [
    {
      title: "Padronizar identificação dos saneantes",
      block: "Identificação dos produtos",
      owner: "DML",
      status: "andamento",
      recurrent: true,
      improved: false,
      critical: true
    },
    {
      title: "Conferir validade e diluição dos produtos",
      block: "Validade e diluição",
      owner: "Supervisão",
      status: "pendente",
      recurrent: false,
      improved: null,
      critical: false
    }
  ],
  "higienizacao-louca": [
    {
      title: "Reforçar armazenamento pós-higienização",
      block: "Armazenamento pós-higienização",
      owner: "Operação",
      status: "pendente",
      recurrent: true,
      improved: false,
      critical: false
    }
  ],
  distribuicao: [
    {
      title: "Monitorar tempo até entrega",
      block: "Tempo até entrega",
      owner: "Distribuição",
      status: "andamento",
      recurrent: false,
      improved: true,
      critical: false
    }
  ]
};

const navItems = [
  ["home", "Início", "home"],
  ["start", "Iniciar auditoria", "audit"],
  ["audits", "Auditorias", "list"],
  ["charts", "Gráficos", "chart"],
  ["actions", "Planos de Ação", "action"],
  ["docs", "Documentos", "document"],
  ["reports", "Relatórios", "report"],
  ["tables", "Tabelas", "table"],
  ["web", "Painel web", "web"],
  ["settings", "Configurações", "settings"]
];

const uiIconFiles = {
  home: "home",
  dashboard: "dashboard",
  grid: "dashboard",
  audit: "audit",
  list: "audits",
  chart: "chart",
  action: "action-plan",
  plans: "action-plan",
  document: "documents",
  report: "reports",
  table: "tables",
  fileWarning: "ncs",
  warning: "critical",
  clock: "late",
  trendingDown: "trend-down",
  trendingUp: "trend-up",
  web: "web"
};

const approvedUiIconFiles = new Set([
  "dashboard",
  "audit",
  "audits",
  "chart",
  "action-plan",
  "documents",
  "reports",
  "tables",
  "ncs",
  "critical",
  "late",
  "trend-down",
  "trend-up"
]);

const months = [
  ["jan/26", "#f4a000"],
  ["fev/26", "#7c4dff"],
  ["mar/26", "#ee2f36"],
  ["abr/26", "#31aa42"],
  ["mai/26", "#9b59b6"],
  ["jun/26", "#8b5a2b"],
  ["jul/26", "#00a6a6"],
  ["ago/26", "#1f2937"],
  ["set/26", "#78c943"],
  ["out/26", "#d946ef"],
  ["nov/26", "#24b8dc"],
  ["dez/26", "#f47b20"]
];

const currentMonthId = "ago/26";
const futureMonthIds = new Set(["set/26", "out/26", "nov/26", "dez/26"]);
const stateStorageKey = "hae-auditoria-state-v1";

const monthLines = {
  "jan/26": [5.0, 6.1, 5.2, 6.0, 8.0, 6.1, 5.3, 5.0, 4.6, 5.2, 4.8, 4.5],
  "fev/26": [6.2, 6.5, 6.1, 6.8, 7.0, 6.4, 6.0, 5.8, 5.6, 5.5, 5.2, 5.1],
  "mar/26": [6.8, 6.9, 6.4, 7.1, 7.4, 6.9, 6.4, 6.2, 5.9, 5.8, 5.5, 5.2],
  "abr/26": [7.4, 7.2, 7.0, 7.6, 7.7, 7.2, 6.8, 6.6, 6.3, 6.1, 5.8, 5.6],
  "mai/26": [7.8, 7.7, 7.5, 8.0, 8.1, 7.5, 7.2, 6.8, 6.5, 6.3, 6.0, 5.8],
  "jun/26": [8.2, 8.0, 7.9, 8.1, 8.3, 7.6, 7.3, 7.1, 6.7, 6.4, 6.2, 6.0],
  "jul/26": [8.9, 8.4, 8.2, 8.0, 8.1, 7.9, 7.7, 7.8, 7.5, 7.2, 7.1, 7.3],
  "ago/26": [9.3, 8.8, 8.7, 8.6, 8.5, 8.4, 8.1, 8.0, 7.9, 7.8, 6.2, 7.6],
  "set/26": null,
  "out/26": null,
  "nov/26": null,
  "dez/26": null
};

const checklistData = window.HAE_CHECKLIST_DATA || {};

const answerMeta = {
  C: { label: "Conforme", short: "C", color: "var(--green)" },
  NC: { label: "Não Conforme", short: "NC", color: "var(--red)" },
  X: { label: "Não Avaliado", short: "X", color: "var(--ink-600)" }
};

const riskMeta = {
  none: { label: "Sem risco", color: "#8a96a8" },
  baixo: { label: "Baixo", color: "var(--green)" },
  moderado: { label: "Moderado", color: "var(--yellow)" },
  medio: { label: "Médio", color: "var(--orange)" },
  critico: { label: "Alto", color: "var(--red)" }
};

const foodTableSections = [
  {
    id: "recebimento",
    title: "Recebimento",
    subtitle: "Entrada e conferência dos alimentos",
    icon: "tabela-recebimento.png",
    accent: "#d7a86e",
    items: [
      { item: "Congelados", values: [{ temperature: "< -12,0 ºC", validity: "Conforme fabricante" }] },
      { item: "Pescados resfriados crus", values: [{ temperature: "< 3,0 ºC", validity: "Conforme fabricante" }] },
      { item: "Preparação pronta para consumo com pescado cru ou carne bovina crua", values: [{ temperature: "< 5,0 ºC", validity: "Conforme fabricante" }] },
      { item: "Produtos de panificação e confeitaria com coberturas e recheios que necessitem de refrigeração", values: [{ temperature: "< 5,0 ºC", validity: "Conforme fabricante" }] },
      { item: "Carnes e derivados resfriados crus", values: [{ temperature: "< 7,0 ºC", validity: "Conforme fabricante" }] },
      { item: "Frutas, verduras e legumes higienizados, fracionados ou descascados, ovos, leite e derivados, sucos e polpas", values: [{ temperature: "< 10,0 ºC", validity: "Conforme fabricante" }] },
      { item: "Demais produtos resfriados", values: [{ temperature: "< 10,0 ºC", validity: "Conforme fabricante" }] },
      { item: "Produtos quentes", values: [{ temperature: "> 60,0 ºC", validity: "Conforme fabricante" }] }
    ]
  },
  {
    id: "armazenamento",
    title: "Armazenamento",
    subtitle: "Validade após abertura e conservação",
    icon: "tabela-armazenamento.png",
    accent: "#9f85d8",
    items: [
      {
        item: "Congelados industrializados",
        values: [
          { temperature: "de 0,0 ºC a -5,0 ºC", validity: "10 dias" },
          { temperature: "de -6,0 ºC a -10,0 ºC", validity: "20 dias" },
          { temperature: "de -11,0 ºC a -18,0 ºC", validity: "30 dias" },
          { temperature: "< -18,0 ºC", validity: "90 dias" }
        ]
      },
      { item: "Pescados pós-cocção", values: [{ temperature: "< 2,0 ºC", validity: "1 dia" }] },
      { item: "Pescados e seus produtos manipulados crus", values: [{ temperature: "< 2,0 ºC", validity: "3 dias" }] },
      { item: "Espetos mistos, bife rolê, carnes empanadas cruas e preparações com carne moída", values: [{ temperature: "< 4,0 ºC", validity: "2 dias" }] },
      { item: "Carne bovina, carne suína, aves e seus produtos manipulados crus", values: [{ temperature: "< 4,0 ºC", validity: "3 dias" }] },
      { item: "Frios e embutidos fatiados, picados ou moídos", values: [{ temperature: "< 4,0 ºC", validity: "3 dias" }] },
      { item: "Alimento pós-cocção, exceto pescados", values: [{ temperature: "< 4,0 ºC", validity: "3 dias" }] },
      { item: "Outros produtos preparados", values: [{ temperature: "< 4,0 ºC", validity: "3 dias" }] },
      { item: "Frutas, verduras e legumes higienizados, fracionados ou descascados, sucos, polpas e caldo de cana", values: [{ temperature: "< 5,0 ºC", validity: "3 dias" }] },
      { item: "Produtos de panificação e confeitaria prontos para consumo com coberturas ou recheios refrigerados", values: [{ temperature: "< 5,0 ºC", validity: "5 dias" }] },
      { item: "Leite e derivados", values: [{ temperature: "< 7,0 ºC", validity: "5 dias" }] },
      { item: "Ovos e outros produtos", values: [{ temperature: "< 10,0 ºC", validity: "7 dias" }] },
      {
        item: "Maionese e misturas de maionese com outros alimentos",
        values: [
          { temperature: "de 4,0 ºC a 6,0 ºC", validity: "1 dia" },
          { temperature: "< 4,0 ºC", validity: "2 dias" }
        ]
      },
      {
        item: "Sobremesas e outras preparações com laticínios",
        values: [
          { temperature: "de 6,1 ºC a 8,0 ºC", validity: "1 dia" },
          { temperature: "de 4,1 ºC a 6,0 ºC", validity: "2 dias" },
          { temperature: "< 4,0 ºC", validity: "3 dias" }
        ]
      }
    ]
  },
  {
    id: "pre-preparo",
    title: "Pré-preparo / Preparo",
    subtitle: "Processos térmicos e manipulação",
    icon: "tabela-pre-preparo.png",
    accent: "#96ad78",
    items: [
      { item: "Dessalgue", values: [{ temperature: "< 5,0 ºC", validity: "" }, { temperature: "Fervura", validity: "" }] },
      { item: "Descongelamento", values: [{ temperature: "< 5,0 ºC", validity: "" }, { temperature: "Micro-ondas ou forno de convecção", validity: "" }] },
      { item: "Cocção", values: [{ temperature: "> 74,0 ºC", validity: "" }, { temperature: "70,0 ºC por 2 minutos", validity: "" }, { temperature: "65,0 ºC por 15 minutos", validity: "" }] },
      { item: "Resfriamento", values: [{ temperature: "de 60,0 ºC para 10,0 ºC em 2 horas", validity: "" }] },
      { item: "Reaquecimento", values: [{ temperature: "> 74,0 ºC", validity: "" }] },
      { item: "Óleo e gordura", values: [{ temperature: "< 180,0 ºC", validity: "" }] },
      { item: "Ovo cozido", values: [{ temperature: "Fervura por 7 minutos", validity: "" }] },
      { item: "Ovo frito", values: [{ temperature: "Gema dura", validity: "" }] },
      { item: "Manipulação de alimento à temperatura ambiente", values: [{ temperature: "no máximo 30 minutos por lote", validity: "" }] },
      { item: "Manipulação de alimento em área climatizada", values: [{ temperature: "de 12,0 ºC a 18,0 ºC no máximo 2 horas por lote", validity: "" }] }
    ]
  },
  {
    id: "distribuicao",
    title: "Distribuição",
    subtitle: "Alimentos prontos para consumo",
    icon: "tabela-distribuicao.png",
    accent: "#b28a72",
    items: [
      { item: "Alimento pronto para consumo - carnes ou pescados crus", values: [{ temperature: "< 5,0 ºC", validity: "2 horas" }] },
      { item: "Alimento pronto para consumo - frio", values: [{ temperature: "de 10,0 ºC a 21,0 ºC", validity: "2 horas" }, { temperature: "< 10,0 ºC", validity: "4 horas" }] },
      { item: "Alimento pronto para consumo - quente", values: [{ temperature: "< 60,0 ºC", validity: "1 hora" }, { temperature: "> 60,0 ºC", validity: "6 horas" }] },
      { item: "Balcão térmico (água)", values: [{ temperature: "de 80,0 ºC a 90,0 ºC", validity: "Troca diária de água" }] }
    ]
  }
];

function defaultState() {
  return {
    view: "home",
    sidebarCollapsed: false,
    selectedArea: "area-residuos",
    chartFocusArea: null,
    chartExpanded: false,
    chartMode: "scores",
    selectedMonth: currentMonthId,
    answers: {},
    detailBlock: null,
    detailActionsOpen: false,
    detailFilter: "all",
    checklistBlock: null,
    checklistPage: 0,
    checklistBlocksOpen: false,
    openTableSection: "recebimento",
    leaveAuditConfirm: false
  };
}

function persistableState(source = state) {
  return {
    view: source.view,
    sidebarCollapsed: source.sidebarCollapsed,
    selectedArea: source.selectedArea,
    chartFocusArea: source.chartFocusArea,
    chartMode: source.chartMode,
    selectedMonth: source.selectedMonth,
    answers: source.answers,
    checklistBlock: source.checklistBlock,
    checklistPage: source.checklistPage,
    openTableSection: source.openTableSection
  };
}

function normalizeSavedState(saved = {}) {
  const base = defaultState();
  const validViews = new Set([...navItems.map(([id]) => id), "area", "checklist"]);
  const validAreaIds = new Set(areaData.map((area) => area.id));
  const validMonthIds = new Set(months.map(([monthId]) => monthId));
  const merged = { ...base, ...saved };
  return {
    ...merged,
    view: validViews.has(merged.view) ? merged.view : base.view,
    selectedArea: validAreaIds.has(merged.selectedArea) || merged.selectedArea === "" ? merged.selectedArea : base.selectedArea,
    chartFocusArea: validAreaIds.has(merged.chartFocusArea) ? merged.chartFocusArea : null,
    chartExpanded: false,
    chartMode: merged.chartMode === "actions" ? "actions" : "scores",
    selectedMonth: validMonthIds.has(merged.selectedMonth) ? merged.selectedMonth : currentMonthId,
    answers: merged.answers && typeof merged.answers === "object" ? merged.answers : {},
    detailBlock: null,
    detailActionsOpen: false,
    detailFilter: "all",
    checklistBlocksOpen: false,
    leaveAuditConfirm: false
  };
}

function readSavedState() {
  try {
    return normalizeSavedState(JSON.parse(localStorage.getItem(stateStorageKey) || "{}"));
  } catch {
    return defaultState();
  }
}

let state = readSavedState();
let backendReady = false;
let backendSaveTimer = null;

const app = document.getElementById("app");

function saveState() {
  const snapshot = persistableState();
  try {
    localStorage.setItem(stateStorageKey, JSON.stringify(snapshot));
  } catch {
    // O navegador pode bloquear storage em alguns modos; nesse caso a API ainda tenta salvar.
  }

  if (!backendReady || location.protocol === "file:") return;
  clearTimeout(backendSaveTimer);
  backendSaveTimer = setTimeout(() => {
    fetch("/api/state", {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ state: snapshot })
    }).catch(() => {});
  }, 250);
}

async function hydrateStateFromBackend() {
  if (location.protocol === "file:") return;
  try {
    const response = await fetch("/api/state", { cache: "no-store" });
    if (!response.ok) return;
    const payload = await response.json();
    if (payload?.state) {
      state = normalizeSavedState({ ...persistableState(), ...payload.state });
      render({ skipSave: true });
    }
    backendReady = true;
  } catch {
    backendReady = false;
  }
}

function registerServiceWorker() {
  if (!("serviceWorker" in navigator) || location.protocol === "file:") return;
  navigator.serviceWorker.register("/sw.js").catch(() => {});
}

function formatScore(value) {
  return value.toFixed(1).replace(".", ",");
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[char]);
}

function areaById(id) {
  return areaData.find((area) => area.id === id) || areaData[0];
}

function areaChecklist(areaOrId) {
  const areaId = typeof areaOrId === "string" ? areaOrId : areaOrId.id;
  return checklistData[areaId] || { sheetName: "", totalQuestions: 0, blocks: [] };
}

function blocksForArea(areaOrId) {
  return areaChecklist(areaOrId).blocks || [];
}

function questionsForArea(areaOrId) {
  return blocksForArea(areaOrId).flatMap((block) => block.questions || []);
}

function answersForArea(areaId) {
  return state.answers[areaId] || {};
}

function answerForQuestion(areaId, question) {
  return answersForArea(areaId)[question.id] || null;
}

function scoreStatus(score) {
  if (score >= 9) return "satisfatorio";
  if (score >= 8) return "moderado";
  if (score >= 7) return "medio";
  return "critico";
}

function simulatedBlockScore(area, block, index) {
  const riskTotal = (block.questions || []).reduce((sum, question) => sum + (question.risk || 0), 0);
  const riskPenalty = Math.min(1.1, riskTotal / Math.max(160, (block.questions || []).length * 42));
  const rhythm = ((index % 5) - 2) * 0.16;
  return clamp(area.score + rhythm - riskPenalty + 0.28, 4.8, 9.7);
}

function blockSummaries(area) {
  return blocksForArea(area).map((block, index) => {
    const questions = block.questions || [];
    const score = simulatedBlockScore(area, block, index);
    const sourceCounts = countsFromRows(questionRowsForArea(area).filter((row) => row.blockId === block.id));
    return {
      id: block.id,
      label: block.title,
      title: block.title,
      score,
      status: scoreStatus(score),
      questions,
      sourceCounts
    };
  });
}

function questionRowsForArea(area) {
  const areaAnswers = answersForArea(area.id);
  const rows = blocksForArea(area).flatMap((block) =>
    (block.questions || []).map((question) => ({
      ...question,
      blockId: block.id,
      blockTitle: block.title
    }))
  );
  const candidates = rows
    .filter((question) => question.sourceAnswer !== "X")
    .sort((a, b) => (b.risk || 0) - (a.risk || 0) || a.number - b.number);
  const ncIds = new Set(candidates.slice(0, Math.min(area.ncs, candidates.length)).map((question) => question.id));

  return rows.map((question) => ({
    ...question,
    answer: areaAnswers[question.id] || (question.sourceAnswer === "X" ? "X" : ncIds.has(question.id) ? "NC" : "C")
  }));
}

function countsFromRows(rows) {
  return rows.reduce(
    (counts, row) => {
      counts[row.answer] = (counts[row.answer] || 0) + 1;
      return counts;
    },
    { C: 0, NC: 0, X: 0 }
  );
}

function riskSummary(area) {
  const base = { baixo: 0, moderado: 0, medio: 0, critico: 0 };
  questionRowsForArea(area).filter((question) => question.answer === "NC").forEach((question) => {
    if (base[question.riskLevel] !== undefined) base[question.riskLevel] += 1;
  });
  const max = Math.max(1, ...Object.values(base));
  return Object.entries(base).map(([level, count]) => ({
    level,
    count,
    width: Math.max(10, Math.round((count / max) * 86))
  }));
}

function actionPlansForArea(area) {
  const configured = actionPlanData[area.id];
  if (configured?.length) return configured;
  const blocks = blockSummaries(area);
  const lowestBlock = [...blocks].sort((a, b) => a.score - b.score)[0];
  return [
    {
      title: `Corrigir não conformidades de ${lowestBlock?.title || area.name}`,
      block: lowestBlock?.title || area.name,
      owner: "Responsável da área",
      status: area.pending > 2 ? "pendente" : "andamento",
      recurrent: area.ncs > 3,
      improved: area.score >= area.last,
      critical: area.critical > 0
    }
  ];
}

function actionPlanStats(area) {
  const plans = actionPlansForArea(area);
  return {
    total: plans.length,
    pending: plans.filter((plan) => plan.status === "pendente").length,
    inProgress: plans.filter((plan) => plan.status === "andamento").length,
    done: plans.filter((plan) => plan.status === "concluido").length,
    late: plans.filter((plan) => plan.status === "atrasado").length,
    recurrent: plans.filter((plan) => plan.recurrent).length,
    improved: plans.filter((plan) => plan.improved === true).length,
    noEffect: plans.filter((plan) => plan.improved === false).length,
    critical: plans.filter((plan) => plan.critical).length
  };
}

function sortedBest() {
  return [...areaData].sort((a, b) => b.score - a.score).slice(0, 3);
}

function sortedAttention() {
  return [...areaData].sort((a, b) => a.score - b.score).slice(0, 3);
}

function generalScore() {
  return areaData.reduce((sum, area) => sum + area.score, 0) / areaData.length;
}

function monthAverage(monthId) {
  const values = monthLines[monthId];
  if (!Array.isArray(values) || !values.length) return null;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function availableMonthIds() {
  return months.map(([id]) => id).filter((id) => Array.isArray(monthLines[id]));
}

function comparisonMonths() {
  return months;
}

function chartLabelLines(name) {
  const labels = {
    "Cozinha Catering": ["COZINHA", "CATERING"],
    "Room Service": ["ROOM", "SERVICE"],
    "Cozinha Fria SARP": ["COZINHA", "FRIA SARP"],
    "Cozinha SARP": ["COZINHA", "SARP"],
    "Cozinha Pedido Especial": ["COZINHA", "PEDIDO", "ESPECIAL"],
    Saladas: ["SALADAS"],
    Distribuição: ["DISTRIBUIÇÃO"],
    "Higienização de Cubas": ["HIGIENIZAÇÃO", "DE CUBAS"],
    "Higienização de Louça": ["HIGIENIZAÇÃO", "DE LOUÇA"],
    "DML - Produto Químico": ["DML", "PRODUTO", "QUÍMICO"],
    "Área de Resíduos": ["ÁREA DE", "RESÍDUOS"],
    Documentação: ["DOCUMENTAÇÃO"]
  };
  return labels[name] || [name.toUpperCase()];
}

function chartAxisLabel(name) {
  return name
    .replace("Cozinha Pedido Especial", "Pedido Especial")
    .replace("DML - Produto Químico", "DML - Produto Químico")
    .toUpperCase();
}

function assetIcon(name, variant = "blue", className = "asset-img") {
  const file = uiIconFiles[name];
  if (!file) return icons[name] || "";
  const isApproved = approvedUiIconFiles.has(file);
  const folder = isApproved ? "ui-icons-approved" : "ui-icons";
  const ext = isApproved ? "png" : "svg";
  return `<img class="${className} ui-icon-${file}" src="assets/${folder}/${variant}/${file}.${ext}?v=density-2" alt="" aria-hidden="true" />`;
}

function svgIcon(name, className = "tiny-icon", variant = "blue") {
  if (uiIconFiles[name]) {
    return `<span class="${className} asset-icon-holder">${assetIcon(name, variant)}</span>`;
  }
  return `<span class="${className}">${icons[name] || ""}</span>`;
}

function setView(view) {
  state.view = view;
  render();
}

function setSelectedArea(id) {
  state.selectedArea = id;
  render();
}

function goAreaDetail(id = state.selectedArea) {
  state.selectedArea = id;
  state.detailBlock = null;
  state.detailActionsOpen = false;
  state.detailFilter = "all";
  state.view = "area";
  render();
}

function sidebar() {
  return `
    <aside class="sidebar">
      <div class="brand">
        <div class="brand-mark brand-logo">
          <img src="assets/einstein-logo-transparent.png?v=einstein-transparent-1" alt="Hospital Israelita Einstein" />
        </div>
      </div>
      <nav class="nav-list" aria-label="Navegação principal">
        ${navItems
          .map(
            ([id, label, icon]) => `
              <button class="nav-item ${state.view === id ? "is-active" : ""}" data-nav="${id}" title="${label}">
                <span class="nav-icon">${assetIcon(icon, "white")}</span>
                <span class="nav-label">${label}</span>
              </button>
            `
          )
          .join("")}
      </nav>
      <img class="sidebar-hospital-art" src="assets/morumbi-hospital-lineart.png?v=sidebar-art-3" alt="" aria-hidden="true" />
      <div class="sidebar-footer">
        <button class="collapse-btn" data-toggle-sidebar title="Recolher menu">
          ${state.sidebarCollapsed ? icons.chevron : icons.chevron.replace("m9 18 6-6-6-6", "m15 18-6-6 6-6")}
        </button>
      </div>
    </aside>
  `;
}

function topbarMeta() {
  const titles = {
    home: ["Dashboard de auditoria", "Agosto 2026", "dashboard"],
    start: ["Iniciar auditoria", "Selecione a área que deseja auditar", "audit"],
    audits: ["Auditorias", "Histórico mensal das auditorias", "list"],
    charts: ["Gráficos", "Agosto 2026", "chart"],
    actions: ["Planos de Ação", "Não conformidades e responsáveis", "action"],
    docs: ["Documentos", "Controle de validade documental", "document"],
    reports: ["Relatórios", "Consolidados por área auditada", "report"],
    tables: ["Tabela de Temperatura e Validade", "Dos alimentos", "table"],
    web: ["Painel web", "Acesso administrativo e documentos", "web"],
    hands: ["Higiene das mãos", "Controle de rotina conforme legislação", "hand"],
    settings: ["Configurações", "Metas, usuários e parâmetros", "settings"],
    area: [areaById(state.selectedArea).name, "Dashboard completo da área", "grid"],
    checklist: [areaById(state.selectedArea).name, areaById(state.selectedArea).subtitle, "audit"]
  };
  return titles[state.view] || titles.home;
}

function topbar() {
  const [title, kicker, icon] = topbarMeta();
  const showBack = state.view === "area" || state.view === "checklist";
  const hideTitle = state.view === "tables";
  return `
    <header class="topbar ${hideTitle ? "is-title-hidden" : ""}">
      ${hideTitle ? `<div class="title-group title-group-empty" aria-hidden="true"></div>` : `
        <div class="title-group">
          ${showBack ? `<button class="back-btn" data-back>${icons.chevron.replace('m9 18 6-6-6-6', 'm15 18-6-6 6-6')}</button>` : `<div class="screen-icon">${assetIcon(icon, "white")}</div>`}
          <div>
            ${state.view === "area" || state.view === "checklist" ? `<div class="breadcrumb">Dashboard de auditoria <span>›</span> ${state.view === "checklist" ? "Iniciar auditoria" : "Áreas"} <span>›</span> ${title}</div>` : ""}
            <h1>${title}</h1>
            <span class="screen-kicker">${kicker}</span>
          </div>
        </div>
      `}
      <div class="top-actions">
        <button class="top-pill">${svgIcon("calendar")} Agosto 2026 <span>⌄</span></button>
        <button class="ghost-btn">${svgIcon("filter")} Filtros</button>
        <button class="icon-btn" title="Notificações">${icons.bell}<span class="notification-dot">3</span></button>
        <div class="avatar" aria-label="Usuária"></div>
      </div>
    </header>
  `;
}

function areaTile(area, compact = false) {
  const status = statusMap[area.status];
  return `
    <button class="area-tile ${area.id === state.selectedArea ? "is-selected" : ""}" data-area="${area.id}" style="--status-color:${status.color}" aria-label="${area.name}, nota ${formatScore(area.score)}">
      <span class="tile-check">✓</span>
      <span class="area-icon-wrap"><img class="area-icon" src="assets/icons/${area.icon}" alt="" /></span>
      <span class="area-name">${area.name}</span>
      <span class="area-score">${formatScore(area.score)}</span>
    </button>
  `;
}

function quickMetrics(area) {
  const improved = area.score >= area.last;
  return `
    <div class="quick-metrics">
      <div class="quick-metric"><span class="quick-icon danger">${assetIcon("fileWarning", "blue")}</span><b>${area.ncs}</b><span>NCs</span></div>
      <div class="quick-metric"><span class="quick-icon danger">${assetIcon("warning", "blue")}</span><b>${area.critical}</b><span>críticas</span></div>
      <div class="quick-metric"><span class="quick-icon ${improved ? "positive" : "danger"}">${assetIcon(improved ? "trendingUp" : "trendingDown", "blue")}</span><b>${formatScore(Math.abs(area.score - area.last))}</b><span>${improved ? "ganho" : "queda"} de ponto</span></div>
      <div class="quick-metric"><span class="quick-icon warn">${assetIcon("plans", "blue")}</span><b>${area.pending}</b><span>planos pendentes</span></div>
    </div>
  `;
}

function selectedPanel() {
  if (!state.selectedArea) {
    return "";
  }
  const area = areaById(state.selectedArea);
  const status = statusMap[area.status];
  const attentionText =
    area.id === "area-residuos"
      ? "Maior atenção em segregação, tampa dos recipientes e armazenamento."
      : "Acompanhar os itens não conformes para manter a evolução da nota.";
  return `
    <aside class="selected-panel surface">
      <button class="panel-close" data-clear-selection title="Fechar detalhe">${icons.close}</button>
      <h2>Área selecionada</h2>
      <div class="selected-area-head" style="--status-color:${status.color}">
        <img class="selected-icon" src="assets/icons/${area.icon}" alt="" />
        <div class="selected-area-copy">
          <h2>${area.name}</h2>
          <div class="selected-status-line">
            <div class="selected-score">${formatScore(area.score)} <small>/10</small></div>
            <span class="status-pill color-only" title="${status.legend || status.label}" aria-label="${status.legend || status.label}"></span>
          </div>
        </div>
      </div>
      ${quickMetrics(area)}
      <div class="attention-note">${svgIcon("idea")} <span>${attentionText}</span></div>
      <div>
        <div class="side-title">Principais não conformidades</div>
        <div class="ncs-list">
          <div class="nc-row">${svgIcon("warning")} <span>Recipiente sem tampa acionada sem contato manual</span><span class="nc-tag is-nc" style="--tag:var(--red)">NC</span><span>›</span></div>
          <div class="nc-row">${svgIcon("warning")} <span>Separação e armazenamento fora do fluxo esperado</span><span class="nc-tag is-risk-capsule" style="--tag:var(--red)" title="Risco alto" aria-label="Risco alto"></span><span>›</span></div>
          <div class="nc-row">${svgIcon("warning")} <span>Rotina de higienização com evidência pendente</span><span class="nc-tag is-risk-capsule" style="--tag:var(--orange)" title="Risco médio" aria-label="Risco médio"></span><span>›</span></div>
        </div>
      </div>
      <div class="detail-links">
        <button class="primary-btn" data-area-detail="${area.id}">Ver análise completa da área ${svgIcon("arrow")}</button>
        <button class="link-inline" data-area-detail="${area.id}">Expandir área ${svgIcon("externalLink")}</button>
      </div>
    </aside>
  `;
}

function lineChart(points, color = "#0a6cff", height = 112) {
  const w = 420;
  const h = height;
  const pad = 22;
  const xStep = (w - pad * 2) / (points.length - 1);
  const toY = (value) => h - pad - ((value - 4) / 6) * (h - pad * 2);
  const d = points.map((value, i) => `${i === 0 ? "M" : "L"}${pad + i * xStep},${toY(value)}`).join(" ");
  const area = `${d} L${w - pad},${h - pad} L${pad},${h - pad} Z`;
  return `
    <svg class="mini-chart" viewBox="0 0 ${w} ${h}" role="img" aria-label="Evolução de notas">
      <path d="${area}" fill="${color}" opacity=".10"></path>
      <path d="${d}" fill="none" stroke="${color}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path>
      ${points
        .map((value, i) => `<circle cx="${pad + i * xStep}" cy="${toY(value)}" r="5" fill="#fff" stroke="${color}" stroke-width="3"></circle>`)
        .join("")}
    </svg>
  `;
}

function areaEvolutionChart(area) {
  const areaIndex = areaData.findIndex((item) => item.id === area.id);
  const chartMonths = months.slice(0, 8).map(([id]) => id);
  const labels = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago"];
  const points = chartMonths.map((monthId) => monthLines[monthId]?.[areaIndex] ?? area.score);
  const color = area.score < area.last ? "#ee2f36" : "#31aa42";
  const w = 540;
  const h = 166;
  const pad = { left: 22, right: 22, top: 24, bottom: 30 };
  const minValue = Math.min(...points, 8) - 0.25;
  const maxValue = Math.max(...points, 8) + 0.25;
  const range = Math.max(1, maxValue - minValue);
  const xStep = (w - pad.left - pad.right) / (points.length - 1);
  const yFor = (value) => pad.top + (maxValue - value) * ((h - pad.top - pad.bottom) / range);
  const d = points
    .map((value, index) => `${index === 0 ? "M" : "L"}${pad.left + index * xStep},${yFor(value)}`)
    .join(" ");

  return `
    <svg class="area-evolution-chart" viewBox="0 0 ${w} ${h}" role="img" aria-label="Evolução mensal da nota da área">
      <line x1="${pad.left}" y1="${h - pad.bottom}" x2="${w - pad.right}" y2="${h - pad.bottom}" stroke="#e4e9f0" stroke-width="1" />
      <line x1="${pad.left}" y1="${yFor(8)}" x2="${w - pad.right}" y2="${yFor(8)}" stroke="#d7eadc" stroke-width="1.2" />
      <path d="${d}" fill="none" stroke="${color}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"></path>
      ${points
        .map((value, index) => {
          const x = pad.left + index * xStep;
          const y = yFor(value);
          return `
            <rect x="${x - 16}" y="${y - 25}" width="32" height="17" rx="8.5" fill="#ffffff" stroke="#d7e4d9" stroke-width="1"></rect>
            <text x="${x}" y="${y - 13}" text-anchor="middle" fill="${color}" font-size="9.5" font-weight="780">${formatScore(value)}</text>
            <circle cx="${x}" cy="${y}" r="4" fill="#ffffff" stroke="${color}" stroke-width="2.5"></circle>
            <text x="${x}" y="${h - 8}" text-anchor="middle" fill="#425474" font-size="9.5" font-weight="740">${labels[index]}</text>
          `;
        })
        .join("")}
    </svg>
  `;
}

function dashboardEvolution(area = null) {
  const chartMonths = months.slice(5, 8).map(([id]) => id);
  const monthsLabel = ["Jun", "Jul", "Ago"];
  const areaIndex = area ? areaData.findIndex((item) => item.id === area.id) : -1;
  const points = chartMonths.map((monthId) => {
    if (area) return monthLines[monthId]?.[areaIndex] ?? area.score;
    return monthAverage(monthId) ?? generalScore();
  });
  const latest = points[points.length - 1];
  const previous = points[points.length - 2] ?? latest;
  const color = latest < previous ? "#ee2f36" : "#2f8f46";
  const w = 360;
  const h = 112;
  const pad = { left: 26, right: 26, top: 24, bottom: 24 };
  const minValue = Math.min(...points, 8) - 0.25;
  const maxValue = Math.max(...points, 8) + 0.25;
  const range = Math.max(1, maxValue - minValue);
  const xStep = (w - pad.left - pad.right) / (points.length - 1);
  const yFor = (value) => pad.top + (maxValue - value) * ((h - pad.top - pad.bottom) / range);
  const d = points
    .map((value, index) => `${index === 0 ? "M" : "L"}${pad.left + index * xStep},${yFor(value)}`)
    .join(" ");
  const labelPill = (value, index) => {
    const x = pad.left + index * xStep;
    const y = yFor(value) - 15;
    return `
      <rect x="${x - 17}" y="${y - 10}" width="34" height="18" rx="9" fill="#fff" stroke="#d7e4d9" stroke-width="1"></rect>
      <text x="${x}" y="${y + 3}" text-anchor="middle" fill="${color}" font-size="10.5" font-weight="730">${formatScore(value)}</text>
    `;
  };

  return `
    <div class="dash-evolution">
      <svg viewBox="0 0 ${w} ${h}" role="img" aria-label="Evolução das notas">
        <line x1="${pad.left}" y1="${h - pad.bottom}" x2="${w - pad.right}" y2="${h - pad.bottom}" stroke="#e4e9f0" stroke-width="1" />
        <line x1="${pad.left}" y1="${yFor(8)}" x2="${w - pad.right}" y2="${yFor(8)}" stroke="#dfeee2" stroke-width="1.2" />
        <path d="${d}" fill="none" stroke="${color}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"></path>
        ${points
          .map(
            (value, index) => {
              return `
                <circle cx="${pad.left + index * xStep}" cy="${yFor(value)}" r="4" fill="${color}" stroke="#fff" stroke-width="2"></circle>
                ${labelPill(value, index)}
              `;
            }
          )
          .join("")}
        ${monthsLabel
          .map(
            (month, index) => `
              <text x="${pad.left + index * xStep}" y="${h - 3}" text-anchor="middle" fill="#425474" font-size="12" font-weight="700">${month}</text>
            `
          )
          .join("")}
      </svg>
    </div>
  `;
}

function generalAssessmentMiniChart() {
  const monthIds = months.map(([monthId]) => monthId);
  const monthPoints = monthIds.map((monthId) => ({ monthId, value: monthAverage(monthId) }));
  const availablePoints = monthPoints.filter((point) => point.value != null);
  const labels = monthIds.map((monthId) => monthId.slice(0, 3).replace(/^./, (letter) => letter.toUpperCase()));
  const w = 340;
  const h = 112;
  const pad = { left: 18, right: 18, top: 26, bottom: 25 };
  const values = availablePoints.map((point) => point.value);
  const minValue = Math.min(...values, 8) - 0.25;
  const maxValue = Math.max(...values, 8) + 0.25;
  const range = Math.max(1, maxValue - minValue);
  const xStep = (w - pad.left - pad.right) / Math.max(1, monthIds.length - 1);
  const yFor = (value) => pad.top + (maxValue - value) * ((h - pad.top - pad.bottom) / range);
  const lineD = availablePoints
    .map((point, index) => `${index === 0 ? "M" : "L"}${pad.left + monthIds.indexOf(point.monthId) * xStep},${yFor(point.value)}`)
    .join(" ");

  return `
    <svg class="general-sparkline" viewBox="0 0 ${w} ${h}" role="img" aria-label="Tendência da avaliação geral">
      <line x1="${pad.left}" y1="${h - pad.bottom}" x2="${w - pad.right}" y2="${h - pad.bottom}" stroke="#e3eaf2" stroke-width="1" />
      <path d="${lineD}" fill="none" stroke="#2f8f46" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"></path>
      ${availablePoints
        .map((point) => {
          const index = monthIds.indexOf(point.monthId);
          const x = pad.left + index * xStep;
          const y = yFor(point.value);
          return `
            <text x="${x}" y="${y - 8}" text-anchor="middle" fill="#207333" font-size="8.8" font-weight="720">${formatScore(point.value)}</text>
            <circle cx="${x}" cy="${y}" r="3.6" fill="#2f8f46" stroke="#ffffff" stroke-width="1.9"></circle>
          `;
        })
        .join("")}
      ${labels
        .map(
          (label, index) => `
            <text x="${pad.left + index * xStep}" y="${h - 5}" text-anchor="middle" fill="${monthPoints[index].value == null ? "#a8b3c2" : "#425474"}" font-size="8.8" font-weight="650">${label}</text>
          `
        )
        .join("")}
    </svg>
  `;
}

function graphGeneralAssessment() {
  const currentScore = monthAverage(currentMonthId) ?? generalScore();
  const available = availableMonthIds();
  const previousId = [...available].reverse().find((monthId) => monthId !== currentMonthId);
  const previousScore = previousId ? monthAverage(previousId) : null;
  const delta = previousScore == null ? 0 : currentScore - previousScore;
  const trendClass = delta >= 0 ? "positive" : "danger";

  return `
    <div class="graph-card-body graph-assessment">
      <div class="general-score-row">
        <div class="general-score-value">${formatScore(currentScore)}</div>
        <div>
          <strong>Média das 12 áreas</strong>
          <span>Agosto/2026</span>
        </div>
      </div>
      ${generalAssessmentMiniChart()}
      <div class="general-delta ${trendClass}">
        ${delta >= 0 ? "Ganho" : "Queda"} de ${formatScore(Math.abs(delta))} ponto vs. ${previousId || currentMonthId}
      </div>
    </div>
  `;
}

function graphSummaryRows(rows, total) {
  return `
    <div class="graph-summary-list">
      ${rows
        .map(
          (row) => `
            <div class="graph-summary-row" style="--row-color:${row.color};--row-width:${Math.round((row.value / total) * 100)}%">
              <div class="graph-summary-top">
                <span><i></i>${row.label}</span>
                <b>${row.value}</b>
              </div>
              <div class="graph-summary-track"><em></em></div>
            </div>
          `
        )
        .join("")}
    </div>
  `;
}

function graphStatusSummary() {
  const order = ["satisfatorio", "moderado", "medio", "critico"];
  const rows = order.map((status) => ({
    label: statusMap[status].label,
    color: statusMap[status].color,
    value: areaData.filter((area) => area.status === status).length
  }));
  return graphSummaryRows(rows, areaData.length);
}

function graphAuditSummary() {
  const rows = [
    { label: "Realizadas", color: "var(--green)", value: 8 },
    { label: "Atrasada", color: "var(--orange)", value: 1 },
    { label: "Não realizadas", color: "#c8d0dc", value: 3 }
  ];
  return `
    <div class="graph-card-body graph-audits">
      <div class="audit-total-line"><strong>12</strong><span>meses acompanhados</span></div>
      ${graphSummaryRows(rows, 12)}
    </div>
  `;
}

function dashboardHome() {
  const hasSelection = Boolean(state.selectedArea);
  const selectedArea = hasSelection ? areaById(state.selectedArea) : null;
  return `
    <div class="dashboard-grid ${hasSelection ? "has-selection" : "no-selection"}">
      <div class="dashboard-main">
        <section class="areas-panel">
          <div class="section-head">
            <div class="section-title">
              <div>
                <h2>Painel das áreas</h2>
                <p class="section-subtitle">Clique em uma área para ver os detalhes rápidos</p>
              </div>
            </div>
            <div class="legend" aria-label="Legenda de risco">
              <span class="legend-item"><span class="legend-line" style="background:var(--green)"></span>Baixo</span>
              <span class="legend-item"><span class="legend-line" style="background:var(--yellow)"></span>Moderado</span>
              <span class="legend-item"><span class="legend-line" style="background:var(--orange)"></span>Médio</span>
              <span class="legend-item"><span class="legend-line" style="background:var(--red)"></span>Alto</span>
            </div>
          </div>
          <div class="area-grid ${hasSelection ? "is-focused" : ""}">
            ${areaData.map((area) => areaTile(area)).join("")}
          </div>
        </section>
        <div class="summary-row">
          <section class="mini-panel surface">
            <div class="mini-panel-head">${svgIcon("plans")} Pendências gerais</div>
            <div class="metric-strip visual">
              <div class="metric"><span class="metric-icon orange">${assetIcon("plans", "blue")}</span><b>12</b><span>planos pendentes</span></div>
              <div class="metric"><span class="metric-icon red">${assetIcon("warning", "blue")}</span><b>3</b><span>ações críticas</span></div>
              <div class="metric"><span class="metric-icon red">${assetIcon("fileWarning", "blue")}</span><b>1</b><span>documento vencido</span></div>
              <div class="metric"><span class="metric-icon orange">${assetIcon("clock", "blue")}</span><b>2</b><span>áreas atrasadas</span></div>
            </div>
          </section>
          <section class="mini-panel surface">
            <div class="mini-panel-head mini-panel-head-stacked">
              ${svgIcon("chart")}
              <span class="mini-panel-title-copy">
                <strong>Evolução das notas</strong>
                <small>${selectedArea ? escapeHtml(selectedArea.name) : "Geral"}</small>
              </span>
            </div>
            ${dashboardEvolution(selectedArea)}
          </section>
          <section class="mini-panel surface">
            <div class="mini-panel-head">${svgIcon("audit")} Auditorias realizadas</div>
            <div class="donut-wrap">
              <div class="donut" style="--a:67%;--b:8%"><div class="donut-label">12<small>meses</small></div></div>
              <div class="donut-legend">
                <span><i class="dot" style="--dot:var(--green)"></i>8 realizadas</span>
                <span><i class="dot" style="--dot:var(--orange)"></i>1 atrasada</span>
                <span><i class="dot" style="--dot:#c8d0dc"></i>3 não realizadas</span>
              </div>
            </div>
          </section>
        </div>
      </div>
      ${hasSelection ? selectedPanel() : ""}
    </div>
  `;
}

function chartSvg() {
  const expanded = state.chartExpanded;
  const selected = state.selectedMonth;
  const hasComparison = selected !== currentMonthId && Array.isArray(monthLines[selected]);
  const lineValues = hasComparison ? monthLines[selected] : null;
  const barValues = monthLines[currentMonthId];
  const width = expanded ? 1320 : 1120;
  const height = expanded ? 520 : 400;
  const pad = expanded
    ? { left: 50, right: 124, top: 46, bottom: 122 }
    : { left: 48, right: 138, top: 38, bottom: 108 };
  const innerW = width - pad.left - pad.right;
  const innerH = height - pad.top - pad.bottom;
  const barGap = expanded ? 32 : 28;
  const slotW = innerW / areaData.length;
  const barW = Math.max(20, innerW / areaData.length - barGap);
  const xFor = (index) => pad.left + index * slotW + barGap / 2;
  const yFor = (value) => pad.top + innerH - (value / 10) * innerH;
  const lineD = lineValues
    ? lineValues.map((value, i) => `${i === 0 ? "M" : "L"}${xFor(i) + barW / 2},${yFor(value)}`).join(" ")
    : "";
  const selectedColor = months.find(([id]) => id === selected)?.[1] || "#f4a000";
  const gridRight = pad.left + innerW;
  const plotBottom = pad.top + innerH;
  const points = areaData.map((area, i) => {
    const x = xFor(i);
    const value = barValues[i];
    return {
      area,
      value,
      x,
      center: x + barW / 2,
      y: yFor(value),
      h: plotBottom - yFor(value)
    };
  });
  const lastBarRight = points[points.length - 1].x + barW;
  const metaLabelX = Math.min(width - 74, lastBarRight + 34);
  const metaLineEnd = metaLabelX - 12;
  const metaY = yFor(8) - 18;
  const pillW = 42;
  const pillH = 22;
  const labelBounds = (x, y, w = pillW, h = pillH) => ({
    x: x - w / 2,
    y: y - h / 2,
    w,
    h
  });
  const overlaps = (a, b, gap = 3) =>
    a.x < b.x + b.w + gap &&
    a.x + a.w + gap > b.x &&
    a.y < b.y + b.h + gap &&
    a.y + a.h + gap > b.y;
  const clampLabelY = (y) => Math.max(pad.top + 14, Math.min(plotBottom - 14, y));
  const linePointBlockers = lineValues
    ? lineValues.map((value, i) => {
        const x = xFor(i) + barW / 2;
        const y = yFor(value);
        return { x: x - 8, y: y - 8, w: 16, h: 16 };
      })
    : [];
  const occupied = [
    { x: metaLabelX - 4, y: metaY - 10, w: 64, h: 22 }
  ];
  const placeLabel = (x, candidates) => {
    for (const candidate of candidates) {
      const y = clampLabelY(candidate);
      const box = labelBounds(x, y);
      if (![...linePointBlockers, ...occupied].some((blocker) => overlaps(box, blocker))) {
        occupied.push(box);
        return y;
      }
    }
    const y = clampLabelY(candidates[candidates.length - 1]);
    occupied.push(labelBounds(x, y));
    return y;
  };
  const barLayouts = points.map((point) => ({
    ...point,
    labelY: placeLabel(point.center, [
      point.y - 18,
      point.y + 22,
      point.y - 34,
      point.y + 36,
      point.y - 48,
      point.y + 50
    ])
  }));
  const lineLayouts = lineValues
    ? lineValues.map((value, i) => {
        const x = xFor(i) + barW / 2;
        const y = yFor(value);
        return {
          x,
          y,
            value,
            labelY: placeLabel(x, [
              y + 20,
              y - 20,
              y + 34,
              y - 34,
              y + 48,
              y - 48
            ])
          };
        })
    : [];
  const scorePill = (x, y, value, color, kind = "line") => {
    return `
      <g class="score-pill score-pill-${kind}" transform="translate(${x - pillW / 2}, ${y - pillH / 2})">
        <rect x="0" y="0" width="${pillW}" height="${pillH}" rx="11" fill="#ffffff" stroke="${color}" stroke-width="${kind === "bar" ? 1.2 : 1.5}" opacity=".98"></rect>
        <text x="${pillW / 2}" y="15" text-anchor="middle" fill="${color}" font-size="12" font-weight="780">${formatScore(value)}</text>
      </g>
    `;
  };

  return `
    <svg class="bar-chart" viewBox="0 0 ${width} ${height}" role="img" aria-label="Avaliação geral por área">
      <defs>
        <linearGradient id="barGrad" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stop-color="#0a56de"/>
          <stop offset="100%" stop-color="#6eb7ff"/>
        </linearGradient>
        <filter id="pillShadow" x="-20%" y="-30%" width="140%" height="160%">
          <feDropShadow dx="0" dy="4" stdDeviation="5" flood-color="#092453" flood-opacity=".16"/>
        </filter>
      </defs>
      ${[0, 2, 4, 6, 8, 10]
        .map(
          (tick) => `
            <line x1="${pad.left}" y1="${yFor(tick)}" x2="${gridRight}" y2="${yFor(tick)}" stroke="#dfe6ef" stroke-width="1"/>
            <text x="${pad.left - 12}" y="${yFor(tick) + 4}" fill="#425474" font-size="12" text-anchor="end">${tick}</text>
          `
        )
        .join("")}
      <line x1="${pad.left}" y1="${yFor(8)}" x2="${metaLineEnd}" y2="${yFor(8)}" stroke="#65ad70" stroke-width="1.8" opacity=".8"/>
      <text x="${metaLabelX}" y="${metaY}" fill="#2d8440" font-size="13" font-weight="720" text-anchor="start">Meta 8,0</text>
      <text x="18" y="${pad.top + innerH / 2}" transform="rotate(-90 18 ${pad.top + innerH / 2})" fill="#122a58" font-size="13" font-weight="700">Nota</text>
      ${barLayouts
        .map((point) => {
          const red = point.value < 7 ? "#ee2f36" : "#0a55dc";
          const active = state.chartFocusArea === point.area.id;
          return `
            <g class="bar-group ${active ? "is-active" : ""}" data-chart-area="${point.area.id}" tabindex="0" role="button" aria-label="${point.area.name}: ${formatScore(point.value)}">
              <rect x="${point.x - 4}" y="${pad.top}" width="${barW + 8}" height="${innerH}" rx="7" fill="transparent"></rect>
              <rect x="${point.x}" y="${point.y}" width="${barW}" height="${point.h}" rx="5" fill="url(#barGrad)"></rect>
              ${active ? `<rect x="${point.x - 3}" y="${point.y - 3}" width="${barW + 6}" height="${point.h + 6}" rx="8" fill="none" stroke="#0a6cff" stroke-width="2.2"></rect>` : ""}
              ${scorePill(point.center, point.labelY, point.value, red, "bar")}
            </g>
          `;
        })
        .join("")}
      ${lineValues ? `<path d="${lineD}" fill="none" stroke="${selectedColor}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path>` : ""}
      ${lineLayouts
        .map(
          (point) => `
            <circle cx="${point.x}" cy="${point.y}" r="5.4" fill="${selectedColor}" stroke="#fff" stroke-width="2.8"></circle>
            ${scorePill(point.x, point.labelY, point.value, selectedColor, "line")}
          `
        )
        .join("")}
      ${points
        .map(
          (point) => `
            <g class="axis-label-hit" data-chart-area="${point.area.id}" tabindex="0" role="button" aria-label="${point.area.name}">
              <text class="chart-axis-label" transform="translate(${point.center}, ${plotBottom + 43}) rotate(-39)" text-anchor="end">
                ${chartLabelLines(point.area.name)
                  .map((line, index) => `<tspan x="0" dy="${index === 0 ? 0 : 13}">${line}</tspan>`)
                  .join("")}
              </text>
            </g>
          `
        )
        .join("")}
    </svg>
  `;
}

function chartAreaLabels() {
  return `
    <div class="chart-area-labels" aria-hidden="true">
      ${areaData
        .map(
          (area) => `
            <button class="chart-area-label ${state.chartFocusArea === area.id ? "is-active" : ""}" data-chart-area="${area.id}">
              ${chartAxisLabel(area.name)}
            </button>
          `
        )
        .join("")}
    </div>
  `;
}

function subareasFor(area) {
  const rows = blockSummaries(area);
  return rows.length ? rows : subareaData[area.id] || [];
}

function areaQuickComparison(area) {
  const rows = subareasFor(area);
  const status = statusMap[area.status];
  return `
    <div class="area-compare-head">
      <img class="compare-area-icon" src="assets/icons/${area.icon}" alt="" aria-hidden="true" />
      <div>
        <span>Área selecionada</span>
        <h3>${area.name}</h3>
      </div>
      <strong style="color:${status.color}">${formatScore(area.score)}</strong>
    </div>
    <button class="compare-back-btn" data-clear-chart-focus>Voltar ao comparativo rápido</button>
    <div class="subarea-list">
      ${rows
        .map((row) => {
          const rowStatus = statusMap[row.status];
          return `
            <div class="subarea-row" style="--sub-color:${rowStatus.color};--sub-width:${row.score * 10}%">
              <div class="subarea-top">
                <span>${row.label}</span>
                <b>${formatScore(row.score)}</b>
              </div>
              <div class="subarea-track"><i></i></div>
            </div>
          `;
        })
        .join("")}
    </div>
    <div class="attention-note graph-note">${svgIcon("idea")} <span>Use este resumo para localizar os blocos com menor nota antes de abrir a análise completa.</span></div>
    ${linkedActionSummary(area)}
    <button class="primary-btn" data-area-detail="${area.id}">Ver análise completa da área ${svgIcon("arrow")}</button>
  `;
}

function linkedActionSummary(area) {
  const plans = actionPlansForArea(area);
  const stats = actionPlanStats(area);
  return `
    <div class="linked-action-panel">
      <div class="linked-action-head">
        <span>Planos de ação vinculados</span>
        <b>${stats.total}</b>
      </div>
      <div class="linked-action-kpis">
        <span>${stats.recurrent} NCs recorrentes</span>
        <span>${stats.improved} melhoraram</span>
        <span>${stats.noEffect} sem efeito</span>
      </div>
      <div class="linked-action-list">
        ${plans
          .slice(0, 3)
          .map((plan) => {
            const meta = actionStatusMeta[plan.status] || actionStatusMeta.pendente;
            return `
              <div class="linked-action-row" style="--action-color:${meta.color}">
                <strong>${escapeHtml(plan.title)}</strong>
                <span>${escapeHtml(plan.block)} · ${meta.label}</span>
              </div>
            `;
          })
          .join("")}
      </div>
    </div>
  `;
}

function rankBox(title, color, rows, direction = "up", showActionHints = false) {
  const arrow = direction === "up" ? "&uarr;" : "&darr;";
  return `
    <div class="rank-box" style="--rank-color:${color}">
      <div class="rank-title"><span>${title}</span><b>${arrow}</b></div>
      <div class="rank-list">
        ${rows
          .map(
            (area, index) => `
            <div class="rank-row">
              <span class="rank-number">${index + 1}</span>
                <span>
                  ${area.name}
                  ${showActionHints ? `<small>${actionPlanStats(area).total} planos · ${area.critical} alto</small>` : ""}
                </span>
                <span class="rank-score">${formatScore(area.score)}</span>
              </div>
            `
          )
          .join("")}
      </div>
    </div>
  `;
}

function actionEffectForArea(area, stats, delta) {
  if (stats.pending + stats.inProgress + stats.late > 0 && stats.noEffect === 0 && delta <= 0) return { label: "em execução", tone: "pending" };
  if (stats.noEffect > 0 || (delta < 0 && stats.total > 0)) return { label: "sem efeito", tone: "danger" };
  if (delta > 0 && stats.improved > 0) return { label: "com efeito", tone: "positive" };
  if (delta > 0) return { label: "melhora parcial", tone: "warning" };
  return { label: "sem histórico", tone: "neutral" };
}

function opportunityScore(area, stats) {
  const delta = area.score - area.last;
  const belowMeta = Math.max(0, 8 - area.score) * 22;
  const fall = Math.max(0, -delta) * 18;
  const risk = area.critical * 9;
  const ncs = area.ncs * 2.4;
  const openPlans = (stats.pending + stats.inProgress) * 5 + stats.late * 8;
  const recurrence = stats.recurrent * 7;
  const noEffect = stats.noEffect * 8;
  return clamp(12 + belowMeta + fall + risk + ncs + openPlans + recurrence + noEffect, 8, 100);
}

function actionImpactRows() {
  return areaData
    .map((area) => {
      const stats = actionPlanStats(area);
      const delta = area.score - area.last;
      const priority = opportunityScore(area, stats);
      return {
        area,
        stats,
        delta,
        priority,
        effect: actionEffectForArea(area, stats, delta)
      };
    })
    .sort((a, b) => b.priority - a.priority || a.area.score - b.area.score);
}

function actionImpactChart() {
  const rows = actionImpactRows();
  const top = rows[0];
  return `
    <div class="impact-chart" role="img" aria-label="Impacto dos planos de ação e oportunidades de melhoria">
      <div class="impact-highlight">
        <div>
          <span>Maior prioridade de ação</span>
          <strong>${top.area.name}</strong>
          <small>${formatScore(top.area.score)} de nota · ${top.stats.total} planos · ${top.stats.recurrent} NCs recorrentes</small>
        </div>
        <b><small>prioridade</small>${Math.round(top.priority)}</b>
      </div>
      <div class="impact-row-list">
        ${rows
          .map((row, index) => {
            const deltaClass = row.delta >= 0 ? "positive" : "danger";
            const deltaSign = row.delta > 0 ? "+" : row.delta < 0 ? "-" : "";
            const priorityColor = row.priority >= 68 ? "var(--red)" : row.priority >= 42 ? "var(--orange)" : "var(--green)";
            return `
              <button class="impact-row ${state.chartFocusArea === row.area.id ? "is-active" : ""}" data-chart-area="${row.area.id}" style="--impact:${Math.round(row.priority)}%;--impact-color:${priorityColor}">
                <span class="impact-rank">${index + 1}</span>
                <span class="impact-area">
                  <strong>${escapeHtml(row.area.name)}</strong>
                  <small>${row.stats.total} planos · ${row.stats.recurrent} recorrentes · ${row.area.critical} alto risco</small>
                </span>
                <span class="impact-meter"><i></i></span>
                <span class="impact-delta ${deltaClass}">${deltaSign}${formatScore(Math.abs(row.delta))}</span>
                <span class="impact-effect is-${row.effect.tone}">${row.effect.label}</span>
              </button>
            `;
          })
          .join("")}
      </div>
      <div class="impact-footnote">
        Prioridade baseada em nota abaixo da meta, queda mensal, risco alto, NC recorrente e planos pendentes.
      </div>
    </div>
  `;
}

function chartsPage() {
  const monthOptions = comparisonMonths();
  const focusedArea = state.chartFocusArea ? areaById(state.chartFocusArea) : null;
  const isImpactMode = state.chartMode === "actions";
  const nextModeLabel = isImpactMode ? "Avaliação geral" : "Impacto dos planos de ação";
  return `
    <div class="graph-layout ${state.chartExpanded ? "is-expanded" : ""} ${isImpactMode ? "is-impact-mode" : ""}">
      <div>
        <section class="surface chart-panel chart-panel-large">
          <div class="chart-head">
            <div>
              <h2>${isImpactMode ? "Impacto dos planos de ação" : "Avaliação geral - período atual"}</h2>
              <p class="chart-note">${isImpactMode ? "Oportunidades de melhoria priorizadas por nota, risco, recorrência e andamento dos planos." : "Clique em um mês abaixo para comparar com o mês atual (Agosto/2026)."}</p>
            </div>
            <div class="chart-tools">
              <button class="chart-mode-btn" data-toggle-chart-mode title="Ver ${nextModeLabel}">
                <span>${nextModeLabel}</span>
                ${icons.chevron}
              </button>
              <button class="chart-expand-btn" data-toggle-chart-size title="${state.chartExpanded ? "Reduzir gráfico" : "Expandir gráfico"}">${state.chartExpanded ? "-" : "+"}</button>
            </div>
          </div>
          ${isImpactMode ? actionImpactChart() : chartSvg()}
          ${isImpactMode ? "" : `<div class="month-strip">
            ${monthOptions
              .map(
                ([month, color]) => {
                  const isFuture = futureMonthIds.has(month);
                  return `
                  <button class="month-chip ${state.selectedMonth === month ? "is-selected" : ""} ${month === currentMonthId ? "is-current" : ""} ${isFuture ? "is-disabled" : ""}" data-month="${month}" style="--month-color:${color}" ${isFuture ? "disabled" : ""}>
                    <span class="chip-color"></span>${month}
                  </button>
                `;
                }
              )
              .join("")}
          </div>
          <p class="chart-note">${state.selectedMonth === currentMonthId ? "As colunas representam Agosto/2026, sem linha comparativa ativa." : "As colunas representam Agosto/2026. A linha representa o mês selecionado para comparação."}</p>`}
        </section>
        ${state.chartExpanded ? "" : `<div class="graph-bottom">
          <section class="mini-panel surface">
            <div class="mini-panel-head">${svgIcon("chart")} Avaliação geral</div>
            ${graphGeneralAssessment()}
          </section>
          <section class="mini-panel surface">
            <div class="mini-panel-head">${svgIcon("grid")} Distribuição de status das auditorias</div>
            ${graphStatusSummary()}
          </section>
          <section class="mini-panel surface">
            <div class="mini-panel-head">${svgIcon("audit")} Auditorias realizadas</div>
            ${graphAuditSummary()}
          </section>
        </div>
        <div class="graph-action-row">
          <button class="primary-btn" data-area-detail="${focusedArea ? focusedArea.id : state.selectedArea}">Ver análise completa da área ${svgIcon("arrow")}</button>
        </div>`}
      </div>
      ${state.chartExpanded ? "" : `<aside class="compare-panel surface ${focusedArea ? "area-mode" : ""}">
        <h2>${focusedArea ? "Resumo por blocos" : "Comparativo rápido"}</h2>
        ${focusedArea
          ? areaQuickComparison(focusedArea)
          : `
            ${rankBox("Top 3 melhores áreas", "var(--green)", sortedBest(), "up")}
            ${rankBox("Top 3 áreas que precisam de atenção", "var(--red)", sortedAttention(), "down", true)}
            <div class="attention-note graph-note">${svgIcon("idea")} <span>Foque nas ações corretivas das áreas abaixo da meta para elevar a nota geral do hospital.</span></div>
          `}
      </aside>`}
    </div>
  `;
}

function detailKpi(label, value, color, iconName, suffix = "") {
  const iconMarkup = iconName === "trendingUp" || iconName === "trendingDown"
    ? icons[iconName]
    : assetIcon(iconName, "blue");
  return `
    <section class="kpi surface" style="--kpi-color:${color}">
      <span class="kpi-icon">${iconMarkup}</span>
      <div>
        <div class="kpi-value">${value}${suffix ? `<small>${suffix}</small>` : ""}</div>
        <div class="kpi-label">${label}</div>
      </div>
    </section>
  `;
}

function answerChip(answer) {
  const meta = answerMeta[answer] || answerMeta.X;
  return `<span class="answer-chip answer-chip-wide" style="--answer-color:${meta.color}">${meta.label}</span>`;
}

function riskPill(level) {
  const meta = riskMeta[level] || riskMeta.none;
  return `<span class="risk-pill" style="--risk-color:${meta.color}">${meta.label}</span>`;
}

function observationFor(row) {
  return row.observation || "";
}

function areaDetailPage() {
  const area = areaById(state.selectedArea);
  const status = statusMap[area.status];
  const summaries = blockSummaries(area);
  const allRows = questionRowsForArea(area);
  const counts = countsFromRows(allRows);
  const totalRows = allRows.length || 1;
  const conformityPct = Math.round((counts.C / totalRows) * 100);
  const ncPct = Math.round((counts.NC / totalRows) * 100);
  const selectedBlock = summaries.find((block) => block.id === state.detailBlock) || null;
  const selectedRows = selectedBlock ? allRows.filter((row) => row.blockId === selectedBlock.id) : [];
  const selectedCounts = countsFromRows(selectedRows);
  const activeFilter = state.detailFilter || "all";
  const filteredRows = selectedRows.filter((row) => activeFilter === "all" || row.answer === activeFilter);
  const areaNcRows = allRows.filter((row) => row.answer === "NC");
  const areaPlans = actionPlansForArea(area);
  const planStats = actionPlanStats(area);
  return `
    <div class="detail-page">
      <div class="detail-kpis">
        ${detailKpi("Nota da área", `${formatScore(area.score)}`, status.color, "target", "/10")}
        ${detailKpi(area.score >= area.last ? "Ganho comparado ao mês anterior" : "Queda comparada ao mês anterior", `${formatScore(Math.abs(area.score - area.last))}`, area.score >= area.last ? "var(--green)" : "var(--red)", area.score >= area.last ? "trendingUp" : "trendingDown")}
        ${detailKpi("Não conformidades", `${area.ncs}`, "var(--red)", "fileWarning")}
        ${detailKpi("Críticas abertas", `${area.critical}`, "var(--red)", "warning")}
      </div>
      <div class="detail-mid detail-insight-panel surface">
        <section class="detail-insight-cell detail-insight-trend">
          <h3>Evolução da nota da área</h3>
          ${areaEvolutionChart(area)}
        </section>
        <section class="detail-insight-cell detail-insight-conformity">
          <h3>Conformidade geral</h3>
          <div class="donut-wrap">
            <div class="donut" style="--a:${conformityPct}%;--b:${ncPct}%;background:conic-gradient(var(--green) 0 ${conformityPct}%, var(--red) ${conformityPct}% ${conformityPct + ncPct}%, #c8d0dc ${conformityPct + ncPct}% 100%)"><div class="donut-label">${totalRows}<small>itens</small></div></div>
            <div class="donut-legend">
              <span><i class="dot" style="--dot:var(--green)"></i>${counts.C} conformes (${conformityPct}%)</span>
              <span><i class="dot" style="--dot:var(--red)"></i>${counts.NC} não conformes (${ncPct}%)</span>
              <span><i class="dot" style="--dot:#c8d0dc"></i>${counts.X} não avaliados</span>
            </div>
          </div>
        </section>
        <section class="detail-insight-cell detail-insight-risk risk-bars">
          <h3>Não conformidades por nível de risco</h3>
          ${riskSummary(area)
            .map((risk) => {
              const meta = riskMeta[risk.level];
              return `<div class="risk-row"><span>${meta.label}</span><div class="risk-track"><div class="risk-fill" style="--risk-width:${risk.width}%;--risk-color:${meta.color}"></div></div><b>${risk.count}</b></div>`;
            })
            .join("")}
        </section>
      </div>
      <div class="detail-block-layout">
        <section class="block-summary-panel">
          <div class="section-head compact-section-head">
            <div>
              <h2>Blocos do checklist</h2>
            </div>
          </div>
          <div class="area-block-list">
            ${summaries
              .map((block) => {
                const blockStatus = statusMap[block.status];
                return `
                  <button class="area-block-card ${selectedBlock?.id === block.id ? "is-selected" : ""}" data-detail-block="${block.id}" style="--status-color:${blockStatus.color}">
                    <span class="block-card-copy">${escapeHtml(block.title)}<small>${block.questions.length} perguntas</small></span>
                    <span class="block-card-score">${formatScore(block.score)} <small>/10</small></span>
                  </button>
                `;
              })
              .join("")}
          </div>
        </section>
        <aside class="detail-side-stack">
          <section class="surface detail-side-card">
            <h3>Evidências fotográficas</h3>
            <div class="photo-grid">
              ${Array.from({ length: Math.max(1, Math.min(3, areaNcRows.length)) })
                .map(() => `<div class="photo-thumb"><span>⌕</span></div>`)
                .join("")}
            </div>
            <button class="link-inline">Ver evidências ${svgIcon("arrow")}</button>
          </section>
          <section class="surface detail-side-card">
            <h3>Plano de ação</h3>
            <div class="action-counts compact-actions">
              <div class="metric"><b>${planStats.pending}</b><span>pendentes</span></div>
              <div class="metric"><b>${planStats.inProgress}</b><span>em andamento</span></div>
              <div class="metric"><b>${planStats.critical}</b><span>alto risco</span></div>
            </div>
            ${state.detailActionsOpen ? `
              <div class="side-action-list">
                ${areaPlans
                  .slice(0, 3)
                  .map((plan) => {
                    const meta = actionStatusMeta[plan.status] || actionStatusMeta.pendente;
                    return `
                      <div class="side-action-row" style="--action-color:${meta.color}">
                        <strong>${escapeHtml(plan.title)}</strong>
                        <span>${escapeHtml(plan.owner)} · ${meta.label}</span>
                      </div>
                    `;
                  })
                  .join("")}
              </div>
              <div class="side-action-insights">
                <span>${planStats.recurrent} NCs recorrentes</span>
                <span>Melhora após ação: ${planStats.improved > 0 ? "sim" : "não"}</span>
              </div>
            ` : ""}
            <button class="primary-btn" data-toggle-detail-actions>${state.detailActionsOpen ? "Ocultar plano de ação" : "Ver plano de ação"} ${svgIcon("arrow")}</button>
          </section>
        </aside>
      </div>
      ${selectedBlock ? `
        <div class="detail-modal-backdrop">
          <section class="detail-modal surface" role="dialog" aria-modal="true" aria-label="Detalhes do bloco">
            <div class="detail-modal-head">
            <div>
                <span class="modal-kicker">${escapeHtml(area.name)}</span>
              <h2>Detalhes - ${escapeHtml(selectedBlock.title)}</h2>
                <p>${selectedRows.length} perguntas deste bloco</p>
            </div>
              <button class="panel-close" data-close-details title="Fechar">${icons.close}</button>
          </div>
          <div class="tabs">
              <button class="tab ${activeFilter === "all" ? "is-active" : ""}" data-detail-filter="all">Todos (${selectedRows.length})</button>
              <button class="tab ${activeFilter === "NC" ? "is-active" : ""}" data-detail-filter="NC">Não conformes (${selectedCounts.NC})</button>
              <button class="tab ${activeFilter === "C" ? "is-active" : ""}" data-detail-filter="C">Conformes (${selectedCounts.C})</button>
              <button class="tab ${activeFilter === "X" ? "is-active" : ""}" data-detail-filter="X">Não avaliados (${selectedCounts.X})</button>
          </div>
            <div class="detail-modal-body">
              ${filteredRows.length ? `
                <table class="audit-table">
            <thead>
              <tr><th>Pergunta</th><th>Resposta</th><th>Risco</th><th>Observação</th><th>Evidência</th></tr>
            </thead>
            <tbody>
                    ${filteredRows
                .map(
                  (row) => `
                    <tr>
                      <td>${escapeHtml(row.number)}. ${escapeHtml(row.text)}</td>
                      <td>${answerChip(row.answer)}</td>
                      <td>${riskPill(row.riskLevel)}</td>
                            <td>${escapeHtml(observationFor(row)) || "-"}</td>
                      <td>${row.answer === "NC" ? `<div class="evidence-thumb"></div>` : "-"}</td>
                    </tr>
                  `
                )
                .join("")}
            </tbody>
                </table>
              ` : `<div class="empty-filter">Não há perguntas neste filtro.</div>`}
            </div>
          </section>
        </div>
      ` : ""}
    </div>
  `;
}

function startAuditPage() {
  return `
    <div class="audit-start">
      <div>
        <section class="info-strip surface">
          <div>
            <h2>Selecione a área para iniciar a auditoria</h2>
            <p>Cada área possui checklist específico baseado na Portaria SMS nº 2.619/2011.</p>
          </div>
          <button class="panel-close" title="Fechar">${icons.close}</button>
        </section>
        <div class="start-grid">
          ${areaData
            .map(
              (area) => `
                <article class="start-tile">
                  <img src="assets/icons/${area.icon}" alt="" />
                  <div>
                    <h3>${area.name}</h3>
                    <p>${area.subtitle}</p>
                  </div>
                  <button class="outline-btn" data-start-area="${area.id}">Iniciar auditoria ${svgIcon("arrow")}</button>
                </article>
              `
            )
            .join("")}
        </div>
      </div>
      <aside class="how-panel surface">
        <h2 style="color:#fff">Como funciona</h2>
        <div class="how-step"><span class="nav-icon">${assetIcon("grid", "white")}</span><div><h3 style="color:#fff">Selecione a área</h3><p>Escolha o setor que será auditado no mês.</p></div></div>
        <div class="how-step"><span class="nav-icon">${assetIcon("audit", "white")}</span><div><h3 style="color:#fff">Responda o checklist</h3><p>Avalie cada item como Conforme (C), Não Conforme (NC) ou Não Avaliado (X).</p></div></div>
        <div class="how-step"><span class="nav-icon">${icons.camera}</span><div><h3 style="color:#fff">Evidencie NCs</h3><p>A opção de foto aparece apenas ao selecionar Não Conforme.</p></div></div>
        <div class="how-step"><span class="nav-icon">${assetIcon("action", "white")}</span><div><h3 style="color:#fff">Plano de ação</h3><p>Não conformidades geram campos para correção, ação, responsável e prazo.</p></div></div>
        <div class="attention-note" style="background:rgba(255,255,255,.1);color:#fff">${svgIcon("warning", "tiny-icon", "white")} <span>Após o envio, a auditoria fica registrada no histórico.</span></div>
      </aside>
    </div>
  `;
}

function checklistPage() {
  const area = areaById(state.selectedArea);
  const blocks = blocksForArea(area);
  const questions = questionsForArea(area);
  const areaAnswers = answersForArea(area.id);
  const answeredCount = questions.filter((question) => areaAnswers[question.id]).length;
  const progress = questions.length ? Math.round((answeredCount / questions.length) * 100) : 0;
  const nextOpenBlock = blocks.find((block) => (block.questions || []).some((question) => !areaAnswers[question.id])) || blocks[0];
  const currentBlock = blocks.find((block) => block.id === state.checklistBlock) || nextOpenBlock;
  const blockQuestions = currentBlock?.questions || [];
  const blockDone = blockQuestions.filter((question) => areaAnswers[question.id]).length;
  const pageSize = 3;
  const totalPages = Math.max(1, Math.ceil(blockQuestions.length / pageSize));
  const pageIndex = clamp(Number(state.checklistPage) || 0, 0, totalPages - 1);
  state.checklistPage = pageIndex;
  const pageQuestions = blockQuestions.slice(pageIndex * pageSize, pageIndex * pageSize + pageSize);
  const pageStart = blockQuestions.length ? pageIndex * pageSize + 1 : 0;
  const pageEnd = Math.min(blockQuestions.length, pageIndex * pageSize + pageQuestions.length);
  const globalQuestionNumbers = new Map(questions.map((question, index) => [question.id, index + 1]));
  const showAllBlocks = Boolean(state.checklistBlocksOpen);
  const sidebarBlocks = showAllBlocks ? blocks : [currentBlock];
  const blocksButtonLabel = showAllBlocks ? "Ver bloco atual" : "Ver todos os blocos";

  if (!blocks.length) {
    return `
      <section class="placeholder surface">
        <div class="placeholder-inner">
          <h2>Checklist não encontrado</h2>
          <p>Não encontrei perguntas da planilha para ${escapeHtml(area.name)}.</p>
          <div class="placeholder-actions">
            <button class="primary-btn" data-nav="start">Voltar para áreas</button>
          </div>
        </div>
      </section>
    `;
  }

  return `
    <div class="audit-workspace">
      <div>
        <section class="progress-panel audit-progress-panel surface">
          <div>
            <h3>Progresso da auditoria</h3>
            <div class="progress-track"><div class="progress-fill" style="--progress:${progress}%"></div></div>
            <p class="small-muted">${answeredCount} de ${questions.length} perguntas respondidas</p>
          </div>
          <div>
            <h3>Bloco atual</h3>
            <h2>${escapeHtml(currentBlock.title)}</h2>
            <p class="small-muted">${blockDone} de ${blockQuestions.length} perguntas</p>
          </div>
          <button class="outline-btn" data-checklist-blocks>${svgIcon("list")} ${blocksButtonLabel}</button>
        </section>
        <div class="question-list audit-question-list">
          <section class="question-block is-current" id="${currentBlock.id}">
            <div class="question-block-head">
              <div>
                <h2>${escapeHtml(currentBlock.title)}</h2>
                <p>${pageStart}-${pageEnd} de ${blockQuestions.length} perguntas deste bloco</p>
              </div>
              <b>${blockDone}/${blockQuestions.length}</b>
            </div>
            ${pageQuestions
              .map((question) => {
                const selectedAnswer = answerForQuestion(area.id, question);
                const isNC = selectedAnswer === "NC";
                const allowed = question.allowedAnswers || ["C", "NC", "X"];
                const displayNumber = globalQuestionNumbers.get(question.id) || question.number;
                return `
                  <section class="question-card surface ${isNC ? "has-nc" : ""}" data-question-card="${question.id}">
                    <div class="question-head">
                      <span class="question-number">${String(displayNumber).padStart(2, "0")}</span>
                      <div>
                        <h2>${escapeHtml(question.text)}</h2>
                        <p class="law-ref">${escapeHtml(question.reference)}</p>
                      </div>
                    </div>
                    <div class="answer-row" style="--answer-count:${allowed.length}">
                      ${allowed
                        .map((answer) => {
                          const meta = answerMeta[answer];
                          return `<button class="answer-btn ${selectedAnswer === answer ? "is-selected" : ""}" data-answer="${answer}" data-question="${question.id}" style="--answer:${meta.color}">${meta.label} <small>(${meta.short})</small></button>`;
                        })
                        .join("")}
                    </div>
                    <div class="nc-evidence">
                      <div class="evidence-title">${svgIcon("warning")} Evidência da não conformidade</div>
                      <div class="evidence-grid">
                        <button class="camera-drop">${svgIcon("camera")} Tirar foto <small>JPG, PNG até 10MB</small></button>
                        <div class="note-field">
                          <label>Observação</label>
                          <textarea placeholder="Descreva a não conformidade encontrada..."></textarea>
                        </div>
                      </div>
                      <div class="action-form">
                        <div class="note-field"><label>O que deve ser corrigido</label><input placeholder="Ex.: item fora do padrão" /></div>
                        <div class="note-field"><label>Ação necessária</label><input placeholder="Ex.: corrigir e registrar evidência" /></div>
                        <div class="note-field"><label>Responsável</label><input placeholder="Nome do responsável" /></div>
                        <div class="note-field"><label>Prazo</label><input type="date" /></div>
                      </div>
                    </div>
                  </section>
                `;
              })
              .join("")}
          </section>
          <section class="audit-pager surface">
            <button class="outline-btn" data-checklist-page="${pageIndex - 1}" ${pageIndex === 0 ? "disabled" : ""}>Perguntas anteriores</button>
            <span>${pageStart}-${pageEnd} de ${blockQuestions.length}</span>
            <button class="primary-btn" data-checklist-page="${pageIndex + 1}" ${pageIndex >= totalPages - 1 ? "disabled" : ""}>Próximas perguntas ${svgIcon("arrow")}</button>
          </section>
        </div>
        <section class="audit-footer surface" style="margin-top:12px">
          <button class="outline-btn" data-request-leave-audit>Voltar para áreas</button>
          <span class="small-muted">${questions.length} perguntas em ${blocks.length} blocos</span>
          <button class="primary-btn">Finalizar auditoria ${svgIcon("arrow")}</button>
        </section>
      </div>
      <aside class="blocks-sidebar surface ${showAllBlocks ? "is-open" : "is-compact"}">
        <div class="blocks-sidebar-head">
          <h2>${showAllBlocks ? "Blocos da área" : "Bloco atual"}</h2>
          <span>${showAllBlocks ? `${blocks.length} blocos` : `${blockDone}/${blockQuestions.length}`}</span>
        </div>
        <div class="block-nav">
          ${sidebarBlocks
            .map((block) => {
              const total = (block.questions || []).length;
              const done = (block.questions || []).filter((question) => areaAnswers[question.id]).length;
              const isActive = block.id === currentBlock.id;
              return `
                <button class="block-nav-item ${isActive ? "is-active" : ""}" data-checklist-block="${block.id}">
                  <span class="block-dot"></span>
                  <span>${escapeHtml(block.title)}</span>
                  <b>${done}/${total}</b>
                </button>
              `;
            })
            .join("")}
        </div>
        <div class="attention-note block-help">
          ${svgIcon("idea", "tiny-icon", "blue")}
          <span>${showAllBlocks ? "Escolha um bloco para navegar pelo checklist sem perder o ponto atual." : "Use o botão acima para abrir todos os blocos desta área."}</span>
        </div>
      </aside>
      ${state.leaveAuditConfirm ? `
        <div class="leave-audit-backdrop">
          <section class="leave-audit-modal surface">
            <h2>Voltar para áreas?</h2>
            <p>O checklist ficará salvo neste protótipo no ponto atual, mas a auditoria ainda não será enviada.</p>
            <div>
              <button class="outline-btn" data-cancel-leave-audit>Continuar auditoria</button>
              <button class="primary-btn" data-confirm-leave-audit>Voltar para áreas</button>
            </div>
          </section>
        </div>
      ` : ""}
    </div>
  `;
}

function placeholderPage(title, text, actionLabel = "Voltar ao dashboard") {
  return `
    <section class="placeholder surface">
      <div class="placeholder-inner">
        <h2>${title}</h2>
        <p>${text}</p>
        <div class="placeholder-actions">
          <button class="primary-btn" data-nav="home">${actionLabel}</button>
        </div>
      </div>
    </section>
  `;
}

function tableValueCell(label, value, extraClass = "") {
  return `
    <div class="table-value ${extraClass}">
      <span>${label}</span>
      <b>${escapeHtml(value || "—")}</b>
    </div>
  `;
}

function tableRecord(row) {
  const values = row.values && row.values.length ? row.values : [{ temperature: "", validity: "" }];
  return `
    <article class="table-record">
      <strong class="table-record-title">${escapeHtml(row.item)}</strong>
      <div class="table-value-grid">
        ${values
          .map(
            (value) => `
              <div class="table-value-row">
                ${tableValueCell("Temperatura", value.temperature)}
                ${tableValueCell("Validade", value.validity, value.validity ? "" : "is-empty")}
              </div>
            `
          )
          .join("")}
      </div>
    </article>
  `;
}

function tableSectionDetails(section) {
  const totalParameters = section.items.reduce((sum, item) => sum + (item.values || []).length, 0);
  return `
    <section class="table-detail-card surface" style="--table-accent:${section.accent}">
      <div class="table-detail-head">
        <div>
          <span class="table-detail-eyebrow">Critérios de ${escapeHtml(section.title)}</span>
          <h3>${escapeHtml(section.title)}</h3>
          <p>${section.items.length} tipos de alimento e preparação, com ${totalParameters} parâmetros de temperatura e validade.</p>
        </div>
        <button class="table-detail-close" data-close-table-section>Fechar</button>
      </div>
      <div class="table-record-list">
        ${section.items.map(tableRecord).join("")}
      </div>
    </section>
  `;
}

function foodTablesPage() {
  const activeSection = foodTableSections.find((section) => section.id === state.openTableSection);
  return `
    <section class="tables-page">
      <section class="tables-intro">
        <div class="tables-title-row">
          <span class="module-icon">${assetIcon("table", "blue")}</span>
          <div>
            <h2>Tabela de Temperatura e Validade dos Alimentos</h2>
            <p>
              Para os produtos industrializados, devem ser obedecidas as recomendações dos fabricantes quanto às condições de armazenamento dos alimentos antes e após a abertura das embalagens. Na ausência dessas informações, alimentos pré-preparados e preparados no estabelecimento devem usar os critérios e parâmetros indicados abaixo.
            </p>
          </div>
        </div>
      </section>
      <div class="table-category-grid">
        ${foodTableSections
          .map(
            (section) => `
              <button class="table-category-card surface ${section.id === state.openTableSection ? "is-active" : ""}" data-table-section="${section.id}" style="--table-accent:${section.accent}" aria-expanded="${section.id === state.openTableSection}">
                <img class="table-category-icon" src="assets/icons/${section.icon}?v=tables-icons-1" alt="" aria-hidden="true" />
                <span class="table-category-copy">
                  <strong>${escapeHtml(section.title)}</strong>
                  <small>${escapeHtml(section.subtitle)}</small>
                </span>
                <span class="table-category-count">${section.items.length} itens</span>
              </button>
            `
          )
          .join("")}
      </div>
      ${activeSection ? tableSectionDetails(activeSection) : ""}
    </section>
  `;
}

function viewContent() {
  const placeholders = {
    audits: ["Auditorias", "Aqui ficará o histórico das auditorias passadas, com filtros por mês, área, responsável e status."],
    actions: ["Planos de Ação", "Aqui entram os planos gerados a partir das NCs, com correção necessária, responsável, prazo, andamento e evidências."],
    docs: ["Documentos", "Aqui ficará o controle documental separado da área de resíduos: upload, validade, status, alerta e histórico."],
    reports: ["Relatórios", "Aqui ficarão os relatórios consolidados por área auditada, com nota final, evidências, planos e histórico."],
    web: ["Painel web", "Este módulo será pensado para gestão administrativa, envio de documentos e consulta completa sem depender do tablet."],
    hands: ["Higiene das mãos", "Aqui será desenhado o painel de controle de rotina e evidências de higienização conforme o fluxo que você vai detalhar depois."],
    settings: ["Configurações", "Aqui ficarão metas, usuários, permissões, parâmetros de pontuação e regras visuais do dashboard."]
  };

  if (state.view === "home") return dashboardHome();
  if (state.view === "charts") return chartsPage();
  if (state.view === "area") return areaDetailPage();
  if (state.view === "start") return startAuditPage();
  if (state.view === "checklist") return checklistPage();
  if (state.view === "tables") return foodTablesPage();
  const [title, text] = placeholders[state.view] || placeholders.audits;
  return placeholderPage(title, text);
}

function render(options = {}) {
  app.className = `app-shell ${state.sidebarCollapsed ? "is-collapsed" : ""}`;
  app.innerHTML = `
    ${sidebar()}
    <main class="main">
      ${topbar()}
      <section class="content">
        ${viewContent()}
      </section>
    </main>
  `;
  if (!options.skipSave) saveState();
}

document.addEventListener("click", (event) => {
  const nav = event.target.closest("[data-nav]");
  if (nav) {
    setView(nav.dataset.nav);
    return;
  }

  if (event.target.closest("[data-toggle-sidebar]")) {
    state.sidebarCollapsed = !state.sidebarCollapsed;
    render();
    return;
  }

  const area = event.target.closest("[data-area]");
  if (area) {
    setSelectedArea(area.dataset.area);
    return;
  }

  const chartArea = event.target.closest("[data-chart-area]");
  if (chartArea) {
    state.chartFocusArea = chartArea.dataset.chartArea;
    state.selectedArea = chartArea.dataset.chartArea;
    state.view = "charts";
    render();
    return;
  }

  const detail = event.target.closest("[data-area-detail]");
  if (detail) {
    goAreaDetail(detail.dataset.areaDetail);
    return;
  }

  const start = event.target.closest("[data-start-area]");
  if (start) {
    state.selectedArea = start.dataset.startArea;
    state.detailBlock = null;
    state.checklistBlock = null;
    state.checklistPage = 0;
    state.checklistBlocksOpen = false;
    state.leaveAuditConfirm = false;
    state.view = "checklist";
    render();
    return;
  }

  const month = event.target.closest("[data-month]");
  if (month) {
    if (futureMonthIds.has(month.dataset.month)) return;
    state.selectedMonth = month.dataset.month;
    render();
    return;
  }

  if (event.target.closest("[data-toggle-chart-size]")) {
    state.chartExpanded = !state.chartExpanded;
    render();
    return;
  }

  if (event.target.closest("[data-toggle-chart-mode]")) {
    state.chartMode = state.chartMode === "actions" ? "scores" : "actions";
    render();
    return;
  }

  const tableSection = event.target.closest("[data-table-section]");
  if (tableSection) {
    const id = tableSection.dataset.tableSection;
    state.openTableSection = state.openTableSection === id ? null : id;
    render();
    return;
  }

  if (event.target.closest("[data-close-table-section]")) {
    state.openTableSection = null;
    render();
    return;
  }

  if (event.target.closest("[data-clear-chart-focus]")) {
    state.chartFocusArea = null;
    render();
    return;
  }

  const detailBlock = event.target.closest("[data-detail-block]");
  if (detailBlock) {
    state.detailBlock = detailBlock.dataset.detailBlock;
    state.detailFilter = "all";
    render();
    return;
  }

  const detailFilter = event.target.closest("[data-detail-filter]");
  if (detailFilter) {
    state.detailFilter = detailFilter.dataset.detailFilter;
    render();
    return;
  }

  if (event.target.closest("[data-toggle-detail-actions]")) {
    state.detailActionsOpen = !state.detailActionsOpen;
    render();
    return;
  }

  if (event.target.closest("[data-close-details]")) {
    state.detailBlock = null;
    state.detailFilter = "all";
    render();
    return;
  }

  if (event.target.closest("[data-checklist-blocks]")) {
    state.checklistBlocksOpen = !state.checklistBlocksOpen;
    render();
    return;
  }

  if (event.target.closest("[data-request-leave-audit]")) {
    state.leaveAuditConfirm = true;
    render();
    return;
  }

  if (event.target.closest("[data-cancel-leave-audit]")) {
    state.leaveAuditConfirm = false;
    render();
    return;
  }

  if (event.target.closest("[data-confirm-leave-audit]")) {
    state.leaveAuditConfirm = false;
    state.view = "start";
    render();
    return;
  }

  const checklistBlock = event.target.closest("[data-checklist-block]");
  if (checklistBlock) {
    state.checklistBlock = checklistBlock.dataset.checklistBlock;
    state.checklistPage = 0;
    render();
    return;
  }

  const checklistPage = event.target.closest("[data-checklist-page]");
  if (checklistPage) {
    state.checklistPage = Number(checklistPage.dataset.checklistPage) || 0;
    render();
    return;
  }

  const answer = event.target.closest("[data-answer]");
  if (answer) {
    const areaId = state.selectedArea;
    state.answers = {
      ...state.answers,
      [areaId]: {
        ...(state.answers[areaId] || {}),
        [answer.dataset.question]: answer.dataset.answer
      }
    };
    render();
    return;
  }

  if (event.target.closest("[data-clear-selection]")) {
    state.selectedArea = "";
    state.chartFocusArea = null;
    render();
    return;
  }

  if (event.target.closest("[data-back]")) {
    state.detailBlock = null;
    if (state.view === "checklist") {
      state.leaveAuditConfirm = true;
    } else {
      state.view = "home";
    }
    render();
  }
});

render();
hydrateStateFromBackend();
registerServiceWorker();
