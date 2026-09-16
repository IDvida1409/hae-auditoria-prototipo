# Estrutura inicial das APIs

As APIs reais começam pelo banco Postgres. Sem `DATABASE_URL`, as rotas estruturais retornam `503` para evitar salvar dados falsos em arquivo local.

## Base

- `GET /api/health`
  - Verifica backend, tipo de storage e migrations aplicadas.
- `GET /api/bootstrap`
  - Carrega unidade, áreas e regras padrão de auditoria/plano.
- `POST /api/auth/login`
  - Login provisório por e-mail para estruturar fluxo de sessão.
- `GET /api/auth/me`
  - Retorna usuário da sessão atual.
- `POST /api/auth/logout`
  - Revoga a sessão atual.
- O login já retorna token `Bearer`.
- O header `x-user-id` continua aceito apenas como fallback de protótipo.

## Áreas e checklists

- `GET /api/areas`
  - Lista as 12 áreas, responsável e quantidade de checklists.
- `GET /api/checklists?areaId=...`
  - Lista checklists por área.
- `GET /api/checklists/:id`
  - Retorna checklist com blocos e perguntas.

## Auditorias

- `POST /api/audits`
  - Inicia auditoria.
  - Campos principais: `areaId`, `checklistId`, `subareaId`, `localAuditId`, `source`, `offlineCreated`.
- `POST /api/audits/:id/answers`
  - Salva uma ou várias respostas `C`, `NC` ou `X`.
  - Faz `upsert` por auditoria/pergunta, importante para sync offline.
- `POST /api/audits/:id/finalize`
  - Finaliza auditoria.
  - Calcula nota.
  - Gera plano de ação para cada resposta `NC`.

## Planos de ação

- `GET /api/action-plans?status=...&areaId=...`
  - Lista planos por status e área.
- `POST /api/action-plans/:id/feedback`
  - Responsável envia devolutiva, evidência, observação ou justificativa.
  - Plano passa para `pending_review`.
- `POST /api/action-plans/:id/review`
  - Auditor aprova ou reprova.
  - Campos principais: `decision`, `justification`, `allowResubmission`, `feedbackId`.
  - Pode fechar como `approved`, `rejected` ou reabrir como `reopened`.

## Arquivos

- `POST /api/files`
  - Registra metadados de arquivo.
  - O banco não guarda PDF/foto como blob.
  - O banco guarda `storage_provider`, `storage_bucket`, `storage_key`, `file_url`, tamanho, tipo e checksum.
- `POST /api/files/upload-intents`
  - Cria intenção de upload, com `storage_key`, expiração e vínculo opcional com entidade.
  - Deve ser usado antes de subir fotos/PDFs para storage.
- `POST /api/files/upload-intents/:id/complete`
  - Confirma upload realizado.
  - Cria `stored_files` e `file_links`.

## Relatórios assíncronos

- `POST /api/report-jobs`
  - Cria job para gerar relatório mensal, comparativo, geral ou plano de ação.
- `GET /api/report-jobs?status=queued`
  - Lista jobs por status.
- A geração real do PDF será plugada nessa fila, evitando travar a tela enquanto o PDF é criado.

## Offline tablet

- `POST /api/sync-queue`
  - Registra operações offline com `clientOperationId`.
  - `clientOperationId` é único e protege contra envio duplicado quando o tablet sincronizar novamente.
  - O app deve salvar localmente primeiro e enviar a fila quando houver internet.
- `GET /api/sync-queue?status=pending`
  - Lista operações pendentes.
- `POST /api/sync-queue/process`
  - Processa lote básico da fila.
  - Por enquanto registra aceitação; depois será conectado por `entity_type` e `operation`.

## Estratégia para fotos e PDFs

- Fotos e PDFs devem ir para storage externo ou storage privado do backend.
- O Postgres fica com metadados e vínculos.
- Isso mantém consultas rápidas e evita lentidão em upload/download.
- Para tablet, o arquivo pode ser compactado/redimensionado antes do upload.
