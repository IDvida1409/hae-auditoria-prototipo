(function exposeAreaHierarchy(root, factory) {
  const hierarchy = factory();
  if (typeof module === "object" && module.exports) module.exports = hierarchy;
  if (root) root.HAE_AREA_HIERARCHY = hierarchy;
})(typeof globalThis !== "undefined" ? globalThis : this, function buildAreaHierarchy() {
  const groups = [
    {
      id: "despensa",
      name: "Despensa",
      icon: "area-despensa.png",
      subareas: [
        ["recebimento", "Recebimento", "Recebimento de materiais e insumos", "subarea-recebimento.png"],
        ["armazenamento", "Armazenamento", "Armazenamento e conservação", "subarea-armazenamento.png"]
      ]
    },
    {
      id: "refeitorio",
      name: "Refeitório",
      icon: "area-refeitorio.png",
      subareas: [
        ["pre-preparo-vegetais", "Pré-preparo de Vegetais", "Pré-preparo de vegetais", "subarea-pre-preparo-vegetais.png"],
        ["pre-preparo-carnes", "Pré-preparo de Carnes", "Pré-preparo de carnes", "subarea-pre-preparo-carnes.png"],
        ["separacao", "Separação", "Separação e organização", "subarea-separacao.png"],
        ["cozinha-central-apoio", "Cozinha Central de Apoio", "Produção central de apoio", "subarea-cozinha-central-apoio.png"],
        ["distribuicao", "Distribuição REF", "Distribuição do refeitório", "distribuicao.png"],
        ["higienizacao-louca", "Higiene de Louças REF", "Higiene de louças do refeitório", "higienizacao-louca.png"]
      ]
    },
    {
      id: "cozinha-pacientes",
      name: "Cozinha de Pacientes",
      icon: "area-cozinha-pacientes.png",
      subareas: [
        ["cozinha-sarp", "Cozinha SARP", "Produção quente e preparo", "cozinha-sarp.png"],
        ["cozinha-fria-sarp", "Cozinha Fria SARP", "Preparo frio e conservação", "cozinha-fria-sarp.png"],
        ["cozinha-pedido-especial", "Cozinha Especiais SARP", "Dietas e preparações especiais", "cozinha-pedido-especial.png"],
        ["distribuicao-sarp", "Distribuição SARP", "Distribuição de refeições SARP", "distribuicao.png"],
        ["higiene-loucas-sarp", "Higiene de Louças SARP", "Higiene de louças SARP", "higienizacao-louca.png"]
      ]
    },
    {
      id: "conforto-medico",
      name: "Conforto Médico",
      icon: "area-conforto-medico.png",
      subareas: [
        ["cozinha-catering", "Cozinha Catering", "Preparo de refeições e distribuição", "cozinha-catering.png"],
        ["room-service", "Room Service", "Serviço de quarto e atendimento", "room-service.png"],
        ["saladas", "Saladas", "Preparo de saladas e alimentos frios", "saladas.png"],
        ["espaco-gourmet", "Espaço Gourmet", "Atendimento do espaço gourmet", "subarea-espaco-gourmet.png"],
        ["centro-cirurgico-6d", "Centro Cirúrgico 6D", "Atendimento do Centro Cirúrgico 6D", "subarea-centro-cirurgico-6d.png"],
        ["centro-cirurgico-g1", "Centro Cirúrgico G1", "Atendimento do Centro Cirúrgico G1", "subarea-centro-cirurgico-g1.png"],
        ["einstein-plus", "Einstein+", "Atendimento Einstein+", "subarea-einstein-plus.png"],
        ["copa-presidencia", "Copa Presidência", "Atendimento da Copa Presidência", "subarea-copa-presidencia.png"]
      ]
    },
    {
      id: "mda",
      name: "MDA",
      icon: "area-mda.png",
      subareas: [
        ["mda-cafeteria", "MDA Cafeteria", "Operação da cafeteria MDA", "subarea-mda-cafeteria.png"],
        ["mda-endoscopia", "MDA Endoscopia", "Atendimento da endoscopia MDA", "subarea-mda-endoscopia.png"]
      ]
    },
    {
      id: "limpeza-asg",
      name: "Limpeza ASG",
      icon: "area-limpeza-asg.png",
      subareas: [
        ["higiene-caixas", "Higiene de Caixas", "Higiene de caixas", "subarea-higiene-caixas.png"],
        ["higienizacao-cubas", "Higiene de Cubas", "Higiene de cubas e utensílios", "higienizacao-cubas.png"],
        ["dml-1-andar", "DML 1º Andar", "Depósito de material de limpeza do 1º andar", "dml-produto-quimico.png"],
        ["dml-2-andar", "DML 2º Andar", "Depósito de material de limpeza do 2º andar", "dml-produto-quimico.png"]
      ]
    }
  ];

  const normalizedGroups = groups.map((group) => ({
    ...group,
    subareaIds: group.subareas.map(([id]) => id)
  }));
  const groupById = (id) => normalizedGroups.find((group) => group.id === id) || null;
  const groupForSubarea = (id) => normalizedGroups.find((group) => group.subareaIds.includes(id)) || null;
  const allSubareaIds = () => normalizedGroups.flatMap((group) => group.subareaIds);
  const standaloneIds = ["area-residuos", "documentacao"];
  const classifyArea = (id) => {
    const group = groupById(id);
    if (group) return { kind: "group", group };
    const parent = groupForSubarea(id);
    if (parent) return { kind: "subarea", group: parent };
    if (standaloneIds.includes(id)) return { kind: "standalone", group: null };
    return { kind: "unknown", group: null };
  };

  return { groups: normalizedGroups, standaloneIds, groupById, groupForSubarea, allSubareaIds, classifyArea };
});
