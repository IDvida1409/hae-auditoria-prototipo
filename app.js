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
  search: `<svg viewBox="0 0 24 24"><circle cx="10.8" cy="10.8" r="6.2"/><path d="m15.4 15.4 4.2 4.2"/></svg>`,
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
  satisfatorio: { label: "Acima da meta", legend: "Nota acima da meta", color: "#31aa42" },
  moderado: { label: "Na meta", legend: "Nota na meta", color: "#e9b300" },
  medio: { label: "Abaixo da meta", legend: "Nota abaixo da meta", color: "#f47b20" },
  critico: { label: "Crítico", legend: "Nota crítica", color: "#ee2f36" },
  naoAvaliado: { label: "Não avaliado", legend: "Sem avaliação", color: "#8a96a8" }
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

const questionActionPlanData = {
  "cozinha-catering": {
    "edificacao-e-instalacao-1": {
      status: "concluido",
      previousAudit: "Julho/2026",
      auditDate: "30/07/2026",
      closedAt: "29/08/2026",
      auditor: "Qualidade / Segurança dos Alimentos",
      owner: "Liderança da área auditada",
      title: "Reorganizar fluxo da instalação",
      action: "Adequar a organização física da área para reduzir cruzamento de processo e registrar evidência após a correção.",
      evidence: "assets/report-evidence-utensilios.png?v=question-plan-1",
      evidenceAlt: "Evidência do plano de ação finalizado"
    }
  }
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

const settingsSections = [
  { id: "users", label: "Usuários", icon: "settings", description: "Cadastro, perfis e permissões." },
  { id: "rules", label: "Regras", icon: "target", description: "Metas, pontuação e padrão visual." }
];

let settingsUsers = [];
let settingsInactiveUsers = [];
let settingsAccessAreas = [];
let currentAccessUser = null;
let accessNotice = null;

const accessRoleLabels = {
  admin: "Administrador",
  quality: "Qualidade",
  auditor: "Auditor",
  area_responsible: "Responsável da área",
  restaurant_responsible: "Responsável do restaurante",
  viewer: "Visualizador"
};

function normalizeAccessUser(user) {
  return {
    ...user,
    name: user.full_name,
    profile: accessRoleLabels[user.role] || user.role,
    area: user.area_name || (["admin", "quality"].includes(user.role) ? "Todas as áreas" : "Área a definir"),
    status: user.active ? (user.reset_pending ? "Reset solicitado" : user.must_change_password ? "Primeiro acesso" : "Ativo") : "Inativo"
  };
}

async function accessRequest(path, options = {}) {
  const response = await fetch(`/api/access/${path}`, {
    credentials: "same-origin",
    ...options,
    headers: { "content-type": "application/json", ...options.headers }
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(data.error || "Não foi possível concluir a operação.");
    error.status = response.status;
    throw error;
  }
  return data;
}

async function loadAccessUsers() {
  if (currentAccessUser?.role !== "admin") return;
  const data = await accessRequest("users");
  const users = (data.users || []).map(normalizeAccessUser);
  settingsUsers = users.filter((user) => user.active);
  settingsInactiveUsers = users.filter((user) => !user.active);
  settingsAccessAreas = data.areas || [];
}

const settingsPermissionProfiles = [
  { profile: "Qualidade/Admin", scope: "Acesso total", actions: "Usuários, metas, auditorias, relatórios, planos e aprovações." },
  { profile: "Auditor", scope: "Execução da auditoria", actions: "Iniciar auditoria, responder checklist, anexar evidências, gerar NCs e finalizar relatório." },
  { profile: "Responsável da área", scope: "Área vinculada", actions: "Visualizar relatório, responder plano de ação, anexar evidência e acompanhar retorno." },
  { profile: "Visualizador", scope: "Somente consulta", actions: "Consultar indicadores, relatórios e histórico sem alterar registros." }
];

const settingsGoalRules = [
  { label: "Meta mínima da área", value: "8,0", detail: "Área dentro da meta a partir desta nota." },
  { label: "Acima da meta", value: "9,0 a 10", detail: "Desempenho destacado em verde." },
  { label: "Abaixo da meta", value: "7,0 a 7,9", detail: "Requer atenção e acompanhamento." },
  { label: "Crítico", value: "Abaixo de 7,0", detail: "Prioridade de correção e gestão." }
];

const settingsScoringRules = [
  { label: "C - Conforme", value: "Atende", detail: "Requisito validado sem plano de ação." },
  { label: "NC - Não Conforme", value: "Não atende", detail: "Exige evidência, observação e plano de ação." },
  { label: "X - Não avaliado", value: "Sem nota", detail: "Item não entra no cálculo, mas fica rastreado." },
  { label: "Risco da pergunta", value: "Peso técnico", detail: "Ajuda a priorizar NCs e relatórios." }
];

const settingsVisualRules = [
  { label: "Borda dos cards", value: "Cor da legenda", detail: "Mostra rapidamente o desempenho da área." },
  { label: "Legenda de nota", value: "Verde, amarelo, laranja e vermelho", detail: "Mantém padrão visual do dashboard e relatórios." },
  { label: "Legenda de risco", value: "Baixo, Moderado, Médio e Alto", detail: "Usada para classificar NCs e priorizar ações." },
  { label: "Alertas", value: "Badges e avisos", detail: "Sinalizam pendências, devolutivas, atrasos e evidências." }
];

const planningTabs = [
  ["overview", "Visão geral"],
  ["plans", "Planos de ação"],
  ["feedback", "Devolutivas"],
  ["history", "Histórico"],
  ["rules", "Configurações"]
];

const planningSettings = [
  ["Prazo padrão", "30 dias", "Conta a partir do envio do relatório ou da ciência do responsável."],
  ["Nova tentativa", "Permitida", "Quando o auditor reprova dentro do prazo, o mesmo plano pode ser reaberto."],
  ["Fora do prazo", "Somente com justificativa", "Responsável precisa justificar atraso antes de enviar nova evidência."],
  ["Evidência", "Foto obrigatória", "O plano exige foto ou arquivo para concluir a devolutiva."],
  ["Ciência", "Ativa", "Responsável registra ciência ao abrir o plano no painel."]
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
  reportFolder: "report-folder",
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

const riskDisplayOrder = ["baixo", "moderado", "medio", "critico"];
const riskPriorityOrder = ["critico", "medio", "moderado", "baixo"];

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
    selectedArea: "",
    chartFocusArea: null,
    chartExpanded: false,
    chartMode: "scores",
    selectedMonth: currentMonthId,
    reportKind: "monthly",
    answers: {},
    detailBlock: null,
    detailActionsOpen: false,
    detailFilter: "all",
    checklistBlock: null,
    checklistPage: 0,
    checklistBlocksOpen: false,
    auditInstructionsOpen: false,
    actionPlanNoticeQuestion: null,
    openTableSection: "recebimento",
    settingsSection: "users",
    settingsUserView: "new",
    settingsRulesView: "goals",
    settingsUsersExpanded: false,
    planningView: "overview",
    planningAreaId: "",
    planningStatusFilter: "",
    planningMonthFilter: "",
    feedbackExpanded: false,
    settingsMenuExpanded: false,
    reportFolderArea: null,
    reportPdfSource: false,
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
    reportKind: source.reportKind,
    answers: source.answers,
    checklistBlock: source.checklistBlock,
    checklistPage: source.checklistPage,
    openTableSection: source.openTableSection,
    settingsSection: source.settingsSection,
    settingsUserView: source.settingsUserView,
    settingsRulesView: source.settingsRulesView,
    settingsUsersExpanded: source.settingsUsersExpanded,
    planningView: source.planningView,
    planningAreaId: source.planningAreaId,
    planningStatusFilter: source.planningStatusFilter,
    planningMonthFilter: source.planningMonthFilter,
    settingsMenuExpanded: source.settingsMenuExpanded
  };
}

function normalizeSavedState(saved = {}) {
  const base = defaultState();
  const validViews = new Set([...navItems.map(([id]) => id), "users", "area", "checklist"]);
  const validAreaIds = new Set(areaData.map((area) => area.id));
  const validMonthIds = new Set(months.map(([monthId]) => monthId));
  const validSettingsSections = new Set(settingsSections.map((section) => section.id));
  const validSettingsUserViews = new Set(["active", "new", "inactive"]);
  const validSettingsRulesViews = new Set(["goals", "scoring", "visual", "docs", "tables"]);
  const validPlanningViews = new Set(planningTabs.map(([id]) => id));
  const merged = { ...base, ...saved };
  return {
    ...merged,
    view: validViews.has(merged.view) ? merged.view : base.view,
    selectedArea: validAreaIds.has(merged.selectedArea) || merged.selectedArea === "" ? merged.selectedArea : base.selectedArea,
    chartFocusArea: validAreaIds.has(merged.chartFocusArea) ? merged.chartFocusArea : null,
    chartExpanded: false,
    chartMode: merged.chartMode === "actions" ? "actions" : "scores",
    selectedMonth: validMonthIds.has(merged.selectedMonth) ? merged.selectedMonth : currentMonthId,
    reportKind: merged.reportKind === "comparison" ? "comparison" : "monthly",
    answers: merged.answers && typeof merged.answers === "object" ? merged.answers : {},
    detailBlock: null,
    detailActionsOpen: false,
    detailFilter: "all",
    checklistBlocksOpen: false,
    actionPlanNoticeQuestion: null,
    reportFolderArea: null,
    reportPdfSource: false,
    auditInstructionsOpen: false,
    settingsSection: validSettingsSections.has(merged.settingsSection) ? merged.settingsSection : base.settingsSection,
    settingsUserView: validSettingsUserViews.has(merged.settingsUserView) ? merged.settingsUserView : base.settingsUserView,
    settingsRulesView: validSettingsRulesViews.has(merged.settingsRulesView) ? merged.settingsRulesView : base.settingsRulesView,
    settingsUsersExpanded: Boolean(merged.settingsUsersExpanded),
    planningView: validPlanningViews.has(merged.planningView) ? merged.planningView : base.planningView,
    planningAreaId: validAreaIds.has(merged.planningAreaId) || merged.planningAreaId === "" ? merged.planningAreaId : base.planningAreaId,
    planningStatusFilter: ["", "awaiting_send", "in_progress", "overdue", "pending_review"].includes(merged.planningStatusFilter) ? merged.planningStatusFilter : "",
    planningMonthFilter: ["", "2026-09", "2026-08", "2026-07"].includes(merged.planningMonthFilter) ? merged.planningMonthFilter : "",
    feedbackExpanded: false,
    settingsMenuExpanded: Boolean(merged.settingsMenuExpanded),
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

function viewFromHash() {
  const view = location.hash.replace(/^#\/?/, "");
  return new Set([...navItems.map(([id]) => id), "users"]).has(view) ? view : null;
}

function syncHashWithView(view) {
  if (!new Set([...navItems.map(([id]) => id), "users"]).has(view) || location.protocol === "file:") return;
  const nextHash = `#${view}`;
  if (location.hash !== nextHash) history.replaceState(null, "", nextHash);
}

let state = readSavedState();
const hashView = viewFromHash();
if (hashView) state.view = hashView;
if (state.view === "settings") state.settingsMenuExpanded = true;
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
      const hashView = viewFromHash();
      if (hashView) state.view = hashView;
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

function reportFileRequest() {
  const params = new URLSearchParams(location.search);
  const kind = params.get("reportFile");
  if (kind !== "monthly" && kind !== "comparison") return null;
  const area = areaById(params.get("area") || "");
  if (!area) return null;
  return { kind, area };
}

function renderReportFileRequest(request) {
  state.selectedArea = request.area.id;
  state.reportKind = request.kind;
  document.body.classList.add("report-document-body");
  app.className = "app-shell is-report-document";
  app.innerHTML = `<main class="stored-report-view">${request.kind === "comparison" ? comparativeReportPage() : monthlyReportPage()}</main>`;
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

function ncRowsForArea(area) {
  return questionRowsForArea(area).filter((question) => question.answer === "NC");
}

function ncRiskCounts(area = null) {
  const base = { baixo: 0, moderado: 0, medio: 0, critico: 0 };
  const rows = area ? ncRowsForArea(area) : areaData.flatMap((entry) => ncRowsForArea(entry));
  rows.forEach((question) => {
    if (base[question.riskLevel] !== undefined) base[question.riskLevel] += 1;
  });
  return base;
}

function highestNcRiskLevel(area) {
  const rows = ncRowsForArea(area);
  return riskPriorityOrder.find((level) => rows.some((row) => row.riskLevel === level)) || "none";
}

function riskSummary(area) {
  const base = ncRiskCounts(area);
  const max = Math.max(1, ...Object.values(base));
  return riskDisplayOrder.map((level) => {
    const count = base[level];
    return {
      level,
      count,
      width: Math.max(10, Math.round((count / max) * 86))
    };
  });
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
  return `<img class="${className} ui-icon-${file}" src="assets/${folder}/${variant}/${file}.${ext}?v=density-3" alt="" aria-hidden="true" />`;
}

function svgIcon(name, className = "tiny-icon", variant = "blue") {
  if (uiIconFiles[name]) {
    return `<span class="${className} asset-icon-holder">${assetIcon(name, variant)}</span>`;
  }
  return `<span class="${className}">${icons[name] || ""}</span>`;
}

function setView(view) {
  state.view = view;
  if (view !== "settings") state.settingsMenuExpanded = false;
  syncHashWithView(view);
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

function settingsSidebarNav() {
  return `
    <div class="nav-sublist" aria-label="Opções de configurações">
      ${settingsSections
        .map(
          (section) => `
            <button class="nav-subitem ${state.settingsSection === section.id ? "is-active" : ""}" data-settings-section="${section.id}">
              ${escapeHtml(section.label)}
            </button>
          `
        )
        .join("")}
    </div>
  `;
}

function sidebar() {
  return `
    <aside class="sidebar">
      <div class="brand">
        <div class="brand-logo-card">
          <img src="assets/einstein-logo-menu.png?v=einstein-menu-1" alt="" aria-hidden="true" />
        </div>
        <div class="brand-title"><span>Hospital Einstein</span><span>Morumbi</span></div>
      </div>
      <nav class="nav-list" aria-label="Navegação principal">
        ${navItems
          .map(([id, label, icon]) => {
            const expanded = id === "settings" && state.view === "settings" && state.settingsMenuExpanded;
            return `
              <div class="nav-group ${expanded ? "is-expanded" : ""}">
                <button class="nav-item ${state.view === id ? "is-active" : ""}" data-nav="${id}" title="${label}">
                  <span class="nav-icon">${assetIcon(icon, "white")}</span>
                  <span class="nav-label">${label}</span>
                </button>
                ${expanded ? settingsSidebarNav() : ""}
              </div>
            `;
          })
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
  const displayName = currentAccessUser?.full_name || "Usuário";
  const initials = displayName.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]).join("").toUpperCase() || "US";
  const roleLabel = accessRoleLabels[currentAccessUser?.role] || "Acesso offline";
  return `
    <header class="topbar fichario-topbar">
      <div class="brand-row">
        <img class="idauditor-mark" src="assets/idauditor-logo.png?v=fichario-shell-1" alt="IDAuditor" />
        <span class="app-build-badge">Teste 1.0.7</span>
      </div>
      <div class="unit-copy">
        <img class="hospital-mark" src="assets/einstein-logo-menu.png?v=fichario-shell-1" alt="" />
        <span>Hospital Einstein · Unidade Morumbi</span>
      </div>
      <label class="top-search">
        ${icons.search}
        <input type="search" placeholder="Buscar área ou relatório..." aria-label="Buscar área ou relatório" />
      </label>
      <button class="message-btn" type="button" aria-label="Mensagens">
        <img src="assets/fichario-icons/message.png?v=fichario-shell-1" alt="" />
      </button>
      <div class="user-mini" data-user-menu>
        <button class="user-menu-trigger" type="button" data-user-menu-trigger aria-expanded="false">
          <span class="user-avatar">${escapeHtml(initials)}</span>
          <span class="user-name-block"><strong>${escapeHtml(displayName)}</strong><span>${escapeHtml(roleLabel)}</span></span>
          ${icons.chevron}
        </button>
        <div class="user-menu hidden" data-user-menu-panel>
          ${currentAccessUser?.role === "admin" ? '<button type="button" data-nav="users">Usuários</button>' : ""}
          <button type="button" data-nav="settings">Alterar senha</button>
          <button type="button" data-access-logout>Sair</button>
        </div>
      </div>
    </header>
  `;
}

function ficharioTabs() {
  const tabs = [
    ["home", "Início", "home"],
    ["audits", "Auditorias", "audits"],
    ["charts", "Gráficos", "charts"],
    ["actions", "Planejamento", "audit-planning"],
    ["reports", "Relatórios", "reports"],
    ["settings", "Configuração", "settings"],
    ["users", "Usuários", "users"]
  ].filter(([id]) => id !== "users" || currentAccessUser?.role === "admin");
  return `
    <nav class="fichario-tabs" aria-label="Navegação principal">
      ${tabs.map(([id, label, icon]) => `
        <button class="fichario-tab ${state.view === id ? "is-active" : ""}" data-nav="${id}" type="button">
          <img src="assets/fichario-icons/${icon}.png?v=fichario-shell-1" alt="" aria-hidden="true" />
          <span>${label}</span>
        </button>
      `).join("")}
    </nav>
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

function dashboardLegend() {
  const performanceItems = [
    ["satisfatorio", statusMap.satisfatorio.label],
    ["moderado", statusMap.moderado.label],
    ["medio", statusMap.medio.label],
    ["critico", statusMap.critico.label]
  ];
  const riskItems = riskDisplayOrder.map((level) => [level, riskMeta[level].label]);
  const legendItem = ([key, label], type) => {
    const color = type === "risk" ? riskMeta[key].color : statusMap[key].color;
    return `<span class="panel-legend-item" style="--legend-color:${color}"><i></i>${label}</span>`;
  };

  return `
    <div class="panel-legends" aria-label="Legendas do painel">
      <div class="panel-legend-group">
        <strong>Desempenho da nota</strong>
        <span>${performanceItems.map((item) => legendItem(item, "performance")).join("")}</span>
      </div>
      <div class="panel-legend-group">
        <strong>Risco das NCs</strong>
        <span>${riskItems.map((item) => legendItem(item, "risk")).join("")}</span>
      </div>
    </div>
  `;
}

function quickMetrics(area) {
  const status = statusMap[area.status];
  const counts = ncRiskCounts(area);
  const highestLevel = highestNcRiskLevel(area);
  const highestMeta = riskMeta[highestLevel] || riskMeta.none;
  const riskItems = riskDisplayOrder
    .map((level) => {
      const meta = riskMeta[level];
      return `
        <span class="risk-count-item" style="--risk-color:${meta.color}">
          <i></i>
          <em>${meta.label}</em>
          <b>${counts[level]}</b>
        </span>
      `;
    })
    .join("");
  return `
    <div class="quick-metrics quick-metrics-risk">
      <div class="quick-metric metric-weighted-score" style="--metric-color:${status.color}">
        <small>Nota da área</small>
        <b>${formatScore(area.score)}</b>
      </div>
      <div class="quick-metric metric-risk-distribution">
        <small>NCs por nível de risco</small>
        <div class="risk-count-strip">${riskItems}</div>
      </div>
      <div class="quick-metric metric-highest-risk" style="--metric-color:${highestMeta.color}">
        <small>Maior risco encontrado</small>
        <b>${highestMeta.label}</b>
        <span>${area.ncs} NCs registradas</span>
      </div>
      <div class="quick-metric metric-high-risk-nc" style="--metric-color:${riskMeta.critico.color}">
        <small>Itens de alto risco não conformes</small>
        <b>${counts.critico}</b>
        <span>${counts.critico === 1 ? "item exige prioridade" : "itens exigem prioridade"}</span>
      </div>
    </div>
  `;
}

function selectedPanel(extraClass = "") {
  if (!state.selectedArea) {
    return "";
  }
  const area = areaById(state.selectedArea);
  const status = statusMap[area.status];
  const ncRows = ncRowsForArea(area);
  const highRiskCount = ncRiskCounts(area).critico;
  const attentionText = highRiskCount
    ? `${highRiskCount} ${highRiskCount === 1 ? "item de alto risco está não conforme" : "itens de alto risco estão não conformes"}; priorizar ação corretiva.`
    : "Acompanhar as não conformidades registradas e manter a evolução da nota.";
  return `
    <aside class="selected-panel surface ${extraClass}">
      <button class="panel-close" data-clear-selection title="Fechar detalhe">${icons.close}</button>
      <h2>Área selecionada</h2>
      <div class="selected-area-head" style="--status-color:${status.color}">
        <img class="selected-icon" src="assets/icons/${area.icon}" alt="" />
        <div class="selected-area-copy">
          <h2>${area.name}</h2>
          <div class="selected-status-line">
            <div class="selected-score">${formatScore(area.score)}<small>/10</small></div>
            <span class="status-pill color-only" title="${status.legend || status.label}" aria-label="${status.legend || status.label}"></span>
          </div>
        </div>
      </div>
      ${quickMetrics(area)}
      <div class="attention-note">${svgIcon("idea")} <span>${attentionText}</span></div>
      <div>
        <div class="side-title">Principais NCs por risco</div>
        <div class="ncs-list">
          ${ncRows
            .slice(0, 3)
            .map((row) => {
              const meta = riskMeta[row.riskLevel] || riskMeta.none;
              return `
                <div class="nc-row" style="--tag:${meta.color}">
                  ${svgIcon("warning")}
                  <span>${escapeHtml(row.text)}</span>
                  <span class="nc-tag is-risk-label">Risco ${meta.label}</span>
                  <span>›</span>
                </div>
              `;
            })
            .join("")}
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
  if (!area) {
    return `
      <div class="dash-evolution" aria-label="Prévia da evolução da nota">
        <svg viewBox="0 0 360 104" role="img" aria-label="Evolução das notas nos últimos seis meses">
          <line x1="14" y1="79" x2="346" y2="79" stroke="#e4e9f0" stroke-width="1" />
          <line x1="14" y1="50" x2="346" y2="50" stroke="#dfeee2" stroke-width="1.1" />
          <path d="M14,65 L80,58 L146,60 L213,51 L279,39 L346,30" fill="none" stroke="#2f8f46" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" />
          <g fill="#2f8f46" stroke="#fff" stroke-width="2">
            <circle cx="14" cy="65" r="4.4"></circle>
            <circle cx="80" cy="58" r="4.4"></circle>
            <circle cx="146" cy="60" r="4.4"></circle>
            <circle cx="213" cy="51" r="4.4"></circle>
            <circle cx="279" cy="39" r="4.4"></circle>
            <circle cx="346" cy="30" r="4.4"></circle>
          </g>
          <g fill="#2f8f46" font-size="11.2" font-weight="650" text-anchor="middle">
            <text x="14" y="52">7,3</text>
            <text x="80" y="45">7,4</text>
            <text x="146" y="47">7,3</text>
            <text x="213" y="38">7,5</text>
            <text x="279" y="26">7,8</text>
            <text x="346" y="17">8,2</text>
          </g>
          <g fill="#425474" font-size="11.2" font-weight="560" text-anchor="middle">
            <text x="14" y="100">Mar</text>
            <text x="80" y="100">Abr</text>
            <text x="146" y="100">Mai</text>
            <text x="213" y="100">Jun</text>
            <text x="279" y="100">Jul</text>
            <text x="346" y="100">Ago</text>
          </g>
        </svg>
      </div>
    `;
  }
  const chartMonths = months.slice(2, 8).map(([id]) => id);
  const monthsLabel = ["Mar", "Abr", "Mai", "Jun", "Jul", "Ago"];
  const areaIndex = areaData.findIndex((item) => item.id === area.id);
  const points = chartMonths.map((monthId) => monthLines[monthId]?.[areaIndex] ?? area.score);
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
  const monthIds = availableMonthIds();
  const monthPoints = monthIds.map((monthId) => ({ monthId, value: monthAverage(monthId) }));
  const availablePoints = monthPoints.filter((point) => point.value != null);
  const labels = monthIds.map((monthId) => monthId.slice(0, 3).replace(/^./, (letter) => letter.toUpperCase()));
  const w = 460;
  const h = 138;
  const pad = { left: 24, right: 24, top: 34, bottom: 30 };
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
      <path d="${lineD}" fill="none" stroke="#2f8f46" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"></path>
      ${availablePoints
        .map((point) => {
          const index = monthIds.indexOf(point.monthId);
          const x = pad.left + index * xStep;
          const y = yFor(point.value);
          return `
            <text x="${x}" y="${y - 12}" text-anchor="middle" fill="#207333" font-size="14" font-weight="780">${formatScore(point.value)}</text>
            <circle cx="${x}" cy="${y}" r="5" fill="#2f8f46" stroke="#ffffff" stroke-width="2.4"></circle>
          `;
        })
        .join("")}
      ${labels
        .map(
          (label, index) => `
            <text x="${pad.left + index * xStep}" y="${h - 7}" text-anchor="middle" fill="${monthPoints[index].value == null ? "#a8b3c2" : "#425474"}" font-size="10.6" font-weight="700">${label}</text>
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
    <div class="graph-card-body graph-assessment is-panel-style">
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

function graphRiskSummary() {
  const counts = ncRiskCounts();
  const total = Math.max(1, Object.values(counts).reduce((sum, value) => sum + value, 0));
  const rows = riskDisplayOrder.map((level) => ({
    label: riskMeta[level].label,
    color: riskMeta[level].color,
    value: counts[level]
  }));
  return `
    <div class="graph-card-body graph-risk-summary">
      <div class="risk-total-line"><strong>${total}</strong><span>NCs registradas no mês</span></div>
      ${graphSummaryRows(rows, total)}
    </div>
  `;
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
    <div class="fichario-home ${hasSelection ? "has-selection" : "no-selection"}">
      <div class="fichario-panel-head">
        <div class="home-intro">
          <span class="eyebrow home-eyebrow"><img src="assets/idvida-boneco.png?v=fichario-shell-1" alt="" aria-hidden="true" />PAINEL INICIAL</span>
          <h1>Olá, João</h1>
          <p>Resumo operacional. Veja as notas das áreas auditadas no último fechamento.</p>
        </div>
        <div class="date-line"><img src="assets/fichario-icons/calendar.png?v=fichario-shell-1" alt="" aria-hidden="true" /><span>Terça-feira, 15 de setembro de 2026</span></div>
      </div>
      ${dashboardLegend()}
      <div class="fichario-main-layout">
        <div class="fichario-main-left">
          <div class="fichario-summary-grid">
            <section class="fichario-summary-card">
              <h2>Pendências gerais</h2>
              <div class="pending-compact-grid">
                <span><img src="assets/ui-icons-approved/blue/action-plan.png" alt="" /><b>12</b><small>planos pendentes</small></span>
                <span><img src="assets/ui-icons-approved/blue/critical.png" alt="" /><b>8</b><small>NCs de alto risco</small></span>
                <span><img src="assets/ui-icons-approved/blue/ncs.png" alt="" /><b>1</b><small>documento vencido</small></span>
                <span><img src="assets/ui-icons-approved/blue/late.png" alt="" /><b>2</b><small>áreas atrasadas</small></span>
              </div>
            </section>
            <section class="fichario-summary-card">
              <h2>Evolução da nota</h2>
              <p>Visão geral dos últimos meses.</p>
              ${dashboardEvolution(selectedArea)}
            </section>
            <section class="fichario-summary-card feedback-summary-card ${state.feedbackExpanded ? "is-expanded" : ""}">
              <h2>Últimas devolutivas</h2>
              <p>Retornos recentes dos responsáveis.</p>
              <div class="feedback-compact-row">
                <div class="feedback-count"><strong>4</strong><span>retornos recentes</span></div>
                <button class="feedback-toggle" type="button" data-toggle-feedback>${state.feedbackExpanded ? "Ocultar devolutivas" : "Ver devolutivas"}</button>
              </div>
              <div class="feedback-list ${state.feedbackExpanded ? "" : "hidden"}">
                <div class="feedback-item"><strong>Cozinha Catering</strong><span class="feedback-status" style="--status-color: var(--green)">Aprovado</span></div>
                <div class="feedback-item"><strong>Área de Resíduos</strong><span class="feedback-status" style="--status-color: var(--yellow)">Em análise</span></div>
                <div class="feedback-item"><strong>Higienização de Louça</strong><span class="feedback-status" style="--status-color: var(--orange)">Pendente</span></div>
                <div class="feedback-item"><strong>DML - Produto Químico</strong><span class="feedback-status" style="--status-color: var(--red)">Reprovado</span></div>
              </div>
            </section>
          </div>
          ${hasSelection ? selectedPanel("mobile-selected-panel") : ""}
          <div class="area-grid ${hasSelection ? "is-focused" : ""}">
            ${areaData.map((area) => areaTile(area)).join("")}
          </div>
        </div>
        ${hasSelection ? selectedPanel("desktop-selected-panel") : ""}
      </div>
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

function priorityLabel(score) {
  if (score >= 68) return "Alta";
  if (score >= 42) return "Média";
  return "Baixa";
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
        <b><small>prioridade</small>${priorityLabel(top.priority)}</b>
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
  const nextModeLabel = isImpactMode ? "Evolução da nota" : "Áreas com maior prioridade de ação";
  return `
    <div class="graph-layout ${state.chartExpanded ? "is-expanded" : ""} ${isImpactMode ? "is-impact-mode" : ""}">
      <div>
        <section class="surface chart-panel chart-panel-large">
          <div class="chart-head">
            <div>
              <h2>${isImpactMode ? "Áreas com maior prioridade de ação" : "Evolução da nota"}</h2>
              <p class="chart-note">${isImpactMode ? "Ranking combinado por nota baixa, NCs de alto risco, recorrência e andamento dos planos." : "Clique em um mês abaixo para comparar com o mês atual (Agosto/2026)."}</p>
            </div>
            <div class="chart-tools">
              <button class="chart-mode-btn" data-toggle-chart-mode title="Ver ${nextModeLabel}">
                <span>${nextModeLabel}</span>
                ${icons.chevron}
              </button>
              <button class="chart-expand-btn" data-toggle-chart-size title="${state.chartExpanded ? "Reduzir gráfico" : "Expandir gráfico"}">${state.chartExpanded ? "-" : "+"}</button>
            </div>
          </div>
          <div class="mobile-chart-scroll">
            ${isImpactMode ? actionImpactChart() : chartSvg()}
          </div>
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
            <div class="mini-panel-head">${svgIcon("chart")} Evolução da nota</div>
            ${graphGeneralAssessment()}
          </section>
          <section class="mini-panel surface">
            <div class="mini-panel-head">${svgIcon("grid")} Distribuição das NCs por risco</div>
            ${graphRiskSummary()}
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

function reportPreviousMonthId() {
  const available = availableMonthIds();
  const currentIndex = available.indexOf(currentMonthId);
  return currentIndex > 0 ? available[currentIndex - 1] : available[0] || currentMonthId;
}

function reportMonthLabel(monthId) {
  const monthNames = {
    jan: "Janeiro",
    fev: "Fevereiro",
    mar: "Março",
    abr: "Abril",
    mai: "Maio",
    jun: "Junho",
    jul: "Julho",
    ago: "Agosto",
    set: "Setembro",
    out: "Outubro",
    nov: "Novembro",
    dez: "Dezembro"
  };
  const [month, year] = String(monthId).split("/");
  return `${monthNames[month] || month}/${year ? `20${year}` : "2026"}`;
}

function reportShortMonthLabel(monthId) {
  const monthNames = {
    jan: "Jan",
    fev: "Fev",
    mar: "Mar",
    abr: "Abr",
    mai: "Mai",
    jun: "Jun",
    jul: "Jul",
    ago: "Ago",
    set: "Set",
    out: "Out",
    nov: "Nov",
    dez: "Dez"
  };
  const [month, year] = String(monthId).split("/");
  return `${monthNames[month] || month}/${year || "26"}`;
}

function reportQuestionTotals() {
  return areaData.reduce(
    (totals, area) => {
      const counts = countsFromRows(questionRowsForArea(area));
      totals.C += counts.C;
      totals.NC += counts.NC;
      totals.X += counts.X;
      return totals;
    },
    { C: 0, NC: 0, X: 0 }
  );
}

function reportActionTotals() {
  return areaData.reduce(
    (totals, area) => {
      const stats = actionPlanStats(area);
      totals.total += stats.total;
      totals.pending += stats.pending;
      totals.inProgress += stats.inProgress;
      totals.done += stats.done;
      totals.late += stats.late;
      totals.recurrent += stats.recurrent;
      totals.improved += stats.improved;
      totals.noEffect += stats.noEffect;
      totals.critical += stats.critical;
      return totals;
    },
    { total: 0, pending: 0, inProgress: 0, done: 0, late: 0, recurrent: 0, improved: 0, noEffect: 0, critical: 0 }
  );
}

function reportHeader(title, subtitle, period) {
  return `
    <header class="report-header-block">
      <div class="report-brand-row">
        <div class="report-idvida-mark">ID<span>VIDA</span></div>
        <span class="report-brand-divider"></span>
        <div class="report-einstein-mark">
          <img src="assets/einstein-logo-menu.png?v=report-logo-1" alt="" aria-hidden="true" />
          <span>Hospital Einstein<br />Morumbi</span>
        </div>
      </div>
      <div class="report-title-copy">
        <span>AUDITORIA INTERNA</span>
        <h2>${title}</h2>
        <p>${subtitle}</p>
      </div>
      <div class="report-period-card">
        <span>Período analisado</span>
        <strong>${period}</strong>
      </div>
    </header>
  `;
}

function reportAuditInfo() {
  const rows = [
    ["Auditoria Interna realizada por:", "Equipe de Qualidade / Segurança dos Alimentos"],
    ["Reunião realizada com:", "Responsáveis das áreas auditadas"],
    ["Periodicidade da Auditoria Interna:", "Mensal"],
    ["Data da Auditoria Interna:", "30/08/2026"],
    ["Horário da Auditoria Interna:", "08h00 às 17h00"]
  ];

  return `
    <section class="report-info-card">
      <div>
        <span>Unidade auditada</span>
        <strong>Hospital Einstein - Morumbi</strong>
      </div>
      <div class="report-info-grid">
        ${rows
          .map(
            ([label, value]) => `
              <div class="report-info-row">
                <span>${label}</span>
                <strong>${value}</strong>
              </div>
            `
          )
          .join("")}
      </div>
    </section>
  `;
}

function reportKpiCard(label, value, note, tone = "neutral") {
  return `
    <div class="report-kpi is-${tone}">
      <span>${label}</span>
      <strong>${value}</strong>
      <small>${note}</small>
    </div>
  `;
}

function reportDeltaText(delta) {
  if (delta > 0) return `+${formatScore(delta)}`;
  if (delta < 0) return `-${formatScore(Math.abs(delta))}`;
  return "0,0";
}

function reportEffectLabel(effect) {
  const labels = {
    positive: "Com melhora",
    warning: "Melhora parcial",
    pending: "Em execução",
    danger: "Sem efeito",
    neutral: "Sem histórico"
  };
  return labels[effect.tone] || effect.label;
}

function reportStatusBadge(statusKey) {
  const status = statusMap[statusKey] || statusMap.moderado;
  return `<span class="report-status-badge" style="--badge-color:${status.color}">${status.label}</span>`;
}

function reportComparisonStatus(area, stats, delta) {
  const effect = actionEffectForArea(area, stats, delta);
  return `<span class="report-action-effect is-${effect.tone}">${reportEffectLabel(effect)}</span>`;
}

function reportBarChart({ comparison = false } = {}) {
  const previousId = reportPreviousMonthId();
  const currentValues = monthLines[currentMonthId] || areaData.map((area) => area.score);
  const previousValues = monthLines[previousId] || areaData.map((area) => area.last);
  const width = 1080;
  const height = comparison ? 430 : 410;
  const pad = { left: 48, right: 58, top: 48, bottom: 116 };
  const innerW = width - pad.left - pad.right;
  const innerH = height - pad.top - pad.bottom;
  const plotBottom = pad.top + innerH;
  const slotW = innerW / areaData.length;
  const yFor = (value) => pad.top + innerH - (value / 10) * innerH;
  const ticks = [0, 2, 4, 6, 8, 10];
  const currentLabel = reportMonthLabel(currentMonthId);
  const previousLabel = reportMonthLabel(previousId);

  return `
    <div class="report-chart-frame">
      <svg class="report-bar-chart" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-label="${comparison ? "Comparativo das notas por área" : "Notas por área no mês"}">
        ${ticks
          .map(
            (tick) => `
              <line x1="${pad.left}" y1="${yFor(tick)}" x2="${width - pad.right}" y2="${yFor(tick)}" stroke="${tick === 8 ? "#bdddc3" : "#e5ebf3"}" stroke-width="${tick === 8 ? 1.8 : 1}" />
              <text x="${pad.left - 14}" y="${yFor(tick) + 4}" text-anchor="end" fill="#566781" font-size="11" font-weight="650">${tick}</text>
            `
          )
          .join("")}
        <text x="${width - pad.right + 8}" y="${yFor(8) + 4}" fill="#2f8f46" font-size="12" font-weight="760">Meta 8,0</text>
        <g class="report-chart-legend">
          ${comparison
            ? `
              <rect x="${pad.left}" y="12" width="22" height="6" rx="3" fill="#a9b8ca"></rect>
              <text x="${pad.left + 30}" y="19" fill="#425474" font-size="12" font-weight="700">${previousLabel}</text>
              <rect x="${pad.left + 150}" y="12" width="22" height="6" rx="3" fill="#0a6cff"></rect>
              <text x="${pad.left + 180}" y="19" fill="#425474" font-size="12" font-weight="700">${currentLabel}</text>
            `
            : `
              <rect x="${pad.left}" y="12" width="22" height="6" rx="3" fill="#0a6cff"></rect>
              <text x="${pad.left + 30}" y="19" fill="#425474" font-size="12" font-weight="700">${currentLabel}</text>
            `}
        </g>
        ${areaData
          .map((area, index) => {
            const center = pad.left + index * slotW + slotW / 2;
            const current = currentValues[index] ?? area.score;
            const previous = previousValues[index] ?? area.last;
            const currentBarWidth = comparison ? 20 : 34;
            const previousBarWidth = 20;
            const currentX = comparison ? center + 4 : center - currentBarWidth / 2;
            const previousX = center - previousBarWidth - 4;
            const currentY = yFor(current);
            const previousY = yFor(previous);
            const currentFill = current < 7 ? "#ee2f36" : "#0a6cff";
            return `
              ${comparison ? `<rect x="${previousX}" y="${previousY}" width="${previousBarWidth}" height="${plotBottom - previousY}" rx="7" fill="#a9b8ca"></rect>` : ""}
              <rect x="${currentX}" y="${currentY}" width="${currentBarWidth}" height="${plotBottom - currentY}" rx="7" fill="${currentFill}"></rect>
              <text x="${comparison ? currentX + currentBarWidth / 2 : center}" y="${currentY - 8}" text-anchor="middle" fill="${currentFill}" font-size="11" font-weight="780">${formatScore(current)}</text>
              <text transform="translate(${center}, ${plotBottom + 46}) rotate(-35)" text-anchor="end" fill="#071a3d" font-size="10.5" font-weight="760">
                ${chartLabelLines(area.name)
                  .map((line, lineIndex) => `<tspan x="0" dy="${lineIndex === 0 ? 0 : 13}">${escapeHtml(line)}</tspan>`)
                  .join("")}
              </text>
            `;
          })
          .join("")}
      </svg>
    </div>
  `;
}

function reportMonthlyAreaRows() {
  return areaData
    .map((area) => {
      const stats = actionPlanStats(area);
      return `
        <tr>
          <td><strong>${escapeHtml(area.name)}</strong></td>
          <td>${formatScore(area.score)}</td>
          <td>${area.score >= 8 ? "Dentro da meta" : "Abaixo da meta"}</td>
          <td>${area.ncs}</td>
          <td>${reportStatusBadge(area.status)}</td>
          <td>${stats.pending + stats.inProgress + stats.late} abertos</td>
        </tr>
      `;
    })
    .join("");
}

function reportComparativeAreaRows() {
  const previousId = reportPreviousMonthId();
  const previousValues = monthLines[previousId] || areaData.map((area) => area.last);
  return areaData
    .map((area, index) => {
      const previous = previousValues[index] ?? area.last;
      const delta = area.score - previous;
      const stats = actionPlanStats(area);
      const deltaClass = delta >= 0 ? "positive" : "danger";
      return `
        <tr>
          <td><strong>${escapeHtml(area.name)}</strong></td>
          <td>${formatScore(previous)}</td>
          <td>${formatScore(area.score)}</td>
          <td><span class="report-delta is-${deltaClass}">${reportDeltaText(delta)}</span></td>
          <td>${stats.total} planos</td>
          <td>${reportComparisonStatus(area, stats, delta)}</td>
        </tr>
      `;
    })
    .join("");
}

function reportPlanRows() {
  const statusLabels = {
    pendente: "Pendente",
    andamento: "Em andamento",
    concluido: "Concluído",
    atrasado: "Atrasado"
  };
  return areaData
    .flatMap((area) =>
      actionPlansForArea(area).slice(0, 2).map((plan) => ({
        area,
        plan
      }))
    )
    .slice(0, 8)
    .map(({ area, plan }) => {
      const tone = plan.status === "concluido" ? "positive" : plan.status === "atrasado" ? "danger" : plan.status === "andamento" ? "pending" : "warning";
      return `
        <tr>
          <td><strong>${escapeHtml(area.name)}</strong></td>
          <td>${escapeHtml(plan.title)}</td>
          <td>${escapeHtml(plan.owner)}</td>
          <td><span class="report-action-effect is-${tone}">${statusLabels[plan.status] || plan.status}</span></td>
        </tr>
      `;
    })
    .join("");
}

function reportPriorityRows() {
  return actionImpactRows()
    .slice(0, 5)
    .map((row, index) => `
      <tr>
        <td>${index + 1}</td>
        <td><strong>${escapeHtml(row.area.name)}</strong></td>
        <td>${formatScore(row.area.score)}</td>
        <td>${row.stats.recurrent} recorrentes</td>
        <td>${row.stats.pending + row.stats.inProgress + row.stats.late} abertos</td>
        <td>${Math.round(row.priority)}</td>
      </tr>
    `)
    .join("");
}

function monthlyReportPage() {
  const totals = reportQuestionTotals();
  const actionTotals = reportActionTotals();
  const belowMeta = areaData.filter((area) => area.score < 8).length;
  const openActions = actionTotals.pending + actionTotals.inProgress + actionTotals.late;
  const priority = actionImpactRows()[0];

  return `
    <article class="audit-report-sheet">
      <div class="report-top-rule"></div>
      ${reportHeader(
        "Relatório Consolidado da Auditoria do Mês",
        "Boas Práticas de Manipulação de Alimentos",
        reportMonthLabel(currentMonthId)
      )}
      ${reportAuditInfo()}
      <section class="report-kpi-grid">
        ${reportKpiCard("Nota geral", formatScore(generalScore()), "média das 12 áreas", "good")}
        ${reportKpiCard("Áreas auditadas", areaData.length, "setores avaliados no mês", "blue")}
        ${reportKpiCard("Não conformidades", totals.NC, "itens classificados como NC", "warning")}
        ${reportKpiCard("Planos abertos", openActions, "pendentes, em andamento ou atrasados", "blue")}
        ${reportKpiCard("Abaixo da meta", belowMeta, "áreas abaixo de 8,0", belowMeta ? "danger" : "good")}
      </section>
      <section class="report-section">
        <div class="report-section-head">
          <div>
            <h3>Avaliação geral por área</h3>
            <p>Notas finais do mês com referência visual à meta 8,0.</p>
          </div>
        </div>
        ${reportBarChart()}
      </section>
      <div class="report-two-columns">
        <section class="report-section">
          <div class="report-section-head">
            <div>
              <h3>Resumo por área auditada</h3>
              <p>Visão consolidada de nota, risco, NCs e plano de ação.</p>
            </div>
          </div>
          <div class="report-table-wrap">
            <table class="report-table">
              <thead><tr><th>Área</th><th>Nota</th><th>Meta</th><th>NCs</th><th>Risco</th><th>Plano</th></tr></thead>
              <tbody>${reportMonthlyAreaRows()}</tbody>
            </table>
          </div>
        </section>
        <section class="report-section">
          <div class="report-section-head">
            <div>
              <h3>Planos de ação vinculados</h3>
              <p>Amostra dos planos associados às NCs registradas.</p>
            </div>
          </div>
          <div class="report-table-wrap">
            <table class="report-table">
              <thead><tr><th>Área</th><th>Ação</th><th>Responsável</th><th>Status</th></tr></thead>
              <tbody>${reportPlanRows()}</tbody>
            </table>
          </div>
        </section>
      </div>
      <section class="report-analysis-box">
        <h3>Leitura executiva</h3>
        <p>
          A nota geral de ${formatScore(generalScore())} indica desempenho acima da meta mensal. A principal oportunidade de melhoria está em ${escapeHtml(priority.area.name)}, que combina nota ${formatScore(priority.area.score)}, ${priority.stats.recurrent} NCs recorrentes e ${priority.stats.pending + priority.stats.inProgress + priority.stats.late} planos ainda abertos.
        </p>
      </section>
    </article>
  `;
}

function comparativeReportPage() {
  const previousId = reportPreviousMonthId();
  const previousValues = monthLines[previousId] || areaData.map((area) => area.last);
  const previousAverage = monthAverage(previousId) ?? generalScore();
  const currentAverage = monthAverage(currentMonthId) ?? generalScore();
  const delta = currentAverage - previousAverage;
  const improvedAreas = areaData.filter((area, index) => area.score > (previousValues[index] ?? area.last)).length;
  const worsenedAreas = areaData.filter((area, index) => area.score < (previousValues[index] ?? area.last)).length;
  const actionTotals = reportActionTotals();
  const priority = actionImpactRows()[0];

  return `
    <article class="audit-report-sheet">
      <div class="report-top-rule"></div>
      ${reportHeader(
        "Relatório Analítico Comparativo",
        "Mês atual x mês anterior",
        `${reportMonthLabel(currentMonthId)} x ${reportMonthLabel(previousId)}`
      )}
      ${reportAuditInfo()}
      <section class="report-kpi-grid">
        ${reportKpiCard("Variação geral", reportDeltaText(delta), `${reportShortMonthLabel(currentMonthId)} contra ${reportShortMonthLabel(previousId)}`, delta >= 0 ? "good" : "danger")}
        ${reportKpiCard("Áreas com melhora", improvedAreas, "nota aumentou no mês atual", "good")}
        ${reportKpiCard("Áreas em atenção", worsenedAreas, "nota caiu frente ao mês anterior", worsenedAreas ? "danger" : "good")}
        ${reportKpiCard("Ações com efeito", actionTotals.improved, "planos marcados com melhora", "blue")}
        ${reportKpiCard("Sem efeito", actionTotals.noEffect, "ações sem melhora observada", actionTotals.noEffect ? "warning" : "good")}
      </section>
      <section class="report-section">
        <div class="report-section-head">
          <div>
            <h3>Comparativo de notas por área</h3>
            <p>Barras em pares para comparar o mês anterior com o mês atual.</p>
          </div>
        </div>
        ${reportBarChart({ comparison: true })}
      </section>
      <div class="report-two-columns">
        <section class="report-section">
          <div class="report-section-head">
            <div>
              <h3>Leitura comparativa por área</h3>
              <p>Mostra onde houve melhora, queda ou estabilidade.</p>
            </div>
          </div>
          <div class="report-table-wrap">
            <table class="report-table">
              <thead><tr><th>Área</th><th>${reportShortMonthLabel(previousId)}</th><th>${reportShortMonthLabel(currentMonthId)}</th><th>Variação</th><th>Plano</th><th>Leitura</th></tr></thead>
              <tbody>${reportComparativeAreaRows()}</tbody>
            </table>
          </div>
        </section>
        <section class="report-section">
          <div class="report-section-head">
            <div>
              <h3>Prioridade das ações</h3>
              <p>Ranking para indicar onde agir primeiro.</p>
            </div>
          </div>
          <div class="report-table-wrap">
            <table class="report-table">
              <thead><tr><th>#</th><th>Área</th><th>Nota</th><th>NCs recorrentes</th><th>Planos</th><th>Prioridade</th></tr></thead>
              <tbody>${reportPriorityRows()}</tbody>
            </table>
          </div>
        </section>
      </div>
      <section class="report-analysis-box">
        <h3>Interpretação e direcionamento</h3>
        <p>
          O comparativo aponta ganho geral de ${reportDeltaText(delta)} ponto. A priorização deve começar por ${escapeHtml(priority.area.name)}, pois a área reúne maior oportunidade de melhoria: nota abaixo da meta, recorrência de NCs e planos ainda em aberto. Esse bloco responde diretamente onde agir primeiro, não apenas se a nota subiu ou caiu.
        </p>
      </section>
    </article>
  `;
}

function reportsPage() {
  const isComparison = state.reportKind === "comparison";
  return `
    <section class="reports-page">
      <div class="report-switch surface" aria-label="Tipo de relatório">
        <button class="${!isComparison ? "is-active" : ""}" data-report-kind="monthly">Consolidado do mês</button>
        <button class="${isComparison ? "is-active" : ""}" data-report-kind="comparison">Comparativo mês anterior</button>
      </div>
      ${isComparison ? comparativeReportPage() : monthlyReportPage()}
    </section>
  `;
}

function reportSelectedArea() {
  return areaById(state.selectedArea || "area-residuos");
}

function reportAreaOptions(selectedId) {
  return areaData
    .map((area) => `<option value="${area.id}" ${area.id === selectedId ? "selected" : ""}>${escapeHtml(area.name)}</option>`)
    .join("");
}

function reportOpenActions(stats) {
  return stats.pending + stats.inProgress + stats.late;
}

function reportAreaTotals(area) {
  const rows = questionRowsForArea(area);
  const counts = countsFromRows(rows);
  return {
    ...counts,
    total: rows.length,
    evaluated: counts.C + counts.NC
  };
}

function reportPreviousAreaTotals(area) {
  const current = reportAreaTotals(area);
  const delta = area.score - area.last;
  const ncShift = Math.max(1, Math.round(Math.abs(delta) * 2));
  let previousNc = current.NC;
  if (delta < 0) previousNc = Math.max(0, current.NC - ncShift);
  if (delta > 0) previousNc = Math.min(current.evaluated, current.NC + ncShift);
  return {
    C: Math.max(0, current.evaluated - previousNc),
    NC: previousNc,
    X: current.X,
    total: current.total,
    evaluated: current.evaluated
  };
}

function reportToneForStatus(statusKey) {
  if (statusKey === "satisfatorio") return "good";
  if (statusKey === "moderado") return "moderate";
  if (statusKey === "medio") return "medium";
  return "danger";
}

function reportToneForRisk(level) {
  if (level === "baixo") return "good";
  if (level === "moderado") return "moderate";
  if (level === "medio") return "medium";
  if (level === "critico") return "danger";
  return "neutral";
}

function reportTag(label, tone = "neutral") {
  return `<span class="report-doc-tag is-${tone}">${escapeHtml(label)}</span>`;
}

function reportStatusTag(statusKey) {
  const status = statusMap[statusKey] || statusMap.moderado;
  return reportTag(status.label, reportToneForStatus(statusKey));
}

function reportStatusMarker(statusKey) {
  const status = statusMap[statusKey] || statusMap.moderado;
  return `<span class="report-status-marker is-${reportToneForStatus(statusKey)}" title="${escapeHtml(status.label)}" aria-label="${escapeHtml(status.label)}"></span>`;
}

function reportBlockLabel(label) {
  return reportCompactText(label, 32).toUpperCase();
}

function reportRiskTag(level) {
  const meta = riskMeta[level] || riskMeta.none;
  return reportTag(meta.label, reportToneForRisk(level));
}

function reportActionStatusTag(status) {
  const labels = {
    pendente: ["Pendente", "medium"],
    andamento: ["Em andamento", "neutral"],
    concluido: ["Concluído", "good"],
    atrasado: ["Atrasado", "danger"]
  };
  const [label, tone] = labels[status] || [status || "Pendente", "neutral"];
  return reportTag(label, tone);
}

function reportEffectTag(plan) {
  if (plan.improved === true) return reportTag("Melhora observada", "good");
  if (plan.improved === false) return reportTag("Sem melhora comprovada", "danger");
  return reportTag("Em acompanhamento", "neutral");
}

function reportShortEffectTag(plan) {
  if (plan.improved === true) return reportTag("Com melhora", "good");
  if (plan.improved === false) return reportTag("Sem efeito", "danger");
  return reportTag("Acompanhar", "neutral");
}

function reportAuditWindow() {
  return {
    date: "30/08/2026",
    start: "08h15",
    end: "09h40",
    duration: "1h25"
  };
}

function reportDocHeader(title, area, showMeta = false) {
  const audit = reportAuditWindow();
  return `
    <header class="report-doc-header">
      <div class="report-doc-brand">
        <img class="report-doc-idvida-logo" src="assets/idvida-logo.png?v=doc-report-1" alt="IDVIDA" />
        <span class="report-doc-idvida">ID<span>VIDA</span></span>
        <span class="report-doc-separator"></span>
        <span class="report-doc-hospital">
          <img src="assets/einstein-logo-menu.png?v=doc-report-1" alt="" aria-hidden="true" />
          <span>Hospital Einstein<br />Morumbi</span>
        </span>
      </div>
      <div class="report-doc-heading">
        <span>AUDITORIA INTERNA - BOAS PRÁTICAS DE MANIPULAÇÃO DE ALIMENTOS</span>
        <strong>${escapeHtml(title)}</strong>
        <small>${escapeHtml(area.name)} · ${reportMonthLabel(currentMonthId)}</small>
      </div>
      ${showMeta ? `<div class="report-doc-meta-strip">
        <span><strong>Unidade</strong>Hospital Einstein - Morumbi</span>
        <span><strong>Área</strong>${escapeHtml(area.name)}</span>
        <span><strong>Auditor</strong>Qualidade / Segurança dos Alimentos</span>
        <span><strong>Responsável</strong>Liderança da área auditada</span>
        <span><strong>Data</strong>${audit.date}</span>
        <span><strong>Início</strong>${audit.start}</span>
        <span><strong>Término</strong>${audit.end}</span>
        <span><strong>Duração</strong>${audit.duration}</span>
      </div>` : ""}
    </header>
  `;
}

function reportMonthlyDocHeader(title, area, showMeta = false) {
  const audit = reportAuditWindow();
  return `
    <header class="report-doc-header report-monthly-header">
      <div class="report-doc-brand">
        <img class="report-doc-idvida-logo" src="assets/idvida-logo.png?v=doc-report-1" alt="IDVIDA" />
        <span class="report-doc-idvida">ID<span>VIDA</span></span>
        <span class="report-doc-separator"></span>
        <span class="report-doc-hospital">
          <img src="assets/einstein-logo-menu.png?v=doc-report-1" alt="" aria-hidden="true" />
          <span>Hospital Einstein<br />Morumbi</span>
        </span>
      </div>
      <div class="report-doc-heading">
        <span>AUDITORIA INTERNA - BOAS PRÁTICAS DE MANIPULAÇÃO DE ALIMENTOS</span>
        <small>${escapeHtml(area.name)} · ${reportMonthLabel(currentMonthId)}</small>
        ${showMeta ? `<small class="report-doc-audit-window">Data ${audit.date} · Início ${audit.start} · Término ${audit.end} · Duração ${audit.duration}</small>` : ""}
      </div>
      ${showMeta ? `<div class="report-doc-meta-strip report-monthly-meta-strip">
        <span><strong>Área</strong>${escapeHtml(area.name)}</span>
        <span><strong>Auditor</strong>Qualidade / Segurança dos Alimentos</span>
        <span><strong>Responsável</strong>Liderança da área auditada</span>
      </div>` : ""}
    </header>
  `;
}

function reportComparisonPeriodLabel() {
  return `${reportMonthLabel(currentMonthId)} / ${reportMonthLabel(reportPreviousMonthId())}`;
}

function reportComparisonDocHeader(area, showMeta = false) {
  const audit = reportAuditWindow();
  return `
    <header class="report-doc-header report-monthly-header report-comparison-header">
      <div class="report-doc-brand">
        <img class="report-doc-idvida-logo" src="assets/idvida-logo.png?v=doc-report-1" alt="IDVIDA" />
        <span class="report-doc-idvida">ID<span>VIDA</span></span>
        <span class="report-doc-separator"></span>
        <span class="report-doc-hospital">
          <img src="assets/einstein-logo-menu.png?v=doc-report-1" alt="" aria-hidden="true" />
          <span>Hospital Einstein<br />Morumbi</span>
        </span>
      </div>
      <div class="report-doc-heading">
        <span>AUDITORIA INTERNA - BOAS PRÁTICAS DE MANIPULAÇÃO DE ALIMENTOS</span>
        <small>${escapeHtml(area.name)} · ${reportComparisonPeriodLabel()}</small>
        ${showMeta ? `<small class="report-doc-audit-window">Data ${audit.date} · Início ${audit.start} · Término ${audit.end} · Duração ${audit.duration}</small>` : ""}
      </div>
      ${showMeta ? `<div class="report-doc-meta-strip report-monthly-meta-strip">
        <span><strong>Área</strong>${escapeHtml(area.name)}</span>
        <span><strong>Auditor</strong>Qualidade / Segurança dos Alimentos</span>
        <span><strong>Responsável</strong>Liderança da área auditada</span>
      </div>` : ""}
    </header>
  `;
}

function reportDocFooter(page, total) {
  return `
    <footer class="report-doc-footer">
      <span>Fonte: Sistema HAE Auditoria · Base: Portaria SMS nº 2.619/2011 · Dados fictícios para validação do modelo</span>
      <span>Página ${page} de ${total}</span>
    </footer>
  `;
}

function reportMonthlyDocFooter(page, total) {
  return `
    <footer class="report-doc-footer">
      <span>Fonte: Sistema HAE Auditoria · Base: Portaria SMS nº 2.619/2011 · Dados fictícios para validação do modelo</span>
      <span>Página ${page} de ${total}</span>
    </footer>
  `;
}

function reportMonthlyPage(title, area, page, total, content) {
  return `
    <article class="report-doc-page report-monthly-page">
      ${reportMonthlyDocHeader(title, area, page === 1)}
      <main class="report-doc-body">${content}</main>
      ${reportMonthlyDocFooter(page, total)}
    </article>
  `;
}

function reportComparisonPage(area, page, total, content) {
  return `
    <article class="report-doc-page report-comparison-page">
      ${reportComparisonDocHeader(area, page === 1)}
      <main class="report-doc-body">${content}</main>
      ${reportDocFooter(page, total)}
    </article>
  `;
}

function reportPage(title, area, page, total, content) {
  return `
    <article class="report-doc-page">
      ${reportDocHeader(title, area, page === 1)}
      <main class="report-doc-body">${content}</main>
      ${reportDocFooter(page, total)}
    </article>
  `;
}

function reportSection(number, title, content) {
  return `
    <section class="report-doc-section">
      <h2><span>${number}</span>${escapeHtml(title)}</h2>
      ${content}
    </section>
  `;
}

function reportDocTable(headers, rows, extraClass = "") {
  const body = rows.length
    ? rows
        .map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join("")}</tr>`)
        .join("")
    : `<tr><td colspan="${headers.length}">Sem registros para exibir.</td></tr>`;
  return `
    <div class="report-doc-table-wrap">
      <table class="report-doc-table ${extraClass}">
        <thead><tr>${headers.map((header) => `<th>${escapeHtml(header)}</th>`).join("")}</tr></thead>
        <tbody>${body}</tbody>
      </table>
    </div>
  `;
}

function reportToolbar(isComparison, area) {
  return `
    <div class="report-toolbar surface" aria-label="Configurações do relatório">
      <div class="report-tabs">
        <button class="${!isComparison ? "is-active" : ""}" data-report-kind="monthly">Consolidado do mês</button>
        <button class="${isComparison ? "is-active" : ""}" data-report-kind="comparison">Comparativo analítico</button>
      </div>
      <div class="report-toolbar-actions">
        <button class="report-pdf-btn" data-open-report-pdf>${svgIcon("externalLink")} Abrir PDF</button>
        <label class="report-area-picker">
          <span>Área do relatório</span>
          <select data-report-area-select>
            ${reportAreaOptions(area.id)}
          </select>
        </label>
      </div>
    </div>
  `;
}

function reportPdfFilename(area = reportSelectedArea(), reportKind = state.reportKind) {
  const kind = reportKind === "comparison" ? "comparativo-analitico" : "consolidado-mes";
  const areaSlug = area.id.replace(/[^a-z0-9-]/gi, "-").toLowerCase();
  const monthSlug = currentMonthId.replace(/[^a-z0-9-]/gi, "-").toLowerCase();
  return `hae-${kind}-${areaSlug}-${monthSlug}.pdf`;
}

function reportStoredPdfUrl(area, reportKind) {
  return `assets/reports/${reportPdfFilename(area, reportKind)}?v=20260914-evidence-2`;
}

function reportStoredPdfLink(area, reportKind, mode = "open", label = "Abrir PDF") {
  const url = reportStoredPdfUrl(area, reportKind);
  const downloadAttr = mode === "download" ? ` download="${reportPdfFilename(area, reportKind)}"` : "";
  const targetAttr = mode === "open" ? ` target="_blank" rel="noopener"` : "";
  const icon = mode === "download" ? svgIcon("document") : svgIcon("externalLink");
  return `<a class="report-file-action" href="${url}"${targetAttr}${downloadAttr}>${icon} ${escapeHtml(label)}</a>`;
}

function prepareReportPdfWindow() {
  const pdfWindow = window.open("", "_blank");
  if (!pdfWindow) return null;
  pdfWindow.document.open();
  pdfWindow.document.write(`
    <!doctype html>
    <html lang="pt-BR">
      <head>
        <meta charset="UTF-8" />
        <title>Abrindo relatório</title>
      </head>
      <body style="margin:0;min-height:100vh;display:grid;place-items:center;background:#f5f8fc;color:#10264e;font:600 15px Arial,sans-serif">
        Abrindo relatório...
      </body>
    </html>
  `);
  pdfWindow.document.close();
  return pdfWindow;
}

function ensureReportPdfLibrary() {
  if (window.jspdf?.jsPDF && window.html2canvas) return Promise.resolve();
  if (window.__haePdfLibraryPromise) return window.__haePdfLibraryPromise;

  const loadScript = (src) => new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });

  window.__haePdfLibraryPromise = Promise.all([
    loadScript("https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"),
    loadScript("https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js")
  ]).then(() => {
    if (!window.jspdf?.jsPDF || !window.html2canvas) {
      throw new Error("Biblioteca de PDF indisponível");
    }
  });

  return window.__haePdfLibraryPromise;
}

function reportPrintFallback(targetWindow) {
  const report = document.querySelector(".technical-report");
  if (!report) return;
  const printWindow = targetWindow || window.open("", "_blank");
  if (!printWindow) {
    alert("Não consegui abrir a janela do PDF. Clique novamente em Abrir PDF.");
    return;
  }

  const baseHref = location.href.split("#")[0];
  printWindow.document.open();
  printWindow.document.write(`
    <!doctype html>
    <html lang="pt-BR">
      <head>
        <meta charset="UTF-8" />
        <base href="${baseHref}" />
        <title>${reportPdfFilename()}</title>
        <link rel="stylesheet" href="styles.css?v=20260902-pdf-report-1" />
        <style>
          body { margin: 0; background: #ffffff; }
          .technical-report { padding: 0; gap: 0; }
          .report-doc-page { box-shadow: none !important; border-radius: 0 !important; page-break-after: always; }
        </style>
      </head>
      <body>
        <div class="technical-report">${report.innerHTML}</div>
        <script>
          window.addEventListener("load", function () {
            setTimeout(function () { window.print(); }, 300);
          });
        <\/script>
      </body>
    </html>
  `);
  printWindow.document.close();
}

function reportArchiveHtml(reportHtml) {
  const baseHref = location.href.split("#")[0];
  return `
    <!doctype html>
    <html lang="pt-BR">
      <head>
        <meta charset="UTF-8" />
        <base href="${baseHref}" />
        <title>${reportPdfFilename()}</title>
        <link rel="stylesheet" href="styles.css?v=20260914-report-library-10" />
        <style>
          html, body { min-height: 100%; overflow-y: auto; }
          body { margin: 0; background: #eef3f8; }
          .stored-report-view { min-height: 100vh; padding: 18px 0 36px; display: flex; justify-content: flex-start; align-items: center; flex-direction: column; }
          .stored-report-view .technical-report { width: 794px; max-width: calc(100vw - 24px); gap: 14px; }
          .stored-report-view .report-doc-page { width: 794px; min-height: 1123px; padding: 30px 38px 28px; border-radius: 0; box-shadow: 0 10px 28px rgba(8, 18, 31, .12); }
          @media print {
            body { background: #ffffff; }
            .stored-report-view { padding: 0; }
            .stored-report-view .report-doc-page { box-shadow: none; border-radius: 0; page-break-after: always; }
          }
        </style>
      </head>
      <body>
        <main class="stored-report-view">${reportHtml}</main>
      </body>
    </html>
  `;
}

function openStoredReportView(targetWindow = null) {
  const reportWindow = targetWindow || window.open("", "_blank");
  if (!reportWindow) {
    alert("Não consegui abrir o relatório. Verifique se o navegador bloqueou a nova aba.");
    return;
  }
  const reportHtml = state.reportKind === "comparison" ? comparativeReportPage() : monthlyReportPage();
  reportWindow.document.open();
  reportWindow.document.write(reportArchiveHtml(reportHtml));
  reportWindow.document.close();
}

function waitForReportImages(root) {
  const images = Array.from(root.querySelectorAll("img"));
  return Promise.all(images.map((image) => {
    if (image.complete) return Promise.resolve();
    return new Promise((resolve) => {
      image.onload = resolve;
      image.onerror = resolve;
    });
  }));
}

function openReportPdf(targetWindow = null, options = {}) {
  const report = document.querySelector(".technical-report");
  if (!report) return;

  ensureReportPdfLibrary()
    .then(async () => {
      if (!window.jspdf?.jsPDF || !window.html2canvas) {
        throw new Error("Biblioteca de PDF indisponível");
      }
      const holder = document.createElement("div");
      holder.className = "report-pdf-render-root is-portrait";
      const clone = report.cloneNode(true);
      holder.appendChild(clone);
      document.body.appendChild(holder);

      try {
        await waitForReportImages(clone);
        await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));

        const pdf = new window.jspdf.jsPDF({ unit: "mm", format: "a4", orientation: "portrait" });
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const margin = 6;
        const availableWidth = pdfWidth - margin * 2;
        const availableHeight = pdfHeight - margin * 2;
        const pages = Array.from(clone.querySelectorAll(".report-doc-page"));
        for (const [index, page] of pages.entries()) {
          if (index) pdf.addPage("a4", "portrait");
          const canvas = await window.html2canvas(page, {
            scale: 2,
            useCORS: true,
            backgroundColor: "#ffffff",
            scrollX: 0,
            scrollY: 0,
            windowWidth: holder.scrollWidth,
            windowHeight: Math.max(holder.scrollHeight, page.scrollHeight)
          });
          const ratio = Math.min(availableWidth / canvas.width, availableHeight / canvas.height);
          const imageWidth = canvas.width * ratio;
          const imageHeight = canvas.height * ratio;
          const imageX = (pdfWidth - imageWidth) / 2;
          pdf.addImage(canvas.toDataURL("image/jpeg", 0.98), "JPEG", imageX, margin, imageWidth, imageHeight, undefined, "FAST");
        }

        if (options.mode === "download") {
          pdf.save(reportPdfFilename());
        } else {
          const pdfUrl = URL.createObjectURL(pdf.output("blob"));
          if (targetWindow) {
            targetWindow.location.href = pdfUrl;
          } else {
            window.open(pdfUrl, "_blank");
          }
        }
      } finally {
        holder.remove();
      }
    })
    .catch(() => reportPrintFallback(targetWindow));
}

function openReportPdfAfterRender(targetWindow, options = {}) {
  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(() => openReportPdf(targetWindow, options));
  });
}

function preloadReportPdfLibrary() {
  if (window.__haeReportPdfPreloaded) return;
  window.__haeReportPdfPreloaded = true;
  const run = () => ensureReportPdfLibrary().catch(() => {
    window.__haeReportPdfPreloaded = false;
  });
  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(run, { timeout: 1500 });
  } else {
    window.setTimeout(run, 250);
  }
}

function reportMetaRows(area, typeLabel) {
  return [
    ["Unidade hospitalar", "Hospital Einstein - Morumbi", "Tipo de relatório", typeLabel],
    ["Área auditada", escapeHtml(area.name), "Base normativa", "Portaria SMS nº 2.619/2011"],
    ["Auditoria realizada por", "Equipe de Qualidade / Segurança dos Alimentos", "Reunião realizada com", "Responsáveis da área auditada"],
    ["Periodicidade", "Mensal", "Data e horário", "30/08/2026 · 08h00 às 17h00"]
  ].map((row) => row.map((cell, index) => (index % 2 === 0 ? `<strong>${cell}</strong>` : cell)));
}

function reportSummaryRows(area) {
  const totals = reportAreaTotals(area);
  const stats = actionPlanStats(area);
  const conformity = totals.evaluated ? Math.round((totals.C / totals.evaluated) * 100) : 0;
  return [
    ["Nota final da área", `<strong>${formatScore(area.score)}/10</strong>`, "Classificação", reportStatusTag(area.status)],
    ["Itens avaliados", String(totals.total), "Conformidade", `${conformity}% dos itens avaliados`],
    ["Conformes", String(totals.C), "Não conformidades", `<strong>${totals.NC}</strong>`],
    ["Não avaliados", String(totals.X), "Planos gerados", `${stats.total} (${reportOpenActions(stats)} abertos)`]
  ].map((row) => row.map((cell, index) => (index % 2 === 0 ? `<strong>${cell}</strong>` : cell)));
}

function reportHighRiskCount(area) {
  const high = riskSummary(area).find((item) => item.level === "critico");
  return high ? high.count : 0;
}

function reportConformityPercent(area) {
  const totals = reportAreaTotals(area);
  return totals.evaluated ? Math.round((totals.C / totals.evaluated) * 100) : 0;
}

function reportMiniKpis(area, mode = "monthly") {
  const totals = reportAreaTotals(area);
  const stats = actionPlanStats(area);
  const delta = area.score - area.last;
  const kpis = mode === "comparison"
    ? [
        { label: "Mês anterior", value: formatScore(area.last), note: reportShortMonthLabel(reportPreviousMonthId()), tone: "neutral" },
        { label: "Mês atual", value: formatScore(area.score), note: reportShortMonthLabel(currentMonthId), tone: area.score >= 8 ? "good" : "danger" },
        { label: "Variação", value: reportDeltaText(delta), note: delta >= 0 ? "melhora" : "queda", tone: delta >= 0 ? "good" : "danger" },
        { label: "NCs atuais", value: String(totals.NC), note: `${reportHighRiskCount(area)} de risco alto`, tone: totals.NC ? "medium" : "good" },
        { label: "Planos avaliados", value: String(stats.total), note: `${actionPlansForArea(area).filter((plan) => plan.status !== "concluido").length} não concluídos`, tone: actionPlansForArea(area).some((plan) => plan.status !== "concluido") ? "danger" : "good" }
      ]
    : [
        { label: "Nota da área", value: formatScore(area.score), note: "/10", tone: area.score >= 8 ? "good" : "danger" },
        { label: "Conformidade", value: `${reportConformityPercent(area)}%`, note: "itens conformes", tone: reportConformityPercent(area) >= 80 ? "good" : "medium" },
        { label: "NCs", value: String(totals.NC), note: "não conformidades", tone: totals.NC ? "medium" : "good" },
        { label: "Risco alto", value: String(reportHighRiskCount(area)), note: "NCs críticas", tone: reportHighRiskCount(area) ? "danger" : "good" },
        { label: "Planos vigentes", value: String(stats.total), note: `${reportOpenActions(stats)} abertos`, tone: reportOpenActions(stats) ? "neutral" : "good" },
        { label: "Duração", value: reportAuditWindow().duration, note: "tempo auditado", tone: "neutral" }
      ];

  return `
    <div class="report-mini-kpis">
      ${kpis
        .map(
          (item) => `
            <div class="report-mini-kpi is-${item.tone}">
              <span>${escapeHtml(item.label)}</span>
              <strong>${escapeHtml(item.value)}</strong>
              <small>${escapeHtml(item.note)}</small>
            </div>
          `
        )
        .join("")}
    </div>
  `;
}

function reportLegendBlock() {
  const riskItems = [
    ["Baixo", "good"],
    ["Moderado", "moderate"],
    ["Médio", "medium"],
    ["Alto", "danger"]
  ];
  const answerItems = [
    ["C", "Conforme", "good"],
    ["NC", "Não conforme", "danger"],
    ["X", "Não avaliado", "neutral"]
  ];
  return `
    <div class="report-doc-legend" aria-label="Legenda do relatório">
      <div>
        <strong>Risco / classificação</strong>
        ${riskItems.map(([label, tone]) => `<span class="report-legend-item is-${tone}"><i></i>${label}</span>`).join("")}
      </div>
      <div>
        <strong>Respostas</strong>
        ${answerItems.map(([code, label, tone]) => `<span class="report-legend-item is-${tone}"><b>${code}</b>${label}</span>`).join("")}
      </div>
    </div>
  `;
}

function reportMonthlyLegendBlock() {
  const riskItems = [
    ["Baixo", "good"],
    ["Moderado", "moderate"],
    ["Médio", "medium"],
    ["Alto", "danger"]
  ];
  const answerItems = [
    ["C", "Conforme", "good"],
    ["NC", "Não conforme", "danger"],
    ["X", "Não avaliado", "neutral"]
  ];
  return `
    <div class="report-doc-legend report-monthly-legend" aria-label="Legenda do relatório mensal">
      <div>
        <strong>Risco das NCs</strong>
        ${riskItems.map(([label, tone]) => `<span class="report-legend-item is-${tone}"><i></i>${label}</span>`).join("")}
      </div>
      <div>
        <strong>Respostas</strong>
        ${answerItems.map(([code, label, tone]) => `<span class="report-legend-item is-${tone}"><b>${code}</b>${label}</span>`).join("")}
      </div>
    </div>
  `;
}

function reportComparisonLegendBlock() {
  const riskItems = [
    ["Baixo", "good"],
    ["Moderado", "moderate"],
    ["Médio", "medium"],
    ["Alto", "danger"]
  ];
  const answerItems = [
    ["C", "Conforme", "good"],
    ["NC", "Não conforme", "danger"],
    ["X", "Não avaliado", "neutral"]
  ];
  return `
    <div class="report-doc-legend report-comparison-legend" aria-label="Legenda do relatório comparativo">
      <div>
        <strong>Risco das NCs</strong>
        ${riskItems.map(([label, tone]) => `<span class="report-legend-item is-${tone}"><i></i>${label}</span>`).join("")}
      </div>
      <div>
        <strong>Respostas</strong>
        ${answerItems.map(([code, label, tone]) => `<span class="report-legend-item is-${tone}"><b>${code}</b>${label}</span>`).join("")}
      </div>
    </div>
  `;
}

function reportActionFootnote() {
  return `
    <p class="report-footnote">
      Nota: os planos de ação vigentes gerados nesta auditoria serão avaliados na próxima auditoria mensal, para verificar se as medidas implantadas reduziram as não conformidades e impactaram a evolução da nota da área.
    </p>
  `;
}

function reportComparisonIntroNote() {
  return `
    <p class="report-footnote">
      Nota: planos de ação gerados em ${reportMonthLabel(currentMonthId)} permanecem vigentes e serão avaliados na auditoria de Setembro/2026, mediante conclusão, evidência registrada e ausência de repetição da ocorrência relacionada.
    </p>
  `;
}

function reportPlural(count, singular, plural) {
  return `${count} ${count === 1 ? singular : plural}`;
}

function reportLegendNote() {
  return `
    <p class="report-footnote">
      Legenda: C = Conforme; NC = Não Conforme; X = Não Avaliado. A classificação de risco segue a régua Baixo, Moderado, Médio e Alto.
    </p>
  `;
}

function reportMonthlyInsight(area) {
  const totals = reportAreaTotals(area);
  const stats = actionPlanStats(area);
  const worstBlocks = blockSummaries(area)
    .sort((a, b) => a.score - b.score)
    .slice(0, 2)
    .map((block) => block.title);
  const metaText = area.score >= 8
    ? "A área permanece dentro da meta mínima definida para o ciclo mensal."
    : "A área está abaixo da meta mínima de 8,0 e deve permanecer em acompanhamento no próximo ciclo.";
  return `
    <div class="report-note-box">
      <strong>Síntese técnica da área</strong>
      <p>${metaText} Foram registradas ${reportPlural(totals.NC, "não conformidade", "não conformidades")} e ${reportPlural(stats.total, "plano de ação vinculado", "planos de ação vinculados")}; os blocos que exigem atenção neste mês são ${escapeHtml(worstBlocks.join(" e "))}.</p>
    </div>
  `;
}

function reportShortChartLabel(label) {
  const clean = String(label || "");
  return clean.length > 20 ? `${clean.slice(0, 19)}...` : clean;
}

function reportFullText(value) {
  return String(value || "").replace(/\s+/g, " ").trim();
}

function reportCompactText(value, maxLength = 86) {
  const clean = String(value || "").replace(/\s+/g, " ").trim();
  if (clean.length <= maxLength) return clean;
  return `${clean.slice(0, maxLength - 3).trim()}...`;
}

function reportSvgLabelLines(label, maxLength = 14) {
  const words = String(label || "").split(/\s+/).filter(Boolean);
  const lines = [];
  let current = "";
  words.forEach((word) => {
    const next = current ? `${current} ${word}` : word;
    if (next.length > maxLength && current) {
      lines.push(current);
      current = word;
    } else {
      current = next;
    }
  });
  if (current) lines.push(current);
  return lines.slice(0, 3);
}

function reportPreviousBlockScore(area, block, index) {
  const delta = area.score - area.last;
  const adjustment = ((index % 3) - 1) * 0.12;
  return clamp(block.score - delta + adjustment, 4.2, 9.8);
}

function reportSmoothChartPath(points) {
  if (!points.length) return "";
  return points.slice(1).reduce((path, point, index) => {
    const previous = points[index];
    const controlX = (previous.x + point.x) / 2;
    return `${path} C ${controlX},${previous.y} ${controlX},${point.y} ${point.x},${point.y}`;
  }, `M ${points[0].x},${points[0].y}`);
}

function reportBlockScoreChart(area, comparison = false, options = {}) {
  const blocks = blockSummaries(area);
  if (!blocks.length) {
    return `<div class="report-empty-chart">Sem blocos de checklist cadastrados para esta área.</div>`;
  }

  const isMonthly = options.variant === "monthly";
  const isComparison = comparison || options.variant === "comparison";
  const width = 760;
  const height = 238;
  const pad = { left: 42, right: 72, top: isComparison ? 34 : 30, bottom: 30 };
  const innerW = width - pad.left - pad.right;
  const innerH = height - pad.top - pad.bottom;
  const plotBottom = pad.top + innerH;
  const slot = innerW / blocks.length;
  const yFor = (value) => pad.top + innerH - (value / 10) * innerH;
  const barW = Math.min(38, slot * 0.38);
  const ticks = [0, 5, 8, 10];
  const previousPoints = blocks.map((block, index) => {
    const center = pad.left + index * slot + slot / 2;
    return {
      x: center,
      y: yFor(reportPreviousBlockScore(area, block, index))
    };
  });

  return `
    <figure class="report-doc-chart ${isMonthly ? "is-monthly-chart" : ""} ${isComparison ? "is-comparison-chart" : ""}">
      <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-label="${isComparison ? "Comparativo mensal por bloco" : "Notas por bloco do checklist"}">
        ${ticks
          .map(
            (tick) => `
              <line x1="${pad.left}" y1="${yFor(tick)}" x2="${width - pad.right}" y2="${yFor(tick)}" stroke="${tick === 8 ? "#9fceb0" : "#e2e8f0"}" stroke-width="${tick === 8 ? 1.4 : 1}" />
              <text x="${pad.left - 10}" y="${yFor(tick) + 4}" text-anchor="end" font-size="9.5" font-weight="700" fill="#526174">${tick}</text>
            `
          )
          .join("")}
        <text x="${width - pad.right + 6}" y="${yFor(8) - 5}" text-anchor="start" font-size="10" font-weight="760" fill="#2d8a43">Meta 8,0</text>
        ${isComparison ? `
          <path d="${reportSmoothChartPath(previousPoints)}" fill="none" stroke="#9aa6b6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
        ` : ""}
        ${blocks
          .map((block, index) => {
            const center = pad.left + index * slot + slot / 2;
            const current = block.score;
            const currentY = yFor(current);
            const barTone = current < 7 ? "#ee2f36" : "#0a6cff";
            return `
              <rect x="${center - barW / 2}" y="${currentY}" width="${barW}" height="${plotBottom - currentY}" rx="5" fill="${barTone}"></rect>
            `;
          })
          .join("")}
        ${isComparison ? blocks
          .map((block, index) => {
            const center = pad.left + index * slot + slot / 2;
            const currentY = yFor(block.score);
            const previous = reportPreviousBlockScore(area, block, index);
            const previousY = yFor(previous);
            const labelsAreClose = Math.abs(currentY - previousY) < 16;
            const previousLabelX = center;
            const previousLabelY = Math.min(plotBottom - 7, previousY + (labelsAreClose ? 16 : 14));
            return `
              <circle cx="${center}" cy="${previousY}" r="3.4" fill="#ffffff" stroke="#9aa6b6" stroke-width="2"></circle>
              <text x="${previousLabelX}" y="${previousLabelY}" text-anchor="middle" font-size="9.6" font-weight="780" fill="#8a97a8">${formatScore(previous)}</text>
            `;
          })
          .join("") : ""}
        ${blocks
          .map((block, index) => {
            const center = pad.left + index * slot + slot / 2;
            const current = block.score;
            const currentY = yFor(current);
            const previousY = yFor(reportPreviousBlockScore(area, block, index));
            const labelsAreClose = isComparison && Math.abs(currentY - previousY) < 16;
            const currentLabelY = Math.max(14, currentY - (labelsAreClose ? 14 : 6));
            const barTone = current < 7 ? "#ee2f36" : "#0a6cff";
            return `<text x="${center}" y="${currentLabelY}" text-anchor="middle" font-size="9.6" font-weight="780" fill="${barTone}">${formatScore(current)}</text>`;
          })
          .join("")}
        ${isComparison ? `
          <line x1="${pad.left}" y1="8" x2="${pad.left + 18}" y2="8" stroke="#9aa6b6" stroke-width="2" stroke-linecap="round"></line>
          <text x="${pad.left + 20}" y="11" font-size="10" font-weight="700" fill="#526174">${reportShortMonthLabel(reportPreviousMonthId())}</text>
          <rect x="${pad.left + 86}" y="5" width="14" height="6" rx="3" fill="#0a6cff"></rect>
          <text x="${pad.left + 106}" y="11" font-size="10" font-weight="700" fill="#526174">${reportShortMonthLabel(currentMonthId)}</text>
        ` : ""}
      </svg>
      <div class="report-chart-labels" style="--items:${blocks.length}">
        ${blocks.map((block) => `<span title="${escapeHtml(block.title)}">${escapeHtml(isMonthly || isComparison ? reportFullText(block.title).toUpperCase() : reportBlockLabel(block.title))}</span>`).join("")}
      </div>
      <figcaption>${isComparison ? "Figura 1 - Comparativo do desempenho por bloco." : "Figura 1 - Desempenho dos blocos no mês vigente."}</figcaption>
    </figure>
  `;
}

function reportBlockRows(area) {
  return blockSummaries(area).map((block) => {
    const counts = block.sourceCounts || { C: 0, NC: 0, X: 0 };
    return [
      `<strong>${escapeHtml(block.title)}</strong>`,
      String(block.questions.length),
      String(counts.C),
      String(counts.NC),
      String(counts.X),
      `<strong>${formatScore(block.score)}</strong>`,
      reportStatusMarker(block.status)
    ];
  });
}

function reportRiskWeight(row) {
  const weights = { critico: 4, medio: 3, moderado: 2, baixo: 1, none: 0 };
  return weights[row.riskLevel] || 0;
}

function reportNcRows(area, limit = 8) {
  return questionRowsForArea(area)
    .filter((row) => row.answer === "NC")
    .sort((a, b) => reportRiskWeight(b) - reportRiskWeight(a) || a.number - b.number)
    .slice(0, limit);
}

function reportObservationForQuestion(row) {
  const text = `${row.text} ${row.blockTitle}`.toLowerCase();
  if (text.includes("resíduo") || text.includes("lixo")) return "Falha em segregação ou armazenamento temporário.";
  if (text.includes("validade") || text.includes("documento")) return "Registro pendente ou documento sem atualização.";
  if (text.includes("temperatura") || text.includes("conservação")) return "Controle de tempo e temperatura a regularizar.";
  if (text.includes("higien")) return "Rotina de higienização sem evidência suficiente.";
  return "NC identificada durante a inspeção do setor.";
}

function reportPlanForQuestion(area, row, index) {
  const plans = actionPlansForArea(area);
  const match = plans.find((plan) => row.blockTitle.toLowerCase().includes(String(plan.block || "").toLowerCase()));
  return match || plans[index % Math.max(1, plans.length)] || null;
}

function reportPlanShortTitle(plan, row) {
  const source = plan?.title || `Plano para ${row?.blockTitle || "item auditado"}`;
  const compact = source.replace(/^Corrigir não conformidades de\s+/i, "Corrigir ");
  return reportCompactText(compact, 50);
}

function reportNcDetailRows(area) {
  const rows = reportNcRows(area, 10);
  return rows.map((row, index) => {
    const plan = reportPlanForQuestion(area, row, index);
    return [
      `${String(row.number).padStart(2, "0")}`,
      `<strong>${escapeHtml(row.blockTitle)}</strong>`,
      escapeHtml(reportFullText(row.text)),
      reportRiskTag(row.riskLevel),
      escapeHtml(reportObservationForQuestion(row)),
      escapeHtml(plan?.title || `Plano para ${row.blockTitle}`)
    ];
  });
}

function reportEvidenceImageForQuestion(row) {
  const text = `${row.text} ${row.blockTitle}`.toLowerCase();
  if (text.includes("utens") || text.includes("equipamento") || text.includes("móveis")) {
    return "assets/report-evidence-utensilios.png?v=monthly-evidence-1";
  }
  return "assets/report-evidence-utensilios.png?v=monthly-evidence-1";
}

function reportEvidenceGrid(area) {
  const rows = reportNcRows(area, 4);
  if (!rows.length) return `<p class="report-muted">Sem evidências fotográficas vinculadas para esta área.</p>`;
  return `
    <div class="${rows.length === 1 ? "report-evidence-list" : "report-evidence-grid"}">
      ${rows
        .map(
          (row, index) => `
            <figure class="report-evidence-card">
              <div class="report-evidence-photo">
                <img src="${reportEvidenceImageForQuestion(row)}" alt="Foto de evidência do item ${String(row.number).padStart(2, "0")}" />
              </div>
              <figcaption>
                <strong>Item ${String(row.number).padStart(2, "0")} · Risco ${escapeHtml((riskMeta[row.riskLevel] || riskMeta.none).label)}</strong>
                <span>${escapeHtml(row.blockTitle)} - ${escapeHtml(reportObservationForQuestion(row))}</span>
              </figcaption>
            </figure>
          `
        )
        .join("")}
    </div>
  `;
}

function reportMonthlyAttention(area) {
  const blocks = blockSummaries(area);
  const totalQuestions = blocks.reduce((sum, block) => sum + block.questions.length, 0);
  const areaRows = questionRowsForArea(area);
  const attentionBlocks = blocks
    .map((block) => {
      const highRiskNc = areaRows.filter((row) => row.blockId === block.id && row.answer === "NC" && row.riskLevel === "critico").length;
      return { ...block, highRiskNc };
    })
    .sort((a, b) => a.score - b.score || b.sourceCounts.NC - a.sourceCounts.NC || b.highRiskNc - a.highRiskNc)
    .slice(0, 3);
  const attentionText = attentionBlocks
    .map((block) => `${block.title} (${block.questions.length} perguntas, nota ${formatScore(block.score)}, ${block.sourceCounts.NC} NCs${block.highRiskNc ? `, ${block.highRiskNc} de risco alto` : ""})`)
    .join("; ");

  return `
    <p class="report-doc-text report-monthly-attention-text">
      O gráfico consolida ${totalQuestions} perguntas em ${blocks.length} blocos; os principais pontos de atenção do mês são ${escapeHtml(attentionText)}, considerando menor nota, quantidade de NCs e risco atribuído às perguntas não conformes.
    </p>
  `;
}

function reportPlanRowsForArea(area) {
  const dueDates = ["05/09/2026", "10/09/2026", "16/09/2026", "20/09/2026"];
  return actionPlansForArea(area).map((plan, index) => [
    `<strong>${escapeHtml(plan.block)}</strong>`,
    escapeHtml(reportFullText(plan.title)),
    escapeHtml(plan.owner),
    dueDates[index % dueDates.length],
    reportActionStatusTag(plan.status)
  ]);
}

function reportConclusion(area) {
  const totals = reportAreaTotals(area);
  const stats = actionPlanStats(area);
  const statusText = area.score >= 8 ? "resultado satisfatório para o mês vigente" : "necessidade de plano de correção com acompanhamento no próximo ciclo";
  return `
    <div class="report-note-box">
      <strong>Conclusão técnica</strong>
      <p>A área ${escapeHtml(area.name)} apresentou ${statusText}. O relatório registra ${reportPlural(totals.NC, "não conformidade", "não conformidades")}, ${reportPlural(stats.total, "plano de ação", "planos de ação")} e ${reportPlural(reportOpenActions(stats), "ação aberta", "ações abertas")}. A validação final deve ocorrer na auditoria subsequente, com conferência das evidências e da efetividade das ações registradas.</p>
    </div>
    <div class="report-signatures">
      <span>Auditor responsável</span>
      <span>Responsável da área auditada</span>
    </div>
  `;
}

function reportComparisonMetrics(area) {
  const current = reportAreaTotals(area);
  const previous = reportPreviousAreaTotals(area);
  const delta = area.score - area.last;
  const stats = actionPlanStats(area);
  const newNcs = Math.max(0, current.NC - previous.NC);
  const resolvedNcs = Math.max(0, previous.NC - current.NC);
  const recurring = Math.min(current.NC, previous.NC, Math.max(stats.recurrent, current.NC - newNcs));
  const recurringX = Math.min(current.X, previous.X);
  const latePlans = actionPlansForArea(area).filter((plan) => plan.status !== "concluido").length;
  return { current, previous, delta, stats, newNcs, resolvedNcs, recurring, recurringX, latePlans };
}

function reportPlainList(items, fallback = "sem destaque no período") {
  const clean = items.map((item) => reportFullText(item)).filter(Boolean);
  if (!clean.length) return fallback;
  if (clean.length === 1) return clean[0];
  if (clean.length === 2) return `${clean[0]} e ${clean[1]}`;
  return `${clean.slice(0, -1).join(", ")} e ${clean[clean.length - 1]}`;
}

function reportComparisonSummaryRows(area) {
  const { delta, stats, newNcs, resolvedNcs, recurring, recurringX, latePlans } = reportComparisonMetrics(area);
  return [
    ["Nota do mês anterior", `<strong>${formatScore(area.last)}</strong>`, "Nota atual", `<strong>${formatScore(area.score)}</strong>`],
    ["Variação da nota", `<strong>${reportDeltaText(delta)}</strong>`, "Leitura", delta >= 0 ? reportTag("Melhora", "good") : reportTag("Queda", "danger")],
    ["NCs recorrentes", String(recurring), "NCs novas", String(newNcs)],
    ["NCs resolvidas", String(resolvedNcs), "Itens X recorrentes", String(recurringX)],
    ["Planos vinculados", String(stats.total), "Planos não concluídos", String(latePlans || reportOpenActions(stats))]
  ].map((row) => row.map((cell, index) => (index % 2 === 0 ? `<strong>${cell}</strong>` : cell)));
}

function reportComparisonBlockDeltas(area) {
  return blockSummaries(area).map((block, index) => {
    const previous = reportPreviousBlockScore(area, block, index);
    const delta = block.score - previous;
    return { block, previous, current: block.score, delta };
  });
}

function reportComparisonBlockRows(area) {
  return reportComparisonBlockDeltas(area).map(({ block, previous, current, delta }) => {
    return [
      `<strong>${escapeHtml(block.title)}</strong>`,
      formatScore(previous),
      formatScore(current),
      `<strong>${reportDeltaText(delta)}</strong>`
    ];
  });
}

function reportRowsForBlock(area, blockTitle) {
  const normalized = reportFullText(blockTitle).toLowerCase();
  return questionRowsForArea(area).filter((row) => {
    const block = reportFullText(row.blockTitle).toLowerCase();
    return block.includes(normalized) || normalized.includes(block);
  });
}

function reportNcRowsForBlock(area, blockTitle) {
  return reportRowsForBlock(area, blockTitle)
    .filter((row) => row.answer === "NC")
    .sort((a, b) => reportRiskWeight(b) - reportRiskWeight(a) || a.number - b.number);
}

function reportXRowsForArea(area) {
  return questionRowsForArea(area)
    .filter((row) => row.answer === "X")
    .sort((a, b) => reportRiskWeight(b) - reportRiskWeight(a) || a.number - b.number);
}

function reportRecurringNcRows(area) {
  const { recurring } = reportComparisonMetrics(area);
  return reportNcRows(area, Math.max(0, recurring));
}

function reportRecurringXRows(area) {
  const { recurringX } = reportComparisonMetrics(area);
  return reportXRowsForArea(area).slice(0, Math.max(0, recurringX));
}

function reportPlanOriginRow(area, plan) {
  const rows = reportNcRowsForBlock(area, plan.block);
  return rows[0] || reportNcRows(area, 1)[0] || null;
}

function reportComparativePlanStatusTag(plan) {
  if (plan.status === "concluido" && plan.improved === true) return reportTag("Concluído e efetivo", "good");
  if (plan.status === "concluido") return reportTag("Concluído sem efetividade", "danger");
  return reportTag("Não concluído", "danger");
}

function reportComparativePlanReading(plan, originRow) {
  if (plan.status === "concluido" && plan.improved === true) return "Ação efetiva no período.";
  if (plan.status === "concluido") return "Ocorrência repetida após conclusão.";
  if (originRow) return "Ocorrência repetida; ação não efetiva no período.";
  return "Sem validação de efetividade no período.";
}

function reportPlanEvidenceImpact(plan, originRow) {
  if (plan.status === "concluido" && plan.improved === true) return "Evidência compatível; requisito sem repetição.";
  if (plan.status === "concluido") return "Evidência registrada, porém sem eliminação da ocorrência.";
  if (originRow) return "Sem conclusão no prazo; ocorrência voltou no mês atual.";
  return "Sem conclusão no prazo e sem evidência conclusiva.";
}

function reportActionEffectRowsForArea(area) {
  return actionPlansForArea(area).map((plan) => {
    const originRow = reportPlanOriginRow(area, plan);
    const riskLevel = originRow?.riskLevel || (plan.critical ? "critico" : "medio");
    const problem = originRow
      ? `Item ${String(originRow.number).padStart(2, "0")} - ${reportFullText(originRow.text)}`
      : `Requisito vinculado ao bloco ${plan.block}`;
    return [
      `<strong>${escapeHtml(problem)}</strong>`,
      reportRiskTag(riskLevel),
      escapeHtml(reportFullText(plan.title)),
      escapeHtml(plan.owner),
      reportComparativePlanStatusTag(plan),
      escapeHtml(reportPlanEvidenceImpact(plan, originRow)),
      escapeHtml(reportComparativePlanReading(plan, originRow))
    ];
  });
}

function reportRecurrenceRows(area) {
  const recurringNc = reportRecurringNcRows(area).map((row) => [
    String(row.number).padStart(2, "0"),
    `<strong>${escapeHtml(row.blockTitle)}</strong> - ${escapeHtml(reportFullText(row.text))}`,
    "NC",
    "NC",
    reportRiskTag(row.riskLevel),
    "NC recorrente"
  ]);
  const recurringX = reportRecurringXRows(area).map((row) => [
    String(row.number).padStart(2, "0"),
    `<strong>${escapeHtml(row.blockTitle)}</strong> - ${escapeHtml(reportFullText(row.text))}`,
    "X",
    "X",
    reportRiskTag(row.riskLevel),
    "Item novamente não avaliado"
  ]);
  return [...recurringNc, ...recurringX];
}

function reportRecurrenceNarrative(area) {
  const recurringNc = reportRecurringNcRows(area);
  const recurringX = reportRecurringXRows(area);
  const blocks = [...new Set(recurringNc.map((row) => row.blockTitle))];
  const blockText = reportPlainList(blocks, "sem concentração por bloco");
  const blockTerm = blocks.length > 1 ? "nos blocos" : "no bloco";
  const ncText = recurringNc.length === 0
    ? "não foram identificadas não conformidades recorrentes"
    : recurringNc.length === 1
      ? `foi identificada 1 não conformidade recorrente ${blockTerm} ${escapeHtml(blockText)}`
      : `foram identificadas ${recurringNc.length} não conformidades recorrentes ${blockTerm} ${escapeHtml(blockText)}`;
  const xText = recurringX.length
    ? `, além de ${reportPlural(recurringX.length, "item novamente não avaliado", "itens novamente não avaliados")}. A ausência de avaliação ${recurringX.length === 1 ? "desse item impede" : "desses itens impede"} confirmar a conformidade do requisito e o controle do risco associado.`
    : ". Não foram identificados itens novamente não avaliados no período comparado.";

  return `
    <p class="report-doc-text report-comparison-reading-text">
      Neste comparativo, ${ncText}${xText} Nos casos de recorrência com plano de ação vinculado, deve-se verificar a execução da ação, o cumprimento do prazo e a suficiência da medida corretiva.
    </p>
  `;
}

function reportBlockPriorityData(area) {
  const recurringNcRows = reportRecurringNcRows(area);
  const recurringXRows = reportRecurringXRows(area);
  const plans = actionPlansForArea(area);
  const rows = blockSummaries(area)
    .map((block) => {
      const rows = questionRowsForArea(area).filter((row) => row.blockId === block.id);
      const ncs = rows.filter((row) => row.answer === "NC");
      const highRiskNc = ncs.filter((row) => row.riskLevel === "critico").length;
      const recurringNcs = recurringNcRows.filter((row) => row.blockId === block.id).length;
      const recurringXs = recurringXRows.filter((row) => row.blockId === block.id).length;
      const linkedLatePlan = plans.some((plan) => {
        const planBlock = reportFullText(plan.block).toLowerCase();
        const blockTitle = reportFullText(block.title).toLowerCase();
        return plan.status !== "concluido" && (planBlock.includes(blockTitle) || blockTitle.includes(planBlock));
      });
      const priorityScore = (10 - block.score) * 10 + highRiskNc * 8 + recurringNcs * 7 + recurringXs * 4 + (linkedLatePlan ? 5 : 0);
      const mainIssue = ncs.sort((a, b) => reportRiskWeight(b) - reportRiskWeight(a) || a.number - b.number)[0] || rows.find((row) => row.answer === "X");
      const reasonParts = [];
      if (highRiskNc) reasonParts.push(`${highRiskNc} NC de risco alto`);
      if (recurringNcs) reasonParts.push(`${recurringNcs} recorrência`);
      if (recurringXs) reasonParts.push(`${recurringXs} item X recorrente`);
      if (linkedLatePlan) reasonParts.push("plano não concluído no prazo");
      if (!reasonParts.length) reasonParts.push(`nota ${formatScore(block.score)}`);
      const conduct = linkedLatePlan
        ? "Reavaliar execução, evidência e suficiência da ação corretiva."
        : highRiskNc
          ? "Definir ação corretiva e evidência de correção."
          : recurringXs
            ? "Garantir avaliação do item no próximo fechamento."
            : "Manter acompanhamento do desempenho.";
      return {
        block,
        mainIssue,
        highRiskNc,
        recurringNcs,
        recurringXs,
        linkedLatePlan,
        priorityScore,
        reason: reasonParts.join("; "),
        conduct
      };
    })
    .filter((item) => item.highRiskNc || item.recurringNcs || item.recurringXs || item.linkedLatePlan || item.block.score < 8)
    .sort((a, b) => b.priorityScore - a.priorityScore);
  if (rows.length) return rows.slice(0, 5);
  return blockSummaries(area)
    .sort((a, b) => a.score - b.score)
    .slice(0, 1)
    .map((block) => ({
      block,
      mainIssue: null,
      highRiskNc: 0,
      recurringNcs: 0,
      recurringXs: 0,
      linkedLatePlan: false,
      priorityScore: 0,
      reason: `menor nota relativa: ${formatScore(block.score)}`,
      conduct: "Manter acompanhamento do desempenho."
    }));
}

function reportBlockPriorityRows(area) {
  return reportBlockPriorityData(area).map((item, index) => {
    const issue = item.mainIssue
      ? `Item ${String(item.mainIssue.number).padStart(2, "0")} - ${reportFullText(item.mainIssue.text)}`
      : item.block.title;
    return [
      String(index + 1),
      `<strong>${escapeHtml(item.block.title)}</strong><br>${escapeHtml(issue)}`,
      formatScore(item.block.score),
      item.mainIssue ? reportRiskTag(item.mainIssue.riskLevel) : reportTag("Sem NC", "neutral"),
      escapeHtml(item.reason),
      escapeHtml(item.conduct)
    ];
  });
}

function reportComparativeNarrative(area) {
  const { delta } = reportComparisonMetrics(area);
  const tendency = delta > 0.15 ? "melhora" : delta < -0.15 ? "queda" : "estabilidade";
  const subject = area.name.trim().toLowerCase().startsWith("área ")
    ? `A ${escapeHtml(area.name)}`
    : `A área ${escapeHtml(area.name)}`;
  const followUp = delta > 0.15
    ? "Neste comparativo, a melhora da nota não elimina a necessidade de acompanhamento, pois permanecem ocorrências recorrentes e plano de ação não concluído no prazo."
    : delta < -0.15
      ? "Neste comparativo, a queda da nota reforça a necessidade de acompanhamento, pois permanecem ocorrências recorrentes e plano de ação não concluído no prazo."
      : "Neste comparativo, a estabilidade da nota ainda exige acompanhamento, pois permanecem ocorrências recorrentes e plano de ação não concluído no prazo.";

  return `
    <div class="report-analysis-note">
      <p>${subject} apresentou ${tendency} no desempenho geral, passando de ${formatScore(area.last)} em ${reportMonthLabel(reportPreviousMonthId())} para ${formatScore(area.score)} em ${reportMonthLabel(currentMonthId)}. Entretanto, a variação da nota deve ser interpretada em conjunto com a recorrência das não conformidades e a efetividade dos planos de ação avaliados no período.</p>
      <p>${followUp}</p>
    </div>
  `;
}

function reportComparisonBlockNarrative(area) {
  const rows = reportComparisonBlockDeltas(area);
  const improved = rows
    .filter((item) => item.delta > 0.15)
    .sort((a, b) => b.delta - a.delta)
    .slice(0, 3);
  const worsened = rows
    .filter((item) => item.delta < -0.15)
    .sort((a, b) => a.delta - b.delta)
    .slice(0, 3);
  const priority = reportBlockPriorityData(area)[0];
  const improvedText = reportPlainList(improved.map((item) => `${item.block.title} (${reportDeltaText(item.delta)})`), "sem melhora expressiva");
  const worsenedText = reportPlainList(worsened.map((item) => `${item.block.title} (${reportDeltaText(item.delta)})`), "sem queda expressiva");
  const priorityReason = [
    priority?.highRiskNc ? "NC de risco alto" : "",
    priority?.recurringNcs ? "recorrência" : "",
    priority?.linkedLatePlan ? "plano de ação não concluído no prazo" : ""
  ].filter(Boolean);
  const priorityText = priority && priorityReason.length
    ? `${priority.block.title} permanece como ponto de atenção devido à presença de ${reportPlainList(priorityReason)}.`
    : "";

  return `
    <div class="report-note-box">
      <strong>Leitura das variações por bloco</strong>
      <p>As maiores evoluções ocorreram em ${escapeHtml(improvedText)}. ${worsened.length ? `As maiores quedas ocorreram em ${escapeHtml(worsenedText)}.` : "Não foram observadas quedas relevantes entre os blocos avaliados."} ${escapeHtml(priorityText)}</p>
    </div>
  `;
}

function reportActionEffectNarrative(area) {
  const plans = actionPlansForArea(area);
  if (!plans.length) {
    return `
      <p class="report-footnote">Não foram identificados planos de ação vigentes com validação de efetividade aplicável neste comparativo.</p>
    `;
  }

  const firstPlan = plans[0];
  const originRow = reportPlanOriginRow(area, firstPlan);
  const riskLabel = originRow ? (riskMeta[originRow.riskLevel] || riskMeta.none).label.toLowerCase() : (firstPlan.critical ? "alto" : "médio");
  const problemText = originRow ? `ao item ${String(originRow.number).padStart(2, "0")}` : `ao bloco ${firstPlan.block}`;
  const conclusion = firstPlan.status === "concluido" && firstPlan.improved === true
    ? "foi concluído no prazo e não apresentou repetição da ocorrência relacionada."
    : firstPlan.status === "concluido"
      ? "foi concluído, porém a ocorrência relacionada voltou a aparecer no mês atual."
      : "não foi concluído até a auditoria atual.";
  const effectivenessText = firstPlan.status === "concluido" && firstPlan.improved === true
    ? "Houve comprovação de efetividade da ação no período."
    : "Como a ocorrência voltou a ser identificada, não houve comprovação de efetividade da ação no período.";

  return `
    <div class="report-note-box">
      <strong>Leitura dos planos avaliados</strong>
      <p>O plano "${escapeHtml(reportFullText(firstPlan.title))}", vinculado ${escapeHtml(problemText)} e classificado como risco ${escapeHtml(riskLabel)}, ${conclusion} ${effectivenessText} O requisito deverá ser reavaliado no próximo ciclo quanto à execução da ação, à evidência apresentada e à suficiência da medida corretiva.</p>
    </div>
  `;
}

function reportAnalyticQuestionRows(area) {
  const current = reportAreaTotals(area);
  const previous = reportPreviousAreaTotals(area);
  const stats = actionPlanStats(area);
  const delta = area.score - area.last;
  const newNcs = Math.max(0, current.NC - previous.NC);
  const resolvedNcs = Math.max(0, previous.NC - current.NC);
  const recurring = Math.min(current.NC, previous.NC, Math.max(stats.recurrent, current.NC - newNcs));
  const actionEffect = stats.noEffect
    ? "Ação sem efeito suficiente: há planos executados/em andamento sem reflexo claro na nota."
    : stats.improved
      ? "Ação com efeito positivo: houve melhora associada aos planos concluídos ou em execução."
      : "Ação ainda inconclusiva: impacto será confirmado no próximo ciclo.";

  return [
    ["A nota da área melhorou?", delta > 0.15 ? `Sim. Houve ganho de ${reportDeltaText(delta)} ponto.` : delta < -0.15 ? `Não. Houve queda de ${reportDeltaText(delta)} ponto.` : "A nota permaneceu estável."],
    ["As NCs anteriores se repetiram?", recurring ? `Sim. ${recurring} NC(s) aparecem como recorrentes e devem ser priorizadas.` : "Não há recorrência relevante no recorte."],
    ["Houve novas NCs?", newNcs ? `Sim. ${newNcs} nova(s) NC(s) foram registradas no mês atual.` : "Não houve aumento de NCs em relação ao mês anterior."],
    ["Alguma NC foi resolvida?", resolvedNcs ? `Sim. ${resolvedNcs} NC(s) deixaram de aparecer no mês atual.` : "Não há resolução mensurável de NCs neste comparativo."],
    ["Os planos de ação surtiram efeito?", actionEffect],
    ["Qual deve ser a conduta?", delta < 0 || stats.noEffect ? "Revisar responsáveis, prazo e evidência de execução dos planos sem efeito." : "Manter rotina, registrar evidências e sustentar o resultado no próximo mês."]
  ];
}

function reportMonthlyNeedsExtraPage(area) {
  return reportNcRows(area, 4).length > 1 || reportNcRows(area, 10).length > 6 || actionPlansForArea(area).length > 2;
}

function monthlyReportPage() {
  const area = reportSelectedArea();
  const needsExtraPage = reportMonthlyNeedsExtraPage(area);
  const pages = needsExtraPage ? 4 : 3;
  const title = "Relatório Consolidado da Auditoria do Mês";
  const titleWithMonth = `${title} - ${reportMonthLabel(currentMonthId)}`;
  const ncSection = reportSection("5", "Não conformidades registradas", `
    ${reportDocTable(["Item", "Bloco", "Requisito avaliado", "Risco", "Evidência/observação", "Plano vinculado"], reportNcDetailRows(area), "is-ncs")}
  `);
  const evidenceSection = reportSection("6", "Evidências fotográficas", reportEvidenceGrid(area));
  const plansConclusionSections = `
    ${reportSection("7", "Planos de ação vigentes", `
      ${reportDocTable(["Origem", "Ação corretiva", "Responsável", "Prazo", "Status"], reportPlanRowsForArea(area), "is-plans")}
      ${reportActionFootnote()}
    `)}
    ${reportSection("8", "Conclusão", reportConclusion(area))}
  `;

  return `
    <div class="technical-report">
      ${reportMonthlyPage(title, area, 1, pages, `
        <h1>${titleWithMonth}</h1>
        <p class="report-doc-lead">Relatório mensal individual da área auditada, com resultado do mês vigente, blocos do checklist, não conformidades, evidências e planos de ação gerados.</p>
        ${reportMiniKpis(area)}
        ${reportMonthlyLegendBlock()}
        ${reportSection("1", "Síntese executiva da área", `
          ${reportDocTable(["Indicador", "Resultado", "Indicador", "Resultado"], reportSummaryRows(area), "is-meta")}
          ${reportMonthlyInsight(area)}
        `)}
        ${reportSection("2", "Escopo e critérios de leitura", `
          ${reportDocTable(["Critério", "Aplicação no relatório"], [
            ["Conforme (C)", "Requisito atendido conforme checklist e referência legal aplicada."],
            ["Não Conforme (NC)", "Requisito não atendido, com necessidade de evidência, plano de ação e acompanhamento."],
            ["Não Avaliado (X)", "Item não aplicável ou não verificado no ciclo mensal analisado."],
            ["Meta de desempenho", "Nota mínima de 8,0 para leitura satisfatória da área no mês vigente."],
            ["Risco da pergunta", "Cada pergunta possui um risco previamente atribuído; quando marcada como NC, a ocorrência herda esse nível de risco."]
          ])}
        `)}
      `)}
      ${reportMonthlyPage(title, area, 2, pages, `
        ${reportSection("3", "Resultado por bloco do checklist", `
          ${reportBlockScoreChart(area, false, { variant: "monthly" })}
          ${reportDocTable(["Bloco", "Itens", "C", "NC", "X", "Nota", "Class."], reportBlockRows(area), "is-blocks")}
        `)}
        ${reportSection("4", "Pontos de atenção do mês", `
          ${reportMonthlyAttention(area)}
        `)}
        ${needsExtraPage ? "" : ncSection}
      `)}
      ${reportMonthlyPage(title, area, 3, pages, `
        ${needsExtraPage ? `${ncSection}${evidenceSection}` : `${evidenceSection}${plansConclusionSections}`}
      `)}
      ${needsExtraPage ? reportMonthlyPage(title, area, 4, pages, plansConclusionSections) : ""}
    </div>
  `;
}

function comparativeReportPage() {
  const area = reportSelectedArea();
  const pages = 4;
  const title = "Relatório Comparativo Analítico";

  return `
    <div class="technical-report">
      ${reportComparisonPage(area, 1, pages, `
        <h1>${title}</h1>
        <p class="report-doc-lead">Este relatório compara o desempenho da área auditada entre ${reportMonthLabel(reportPreviousMonthId())} e ${reportMonthLabel(currentMonthId)}, considerando a nota final, a variação dos blocos do checklist, as não conformidades recorrentes, os itens novamente não avaliados e a efetividade dos planos de ação vigentes. A análise busca verificar se a evolução observada representa melhoria efetiva do processo e identificar os pontos que permanecem sob correção, acompanhamento ou reavaliação.</p>
        ${reportComparisonIntroNote()}
        ${reportMiniKpis(area, "comparison")}
        ${reportComparisonLegendBlock()}
        ${reportSection("1", "Resumo comparativo da área", `
          <p class="report-doc-text report-comparison-reading-text">O resumo apresenta os principais indicadores do período comparado, incluindo nota anterior, nota atual, variação da nota, ocorrências recorrentes, novos apontamentos, itens resolvidos e planos de ação vinculados à área auditada.</p>
          ${reportDocTable(["Indicador", reportShortMonthLabel(reportPreviousMonthId()), "Indicador", reportShortMonthLabel(currentMonthId)], reportComparisonSummaryRows(area), "is-meta")}
        `)}
        ${reportSection("2", "Síntese técnica comparativa", `
          ${reportComparativeNarrative(area)}
        `)}
      `)}
      ${reportComparisonPage(area, 2, pages, `
        ${reportSection("3", "Comparativo por bloco do checklist", `
          <p class="report-doc-text report-comparison-reading-text">O gráfico e a tabela apresentam a variação de desempenho dos blocos do checklist entre os dois ciclos auditados, permitindo identificar evoluções e pontos que permanecem sob atenção.</p>
          ${reportBlockScoreChart(area, true, { variant: "comparison" })}
          ${reportDocTable(["Bloco", reportMonthLabel(reportPreviousMonthId()), reportMonthLabel(currentMonthId), "Variação"], reportComparisonBlockRows(area), "is-comparison")}
          ${reportComparisonBlockNarrative(area)}
        `)}
      `)}
      ${reportComparisonPage(area, 3, pages, `
        ${reportSection("4", "Efetividade dos planos de ação", `
          <p class="report-doc-text report-comparison-reading-text">Esta seção avalia os planos de ação vigentes no período comparado, ou seja, aqueles que deveriam estar concluídos até a auditoria de ${reportMonthLabel(currentMonthId)}. A análise considera o problema que originou o plano, o risco da pergunta, a ação proposta, o responsável, a conclusão no prazo, a evidência registrada e o impacto observado no requisito relacionado.</p>
          ${reportDocTable(["Problema identificado", "Risco", "Plano de ação", "Responsável", "Status", "Evidência / impacto", "Leitura"], reportActionEffectRowsForArea(area), "is-actions")}
          ${reportActionEffectNarrative(area)}
        `)}
        ${reportSection("5", "Recorrência das não conformidades", `
          <p class="report-doc-text report-comparison-reading-text">São consideradas recorrentes as ocorrências identificadas no mesmo requisito no mês anterior e no mês atual. A recorrência pode envolver não conformidade repetida, item novamente não avaliado ou requisito que permanece sem evolução mesmo após plano de ação vinculado.</p>
          ${reportDocTable(["Item", "Requisito", reportMonthLabel(reportPreviousMonthId()), reportMonthLabel(currentMonthId), "Risco", "Leitura"], reportRecurrenceRows(area), "is-recurrence")}
          ${reportRecurrenceNarrative(area)}
        `)}
      `)}
      ${reportComparisonPage(area, 4, pages, `
        ${reportSection("6", "Blocos com maiores oportunidades de melhoria", `
          <p class="report-doc-text report-comparison-reading-text">A priorização considera blocos com menor desempenho relativo, presença de não conformidades de risco médio ou alto, repetição de ocorrências, itens novamente não avaliados e planos de ação vigentes sem efetividade comprovada.</p>
          ${reportDocTable(["Nº", "Bloco / requisito", "Nota", "Risco", "Motivo da priorização", "Conduta sugerida"], reportBlockPriorityRows(area), "is-priority")}
          <div class="report-note-box">
            <strong>Direcionamento das correções</strong>
            <p>${escapeHtml(reportBlockPriorityData(area)[0]?.block.title || area.name)} constitui a principal prioridade para o próximo ciclo, devido à recorrência de não conformidade de risco alto e à existência de plano de ação não concluído no prazo. O acompanhamento deverá considerar a execução da ação, o cumprimento do prazo, a evidência registrada e a validação de sua efetividade na auditoria subsequente.</p>
          </div>
        `)}
        <div class="report-signatures">
          <span>Auditor responsável</span>
          <span>Responsável pelo plano de ação</span>
        </div>
      `)}
    </div>
  `;
}

function reportLibraryItems(area) {
  return [
    {
      id: "monthly",
      title: "Relatório da auditoria mensal",
      status: "Disponível",
      note: reportMonthLabel(currentMonthId),
      available: true
    },
    {
      id: "comparison",
      title: "Relatório comparativo",
      status: "Disponível",
      note: `${reportMonthLabel(currentMonthId)} / ${reportMonthLabel(reportPreviousMonthId())}`,
      available: true
    },
    {
      id: "quarterly",
      title: "Relatório trimestral",
      status: "Disponível após Setembro/2026",
      note: "Histórico trimestral em formação",
      available: false
    },
    {
      id: "semiannual",
      title: "Relatório semestral",
      status: "Disponível após Dezembro/2026",
      note: "Histórico semestral em formação",
      available: false
    },
    {
      id: "annual",
      title: "Relatório anual",
      status: "Disponível após Dezembro/2026",
      note: "Consolidação anual em formação",
      available: false
    }
  ];
}

function reportHistoryRows(area) {
  return [
    { period: reportMonthLabel(currentMonthId), type: "Auditoria mensal", status: "PDF disponível", kind: "monthly" },
    { period: `${reportMonthLabel(currentMonthId)} / ${reportMonthLabel(reportPreviousMonthId())}`, type: "Comparativo analítico", status: "PDF disponível", kind: "comparison" },
    { period: reportMonthLabel(reportPreviousMonthId()), type: "Auditoria mensal", status: "Histórico registrado", kind: "" }
  ].map((row) => `
    <tr>
      <td>${escapeHtml(row.period)}</td>
      <td>${escapeHtml(row.type)}</td>
      <td>${escapeHtml(row.status)}</td>
      <td>
        ${row.kind
          ? reportStoredPdfLink(area, row.kind, "open", "Abrir")
          : `<span>Arquivado</span>`}
      </td>
    </tr>
  `).join("");
}

function reportFolderModal() {
  const area = state.reportFolderArea ? areaById(state.reportFolderArea) : null;
  if (!area) return "";
  const reports = reportLibraryItems(area);
  return `
    <div class="report-library-backdrop" data-close-report-folder>
      <section class="report-library-modal surface" role="dialog" aria-modal="true" aria-label="Relatórios da área ${escapeHtml(area.name)}" data-report-folder-modal>
        <div class="report-library-modal-head">
          <div>
            <span>Relatórios da área</span>
            <h2>${escapeHtml(area.name)}</h2>
            <p>Escolha o tipo de relatório disponível para abrir em PDF ou baixar o arquivo.</p>
          </div>
          <button class="panel-close" data-close-report-folder aria-label="Fechar">${icons.close}</button>
        </div>
        <div class="report-library-content">
          <div class="report-option-list">
            ${reports.map((report) => `
              <article class="report-option-row ${report.available ? "" : "is-disabled"}">
                <div>
                  <h3>${escapeHtml(report.title)}</h3>
                  <p>${escapeHtml(report.note)}</p>
                </div>
                <span>${escapeHtml(report.status)}</span>
                <div class="report-option-actions">
                  ${report.available ? reportStoredPdfLink(area, report.id, "open", "Abrir PDF") : `<button disabled>${svgIcon("externalLink")} Abrir PDF</button>`}
                  ${report.available ? reportStoredPdfLink(area, report.id, "download", "Baixar") : `<button disabled>${svgIcon("document")} Baixar</button>`}
                </div>
              </article>
            `).join("")}
          </div>
          <div class="report-history-panel">
            <div class="report-history-head">
              <h3>Histórico de relatórios</h3>
              <p>Auditorias e relatórios já registrados para esta área.</p>
            </div>
            <div class="report-history-table-wrap">
              <table class="report-history-table">
                <thead><tr><th>Período</th><th>Relatório</th><th>Status</th><th>Ação</th></tr></thead>
                <tbody>${reportHistoryRows(area)}</tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  `;
}

function reportsPage() {
  return `
    <section class="reports-page report-library-page">
      <div class="report-library-panel surface">
        <div class="report-library-head">
          <div>
            <h2>Relatórios por área auditada</h2>
            <p>Selecione uma pasta para consultar os relatórios disponíveis e o histórico da área.</p>
          </div>
        </div>
        <div class="report-folder-grid">
          ${areaData.map((area) => `
            <button class="report-folder-tile" data-report-folder-area="${area.id}" aria-label="Abrir relatórios de ${escapeHtml(area.name)}">
              <span class="report-folder-icon">${assetIcon("reportFolder", "blue")}</span>
              <span>${escapeHtml(area.name)}</span>
            </button>
          `).join("")}
        </div>
      </div>
      ${reportFolderModal()}
    </section>
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

function questionRiskChip(question) {
  const meta = riskMeta[question.riskLevel] || riskMeta.none;
  return `
    <span class="question-risk-chip" style="--risk-color:${meta.color}">
      <i></i>
      Risco da pergunta: ${escapeHtml(meta.label)}
    </span>
  `;
}

function questionActionPlanNotice(area, question) {
  return questionActionPlanData[area.id]?.[question.id] || null;
}

function questionActionPlanButton(question) {
  return `
    <button class="question-plan-bulb" data-question-plan-notice="${question.id}" title="Ver plano de ação vinculado" aria-label="Ver plano de ação vinculado">
      <img src="assets/action-plan-bulb.png?v=20260902-bulb-1" alt="" />
    </button>
  `;
}

function questionActionPlanCard(plan) {
  const status = actionStatusMeta[plan.status] || actionStatusMeta.andamento;
  return `
    <section class="question-plan-alert" style="--plan-status:${status.color}">
      <div class="question-plan-alert-head">
        <div>
          <strong>Plano de ação vinculado</strong>
          <p>Este item possui um plano de ação finalizado. Verifique a evidência e confirme se a melhoria foi implementada antes de responder.</p>
        </div>
        <button class="question-plan-close" data-close-question-plan title="Fechar aviso">${icons.close}</button>
      </div>
      <div class="question-plan-alert-grid">
        <div class="question-plan-alert-copy">
          <dl>
            <div><dt>Status</dt><dd><span>${escapeHtml(status.label)}</span></dd></div>
            <div><dt>Auditoria anterior</dt><dd>${escapeHtml(plan.previousAudit)} · ${escapeHtml(plan.auditDate)}</dd></div>
            <div><dt>Auditor</dt><dd>${escapeHtml(plan.auditor)}</dd></div>
            <div><dt>Responsável</dt><dd>${escapeHtml(plan.owner)}</dd></div>
            <div><dt>Concluído em</dt><dd>${escapeHtml(plan.closedAt)}</dd></div>
          </dl>
          <div class="question-plan-alert-action">
            <span>Plano executado</span>
            <p>${escapeHtml(plan.action)}</p>
          </div>
        </div>
        <figure class="question-plan-evidence">
          <img src="${escapeHtml(plan.evidence)}" alt="${escapeHtml(plan.evidenceAlt)}" />
          <figcaption>Evidência registrada para conferência do auditor.</figcaption>
        </figure>
      </div>
    </section>
  `;
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
                const risk = riskMeta[question.riskLevel] || riskMeta.none;
                const planNotice = questionActionPlanNotice(area, question);
                const isPlanNoticeOpen = planNotice && state.actionPlanNoticeQuestion === question.id;
                return `
                  <section class="question-card surface ${isNC ? "has-nc" : ""}" data-question-card="${question.id}" style="--question-risk:${risk.color}">
                    <div class="question-head">
                      <div class="question-marker">
                        <span class="question-number">${String(displayNumber).padStart(2, "0")}</span>
                        ${planNotice ? questionActionPlanButton(question) : ""}
                      </div>
                      <div>
                        <h2>${escapeHtml(question.text)}</h2>
                        <div class="question-meta-row">
                          ${questionRiskChip(question)}
                          <span class="law-ref">${escapeHtml(question.reference)}</span>
                        </div>
                      </div>
                    </div>
                    ${isPlanNoticeOpen ? questionActionPlanCard(planNotice) : ""}
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
                      <div class="nc-risk-record" style="--risk-color:${risk.color}">
                        <i></i>
                        Não conformidade de risco ${escapeHtml(risk.label)}
                      </div>
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

function settingsSectionById(id = state.settingsSection) {
  return settingsSections.find((section) => section.id === id) || settingsSections[0];
}

function settingsOptionTabs(items, activeId, dataName) {
  return `
    <div class="settings-option-tabs" role="tablist">
      ${items
        .map(
          (item) => `
            <button class="settings-option-btn ${item.id === activeId ? "is-active" : ""}" ${dataName}="${item.id}" type="button">
              ${escapeHtml(item.label)}
            </button>
          `
        )
        .join("")}
    </div>
  `;
}

function settingsUserRows(users, emptyText, inactive = false) {
  if (!users.length) {
    return `<div class="settings-empty-state">${escapeHtml(emptyText)}</div>`;
  }

  return `
    <div class="settings-table-wrap">
      <table class="settings-table">
        <thead>
          <tr><th>Usuário</th><th>Perfil</th><th>Área/acesso</th><th>Status</th><th>Ações</th></tr>
        </thead>
        <tbody>
          ${users
            .map(
              (user) => `
                <tr>
                  <td><span class="settings-primary">${escapeHtml(user.name)}</span><span>${escapeHtml(user.email)}</span></td>
                  <td>${escapeHtml(user.profile)}</td>
                  <td>${escapeHtml(user.area)}</td>
                  <td><span class="settings-status ${inactive ? "is-inactive" : "is-active"}">${escapeHtml(user.status)}</span></td>
                  <td><div class="settings-row-actions"><button>Editar</button><button>${inactive ? "Reativar" : "Inativar"}</button></div></td>
                </tr>
              `
            )
            .join("")}
        </tbody>
      </table>
    </div>
  `;
}

function settingsNewUserForm() {
  return `
    <section class="settings-inner-panel">
      <div class="settings-subsection-head">
        <div>
          <h3>Cadastrar usuário</h3>
          <p class="settings-mini-copy">Preencha os dados principais; o sistema sugere o login e a senha provisória pode ser alterada antes do envio.</p>
        </div>
      </div>
      <div class="settings-form-grid settings-user-form-grid">
        <div class="note-field"><label>Nome</label><input placeholder="Nome completo" /></div>
        <div class="note-field"><label>E-mail</label><input placeholder="usuario@hospital.com.br" /></div>
        <div class="note-field"><label>Login de acesso</label><input value="david.souza" /></div>
        <div class="note-field"><label>Senha provisória</label><input value="Idvida@2026" /></div>
        <div class="note-field"><label>Área vinculada</label><select><option>Todas as áreas</option>${areaData.map((area) => `<option>${escapeHtml(area.name)}</option>`).join("")}</select></div>
        <div class="note-field"><label>Perfil/permissão</label><select><option>Auditor</option><option>Qualidade/Admin</option><option>Responsável da área</option><option>Visualizador</option></select></div>
        <div class="settings-login-suggestions">
          <span>Logins disponíveis:</span>
          <button type="button">david.souza</button>
          <button type="button">david.souza2</button>
          <button type="button">d.souza</button>
        </div>
        <button class="settings-soft-btn settings-save-btn">Salvar usuário</button>
      </div>
    </section>
  `;
}

function settingsUsersToolbar(inactive = false) {
  return `
    <div class="settings-list-toolbar">
      <label class="settings-search-field">
        ${svgIcon("search", "settings-search-icon")}
        <input placeholder="Pesquisar usuário" />
      </label>
      <button class="settings-soft-btn" data-toggle-users-list>
        ${state.settingsUsersExpanded ? "Ocultar lista" : `Expandir ${inactive ? "inativos" : "usuários"}`}
      </button>
    </div>
  `;
}

function settingsUsersListPanel(users, emptyText, inactive = false) {
  return `
    ${settingsUsersToolbar(inactive)}
    ${state.settingsUsersExpanded ? settingsUserRows(users, emptyText, inactive) : `
      <div class="settings-empty-state">Lista recolhida. Use a lupa para localizar um usuário ou expanda a lista para visualizar os registros.</div>
    `}
  `;
}

function settingsRuleEditor(items, title, text, addLabel, mode = "default") {
  return `
    <section class="settings-subsection">
      <div class="settings-subsection-head">
        <div>
          <h3>${escapeHtml(title)}</h3>
          <p class="settings-mini-copy">${escapeHtml(text)}</p>
        </div>
        <button class="settings-soft-btn">${escapeHtml(addLabel)}</button>
      </div>
      <div class="settings-rules-list">
        ${items
          .map(
            (item, index) => `
              <div class="settings-rule-row ${mode === "visual" ? "settings-rule-row-visual" : ""}">
                <span>
                  <span class="settings-primary">${escapeHtml(item.label)}</span>
                  <small>${escapeHtml(item.detail)}</small>
                </span>
                ${mode === "visual" ? `<input class="settings-color-input" type="color" value="${["#31aa42", "#f0b232", "#f28b30", "#d34a5a"][index] || "#0b69e8"}" />` : ""}
                <input value="${escapeHtml(item.value)}" />
                <button class="settings-soft-btn">Editar</button>
              </div>
            `
          )
          .join("")}
      </div>
    </section>
  `;
}

function settingsUsersContent() {
  if (state.settingsUserView === "new") return settingsNewUserForm();
  if (state.settingsUserView === "inactive") {
    return `
      <section class="settings-inner-panel">
        <div class="settings-subsection-head">
          <div>
            <h3>Usuários inativos</h3>
            <p class="settings-mini-copy">Usuários inativados deixam de acessar o sistema, mas permanecem no histórico.</p>
          </div>
        </div>
        ${settingsUsersListPanel(settingsInactiveUsers, "Nenhum usuário inativo neste ambiente de teste.", true)}
      </section>
    `;
  }

  return `
    <section class="settings-inner-panel">
      <div class="settings-subsection-head">
        <div>
          <h3>Usuários</h3>
          <p class="settings-mini-copy">Consulte usuários ativos, edite cadastro e inative acessos quando necessário.</p>
        </div>
      </div>
      ${settingsUsersListPanel(settingsUsers, "Nenhum usuário ativo cadastrado.")}
    </section>
  `;
}

function settingsUsersPanel() {
  const userTabs = [
    { id: "active", label: "Usuários" },
    { id: "new", label: "Cadastrar usuário" },
    { id: "inactive", label: "Usuários inativos" }
  ];

  return `
    <div class="settings-panel">
      <div class="settings-panel-head">
        <div>
          <h2>Usuários</h2>
          <p>Cadastro, login, senha provisória, status e perfil de permissão do usuário.</p>
        </div>
      </div>
      ${settingsOptionTabs(userTabs, state.settingsUserView, "data-settings-user-view")}
      ${settingsUsersContent()}
    </div>
  `;
}

function settingsRulesPanel() {
  const rulesTabs = [
    { id: "goals", label: "Metas" },
    { id: "scoring", label: "Pontuação" },
    { id: "visual", label: "Regras visuais" }
  ];
  const content = {
    goals: settingsRuleEditor(settingsGoalRules, "Metas", "Defina meta mínima e faixas de desempenho do relatório e do painel.", "Nova faixa"),
    scoring: settingsRuleEditor(settingsScoringRules, "Pontuação", "Defina como C, NC, X e risco entram no cálculo da auditoria.", "Nova regra"),
    visual: settingsRuleEditor(settingsVisualRules, "Regras visuais", "Defina cores de legenda, alertas e sinalizações usadas no dashboard.", "Nova cor/legenda", "visual")
  };

  return `
    <div class="settings-panel">
      <div class="settings-panel-head">
        <div>
          <h2>Metas, pontuação e visual</h2>
          <p>Defina os critérios usados para nota, risco e sinalização visual do painel.</p>
        </div>
        <button class="settings-soft-btn">Salvar regras</button>
      </div>
      ${settingsOptionTabs(rulesTabs, state.settingsRulesView, "data-settings-rules-view")}
      ${content[state.settingsRulesView] || content.goals}
    </div>
  `;
}

function settingsActivePanel() {
  const panels = {
    users: settingsUsersPanel,
    rules: settingsRulesPanel
  };
  return (panels[state.settingsSection] || settingsUsersPanel)();
}

function ficharioUsersContent() {
  if (state.settingsUserView === "new") {
    return `
      <div class="fichario-sub-panel">
        <form data-access-user-form>
          <div class="fichario-sub-head"><div><h2>Cadastrar usuário</h2><p>O administrador informa os dados e o sistema gera um código de primeiro acesso. A senha definitiva será criada pelo próprio usuário.</p></div><button class="fichario-sub-action is-primary" type="submit">Salvar usuário</button></div>
          ${accessNotice ? `<div class="access-admin-notice ${accessNotice.type === "error" ? "is-error" : ""}">${escapeHtml(accessNotice.text)}${accessNotice.code ? `<strong>${escapeHtml(accessNotice.code)}</strong><small>Copie agora. Este código não será exibido novamente.</small>` : ""}</div>` : ""}
          <div class="fichario-form-grid">
            <label><span>Nome completo</span><input name="fullName" autocomplete="name" placeholder="David Souza" required maxlength="250" /></label>
            <label><span>Login de acesso</span><input name="username" autocomplete="off" placeholder="david.souza" pattern="[A-Za-z0-9][A-Za-z0-9._-]{2,63}" required /></label>
            <label><span>E-mail de contato (opcional)</span><input name="email" type="email" autocomplete="email" placeholder="usuario@hospital.com.br" maxlength="250" /></label>
            <label><span>Perfil</span><select name="role" required><option value="auditor">Auditor</option><option value="area_responsible">Responsável da área</option><option value="viewer">Visualizador</option><option value="quality">Qualidade</option><option value="admin">Administrador</option></select></label>
            <label><span>Área vinculada</span><select name="areaId"><option value="">Todas / definir depois</option>${settingsAccessAreas.map((area) => `<option value="${escapeHtml(area.id)}">${escapeHtml(area.name)}</option>`).join("")}</select></label>
            <div class="fichario-hint">Não há campo de senha. O código temporário será gerado automaticamente e exigirá troca no primeiro login.</div>
          </div>
        </form>
      </div>
    `;
  }

  const users = state.settingsUserView === "inactive" ? settingsInactiveUsers : settingsUsers;
  const inactive = state.settingsUserView === "inactive";
  return `
    <div class="fichario-sub-panel">
      <div class="fichario-sub-head"><div><h2>${inactive ? "Usuários inativos" : "Logins cadastrados"}</h2><p>${inactive ? "Histórico de acessos bloqueados, com possibilidade de reativação quando autorizado." : "Cadastros reais desta unidade, incluindo primeiro acesso e solicitações de redefinição."}</p></div><button class="fichario-sub-action${inactive ? "" : " is-primary"}" data-open-new-user type="button">${inactive ? "Ver cadastros" : "Novo usuário"}</button></div>
      ${accessNotice ? `<div class="access-admin-notice ${accessNotice.type === "error" ? "is-error" : ""}">${escapeHtml(accessNotice.text)}${accessNotice.code ? `<strong>${escapeHtml(accessNotice.code)}</strong><small>Copie agora. Este código não será exibido novamente.</small>` : ""}</div>` : ""}
      <div class="fichario-search-line"><label><span>${icons.search}</span><input placeholder="Pesquisar usuário ou login..." /></label><button class="fichario-sub-action" data-toggle-users-list type="button">${state.settingsUsersExpanded ? "Ocultar lista" : "Expandir lista"}</button></div>
      <div class="fichario-user-accordion"><div class="fichario-accordion-title"><strong>${inactive ? "Usuários inativos" : "Usuários ativos"}</strong><small>${users.length} registros</small></div>${state.settingsUsersExpanded ? `<div class="fichario-user-list">${users.map((user) => `<div class="fichario-user-line"><div><strong>${escapeHtml(user.name)}</strong><small>${escapeHtml(user.username)} · ${escapeHtml(user.email)}</small></div><span>${escapeHtml(user.profile)}</span><span>${escapeHtml(user.area)}</span><span class="fichario-status-pill ${inactive ? "is-inactive" : user.reset_pending ? "is-reset" : ""}">${escapeHtml(user.status)}</span><div class="fichario-line-actions">${!inactive ? `<button type="button" data-reset-user="${escapeHtml(user.id)}">Redefinir senha</button>` : ""}<button type="button" data-user-status="${escapeHtml(user.id)}" data-active="${inactive}">${inactive ? "Reativar" : "Inativar"}</button></div></div>`).join("") || '<div class="fichario-collapsed-copy">Nenhum usuário nesta lista.</div>'}</div>` : `<div class="fichario-collapsed-copy">Lista recolhida. Use a lupa para localizar um usuário ou expanda a lista para visualizar os registros.</div>`}</div>
    </div>
  `;
}

function ficharioSettingsContent() {
  if (state.settingsRulesView === "tables") {
    const activeSection = foodTableSections.find((section) => section.id === state.openTableSection) || foodTableSections[0];
    return `
      <div class="fichario-sub-panel">
        <div class="fichario-sub-head">
          <div>
            <h2>Tabelas técnicas</h2>
            <p>Referências de recebimento, armazenamento, pré-preparo e distribuição.</p>
          </div>
          <button class="fichario-sub-action is-primary" type="button">Editar tabelas</button>
        </div>
        <div class="table-category-grid">
          ${foodTableSections.map((section) => `
            <button class="table-category-card surface ${section.id === activeSection.id ? "is-active" : ""}" data-table-section="${section.id}" style="--table-accent:${section.accent}" aria-expanded="${section.id === activeSection.id}">
              <img class="table-category-icon" src="assets/icons/${section.icon}?v=tables-icons-1" alt="" aria-hidden="true" />
              <span class="table-category-copy">
                <strong>${escapeHtml(section.title)}</strong>
                <small>${escapeHtml(section.subtitle)}</small>
              </span>
              <span class="table-category-count">${section.items.length} itens</span>
            </button>
          `).join("")}
        </div>
        ${tableSectionDetails(activeSection)}
      </div>
    `;
  }

  const content = {
    goals: ["Metas", "Definição da meta mínima, faixas de desempenho e alertas por resultado.", settingsGoalRules.map((item) => [item.label, item.detail, item.value])],
    scoring: ["Pontuação", "Regras de cálculo para C, NC, X e peso do risco da pergunta.", settingsScoringRules.map((item) => [item.label, item.detail, item.value])],
    visual: ["Regras visuais", "Cores, legendas, bordas e alertas exibidos no dashboard, checklist e relatório.", settingsVisualRules.map((item) => [item.label, item.detail, item.value])],
    docs: ["Documentação", "Documentos, certificados e licenças usados durante a auditoria.", [["Licença sanitária", "Arquivo, validade e alerta de vencimento.", "Obrigatório"]]]
  };
  const [title, description, rows] = content[state.settingsRulesView] || content.goals;
  return `<div class="fichario-sub-panel"><div class="fichario-sub-head"><div><h2>${escapeHtml(title)}</h2><p>${escapeHtml(description)}</p></div><button class="fichario-sub-action is-primary" type="button">${title === "Metas" ? "Editar metas" : `Editar ${title.toLowerCase()}`}</button></div><div class="fichario-settings-lines">${rows.map(([label, detail, value]) => `<div class="fichario-setting-line"><div><strong>${escapeHtml(label)}</strong><span>${escapeHtml(detail)}</span></div><b>${escapeHtml(value)}</b><button class="fichario-sub-action" type="button">Editar</button></div>`).join("")}</div></div>`;
}

function settingsPage() {
  return `
    <section class="fichario-module">
      <div class="fichario-module-head"><span class="eyebrow">Configurações</span><h1 class="panel-title">Parâmetros do sistema</h1><p class="panel-subtitle">Aqui ficam regras de meta, pontuação, documentação obrigatória, tabelas técnicas e ajustes visuais usados nos painéis e relatórios.</p></div>
      <div class="fichario-sub-tabs" role="tablist">${[["goals", "Metas"], ["scoring", "Pontuação"], ["visual", "Regras visuais"], ["docs", "Documentação"], ["tables", "Tabelas técnicas"]].map(([id, label]) => `<button class="fichario-sub-tab ${state.settingsRulesView === id ? "is-active" : ""}" data-settings-rules-view="${id}" type="button">${label}</button>`).join("")}</div>
      ${ficharioSettingsContent()}
    </div>
  `;
}

function usersPage() {
  return `
    <section class="fichario-module">
      <div class="fichario-module-head"><span class="eyebrow">Usuários</span><h1 class="panel-title">Acessos do sistema</h1><p class="panel-subtitle">Cadastro, logins, permissões por perfil e usuários inativos ficam no mesmo módulo, sem separar permissão em outra tela.</p></div>
      <div class="fichario-sub-tabs" role="tablist">${[["new", "Cadastro"], ["active", "Logins"], ["inactive", "Usuários inativos"]].map(([id, label]) => `<button class="fichario-sub-tab ${state.settingsUserView === id ? "is-active" : ""}" data-settings-user-view="${id}" type="button">${label}</button>`).join("")}</div>
      ${ficharioUsersContent()}
    </section>
  `;
}

function planningActionRows() {
  const fallbackPlans = areaData
    .filter((area) => area.pending > 0)
    .map((area, index) => ({
      id: `${area.id}-auto`,
      area,
      title: area.critical ? "Corrigir NCs de alto risco" : "Regularizar pendências da área",
      block: subareaData[area.id]?.[0]?.label || "Checklist mensal",
      owner: area.name,
      status: area.score < 7 ? "pending_review" : area.pending > 2 ? "in_progress" : "awaiting_send",
      due: `${18 + index}/09/2026`,
      ncs: area.ncs,
      attempts: area.score < 7 ? 2 : 1,
      source: "Auditoria atual"
    }));

  const configuredPlans = Object.entries(actionPlanData).flatMap(([areaId, plans]) => {
    const area = areaData.find((item) => item.id === areaId);
    if (!area) return [];
    return plans.map((plan, index) => ({
      id: `${areaId}-${index}`,
      area,
      title: plan.title,
      block: plan.block,
      owner: plan.owner,
      status: plan.status === "concluido" ? "approved" : plan.status === "atrasado" ? "overdue" : plan.status === "pendente" ? "awaiting_send" : "in_progress",
      due: `${21 + index}/09/2026`,
      ncs: plan.critical ? 2 : 1,
      attempts: plan.status === "concluido" ? 1 : 0,
      source: plan.status === "concluido" ? "Histórico Agosto/2026" : "Auditoria atual"
    }));
  });

  const historicalPlans = [
    ["hist-residuos-ago", "area-residuos", "Adequar segregação de resíduos", "Agosto/2026", "Carlos Lima", "approved", "28/08/2026", 3, 1],
    ["hist-residuos-jul", "area-residuos", "Revisar identificação de contentores", "Julho/2026", "Carlos Lima", "rejected", "30/07/2026", 2, 2],
    ["hist-documentacao-ago", "documentacao", "Atualizar POP de higienização", "Agosto/2026", "Marina Costa", "approved", "26/08/2026", 1, 1],
    ["hist-dml-jul", "dml-produto-quimico", "Regularizar armazenamento químico", "Julho/2026", "Paulo Nunes", "approved", "24/07/2026", 2, 1]
  ].map(([id, areaId, title, block, owner, status, due, ncs, attempts]) => {
    const area = areaData.find((item) => item.id === areaId);
    if (!area) return null;
    return {
      id,
      area,
      title,
      block,
      owner,
      status,
      due,
      ncs,
      attempts,
      source: "Histórico"
    };
  }).filter(Boolean);

  return [...configuredPlans, ...fallbackPlans, ...historicalPlans];
}

function planningActiveRows(rows = planningActionRows()) {
  return rows.filter((row) => ["awaiting_send", "in_progress", "reopened", "overdue"].includes(row.status));
}

function planningFeedbackRows(rows = planningActionRows()) {
  return rows.filter((row) => row.status === "pending_review");
}

function planningHistoryRows(rows = planningActionRows()) {
  return rows.filter((row) => ["approved", "rejected"].includes(row.status));
}

function planningStatusMeta(status) {
  return {
    approved: ["Aprovado", "good"],
    rejected: ["Reprovado", "danger"],
    pending_review: ["Devolutiva recebida", "purple"],
    awaiting_send: ["Aguardando envio", "warning"],
    in_progress: ["Em andamento", "blue"],
    reopened: ["Reaberto", "warning"],
    overdue: ["Vencido", "danger"]
  }[status] || ["Pendente", "neutral"];
}

function planningTotals(rows = planningActionRows()) {
  const approved = rows.filter((row) => row.status === "approved").length;
  const rejected = rows.filter((row) => row.status === "rejected").length;
  const waiting = rows.filter((row) => row.status === "pending_review").length;
  const overdue = rows.filter((row) => row.status === "overdue").length;
  const awaiting = rows.filter((row) => row.status === "awaiting_send").length;
  const active = rows.filter((row) => ["in_progress", "reopened"].includes(row.status)).length;
  return { total: rows.length, approved, rejected, waiting, overdue, active, awaiting };
}

function planningKpi(label, value, detail, tone = "blue", status = "") {
  const attrs = status ? ` data-planning-status="${status}" type="button"` : "";
  const tag = status ? "button" : "div";
  return `
    <${tag} class="planning-kpi is-${tone}"${attrs}>
      <span>${escapeHtml(label)}</span>
      <strong>${escapeHtml(String(value))}</strong>
      <small>${escapeHtml(detail)}</small>
    </${tag}>
  `;
}

function planningStatusChart(totals) {
  const total = Math.max(totals.total, 1);
  const awaiting = Math.round((totals.awaiting / total) * 100);
  const active = Math.round((totals.active / total) * 100);
  const overdue = Math.round((totals.overdue / total) * 100);
  const waiting = Math.round((totals.waiting / total) * 100);
  return `
    <div class="planning-chart-card">
      <div class="planning-donut" style="--approved:${active}; --rejected:${overdue}; --waiting:${waiting + awaiting}">
        <strong>${totals.total}</strong>
        <span>planos</span>
      </div>
      <div class="planning-chart-legend">
        <span><i class="warning"></i>${totals.awaiting} aguardando envio</span>
        <span><i class="blue"></i>${totals.active} em andamento</span>
        <span><i class="danger"></i>${totals.overdue} vencidos</span>
        <span><i class="purple"></i>${totals.waiting} devolutivas recebidas</span>
      </div>
    </div>
  `;
}

function planningAreaRanking(rows) {
  return areaData
    .map((area) => {
      const areaRows = rows.filter((row) => row.area.id === area.id);
      return {
        area,
        total: areaRows.length,
        rejected: areaRows.filter((row) => row.status === "rejected").length,
        waiting: areaRows.filter((row) => row.status === "pending_review").length,
        overdue: areaRows.filter((row) => row.status === "overdue").length
      };
    })
    .filter((row) => row.total)
    .sort((a, b) => (b.rejected + b.overdue) - (a.rejected + a.overdue) || b.total - a.total)
    .slice(0, 5);
}

function planningStatusFilterLabel(status) {
  return {
    awaiting_send: "Aguardando envio",
    in_progress: "Em andamento",
    overdue: "Vencidos",
    pending_review: "Devolutivas"
  }[status] || "Todos os planos";
}

function planningMonthLabel(month) {
  return {
    "2026-09": "Setembro/2026",
    "2026-08": "Agosto/2026",
    "2026-07": "Julho/2026"
  }[month] || "Mês";
}

function planningRowMonth(row) {
  const match = String(row.due || "").match(/(\d{2})\/(\d{4})$/);
  return match ? `${match[2]}-${match[1]}` : "";
}

function planningFilterByMonth(rows) {
  if (!state.planningMonthFilter) return rows;
  return rows.filter((row) => planningRowMonth(row) === state.planningMonthFilter);
}

function planningAreaSummaries(rows = planningActionRows()) {
  return areaData
    .map((area) => {
      const areaRows = rows.filter((row) => row.area.id === area.id);
      return {
        area,
        rows: areaRows,
        total: areaRows.length,
        approved: areaRows.filter((row) => row.status === "approved").length,
        rejected: areaRows.filter((row) => row.status === "rejected").length,
        waiting: areaRows.filter((row) => row.status === "pending_review").length,
        awaiting: areaRows.filter((row) => row.status === "awaiting_send").length,
        active: areaRows.filter((row) => ["in_progress", "reopened"].includes(row.status)).length,
        overdue: areaRows.filter((row) => row.status === "overdue").length
      };
    })
    .filter((item) => item.total)
    .sort((a, b) => (b.rejected + b.waiting + b.overdue) - (a.rejected + a.waiting + a.overdue) || b.total - a.total);
}

function planningSelectedAreaSummary(rows = planningActionRows()) {
  const summaries = planningAreaSummaries(rows);
  return summaries.find((item) => item.area.id === state.planningAreaId) || summaries[0];
}

function planningFilterDropdown(label, options, selectedValue, dataAttr, className = "") {
  const selected = options.find((option) => option.value === selectedValue) || options[0];
  return `
    <div class="planning-filter-dropdown ${className}">
      <button class="planning-filter-button" type="button" aria-label="${escapeHtml(label)}">
        <span>${escapeHtml(selected.label)}</span>
        <b>⌄</b>
      </button>
      <div class="planning-filter-menu">
        ${options.map((option) => `<button class="${option.value === selectedValue ? "is-selected" : ""}" data-${dataAttr}="${escapeHtml(option.value)}" type="button">${escapeHtml(option.label)}</button>`).join("")}
      </div>
    </div>
  `;
}

function planningAreaSelect(selectedId, dataAttr = "planning-area-option") {
  return planningFilterDropdown(
    "Selecionar área",
    [{ value: "", label: "Selecione área ou subárea" }, ...areaData.map((area) => ({ value: area.id, label: area.name }))],
    selectedId,
    dataAttr,
    "is-area"
  );
}

function planningStatusSelect(selectedStatus = state.planningStatusFilter) {
  return planningFilterDropdown(
    "Filtrar status",
    [
      { value: "", label: "Status" },
      { value: "awaiting_send", label: "Aguardando envio" },
      { value: "in_progress", label: "Em andamento" },
      { value: "overdue", label: "Vencidos" },
      { value: "pending_review", label: "Devolutivas" }
    ],
    selectedStatus,
    "planning-status-option",
    "is-status"
  );
}

function planningMonthSelect(selectedMonth = state.planningMonthFilter) {
  return planningFilterDropdown(
    "Filtrar mês",
    [
      { value: "", label: "Mês" },
      { value: "2026-09", label: "Setembro/2026" },
      { value: "2026-08", label: "Agosto/2026" },
      { value: "2026-07", label: "Julho/2026" }
    ],
    selectedMonth,
    "planning-month-option",
    "is-month"
  );
}

function planningFolderCards(rows = planningActionRows(), dataAttr = "planning-folder-area") {
  const summaries = planningAreaSummaries(rows);
  return `
    <div class="planning-folder-grid">
      ${summaries.map((item) => `
        <button class="planning-folder-card ${state.planningAreaId === item.area.id ? "is-active" : ""}" data-${dataAttr}="${item.area.id}" type="button">
          <div>${assetIcon(item.area.icon || "action", "blue", "planning-folder-icon")}</div>
          <strong>${escapeHtml(item.area.name)}</strong>
          <span>${item.total} planos gerados</span>
          <small>${item.awaiting} aguardando envio · ${item.active} em andamento · ${item.overdue} vencidos</small>
        </button>
      `).join("")}
    </div>
  `;
}

function planningOverview() {
  const activeRows = planningActiveRows();
  const feedbackRows = planningFeedbackRows();
  const cycleRows = [...activeRows, ...feedbackRows];
  const totals = planningTotals(cycleRows);
  const ranking = planningAreaRanking(cycleRows);
  return `
    <div class="fichario-sub-panel">
      <div class="planning-kpi-grid">
        ${planningKpi("Planos vigentes", totals.total, "auditoria atual", "neutral", "all")}
        ${planningKpi("Aguardando envio", totals.awaiting, "auditor optou por editar", "warning", "awaiting_send")}
        ${planningKpi("Em andamento", totals.active, "já enviados ao responsável", "blue", "in_progress")}
        ${planningKpi("Vencidos", totals.overdue, "passaram do prazo", "danger", "overdue")}
        ${planningKpi("Devolutivas", feedbackRows.length, "aguardando auditor", "purple", "pending_review")}
      </div>
      <div class="planning-overview-grid">
        ${planningStatusChart(totals)}
        <div class="planning-rank-card">
          <div class="planning-card-head"><h2>Áreas com maior atenção</h2><p>Ranking por vencimento, devolutivas e quantidade de planos.</p></div>
          <div class="planning-rank-list">
            ${ranking.map((item, index) => `
              <button class="planning-rank-row" data-planning-area="${item.area.id}" type="button">
                <b>${index + 1}</b>
                <div><strong>${escapeHtml(item.area.name)}</strong><span>${item.total} planos vigentes · ${item.overdue} vencidos · ${item.waiting || 0} devolutivas</span></div>
                <em>${item.total}</em>
              </button>
            `).join("")}
          </div>
        </div>
      </div>
    </div>
  `;
}

function planningPlansTable(rows = planningActionRows(), options = {}) {
  const compact = Boolean(options.compact);
  if (!rows.length) {
    return `<div class="planning-empty-state">Nenhum plano encontrado para este filtro.</div>`;
  }
  return `
    <div class="planning-table-wrap">
      <table class="planning-table">
        <thead><tr><th>Plano</th>${compact ? "" : "<th>Área</th><th>Responsável</th>"}<th>NCs</th><th>Status</th><th>Prazo</th><th></th></tr></thead>
        <tbody>
          ${rows.map((row) => {
            const [label, tone] = planningStatusMeta(row.status);
            const actionLabel = row.status === "awaiting_send" ? "Editar" : "Abrir";
            return `
              <tr>
                <td><strong>${escapeHtml(row.title)}</strong><span>${escapeHtml(row.block)} · ${escapeHtml(row.source)}</span></td>
                ${compact ? "" : `<td>${escapeHtml(row.area.name)}</td><td>${escapeHtml(row.owner)}</td>`}
                <td>${row.ncs}</td>
                <td><span class="planning-status is-${tone}">${escapeHtml(label)}</span></td>
                <td>${escapeHtml(row.due)}</td>
                <td><button class="fichario-sub-action" type="button">${actionLabel}</button></td>
              </tr>
            `;
          }).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function planningPlansContent() {
  const baseRows = planningFilterByMonth([...planningActiveRows(), ...planningFeedbackRows()]);
  const rows = state.planningStatusFilter === "pending_review"
    ? planningFilterByMonth(planningFeedbackRows())
    : state.planningStatusFilter
      ? planningFilterByMonth(planningActiveRows()).filter((row) => row.status === state.planningStatusFilter)
      : baseRows;
  const selectedArea = areaData.find((area) => area.id === state.planningAreaId);
  const visibleRows = selectedArea ? rows.filter((row) => row.area.id === selectedArea.id) : rows;
  const isFolderView = !state.planningStatusFilter && !selectedArea;
  return `
    <div class="fichario-sub-panel">
      <div class="fichario-sub-head"><div><h2>Planos de ação</h2><p>Pastas dos planos gerados no ciclo atual. Use os filtros para abrir um status ou uma área específica.</p></div>${state.planningStatusFilter || selectedArea ? `<button class="fichario-sub-action" data-clear-planning-filter type="button">Limpar filtro</button>` : ""}</div>
      <div class="planning-filter-line">
        <label><span>${icons.search}</span><input placeholder="Pesquisar plano, área ou responsável..." /></label>
        ${planningAreaSelect(state.planningAreaId)}
        ${planningStatusSelect()}
        ${planningMonthSelect()}
      </div>
      ${isFolderView ? planningFolderCards(baseRows) : `
        <div class="planning-area-detail">
          <div class="planning-area-detail-head">
            <div><span>${selectedArea ? "Área filtrada" : "Filtro aplicado"}</span><h3>${escapeHtml(selectedArea?.name || planningStatusFilterLabel(state.planningStatusFilter))}</h3><p>${visibleRows.length} planos listados · ${escapeHtml(planningStatusFilterLabel(state.planningStatusFilter).toLowerCase())}.</p></div>
          </div>
          ${planningPlansTable(visibleRows)}
        </div>
      `}
    </div>
  `;
}

function planningFeedbackContent() {
  const rows = planningFeedbackRows();
  return `
    <div class="fichario-sub-panel">
      <div class="fichario-sub-head"><div><h2>Devolutivas</h2><p>Fila do auditor para revisar evidências, justificar reprovação e reabrir o plano quando a regra permitir.</p></div><button class="fichario-sub-action is-primary" type="button">Ver todas</button></div>
      <div class="planning-feedback-list">
        ${rows.map((row) => {
          const [label, tone] = planningStatusMeta(row.status);
          return `
            <div class="planning-feedback-row">
              <div class="planning-feedback-icon">${assetIcon("action", "blue", "planning-icon")}</div>
              <div><strong>${escapeHtml(row.title)}</strong><span>${escapeHtml(row.area.name)} · ${escapeHtml(row.owner)} · ${row.attempts} tentativa(s)</span></div>
              <span class="planning-status is-${tone}">${escapeHtml(label)}</span>
              <button class="fichario-sub-action" type="button">Analisar</button>
            </div>
          `;
        }).join("")}
      </div>
    </div>
  `;
}

function planningHistoryContent() {
  const rows = planningFilterByMonth(planningHistoryRows());
  const selectedArea = areaData.find((area) => area.id === state.planningAreaId);
  const visibleRows = selectedArea ? rows.filter((row) => row.area.id === selectedArea.id) : [];
  return `
    <div class="fichario-sub-panel">
      <div class="fichario-sub-head planning-history-head">
        <div><h2>Histórico por área</h2><p>Selecione uma área para consultar planos aprovados, reprovados e vencidos.</p></div>
        <div class="planning-head-actions">${planningAreaSelect(state.planningAreaId, "planning-history-option")}${planningMonthSelect()}<button class="fichario-sub-action" type="button">Exportar</button></div>
      </div>
      <div class="planning-area-detail">
        <div class="planning-area-detail-head">
          <div><span>${selectedArea ? "Área selecionada" : "Nenhuma área selecionada"}</span><h3>${escapeHtml(selectedArea?.name || "Selecione a área")}</h3><p>${selectedArea ? `${visibleRows.length} registros históricos disponíveis para consulta.` : "Escolha uma área no filtro acima para carregar o histórico."}</p></div>
          <button class="fichario-sub-action" type="button" ${selectedArea ? "" : "disabled"}>Baixar histórico</button>
        </div>
        ${selectedArea ? planningPlansTable(visibleRows) : `<div class="planning-empty-state">Selecione uma área para visualizar os planos fechados.</div>`}
      </div>
    </div>
  `;
}

function planningRulesContent() {
  return `
    <div class="fichario-sub-panel">
      <div class="fichario-sub-head"><div><h2>Configurações do plano</h2><p>Regras operacionais do plano de ação ficam aqui, dentro do Planejamento.</p></div><button class="fichario-sub-action is-primary" type="button">Salvar regras</button></div>
      <div class="fichario-settings-lines">
        ${planningSettings.map(([label, value, detail]) => `<div class="fichario-setting-line"><div><strong>${escapeHtml(label)}</strong><span>${escapeHtml(detail)}</span></div><b>${escapeHtml(value)}</b><button class="fichario-sub-action" type="button">Editar</button></div>`).join("")}
      </div>
    </div>
  `;
}

function planningContent() {
  const panels = {
    overview: planningOverview,
    plans: planningPlansContent,
    feedback: planningFeedbackContent,
    history: planningHistoryContent,
    rules: planningRulesContent
  };
  return (panels[state.planningView] || planningOverview)();
}

function planningPage() {
  return `
    <section class="fichario-module planning-module">
      <div class="fichario-module-head"><span class="eyebrow">Planejamento</span><h1 class="panel-title">Planos de ação</h1><p class="panel-subtitle">Gestão dos planos vigentes, devolutivas, aprovações, reprovações e regras de prazo. A visão conversa com o painel inicial, relatórios e notas por área.</p></div>
      <div class="fichario-sub-tabs" role="tablist">${planningTabs.map(([id, label]) => `<button class="fichario-sub-tab ${state.planningView === id ? "is-active" : ""}" data-planning-view="${id}" type="button">${label}</button>`).join("")}</div>
      ${planningContent()}
    </section>
  `;
}

function viewContent() {
  const placeholders = {
    audits: ["Auditorias", "Aqui ficará o histórico das auditorias passadas, com filtros por mês, área, responsável e status."],
    docs: ["Documentos", "Aqui ficará o controle documental separado da área de resíduos: upload, validade, status, alerta e histórico."],
    reports: ["Relatórios", "Aqui ficarão os relatórios consolidados por área auditada, com nota final, evidências, planos e histórico."],
    web: ["Painel web", "Este módulo será pensado para gestão administrativa, envio de documentos e consulta completa sem depender do tablet."],
    hands: ["Higiene das mãos", "Aqui será desenhado o painel de controle de rotina e evidências de higienização conforme o fluxo que você vai detalhar depois."]
  };

  if (state.view === "home") return dashboardHome();
  if (state.view === "charts") return chartsPage();
  if (state.view === "audits") return startAuditPage();
  if (state.view === "area") return areaDetailPage();
  if (state.view === "start") return startAuditPage();
  if (state.view === "checklist") return checklistPage();
  if (state.view === "tables") return foodTablesPage();
  if (state.view === "reports") return reportsPage();
  if (state.view === "actions") return planningPage();
  if (state.view === "settings") return settingsPage();
  if (state.view === "users") return usersPage();
  const [title, text] = placeholders[state.view] || placeholders.audits;
  return placeholderPage(title, text);
}

function render(options = {}) {
  app.className = "app-shell fichario-shell";
  app.innerHTML = `
    <main class="main">
      ${topbar()}
      ${ficharioTabs()}
      <section class="content">
        ${viewContent()}
      </section>
    </main>
  `;
  if (!options.skipSave) saveState();
}

function enterChartPresentationMode() {
  const root = document.documentElement;
  root.requestFullscreen?.().catch(() => {});
  screen.orientation?.lock?.("landscape").catch(() => {});
}

function exitChartPresentationMode() {
  screen.orientation?.unlock?.();
  if (document.fullscreenElement) {
    document.exitFullscreen?.().catch(() => {});
  }
}

document.addEventListener("click", (event) => {
  const logout = event.target.closest("[data-access-logout]");
  if (logout) {
    accessRequest("logout", { method: "POST", body: "{}" }).catch(() => {}).finally(() => {
      sessionStorage.removeItem("idauditor-user");
      localStorage.removeItem("idauditor-offline-user");
      location.replace("/login.html");
    });
    return;
  }

  const newUser = event.target.closest("[data-open-new-user]");
  if (newUser) {
    accessNotice = null;
    state.settingsUserView = newUser.textContent.includes("cadastros") ? "active" : "new";
    render();
    return;
  }

  const resetUser = event.target.closest("[data-reset-user]");
  if (resetUser) {
    resetUser.disabled = true;
    accessRequest(`users/${resetUser.dataset.resetUser}/reset-password`, { method: "POST", body: "{}" })
      .then(async (data) => {
        accessNotice = { type: "success", text: `Novo código de primeiro acesso para ${data.user.full_name}:`, code: data.temporaryCode };
        await loadAccessUsers();
        render();
      })
      .catch((error) => { accessNotice = { type: "error", text: error.message }; render(); });
    return;
  }

  const userStatus = event.target.closest("[data-user-status]");
  if (userStatus) {
    userStatus.disabled = true;
    const active = userStatus.dataset.active === "true";
    accessRequest(`users/${userStatus.dataset.userStatus}/status`, { method: "PATCH", body: JSON.stringify({ active }) })
      .then(async (data) => {
        accessNotice = { type: "success", text: `${data.user.full_name} foi ${active ? "reativado" : "inativado"}.` };
        await loadAccessUsers();
        render();
      })
      .catch((error) => { accessNotice = { type: "error", text: error.message }; render(); });
    return;
  }

  const userTrigger = event.target.closest("[data-user-menu-trigger]");
  if (userTrigger) {
    const userMenu = userTrigger.closest("[data-user-menu]");
    const panel = userMenu?.querySelector("[data-user-menu-panel]");
    const isOpen = panel ? panel.classList.toggle("hidden") === false : false;
    userTrigger.setAttribute("aria-expanded", String(isOpen));
    return;
  }

  const nav = event.target.closest("[data-nav]");
  if (nav) {
    const nextView = nav.dataset.nav;
    if (nextView === "settings") {
      state.settingsMenuExpanded = state.view === "settings" ? !state.settingsMenuExpanded : true;
      state.view = "settings";
      syncHashWithView("settings");
      render();
      return;
    }
    setView(nextView);
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
    if (document.body.classList.contains("android-app")) state.chartExpanded = false;
    render();
    if (document.body.classList.contains("android-app")) {
      requestAnimationFrame(() => {
        document.querySelector(".graph-layout .compare-panel.area-mode")?.scrollIntoView({ block: "start", behavior: "smooth" });
      });
    }
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
    const nextExpanded = !state.chartExpanded;
    state.chartExpanded = nextExpanded;
    if (nextExpanded) {
      enterChartPresentationMode();
    } else {
      exitChartPresentationMode();
    }
    render();
    return;
  }

  if (event.target.closest("[data-toggle-chart-mode]")) {
    state.chartMode = state.chartMode === "actions" ? "scores" : "actions";
    render();
    return;
  }

  const reportFolder = event.target.closest("[data-report-folder-area]");
  if (reportFolder) {
    state.reportFolderArea = reportFolder.dataset.reportFolderArea;
    state.selectedArea = reportFolder.dataset.reportFolderArea;
    state.reportPdfSource = false;
    render();
    return;
  }

  if (event.target.matches("[data-close-report-folder]") || event.target.closest(".panel-close[data-close-report-folder]")) {
    state.reportFolderArea = null;
    state.reportPdfSource = false;
    render();
    return;
  }

  const reportAction = event.target.closest("[data-report-action]");
  if (reportAction) {
    const reportKindValue = reportAction.dataset.reportKind === "comparison" ? "comparison" : "monthly";
    const actionMode = reportAction.dataset.reportAction === "download" ? "download" : "open";
    const pdfWindow = actionMode === "open" ? window.open("", "_blank") : null;
    state.selectedArea = reportAction.dataset.reportArea;
    state.reportKind = reportKindValue;
    if (actionMode === "open") {
      openStoredReportView(pdfWindow);
    } else {
      state.reportPdfSource = true;
      render({ skipSave: true });
      openReportPdfAfterRender(null, { mode: actionMode });
    }
    return;
  }

  if (event.target.closest("[data-open-report-pdf]")) {
    openReportPdf(prepareReportPdfWindow());
    return;
  }

  const reportKind = event.target.closest("[data-report-kind]");
  if (reportKind) {
    state.reportKind = reportKind.dataset.reportKind === "comparison" ? "comparison" : "monthly";
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

  const settingsSection = event.target.closest("[data-settings-section]");
  if (settingsSection) {
    const nextSection = settingsSection.dataset.settingsSection;
    if (state.settingsSection !== nextSection) {
      state.settingsUserView = "active";
      state.settingsRulesView = "goals";
      state.settingsUsersExpanded = false;
    }
    state.settingsSection = nextSection;
    state.settingsMenuExpanded = true;
    state.view = "settings";
    syncHashWithView("settings");
    render();
    return;
  }

  const settingsUserView = event.target.closest("[data-settings-user-view]");
  if (settingsUserView) {
    state.settingsSection = "users";
    state.settingsUserView = settingsUserView.dataset.settingsUserView;
    state.settingsUsersExpanded = false;
    render();
    return;
  }

  if (event.target.closest("[data-toggle-users-list]")) {
    state.settingsUsersExpanded = !state.settingsUsersExpanded;
    render();
    return;
  }

  if (event.target.closest("[data-toggle-feedback]")) {
    state.feedbackExpanded = !state.feedbackExpanded;
    render();
    return;
  }

  const settingsRulesView = event.target.closest("[data-settings-rules-view]");
  if (settingsRulesView) {
    state.settingsSection = "rules";
    state.settingsRulesView = settingsRulesView.dataset.settingsRulesView;
    render();
    return;
  }

  const planningView = event.target.closest("[data-planning-view]");
  if (planningView) {
    state.planningView = planningView.dataset.planningView;
    state.planningStatusFilter = "";
    if (state.planningView !== "history") state.planningAreaId = "";
    state.view = "actions";
    syncHashWithView("actions");
    render();
    return;
  }

  const planningStatus = event.target.closest("[data-planning-status]");
  if (planningStatus) {
    const status = planningStatus.dataset.planningStatus;
    state.planningStatusFilter = status === "all" ? "" : status;
    state.planningAreaId = "";
    state.planningView = status === "pending_review" ? "feedback" : "plans";
    state.view = "actions";
    syncHashWithView("actions");
    render();
    return;
  }

  const planningAreaOption = event.target.closest("[data-planning-area-option]");
  if (planningAreaOption) {
    state.planningAreaId = planningAreaOption.dataset.planningAreaOption;
    state.planningView = "plans";
    state.view = "actions";
    syncHashWithView("actions");
    render();
    return;
  }

  const planningHistoryOption = event.target.closest("[data-planning-history-option]");
  if (planningHistoryOption) {
    state.planningAreaId = planningHistoryOption.dataset.planningHistoryOption;
    state.planningView = "history";
    state.view = "actions";
    syncHashWithView("actions");
    render();
    return;
  }

  const planningStatusOption = event.target.closest("[data-planning-status-option]");
  if (planningStatusOption) {
    state.planningStatusFilter = planningStatusOption.dataset.planningStatusOption;
    state.planningView = state.planningStatusFilter === "pending_review" ? "feedback" : "plans";
    state.view = "actions";
    syncHashWithView("actions");
    render();
    return;
  }

  const planningMonthOption = event.target.closest("[data-planning-month-option]");
  if (planningMonthOption) {
    state.planningMonthFilter = planningMonthOption.dataset.planningMonthOption;
    state.view = "actions";
    syncHashWithView("actions");
    render();
    return;
  }

  if (event.target.closest("[data-clear-planning-filter]")) {
    state.planningAreaId = "";
    state.planningStatusFilter = "";
    state.planningMonthFilter = "";
    state.view = "actions";
    syncHashWithView("actions");
    render();
    return;
  }

  const planningFolder = event.target.closest("[data-planning-folder-area]");
  if (planningFolder) {
    state.planningAreaId = planningFolder.dataset.planningFolderArea;
    state.planningStatusFilter = "";
    state.planningView = "plans";
    state.view = "actions";
    syncHashWithView("actions");
    render();
    return;
  }

  const planningArea = event.target.closest("[data-planning-area]");
  if (planningArea) {
    state.planningAreaId = planningArea.dataset.planningArea;
    state.planningStatusFilter = "";
    state.planningView = "plans";
    state.view = "actions";
    syncHashWithView("actions");
    render();
    return;
  }

  const planningHistoryArea = event.target.closest("[data-planning-history-area]");
  if (planningHistoryArea) {
    state.planningAreaId = planningHistoryArea.dataset.planningHistoryArea;
    state.planningView = "history";
    state.view = "actions";
    syncHashWithView("actions");
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
    if (document.body.classList.contains("android-app")) {
      requestAnimationFrame(() => {
        document.querySelector(".graph-layout .chart-panel-large")?.scrollIntoView({ block: "start", behavior: "smooth" });
      });
    }
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
    state.actionPlanNoticeQuestion = null;
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
    state.actionPlanNoticeQuestion = null;
    render();
    return;
  }

  const checklistPage = event.target.closest("[data-checklist-page]");
  if (checklistPage) {
    state.checklistPage = Number(checklistPage.dataset.checklistPage) || 0;
    state.actionPlanNoticeQuestion = null;
    render();
    return;
  }

  const questionPlanNotice = event.target.closest("[data-question-plan-notice]");
  if (questionPlanNotice) {
    const questionId = questionPlanNotice.dataset.questionPlanNotice;
    state.actionPlanNoticeQuestion = state.actionPlanNoticeQuestion === questionId ? null : questionId;
    render();
    return;
  }

  if (event.target.closest("[data-close-question-plan]")) {
    state.actionPlanNoticeQuestion = null;
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

document.addEventListener("change", (event) => {
  const reportArea = event.target.closest("[data-report-area-select]");
  if (reportArea) {
    state.selectedArea = reportArea.value;
    render();
  }

});

document.addEventListener("submit", (event) => {
  const form = event.target.closest("[data-access-user-form]");
  if (!form) return;
  event.preventDefault();
  const submit = form.querySelector('[type="submit"]');
  submit.disabled = true;
  const body = Object.fromEntries(new FormData(form));
  accessRequest("users", { method: "POST", body: JSON.stringify(body) })
    .then(async (data) => {
      accessNotice = { type: "success", text: `Usuário ${data.user.username} criado. Código de primeiro acesso:`, code: data.temporaryCode };
      await loadAccessUsers();
      form.reset();
      render();
    })
    .catch((error) => { accessNotice = { type: "error", text: error.message }; render(); });
});

const reportRequest = reportFileRequest();
if (reportRequest) {
  renderReportFileRequest(reportRequest);
} else {
  (async function bootstrapAuthenticatedApp() {
    if (location.protocol === "file:") {
      currentAccessUser = { full_name: "Administrador local", role: "admin" };
      render();
      return;
    }
    try {
      const data = await accessRequest("me");
      currentAccessUser = data.user;
      if (currentAccessUser.must_change_password) { location.replace("/login.html"); return; }
      localStorage.setItem("idauditor-offline-user", JSON.stringify(currentAccessUser));
      if (currentAccessUser.role === "admin") await loadAccessUsers();
    } catch (error) {
      const cached = JSON.parse(localStorage.getItem("idauditor-offline-user") || "null");
      if (error.status === 401 || !cached) { location.replace("/login.html"); return; }
      currentAccessUser = cached;
      accessNotice = { type: "success", text: "Modo offline: os dados coletados serão sincronizados quando a conexão voltar." };
    }
    if (state.view === "users" && currentAccessUser.role !== "admin") state.view = "home";
    render();
    hydrateStateFromBackend();
    registerServiceWorker();
  })();
}
