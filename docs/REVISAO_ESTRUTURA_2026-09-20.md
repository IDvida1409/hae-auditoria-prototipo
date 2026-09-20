# Revisao da estrutura - 20/09/2026

## Conclusao executiva

O projeto ja possui uma base tecnica relevante, mas ainda nao esta pronto para operar
auditorias reais de ponta a ponta. Login, administracao inicial de usuarios e central de
notificacoes estao conectados ao PostgreSQL. O restante do painel ainda mistura telas de
prototipo, dados fixos e o estado global `/api/state` com APIs operacionais preparadas,
mas desligadas no Render.

Nao falta apenas ligar botoes. Antes dos testes finais em celular e tablet, ainda e
necessario fechar autorizacao, ligar o checklist ao banco e ao armazenamento offline,
unificar a finalizacao da auditoria e completar o plano de acao.

## Confirmado como implementado

- PostgreSQL do Render ativo, com 11 migrations aplicadas.
- Modelagem para organizacoes, unidades, usuarios, areas, checklists, auditorias,
  respostas, arquivos, planos de acao, relatorios, notificacoes e sincronizacao.
- Login real por usuario e senha, cookie HttpOnly, primeiro acesso, troca obrigatoria
  de senha, logout e inativacao de usuario.
- Cadastro de usuario restrito ao administrador e codigo temporario gerado pelo sistema.
- Solicitacao de redefinicao de senha sem e-mail, com notificacao para administradores.
- Modal de notificacoes conectado ao banco, leitura individual/geral e destinos por tipo.
- Identidade e logo da unidade no login.
- Checklist de referencia com 12 areas e 437 perguntas no importador.
- IndexedDB e fila offline com ordem, dependencias, reenvio idempotente, fotos locais,
  retry e eventos de status.
- Backend para auditorias, respostas, arquivos privados, agregados, documentos,
  configuracoes, jobs e historico de relatorios.
- Projeto Android Capacitor e APK de teste ja compilado para celular.
- Data do painel calculada pelo calendario local do aparelho, sem texto fixo.

## Implementado parcialmente

- **Usuarios e permissoes:** os perfis existem e o menu Usuarios e restrito ao admin,
  mas a matriz de acesso por area, tela e operacao ainda nao e aplicada no servidor.
- **Notificacoes:** senha funciona de ponta a ponta; os destinos de plano, auditoria e
  relatorio existem na interface, mas nem todos os eventos de negocio sao gerados.
- **Offline:** a infraestrutura local e do backend existe, mas as telas do checklist
  ainda nao gravam por `HAE_OFFLINE` nem exibem o ciclo completo de sincronizacao.
- **Auditorias:** existem endpoints reais, mas o painel continua usando dados de exemplo
  e o snapshot global em grande parte das telas.
- **Planos de acao:** banco, estados e endpoints basicos existem; documento, ciencia,
  regras, evidencias, prazos e revisao ainda nao formam um fluxo unico completo.
- **Relatorios:** ha worker e PDF testados localmente; o Render nao esta com esse fluxo
  operacional ativado e a biblioteca visual ainda usa arquivos estaticos de exemplo.
- **Aplicativo:** o APK funciona como embalagem do prototipo, mas ainda nao e o cliente
  offline autenticado e sincronizado que sera homologado no celular e no tablet.

## Pendencias bloqueadoras

1. Definir e implementar a matriz de acesso por perfil, unidade, area e operacao.
2. Substituir o snapshot global `/api/state` pelas entidades operacionais; o endpoint
   ja exige a sessao nova, mas continua compartilhando um unico documento entre usuarios.
4. Ativar as APIs estruturadas somente depois dessa autorizacao; hoje o Render retorna
   503 intencionalmente para elas (`STRUCTURED_APIS_ENABLED=false`).
5. Fazer checklist, fotos e finalizacao usarem banco/IndexedDB em vez do estado demonstrativo.
6. Unificar finalizacao online e offline, validando perguntas obrigatorias, nota,
   idempotencia e geracao unica de planos para cada NC.
7. Definir e implementar as regras completas do plano de acao: responsavel, inicio do
   prazo, tentativas, atraso, reabertura, aprovacao/reprovacao, ciencia e impacto futuro.
8. Completar anexos de devolutiva offline e autorizacao de leitura dos arquivos.
9. Gerar todos os eventos reais de notificacao e atualizar as telas apos sincronizar.
10. Ligar dashboard, graficos, auditorias, documentos e relatorios aos dados reais.
11. Configurar sessao offline e isolamento dos dados quando o aparelho trocar de usuario.
12. Homologar persistencia, backup/restauracao, PDF no Render, carga e concorrencia.

## Situacao publica verificada

- `/api/health`: PostgreSQL ativo; 11 migrations; ultima `011_user_access_workflow.sql`.
- `/api/access/me`: exige login e retorna 401 sem sessao.
- `/api/bootstrap`: retorna 503 porque as APIs operacionais continuam desativadas.
- `/api/state`: exige a sessao nova, mas ainda contem um snapshot demonstrativo compartilhado.

## Ordem recomendada

1. Matriz de acesso e autorizacao real das APIs.
2. Integracao do checklist com banco, IndexedDB, fotos e sincronizacao visivel.
3. Finalizacao unica da auditoria e calculo definitivo da nota.
4. Regras e fluxo completo do plano de acao.
5. Dashboard, graficos, documentos, relatorios e notificacoes com dados reais.
6. Gerar novo APK e homologar no celular e no tablet: offline, reconexao, reinicio,
   fotos, conflitos, armazenamento cheio e troca de usuario.
7. Backup/restauracao, seguranca, carga e liberacao operacional.

## Testes finais ainda reservados

Os testes de negocio completos devem ocorrer quando as telas estiverem ligadas as APIs
e o novo APK estiver instalado. Mesmo assim, testes automaticos de regressao devem
continuar sendo executados durante a implementacao para nao acumular defeitos ate o fim.
