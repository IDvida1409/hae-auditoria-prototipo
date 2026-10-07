(function (root) {
  const sections = [
    {
      id: "identificacao", number: 1, title: "Identificação do serviço",
      questions: [
        { id: "q1", refs: "1.4", text: "Quem este serviço se propõe a atender e quem, na prática, consegue ser atendido aqui? Há necessidades que chegam à clínica, mas que sua estrutura não permite acolher?" },
        { id: "q2", refs: "1.6", text: "O que a participação de profissionais de diferentes áreas muda na compreensão e no cuidado de uma pessoa? Quando há interpretações diferentes, como a equipe decide um caminho sem reduzi-la a uma soma de pareceres?" }
      ]
    },
    {
      id: "atendimento", number: 2, title: "Caracterização do atendimento",
      questions: [
        { id: "q3", refs: "2.3–2.4", text: "Quais faixas etárias e demandas vocês atendem com mais frequência? Em quais situações a queixa apresentada inicialmente não expressa toda a complexidade do que a pessoa está vivendo?" },
        { id: "q4", refs: "2.5–2.6", text: "Como as pessoas chegam ao serviço? Quando o pedido parte de outra pessoa ou instituição, como você identifica a demanda de quem será atendido? Que critérios orientam o acolhimento, a triagem e a prioridade?" },
        { id: "q5", refs: "2.1", text: "Qual abordagem teórica predomina no seu trabalho? Quando a situação envolve sofrimento psíquico, relações familiares e condições sociais ou de saúde, como você dialoga com outros saberes sem perder os fundamentos da sua abordagem nem apenas misturar técnicas?" },
        { id: "q6", refs: "2.2", text: "Como vocês decidem qual forma de cuidado faz mais sentido para cada pessoa? O que pesa na escolha da modalidade? Já ocorreu de a modalidade disponível não ser a mais adequada?" }
      ]
    },
    {
      id: "organizacao", number: 3, title: "Organização do trabalho clínico",
      questions: [
        { id: "q7", refs: "3.1; 3.4", text: "Você pode percorrer comigo o caminho de um atendimento, desde a chegada até o encerramento? Quem participa das decisões sobre objetivos, frequência e duração das sessões, mudança de rumo e término do processo?" },
        { id: "q8", refs: "3.2–3.3", text: "Na triagem e na avaliação inicial, o que você precisa compreender antes de propor uma direção de trabalho? Quais instrumentos usa de fato, o que eles ajudam a perceber e o que podem deixar de fora?" },
        { id: "q9", refs: "3.5", text: "O que precisa ficar registrado para sustentar a continuidade do cuidado? Como são feitos e guardados os registros ou prontuários, inclusive nos sistemas usados pela clínica?" },
        { id: "q10", refs: "3.6", text: "Como você percebe que uma necessidade ultrapassa o atendimento oferecido? O que define um encaminhamento dentro da instituição ou para outro serviço, e como se evita que a pessoa se perca nessa passagem?" }
      ]
    },
    {
      id: "pratica", number: 4, title: "Prática clínica e manejo",
      questions: [
        { id: "q11", refs: "4.1", text: "Quais estratégias terapêuticas você utiliza mais frequentemente? O que faz você manter uma estratégia, adaptá-la ou abandoná-la quando ela não está ajudando aquela pessoa?" },
        { id: "q12", refs: "4.2–4.3", text: "Sem identificar pacientes, pense numa situação em que sua compreensão inicial precisou ser revista. O que mostrou que ela era insuficiente? Que tipos de situação se repetem na clínica e exigem atenção especial ou um manejo mais complexo?" },
        { id: "q13", refs: "4.4", text: "Que recursos da clínica ampliam suas possibilidades de cuidado e que limites as restringem? Quando uma necessidade clínica entra em conflito com tempo, vagas, regras ou recursos disponíveis, como você decide o que é possível fazer?" },
        { id: "q14", refs: "4.5", text: "Quando o cuidado depende também da saúde, assistência social, escola ou justiça, como essa articulação acontece de fato? O que favorece a continuidade do cuidado e o que costuma dificultá-la?" }
      ]
    },
    {
      id: "etica", number: 5, title: "Aspectos éticos e legais",
      questions: [
        { id: "q15", refs: "5.1", text: "Como você decide o que pode ser compartilhado com a equipe ou com a rede de apoio e o que deve permanecer em sigilo? Como a confidencialidade é protegida nas conversas, nos encaminhamentos e nos registros?" },
        { id: "q16", refs: "5.2–5.3", text: "Diante de uma situação de risco ou violação de direitos, como você decide quem acionar e quais informações comunicar? Que normas, legislação e princípios éticos orientam essa decisão?" }
      ]
    }
  ];
  const choices = {
    serviceType: ["Clínica-escola", "Consultório particular", "Ambulatório", "CAPS", "Hospital", "Outro"],
    ageRanges: ["Crianças", "Adolescentes", "Adultos", "Pessoas idosas", "Outro"],
    approach: ["Psicanálise", "TCC", "Humanista", "Sistêmica", "Fenomenológica", "Integrativa", "Outra"],
    modalities: ["Individual", "Grupal", "Familiar", "Casal", "Online", "Presencial", "Avaliação psicológica", "Outra"],
    accessPaths: ["Procura espontânea", "Encaminhamento", "Via judicial", "Rede de saúde", "Escola", "Outra"],
    instruments: ["Entrevista", "Anamnese", "Testes", "Escalas", "Outros"]
  };
  const schema = { sections, choices, version: 1 };
  if (typeof module !== "undefined" && module.exports) module.exports = schema;
  if (root) root.CLINICAL_INTERVIEW_SCHEMA = schema;
})(typeof window !== "undefined" ? window : null);
