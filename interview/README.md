# Entrevista clínica

Área independente dentro do mesmo servidor do IDAuditor, com a identidade visual do painel.

## Uso

1. O responsável abre `/interview/admin.html` e entra com a conta principal do IDAuditor.
2. Clica em **Criar link** e copia a URL individual para o psicólogo. O link completo aparece apenas nesse momento. Em um rascunho, **Novo link** invalida o anterior sem apagar as respostas.
3. O entrevistado marca os dados objetivos, responde às 16 perguntas, usa **Salvar rascunho** quantas vezes precisar e depois **Enviar entrevista**.
4. O responsável vê cada entrevista organizada nas estruturas 1 a 5 e usa **Gerar PDF**. A estrutura 6, reflexão do estudante, não é apresentada ao entrevistado.

## Dados e acesso

- As respostas são gravadas na tabela `clinical_interviews` do PostgreSQL existente. A migration `028_clinical_interviews.sql` é aplicada pelo servidor no primeiro acesso ao banco.
- O link individual contém um token aleatório; só o hash dele fica no banco. Depois do envio, o link mostra apenas a confirmação, sem as respostas.
- A lista, as respostas e o PDF exigem a sessão do administrador principal (`PRIMARY_ADMIN_USERNAME` ou `INTERVIEW_OWNER_USERNAME`) e são limitados aos convites criados por essa conta.
- A senha inicial conhecida do protótipo precisa ter sido alterada no IDAuditor; enquanto ela estiver em uso, a área privada recusa acesso.
- `DATABASE_URL` precisa estar configurada e persistente no serviço publicado. Não há envio por e-mail automático; o envio é para o painel privado.
