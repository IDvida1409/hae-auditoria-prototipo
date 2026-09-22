# Revisão geral da versão web - 22/09/2026

## Escopo decidido

- O piloto usará a aplicação web no computador e no navegador do celular.
- O APK fica fora deste primeiro teste e só volta após a aprovação do conceito.
- PKI e a hierarquia definitiva de áreas e subáreas continuam adiadas por decisão de produto.

## Correções aplicadas nesta revisão

- Centralização da tela "Preparando o IDAuditor" em celular, tablet e desktop, incluindo `safe-area` e altura dinâmica do navegador móvel.
- Limpeza das declarações restantes de notas, blocos e planos de ação fictícios no frontend.
- Cálculo das notas corrigido para a regra ponderada da planilha original.
- Migração para recalcular no PostgreSQL as auditorias já finalizadas com a regra correta.
- Pontuação de respostas corrigida para gravar o peso real da pergunta.
- Relatórios aprovados receberam uma nova versão de layout para impedir o reaproveitamento de PDFs calculados pela regra antiga.
- Cabeçalhos de segurança adicionados ao servidor: CSP, HSTS em HTTPS, bloqueio de iframe, `nosniff`, política de referência e permissões.
- Textos visíveis do gerador automático de PDF receberam correções de acentuação.
- O servidor passou a renderizar diretamente o mesmo modelo visual aprovado da aplicação; a geração e a rota de arquivamento de PDF pelo navegador foram removidas.
- Evidências passaram a aceitar JPG, PNG e WebP de até 50 MB, com verificação da assinatura e da estrutura interna do arquivo.
- A trilha de auditoria passou a registrar eventos críticos na mesma transação da operação.

## Regra de pontuação comprovada

A planilha original `HAE Auditoria -Modelo Cozinha Paciente.xls` usa pesos 2, 4, 8, 16, 32 e 64 conforme o risco.

`nota = 10 x soma dos pesos respondidos C / soma dos pesos respondidos C ou NC`

- `C`: soma o peso no numerador e no denominador.
- `NC`: soma o peso apenas no denominador.
- `X`: não participa do numerador nem do denominador.

O sistema anterior calculava apenas a proporção de quantidades de C e NC e, portanto, tratava uma pergunta de peso 2 como equivalente a uma de peso 32. Isso foi corrigido no frontend, no backend, na sincronização offline e na migração dos resultados existentes.

## Validações executadas

- 22 testes automatizados aprovados, sem falhas.
- Tela de transição pós-login verificada em larguras de 390, 430 e 1440 pixels.
- Layout do PDF verificado em diferentes larguras de navegador.
- PostgreSQL real isolado iniciado e todas as migrações aplicadas.
- Importação confirmada: 12 áreas e 437 perguntas.
- Login, troca de senha, encerramento de sessão e rejeição de origem indevida aprovados.
- Permissão do responsável restrita à própria área aprovada.
- Fila offline, retransmissão idempotente e conflitos de revisão aprovados.
- Foto real enviada, vinculada, recuperada e protegida por permissão.
- Finalização impedida enquanto faltam respostas ou foto obrigatória de NC.
- Plano de ação, ciência, devolutiva individual, prazo, aprovação, reprovação, reabertura e notificações aprovados.
- Geração única no servidor, armazenamento, histórico e notificação de PDF aprovados tecnicamente.
- PDF final de três páginas renderizado para PNG e inspecionado: A4, sem cortes, sobreposições ou textos ilegíveis.
- Ensaio físico de backup e restauração aprovado, preservando migrações e dados operacionais.
- Leitura autenticada concorrente aprovada com 40 requisições simultâneas.
- Trilha confirmada para finalização, geração de plano, ciência, devolutiva, prazo, reabertura e relatório.

## Situação por subsistema

| Subsistema | Situação | Observação |
| --- | --- | --- |
| Login e sessão | Verificado | Senhas com `scrypt`, cookie privado e revogação de sessão. |
| Perfis e áreas | Verificado | Restrições são aplicadas pelo servidor, não só pela interface. |
| Checklist | Verificado | 12 áreas e 437 perguntas reais no PostgreSQL. |
| Nota da auditoria | Corrigido e testado | Agora segue os pesos da planilha original. |
| Operação offline no navegador | Verificado em automação | Cada resposta pode ser reenviada sem duplicação; conflito não sobrescreve silenciosamente. |
| Fotos | Verificado | Câmera e galeria aceitam JPG, PNG e WebP; o servidor confere assinatura, estrutura, checksum e limite provisório de 50 MB. |
| Plano de ação | Verificado | Fluxo completo coberto no PostgreSQL. |
| Notificações | Verificado | Eventos recebidos são persistidos; envio externo por push não faz parte deste piloto. |
| PDF automático | Verificado | O servidor gera diretamente o modelo aprovado no encerramento; o navegador apenas abre o arquivo armazenado. |
| Trilha de eventos | Verificado | Os eventos críticos são gravados transacionalmente em `activity_logs`; acessos a arquivos ficam em `file_access_events`. |
| Backup e restauração | Verificado em ambiente isolado | Cópia física restaurada com migrações e dados operacionais íntegros. |
| Concorrência | Baseline aprovado | 40 leituras autenticadas simultâneas concluídas sem erro; teste de capacidade prolongado continua sendo atividade pré-produção. |
| Conteúdo dos checklists | Fidelidade verificada | As 12 áreas e as 437 perguntas correspondem à planilha-fonte. Termos técnicos e redações institucionais, incluindo "Guarda de amostra de alimento (Conforme médico)", são preservados como fornecidos. O importador apenas normaliza espaços e quebras de linha; nos títulos dos blocos, aplica capitalização visual e corrige `ACONDIONAMENTO` para `ACONDICIONAMENTO`. |
| APK | Adiado | Fora do piloto atual. |

## Itens restantes antes da produção definitiva

1. Fazer a matriz final em aparelhos reais: Safari no iPhone, Chrome no Android e navegadores de desktop, incluindo câmera, rotação, perda de rede e retomada. Essa etapa exige os aparelhos e as redes reais do piloto.
2. Executar um teste de capacidade prolongado com o volume estimado de usuários e fotos. O teste simultâneo atual é uma verificação de concorrência, não uma medição definitiva de capacidade.
3. Trocar o limitador de tentativas de login em memória por armazenamento compartilhado caso o serviço passe a usar mais de uma instância.

## Parecer de prontidão

O sistema está apto para continuar o piloto web controlado depois da publicação e de uma verificação rápida no ambiente online. PDF, pontuação, persistência, trilha, validação de evidências e restauração já têm cobertura automatizada. A aprovação definitiva depende principalmente do teste nos aparelhos e na rede reais do hospital.
