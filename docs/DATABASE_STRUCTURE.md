# Estrutura inicial do banco

Esta estrutura prepara o projeto para sair do prototipo visual e virar produto com painel web, app tablet Android, auditorias offline, evidencias, planos de acao e relatorios historicos.

## Modulos cobertos

- `organizations` e `units`: empresa e unidades auditadas.
- `app_users`: usuarios do painel, auditores, qualidade e responsaveis de area/restaurante.
- `audit_areas` e `area_members`: areas internas e restaurantes terceiros auditados.
- `checklists`, `checklist_blocks` e `checklist_questions`: estrutura da Portaria/checklist por versao.
- `audit_cycles`, `audits` e `audit_answers`: auditoria mensal, respostas C/NC/X, nota e sincronizacao.
- `stored_files` e `file_links`: fotos, evidencias, certificados e PDFs ficam em storage; o banco guarda metadados e vinculos.
- `action_plans`, `action_plan_tokens` e `action_plan_feedback`: plano de acao, prazo, devolutiva, evidencia, aprovacao/reprovacao e impacto.
- `reports` e `report_recipients`: PDFs gerados, historico e acesso do responsavel.
- `certificates`: licencas/certificados com validade e arquivo vinculado.
- `notifications`: avisos dentro do painel para auditor, qualidade e responsavel.
- `mobile_devices` e `sync_queue`: base para o app Android offline-first.
- `activity_logs`: rastreabilidade das acoes importantes.

## Fluxo do plano de acao

1. O auditor finaliza a auditoria.
2. O sistema gera o relatorio e os planos de acao das NCs aplicaveis.
3. O responsavel da area acessa o painel com login limitado.
4. O responsavel visualiza o relatorio e envia a devolutiva do plano com foto/evidencia.
5. O auditor ou Qualidade recebe notificacao no painel.
6. O auditor aprova ou reprova a devolutiva, registrando justificativa quando reprovar.
7. O responsavel recebe a resposta dentro do painel.
8. O historico do plano fica armazenado e pode ser baixado/consultado.
9. O impacto do plano entra na avaliacao e no relatorio do mes seguinte.

## Observacao sobre e-mail

O no-reply fica para a fase posterior de projeto aprovado. A modelagem ja permite registrar destinatarios e acessos, mas o envio automatico de e-mail nao faz parte desta primeira etapa.
