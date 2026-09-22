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

## Regra de pontuação comprovada

A planilha original `HAE Auditoria -Modelo Cozinha Paciente.xls` usa pesos 2, 4, 8, 16, 32 e 64 conforme o risco.

`nota = 10 x soma dos pesos respondidos C / soma dos pesos respondidos C ou NC`

- `C`: soma o peso no numerador e no denominador.
- `NC`: soma o peso apenas no denominador.
- `X`: não participa do numerador nem do denominador.

O sistema anterior calculava apenas a proporção de quantidades de C e NC e, portanto, tratava uma pergunta de peso 2 como equivalente a uma de peso 32. Isso foi corrigido no frontend, no backend, na sincronização offline e na migração dos resultados existentes.

## Validações executadas

- 20 testes automatizados aprovados, sem falhas.
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
- Geração, armazenamento, histórico e notificação de PDF aprovados tecnicamente.

Observação: o processo de teste completou todas as asserções, mas o processo temporário do PostgreSQL não encerrou sozinho e precisou ser interrompido após a conclusão. Isso não altera os resultados funcionais, porém merece ajuste no utilitário de teste.

## Situação por subsistema

| Subsistema | Situação | Observação |
| --- | --- | --- |
| Login e sessão | Verificado | Senhas com `scrypt`, cookie privado e revogação de sessão. |
| Perfis e áreas | Verificado | Restrições são aplicadas pelo servidor, não só pela interface. |
| Checklist | Verificado | 12 áreas e 437 perguntas reais no PostgreSQL. |
| Nota da auditoria | Corrigido e testado | Agora segue os pesos da planilha original. |
| Operação offline no navegador | Verificado em automação | Cada resposta pode ser reenviada sem duplicação; conflito não sobrescreve silenciosamente. |
| Fotos | Verificado com ressalva | Bytes e checksum são persistidos; falta validar a assinatura interna do tipo do arquivo. |
| Plano de ação | Verificado | Fluxo completo coberto no PostgreSQL. |
| Notificações | Verificado | Eventos recebidos são persistidos; envio externo por push não faz parte deste piloto. |
| PDF automático | Parcial | O servidor gera automaticamente, mas o modelo visual aprovado ainda é reconstruído por uma segunda rotina no navegador. |
| Português | Revisado parcialmente | Há uma frase de origem na planilha, "Guarda de amostra de alimento (Conforme médico)", que precisa de validação do responsável técnico antes de ser alterada. |
| APK | Adiado | Fora do piloto atual. |

## Bloqueadores antes de considerar produção robusta

1. Unificar os dois geradores de PDF. O servidor precisa gerar diretamente o modelo visual aprovado, com gráficos, fotos e tipografia finais. Hoje a finalização cria um PDF automático simples e o navegador pode substituí-lo por outro arquivo de layout aprovado. Enquanto isso existir, ainda pode aparecer "Gerando relatório" e o resultado pode variar conforme quem abre o painel.
2. Implementar trilha de auditoria. A tabela `activity_logs` existe, mas não há gravação dos eventos críticos de negócio.
3. Validar o conteúdo real dos arquivos enviados. Atualmente o servidor limita tamanho e tipos declarados, calcula checksum e restringe acesso, mas confia no `Content-Type` informado pelo navegador.
4. Ensaiar backup e restauração do PostgreSQL e das evidências. A estrutura existe, mas recuperação real ainda não foi demonstrada.
5. Executar teste de carga e concorrência. O bloqueio transacional e a idempotência foram testados funcionalmente, não sob volume de vários usuários simultâneos.
6. Trocar o limitador de tentativas de login em memória por armazenamento compartilhado caso o serviço use mais de uma instância.
7. Fazer a matriz final em aparelhos reais: Safari no iPhone, Chrome no Android e navegadores de desktop, incluindo câmera, rotação, perda de rede e retomada.

## Parecer de prontidão

O sistema está apto para continuar um piloto web controlado depois da publicação e de uma verificação rápida no ambiente online. Ele ainda não deve ser classificado como pronto para produção definitiva enquanto o gerador de PDF não for unificado e os itens de auditoria, validação de arquivo e recuperação de backup não forem concluídos.

