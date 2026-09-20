# Login e cadastro - primeira etapa

- Preview separado em /login.html; o painel existente nao foi bloqueado nem alterado.
- Azul #173557 confirmado no manual de marca IDvida; rodape com logo fornecido.
- Login circular de vidro translucido, compacto e sem opcao de cadastro.
- Acesso por nome de usuario (exemplo david.souza), nunca por email.
- Migracao 009 adiciona username unico; contas existentes precisam receber um nome
  de usuario explicitamente antes da ativacao, sem gerar nomes ambiguos por email.
- Email continua apenas como contato no cadastro administrativo da API.
- Interface de gestao de usuarios sera integrada ao painel do administrador.
- Rotas novas /api/access/login, me, logout, password e users.
- Senha com scrypt, salt aleatorio e verificacao em tempo constante.
- Sessao em cookie HttpOnly/SameSite=Strict; Secure no Render.
- Cadastro de usuario restrito a administrador autenticado com senha definitiva.
- Senha provisoria exige troca; alterar senha revoga todas as sessoes.
- Cadastro pertence a unidade do administrador, sem unidade arbitraria no payload.
- Controle inicial de tentativas em memoria e rejeicao de POST de outra origem.

## Implementado nesta etapa

- Login conectado ao painel e sessao por cookie privado.
- Conta administrativa inicial `teste.01` criada automaticamente no banco de teste.
- Cadastro real de usuario somente por administrador.
- Codigo temporario gerado pelo sistema, exibido uma unica vez.
- Troca obrigatoria da senha no primeiro acesso.
- Solicitacao de redefinicao gera pendencia e notificacao para administradores.
- Administrador redefine senha, inativa e reativa usuarios.
- Identidade autenticada exibida no cabecalho e saida encerra a sessao.
- Logo da unidade substitui o logo IDvida quando o usuario e reconhecido.

## Ainda pendente

As regras completas de acesso por area/unidade/acao ainda precisam ser definidas.
As rotas antigas /api/auth/login e a identidade automatica de currentUser ainda sao
prototipos e precisam ser substituidas pela sessao nova antes de liberar todas as APIs.
/api/state e as APIs operacionais ainda precisam de autorizacao por perfil e area no
servidor; nesta etapa o bloqueio visual e o cadastro administrativo ja estao ligados.

Nao ha recuperacao por e-mail. Convites e matriz fina de permissoes operacionais
ainda nao foram implementados.
Cadastro de perfil nao equivale a concessao validada de permissoes operacionais.
Cookies nativos/CORS e sessao offline do APK ainda precisam de implementacao.
O limite de tentativas e local ao processo; producao precisa de protecao compartilhada.

Os testes PostgreSQL usam contas e senhas aleatorias em banco isolado, sem alterar
usuarios do Render. Testes visuais com API simulada nao comprovam integracao real.
