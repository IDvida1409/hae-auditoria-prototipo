# Revisao da estrutura - 20/09/2026

## Conclusao executiva

O projeto ja possui uma base tecnica relevante, mas ainda nao esta pronto para operar
auditorias reais de ponta a ponta. Login, administracao inicial de usuarios, central de
notificacoes e coleta offline do checklist estao conectados ao PostgreSQL. O restante do
painel ainda mistura dados fixos e o estado global `/api/state` com entidades operacionais.

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
- Bootstrap offline autenticado com as 12 areas, checklists, blocos e 437 perguntas.
- Inicio da auditoria, respostas, observacoes, fotos e finalizacao ligados a fila offline.
- Validacao de preenchimento completo antes de finalizar a auditoria.
- APIs estruturadas configuradas para ativacao no Render com sessao obrigatoria.
- APIs operacionais temporariamente restritas ao administrador ate a definicao final
  de areas/subareas e da matriz de acesso dos demais perfis.

## Implementado parcialmente

- **Usuarios e permissoes:** os perfis existem e o menu Usuarios e restrito ao admin,
  mas a matriz de acesso por area, tela e operacao ainda nao e aplicada no servidor.
- **Notificacoes:** senha funciona de ponta a ponta; os destinos de plano, auditoria e
  relatorio existem na interface, mas nem todos os eventos de negocio sao gerados.
- **Offline:** checklist, observacoes, fotos e finalizacao usam `HAE_OFFLINE`, com estados
  automaticos de conexao e sincronizacao. Falta homologar a sessao nativa no novo APK,
  troca de usuario, armazenamento cheio e conflitos no aparelho real.
- **Auditorias:** existem endpoints reais, mas o painel continua usando dados de exemplo
  e o snapshot global em grande parte das telas.
- **Planos de acao:** banco, estados e endpoints basicos existem; documento, ciencia,
  regras, evidencias, prazos e revisao ainda nao formam um fluxo unico completo.
- **Relatorios:** ha worker e PDF testados localmente; o Render nao esta com esse fluxo
  operacional ativado e a biblioteca visual ainda usa arquivos estaticos de exemplo.
- **Aplicativo:** o APK funciona como embalagem do prototipo, mas ainda nao e o cliente
  offline autenticado e sincronizado que sera homologado no celular e no tablet.

## Pendencias bloqueadoras

1. Definir e implementar a matriz de acesso por perfil, unidade, area e operacao quando
   a estrutura real de areas e subareas for entregue pela responsavel do projeto.
2. Substituir o snapshot global `/api/state` pelas entidades operacionais; o endpoint
   ja exige a sessao nova, mas continua compartilhando um unico documento entre usuarios.
3. Confirmar a ativacao publica das APIs estruturadas apos o deploy desta versao.
4. Definir a geracao unica de planos para cada NC na finalizacao da auditoria.
5. Unificar qualquer cliente futuro no mesmo fluxo offline de finalizacao e nota.
6. Definir e implementar as regras completas do plano de acao: responsavel, inicio do
   prazo, tentativas, atraso, reabertura, aprovacao/reprovacao, ciencia e impacto futuro.
7. Completar anexos de devolutiva offline e autorizacao de leitura dos arquivos.
8. Gerar todos os eventos reais de notificacao e atualizar as telas apos sincronizar.
9. Ligar dashboard, graficos, auditorias, documentos e relatorios aos dados reais.
10. Configurar sessao offline e isolamento dos dados quando o aparelho trocar de usuario.
11. Homologar persistencia, backup/restauracao, PDF no Render, carga e concorrencia.

## Situacao publica verificada

- `/api/health`: PostgreSQL ativo; 11 migrations; ultima `011_user_access_workflow.sql`.
- `/api/access/me`: exige login e retorna 401 sem sessao.
- `/api/offline-bootstrap`: preparado para ativacao publica neste deploy e protegido por sessao.
- `/api/state`: exige a sessao nova, mas ainda contem um snapshot demonstrativo compartilhado.

## Ordem recomendada

1. Regras e fluxo completo do plano de acao.
2. Matriz de acesso por area/subarea apos recebimento da hierarquia definitiva.
3. Dashboard, graficos, documentos, relatorios e notificacoes com dados reais.
4. Gerar novo APK e homologar no celular e no tablet: offline, reconexao, reinicio,
   fotos, conflitos, armazenamento cheio e troca de usuario.
5. Backup/restauracao, seguranca, carga e liberacao operacional.

## Testes finais ainda reservados

Os testes de negocio completos devem ocorrer quando as telas estiverem ligadas as APIs
e o novo APK estiver instalado. Mesmo assim, testes automaticos de regressao devem
continuar sendo executados durante a implementacao para nao acumular defeitos ate o fim.
