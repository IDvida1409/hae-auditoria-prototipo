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
  ,lock: `<svg viewBox="0 0 24 24"><rect x="5" y="10" width="14" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg>`
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

// Os nomes e ícones são estrutura; resultados só podem vir do banco ou de uma auditoria local ainda não sincronizada.
areaData.forEach((area) => Object.assign(area, {
  score: null,
  last: null,
  audits: 0,
  ncs: 0,
  critical: 0,
  pending: 0,
  status: "naoAvaliado"
}));

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
let accessNotifications = [];
let notificationsOpen = false;
let planningNoticeTimer = null;
let offlineNotice = navigator.onLine === false ? { phase: "offline", pending: 0 } : null;
let offlineNoticeTimer = null;
let lastSyncProblemNoticeAt = 0;
let operationalActionPlans = null;
let operationalDashboard = null;
let operationalReports = null;
let operationalAudits = null;
let operationalAuditDetails = new Map();
const pendingActionPlanEvidence = new Map();
const pendingAuditStarts = new Map();
const pendingAuditWrites = new Map();
const reportArchiveInFlight = new Set();
const REPORT_LAYOUT_VERSION = "approved-layout-v3";

const accessRoleLabels = {
  admin: "Administrador",
  quality: "Qualidade",
  auditor: "Auditor",
  area_responsible: "Responsável da área",
  restaurant_responsible: "Responsável do restaurante",
  viewer: "Visualizador"
};

const nativeApiOrigin = window.Capacitor?.isNativePlatform?.() ? "https://hae-auditoria-prototipo.onrender.com" : "";
const apiUrl = (path) => `${nativeApiOrigin}${path}`;
const apiCredentials = nativeApiOrigin ? "include" : "same-origin";

function updateStartupProgress(percent, label) {
  const startup = document.querySelector("[data-app-startup]");
  if (!startup) return;
  startup.querySelector("[data-app-startup-progress]")?.style.setProperty("width", `${percent}%`);
  const percentNode = startup.querySelector("[data-app-startup-percent]");
  const labelNode = startup.querySelector("[data-app-startup-label]");
  if (percentNode) percentNode.textContent = `${percent}%`;
  if (labelNode && label) labelNode.textContent = label;
  if (percent >= 100) setTimeout(() => startup.classList.add("is-complete"), 420);
}

const nativeStartupDelay = (milliseconds) => nativeApiOrigin
  ? new Promise((resolve) => setTimeout(resolve, milliseconds))
  : Promise.resolve();

function isAreaResponsible() {
  return currentAccessUser?.role === "area_responsible";
}

function allowedAreaIds() {
  if (!isAreaResponsible()) return areaData.map((area) => area.id);
  return Array.isArray(currentAccessUser?.area_slugs) ? currentAccessUser.area_slugs : [];
}

function canAccessArea(areaId) {
  return !isAreaResponsible() || allowedAreaIds().includes(areaId);
}

function primaryUserArea() {
  return areaData.find((area) => canAccessArea(area.id)) || areaData[0];
}

function orderedAreasForUser() {
  if (!isAreaResponsible()) return areaData;
  return [...areaData].sort((a, b) => Number(canAccessArea(b.id)) - Number(canAccessArea(a.id)));
}

function moduleAllowed(view) {
  if (!isAreaResponsible()) return view !== "users" || currentAccessUser?.role === "admin";
  return ["home", "charts", "actions", "reports", "area"].includes(view);
}

function applyCurrentUserScope() {
  if (!isAreaResponsible()) return;
  const primary = primaryUserArea();
  if (!canAccessArea(state.chartFocusArea)) state.chartFocusArea = primary.id;
  if (!moduleAllowed(state.view)) state.view = "home";
  if (state.planningView === "rules") state.planningView = "overview";
  if (state.planningAreaId && !canAccessArea(state.planningAreaId)) state.planningAreaId = primary.id;
}

function resetViewForFreshLogin() {
  state.view = "home";
  state.selectedArea = "";
  state.chartFocusArea = null;
  state.chartExpanded = false;
  state.detailBlock = null;
  state.detailEvidenceOpen = false;
  state.detailActionsOpen = false;
  state.checklistBlocksOpen = false;
  state.auditInstructionsOpen = false;
  state.planningView = "overview";
  state.planningAreaId = "";
  state.planningStatusFilter = "";
  state.planningPlanId = "";
  state.actionPlanPreview = false;
  state.reportFolderArea = null;
  state.settingsMenuExpanded = false;
  history.replaceState(null, "", `${location.pathname}${location.search}`);
}

function normalizeAccessUser(user) {
  return {
    ...user,
    name: user.full_name,
    profile: accessRoleLabels[user.role] || user.role,
    area: user.area_name || (["admin", "quality"].includes(user.role) ? "Todas as áreas" : "Área a definir"),
    status: user.active ? (user.reset_pending ? "Reset solicitado" : user.must_change_password ? "Primeiro acesso" : "Ativo") : "Inativo"
  };
}

function usernameSuggestions(fullName) {
  const parts = String(fullName || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .split(/\s+/)
    .map((part) => part.replace(/[^a-z0-9]/g, ""))
    .filter((part) => part.length >= 2 && !["de", "da", "do", "das", "dos", "e"].includes(part));
  if (parts.length < 2) return [];
  const base = `${parts[0]}.${parts.at(-1)}`.slice(0, 61);
  const used = new Set([...settingsUsers, ...settingsInactiveUsers].map((user) => String(user.username || "").toLowerCase()));
  const suggestions = [];
  for (let suffix = 0; suggestions.length < 3 && suffix < 100; suffix += 1) {
    const candidate = suffix ? `${base}${String(suffix).padStart(2, "0")}` : base;
    if (!used.has(candidate)) suggestions.push(candidate);
  }
  return suggestions;
}

function refreshUsernameSuggestions(form) {
  const container = form.querySelector("[data-username-suggestions]");
  if (!container) return;
  const suggestions = usernameSuggestions(form.elements.fullName.value);
  container.hidden = !suggestions.length;
  container.innerHTML = suggestions.length
    ? `<span>Sugestões de login</span><div>${suggestions.map((name) => `<button type="button" data-username-suggestion="${escapeHtml(name)}" aria-label="Usar login ${escapeHtml(name)}">${escapeHtml(name)}</button>`).join("")}</div>`
    : "";
}

async function accessRequest(path, options = {}) {
  const response = await fetch(apiUrl(`/api/access/${path}`), {
    credentials: apiCredentials,
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

async function operationalRequest(path, options = {}) {
  const response = await fetch(apiUrl(`/api/${path}`), {
    credentials: apiCredentials,
    cache: "no-store",
    ...options,
    headers: { "content-type": "application/json", ...options.headers }
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(data.error || "Não foi possível carregar os dados operacionais.");
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

async function loadAccessNotifications() {
  const data = await accessRequest("notifications").catch(() => ({ notifications: [] }));
  accessNotifications = [...(data.notifications || [])]
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
}

function planningNotificationView(item) {
  if (/feedback|devolutiva|deadline|prazo/i.test(`${item.notification_type} ${item.title}`)) return "feedback";
  if (/approved|rejected|aprovad|reprovad/i.test(`${item.notification_type} ${item.title}`)) return "history";
  return "plans";
}

function notificationDestination(item) {
  if (item.notification_type === "password_reset" || item.entity_type === "user") return "users";
  if (item.entity_type === "action_plan" || /action|feedback|devolutiva|plano/i.test(item.notification_type)) return "actions";
  if (item.entity_type === "report" || /report/i.test(item.notification_type)) return "reports";
  if (item.entity_type === "audit" || /audit/i.test(item.notification_type)) return "audits";
  return "home";
}

function relativeNotificationTime(value) {
  const elapsed = Math.max(0, Date.now() - new Date(value).getTime());
  const minutes = Math.floor(elapsed / 60000);
  if (minutes < 1) return "agora";
  if (minutes < 60) return `há ${minutes} min`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `há ${hours} h`;
  const days = Math.floor(hours / 24);
  return `há ${days} ${days === 1 ? "dia" : "dias"}`;
}

function notificationDirection(item) {
  const content = `${item.notification_type} ${item.title}`;
  if (/feedback|devolutiva recebida|deadline_requested|novo prazo solicitado|received/i.test(content)) return "received";
  return /sent|enviado|submitted|approved|rejected|aprovad|reprovad/i.test(content) ? "sent" : "received";
}

function notificationsPanel() {
  if (!notificationsOpen) return "";
  const unread = accessNotifications.filter((item) => !item.read_at).length;
  return `
    <section class="notifications-popover" aria-label="Notificações">
      <header><div><strong>Notificações</strong><span>${unread ? `${unread} ${unread === 1 ? "nova" : "novas"}` : "Tudo em dia"}</span></div>${unread ? '<button type="button" data-notifications-read-all>Marcar como lidas</button>' : ""}</header>
      <div class="notifications-list">
        ${accessNotifications.length ? accessNotifications.map((item) => {
          const direction = notificationDirection(item);
          return `<button class="notification-item ${item.read_at ? "is-read" : ""}" type="button" data-notification-id="${escapeHtml(item.id)}" data-notification-view="${notificationDestination(item)}" data-notification-planning-view="${planningNotificationView(item)}" data-notification-plan-id="${escapeHtml(item.entity_id || "")}">
            <span class="notification-direction is-${direction}" aria-hidden="true">${direction === "sent" ? "↑" : "↓"}</span>
            <span class="notification-copy"><strong>${escapeHtml(item.title)}</strong><span>${escapeHtml(item.body || "Abra para consultar os detalhes.")}</span><small>${relativeNotificationTime(item.created_at)}</small></span>
            ${item.read_at ? "" : '<i class="notification-unread" aria-label="Não lida"></i>'}
          </button>`;
        }).join("") : '<div class="notifications-empty">Nenhuma notificação por enquanto.</div>'}
      </div>
    </section>`;
}

const offlineNoticeContent = {
  offline: ["Sem conexão", "Os dados serão salvos neste aparelho e sincronizados automaticamente quando a internet voltar."],
  saved: ["Salvo neste aparelho", "A informação está protegida localmente e será sincronizada automaticamente."],
  syncing: ["Sincronizando dados", "Aguarde enquanto as informações salvas neste aparelho são enviadas."],
  synced: ["Dados sincronizados", "As informações deste aparelho foram atualizadas no sistema."],
  pending: ["Sincronização pendente", "Os dados continuam salvos neste aparelho. Uma nova tentativa será feita automaticamente."],
  error: ["Não foi possível sincronizar", "Os dados continuam salvos neste aparelho e uma nova tentativa será feita automaticamente."],
  unconfigured: ["Dados salvos neste aparelho", "A sincronização será iniciada automaticamente quando o aplicativo estiver conectado ao servidor."]
};

function offlineStatusNotice() {
  if (!offlineNotice || !offlineNoticeContent[offlineNotice.phase]) return "";
  const [title, description] = offlineNoticeContent[offlineNotice.phase];
  const pending = Number(offlineNotice.pending || 0);
  return `<aside class="offline-status is-${offlineNotice.phase}" role="status" aria-live="polite">
    <i class="offline-status-dot" aria-hidden="true"></i>
    <span><strong>${title}</strong><small>${description}${pending ? ` ${pending} ${pending === 1 ? "item pendente" : "itens pendentes"}.` : ""}</small></span>
  </aside>`;
}

function paintOfflineStatus() {
  const root = document.querySelector("[data-offline-status]");
  if (root) root.innerHTML = offlineStatusNotice();
}

function setOfflineNotice(detail) {
  const phase = detail?.phase;
  if (["pending", "error"].includes(phase)) {
    const now = Date.now();
    if (now - lastSyncProblemNoticeAt < 60000) return;
    lastSyncProblemNoticeAt = now;
  }
  clearTimeout(offlineNoticeTimer);
  if (["syncing", "synced"].includes(phase) && !detail.recovered) {
    offlineNotice = null;
    paintOfflineStatus();
    return;
  }
  if (phase === "idle") {
    offlineNotice = navigator.onLine === false ? { phase: "offline", pending: detail.pending || 0 } : null;
  } else if (phase === "saved" && navigator.onLine !== false) {
    return;
  } else {
    offlineNotice = { ...detail, phase };
  }
  paintOfflineStatus();
  if (["saved", "synced", "pending", "error"].includes(phase)) {
    offlineNoticeTimer = setTimeout(() => {
      offlineNotice = navigator.onLine === false ? { phase: "offline", pending: detail.pending || 0 } : null;
      paintOfflineStatus();
    }, ["pending", "error"].includes(phase) ? 6500 : 4500);
  }
}

window.addEventListener("offline:sync-status", (event) => setOfflineNotice(event.detail || {}));
window.addEventListener("offline:sync-complete", async (event) => {
  const finalized = (event.detail?.results || []).find((result) => result?.entityType === "audit" && result?.audit?.status === "finished");
  if (!finalized) return;
  const area = uiAreaFromBackendId(finalized.audit.area_id);
  if (area) {
    state.offlineAudits = {
      ...state.offlineAudits,
      [area.id]: { ...state.offlineAudits?.[area.id], status: "finished", serverId: finalized.audit.id, finishedAt: finalized.audit.finished_at }
    };
    saveState();
  }
  await Promise.all([loadOperationalData(), loadAccessNotifications()]).catch(() => {});
  render();
  setTimeout(() => loadOperationalData().then(() => render()).catch(() => {}), 6000);
});
window.addEventListener("offline", () => setOfflineNotice({ phase: "offline", pending: offlineNotice?.pending || 0 }));
window.addEventListener("online", () => {
  if (offlineNotice?.phase === "offline") {
    offlineNotice = null;
    paintOfflineStatus();
  }
});

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

const monthIds = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];
const today = new Date();
const currentMonthId = `${monthIds[today.getMonth()]}/${String(today.getFullYear()).slice(-2)}`;
const futureMonthIds = new Set(months.map(([id]) => id).filter((id) => months.findIndex(([month]) => month === id) > months.findIndex(([month]) => month === currentMonthId)));
const stateStorageKey = "hae-auditoria-state-v4";

const monthLines = Object.fromEntries(months.map(([id]) => [id, null]));

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
    planningDataVersion: 4,
    view: "home",
    sidebarCollapsed: false,
    selectedArea: "",
    chartFocusArea: null,
    chartExpanded: false,
    chartMode: "scores",
    selectedMonth: currentMonthId,
    reportKind: "monthly",
    answers: {},
    auditNotes: {},
    auditEvidence: {},
    offlineAudits: {},
    detailBlock: null,
    detailEvidenceOpen: false,
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
    planningPlanId: "",
    planningPlanOverrides: {},
    planningNotice: "",
    planningDecisionModal: false,
    actionPlanImagePreview: "",
    actionPlanPreview: false,
    actionDeadlineModal: false,
    actionPlanAcknowledgements: {},
    actionPlanResponses: {},
    actionPlanConsentId: "",
    feedbackExpanded: false,
    settingsMenuExpanded: false,
    reportFolderArea: null,
    reportPdfSource: false,
    leaveAuditConfirm: false,
    auditFinalizeModal: false
  };
}

function persistableState(source = state) {
  return {
    planningDataVersion: source.planningDataVersion,
    view: source.view,
    sidebarCollapsed: source.sidebarCollapsed,
    selectedArea: source.selectedArea,
    chartFocusArea: source.chartFocusArea,
    chartMode: source.chartMode,
    selectedMonth: source.selectedMonth,
    reportKind: source.reportKind,
    answers: source.answers,
    auditNotes: source.auditNotes,
    auditEvidence: source.auditEvidence,
    offlineAudits: source.offlineAudits,
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
    planningPlanOverrides: source.planningPlanOverrides,
    actionPlanAcknowledgements: source.actionPlanAcknowledgements,
    actionPlanResponses: source.actionPlanResponses,
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
  const planningDataIsCurrent = saved.planningDataVersion === base.planningDataVersion;
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
    auditNotes: merged.auditNotes && typeof merged.auditNotes === "object" ? merged.auditNotes : {},
    auditEvidence: merged.auditEvidence && typeof merged.auditEvidence === "object" ? merged.auditEvidence : {},
    offlineAudits: merged.offlineAudits && typeof merged.offlineAudits === "object" ? merged.offlineAudits : {},
    detailBlock: null,
    detailEvidenceOpen: false,
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
    planningPlanId: "",
    planningDataVersion: base.planningDataVersion,
    planningPlanOverrides: planningDataIsCurrent && merged.planningPlanOverrides && typeof merged.planningPlanOverrides === "object" ? merged.planningPlanOverrides : {},
    actionPlanAcknowledgements: merged.actionPlanAcknowledgements && typeof merged.actionPlanAcknowledgements === "object" ? merged.actionPlanAcknowledgements : {},
    actionPlanResponses: merged.actionPlanResponses && typeof merged.actionPlanResponses === "object" ? merged.actionPlanResponses : {},
    actionPlanConsentId: "",
    planningNotice: "",
    planningDecisionModal: false,
    actionPlanPreview: false,
    actionDeadlineModal: false,
    feedbackExpanded: false,
    settingsMenuExpanded: Boolean(merged.settingsMenuExpanded),
    leaveAuditConfirm: false,
    auditFinalizeModal: false
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
let offlineBootstrap = null;
let backendQuestionIds = new Map();

const app = document.getElementById("app");

function saveState() {
  const snapshot = persistableState();
  try {
    localStorage.setItem(stateStorageKey, JSON.stringify(snapshot));
  } catch {
    // O IndexedDB mantém a fila operacional mesmo se o navegador recusar preferências locais.
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
  document.body.classList.add("report-document-body");
  app.className = "app-shell is-report-document";
  app.innerHTML = `<main class="stored-report-view">${emptyDataState("Relatório de demonstração indisponível. Consulte os documentos gerados na aba Relatórios do painel.")}</main>`;
}

function formatScore(value) {
  return value != null && Number.isFinite(Number(value)) ? Number(value).toFixed(1).replace(".", ",") : "—";
}

function hasAreaResult(area) {
  return Boolean(area && area.audits > 0 && area.score != null && Number.isFinite(Number(area.score)));
}

function areasWithResults() {
  return areaData.filter(hasAreaResult);
}

function hasAnyAuditResult() {
  return areasWithResults().length > 0;
}

function emptyDataState(message) {
  return `<div class="data-empty-state">${escapeHtml(message)}</div>`;
}

function buildBackendQuestionMap(payload) {
  const mapping = new Map();
  for (const backendArea of payload?.areas || []) {
    const uiArea = checklistData[backendArea.slug];
    const backendChecklist = backendArea.checklist || (payload.checklists || []).find((checklist) => String(checklist.area_id) === String(backendArea.id));
    const backendBlocks = backendChecklist?.blocks || [];
    (uiArea?.blocks || []).forEach((uiBlock, blockIndex) => {
      const backendBlock = backendBlocks[blockIndex];
      if (!backendBlock) return;
      const questionsByNumber = new Map((backendBlock.questions || []).map((question) => [Number(question.question_number), question.id]));
      for (const question of uiBlock.questions || []) {
        const backendId = questionsByNumber.get(Number(question.number));
        if (backendId) mapping.set(`${backendArea.slug}:${question.id}`, backendId);
      }
    });
  }
  backendQuestionIds = mapping;
}

async function loadOfflineBootstrap() {
  if (!window.HAE_OFFLINE) return null;
  let payload = null;
  if (location.protocol !== "file:" && navigator.onLine !== false) {
    try {
      const response = await fetch(apiUrl("/api/offline-bootstrap"), { cache: "no-store", credentials: apiCredentials });
      if (response.ok) {
        payload = await response.json();
        await window.HAE_OFFLINE.cacheBootstrap(payload);
      }
    } catch {
      // A cópia local abaixo mantém o checklist utilizável sem rede.
    }
  }
  payload ||= await window.HAE_OFFLINE.getCachedBootstrap();
  if (payload) {
    offlineBootstrap = payload;
    buildBackendQuestionMap(payload);
  }
  return payload;
}

function uiAreaFromBackendId(areaId) {
  const backendArea = (offlineBootstrap?.areas || []).find((area) => String(area.id) === String(areaId));
  return backendArea ? areaData.find((area) => area.id === backendArea.slug) : null;
}

function planningStatusFromBackend(status) {
  return {
    draft: "awaiting_send",
    generated: "awaiting_send",
    under_auditor_review: "awaiting_send",
    reviewed: "awaiting_send",
    ready_to_send: "awaiting_send",
    available_to_responsible: "in_progress",
    sent_to_responsible: "in_progress",
    acknowledged: "in_progress",
    submitted: "pending_review",
    pending_review: "pending_review",
    approved: "approved",
    rejected: "rejected",
    reopened: "reopened",
    overdue: "overdue",
    cancelled: "rejected"
  }[status] || "in_progress";
}

function shortDate(value) {
  if (!value) return "Sem prazo";
  return new Intl.DateTimeFormat("pt-BR", { timeZone: "America/Sao_Paulo" }).format(new Date(value));
}

async function loadOperationalData() {
  if (location.protocol === "file:") return;
  const [dashboard, plans, reports, audits] = await Promise.all([
    operationalRequest("dashboard"),
    operationalRequest("action-plans"),
    operationalRequest("reports"),
    operationalRequest("audits")
  ]);
  operationalDashboard = dashboard;
  operationalReports = reports.reports || [];
  operationalAudits = audits.audits || [];
  for (const area of areaData) {
    const localAudit = state.offlineAudits?.[area.id];
    const backendArea = (offlineBootstrap?.areas || []).find((item) => item.slug === area.id);
    const remoteExists = operationalAudits.some((audit) => String(audit.area_id) === String(backendArea?.id || ""));
    if (localAudit?.status === "finished" && !remoteExists) {
      delete state.offlineAudits[area.id];
      delete state.answers[area.id];
      delete state.auditNotes[area.id];
      delete state.auditEvidence[area.id];
      delete state.auditProgress[area.id];
    }
  }
  const latestFinished = new Map();
  for (const audit of operationalAudits) {
    if (audit.status === "finished" && !latestFinished.has(audit.area_id)) latestFinished.set(audit.area_id, audit);
  }
  const detailEntries = await Promise.all([...latestFinished.values()].map(async (audit) => {
    try { return [String(audit.area_id), await operationalRequest(`audits/${audit.id}`)]; }
    catch { return [String(audit.area_id), null]; }
  }));
  operationalAuditDetails = new Map(detailEntries.filter(([, detail]) => detail));
  const scores = new Map((dashboard.scores || []).map((row) => [String(row.area_id), {
    score: Number(row.score),
    audits: Number(row.audits || 0)
  }]));
  const backendAreas = offlineBootstrap?.areas || [];
  for (const area of areaData) {
    const backend = backendAreas.find((item) => item.slug === area.id);
    const result = backend ? scores.get(String(backend.id)) : undefined;
    area.backendId = backend?.id || null;
    area.score = result?.score ?? null;
    area.last = null;
    area.audits = result?.audits || 0;
    area.ncs = 0;
    area.critical = 0;
    area.pending = 0;
    area.status = result == null ? "naoAvaliado" : scoreStatus(result.score);
  }
  monthLines[currentMonthId] = areaData.some((area) => area.score != null)
    ? areaData.map((area) => area.score)
    : null;
  const groupedPlans = new Map();
  for (const plan of plans.actionPlans || []) {
    const area = uiAreaFromBackendId(plan.area_id) || areaData.find((item) => item.id === plan.area_slug);
    if (area) {
      area.pending += ["approved", "cancelled"].includes(plan.status) ? 0 : 1;
      area.ncs += 1;
      if (["high", "critical"].includes(plan.locked_risk_snapshot)) area.critical += 1;
    }
    if (!area) continue;
    const groupId = plan.action_plan_document_id || plan.id;
    const item = {
      actionPlanId: plan.id,
      documentItemId: plan.document_item_id,
      feedbackId: plan.feedback_id || plan.last_feedback_id,
      status: planningStatusFromBackend(plan.status),
      question: plan.locked_question_snapshot || plan.problem_description || plan.title,
      observation: plan.locked_audit_notes_snapshot || "",
      correction: plan.corrective_action || plan.automatic_correction_text || "Corrigir a não conformidade e anexar a evidência.",
      riskLevel: plan.locked_risk_snapshot || "low",
      evidenceFileIds: plan.locked_original_evidence_file_ids || [],
      responseText: plan.feedback_correction_summary || plan.feedback_observation || "",
      responseEvidenceFileId: plan.feedback_evidence_file_id || null,
      feedbackStatus: plan.feedback_status || null,
      reviewNote: plan.feedback_review_note || "",
      dueAt: plan.due_at,
      deadlineRequested: plan.deadline_status === "requested",
      requestedDue: plan.requested_due_at,
      deadlineReason: plan.deadline_request_reason || ""
    };
    if (item.deadlineRequested && !item.responseText && !item.responseEvidenceFileId) item.status = "in_progress";
    const existing = groupedPlans.get(groupId);
    if (existing) {
      existing.backendItems.push(item);
      existing.ncs = existing.backendItems.length;
      if (item.status === "pending_review") existing.status = "pending_review";
      existing.deadlineRequested ||= item.deadlineRequested;
      if (item.deadlineRequested) {
        existing.requestedDue = shortDate(item.requestedDue);
        existing.deadlineReason = item.deadlineReason;
        existing.deadlineItemIndex = existing.backendItems.length - 1;
      }
      continue;
    }
    groupedPlans.set(groupId, {
      id: groupId,
      documentId: plan.action_plan_document_id,
      area,
      title: plan.public_code || `Plano de ação - ${area.name}`,
      block: plan.problem_description || "Não conformidade da auditoria",
      owner: plan.assigned_to_name || area?.name || "Responsável da área",
      auditorName: plan.created_by_name || "Auditor não identificado",
      publicCode: plan.public_code || "",
      generatedAt: plan.document_generated_at || plan.created_at,
      generationMode: plan.generation_mode,
      status: planningStatusFromBackend(plan.status),
      due: shortDate(plan.due_at),
      ncs: 1,
      backendItems: [item],
      attempts: Number(plan.resubmission_attempt || 0),
      source: plan.creation_source === "audit_nc" ? "Auditoria" : "Plano de ação",
      deadlineRequested: item.deadlineRequested,
      requestedDue: shortDate(plan.requested_due_at),
      deadlineReason: plan.deadline_request_reason || "",
      deadlineItemIndex: item.deadlineRequested ? 0 : null,
      itemDecisions: {}
    });
  }
  operationalActionPlans = [...groupedPlans.values()];
  for (const plan of operationalActionPlans) {
    const itemStatuses = plan.backendItems.map((item) => item.status);
    if (itemStatuses.includes("pending_review")) plan.status = "pending_review";
    else if (itemStatuses.some((status) => ["rejected", "reopened"].includes(status))) plan.status = "reopened";
    else if (itemStatuses.length && itemStatuses.every((status) => status === "approved")) plan.status = "approved";
    else if (itemStatuses.includes("in_progress")) plan.status = "in_progress";
    const existing = state.actionPlanResponses?.[plan.id] || {};
    const hydrated = { ...existing };
    plan.backendItems.forEach((item, index) => {
      if (item.feedbackStatus === "approved") plan.itemDecisions[index] = { status: "approved", reason: item.reviewNote };
      if (["rejected", "reopened"].includes(item.feedbackStatus)) plan.itemDecisions[index] = { status: "rejected", reason: item.reviewNote };
      if (!item.responseText && !item.responseEvidenceFileId) return;
      hydrated[index] = {
        text: item.responseText || hydrated[index]?.text || "",
        evidenceFileId: item.responseEvidenceFileId || hydrated[index]?.evidenceFileId || null,
        evidenceName: item.responseEvidenceFileId ? "Evidência enviada" : hydrated[index]?.evidenceName
      };
    });
    state.actionPlanResponses = { ...state.actionPlanResponses, [plan.id]: hydrated };
  }
  setTimeout(() => archiveMissingApprovedReports(), 0);
}

function planFromNotificationEntity(entityId) {
  return planningActionRows().find((row) => row.id === entityId || row.documentId === entityId);
}

function localAuditFor(areaId) {
  const audit = state.offlineAudits?.[areaId];
  return audit?.status === "in_progress" && auditIsCurrentMonth(audit.startedAt) ? audit : null;
}

function auditIsCurrentMonth(value) {
  if (!value) return false;
  const date = new Date(value);
  const now = new Date();
  return date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth();
}

async function ensureLocalAudit(areaId) {
  const existing = localAuditFor(areaId);
  if (existing) return existing;
  if (pendingAuditStarts.has(areaId)) return pendingAuditStarts.get(areaId);
  const startPromise = createLocalAudit(areaId);
  pendingAuditStarts.set(areaId, startPromise);
  try {
    return await startPromise;
  } finally {
    pendingAuditStarts.delete(areaId);
  }
}

async function createLocalAudit(areaId) {
  if (!window.HAE_OFFLINE) throw new Error("Armazenamento offline indisponível neste navegador.");
  if (!offlineBootstrap) await loadOfflineBootstrap();
  const backendArea = (offlineBootstrap?.areas || []).find((area) => area.slug === areaId);
  const backendChecklist = backendArea?.checklist || (offlineBootstrap?.checklists || []).find((checklist) => String(checklist.area_id) === String(backendArea?.id));
  if (!backendChecklist) throw new Error("Checklist ainda não foi preparado neste aparelho. Conecte-se uma vez e tente novamente.");
  if (state.offlineAudits?.[areaId] && !auditIsCurrentMonth(state.offlineAudits[areaId].startedAt)) {
    delete state.answers[areaId];
    delete state.auditNotes[areaId];
    delete state.auditEvidence[areaId];
  }
  const localAuditId = window.crypto?.randomUUID?.() || `audit-${Date.now()}-${Math.random().toString(16).slice(2)}`;
  const audit = { localAuditId, areaId, checklistId: backendChecklist.id, status: "in_progress", startedAt: new Date().toISOString() };
  await window.HAE_OFFLINE.queueAuditStart({
    localAuditId,
    areaSlug: areaId,
    checklistId: backendChecklist.id,
    startedAt: audit.startedAt,
    source: document.body.classList.contains("android-app") ? "tablet_android" : "web",
    offlineCreated: navigator.onLine === false
  });
  state.offlineAudits = { ...state.offlineAudits, [areaId]: audit };
  saveState();
  return audit;
}

async function queueChecklistAnswer(areaId, questionId, answer, notes = "") {
  const previous = pendingAuditWrites.get(areaId) || Promise.resolve();
  const write = previous.catch(() => {}).then(async () => {
    const audit = await ensureLocalAudit(areaId);
    const backendQuestionId = backendQuestionIds.get(`${areaId}:${questionId}`);
    if (!backendQuestionId) throw new Error("Pergunta não vinculada ao checklist do banco de dados.");
    return window.HAE_OFFLINE.queueAuditAnswer({
      localAuditId: audit.localAuditId,
      questionId: backendQuestionId,
      answer,
      notes: notes.trim() || null,
      answeredAt: new Date().toISOString()
    });
  });
  pendingAuditWrites.set(areaId, write);
  try {
    return await write;
  } finally {
    if (pendingAuditWrites.get(areaId) === write) pendingAuditWrites.delete(areaId);
  }
}

async function waitForAuditWrites(areaId) {
  const start = pendingAuditStarts.get(areaId);
  if (start) await start;
  const write = pendingAuditWrites.get(areaId);
  if (write) await write;
}

function formatCurrentDate(date = new Date()) {
  const formatted = new Intl.DateTimeFormat("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(date);
  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
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
  if (!hasAreaResult(area)) return null;
  const riskTotal = (block.questions || []).reduce((sum, question) => sum + (question.risk || 0), 0);
  const riskPenalty = Math.min(1.1, riskTotal / Math.max(160, (block.questions || []).length * 42));
  const rhythm = ((index % 5) - 2) * 0.16;
  return clamp(area.score + rhythm - riskPenalty + 0.28, 4.8, 9.7);
}

function blockSummaries(area) {
  return blocksForArea(area).map((block, index) => {
    const questions = block.questions || [];
    const sourceCounts = countsFromRows(questionRowsForArea(area).filter((row) => row.blockId === block.id));
    const evaluated = sourceCounts.C + sourceCounts.NC;
    const score = evaluated ? (sourceCounts.C / evaluated) * 10 : null;
    return {
      id: block.id,
      label: block.title,
      title: block.title,
      score,
      status: score == null ? "naoAvaliado" : scoreStatus(score),
      questions,
      sourceCounts
    };
  });
}

function questionRowsForArea(area) {
  const detail = operationalAuditDetails.get(String(area.backendId));
  const reverseIds = new Map([...backendQuestionIds.entries()]
    .filter(([key]) => key.startsWith(`${area.id}:`))
    .map(([key, backendId]) => [String(backendId), key.slice(area.id.length + 1)]));
  const realAnswers = new Map((detail?.answers || []).map((answer) => [reverseIds.get(String(answer.question_id)), answer]));
  const filesByAnswer = new Map();
  for (const file of detail?.files || []) {
    if (file.entity_type === "audit_answer" && !filesByAnswer.has(String(file.entity_id))) filesByAnswer.set(String(file.entity_id), file.id);
  }
  const rows = blocksForArea(area).flatMap((block) =>
    (block.questions || []).map((question) => ({
      ...question,
      blockId: block.id,
      blockTitle: block.title
    }))
  );
  return rows.map((question) => ({
    ...question,
    answer: realAnswers.get(question.id)?.answer || "X",
    notes: realAnswers.get(question.id)?.notes || "",
    evidenceFileId: filesByAnswer.get(String(realAnswers.get(question.id)?.id)) || null
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
  if (operationalActionPlans === null) return [];
  return operationalActionPlans.filter((plan) => plan.area?.id === area.id);
}

function reportResponsibleName(area) {
  const audit = (operationalAudits || []).find((item) => String(item.area_id) === String(area.backendId) && item.status === "finished");
  if (audit?.responsible_name) return audit.responsible_name;
  if (isAreaResponsible() && canAccessArea(area.id)) return currentAccessUser?.full_name || "Responsável da área";
  return settingsUsers.find((user) => user.role === "area_responsible" && user.area_name === area.name)?.full_name || "Responsável não atribuído";
}

function reportAuditorName(area = reportSelectedArea()) {
  const audit = (operationalAudits || []).find((item) => String(item.area_id) === String(area?.backendId) && item.status === "finished");
  if (audit?.auditor_name) return audit.auditor_name;
  return currentAccessUser?.full_name || "Auditor não identificado";
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
  return areasWithResults().sort((a, b) => b.score - a.score).slice(0, 3);
}

function sortedAttention() {
  return areasWithResults().sort((a, b) => a.score - b.score).slice(0, 3);
}

function generalScore() {
  const rows = areasWithResults();
  return rows.length ? rows.reduce((sum, area) => sum + area.score, 0) / rows.length : null;
}

function monthAverage(monthId) {
  const values = (monthLines[monthId] || []).filter(Number.isFinite);
  if (!values.length) return null;
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
  if (!moduleAllowed(view)) return;
  state.view = view;
  if (view !== "settings") state.settingsMenuExpanded = false;
  syncHashWithView(view);
  render();
}

function setSelectedArea(id) {
  if (!canAccessArea(id)) return;
  state.selectedArea = id;
  render();
}

function goAreaDetail(id = state.selectedArea) {
  if (!canAccessArea(id)) return;
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
    home: ["Dashboard de auditoria", reportMonthLabel(currentMonthId), "dashboard"],
    start: ["Iniciar auditoria", "Selecione a área que deseja auditar", "audit"],
    audits: ["Auditorias", "Histórico mensal das auditorias", "list"],
    charts: ["Gráficos", reportMonthLabel(currentMonthId), "chart"],
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
  const unreadNotifications = accessNotifications.filter((item) => !item.read_at).length;
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
      <div class="notifications-anchor">
      <button class="message-btn" type="button" data-notifications-toggle aria-label="Notificações" aria-expanded="${notificationsOpen}">
        <img src="assets/fichario-icons/message.png?v=fichario-shell-1" alt="" />
        ${unreadNotifications ? `<span class="message-count">${Math.min(unreadNotifications, 99)}</span>` : ""}
      </button>
      ${notificationsPanel()}
      </div>
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
  ].filter(([id]) => id !== "users" || currentAccessUser?.role === "admin" || isAreaResponsible());
  return `
    <nav class="fichario-tabs" aria-label="Navegação principal">
      ${tabs.map(([id, label, icon]) => {
        const locked = !moduleAllowed(id);
        return `
        <button class="fichario-tab ${state.view === id ? "is-active" : ""} ${locked ? "is-locked" : ""}" data-nav="${id}" ${locked ? "data-locked-module" : ""} type="button" title="${locked ? "Acesso exclusivo do administrador" : label}">
          <img src="assets/fichario-icons/${icon}.png?v=fichario-shell-1" alt="" aria-hidden="true" />
          <span>${label}</span>
          ${locked ? `<span class="fichario-tab-lock">${icons.lock}</span>` : ""}
        </button>
      `;}).join("")}
    </nav>
  `;
}

function areaTile(area, compact = false) {
  const locked = !canAccessArea(area.id);
  const status = statusMap[area.status];
  const hasResult = hasAreaResult(area);
  return `
    <button class="area-tile ${area.id === state.selectedArea ? "is-selected" : ""} ${locked ? "is-locked" : ""}" ${locked ? "data-locked-area" : `data-area="${area.id}"`} style="--status-color:${locked ? "#9ca8b7" : status.color}" aria-label="${locked ? `${area.name}, área sem permissão` : hasResult ? `${area.name}, nota ${formatScore(area.score)}` : `${area.name}, sem auditoria concluída`}">
      <span class="tile-check">${locked ? icons.lock : hasResult ? "✓" : ""}</span>
      <span class="area-icon-wrap"><img class="area-icon" src="assets/icons/${area.icon}" alt="" /></span>
      <span class="area-name">${area.name}</span>
      <span class="area-score">${locked ? "" : hasResult ? formatScore(area.score) : "—"}</span>
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
        <b>${hasAreaResult(area) ? formatScore(area.score) : "—"}</b>
      </div>
      <div class="quick-metric metric-risk-distribution">
        <small>NCs por nível de risco</small>
        <div class="risk-count-strip">${riskItems}</div>
      </div>
      <div class="quick-metric metric-highest-risk" style="--metric-color:${highestMeta.color}">
        <small>Maior risco encontrado</small>
        <b>${area.ncs ? highestMeta.label : "Nenhum"}</b>
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
  const attentionText = !hasAreaResult(area)
    ? "Esta área ainda não possui auditoria concluída."
    : highRiskCount
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
            <div class="selected-score">${formatScore(area.score)}${hasAreaResult(area) ? "<small>/10</small>" : ""}</div>
            <span class="status-pill color-only" title="${status.legend || status.label}" aria-label="${status.legend || status.label}"></span>
          </div>
        </div>
      </div>
      ${quickMetrics(area)}
      <div class="attention-note">${svgIcon("idea")} <span>${attentionText}</span></div>
      <div>
        <div class="side-title">Principais NCs por risco</div>
        <div class="ncs-list">
          ${ncRows.length ? ncRows
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
            .join("") : emptyDataState("Nenhuma não conformidade registrada.")}
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
  if (!hasAreaResult(area)) return emptyDataState("A evolução será exibida após a primeira auditoria concluída.");
  const areaIndex = areaData.findIndex((item) => item.id === area.id);
  const chartMonths = availableMonthIds();
  const labels = chartMonths.map((monthId) => reportShortMonthLabel(monthId).split("/")[0]);
  const points = chartMonths.map((monthId) => monthLines[monthId]?.[areaIndex]).filter(Number.isFinite);
  if (!points.length) return emptyDataState("A evolução será exibida após a primeira auditoria concluída.");
  const color = Number.isFinite(area.last) && area.score < area.last ? "#ee2f36" : "#31aa42";
  const w = 540;
  const h = 166;
  const pad = { left: 22, right: 22, top: 24, bottom: 30 };
  const minValue = Math.min(...points, 8) - 0.25;
  const maxValue = Math.max(...points, 8) + 0.25;
  const range = Math.max(1, maxValue - minValue);
  const xStep = (w - pad.left - pad.right) / Math.max(1, points.length - 1);
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
  if ((area && !hasAreaResult(area)) || (!area && !hasAnyAuditResult())) {
    return `<div class="dash-evolution">${emptyDataState("A evolução será exibida após a primeira auditoria concluída.")}</div>`;
  }
  if (!area) {
    return `<div class="dash-evolution">${generalAssessmentMiniChart()}</div>`;
  }
  const chartMonths = availableMonthIds().slice(-6);
  const monthsLabel = chartMonths.map((monthId) => reportShortMonthLabel(monthId).split("/")[0]);
  const areaIndex = areaData.findIndex((item) => item.id === area.id);
  const points = chartMonths.map((monthId) => monthLines[monthId]?.[areaIndex]).filter(Number.isFinite);
  if (!points.length) return `<div class="dash-evolution">${emptyDataState("A evolução será exibida após a primeira auditoria concluída.")}</div>`;
  const latest = points[points.length - 1];
  const previous = points[points.length - 2] ?? latest;
  const color = latest < previous ? "#ee2f36" : "#2f8f46";
  const w = 360;
  const h = 112;
  const pad = { left: 26, right: 26, top: 24, bottom: 24 };
  const minValue = Math.min(...points, 8) - 0.25;
  const maxValue = Math.max(...points, 8) + 0.25;
  const range = Math.max(1, maxValue - minValue);
  const xStep = (w - pad.left - pad.right) / Math.max(1, points.length - 1);
  const singlePoint = points.length === 1;
  const xFor = (index) => singlePoint ? w / 2 : pad.left + index * xStep;
  const yFor = (value) => pad.top + (maxValue - value) * ((h - pad.top - pad.bottom) / range);
  const d = points
    .map((value, index) => `${index === 0 ? "M" : "L"}${xFor(index)},${yFor(value)}`)
    .join(" ");
  const labelPill = (value, index) => {
    const x = xFor(index);
    const y = yFor(value) - 15;
    return `
      <text x="${x}" y="${y + 3}" text-anchor="middle" fill="${color}" font-size="${singlePoint ? 21 : 10.5}" font-weight="780">${formatScore(value)}</text>
    `;
  };

  return `
    <div class="dash-evolution">
      <svg viewBox="0 0 ${w} ${h}" role="img" aria-label="Evolução das notas">
        <line x1="${pad.left}" y1="${h - pad.bottom}" x2="${w - pad.right}" y2="${h - pad.bottom}" stroke="#e4e9f0" stroke-width="1" />
        <line x1="${pad.left}" y1="${yFor(8)}" x2="${w - pad.right}" y2="${yFor(8)}" stroke="#dfeee2" stroke-width="1.2" />
        ${singlePoint ? `<line x1="${w / 2 - 82}" y1="${yFor(points[0])}" x2="${w / 2 + 82}" y2="${yFor(points[0])}" stroke="${color}" stroke-width="5" stroke-linecap="round"></line>` : ""}
        <path d="${d}" fill="none" stroke="${color}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"></path>
        ${points
          .map(
            (value, index) => {
              return `
                <circle cx="${xFor(index)}" cy="${yFor(value)}" r="${singlePoint ? 8 : 4}" fill="${color}" stroke="#fff" stroke-width="2.5"></circle>
                ${labelPill(value, index)}
              `;
            }
          )
          .join("")}
        ${monthsLabel
          .map(
            (month, index) => `
              <text x="${singlePoint ? w / 2 : pad.left + index * xStep}" y="${h - 3}" text-anchor="middle" fill="#425474" font-size="12" font-weight="700">${month}</text>
            `
          )
          .join("")}
      </svg>
    </div>
  `;
}

function generalAssessmentMiniChart() {
  const monthIds = months.map(([id]) => id).filter((id) => id <= currentMonthId && !futureMonthIds.has(id));
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
  const singlePoint = availablePoints.length === 1;
  const pointX = (point) => singlePoint ? w / 2 : pad.left + monthIds.indexOf(point.monthId) * xStep;
  const lineD = availablePoints
    .map((point, index) => `${index === 0 ? "M" : "L"}${pointX(point)},${yFor(point.value)}`)
    .join(" ");

  return `
    <svg class="general-sparkline" viewBox="0 0 ${w} ${h}" role="img" aria-label="Tendência da avaliação geral">
      <line x1="${pad.left}" y1="${h - pad.bottom}" x2="${w - pad.right}" y2="${h - pad.bottom}" stroke="#e3eaf2" stroke-width="1" />
      ${singlePoint ? `<line x1="${w / 2 - 92}" y1="${yFor(availablePoints[0].value)}" x2="${w / 2 + 92}" y2="${yFor(availablePoints[0].value)}" stroke="#2f8f46" stroke-width="5" stroke-linecap="round" opacity=".9"></line>` : ""}
      <path d="${lineD}" fill="none" stroke="#2f8f46" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"></path>
      ${availablePoints
        .map((point) => {
          const x = pointX(point);
          const y = yFor(point.value);
          return `
            <text x="${x}" y="${y - 18}" text-anchor="middle" fill="#207333" font-size="${singlePoint ? 23 : 14}" font-weight="800">${formatScore(point.value)}</text>
            <circle cx="${x}" cy="${y}" r="${singlePoint ? 8 : 5}" fill="#2f8f46" stroke="#ffffff" stroke-width="2.8"></circle>
            ${singlePoint ? `<text x="${x}" y="${h - 7}" text-anchor="middle" fill="#425474" font-size="12" font-weight="700">${point.monthId.slice(0, 3).replace(/^./, (letter) => letter.toUpperCase())}</text>` : ""}
          `;
        })
        .join("")}
      ${singlePoint ? "" : labels
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
  if (!hasAnyAuditResult()) {
    return `<div class="graph-card-body graph-assessment is-panel-style">${emptyDataState("Nenhuma nota registrada no período.")}</div>`;
  }
  if (isAreaResponsible()) {
    const area = primaryUserArea();
    if (!hasAreaResult(area)) return `<div class="graph-card-body graph-assessment is-panel-style">${emptyDataState("Nenhuma nota registrada para esta área.")}</div>`;
    const hasPrevious = Number.isFinite(area.last);
    const delta = hasPrevious ? area.score - area.last : null;
    return `<div class="graph-card-body graph-assessment is-panel-style"><div class="general-score-row"><div class="general-score-value">${formatScore(area.score)}</div><div><strong>${escapeHtml(area.name)}</strong><span>${reportMonthLabel(currentMonthId)}</span></div></div>${dashboardEvolution(area)}${hasPrevious ? `<div class="general-delta ${delta >= 0 ? "positive" : "danger"}">${delta >= 0 ? "Ganho" : "Queda"} de ${formatScore(Math.abs(delta))} ponto</div>` : ""}</div>`;
  }
  const currentScore = monthAverage(currentMonthId) ?? generalScore();
  const available = availableMonthIds();
  const previousId = [...available].reverse().find((monthId) => monthId !== currentMonthId);
  const previousScore = previousId ? monthAverage(previousId) : null;
  const delta = previousScore == null ? null : currentScore - previousScore;
  const trendClass = delta >= 0 ? "positive" : "danger";

  return `
    <div class="graph-card-body graph-assessment is-panel-style">
      <div class="general-score-row">
        <div class="general-score-value">${formatScore(currentScore)}</div>
        <div>
          <strong>Média das 12 áreas</strong>
          <span>${reportMonthLabel(currentMonthId)}</span>
        </div>
      </div>
      ${generalAssessmentMiniChart()}
      ${delta == null ? "" : `<div class="general-delta ${trendClass}">
        ${delta >= 0 ? "Ganho" : "Queda"} de ${formatScore(Math.abs(delta))} ponto vs. ${previousId}
      </div>`}
    </div>
  `;
}

function graphSummaryRows(rows, total) {
  const safeTotal = Math.max(1, total);
  return `
    <div class="graph-summary-list">
      ${rows
        .map(
          (row) => `
            <div class="graph-summary-row" style="--row-color:${row.color};--row-width:${Math.round((row.value / safeTotal) * 100)}%">
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
    value: areasWithResults().filter((area) => area.status === status).length
  }));
  return graphSummaryRows(rows, areasWithResults().length);
}

function graphRiskSummary() {
  const counts = ncRiskCounts(isAreaResponsible() ? primaryUserArea() : null);
  const total = Object.values(counts).reduce((sum, value) => sum + value, 0);
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
  const audits = operationalAudits || [];
  const finished = audits.filter((audit) => audit.status === "finished").length;
  const inProgress = audits.filter((audit) => ["draft", "in_progress", "sync_pending"].includes(audit.status)).length;
  const failed = audits.filter((audit) => ["failed", "cancelled"].includes(audit.status)).length;
  const rows = [
    { label: "Realizadas", color: "var(--green)", value: finished },
    { label: "Em andamento", color: "var(--orange)", value: inProgress },
    { label: "Não concluídas", color: "#c8d0dc", value: failed }
  ];
  return `
    <div class="graph-card-body graph-audits">
      <div class="audit-total-line"><strong>${audits.length}</strong><span>auditorias registradas</span></div>
      ${graphSummaryRows(rows, audits.length)}
    </div>
  `;
}

function recentFeedbackNotifications() {
  return accessNotifications
    .filter((item) => /feedback|devolutiva|prazo|deadline/i.test(`${item.notification_type} ${item.title}`))
    .slice(0, 4);
}

function dashboardHome() {
  const hasSelection = Boolean(state.selectedArea);
  const selectedArea = hasSelection ? areaById(state.selectedArea) : null;
  const scopeArea = isAreaResponsible() ? primaryUserArea() : selectedArea;
  const scopedAreas = scopeArea ? [scopeArea] : areasWithResults();
  const pendingPlans = scopedAreas.reduce((sum, area) => sum + area.pending, 0);
  const criticalNcs = scopedAreas.reduce((sum, area) => sum + area.critical, 0);
  const latePlans = planningActionRows().filter((plan) => plan.status === "overdue" && (!scopeArea || plan.area?.id === scopeArea.id)).length;
  const feedback = recentFeedbackNotifications();
  return `
    <div class="fichario-home ${hasSelection ? "has-selection" : "no-selection"}">
      <div class="fichario-panel-head">
        <div class="home-intro">
          <span class="eyebrow home-eyebrow"><img src="assets/idvida-boneco.png?v=fichario-shell-1" alt="" aria-hidden="true" />PAINEL INICIAL</span>
          <h1>Olá, ${escapeHtml((currentAccessUser?.full_name || "João").split(" ")[0])}</h1>
          <p>${isAreaResponsible() ? `Resumo operacional de ${escapeHtml(primaryUserArea().name)}.` : "Resumo operacional. Veja as notas das áreas auditadas no último fechamento."}</p>
        </div>
        <div class="date-line"><img src="assets/fichario-icons/calendar.png?v=fichario-shell-1" alt="" aria-hidden="true" /><span>${formatCurrentDate()}</span></div>
      </div>
      ${dashboardLegend()}
      <div class="fichario-main-layout">
        <div class="fichario-main-left">
          <div class="fichario-summary-grid">
            <section class="fichario-summary-card">
              <h2>${isAreaResponsible() ? "Pendências da área" : "Pendências gerais"}</h2>
              <div class="pending-compact-grid">
                <span><img src="assets/ui-icons-approved/blue/action-plan.png" alt="" /><b>${pendingPlans}</b><small>planos pendentes</small></span>
                <span><img src="assets/ui-icons-approved/blue/critical.png" alt="" /><b>${criticalNcs}</b><small>NCs de alto risco</small></span>
                <span><img src="assets/ui-icons-approved/blue/ncs.png" alt="" /><b>0</b><small>documentos vencidos</small></span>
                <span><img src="assets/ui-icons-approved/blue/late.png" alt="" /><b>${latePlans}</b><small>planos atrasados</small></span>
              </div>
            </section>
            <section class="fichario-summary-card">
              <h2>Evolução da nota</h2>
              <p>Visão geral dos últimos meses.</p>
              ${dashboardEvolution(scopeArea)}
            </section>
            <section class="fichario-summary-card feedback-summary-card ${state.feedbackExpanded ? "is-expanded" : ""}">
              <h2>Últimas devolutivas</h2>
              <p>Retornos recentes dos responsáveis.</p>
              <div class="feedback-compact-row">
                <div class="feedback-count"><strong>${feedback.length}</strong><span>retornos recentes</span></div>
                <button class="feedback-toggle" type="button" data-toggle-feedback>${state.feedbackExpanded ? "Ocultar devolutivas" : "Ver devolutivas"}</button>
              </div>
              <div class="feedback-list ${state.feedbackExpanded ? "" : "hidden"}">
                ${feedback.length ? feedback.map((item) => `<div class="feedback-item"><strong>${escapeHtml(item.title || "Devolutiva recebida")}</strong><span class="feedback-status" style="--status-color: var(--yellow)">${escapeHtml(relativeNotificationTime(item.created_at))}</span></div>`).join("") : emptyDataState("Nenhuma devolutiva recebida.")}
              </div>
            </section>
          </div>
          ${hasSelection ? selectedPanel("mobile-selected-panel") : ""}
          <div class="area-grid ${hasSelection ? "is-focused" : ""}">
            ${orderedAreasForUser().map((area) => areaTile(area)).join("")}
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
  const visibleAreas = areaData.filter((area) => canAccessArea(area.id));
  const chartAreas = areasWithResults().filter((area) => canAccessArea(area.id));
  const chartIndexes = chartAreas.map((area) => visibleAreas.findIndex((item) => item.id === area.id));
  const sourceIndexes = chartAreas.map((area) => areaData.findIndex((item) => item.id === area.id));
  const hasComparison = selected !== currentMonthId && Array.isArray(monthLines[selected]);
  const lineValues = hasComparison ? sourceIndexes.map((index) => monthLines[selected][index]) : null;
  const barValues = sourceIndexes.map((index) => monthLines[currentMonthId]?.[index] ?? 0);
  const width = expanded ? 1320 : 1120;
  const height = expanded ? 520 : 400;
  const pad = expanded
    ? { left: 50, right: 124, top: 46, bottom: 122 }
    : { left: 48, right: 138, top: 38, bottom: 108 };
  const innerW = width - pad.left - pad.right;
  const innerH = height - pad.top - pad.bottom;
  const barGap = expanded ? 32 : 28;
  const slotW = innerW / Math.max(1, visibleAreas.length);
  const barW = Math.max(20, slotW - barGap);
  const xFor = (index) => pad.left + index * slotW + barGap / 2;
  const yFor = (value) => pad.top + innerH - (value / 10) * innerH;
  const lineD = lineValues
    ? lineValues.map((value, i) => `${i === 0 ? "M" : "L"}${xFor(chartIndexes[i]) + barW / 2},${yFor(value)}`).join(" ")
    : "";
  const selectedColor = months.find(([id]) => id === selected)?.[1] || "#f4a000";
  const gridRight = pad.left + innerW;
  const plotBottom = pad.top + innerH;
  const points = chartAreas.map((area, i) => {
    const slotIndex = chartIndexes[i];
    const x = xFor(slotIndex);
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
  const lastBarRight = xFor(Math.max(0, visibleAreas.length - 1)) + barW;
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
        const x = xFor(chartIndexes[i]) + barW / 2;
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
        const x = xFor(chartIndexes[i]) + barW / 2;
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
      ${visibleAreas
        .map(
          (area, index) => `
            <g class="axis-label-hit" ${hasAreaResult(area) ? `data-chart-area="${area.id}" tabindex="0" role="button"` : ""} aria-label="${area.name}">
              <text class="chart-axis-label" transform="translate(${xFor(index) + barW / 2}, ${plotBottom + 43}) rotate(-39)" text-anchor="end">
                ${chartLabelLines(area.name)
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
      ${(isAreaResponsible() ? areaData.filter((area) => canAccessArea(area.id)) : areaData)
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
  const rows = blockSummaries(area).filter((row) => Number.isFinite(row.score));
  return rows;
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
      ${hasAreaResult(area) ? rows
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
        .join("") : emptyDataState("Nenhum resultado registrado para esta área.")}
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
        ${rows.length ? rows
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
          .join("") : emptyDataState("O ranking será exibido após as primeiras auditorias.")}
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
              <p class="chart-note">${isImpactMode ? "Ranking combinado por nota baixa, NCs de alto risco, recorrência e andamento dos planos." : `Clique em um mês abaixo para comparar com o mês atual (${reportMonthLabel(currentMonthId)}).`}</p>
            </div>
            <div class="chart-tools">
              ${isAreaResponsible() ? "" : `<button class="chart-mode-btn" data-toggle-chart-mode title="Ver ${nextModeLabel}">
                <span>${nextModeLabel}</span>
                ${icons.chevron}
              </button>`}
              <button class="chart-expand-btn" data-toggle-chart-size title="${state.chartExpanded ? "Reduzir gráfico" : "Expandir gráfico"}">${state.chartExpanded ? "-" : "+"}</button>
            </div>
          </div>
          <div class="mobile-chart-scroll">
            ${hasAnyAuditResult() ? (isImpactMode ? actionImpactChart() : chartSvg()) : emptyDataState("Nenhuma auditoria concluída no período. O gráfico será preenchido automaticamente após a sincronização.")}
          </div>
          ${isImpactMode || !hasAnyAuditResult() ? "" : `<div class="month-strip">
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
          <p class="chart-note">${state.selectedMonth === currentMonthId ? `As colunas representam ${reportMonthLabel(currentMonthId)}, sem linha comparativa ativa.` : `As colunas representam ${reportMonthLabel(currentMonthId)}. A linha representa o mês selecionado para comparação.`}</p>`}
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

function reportAuditWindow(area = reportSelectedArea()) {
  const audit = (operationalAudits || []).find((item) => String(item.area_id) === String(area?.backendId) && item.status === "finished");
  const started = audit?.started_at ? new Date(audit.started_at) : new Date();
  const finished = audit?.finished_at ? new Date(audit.finished_at) : started;
  const date = started.toLocaleDateString("pt-BR");
  const start = started.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }).replace(":", "h");
  const end = finished.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }).replace(":", "h");
  const durationMinutes = Math.max(0, Math.round((finished.getTime() - started.getTime()) / 60000));
  return {
    date,
    start,
    end,
    duration: durationMinutes ? `${durationMinutes} min` : "Relatório gerado no fechamento",
    signedAt: `${finished.toLocaleDateString("pt-BR")} às ${end.replace("h", ":")}`
  };
}

function reportDocHeader(title, area, showMeta = false) {
  const audit = reportAuditWindow(area);
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
        <span><strong>Auditor</strong>${escapeHtml(reportAuditorName())}</span>
        <span><strong>Responsável</strong>${escapeHtml(reportResponsibleName(area))}</span>
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
        <span><strong>Auditor</strong>${escapeHtml(reportAuditorName())}</span>
        <span><strong>Responsável</strong>${escapeHtml(reportResponsibleName(area))}</span>
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
        <span><strong>Auditor</strong>${escapeHtml(reportAuditorName())}</span>
        <span><strong>Responsável</strong>${escapeHtml(reportResponsibleName(area))}</span>
      </div>` : ""}
    </header>
  `;
}

function reportDocFooter(page, total) {
  return `
    <footer class="report-doc-footer">
      <span>Fonte: Sistema HAE Auditoria · Base: Portaria SMS nº 2.619/2011</span>
      <span>Página ${page} de ${total}</span>
    </footer>
  `;
}

function reportMonthlyDocFooter(page, total) {
  return `
    <footer class="report-doc-footer">
      <span>Fonte: Sistema HAE Auditoria · Base: Portaria SMS nº 2.619/2011</span>
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
  const monthlyReport = reportsForArea(area).find((report) => report.report_type === "monthly");
  const monthlyReady = isCurrentMonthlyReport(monthlyReport);
  const pdfButton = isComparison
    ? `<button class="report-pdf-btn" data-open-report-pdf>${svgIcon("externalLink")} Abrir PDF</button>`
    : monthlyReady
      ? `<button class="report-pdf-btn" data-report-action="open" data-report-area="${escapeHtml(area.id)}" data-report-kind="monthly" data-report-url="${escapeHtml(monthlyReport.file_url)}" type="button">${svgIcon("externalLink")} Abrir PDF</button>`
      : `<button class="report-pdf-btn" type="button" disabled>Preparando relatório...</button>`;
  return `
    <div class="report-toolbar surface" aria-label="Configurações do relatório">
      <div class="report-tabs">
        <button class="${!isComparison ? "is-active" : ""}" data-report-kind="monthly">Consolidado do mês</button>
        <button class="${isComparison ? "is-active" : ""}" data-report-kind="comparison">Comparativo analítico</button>
      </div>
      <div class="report-toolbar-actions">
        ${pdfButton}
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
  const icon = mode === "download" ? svgIcon("document") : svgIcon("externalLink");
  const report = reportsForArea(area).find((item) => item.report_type === reportKind);
  const url = report?.file_url || "";
  return `<button class="report-file-action" data-report-action="${mode}" data-report-area="${escapeHtml(area.id)}" data-report-kind="${escapeHtml(reportKind)}" data-report-url="${escapeHtml(url)}" type="button">${icon} ${escapeHtml(label)}</button>`;
}

function isCurrentMonthlyReport(report) {
  return Boolean(
    report?.report_type === "monthly" &&
    report.file_url &&
    String(report.file_name || "").endsWith(`-${REPORT_LAYOUT_VERSION}.pdf`)
  );
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
  const report = options.reportRoot || document.querySelector(".technical-report");
  if (!report) return Promise.reject(new Error("Relatório não encontrado para gerar o PDF."));

  return ensureReportPdfLibrary()
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

        const pdfBlob = pdf.output("blob");
        if (typeof options.onBlob === "function") await options.onBlob(pdfBlob);
        if (options.mode === "archive") return pdfBlob;
        if (options.mode === "download") {
          pdf.save(options.filename || reportPdfFilename());
        } else {
          const pdfUrl = URL.createObjectURL(pdfBlob);
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
    .catch((error) => {
      if (options.mode === "archive") throw error;
      reportPrintFallback(targetWindow);
      return null;
    });
}

function actionPlanPdfFilename(plan) {
  const code = String(plan?.publicCode || plan?.id || "plano-de-acao")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();
  return `${code || "plano-de-acao"}.pdf`;
}

function actionPlanPrintFallback(targetWindow, plan) {
  const documentRoot = document.querySelector(".action-plan-document");
  if (!documentRoot) return;
  const printWindow = targetWindow || window.open("", "_blank");
  if (!printWindow) {
    alert("Não consegui abrir o PDF. Verifique se o navegador bloqueou a nova aba.");
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
        <title>${actionPlanPdfFilename(plan)}</title>
        <link rel="stylesheet" href="styles.css?v=20260922-action-plan-pdf-1" />
        <style>
          body { margin: 0; background: #ffffff; }
          .action-plan-document { width: 190mm; margin: 0 auto; border: 0; border-radius: 0; box-shadow: none; }
          .action-plan-submit-footer button, .action-plan-image-viewer-backdrop { display: none !important; }
          @media print { @page { size: A4 portrait; margin: 10mm; } }
        </style>
      </head>
      <body>
        ${documentRoot.outerHTML}
        <script>window.addEventListener("load", function () { setTimeout(function () { window.print(); }, 350); });<\/script>
      </body>
    </html>
  `);
  printWindow.document.close();
}

async function openActionPlanPdf(plan, targetWindow = null) {
  const documentRoot = document.querySelector(".action-plan-document");
  if (!documentRoot) throw new Error("Plano de ação não encontrado para gerar o PDF.");

  try {
    await ensureReportPdfLibrary();
    const holder = document.createElement("div");
    holder.className = "action-plan-pdf-render-root";
    const clone = documentRoot.cloneNode(true);
    clone.querySelectorAll("button").forEach((button) => button.remove());
    holder.appendChild(clone);
    document.body.appendChild(holder);

    try {
      await waitForReportImages(clone);
      await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
      const canvas = await window.html2canvas(clone, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        scrollX: 0,
        scrollY: 0,
        windowWidth: holder.scrollWidth,
        windowHeight: holder.scrollHeight
      });
      const pdf = new window.jspdf.jsPDF({ unit: "mm", format: "a4", orientation: "portrait" });
      const margin = 8;
      const availableWidth = pdf.internal.pageSize.getWidth() - margin * 2;
      const availableHeight = pdf.internal.pageSize.getHeight() - margin * 2;
      const pagePixelHeight = Math.floor(canvas.width * (availableHeight / availableWidth));
      let sourceY = 0;
      let pageIndex = 0;

      while (sourceY < canvas.height) {
        const sliceHeight = Math.min(pagePixelHeight, canvas.height - sourceY);
        const pageCanvas = document.createElement("canvas");
        pageCanvas.width = canvas.width;
        pageCanvas.height = sliceHeight;
        pageCanvas.getContext("2d").drawImage(canvas, 0, sourceY, canvas.width, sliceHeight, 0, 0, canvas.width, sliceHeight);
        if (pageIndex) pdf.addPage("a4", "portrait");
        const imageHeight = availableWidth * (sliceHeight / canvas.width);
        pdf.addImage(pageCanvas.toDataURL("image/jpeg", 0.96), "JPEG", margin, margin, availableWidth, imageHeight, undefined, "FAST");
        sourceY += sliceHeight;
        pageIndex += 1;
      }

      const pdfUrl = URL.createObjectURL(pdf.output("blob"));
      if (targetWindow) targetWindow.location.href = pdfUrl;
      else window.open(pdfUrl, "_blank");
      setTimeout(() => URL.revokeObjectURL(pdfUrl), 60000);
    } finally {
      holder.remove();
    }
  } catch (error) {
    actionPlanPrintFallback(targetWindow, plan);
  }
}

function approvedReportMarkup(area, reportKind = "monthly") {
  const previousArea = state.selectedArea;
  const previousKind = state.reportKind;
  state.selectedArea = area.id;
  state.reportKind = reportKind;
  const markup = reportKind === "comparison" ? comparativeReportPage() : monthlyReportPage();
  state.selectedArea = previousArea;
  state.reportKind = previousKind;
  return markup;
}

function openApprovedReportPdf(area, reportKind, targetWindow = null, options = {}) {
  const source = document.createElement("div");
  source.innerHTML = approvedReportMarkup(area, reportKind);
  return openReportPdf(targetWindow, {
    ...options,
    filename: reportPdfFilename(area, reportKind),
    reportRoot: source.querySelector(".technical-report")
  });
}

async function archiveApprovedMonthlyReport(area, audit) {
  const key = `${audit.id}:monthly`;
  if (reportArchiveInFlight.has(key) || reportsForArea(area).some(isCurrentMonthlyReport)) return;
  reportArchiveInFlight.add(key);
  try {
    const blob = await openApprovedReportPdf(area, "monthly", null, { mode: "archive" });
    if (!blob) throw new Error("O PDF aprovado não pôde ser preparado.");
    const deviceUid = await window.HAE_OFFLINE.deviceUid();
    const filename = reportPdfFilename(area, "monthly").replace(/\.pdf$/i, `-${REPORT_LAYOUT_VERSION}.pdf`);
    const uploadResponse = await fetch(apiUrl("/api/offline-files"), {
      method: "POST",
      credentials: apiCredentials,
      headers: {
        "content-type": "application/pdf",
        "x-device-uid": deviceUid,
        "x-local-file-id": `report-${audit.id}-monthly-${REPORT_LAYOUT_VERSION}`,
        "x-file-name": encodeURIComponent(filename),
        "x-file-type": "report_pdf"
      },
      body: blob
    });
    const uploaded = await uploadResponse.json().catch(() => ({}));
    if (!uploadResponse.ok || !uploaded.file?.id) throw new Error(uploaded.error || "Não foi possível arquivar o PDF.");
    await operationalRequest("reports/register-client-pdf", {
      method: "POST",
      body: JSON.stringify({ auditId: audit.id, fileId: uploaded.file.id, reportType: "monthly" })
    });
    const reports = await operationalRequest("reports");
    operationalReports = reports.reports || [];
    render();
  } catch (error) {
    console.error("Falha ao preparar o relatório mensal aprovado", error);
  } finally {
    reportArchiveInFlight.delete(key);
  }
}

async function archiveMissingApprovedReports() {
  if (location.protocol === "file:" || isAreaResponsible() || !window.HAE_OFFLINE) return;
  for (const audit of operationalAudits || []) {
    if (audit.status !== "finished") continue;
    const area = uiAreaFromBackendId(audit.area_id);
    if (!area || reportsForArea(area).some(isCurrentMonthlyReport)) continue;
    await archiveApprovedMonthlyReport(area, audit);
  }
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
  const audit = reportAuditWindow(area);
  return [
    ["Unidade hospitalar", "Hospital Einstein - Morumbi", "Tipo de relatório", typeLabel],
    ["Área auditada", escapeHtml(area.name), "Base normativa", "Portaria SMS nº 2.619/2011"],
    ["Auditoria realizada por", escapeHtml(reportAuditorName(area)), "Responsável da área", escapeHtml(reportResponsibleName(area))],
    ["Periodicidade", "Mensal", "Data e horário", `${audit.date} · ${audit.start} às ${audit.end}`]
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
    .filter((block) => block.sourceCounts.NC > 0)
    .sort((a, b) => b.sourceCounts.NC - a.sourceCounts.NC || a.score - b.score)
    .slice(0, 2)
    .map((block) => block.title);
  const metaText = area.score >= 8
    ? "A área permanece dentro da meta mínima definida para o ciclo mensal."
    : "A área está abaixo da meta mínima de 8,0 e deve permanecer em acompanhamento no próximo ciclo.";
  return `
    <div class="report-note-box">
      <strong>Síntese técnica da área</strong>
      <p>${metaText} Foram registradas ${reportPlural(totals.NC, "não conformidade", "não conformidades")} e ${reportPlural(stats.total, "plano de ação vinculado", "planos de ação vinculados")}; ${worstBlocks.length ? `os blocos que exigem atenção neste mês são ${escapeHtml(worstBlocks.join(" e "))}` : "não há bloco com não conformidade no ciclo"}.</p>
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
  const height = 300;
  const pad = { left: 42, right: 72, top: isComparison ? 34 : 30, bottom: 92 };
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
        ${blocks
          .map((block, index) => {
            const center = pad.left + index * slot + slot / 2;
            const label = isMonthly || isComparison ? reportFullText(block.title).toUpperCase() : reportBlockLabel(block.title);
            return `
              <text transform="translate(${center}, ${plotBottom + 18}) rotate(-35)" text-anchor="end" fill="#111827" font-size="7.35" font-weight="800">
                ${reportSvgLabelLines(label, 22)
                  .map((line, lineIndex) => `<tspan x="0" dy="${lineIndex === 0 ? 0 : 9}">${escapeHtml(line)}</tspan>`)
                  .join("")}
              </text>
            `;
          })
          .join("")}
      </svg>
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
  return row.notes || "Sem observação adicional registrada.";
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
  return row.evidenceFileId ? apiUrl(`/api/files/${row.evidenceFileId}/content`) : null;
}

function reportEvidenceGrid(area) {
  const rows = reportNcRows(area, 4).filter((row) => row.evidenceFileId);
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
    .filter((block) => block.sourceCounts.NC > 0)
    .sort((a, b) => b.sourceCounts.NC - a.sourceCounts.NC || b.highRiskNc - a.highRiskNc || a.score - b.score)
    .slice(0, 3);
  const attentionText = attentionBlocks
    .map((block) => `${block.title} (${block.questions.length} perguntas, nota ${formatScore(block.score)}, ${block.sourceCounts.NC} NCs${block.highRiskNc ? `, ${block.highRiskNc} de risco alto` : ""})`)
    .join("; ");

  return `
    <p class="report-doc-text report-monthly-attention-text">
      ${attentionBlocks.length
        ? `O gráfico consolida ${totalQuestions} perguntas em ${blocks.length} blocos; os principais pontos de atenção do mês são ${escapeHtml(attentionText)}, considerando quantidade de NCs, risco e nota dos blocos não conformes.`
        : `O gráfico consolida ${totalQuestions} perguntas em ${blocks.length} blocos e não registrou não conformidades neste ciclo. Itens marcados como Não Avaliado (X) permanecem identificados no quadro, sem serem classificados como ponto de atenção.`}
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
    <div class="report-signatures is-signed-report">
      <span><strong>${escapeHtml(reportAuditorName())}</strong>Auditor responsável<small>Assinado eletronicamente em ${escapeHtml(reportAuditWindow().signedAt)}</small></span>
      <span><strong>${escapeHtml(reportResponsibleName(area))}</strong>Responsável da área auditada<small>Responsável identificado no cadastro da área</small></span>
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
        <div class="report-signatures is-signed-report">
          <span><strong>${escapeHtml(reportAuditorName())}</strong>Auditor responsável<small>Assinado eletronicamente em ${escapeHtml(reportAuditWindow().signedAt)}</small></span>
          <span><strong>${escapeHtml(reportResponsibleName(area))}</strong>Responsável da área auditada<small>Responsável identificado no cadastro da área</small></span>
        </div>
      `)}
    </div>
  `;
}

function reportLibraryItems(area) {
  const stored = reportsForArea(area);
  const findReport = (type) => stored.find((report) => report.report_type === type);
  const completedAudit = (operationalAudits || []).find((audit) => String(audit.area_id) === String(area.backendId) && audit.status === "finished");
  const monthlyReport = findReport("monthly");
  const monthlyAvailable = isCurrentMonthlyReport(monthlyReport);
  return [
    {
      id: "monthly",
      title: "Relatório da auditoria mensal",
      status: monthlyAvailable ? "Disponível" : completedAudit ? "Gerando relatório" : "Ainda não gerado",
      note: monthlyReport?.period_label || reportMonthLabel(currentMonthId),
      available: monthlyAvailable
    },
    {
      id: "comparison",
      title: "Relatório comparativo",
      status: findReport("comparison") ? "Disponível" : "Ainda não gerado",
      note: findReport("comparison")?.period_label || "Exige pelo menos dois ciclos concluídos",
      available: Boolean(findReport("comparison"))
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

function reportsForArea(area) {
  if (!area || !Array.isArray(operationalReports)) return [];
  return operationalReports.filter((report) => String(report.area_id) === String(area.backendId));
}

function reportHistoryRows(area) {
  const rows = reportsForArea(area);
  const completedAudit = (operationalAudits || []).find((audit) => String(audit.area_id) === String(area.backendId) && audit.status === "finished");
  if (!rows.length && completedAudit) {
    return `<tr><td>${escapeHtml(reportMonthLabel(currentMonthId))}</td><td>Auditoria mensal</td><td>Gerando relatório</td><td><span>Aguarde</span></td></tr>`;
  }
  if (!rows.length) return `<tr><td colspan="4">Nenhum relatório gerado para esta área.</td></tr>`;
  const labels = { monthly: "Auditoria mensal", comparison: "Comparativo analítico", quarterly: "Trimestral", semiannual: "Semestral", annual: "Anual", action_plan: "Plano de ação" };
  return rows.map((row) => {
    const ready = row.report_type !== "monthly" || isCurrentMonthlyReport(row);
    return `
    <tr>
      <td>${escapeHtml(row.period_label || "Período não informado")}</td>
      <td>${escapeHtml(labels[row.report_type] || row.report_type)}</td>
      <td>${escapeHtml(ready && row.status === "generated" ? "PDF disponível" : ready ? row.status : "Gerando relatório")}</td>
      <td>
        ${ready && row.file_url
          ? reportStoredPdfLink(area, row.report_type, "open", "Abrir")
          : `<span>Aguarde</span>`}
      </td>
    </tr>
  `;
  }).join("");
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
          ${orderedAreasForUser().map((area) => {
            const locked = !canAccessArea(area.id);
            return `
            <button class="report-folder-tile ${locked ? "is-locked" : ""}" ${locked ? "data-locked-area" : `data-report-folder-area="${area.id}"`} aria-label="${locked ? `Sem acesso aos relatórios de ${escapeHtml(area.name)}` : `Abrir relatórios de ${escapeHtml(area.name)}`}">
              <span class="report-folder-icon">${assetIcon("reportFolder", "blue")}</span>
              <span>${escapeHtml(area.name)}</span>
              ${locked ? `<i class="report-folder-lock">${icons.lock}</i>` : ""}
            </button>
          `;}).join("")}
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
  return null;
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
  if (!hasAreaResult(area)) {
    return `
      <div class="detail-page">
        <section class="surface area-empty-detail">
          <img src="assets/icons/${area.icon}" alt="" aria-hidden="true" />
          <div>
            <span class="eyebrow">${escapeHtml(area.name)}</span>
            <h2>Nenhuma auditoria concluída</h2>
            <p>Notas, evolução, não conformidades, evidências e relatório aparecerão aqui depois que a primeira auditoria desta área for finalizada e sincronizada.</p>
          </div>
        </section>
      </div>
    `;
  }
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
              ${areaNcRows.filter((row) => row.evidenceFileId).slice(0, 3)
                .map((row) => `<button class="photo-thumb has-photo" data-open-evidence-gallery type="button" title="Ver evidência do item ${String(row.number).padStart(2, "0")}"><img src="${reportEvidenceImageForQuestion(row)}" alt="Evidência do item ${String(row.number).padStart(2, "0")}" /></button>`)
                .join("")}
            </div>
            ${areaNcRows.some((row) => row.evidenceFileId) ? `<button class="link-inline" data-open-evidence-gallery type="button">Ver evidências ${svgIcon("arrow")}</button>` : '<p class="small-muted">Nenhuma foto vinculada.</p>'}
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
            <button class="primary-btn" data-open-area-plan="${area.id}">Ver plano de ação ${svgIcon("arrow")}</button>
          </section>
        </aside>
      </div>
      ${state.detailEvidenceOpen ? `
        <div class="detail-modal-backdrop">
          <section class="detail-modal evidence-gallery-modal surface" role="dialog" aria-modal="true" aria-label="Evidências fotográficas da área">
            <div class="detail-modal-head"><div><span class="modal-kicker">${escapeHtml(area.name)}</span><h2>Evidências fotográficas</h2><p>${areaNcRows.length} registros vinculados às não conformidades.</p></div><button class="panel-close" data-close-evidence-gallery title="Fechar">${icons.close}</button></div>
            <div class="detail-modal-body"><div class="detail-evidence-grid">${areaNcRows.filter((row) => row.evidenceFileId).map((row) => `<article class="detail-evidence-card"><img src="${reportEvidenceImageForQuestion(row)}" alt="Evidência do item ${String(row.number).padStart(2, "0")}" /><div><strong>Item ${String(row.number).padStart(2, "0")} · ${escapeHtml(row.blockTitle)}</strong><p>${escapeHtml(reportFullText(row.text))}</p><span>Risco ${(riskMeta[row.riskLevel] || riskMeta.none).label}</span></div></article>`).join("")}</div></div>
          </section>
        </div>
      ` : ""}
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
              (area) => {
                const backendArea = (offlineBootstrap?.areas || []).find((item) => item.slug === area.id);
                const remoteAudit = (operationalAudits || []).find((audit) => String(audit.area_id) === String(backendArea?.id) && auditIsCurrentMonth(audit.started_at || audit.created_at));
                const localAudit = auditIsCurrentMonth(state.offlineAudits?.[area.id]?.startedAt) ? state.offlineAudits[area.id] : null;
                const finished = remoteAudit?.status === "finished" || localAudit?.status === "finished";
                const pendingSync = localAudit?.status === "finalizing";
                const onOtherDevice = remoteAudit?.status === "in_progress" && localAudit?.status !== "in_progress";
                const inProgress = remoteAudit?.status === "in_progress" || localAudit?.status === "in_progress";
                const label = finished ? "Auditoria finalizada" : pendingSync ? "Aguardando sincronização" : onOtherDevice ? "Em andamento em outro aparelho" : inProgress ? "Continuar auditoria" : "Iniciar auditoria";
                return `
                <article class="start-tile">
                  <img src="assets/icons/${area.icon}" alt="" />
                  <div>
                    <h3>${area.name}</h3>
                    <p>${area.subtitle}</p>
                  </div>
                  <button class="outline-btn" ${finished || pendingSync || onOtherDevice ? "disabled" : `data-start-area="${area.id}"`}>${label} ${finished || pendingSync || onOtherDevice ? "" : svgIcon("arrow")}</button>
                </article>
              `;
              }
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
  const areaResponsibleName = (offlineBootstrap?.areas || []).find((item) => item.slug === area.id)?.responsible_name || "Responsável não atribuído";
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
  const blocksButtonLabel = showAllBlocks ? "Fechar blocos" : "Ver todos os blocos";
  const currentBlockIndex = blocks.findIndex((block) => block.id === currentBlock?.id);
  const nextIncompleteBlock = blocks.slice(currentBlockIndex + 1).find((block) => (block.questions || []).some((question) => !areaAnswers[question.id]))
    || blocks.find((block, index) => index !== currentBlockIndex && (block.questions || []).some((question) => !areaAnswers[question.id]));
  const allAnswered = answeredCount === questions.length && questions.length > 0;
  const missingEvidenceCount = questions.filter((question) => areaAnswers[question.id] === "NC" && !state.auditEvidence?.[area.id]?.[question.id]).length;

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
                const answerStateClass = selectedAnswer ? `is-answered answer-${selectedAnswer.toLowerCase()}` : "";
                return `
                  <section class="question-card surface ${isNC ? "has-nc" : ""} ${answerStateClass}" data-question-card="${question.id}" style="--question-risk:${risk.color}">
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
                          const isSelected = selectedAnswer === answer;
                          return `<button class="answer-btn answer-${answer.toLowerCase()} ${isSelected ? "is-selected" : ""}" data-answer="${answer}" data-question="${question.id}" aria-pressed="${isSelected}" style="--answer:${meta.color}">${meta.label} <small>(${meta.short})</small></button>`;
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
                        <div class="evidence-photo-actions">
                          <label class="camera-drop">${svgIcon("camera")} Tirar foto <small>Abrir câmera traseira</small><input type="file" accept="image/*" capture="environment" data-evidence-file="${question.id}" data-capture-method="camera" hidden /></label>
                          <label class="camera-drop is-gallery">${svgIcon("document")} Escolher da galeria <small>JPG ou PNG até 10 MB</small><input type="file" accept="image/*" data-evidence-file="${question.id}" data-capture-method="gallery" hidden /></label>
                        </div>
                        <div class="note-field">
                          <label>Observação</label>
                          <textarea data-audit-note="${question.id}" placeholder="Descreva a não conformidade encontrada...">${escapeHtml(state.auditNotes?.[area.id]?.[question.id] || "")}</textarea>
                        </div>
                      </div>
                      <div class="action-form">
                        <div class="note-field"><label>O que deve ser corrigido</label><input placeholder="Ex.: item fora do padrão" /></div>
                        <div class="note-field"><label>Ação necessária</label><input placeholder="Ex.: corrigir e registrar evidência" /></div>
                        <div class="note-field"><label>Responsável</label><input value="${escapeHtml(areaResponsibleName)}" readonly /></div>
                        <div class="note-field"><label>Prazo</label><input type="date" /></div>
                      </div>
                      <button class="primary-btn audit-evidence-complete" data-complete-audit-evidence="${question.id}" type="button" ${state.auditEvidence?.[area.id]?.[question.id] ? "" : "disabled"}>${svgIcon("check")} Concluir evidência e avançar</button>
                    </div>
                  </section>
                `;
              })
              .join("")}
          </section>
          <section class="audit-pager surface">
            <button class="outline-btn" data-checklist-page="${pageIndex - 1}" ${pageIndex === 0 ? "disabled" : ""}><span class="desktop-action-label">Perguntas anteriores</span><span class="mobile-action-label">Anteriores</span></button>
            <span class="audit-page-summary"><b>${pageStart}-${pageEnd}</b> de ${blockQuestions.length}</span>
            ${pageIndex >= totalPages - 1
              ? nextIncompleteBlock
                ? `<button class="primary-btn" data-next-checklist-block="${nextIncompleteBlock.id}">Próximo bloco ${svgIcon("arrow")}</button>`
                : '<button class="outline-btn audit-end-btn" type="button" disabled>Fim do checklist</button>'
              : `<button class="primary-btn" data-checklist-page="${pageIndex + 1}"><span class="desktop-action-label">Próximas perguntas</span><span class="mobile-action-label">Próximas</span> ${svgIcon("arrow")}</button>`}
          </section>
        </div>
        <section class="audit-footer surface" style="margin-top:12px">
          <button class="outline-btn" data-request-leave-audit><span class="desktop-action-label">Voltar para áreas</span><span class="mobile-action-label">Áreas</span></button>
          <span class="audit-total-summary"><b>${questions.length}</b> perguntas <i>•</i> <b>${blocks.length}</b> blocos</span>
          <button class="primary-btn" data-finalize-audit ${allAnswered ? "" : "disabled"}><span class="desktop-action-label">${!allAnswered ? "Responda todo o checklist" : missingEvidenceCount ? `Abrir ${missingEvidenceCount} foto(s) pendente(s)` : "Finalizar auditoria"}</span><span class="mobile-action-label">${!allAnswered ? `${answeredCount}/${questions.length}` : missingEvidenceCount ? `Falta ${missingEvidenceCount} foto` : "Finalizar"}</span> ${allAnswered ? svgIcon("arrow") : ""}</button>
        </section>
      </div>
      ${showAllBlocks ? '<button class="mobile-blocks-backdrop" data-checklist-blocks type="button" aria-label="Fechar lista de blocos"></button>' : ""}
      <aside class="blocks-sidebar surface ${showAllBlocks ? "is-open" : "is-compact"}">
        <div class="blocks-sidebar-head">
          <h2>${showAllBlocks ? "Blocos da área" : "Bloco atual"}</h2>
          <span>${showAllBlocks ? `${blocks.length} blocos` : `${blockDone}/${blockQuestions.length}`}</span>
          <button class="mobile-blocks-close" data-checklist-blocks type="button" title="Fechar" aria-label="Fechar lista de blocos">${icons.close}</button>
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
      ${state.auditFinalizeModal ? `
        <div class="leave-audit-backdrop">
          <section class="leave-audit-modal audit-finalize-modal surface">
            <h2>Finalizar auditoria</h2>
            <p>As respostas e fotos serão confirmadas no servidor antes do fechamento. Como deseja preparar o plano de ação das não conformidades?</p>
            <div class="audit-finalize-options">
              <button class="primary-btn" data-confirm-finalize-mode="automatic">Gerar e enviar automaticamente</button>
              <button class="outline-btn" data-confirm-finalize-mode="automatic_reviewed">Preparar para minha revisão</button>
              <button class="outline-btn" data-cancel-finalize-audit>Cancelar</button>
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
            <label><span>Nome completo</span><input name="fullName" autocomplete="off" placeholder="Nome e sobrenome" required maxlength="250" /></label>
            <label><span>Login de acesso</span><input name="username" autocomplete="off" placeholder="nome.sobrenome" pattern="[A-Za-z0-9][A-Za-z0-9._-]{2,63}" required /><div class="username-suggestions" data-username-suggestions hidden></div></label>
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
  return (operationalActionPlans || [])
    .map((row) => ({ ...row, ...(state.planningPlanOverrides?.[row.id] || {}) }))
    .filter((row) => row.area && canAccessArea(row.area.id));
}

function planningActiveRows(rows = planningActionRows()) {
  return rows.filter((row) => ["awaiting_send", "in_progress", "reopened", "needs_correction", "overdue"].includes(row.status));
}

function planningFeedbackRows(rows = planningActionRows()) {
  return rows.filter((row) => row.status === "pending_review" || row.deadlineRequested);
}

function planningHistoryRows(rows = planningActionRows()) {
  return rows.filter((row) => ["approved", "rejected"].includes(row.status));
}

function planningStatusMeta(status) {
  return {
    approved: ["Aprovado", "good"],
    rejected: ["Reprovado", "danger"],
    pending_review: ["Devolutiva recebida", "purple"],
    needs_correction: ["Correção solicitada", "danger"],
    extension_requested: ["Novo prazo solicitado", "warning"],
    awaiting_send: ["Aguardando envio", "warning"],
    in_progress: ["Em andamento", "blue"],
    reopened: ["Reaberto", "warning"],
    overdue: ["Vencido", "danger"]
  }[status] || ["Pendente", "neutral"];
}

function planningTotals(rows = planningActionRows()) {
  const approved = rows.filter((row) => row.status === "approved").length;
  const rejected = rows.filter((row) => row.status === "rejected").length;
  const waiting = rows.filter((row) => row.status === "pending_review" || row.deadlineRequested).length;
  const overdue = rows.filter((row) => row.status === "overdue").length;
  const awaiting = rows.filter((row) => row.status === "awaiting_send").length;
  const active = rows.filter((row) => ["in_progress", "reopened", "needs_correction"].includes(row.status) && !row.deadlineRequested).length;
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
        waiting: areaRows.filter((row) => row.status === "pending_review" || row.deadlineRequested).length,
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
        waiting: areaRows.filter((row) => row.status === "pending_review" || row.deadlineRequested).length,
        awaiting: areaRows.filter((row) => row.status === "awaiting_send").length,
        active: areaRows.filter((row) => ["in_progress", "reopened", "needs_correction"].includes(row.status) && !row.deadlineRequested).length,
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
    [{ value: "", label: "Selecione área ou subárea" }, ...areaData.filter((area) => canAccessArea(area.id)).map((area) => ({ value: area.id, label: area.name }))],
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

function planningRecentList(title, description, rows, emptyText) {
  return `
    <section class="planning-recent-card">
      <div class="planning-card-head"><h2>${escapeHtml(title)}</h2><p>${escapeHtml(description)}</p></div>
      <div class="planning-recent-list">
        ${rows.length ? rows.map((row, index) => {
          const [label, tone] = planningStatusMeta(row.deadlineRequested ? "extension_requested" : row.status);
          return `<button class="planning-recent-row" data-open-action-plan-preview="${escapeHtml(row.id)}" type="button">
            <span class="planning-recent-icon">${index + 1}</span>
            <span><strong>${escapeHtml(row.area.name)}</strong><small>${escapeHtml(row.title)} · ${escapeHtml(row.owner)}</small></span>
            <span class="planning-status is-${tone}">${escapeHtml(label)}</span>
          </button>`;
        }).join("") : `<div class="planning-empty-state">${escapeHtml(emptyText)}</div>`}
      </div>
    </section>`;
}

function planningOverview() {
  const activeRows = planningActiveRows();
  const feedbackRows = planningFeedbackRows();
  const cycleRows = [...new Map([...activeRows, ...feedbackRows].map((row) => [row.id, row])).values()];
  const totals = planningTotals(cycleRows);
  const ranking = planningAreaRanking(cycleRows);
  const recentSent = activeRows.filter((row) => ["in_progress", "reopened"].includes(row.status)).slice(0, 4);
  const recentReturns = [...feedbackRows, ...planningHistoryRows()].slice(0, 4);
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
      <div class="planning-recent-grid">
        ${planningRecentList("Últimos planos enviados", "Planos já bloqueados para edição e aguardando o responsável.", recentSent, "Nenhum plano enviado neste ciclo.")}
        ${planningRecentList("Últimas devolutivas", "Retornos recentes dos responsáveis e decisões do auditor.", recentReturns, "Nenhuma devolutiva recebida.")}
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
                <td><div class="planning-table-actions"><button class="fichario-sub-action" data-open-action-plan-preview="${escapeHtml(row.id)}" type="button">${actionLabel}</button>${row.status === "awaiting_send" ? `<button class="fichario-sub-action is-primary" data-send-action-plan="${escapeHtml(row.id)}" type="button">Enviar agora</button>` : ""}</div></td>
              </tr>
            `;
          }).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function actionPlanPreviewItems(area, count = 3, plan = null) {
  if (plan?.backendItems?.length) {
    const riskMap = { low: "baixo", moderate: "moderado", medium: "medio", high: "critico", critical: "critico" };
    return plan.backendItems.map((item, index) => ({
      id: item.actionPlanId,
      actionPlanId: item.actionPlanId,
      documentItemId: item.documentItemId,
      feedbackId: item.feedbackId,
      text: item.question,
      blockTitle: `Não conformidade ${String(index + 1).padStart(2, "0")}`,
      riskLevel: riskMap[item.riskLevel] || "baixo",
      observation: item.observation,
      correction: item.correction,
      evidenceFileIds: item.evidenceFileIds || [],
      responseText: item.responseText || "",
      responseEvidenceFileId: item.responseEvidenceFileId || null
    }));
  }
  const itemCount = Math.max(1, Math.min(Number(count) || 3, 8));
  const rows = reportNcRows(area, itemCount);
  const fallbacks = questionRowsForArea(area).slice(0, itemCount);
  return (rows.length >= itemCount ? rows : [...rows, ...fallbacks.filter((row) => !rows.some((item) => item.id === row.id))]).slice(0, itemCount);
}

function actionPlanInstructionFor(row, index) {
  if (row.correction) return row.correction;
  const instructions = [
    "Realizar a higienização completa do utensílio e revisar a rotina de inspeção antes do uso.",
    "Corrigir a condição identificada, orientar a equipe e registrar a verificação no controle da área.",
    "Adequar o item ao padrão definido e anexar evidência fotográfica após a correção."
  ];
  return instructions[index] || `Corrigir a não conformidade registrada em ${row.blockTitle}.`;
}

function actionPlanResponseEvidence(row, responsibleView, responses, index) {
  const fileId = responsibleView ? responses[index]?.evidenceFileId : row.responseEvidenceFileId;
  if (!fileId) return "";
  const imageUrl = apiUrl(`/api/files/${fileId}/content`);
  return `<figure class="action-plan-response-evidence" data-open-action-plan-image="${escapeHtml(imageUrl)}" role="button" tabindex="0" title="Abrir foto inteira" aria-label="Abrir evidência completa da NC ${index + 1}"><img src="${imageUrl}" alt="Evidência enviada pelo responsável para a NC ${index + 1}" loading="eager" /><figcaption>Evidência enviada pelo responsável</figcaption></figure>`;
}

function actionPlanImageViewer() {
  if (!state.actionPlanImagePreview) return "";
  return `<div class="action-plan-image-viewer-backdrop" data-close-action-plan-image role="presentation"><section class="action-plan-image-viewer" role="dialog" aria-modal="true" aria-label="Evidência fotográfica completa"><button class="panel-close" data-close-action-plan-image type="button" title="Fechar">${icons.close}</button><img src="${escapeHtml(state.actionPlanImagePreview)}" alt="Evidência fotográfica completa" /></section></div>`;
}

function planningItemReview(plan, index, item) {
  const submittedEvidence = actionPlanResponseEvidence(item, false, {}, index);
  const decision = plan.itemDecisions?.[index];
  if (decision) {
    const approved = decision.status === "approved";
    return `${submittedEvidence}<div class="action-plan-item-review is-${approved ? "approved" : "rejected"}"><div><span>Decisão do auditor</span><strong>${approved ? "Evidência aprovada" : "Evidência reprovada"}</strong>${decision.reason ? `<p><b>Justificativa:</b> ${escapeHtml(decision.reason)}</p>` : ""}</div><span class="planning-status is-${approved ? "good" : "danger"}">${approved ? "Aprovada" : "Reprovada"}</span></div>`;
  }
  const hasSubmittedEvidence = Boolean(item?.responseText || item?.responseEvidenceFileId);
  if (plan.status !== "pending_review" || !hasSubmittedEvidence) return submittedEvidence;
  return `${submittedEvidence}<div class="action-plan-item-review is-pending"><div><span>Análise da NC ${String(index + 1).padStart(2, "0")}</span><strong>Aguardando decisão do auditor</strong></div><div class="action-plan-item-actions"><button class="outline-btn is-danger" data-plan-item-decision="rejected" data-plan-id="${escapeHtml(plan.id)}" data-item-index="${index}" type="button">Reprovar evidência</button><button class="primary-btn" data-plan-item-decision="approved" data-plan-id="${escapeHtml(plan.id)}" data-item-index="${index}" type="button">Aprovar evidência</button></div></div>`;
}

function planningDeadlineModal() {
  if (!state.actionDeadlineModal) return "";
  const plan = planningActionRows().find((row) => row.id === state.planningPlanId);
  const items = actionPlanPreviewItems(plan?.area, plan?.ncs || 0, plan);
  return `
    <div class="action-plan-modal-backdrop" role="presentation">
      <section class="action-plan-modal surface" role="dialog" aria-modal="true" aria-labelledby="deadline-modal-title">
        <button class="panel-close" data-close-deadline-modal title="Fechar">${icons.close}</button>
        <span class="eyebrow">Solicitação de prazo</span>
        <h2 id="deadline-modal-title">Solicitar alteração do prazo</h2>
        <p>Explique por que a ação não poderá ser concluída até ${escapeHtml(plan?.due || "o prazo atual")}. O auditor analisará a justificativa antes de validar uma nova data.</p>
        <div class="action-plan-form-grid">
          <label class="action-plan-field is-wide"><span>Motivo da solicitação</span><select data-deadline-reason-type><option>Manutenção ou obra</option><option>Compra de peça ou equipamento</option><option>Contratação de serviço</option><option>Outro motivo</option></select></label>
          <label class="action-plan-field"><span>Novo prazo solicitado</span><input data-deadline-date type="date" min="${new Date().toISOString().slice(0, 10)}" /></label>
          <label class="action-plan-field"><span>Item relacionado</span><select data-deadline-item>${items.map((_, index) => `<option value="${index}">NC ${String(index + 1).padStart(2, "0")}</option>`).join("")}</select></label>
          <label class="action-plan-field is-wide"><span>Justificativa detalhada</span><textarea data-deadline-reason placeholder="Ex.: a substituição da cuba depende da compra da peça e do prazo de instalação do fornecedor."></textarea></label>
          <label class="action-plan-upload is-wide">${svgIcon("document")}<span><strong>Anexar comprovante</strong><small>Orçamento, ordem de serviço, foto ou outro documento</small></span><input type="file" hidden /></label>
        </div>
        <div class="action-plan-modal-actions">
          <button class="outline-btn" data-close-deadline-modal type="button">Cancelar</button>
          <button class="primary-btn" ${isAreaResponsible() ? "data-submit-deadline-request" : "disabled"} type="button" ${isAreaResponsible() ? "" : "title=\"Envio desativado nesta prévia\""}>Enviar solicitação</button>
        </div>
        ${isAreaResponsible() ? "" : '<small class="action-plan-preview-note">Prévia visual: nenhuma solicitação será enviada.</small>'}
      </section>
    </div>
  `;
}

function responsibleAcknowledgementModal(plan) {
  if (!isAreaResponsible() || state.actionPlanConsentId !== plan.id || state.actionPlanAcknowledgements?.[plan.id]) return "";
  return `<div class="action-plan-modal-backdrop" role="presentation"><section class="action-plan-modal surface responsible-consent-modal" role="dialog" aria-modal="true" aria-labelledby="responsible-consent-title"><span class="eyebrow">Ciência do plano de ação</span><h2 id="responsible-consent-title">Confirme o recebimento antes de abrir</h2><p>Declaro que recebi o plano de ação da ${escapeHtml(plan.area.name)}, consultei o prazo e estou ciente das não conformidades e orientações registradas pelo auditor.</p><label class="responsible-consent-check"><input type="checkbox" data-responsible-consent-check /><span>Estou ciente e confirmo o recebimento deste plano.</span></label><div class="action-plan-modal-actions"><button class="outline-btn" data-cancel-responsible-consent type="button">Voltar</button><button class="primary-btn" data-confirm-responsible-consent="${escapeHtml(plan.id)}" type="button" disabled>Assinar e abrir plano</button></div><small class="action-plan-preview-note">A assinatura eletrônica usará o usuário ${escapeHtml(currentAccessUser?.username || "carlos.01")}.</small></section></div>`;
}

function responsiblePlanFooter(plan, items) {
  const responses = state.actionPlanResponses?.[plan.id] || {};
  const answered = items.filter((_, index) => String(responses[index]?.text || "").trim()).length;
  const evidenced = items.filter((_, index) => responses[index]?.evidenceName || responses[index]?.evidenceFileId).length;
  const completed = items.filter((_, index) => String(responses[index]?.text || "").trim() && (responses[index]?.evidenceName || responses[index]?.evidenceFileId)).length;
  const acknowledged = Boolean(state.actionPlanAcknowledgements?.[plan.id]);
  return `<footer class="action-plan-submit-footer is-review"><div><strong>Devolutiva pronta: ${completed}/${items.length}</strong><span>${acknowledged ? `${answered}/${items.length} respostas · ${evidenced}/${items.length} evidências. Preencha os dois campos de cada NC para enviar.` : "Confirme a ciência para responder ao plano."}</span></div><div class="action-plan-admin-actions"><button class="outline-btn" data-open-deadline-modal type="button" ${acknowledged ? "" : "disabled"}>Solicitar novo prazo</button><button class="primary-btn" data-submit-responsible-plan="${escapeHtml(plan.id)}" type="button" ${acknowledged && completed === items.length ? "" : "disabled"}>Enviar devolutiva ao auditor</button></div></footer>`;
}

function planningDecisionModal() {
  if (!state.planningDecisionModal) return "";
  const { planId, decision, itemIndex } = state.planningDecisionModal;
  const plan = planningActionRows().find((row) => row.id === planId);
  if (!plan) return "";
  const isDeadline = decision === "deadline_rejected";
  const isItem = decision === "item_rejected";
  return `
    <div class="action-plan-modal-backdrop" role="presentation">
      <section class="action-plan-modal surface" role="dialog" aria-modal="true" aria-labelledby="decision-modal-title">
        <button class="panel-close" data-close-plan-decision title="Fechar">${icons.close}</button>
        <span class="eyebrow">Decisão do auditor</span>
        <h2 id="decision-modal-title">${isDeadline ? "Recusar solicitação de prazo" : isItem ? `Reprovar evidência da NC ${String(Number(itemIndex) + 1).padStart(2, "0")}` : "Reprovar devolutiva"}</h2>
        <p>${isDeadline ? `Explique por que o novo prazo solicitado para ${escapeHtml(plan.requestedDue || "a data informada")} não será aceito.` : isItem ? "Explique exatamente o que está incompleto nesta evidência e o que o responsável deverá corrigir." : "Informe objetivamente o que precisa ser corrigido ou complementado pelo responsável."}</p>
        <label class="action-plan-field is-wide"><span>Justificativa obrigatória</span><textarea data-plan-decision-reason placeholder="${isDeadline ? "Ex.: o prazo solicitado ultrapassa a próxima auditoria; apresente uma data intermediária e o comprovante do fornecedor." : "Ex.: a evidência não demonstra a correção completa do item e precisa ser refeita."}"></textarea></label>
        <div class="action-plan-modal-error" data-plan-decision-error hidden>Informe a justificativa antes de confirmar.</div>
        <div class="action-plan-modal-actions">
          <button class="outline-btn" data-close-plan-decision type="button">Cancelar</button>
          <button class="primary-btn is-danger" data-confirm-plan-decision="${escapeHtml(decision)}" data-plan-id="${escapeHtml(plan.id)}" data-item-index="${itemIndex ?? ""}" type="button">${isDeadline ? "Confirmar recusa" : "Confirmar reprovação"}</button>
        </div>
      </section>
    </div>`;
}

function planningDeadlineRecord(plan, items = []) {
  if (!plan.deadlineRequested && !plan.deadlineDecision) return "";
  const linkedIndex = Number.isInteger(plan.deadlineItemIndex) ? plan.deadlineItemIndex : 0;
  const linkedItem = items[linkedIndex];
  const linkedLabel = linkedItem ? `NC ${String(linkedIndex + 1).padStart(2, "0")} · ${reportFullText(linkedItem.text)}` : `NC ${String(linkedIndex + 1).padStart(2, "0")}`;
  const decisionCopy = plan.deadlineDecision === "approved"
    ? ["Prazo aprovado", `Novo vencimento confirmado para ${plan.requestedDue || plan.due}.`, "good"]
    : plan.deadlineDecision === "rejected"
      ? ["Prazo recusado", "O prazo anterior foi mantido e o responsável deverá apresentar uma nova solução.", "danger"]
      : ["Aguardando decisão do auditor", "A solicitação ainda não foi aprovada nem recusada.", "warning"];
  return `
    <section class="action-plan-deadline-record">
      <div class="action-plan-deadline-head"><div>${svgIcon("clock")}<span><small>Solicitação registrada na devolutiva</small><strong>Novo prazo solicitado: ${escapeHtml(plan.requestedDue || "Não informado")}</strong></span></div><span class="planning-status is-${decisionCopy[2]}">${decisionCopy[0]}</span></div>
      <div class="action-plan-deadline-grid"><div><span>Observação do responsável</span><p>${escapeHtml(plan.deadlineReason || "Não informada.")}</p></div><div><span>Não conformidade vinculada</span><p>${escapeHtml(linkedLabel)}</p></div></div>
      ${plan.deadlineRequested && !isAreaResponsible() ? `<div class="action-plan-deadline-actions"><span>Decisão do auditor sobre esta solicitação</span><div><button class="outline-btn is-danger" data-plan-decision="deadline_rejected" data-plan-id="${escapeHtml(plan.id)}" type="button">Recusar prazo</button><button class="primary-btn" data-plan-decision="deadline_approved" data-plan-id="${escapeHtml(plan.id)}" type="button">Aprovar novo prazo</button></div></div>` : ""}
      ${plan.deadlineDecision ? `<div class="action-plan-decision-note is-${plan.deadlineDecision}"><strong>Decisão do auditor</strong><span>${escapeHtml(decisionCopy[1])}</span>${plan.decisionReason ? `<p><b>Justificativa:</b> ${escapeHtml(plan.decisionReason)}</p>` : ""}</div>` : ""}
    </section>`;
}

function planningAuditDecisionRecord(plan) {
  if (plan.status !== "rejected" || !plan.decisionReason) return "";
  return `<section class="action-plan-decision-note is-rejected is-document"><strong>Devolutiva reprovada pelo auditor</strong><span>O plano foi devolvido ao responsável para correção.</span><p><b>Justificativa:</b> ${escapeHtml(plan.decisionReason)}</p></section>`;
}

function planningPreviewFooter(plan, itemCount = 0) {
  if (plan.status === "awaiting_send") {
    return `<footer class="action-plan-submit-footer"><div><strong>Rascunho do auditor</strong><span>Somente observação e ação orientada podem ser alteradas antes do envio.</span></div><div class="action-plan-admin-actions"><button class="outline-btn" data-save-action-plan="${escapeHtml(plan.id)}" type="button">Salvar rascunho</button><button class="primary-btn" data-send-action-plan="${escapeHtml(plan.id)}" type="button">Salvar e enviar ao responsável</button></div></footer>`;
  }
  if (plan.deadlineRequested) {
    return `<footer class="action-plan-submit-footer is-review"><div><strong>Solicitação de prazo aguardando decisão</strong><span>A observação do responsável, a NC vinculada e os botões de decisão estão destacados acima.</span></div></footer>`;
  }
  if (plan.status === "pending_review") {
    const decisions = Object.values(plan.itemDecisions || {});
    const approved = decisions.filter((item) => item.status === "approved").length;
    const rejected = decisions.filter((item) => item.status === "rejected").length;
    const complete = itemCount > 0 && decisions.length >= itemCount;
    const extended = plan.deadlineDecision === "approved";
    const summary = extended && !rejected
      ? `${approved} aprovada(s) · prazo prorrogado. O plano continuará aberto até ${escapeHtml(plan.due)}.`
      : `${approved} aprovada(s) · ${rejected} reprovada(s). A notificação será enviada somente após concluir todas as NCs.`;
    const actionLabel = rejected ? "Enviar correções ao responsável" : extended ? "Concluir análise" : "Concluir e aprovar plano";
    return `<footer class="action-plan-submit-footer is-review"><div><strong>Análise da devolutiva: ${decisions.length}/${itemCount}</strong><span>${summary}</span></div><div class="action-plan-admin-actions"><button class="primary-btn" data-finalize-plan-review="${escapeHtml(plan.id)}" type="button" ${complete ? "" : "disabled"}>${complete ? actionLabel : "Analise todas as NCs"}</button></div></footer>`;
  }
  const [label] = planningStatusMeta(plan.status);
  return `<footer class="action-plan-submit-footer"><div><strong>${escapeHtml(label)}</strong><span>${plan.status === "in_progress" ? "Plano enviado e bloqueado para edição. Aguardando devolutiva do responsável." : "Documento encerrado e mantido no histórico da área."}</span></div><div class="action-plan-admin-actions"><span class="planning-status is-${plan.status === "approved" ? "good" : plan.status === "rejected" ? "danger" : "blue"}">${escapeHtml(label)}</span></div></footer>`;
}

function planningPlanPreview() {
  const plan = planningActionRows().find((row) => row.id === state.planningPlanId) || planningActionRows().find((row) => row.area.id === state.planningAreaId) || planningActionRows()[0];
  if (!plan) return emptyDataState("Nenhum plano de ação disponível.");
  const area = plan.area;
  const items = actionPlanPreviewItems(area, plan.ncs, plan);
  const isDraft = plan.status === "awaiting_send";
  const submittedItems = items.filter((item) => item.responseText || item.responseEvidenceFileId).length;
  const hasResponse = submittedItems === items.length && items.length > 0;
  const effectiveStatus = plan.deadlineRequested ? "extension_requested" : plan.status;
  const [statusLabel, statusTone] = planningStatusMeta(effectiveStatus);
  const responsibleView = isAreaResponsible();
  const acknowledgement = state.actionPlanAcknowledgements?.[plan.id];
  const responsibleResponses = state.actionPlanResponses?.[plan.id] || {};
  return `
    <div class="fichario-sub-panel action-plan-preview-shell">
      ${state.planningNotice ? `<div class="planning-flow-notice">${escapeHtml(state.planningNotice)}</div>` : ""}
      <div class="action-plan-preview-toolbar">
        <button class="fichario-sub-action" data-close-action-plan-preview type="button">${svgIcon("arrow", "is-back")} Voltar aos planos</button>
        <span class="planning-status is-${statusTone}">${escapeHtml(statusLabel)}</span>
        ${plan.status === "approved" ? `<button class="fichario-sub-action" data-print-action-plan="${escapeHtml(plan.id)}" type="button">${svgIcon("document")} Abrir PDF</button>` : ""}
      </div>
      ${responsibleView ? `<div class="action-plan-editing-note"><strong>Plano disponível para resposta</strong><span>${acknowledgement ? "Ciência confirmada. Preencha as correções e evidências de cada NC." : "Confirme a ciência para liberar o preenchimento."}</span></div>` : isDraft ? `<div class="action-plan-editing-note"><strong>Modo de edição do auditor</strong><span>Edite somente os campos “Observação do auditor” e “Ação orientada”. Após o envio, o plano será bloqueado.</span></div>` : `<div class="action-plan-locked-note">${svgIcon("shield")}<span><strong>Documento bloqueado para edição</strong><small>${hasResponse ? "Devolutiva assinada pelo responsável e disponível para decisão." : "Plano já enviado ao responsável. Nenhum conteúdo pode ser alterado."}</small></span></div>`}
      <article class="action-plan-document">
        <header class="action-plan-doc-header"><div class="action-plan-brand"><img src="assets/idauditor-logo.png" alt="IDAuditor" /><span>Gestão de auditorias</span></div><div><span>PLANO DE AÇÃO VIGENTE</span><strong>${escapeHtml(plan.publicCode || plan.id)}</strong></div></header>
        <section class="action-plan-title-block"><div><span class="eyebrow">Área auditada</span><h1>${escapeHtml(area.name)}</h1><p>Plano emitido em ${escapeHtml(plan.generatedAt ? new Date(plan.generatedAt).toLocaleString("pt-BR") : "data não registrada")}</p></div><img src="assets/icons/${area.icon}" alt="" /></section>
        <section class="action-plan-meta-grid"><div><span>Responsável</span><strong>${escapeHtml(plan.owner)}</strong></div><div><span>Auditor</span><strong>${escapeHtml(plan.auditorName)}</strong></div><div><span>Emitido em</span><strong>${escapeHtml(plan.generatedAt ? new Date(plan.generatedAt).toLocaleDateString("pt-BR") : "Não registrado")}</strong></div><div><span>Prazo atual</span><strong>${escapeHtml(plan.due)}</strong></div></section>
        <section class="action-plan-instructions"><div class="action-plan-section-icon">${svgIcon("idea")}</div><div><h2>Como responder este plano</h2><ol><li>Leia cada não conformidade e a orientação registrada pelo auditor.</li><li>Realize a correção e descreva objetivamente o que foi feito.</li><li>Anexe uma foto tirada agora ou escolha um arquivo do aparelho.</li><li>Se o prazo não for suficiente, solicite uma nova data vinculada à NC correspondente.</li><li>Revise todas as respostas antes de assinar e enviar a devolutiva.</li></ol></div></section>
        <section class="action-plan-summary-row"><div><strong>${items.length}</strong><span>não conformidades</span></div><div><strong>${items.length}</strong><span>evidências esperadas</span></div><div><strong>${hasResponse ? "Respondido" : escapeHtml(plan.due || "Não definido")}</strong><span>${hasResponse ? "pelo responsável" : "prazo para resposta"}</span></div><button class="outline-btn" ${responsibleView && acknowledgement ? "data-open-deadline-modal" : ""} type="button" ${responsibleView && acknowledgement || hasResponse ? "" : "disabled"}>${svgIcon("clock")} ${plan.deadlineRequested ? "Prazo solicitado" : "Solicitar novo prazo"}</button></section>
        ${planningDeadlineRecord(plan, items)}
        <div class="action-plan-nc-list">
          ${items.map((row, index) => `<section class="action-plan-nc-card"><div class="action-plan-nc-heading"><span class="action-plan-nc-number">NC ${String(index + 1).padStart(2, "0")}</span><div><small>${escapeHtml(row.blockTitle)}</small><h2>${escapeHtml(reportFullText(row.text))}</h2></div>${reportRiskTag(row.riskLevel)}</div><div class="action-plan-nc-body">${row.evidenceFileIds?.[0] ? `<figure class="action-plan-source-photo"><img src="${apiUrl(`/api/files/${row.evidenceFileIds[0]}/content`)}" alt="Evidência original da não conformidade ${index + 1}" /><figcaption>Foto registrada pelo auditor</figcaption></figure>` : '<div class="action-plan-pending-signature"><strong>Sem foto vinculada</strong><small>A evidência original não foi encontrada.</small></div>'}<div class="action-plan-auditor-copy"><label><span>Observação do auditor</span><textarea ${isDraft ? "" : "readonly"}>${escapeHtml(row.observation || "Sem observação adicional.")}</textarea></label><label><span>Ação orientada</span><textarea ${isDraft ? "" : "readonly"}>${escapeHtml(actionPlanInstructionFor(row, index))}</textarea></label></div></div><div class="action-plan-response-box ${row.responseText || row.responseEvidenceFileId ? "has-response" : ""}"><label class="action-plan-field is-wide"><span>O que foi realizado? · preenchimento do responsável</span><textarea ${responsibleView && acknowledgement ? `data-responsible-response="${index}"` : "readonly"} placeholder="Aguardando resposta do responsável...">${responsibleView ? escapeHtml(responsibleResponses[index]?.text || "") : escapeHtml(row.responseText || "")}</textarea></label><div class="action-plan-evidence-actions">${responsibleView && acknowledgement ? `<label class="outline-btn">${svgIcon("camera")} Tirar foto<input data-responsible-evidence="${index}" data-capture="camera" type="file" accept="image/*" capture="environment" hidden /></label><label class="outline-btn">${svgIcon("document")} Escolher arquivo<input data-responsible-evidence="${index}" type="file" accept="image/*" hidden /></label><small>${responsibleResponses[index]?.evidenceName || responsibleResponses[index]?.evidenceFileId ? `Evidência: ${escapeHtml(responsibleResponses[index]?.evidenceName || "arquivo enviado")}` : "Nenhuma evidência selecionada"}</small>` : `<small class="action-plan-awaiting-copy">${row.responseText || row.responseEvidenceFileId ? "Devolutiva recebida e disponível para análise." : "Aguardando devolutiva do responsável."}</small>`}</div></div>${responsibleView ? "" : planningItemReview(plan, index, row)}</section>`).join("")}
        </div>
        ${planningAuditDecisionRecord(plan)}
        <section class="action-plan-signature-section"><div><span class="eyebrow">Documento emitido por</span><div class="action-plan-auditor-signature"><strong>${escapeHtml(plan.auditorName)}</strong><span>Auditor responsável</span><small>Registro autenticado no sistema</small></div></div>${acknowledgement ? `<div><span class="eyebrow">Ciência e assinatura do responsável</span><div class="action-plan-auditor-signature is-responsible"><strong>${escapeHtml(acknowledgement.name || plan.owner)}</strong><span>Responsável pela área</span><small>Ciência registrada em ${escapeHtml(acknowledgement.signedAtLabel)}</small></div></div>` : `<div class="action-plan-pending-signature"><span class="eyebrow">Ciência do responsável</span><strong>Aguardando abertura e assinatura</strong><small>O registro será feito quando o responsável confirmar o recebimento.</small></div>`}</section>
        ${responsibleView ? responsiblePlanFooter(plan, items) : planningPreviewFooter(plan, items.length)}
      </article>
      ${planningDeadlineModal()}
      ${planningDecisionModal()}
      ${responsibleAcknowledgementModal(plan)}
      ${actionPlanImageViewer()}
    </div>`;
}

async function savePlanningDraft(plan) {
  if (!plan?.documentId || !plan.backendItems?.length) throw new Error("Plano não vinculado ao banco de dados.");
  const cards = [...document.querySelectorAll(".action-plan-preview-shell .action-plan-nc-card")];
  if (cards.length !== plan.backendItems.length) throw new Error("Os itens do plano não foram carregados por completo.");
  const items = cards.map((card, index) => {
    const fields = card.querySelectorAll(".action-plan-auditor-copy textarea");
    return {
      itemId: plan.backendItems[index].documentItemId,
      auditorNotes: fields[0]?.value.trim() || "",
      requiredCorrection: fields[1]?.value.trim() || ""
    };
  });
  if (items.some((item) => !item.itemId || !item.requiredCorrection)) throw new Error("Preencha a ação orientada de cada NC.");
  await operationalRequest(`action-plan-documents/${plan.documentId}/items`, { method: "PATCH", body: JSON.stringify({ items }) });
  await loadOperationalData();
}

function planningPlansContent() {
  if (state.actionPlanPreview) return planningPlanPreview();
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
      ${state.planningNotice ? `<div class="planning-flow-notice">${escapeHtml(state.planningNotice)}</div>` : ""}
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
      ${state.planningNotice ? `<div class="planning-flow-notice">${escapeHtml(state.planningNotice)}</div>` : ""}
      <div class="fichario-sub-head"><div><h2>Devolutivas</h2><p>Fila do auditor para revisar evidências, justificar reprovação e reabrir o plano quando a regra permitir.</p></div><button class="fichario-sub-action is-primary" type="button">Ver todas</button></div>
      <div class="planning-feedback-list">
        ${rows.map((row) => {
          const [label, tone] = planningStatusMeta(row.deadlineRequested ? "extension_requested" : row.status);
          return `
            <div class="planning-feedback-row">
              <div class="planning-feedback-icon">${assetIcon("action", "blue", "planning-icon")}</div>
              <div><strong>${escapeHtml(row.title)}</strong><span>${escapeHtml(row.area.name)} · ${escapeHtml(row.owner)} · ${row.attempts} tentativa(s)</span></div>
              <span class="planning-status is-${tone}">${escapeHtml(label)}</span>
              <button class="fichario-sub-action" data-open-action-plan-preview="${escapeHtml(row.id)}" type="button">${row.deadlineRequested ? "Analisar prazo" : "Analisar"}</button>
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
      ${state.planningNotice ? `<div class="planning-flow-notice">${escapeHtml(state.planningNotice)}</div>` : ""}
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
  if (state.actionPlanPreview) return planningPlanPreview();
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
  const visibleTabs = isAreaResponsible() ? planningTabs.filter(([id]) => id !== "rules") : planningTabs;
  return `
    <section class="fichario-module planning-module">
      <div class="fichario-module-head"><span class="eyebrow">Planejamento</span><h1 class="panel-title">Planos de ação</h1><p class="panel-subtitle">Gestão dos planos vigentes, devolutivas, aprovações, reprovações e regras de prazo. A visão conversa com o painel inicial, relatórios e notas por área.</p></div>
      <div class="fichario-sub-tabs" role="tablist">${visibleTabs.map(([id, label]) => `<button class="fichario-sub-tab ${state.planningView === id ? "is-active" : ""}" data-planning-view="${id}" type="button">${label}</button>`).join("")}</div>
      ${planningContent()}
    </section>
  `;
}

function addPlanningNotification(type, plan, title, body, direction = "received") {
  accessNotifications = [{
    id: `local-${type}-${plan.id}-${Date.now()}`,
    notification_type: direction === "sent" ? `${type}_sent` : type,
    entity_type: "action_plan",
    entity_id: plan.id,
    title,
    body,
    created_at: new Date().toISOString(),
    read_at: null
  }, ...accessNotifications];
}

function updatePlanningPlan(planId, values) {
  state.planningPlanOverrides = {
    ...(state.planningPlanOverrides || {}),
    [planId]: { ...(state.planningPlanOverrides?.[planId] || {}), ...values }
  };
}

function setPlanningNotice(message = "") {
  if (planningNoticeTimer) clearTimeout(planningNoticeTimer);
  state.planningNotice = message;
  planningNoticeTimer = null;
  if (!message) return;
  planningNoticeTimer = setTimeout(() => {
    if (state.planningNotice !== message) return;
    state.planningNotice = "";
    planningNoticeTimer = null;
    render();
  }, 3800);
}

async function applyPlanningDecision(plan, decision, reason = "") {
  if (decision === "approved" || decision === "rejected") {
    updatePlanningPlan(plan.id, { status: decision, decisionReason: reason, source: `Decidido em ${new Date().toLocaleString("pt-BR")}` });
    setPlanningNotice(`Devolutiva de ${plan.area.name} ${decision === "approved" ? "aprovada e encerrada" : "reprovada e devolvida com justificativa"}.`);
    addPlanningNotification(`action_plan_${decision}`, plan, `Devolutiva ${decision === "approved" ? "aprovada" : "reprovada"} - ${plan.area.name}`, reason || "A decisão do auditor foi registrada no histórico do plano.", "sent");
    state.planningView = "history";
  } else {
    const approved = decision === "deadline_approved";
    const deadlineItem = plan.backendItems?.find((item) => item.deadlineRequested) || plan.backendItems?.[0];
    if (location.protocol !== "file:" && deadlineItem?.actionPlanId) {
      try {
        await operationalRequest(`action-plans/${deadlineItem.actionPlanId}/deadline-review`, {
          method: "POST",
          body: JSON.stringify({
            feedbackId: deadlineItem.feedbackId,
            decision: approved ? "approved" : "rejected",
            justification: reason || null
          })
        });
        await Promise.all([loadOperationalData(), loadAccessNotifications()]);
      } catch (error) {
        setPlanningNotice(error.message);
        return;
      }
    }
    updatePlanningPlan(plan.id, {
      status: plan.status === "pending_review" ? "pending_review" : "in_progress",
      deadlineRequested: false,
      deadlineDecision: approved ? "approved" : "rejected",
      decisionReason: reason,
      due: approved ? (plan.requestedDue || plan.due) : plan.due,
      source: approved ? "Novo prazo aprovado" : "Novo prazo recusado"
    });
    setPlanningNotice(`Solicitação de prazo de ${plan.area.name} ${approved ? "aprovada" : "recusada com justificativa"}.`);
    addPlanningNotification("action_plan_deadline_decided", plan, `Prazo ${approved ? "aprovado" : "recusado"} - ${plan.area.name}`, approved ? `Novo vencimento: ${plan.requestedDue || plan.due}.` : reason, "sent");
    state.planningView = "feedback";
    state.actionPlanPreview = true;
    state.actionDeadlineModal = false;
    state.planningDecisionModal = false;
    return;
  }
  state.actionPlanPreview = false;
  state.actionDeadlineModal = false;
  state.planningDecisionModal = false;
  state.planningAreaId = "";
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
      <div data-offline-status>${offlineStatusNotice()}</div>
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

function advanceAuditQuestion(questionId, stayOnCurrent = false) {
  const area = areaById(state.selectedArea);
  const blocks = blocksForArea(area);
  const blockIndex = blocks.findIndex((block) => block.id === state.checklistBlock);
  const currentBlock = blocks[blockIndex];
  const questionIndex = currentBlock?.questions.findIndex((question) => question.id === questionId) ?? -1;
  let targetQuestionId = questionId;

  if (!stayOnCurrent && questionIndex >= 0) {
    const nextQuestion = currentBlock.questions[questionIndex + 1];
    if (nextQuestion) {
      targetQuestionId = nextQuestion.id;
      state.checklistPage = Math.floor((questionIndex + 1) / 3);
    } else {
      const nextBlock = blocks.slice(blockIndex + 1).find((block) => block.questions.some((question) => !state.answers?.[area.id]?.[question.id]));
      if (nextBlock) {
        state.checklistBlock = nextBlock.id;
        state.checklistPage = 0;
        targetQuestionId = nextBlock.questions.find((question) => !state.answers?.[area.id]?.[question.id])?.id || nextBlock.questions[0]?.id;
      }
    }
  }

  render();
  requestAnimationFrame(() => {
    const target = document.querySelector(`[data-question-card="${CSS.escape(targetQuestionId || questionId)}"]`) || document.querySelector(".audit-pager");
    target?.scrollIntoView({ block: "center", behavior: "smooth" });
  });
}

document.addEventListener("click", async (event) => {
  const openActionPlanImage = event.target.closest("[data-open-action-plan-image]");
  if (openActionPlanImage) {
    state.actionPlanImagePreview = openActionPlanImage.dataset.openActionPlanImage;
    render();
    requestAnimationFrame(() => document.querySelector(".action-plan-image-viewer .panel-close")?.focus());
    return;
  }

  const closeActionPlanImage = event.target.closest("[data-close-action-plan-image]");
  if (closeActionPlanImage && (event.target === closeActionPlanImage || closeActionPlanImage.matches("button"))) {
    state.actionPlanImagePreview = "";
    render();
    return;
  }

  const usernameChoice = event.target.closest("[data-username-suggestion]");
  if (usernameChoice) {
    const form = usernameChoice.closest("[data-access-user-form]");
    form.elements.username.value = usernameChoice.dataset.usernameSuggestion;
    form.elements.username.focus();
    return;
  }

  if (event.target.closest("[data-locked-module], [data-locked-area]")) {
    accessNotice = { type: "error", text: "Este acesso pertence somente ao administrador ou ao responsável da área indicada." };
    render();
    return;
  }

  const notificationsToggle = event.target.closest("[data-notifications-toggle]");
  if (notificationsToggle) {
    notificationsOpen = !notificationsOpen;
    if (notificationsOpen) {
      loadAccessNotifications().catch(() => {}).finally(() => render());
    } else render();
    return;
  }

  const notificationItem = event.target.closest("[data-notification-id]");
  if (notificationItem) {
    const id = notificationItem.dataset.notificationId;
    const item = accessNotifications.find((entry) => entry.id === id);
    if (item && !item.read_at) item.read_at = new Date().toISOString();
    accessRequest(`notifications/${id}/read`, { method: "POST", body: "{}" }).catch(() => {});
    const destination = notificationItem.dataset.notificationView || "home";
    if (destination === "users" && currentAccessUser?.role !== "admin") state.view = "home";
    else state.view = destination;
    if (state.view === "users") { state.settingsUserView = "active"; state.settingsUsersExpanded = true; }
    if (state.view === "actions") {
      setPlanningNotice();
      state.planningDecisionModal = false;
      state.actionDeadlineModal = false;
      state.planningView = notificationItem.dataset.notificationPlanningView || "plans";
      const planId = notificationItem.dataset.notificationPlanId;
      const plan = planFromNotificationEntity(planId);
      if (plan) {
        state.planningPlanId = plan.id;
        state.planningAreaId = plan.area.id;
        state.actionPlanPreview = true;
        if (isAreaResponsible() && !state.actionPlanAcknowledgements?.[plan.id]) state.actionPlanConsentId = plan.id;
      }
    }
    notificationsOpen = false;
    syncHashWithView(state.view);
    render();
    if (state.view === "actions" && state.actionPlanPreview) {
      requestAnimationFrame(() => {
        const target = document.querySelector(".action-plan-deadline-record") || document.querySelector(".action-plan-preview-shell");
        target?.scrollIntoView({ block: "center", behavior: "smooth" });
      });
    }
    return;
  }

  if (event.target.closest("[data-notifications-read-all]")) {
    accessNotifications.forEach((item) => { item.read_at ||= new Date().toISOString(); });
    accessRequest("notifications/read-all", { method: "POST", body: "{}" }).catch(() => {});
    render();
    return;
  }

  if (notificationsOpen && !event.target.closest(".notifications-popover")) {
    notificationsOpen = false;
    render();
    return;
  }

  const logout = event.target.closest("[data-access-logout]");
  if (logout) {
    resetViewForFreshLogin();
    saveState();
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
    if (!moduleAllowed(nextView)) return;
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
    ensureLocalAudit(state.selectedArea).catch((error) => {
      setOfflineNotice({ phase: "error", message: error.message });
    });
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
    const storedUrl = reportAction.dataset.reportUrl;
    if (storedUrl) {
      const resolvedUrl = storedUrl.startsWith("/") ? `${nativeApiOrigin}${storedUrl}` : storedUrl;
      if (actionMode === "open") window.open(resolvedUrl, "_blank");
      else {
        const link = document.createElement("a");
        link.href = resolvedUrl;
        link.download = "";
        link.click();
      }
      return;
    }
    accessNotice = { type: "success", text: "O relatório ainda está sendo preparado. Ele será liberado assim que o PDF estiver arquivado." };
    render();
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
    setPlanningNotice();
    state.actionPlanPreview = false;
    state.actionDeadlineModal = false;
    state.planningDecisionModal = false;
    state.planningView = planningView.dataset.planningView;
    state.planningStatusFilter = "";
    if (state.planningView !== "history") state.planningAreaId = "";
    state.view = "actions";
    syncHashWithView("actions");
    render();
    return;
  }

  const openActionPlanPreview = event.target.closest("[data-open-action-plan-preview]");
  if (openActionPlanPreview) {
    const plan = planningActionRows().find((row) => row.id === openActionPlanPreview.dataset.openActionPlanPreview) || planningActionRows()[0];
    state.planningPlanId = plan.id;
    state.planningAreaId = plan.area.id;
    setPlanningNotice();
    state.actionPlanPreview = true;
    state.actionDeadlineModal = false;
    state.planningDecisionModal = false;
    if (isAreaResponsible() && !state.actionPlanAcknowledgements?.[plan.id]) state.actionPlanConsentId = plan.id;
    render();
    requestAnimationFrame(() => document.querySelector(".action-plan-preview-shell")?.scrollIntoView({ block: "start" }));
    return;
  }

  if (event.target.closest("[data-cancel-responsible-consent]")) {
    state.actionPlanConsentId = "";
    state.actionPlanPreview = false;
    render();
    return;
  }

  const confirmResponsibleConsent = event.target.closest("[data-confirm-responsible-consent]");
  if (confirmResponsibleConsent) {
    const planId = confirmResponsibleConsent.dataset.confirmResponsibleConsent;
    const plan = planningActionRows().find((row) => row.id === planId);
    if (plan?.documentId && location.protocol !== "file:") {
      try {
        await operationalRequest(`action-plan-documents/${plan.documentId}/acknowledge`, { method: "POST", body: "{}" });
      } catch (error) {
        setPlanningNotice(error.message);
        render();
        return;
      }
    }
    const now = new Date();
    state.actionPlanAcknowledgements = {
      ...state.actionPlanAcknowledgements,
      [planId]: {
        userId: currentAccessUser?.id || "",
        name: currentAccessUser?.full_name || "Responsável",
        signedAt: now.toISOString(),
        signedAtLabel: `${now.toLocaleDateString("pt-BR")} às ${now.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}`
      }
    };
    state.actionPlanConsentId = "";
    setPlanningNotice("Ciência registrada. O plano está liberado para resposta.");
    render();
    return;
  }

  const submitDeadlineRequest = event.target.closest("[data-submit-deadline-request]");
  if (submitDeadlineRequest) {
    const plan = planningActionRows().find((row) => row.id === state.planningPlanId);
    const dateValue = document.querySelector("[data-deadline-date]")?.value;
    const reason = document.querySelector("[data-deadline-reason]")?.value.trim();
    const itemValue = document.querySelector("[data-deadline-item]")?.value || "all";
    if (!plan || !dateValue || !reason) {
      document.querySelector("[data-deadline-reason]")?.focus();
      return;
    }
    const [year, month, day] = dateValue.split("-");
    const requestedDue = `${day}/${month}/${year}`;
    const selectedItemIndex = itemValue === "all" ? 0 : Number(itemValue);
    const selectedItem = plan.backendItems?.[selectedItemIndex] || plan.backendItems?.[0];
    if (location.protocol !== "file:") {
      try {
        await operationalRequest(`action-plans/${selectedItem?.actionPlanId || plan.id}/feedback`, {
          method: "POST",
          body: JSON.stringify({
            documentItemId: selectedItem?.documentItemId,
            completionStatus: "delayed",
            delayJustification: reason,
            requestedDueAt: `${dateValue}T12:00:00.000Z`,
            observation: document.querySelector("[data-deadline-reason-type]")?.value || "Solicitação de novo prazo"
          })
        });
        await Promise.all([loadOperationalData(), loadAccessNotifications()]);
      } catch (error) {
        setPlanningNotice(error.message);
        render();
        return;
      }
    }
    updatePlanningPlan(plan.id, {
      status: "in_progress",
      responsibleSubmitted: false,
      deadlineRequested: true,
      requestedDue,
      deadlineReason: reason,
      deadlineItemIndex: itemValue === "all" ? null : Number(itemValue),
      source: `Novo prazo solicitado por ${currentAccessUser?.full_name || "Responsável"}`
    });
    state.actionDeadlineModal = false;
    setPlanningNotice(`Solicitação de prazo até ${requestedDue} enviada ao auditor.`);
    render();
    return;
  }

  const submitResponsiblePlan = event.target.closest("[data-submit-responsible-plan]");
  if (submitResponsiblePlan) {
    const plan = planningActionRows().find((row) => row.id === submitResponsiblePlan.dataset.submitResponsiblePlan);
    if (!plan) return;
    const items = actionPlanPreviewItems(plan.area, plan.ncs, plan);
    const responses = state.actionPlanResponses?.[plan.id] || {};
    if (items.some((_, index) => !String(responses[index]?.text || "").trim() || !(responses[index]?.evidenceName || responses[index]?.evidenceFileId))) {
      setPlanningNotice("Preencha a correção e anexe uma evidência em cada não conformidade antes de enviar.");
      render();
      return;
    }
    if (location.protocol !== "file:") {
      try {
        for (const [index, item] of items.entries()) {
          const evidenceFile = pendingActionPlanEvidence.get(`${plan.id}:${index}`);
          let evidenceFileId = responses[index]?.evidenceFileId || null;
          if (evidenceFile) {
            const deviceUid = await window.HAE_OFFLINE.deviceUid();
            const upload = await fetch(apiUrl("/api/offline-files"), {
              method: "POST",
              credentials: apiCredentials,
              headers: {
                "content-type": evidenceFile.type || "application/octet-stream",
                "x-device-uid": deviceUid,
                "x-local-file-id": `plan-${item.actionPlanId}-${Date.now()}-${index}`,
                "x-file-name": evidenceFile.name,
                "x-file-type": "action_plan_photo"
              },
              body: evidenceFile
            });
            const uploaded = await upload.json().catch(() => ({}));
            if (!upload.ok) throw new Error(uploaded.error || "Não foi possível enviar a evidência.");
            evidenceFileId = uploaded.file.id;
          }
          await operationalRequest(`action-plans/${item.actionPlanId}/feedback`, {
            method: "POST",
            body: JSON.stringify({
              documentItemId: item.documentItemId,
              correctionSummary: responses[index]?.text,
              observation: responses[index]?.text,
              evidenceFileId,
              completionStatus: "completed",
              captureMethod: evidenceFile?.type?.startsWith("image/") ? "mobile_camera" : "upload"
            })
          });
          pendingActionPlanEvidence.delete(`${plan.id}:${index}`);
        }
        await Promise.all([loadOperationalData(), loadAccessNotifications()]);
      } catch (error) {
        setPlanningNotice(error.message);
        render();
        return;
      }
    }
    updatePlanningPlan(plan.id, {
      status: "pending_review",
      responsibleSubmitted: true,
      source: `Devolutiva enviada por ${currentAccessUser?.full_name || "Responsável"}`
    });
    state.actionPlanPreview = false;
    state.planningView = "overview";
    setPlanningNotice(`Devolutiva de ${plan.area.name} enviada para análise do auditor.`);
    render();
    return;
  }

  if (event.target.closest("[data-print-action-plan]")) {
    const button = event.target.closest("[data-print-action-plan]");
    const plan = planningActionRows().find((row) => row.id === button.dataset.printActionPlan);
    if (!plan || plan.status !== "approved") return;
    const pdfWindow = prepareReportPdfWindow();
    openActionPlanPdf(plan, pdfWindow).catch((error) => {
      if (pdfWindow) pdfWindow.close();
      setPlanningNotice(error.message || "Não foi possível gerar o PDF do plano de ação.");
      render();
    });
    return;
  }

  const saveActionPlan = event.target.closest("[data-save-action-plan]");
  if (saveActionPlan) {
    const plan = planningActionRows().find((row) => row.id === saveActionPlan.dataset.saveActionPlan);
    if (plan) {
      try {
        await savePlanningDraft(plan);
        setPlanningNotice(`Rascunho de ${plan.area.name} salvo no banco. O plano continua aguardando envio.`);
      } catch (error) { setPlanningNotice(error.message); }
    }
    render();
    return;
  }

  const sendActionPlan = event.target.closest("[data-send-action-plan]");
  if (sendActionPlan) {
    const plan = planningActionRows().find((row) => row.id === sendActionPlan.dataset.sendActionPlan);
    if (plan) {
      if (plan.documentId && location.protocol !== "file:") {
        try {
          if (sendActionPlan.closest(".action-plan-document")) await savePlanningDraft(plan);
          await operationalRequest(`action-plan-documents/${plan.documentId}/send`, { method: "POST", body: "{}" });
          await Promise.all([loadOperationalData(), loadAccessNotifications()]);
        } catch (error) {
          setPlanningNotice(error.message);
          render();
          return;
        }
      }
      const sentFromPreview = Boolean(sendActionPlan.closest(".action-plan-document"));
      updatePlanningPlan(plan.id, { status: "in_progress", source: `Enviado em ${new Date().toLocaleString("pt-BR")}` });
      if (sentFromPreview) state.actionPlanPreview = false;
      setPlanningNotice(`Plano de ${plan.area.name} enviado.`);
      addPlanningNotification("action_plan", plan, `Plano enviado - ${plan.area.name}`, `O plano foi disponibilizado para ${plan.owner}.`, "sent");
    }
    render();
    return;
  }

  const planDecision = event.target.closest("[data-plan-decision]");
  if (planDecision) {
    const plan = planningActionRows().find((row) => row.id === planDecision.dataset.planId);
    const decision = planDecision.dataset.planDecision;
    if (plan) {
      if (decision === "rejected" || decision === "deadline_rejected") {
        state.planningDecisionModal = { planId: plan.id, decision };
        render();
        requestAnimationFrame(() => document.querySelector("[data-plan-decision-reason]")?.focus());
        return;
      }
      await applyPlanningDecision(plan, decision);
    }
    render();
    return;
  }

  const itemDecision = event.target.closest("[data-plan-item-decision]");
  if (itemDecision) {
    const plan = planningActionRows().find((row) => row.id === itemDecision.dataset.planId);
    const itemIndex = Number(itemDecision.dataset.itemIndex);
    if (plan && itemDecision.dataset.planItemDecision === "rejected") {
      state.planningDecisionModal = { planId: plan.id, decision: "item_rejected", itemIndex };
      render();
      requestAnimationFrame(() => document.querySelector("[data-plan-decision-reason]")?.focus());
      return;
    }
    if (plan) {
      const backendItem = plan.backendItems?.[itemIndex];
      if (location.protocol !== "file:") {
        try {
          await operationalRequest(`action-plans/${backendItem?.actionPlanId || plan.id}/review`, {
            method: "POST",
            body: JSON.stringify({ documentItemId: backendItem?.documentItemId, feedbackId: backendItem?.feedbackId, decision: "approved", justification: "Evidência aprovada pelo auditor." })
          });
          await Promise.all([loadOperationalData(), loadAccessNotifications()]);
        } catch (error) {
          setPlanningNotice(error.message);
          render();
          return;
        }
      }
      updatePlanningPlan(plan.id, { itemDecisions: { ...(plan.itemDecisions || {}), [itemIndex]: { status: "approved" } } });
      setPlanningNotice(`NC ${String(itemIndex + 1).padStart(2, "0")} aprovada. Continue a análise das demais evidências.`);
    }
    render();
    return;
  }

  const confirmPlanDecision = event.target.closest("[data-confirm-plan-decision]");
  if (confirmPlanDecision) {
    const plan = planningActionRows().find((row) => row.id === confirmPlanDecision.dataset.planId);
    const reason = document.querySelector("[data-plan-decision-reason]")?.value.trim() || "";
    if (!reason) {
      const error = document.querySelector("[data-plan-decision-error]");
      if (error) error.hidden = false;
      document.querySelector("[data-plan-decision-reason]")?.focus();
      return;
    }
    if (plan && confirmPlanDecision.dataset.confirmPlanDecision === "item_rejected") {
      const itemIndex = Number(confirmPlanDecision.dataset.itemIndex);
      const backendItem = plan.backendItems?.[itemIndex];
      if (location.protocol !== "file:") {
        try {
          await operationalRequest(`action-plans/${backendItem?.actionPlanId || plan.id}/review`, {
            method: "POST",
            body: JSON.stringify({ documentItemId: backendItem?.documentItemId, feedbackId: backendItem?.feedbackId, decision: "rejected", justification: reason, allowResubmission: true })
          });
          await Promise.all([loadOperationalData(), loadAccessNotifications()]);
        } catch (error) {
          setPlanningNotice(error.message);
          render();
          return;
        }
      }
      updatePlanningPlan(plan.id, { itemDecisions: { ...(plan.itemDecisions || {}), [itemIndex]: { status: "rejected", reason } } });
      state.planningDecisionModal = false;
      setPlanningNotice(`NC ${String(itemIndex + 1).padStart(2, "0")} reprovada com justificativa. Continue a análise.`);
    } else if (plan) await applyPlanningDecision(plan, confirmPlanDecision.dataset.confirmPlanDecision, reason);
    render();
    return;
  }

  const finalizePlanReview = event.target.closest("[data-finalize-plan-review]");
  if (finalizePlanReview) {
    const plan = planningActionRows().find((row) => row.id === finalizePlanReview.dataset.finalizePlanReview);
    if (plan) {
      const items = actionPlanPreviewItems(plan.area, plan.ncs);
      const decisions = Object.values(plan.itemDecisions || {});
      if (decisions.length < items.length) return;
      const rejected = decisions.filter((item) => item.status === "rejected");
      const extended = plan.deadlineDecision === "approved";
      const status = rejected.length ? "needs_correction" : extended ? "in_progress" : "approved";
      const source = extended && !rejected ? `Prazo prorrogado até ${plan.due}` : `Análise concluída em ${new Date().toLocaleString("pt-BR")}`;
      updatePlanningPlan(plan.id, { status, source });
      setPlanningNotice(rejected.length
        ? `${rejected.length} NC(s) devolvida(s) ao responsável para correção.`
        : extended
          ? `Análise concluída. O plano de ${plan.area.name} continuará aberto até ${plan.due}.`
          : `Todas as evidências de ${plan.area.name} foram aprovadas.`);
      addPlanningNotification(
        "action_plan_review_completed",
        plan,
        rejected.length ? `Correções solicitadas - ${plan.area.name}` : extended ? `Prazo prorrogado - ${plan.area.name}` : `Plano aprovado - ${plan.area.name}`,
        rejected.length ? "A análise foi concluída. Somente as NCs reprovadas deverão ser corrigidas." : extended ? `A análise foi concluída e o plano continuará em andamento até ${plan.due}.` : "Todas as evidências foram aprovadas e o plano foi encerrado.",
        "sent"
      );
      state.actionPlanPreview = false;
      state.planningView = rejected.length || extended ? "plans" : "history";
      state.planningAreaId = "";
    }
    render();
    return;
  }

  if (event.target.closest("[data-close-plan-decision]")) {
    state.planningDecisionModal = false;
    render();
    return;
  }

  if (event.target.closest("[data-close-action-plan-preview]")) {
    state.actionPlanPreview = false;
    state.actionDeadlineModal = false;
    state.planningDecisionModal = false;
    state.actionPlanImagePreview = "";
    state.actionPlanConsentId = "";
    render();
    return;
  }

  if (event.target.closest("[data-open-deadline-modal]")) {
    state.actionDeadlineModal = true;
    render();
    requestAnimationFrame(() => document.querySelector(".action-plan-modal textarea")?.focus());
    return;
  }

  if (event.target.closest("[data-close-deadline-modal]")) {
    state.actionDeadlineModal = false;
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

  if (event.target.closest("[data-open-evidence-gallery]")) {
    state.detailEvidenceOpen = true;
    render();
    return;
  }

  if (event.target.closest("[data-close-evidence-gallery]")) {
    state.detailEvidenceOpen = false;
    render();
    return;
  }

  const openAreaPlan = event.target.closest("[data-open-area-plan]");
  if (openAreaPlan) {
    const areaId = openAreaPlan.dataset.openAreaPlan;
    const plan = planningActionRows().find((row) => row.area.id === areaId && !["approved", "rejected"].includes(row.status)) || planningActionRows().find((row) => row.area.id === areaId);
    state.view = "actions";
    state.planningView = "plans";
    state.planningAreaId = areaId;
    state.detailEvidenceOpen = false;
    if (plan) {
      state.planningPlanId = plan.id;
      state.actionPlanPreview = true;
      if (isAreaResponsible() && !state.actionPlanAcknowledgements?.[plan.id]) state.actionPlanConsentId = plan.id;
    }
    syncHashWithView("actions");
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
    if (window.matchMedia("(max-width: 1180px)").matches) state.checklistBlocksOpen = false;
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
    const questionId = answer.dataset.question;
    const answerValue = answer.dataset.answer;
    state.answers = {
      ...state.answers,
      [areaId]: {
        ...(state.answers[areaId] || {}),
        [questionId]: answerValue
      }
    };
    advanceAuditQuestion(questionId, answerValue === "NC");
    queueChecklistAnswer(areaId, questionId, answerValue, state.auditNotes?.[areaId]?.[questionId] || "").catch((error) => {
      setOfflineNotice({ phase: "error", message: error.message });
    });
    return;
  }

  const completeEvidence = event.target.closest("[data-complete-audit-evidence]");
  if (completeEvidence) {
    advanceAuditQuestion(completeEvidence.dataset.completeAuditEvidence);
    return;
  }

  const nextChecklistBlock = event.target.closest("[data-next-checklist-block]");
  if (nextChecklistBlock) {
    state.checklistBlock = nextChecklistBlock.dataset.nextChecklistBlock;
    state.checklistPage = 0;
    state.actionPlanNoticeQuestion = null;
    render();
    requestAnimationFrame(() => document.querySelector(".audit-progress-panel")?.scrollIntoView({ block: "start", behavior: "smooth" }));
    return;
  }

  if (event.target.closest("[data-finalize-audit]")) {
    const areaId = state.selectedArea;
    const area = areaById(areaId);
    const questions = questionsForArea(area);
    const answered = answersForArea(areaId);
    const missing = questions.filter((question) => !answered[question.id]).length;
    if (missing) {
      setOfflineNotice({ phase: "error", message: `Ainda faltam ${missing} perguntas para finalizar.` });
      return;
    }
    const missingEvidence = questions.filter((question) => answered[question.id] === "NC" && !state.auditEvidence?.[areaId]?.[question.id]);
    if (missingEvidence.length) {
      const pendingQuestion = missingEvidence[0];
      const pendingBlock = blocksForArea(area).find((block) => (block.questions || []).some((question) => question.id === pendingQuestion.id));
      const questionIndex = Math.max(0, (pendingBlock?.questions || []).findIndex((question) => question.id === pendingQuestion.id));
      if (pendingBlock) state.checklistBlock = pendingBlock.id;
      state.checklistPage = Math.floor(questionIndex / 3);
      state.actionPlanNoticeQuestion = null;
      setOfflineNotice({ phase: "error", message: `Anexe a foto obrigatória desta não conformidade. Ainda ${missingEvidence.length === 1 ? "falta 1 foto" : `faltam ${missingEvidence.length} fotos`}.` });
      render();
      requestAnimationFrame(() => document.querySelector(`[data-question-card="${CSS.escape(pendingQuestion.id)}"]`)?.scrollIntoView({ block: "center", behavior: "smooth" }));
      return;
    }
    state.auditFinalizeModal = true;
    render();
    return;
  }

  if (event.target.closest("[data-cancel-finalize-audit]")) {
    state.auditFinalizeModal = false;
    render();
    return;
  }

  const confirmFinalize = event.target.closest("[data-confirm-finalize-mode]");
  if (confirmFinalize) {
    const areaId = state.selectedArea;
    const generationMode = confirmFinalize.dataset.confirmFinalizeMode;
    confirmFinalize.disabled = true;
    try {
      await waitForAuditWrites(areaId);
      const audit = await ensureLocalAudit(areaId);
      await window.HAE_OFFLINE.queueAuditFinalize({
        localAuditId: audit.localAuditId,
        finishedAt: new Date().toISOString(),
        generationMode
      });
      state.auditFinalizeModal = false;
      state.offlineAudits = {
        ...state.offlineAudits,
        [areaId]: { ...state.offlineAudits[areaId], status: "finalizing", finishedAt: new Date().toISOString(), generationMode }
      };
      state.view = "start";
      saveState();
      render();
      window.HAE_OFFLINE.syncPending().catch(() => {});
    } catch (error) {
      state.auditFinalizeModal = false;
      setOfflineNotice({ phase: "error", message: error.message });
      render();
    }
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
  const consent = event.target.closest("[data-responsible-consent-check]");
  if (consent) {
    const button = document.querySelector("[data-confirm-responsible-consent]");
    if (button) button.disabled = !consent.checked;
    return;
  }

  const responsibleEvidence = event.target.closest("[data-responsible-evidence]");
  if (responsibleEvidence?.files?.[0]) {
    const planId = state.planningPlanId;
    const itemIndex = responsibleEvidence.dataset.responsibleEvidence;
    const file = responsibleEvidence.files[0];
    if (file.size > 10 * 1024 * 1024) {
      setOfflineNotice({ phase: "error", message: "A evidência deve ter no máximo 10 MB." });
      return;
    }
    pendingActionPlanEvidence.set(`${planId}:${itemIndex}`, file);
    state.actionPlanResponses = {
      ...state.actionPlanResponses,
      [planId]: {
        ...(state.actionPlanResponses?.[planId] || {}),
        [itemIndex]: { ...(state.actionPlanResponses?.[planId]?.[itemIndex] || {}), evidenceName: file.name, evidenceSize: file.size }
      }
    };
    saveState();
    render();
    return;
  }

  const reportArea = event.target.closest("[data-report-area-select]");
  if (reportArea) {
    state.selectedArea = reportArea.value;
    render();
  }

  const note = event.target.closest("[data-audit-note]");
  if (note) {
    const areaId = state.selectedArea;
    const questionId = note.dataset.auditNote;
    state.auditNotes = {
      ...state.auditNotes,
      [areaId]: { ...(state.auditNotes[areaId] || {}), [questionId]: note.value }
    };
    saveState();
    const answer = state.answers?.[areaId]?.[questionId];
    if (answer) {
      queueChecklistAnswer(areaId, questionId, answer, note.value).catch((error) => {
        setOfflineNotice({ phase: "error", message: error.message });
      });
    }
  }

  const evidence = event.target.closest("[data-evidence-file]");
  if (evidence?.files?.[0]) {
    const file = evidence.files[0];
    const areaId = state.selectedArea;
    const questionId = evidence.dataset.evidenceFile;
    if (file.size > 10 * 1024 * 1024) {
      setOfflineNotice({ phase: "error", message: "A foto deve ter no máximo 10 MB." });
      evidence.value = "";
      return;
    }
    const previous = pendingAuditWrites.get(areaId) || Promise.resolve();
    const write = previous.catch(() => {}).then(async () => {
        const audit = await ensureLocalAudit(areaId);
        const backendQuestionId = backendQuestionIds.get(`${areaId}:${questionId}`);
        if (!backendQuestionId) throw new Error("Pergunta não vinculada ao checklist do banco de dados.");
        if (!state.answers?.[areaId]?.[questionId]) throw new Error("Marque a resposta antes de anexar a foto.");
        await window.HAE_OFFLINE.queueFileUpload(file, {
          localAuditId: audit.localAuditId,
          questionId: backendQuestionId,
          entityType: "audit_answer",
          fileType: "audit_photo",
          caption: state.auditNotes?.[areaId]?.[questionId] || null,
          captureMethod: evidence.dataset.captureMethod || "gallery"
        });
        state.auditEvidence = {
          ...state.auditEvidence,
          [areaId]: { ...(state.auditEvidence?.[areaId] || {}), [questionId]: true }
        };
        saveState();
        render();
        requestAnimationFrame(() => document.querySelector(`[data-question-card="${CSS.escape(questionId)}"]`)?.scrollIntoView({ block: "center", behavior: "smooth" }));
      });
    pendingAuditWrites.set(areaId, write);
    write
      .catch((error) => setOfflineNotice({ phase: "error", message: error.message }))
      .finally(() => {
        if (pendingAuditWrites.get(areaId) === write) pendingAuditWrites.delete(areaId);
      });
  }

});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && state.actionPlanImagePreview) {
    state.actionPlanImagePreview = "";
    render();
    return;
  }
  const imageTrigger = event.target.closest?.("[data-open-action-plan-image]");
  if (imageTrigger && (event.key === "Enter" || event.key === " ")) {
    event.preventDefault();
    state.actionPlanImagePreview = imageTrigger.dataset.openActionPlanImage;
    render();
    requestAnimationFrame(() => document.querySelector(".action-plan-image-viewer .panel-close")?.focus());
  }
});

document.addEventListener("input", (event) => {
  if (event.target.matches('[data-access-user-form] [name="fullName"]')) {
    refreshUsernameSuggestions(event.target.form);
    return;
  }
  const response = event.target.closest("[data-responsible-response]");
  if (!response) return;
  const planId = state.planningPlanId;
  const itemIndex = response.dataset.responsibleResponse;
  state.actionPlanResponses = {
    ...state.actionPlanResponses,
    [planId]: {
      ...(state.actionPlanResponses?.[planId] || {}),
      [itemIndex]: { ...(state.actionPlanResponses?.[planId]?.[itemIndex] || {}), text: response.value }
    }
  };
  saveState();
  const currentPlan = planningActionRows().find((row) => row.id === planId);
  const items = actionPlanPreviewItems(areaById(state.planningAreaId), currentPlan?.ncs || 0, currentPlan);
  const complete = items.every((_, index) => {
    const item = state.actionPlanResponses?.[planId]?.[index];
    return String(item?.text || "").trim() && (item?.evidenceName || item?.evidenceFileId);
  });
  const submit = document.querySelector(`[data-submit-responsible-plan="${CSS.escape(planId)}"]`);
  if (submit) submit.disabled = !complete;
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
    updateStartupProgress(15, "Validando o acesso...");
    if (location.protocol === "file:") {
      currentAccessUser = { full_name: "Administrador local", role: "admin" };
      render();
      await loadOfflineBootstrap();
      return;
    }
    try {
      const data = await accessRequest("me");
      updateStartupProgress(35, "Carregando seu perfil...");
      currentAccessUser = data.user;
      if (currentAccessUser.must_change_password) {
        updateStartupProgress(100, "Abrindo o acesso...");
        await nativeStartupDelay(850);
        location.replace("/login.html");
        return;
      }
      localStorage.setItem("idauditor-offline-user", JSON.stringify(currentAccessUser));
      const freshLogin = sessionStorage.getItem("idauditor-fresh-login");
      if (freshLogin) {
        resetViewForFreshLogin();
        sessionStorage.removeItem("idauditor-fresh-login");
      }
      if (window.HAE_OFFLINE) {
        await window.HAE_OFFLINE.configure({
          userScope: currentAccessUser.id,
          backendUrl: window.Capacitor?.isNativePlatform?.() ? "https://hae-auditoria-prototipo.onrender.com" : location.origin
        });
      }
      await Promise.all([
        currentAccessUser.role === "admin" ? loadAccessUsers() : Promise.resolve(),
        loadAccessNotifications(),
        loadOfflineBootstrap()
      ]);
      updateStartupProgress(78, "Sincronizando checklists e notificações...");
      await loadOperationalData();
      updateStartupProgress(94, "Preparando o painel...");
    } catch (error) {
      const cached = JSON.parse(localStorage.getItem("idauditor-offline-user") || "null");
      if (error.status === 401 || !cached) {
        updateStartupProgress(100, "Abrindo o acesso...");
        await nativeStartupDelay(850);
        location.replace("/login.html");
        return;
      }
      currentAccessUser = cached;
      accessNotice = { type: "success", text: "Modo offline: os dados coletados serão sincronizados quando a conexão voltar." };
    }
    applyCurrentUserScope();
    if (state.view === "users" && currentAccessUser.role !== "admin") state.view = "home";
    render();
    updateStartupProgress(100, "Dados sincronizados");
    registerServiceWorker();
  })();
}
