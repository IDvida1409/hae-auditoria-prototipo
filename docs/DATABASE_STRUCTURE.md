# Estrutura do banco

Esta estrutura prepara o projeto para sair do protótipo visual e virar produto com painel web, app tablet Android, auditorias offline, evidências, planos de ação e relatórios históricos.

## Migrations

- `001_core_schema.sql`: base principal do produto.
- `002_report_archive_fields.sql`: campos de arquivo/histórico dos relatórios.
- `003_product_workflow_schema.sql`: complementa o fluxo real aprovado para responsáveis, restaurantes terceiros, devolutivas, aprovação/reprovação e avaliação do impacto no mês seguinte.
- `004_operational_base_schema.sql`: prepara a base operacional inicial com as 12 áreas aprovadas, suporte futuro a subáreas, checklist vinculado por área e regra padrão de auditoria/plano de ação.

## Carga inicial

- As migrations criam a estrutura do banco e cadastram a organização, unidade, 12 áreas e regras padrão.
- O checklist real extraído da planilha fica em `checklist-data.js`.
- Para importar blocos e perguntas para o Postgres, configure `DATABASE_URL` e rode:

```bash
npm run db:import-checklist
```

Esse importador cria um checklist por área, com blocos e perguntas, usando a Portaria SMS nº 2.619/2011 como base legal.

## Módulos cobertos

- `organizations` e `units`: empresa e unidades auditadas.
- `restaurants`: restaurantes internos ou terceiros vinculados à unidade.
- `app_users`: usuários do painel, auditores, Qualidade, administradores e responsáveis com acesso por escopo.
- `audit_areas`, `area_members` e `user_area_permissions`: áreas internas, responsável padrão da área, áreas de restaurantes terceiros e permissões por área.
- `audit_workflow_settings`: regras configuráveis de auditoria e plano de ação por unidade ou área.
- `checklists`, `checklist_blocks` e `checklist_questions`: estrutura da Portaria/checklist por versão, bloco, pergunta e risco.
- `audit_subareas` e `subarea_members`: estrutura reservada para quando as subáreas forem definidas, sem travar o modelo atual das 12 áreas.
- `audit_cycles`, `audits` e `audit_answers`: auditoria mensal, respostas C/NC/X, nota e sincronização.
- `stored_files` e `file_links`: fotos, evidências, certificados e PDFs ficam em storage; o banco guarda metadados e vínculos.
- `action_plan_documents`, `action_plan_document_items`, `action_plans`, `action_plan_feedback`, `action_plan_review_events` e `action_plan_timeline_events`: documento do plano de ação, itens gerados pelas NCs, prazo, devolutiva, evidência, aprovação/reprovação e histórico completo.
- `action_plan_impact_evaluations`: avaliação do impacto do plano de ação no ciclo seguinte.
- `reports` e `report_recipients`: PDFs gerados, histórico, acesso do responsável e controle de visualização/download.
- `document_requirements` e `certificates`: licenças/certificados obrigatórios, validade, alerta e revisão.
- `notifications`: avisos dentro do painel para auditor, Qualidade e responsável.
- `mobile_devices` e `sync_queue`: base para o app Android offline-first.
- `activity_logs`: rastreabilidade das ações importantes.

## Fluxo do plano de ação

1. O auditor finaliza a auditoria.
2. O sistema gera automaticamente o relatório e o documento do plano de ação a partir das NCs aplicáveis.
3. Cada item do documento já nasce com a pergunta, risco, descrição da não conformidade, correção necessária e fotos/evidências que originaram a NC.
4. Antes de enviar, o auditor pode revisar o plano automático, editar textos e adicionar informações complementares quando achar necessário.
5. Se não quiser complementar, o auditor pode enviar o plano automático como foi gerado.
6. O relatório do mês e o plano de ação ficam disponíveis para o usuário responsável pela área ou restaurante.
7. O responsável acessa a plataforma, mas visualiza apenas o que pertence ao seu escopo: área, relatórios, notas, planos de ação, notificações e devolutivas.
8. A devolutiva do responsável registra observação, evidência/foto, arquivos vinculados e justificativa quando a correção não for cumprida no prazo.
9. O auditor ou a equipe de Qualidade recebe uma notificação no painel.
10. O auditor abre a devolutiva dentro do painel e escolhe uma das ações: aprovar ou reprovar.
11. Em caso de reprovação, a justificativa fica registrada e visível para o responsável.
12. O responsável recebe a resposta dentro do painel.
13. O histórico completo fica salvo em `action_plan_timeline_events` e `action_plan_review_events`.
14. O resultado do plano de ação entra na auditoria e no relatório do mês seguinte por meio de `action_plan_impact_evaluations`.

## Status do plano de ação

O plano de ação precisa ter status suficiente para mostrar exatamente onde ele está:

- `generated`: plano criado automaticamente a partir das NCs da auditoria.
- `under_auditor_review`: auditor abriu o plano para revisar ou complementar antes de enviar.
- `ready_to_send`: plano revisado e pronto para envio.
- `available_to_responsible`: plano liberado no painel do responsável.
- `sent_to_responsible`: plano enviado/disponibilizado junto com o relatório do mês.
- `acknowledged`: responsável abriu o plano e registrou ciência/assinatura.
- `in_progress`: responsável está dentro do prazo para corrigir.
- `submitted`: responsável enviou devolutiva com evidência/foto ou justificativa.
- `pending_review`: auditor recebeu a devolutiva e precisa aprovar ou reprovar.
- `approved`: auditor aprovou a evidência/devolutiva.
- `rejected`: auditor reprovou e registrou o motivo.
- `reopened`: plano foi devolvido para nova tentativa, quando ainda houver prazo.
- `overdue`: prazo venceu sem conclusão aprovada.
- `cancelled`: plano cancelado por administrador/Qualidade.

## Login do responsável

O responsável entra na plataforma, mas não vê o painel completo do administrador. O acesso é controlado por escopo:

- `app_users.role = 'area_responsible'` ou `restaurant_responsible`.
- `app_users.platform_scope = 'assigned_areas'`, `assigned_restaurants` ou `read_only_assigned_areas`.
- `user_area_permissions` define quais áreas, restaurantes, dashboards, notas, relatórios, planos e notificações ele pode ver ou responder.
- `report_recipients` controla quais relatórios foram liberados para ele e se foram visualizados ou baixados.
- Apenas `app_users.role = 'admin'` com `platform_scope = 'all_units'` deve enxergar tudo.

## Documento do plano de ação

O documento do plano de ação tem dois caminhos de criação, mas um único fluxo de envio e aprovação:

- Automático: gerado ao finalizar a auditoria, usando as NCs, perguntas, riscos, correções necessárias e evidências/fotos já registradas.
- Automático revisado: o auditor abre o plano gerado, ajusta textos e adiciona orientações complementares antes de enviar.
- Manual: o auditor ou administrador cria um plano quando houver uma necessidade fora das NCs geradas pela auditoria.
- Em todos os casos, o plano é enviado ao responsável junto com o relatório do mês ou vinculado a ele.
- O responsável responde pelo painel, anexando evidência/foto ou justificando quando não cumprir no prazo.

## Responsável da área

Cada área auditada pode ter um responsável padrão em `audit_areas.responsible_user_id`.

- Ao iniciar o checklist da área, o sistema já carrega o responsável daquela área.
- Esse responsável entra no relatório mensal da área.
- Se houver NC, o plano de ação é atribuído para esse responsável.
- No futuro, quando existirem subáreas, o mesmo modelo pode ser expandido para mapear responsáveis por subárea.

## Ciência e assinatura

Quando o responsável abrir o plano de ação, o sistema pode registrar ciência em `action_plan_acknowledgements`.

- A ciência pode guardar nome da assinatura, data/hora, texto exibido, IP e navegador/dispositivo.
- Isso não precisa ser tratado como assinatura jurídica avançada nesta fase; é um aceite operacional do recebimento do plano.
- Depois da ciência, o plano segue para `acknowledged` ou `in_progress`.

## Relatório mensal e plano separado

O relatório mensal continua sendo o documento principal da auditoria, com nota, gráficos, evidências e resumo. O plano de ação deve ser separado porque precisa funcionar como formulário vivo:

- relatório mensal: PDF/histórico da auditoria;
- plano de ação: página/formulário para o responsável enviar evidência, foto ou justificativa;
- os dois ficam vinculados pelo banco para aparecerem juntos no painel;
- o plano pode ser baixado/arquivado depois da aprovação ou reprovação final.

## Visual do formulário do plano

O plano de ação deve abrir como página HTML, com aparência do relatório aprovado, mas sem gráficos.

- Deve manter o estilo visual aprovado do relatório/PDF.
- Deve mostrar código fixo do plano, área, nota, responsável, auditor, período, início e prazo final.
- Deve mostrar as instruções do que o responsável precisa fazer.
- Deve listar as NCs uma a uma, como cards retangulares.
- Cada card deve trazer a pergunta que gerou a NC, risco, descrição, observação do auditor, correção necessária e foto/evidência original.
- As informações da auditoria ficam travadas: o responsável não altera pergunta, risco, evidência original, auditor ou texto da NC.
- O responsável só preenche devolutiva, adiciona foto/evidência nova ou justificativa.
- Ao abrir em celular/tablet, o campo de evidência deve permitir tirar foto pela câmera.
- Ao abrir em computador, deve permitir selecionar arquivo.
- A imagem enviada deve ser compactada/redimensionada antes de salvar, mantendo qualidade suficiente para auditoria.
- Em caso de reprovação com nova tentativa permitida, o mesmo plano é reaberto com histórico da foto reprovada, justificativa da reprovação e novo campo para evidência.
- O PDF fica como arquivo de histórico/baixar depois; o preenchimento principal é pela página HTML/formulário.

No banco, isso fica sustentado por:

- `action_plan_documents.public_code`: código fixo do plano.
- `action_plan_documents.delivery_format = 'html_form'`: indica que o plano abre como formulário HTML.
- `action_plan_documents.layout_version`: versão visual baseada no estilo aprovado.
- `action_plan_documents.locked_snapshot`: cópia travada dos dados exibidos no momento da geração.
- `action_plan_document_items`: cards individuais de cada NC.
- `action_plan_tokens`: token/link seguro para abrir o formulário.
- `action_plan_feedback`: resposta do responsável com foto, arquivo, observação ou justificativa.

## Regras configuráveis

As regras de plano de ação e período de auditoria devem ficar em Configurações, não fixas no código.

- A configuração principal fica por unidade.
- Se uma área precisar de regra diferente, pode existir uma configuração específica por área.
- O auditor/administrador define se a auditoria inicia em dias fixos, como dia 15 ou 16, ou se o sistema pode sugerir melhores datas.
- O auditor/administrador define o prazo padrão do plano de ação, por exemplo 30 dias.
- O prazo pode começar ao finalizar a auditoria, ao enviar o relatório ou quando o responsável registrar ciência.
- O auditor/administrador define se pode reenviar após reprovação.
- O auditor/administrador define se pode reenviar fora do prazo.
- O auditor/administrador define o máximo de tentativas, ou deixa sem limite.
- Se o plano for reprovado dentro do prazo e a regra permitir, o mesmo plano pode ser reaberto para nova evidência, preservando a foto reprovada e o histórico da justificativa.
- Essa regra fica registrada em `audit_workflow_settings`.

## Observação sobre e-mail

O e-mail no-reply fica para a fase posterior, quando o projeto for aprovado. A modelagem já permite registrar destinatários, relatórios liberados e acessos, mas o envio automático de e-mail não faz parte desta primeira etapa.
