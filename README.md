# BRISA PODS — site + painel /admin

React + TypeScript + Vite + Tailwind + lucide-react. Tema vermelho / preto / branco com fumaça vermelha.

## Rodar localmente
```bash
npm install
cp .env.example .env.local
npm run dev
npm run build
```

## Ativar banco compartilhado, login e administração
1. Crie um projeto no [Supabase](https://supabase.com/).
2. Em **SQL Editor**, execute todo o arquivo `supabase/schema.sql`.
3. Copie a Project URL e a chave pública (anon/publishable) para `.env.local` como `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY`. Nunca coloque a chave `service_role` no frontend.
4. Em **Authentication → Providers**, habilite e configure Google OAuth se quiser login Google; configure URLs de retorno para o domínio publicado e `http://localhost:5173/conta` para desenvolvimento.
5. Crie sua conta pela área `/conta`. Para promovê-la a admin, encontre o UUID em **Authentication → Users** e execute no SQL Editor: `update public.profiles set role='admin' where id='UUID_DO_USUARIO';`
6. Entre em `/admin` usando o e-mail e a senha dessa conta. Ao salvar alterações, o estado do site é persistido em `site_state` e passa a ser compartilhado entre visitantes.
7. Publique o site novamente depois de adicionar as variáveis de ambiente. O arquivo `.env.local` não deve ser enviado ao Git.

## Notificações de reposição (e-mail/SMS)
A função `supabase/functions/notify-restock/index.ts` foi preparada para enviar e-mail via Resend e SMS via Twilio quando o admin marca uma reserva como notificada. Faça deploy da função `notify-restock` e configure os secrets `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN` e `TWILIO_FROM_PHONE` conforme os provedores que contratar. Sem essas credenciais, a notificação real não será enviada. O telefone deve estar em formato internacional aceito pelo provedor.

## Segurança e observações
- `/adminsupremo` é uma rota separada para troca de senha e exige sessão Supabase autenticada com perfil `admin`; não existe senha mestra embutida.
- O token é uma sessão de autenticação do Supabase, não um token vinculado ao IP. Vincular autenticação ao IP não é uma proteção confiável (IPs mudam e podem ser compartilhados).
- A área de cliente pede nome, CPF, telefone e endereço. Restrinja acesso aos dados pessoais, publique política de privacidade e colete apenas o necessário.
- O modo sem Supabase mantém o funcionamento de demonstração/local, mas não oferece persistência compartilhada nem segurança real para o painel.
- Pedidos são registros de solicitação: o status de pagamento é validado pelo admin. Não há checkout/gateway de pagamento integrado nesta versão.

## Funcionalidades mantidas
- Catálogo, busca, estoque, modelos 3D, hero, efeitos visuais e personalização pelo painel.
- Área do cliente em `/conta`, login por e-mail/senha e OAuth Google quando configurado.
- Pedidos e reservas no painel, com status de entrega/pagamento e fluxo de reposição.
