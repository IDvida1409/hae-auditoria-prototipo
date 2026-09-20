# Auditoria da estrutura solicitada - 2026-09-17

## Conclusao

A estrutura nao esta concluida para uso real. Existe uma base relacional e modulos
funcionais testados, mas o painel e o APK ainda operam como prototipos. Nao falta
apenas conectar botoes. Ha servicos ausentes, inconsistencias de fluxo e protecoes
obrigatorias antes da ativacao publica das novas APIs.

Esta revisao nao alterou implementacoes nem publicou codigo. Somente este documento
foi criado. As verificacoes remotas citadas abaixo foram feitas na publicacao anterior;
esta auditoria repetiu os testes locais, sem consultar dados privados do Render.

## Metodo e limites

- Revisao de server.js, lib/, offline-store.js, app.js, sw.js, migrations/ e builds.
- Testes de integridade: 11 aprovados nesta revisao.
- Integracao HTTP com PostgreSQL real isolado: aprovada nesta revisao.
- Chromium real com IndexedDB e API simulada: aprovado nesta revisao.
- Nao foi executado teste em aparelho Android real, carga, restauracao de backup,
  isolamento multiusuario completo ou geracao de PDF no Render.
- Os testes atuais nao equivalem a homologacao de todos os endpoints.

## Inventario de entrega

| Parte solicitada | O que existe | O que falta |
| --- | --- | --- |
| Banco de dados | 8 migrations, chaves estrangeiras, indices, tabelas de auditorias, usuarios, permissoes, arquivos, planos, relatorios e fila | Validacao completa das regras, isolamento por unidade e usuario, importacao confirmada no banco hospedado, backup/restauracao |
| Migrations | Transacoes, controle de versao e trava entre processos | Verificar recuperacao operacional e plano de rollback; nao ha rotina de restauracao homologada |
| Checklists | Importador; 12 areas e 437 perguntas confirmadas em banco de teste | Confirmar conteudo do banco Render; mudancas e administracao de checklists ainda nao sao fluxo completo |
| Auditorias | Criacao, respostas, consulta, revisoes e finalizacao reais | Permissoes, validacao de completude, tratamento uniforme de encerramento e criacao de planos online/offline |
| Usuarios | Cadastro/consulta/edicao por API; tabelas de perfis e permissoes | Senhas, convites, primeiro acesso, recuperacao, administracao das permissoes e ligacao dos formularios |
| Login | Endpoint provisoria por email; token armazenado como hash; expiracao e revogacao | Conferencia de senha, tela de login, protecao das rotas, armazenamento seguro de sessao e limitacao de tentativas |
| Offline local | IndexedDB v2; gravacao atomica de operacao/resposta/foto; snapshots e cache de bootstrap | Telas nao chamam essas rotinas; dados nao separados por usuario; quota, atualizacao e migracao no Android nao homologadas |
| Sincronizacao | Fila ordenada, dependencias, reenvio idempotente, upload binario, confirmacao transacional, retry e eventos | Integracao com APK, mensagens visiveis, atualizacao das telas, politica de sessao offline e testes reais de interrupcao |
| Conflitos | Revisao de resposta e API manter servidor/dispositivo | Interface, cobertura de outros tipos de conflito e politica aprovada; revisao e opcional no payload |
| Fotos/arquivos | Binario real privado, checksum, limite 15 MB, deduplicacao e download do remetente | Fotos nas devolutivas offline, acesso para destinatarios autorizados, validacao do conteudo real, limpeza/retencao e backup |
| Plano de acao | Tabelas amplas; geracao basica online; feedback e revisao; feedback textual offline | Regras definitivas, geracao uniforme, documentos, envio, ciencia, tokens, prazos, historico e impacto funcionando de ponta a ponta |
| Relatorios | Worker, PDF real com evidencias, jobs, falhas, reexecucao e historico de arquivos | Chromium no Render, ativacao segura, template aprovado do painel e testes de todos os periodos/tipos |
| Documentos | APIs criar/consultar/editar certificados e requisitos; referencias por unidade | Fluxo completo de anexos, vencimento, alertas e telas conectadas |
| Configuracoes | Persistencia geral e por area por API | Fazer auditoria/planos respeitarem todas as configuracoes; tela ainda usa prototipo |
| Notificacoes | Leitura e marcar lida; eventos de relatorio pronto, finalizacao offline e feedback offline | Eventos online equivalentes, prazo, aprovacao/reprovacao, documentos e canais externos se forem solicitados |
| Painel | Atualizacoes visuais publicadas; API de agregados reais existe | Painel ainda usa dados de exemplo e estado global; nao consome dashboard real |
| APK | Empacotamento do painel e inclusao do modulo offline | URL e autenticacao do backend, ligacao dos fluxos, armazenamento por usuario e homologacao no aparelho |
| Operacao | Deploy GitHub/Render; PostgreSQL; disco persistente de 1 GB configurado | Backup conjunto banco/arquivos, restauracao, monitoramento, alertas, carga e limites do disco |

## Pendencias criticas identificadas no codigo

### 1. Autenticacao ainda e de prototipo

server.js:472 implementa login apenas por email. Nao verifica password_hash.
server.js:214 aceita identidade pelo cabecalho x-user-id e, sem sessao valida,
busca um usuario privilegiado ou cria administrador. Token invalido/expirado
nao encerra necessariamente o acesso: o fluxo cai nessa identidade alternativa.
As tabelas de permissao nao sao consultadas para autorizar as operacoes.

Necessario: autenticacao real, rejeicao obrigatoria sem sessao, validacao de unidade,
perfil, area, propriedade e operacao; cadastro de usuarios restrito aos autorizados.

### 2. Estado global permanece aberto e pode sobrescrever dados

server.js:439 e server.js:448 mantem GET/PUT /api/state fora do bloqueio de APIs.
server.js:120 grava sempre app_state.id='main', sem revisao ou isolamento por usuario.
app.js:656 salva em localStorage e envia o snapshot global; erros de envio sao silenciados.
Uma tela pode sobrescrever o snapshot de outra. Esse modelo nao e o armazenamento
operacional multiusuario definitivo, mesmo quando o snapshot fica no PostgreSQL.

Necessario: substituir as gravacoes operacionais pelas entidades reais e proteger
ou retirar o endpoint global antes do uso com dados reais.

### 3. Offline nao esta integrado ao aplicativo

offline-store.js expoe HAE_OFFLINE, mas app.js nao chama suas funcoes nem escuta
offline:sync-status/offline:sync-complete. Nao ha mensagem visivel de sincronizacao
nem reconciliacao das telas com o resultado do servidor. O build Android copia o
modulo, mas nao configura backendUrl ou sessao.

Tentativas automaticas dependem de a pagina estar em execucao ou voltar ao primeiro
plano. Sincronizacao com aplicativo fechado nao foi implementada nem prometida
pelos testes. IndexedDB nao separa stores/filas por usuario; deviceUid fica vinculado
a um usuario no servidor, exigindo desenho de troca de conta/dispositivo compartilhado.

### 4. Finalizacao online e offline tem regras diferentes

server.js:870 gera planos para cada NC com prazo vindo do corpo da requisicao ou 30
dias. lib/sync-service.js:111 finaliza sem gerar planos, explicitamente adiando regras.
O caminho online nao impede nova finalizacao e nao tem deduplicacao dos planos por
resposta de origem. Repetir a chamada pode gerar planos duplicados.
Os caminhos nao garantem que todas as perguntas obrigatorias foram respondidas.
A nota atual e proporcao simples de C entre C/NC; pesos cadastrados nao sao usados.

Necessario: servico unico de finalizacao, idempotencia, estados e completude validos,
regra aprovada de nota, prazo/responsavel e geracao de planos.

### 5. APIs de planos nao representam o fluxo completo

server.js:1014 insere feedback e altera plano em consultas separadas, sem uma unica
transacao; falha no segundo passo pode deixar estados inconsistentes.
server.js:1069 permite revisao sem validar perfil, unidade, estado do plano ou que
feedbackId pertence ao plano. Tabelas de documentos, ciencia, timeline, tokens e
impacto existem, mas nao foram encontradas rotas/servicos que completem esses fluxos.
lib/sync-service.js:123 vincula arquivos offline somente a auditoria/resposta.

### 6. Nem todos os endpoints de arquivos enviam o binario

server.js:1205 cria intencao com URLs/metadados recebidos do cliente; nao implementa
um provedor externo nem URL assinada. A confirmacao nao verifica existencia real
do objeto ou expiracao. POST /api/files tambem registra metadados.
O envio binario efetivo e /api/offline-files com lib/file-storage.js.
O download privado atual permite somente uploaded_by_user_id, nao destinatarios
de relatorios nem responsaveis de areas. MIME informado nao valida assinatura binaria.

### 7. Relatorios hospedados ainda nao foram homologados

lib/report-worker.js gera PDF real no teste local usando Chrome configurado.
O build observado no Render continua npm install --omit=dev: editar render.yaml
nao atualiza automaticamente um servico manual existente. Chromium nao foi
instalado/verificado nesse servico. O worker esta desativado pela trava publica.
O template backend e distinto dos relatorios desenhados em app.js.
GET /api/report-jobs em server.js:1181 nao filtra unidade/usuario.
Historico e arquivos do backend ainda nao estao ligados a biblioteca do painel.

### 8. Tabelas nao equivalem a servicos implementados

Nao foram encontradas APIs completas para administracao de organizacoes/unidades,
restaurantes, subareas, associacoes de usuarios e permissoes, distribuicao de
relatorios ou registro automatico de activity_logs/file_access_events.
Precisamos confirmar quais desses modulos pertencem ao escopo final; nao presumir
que cada tabela exige uma tela, mas nao marcar seus fluxos como entregues.

### 9. Publicacao nao significa ativacao operacional

Na ultima publicacao o /api/health confirmou PostgreSQL com 8 migrations, o painel
carregou e /api/offline-bootstrap retornou 503 intencional. Disco 1 GB em /var/data
e FILE_STORAGE_DIR=/var/data/uploads foram confirmados no Render.
Isso nao comprova importacao de checklists no banco hospedado, restauracao de backup,
persistencia apos redeploy, PDF hospedado ou sincronizacao do APK.
Nenhum dado real deve ser colocado no prototipo publico nesta fase.

## Ordem para concluir a estrutura

1. Definir matriz de acesso, regras de sessao offline e regras de plano de acao.
2. Implementar autenticacao e autorizacao; eliminar identidades alternativas e estado global aberto.
3. Unificar finalizacao/nota/planos e completar documentos, ciencia, devolutivas e historico.
4. Completar anexos offline, isolamento por usuario, notificacoes e acesso aos arquivos.
5. Homologar banco hospedado, importacao, Chromium, backup/restauracao e persistencia.
6. Conectar painel/APK aos servicos reais, estados de sincronizacao e atualizacao das telas.
7. Testar Android real offline, reconexao, reinicio, mudanca de conta e falhas de armazenamento.
8. Executar carga/concorrencia e testes negativos de acesso antes da ativacao publica.

## Evidencia dos testes desta revisao

- npm run test:backend: 11/11 aprovados, incluindo commit/rollback, dependencias,
  revisoes, retransmissao, limites e upload real.
- npm run test:postgres: migrations e importacao, usuarios/sessao provisoria,
  auditoria/resposta/foto, reenvio, conflito, finalizacao, configuracoes/documentos,
  PDF real, historico e notificacao de relatorio prontos aprovados em banco isolado.
- node tools/verify-offline-storage.js: gravacao, foto, recuperacao apos reload,
  falha de resposta, retry e confirmacao aprovados em IndexedDB real com API simulada.
- Esses testes nao cobrem senha, permissoes, todos os estados de plano, finalizacao
  online repetida, backup/restauracao, multiusuario, carga ou aparelho Android real.
