# ViraWeb Factory — setup e operação

Três experiências no mesmo app Next.js, roteadas por hostname em `proxy.ts` (`lib/hosts.ts`):

| Host | Rota interna | O quê |
| --- | --- | --- |
| `viraweb.dev.br` | `app/` | Site principal (com a seção da Factory) |
| `factory.viraweb.dev.br` | `app/sites/factory` | Vitrine, catálogo, briefing, checkout e área do cliente |
| `ops.viraweb.dev.br` | `app/sites/ops` | Painel interno (login + papéis) |

`admin.viraweb.dev.br` não é referenciado em nenhum lugar. `/sites/*` responde 404 quando acessado direto.

## 1. Variáveis de ambiente

Copie `.env.example` e preencha na Vercel (Production e Preview). Sem Supabase, o site público usa o catálogo estático e as áreas logadas mostram “em configuração”.

## 2. Supabase

1. Rode, em ordem, `supabase/migrations/0001_factory_schema.sql` e `0002_factory_pages.sql` (SQL Editor ou `supabase db push`).
2. Contas são criadas já confirmadas pelo servidor (service role), sem e-mail de confirmação e sem link mágico. Contas antigas não confirmadas são confirmadas no primeiro login com a senha correta.
3. Database → Replication: confirme a tabela `notifications` na publicação `supabase_realtime` (a migration 0002 tenta adicionar).
4. Primeiro admin: crie a conta pela Factory (`/login`) e rode
   `update users set role = 'admin' where email = 'voce@exemplo.com';`
   Depois, outros papéis são definidos em Ops → Configurações.

## 3. Stripe

1. Webhook: `https://factory.viraweb.dev.br/api/stripe/webhook` com os eventos
   `checkout.session.completed`, `checkout.session.async_payment_succeeded`, `invoice.paid`,
   `invoice.payment_failed`, `customer.subscription.updated`, `customer.subscription.deleted`.
2. Billing → Customer portal: ative o portal (usado em “Gerenciar assinatura”).
3. Local: `stripe listen --forward-to localhost:3000/api/stripe/webhook`.

Só `STRIPE_SECRET_KEY` é obrigatória para o checkout funcionar. O pagamento é confirmado no servidor de duas formas idempotentes: ao voltar do checkout (a sessão é consultada na API do Stripe, nunca confiando no navegador) e pelo webhook (assinatura verificada + `stripe_events`). Sem `STRIPE_WEBHOOK_SECRET`, renovações, falhas de cobrança e cancelamentos não são sincronizados — configure o webhook para produção.

Diagnóstico: Ops → Configurações mostra quais variáveis estão presentes e tem o botão “Testar conexão com o Stripe”. Variáveis alteradas na Vercel exigem novo deploy.

## 4. DNS / Vercel

Adicione `factory.viraweb.dev.br` e `ops.viraweb.dev.br` como domínios do mesmo projeto Vercel (CNAME `cname.vercel-dns.com`). Nenhum redirect entre domínios é necessário.

## 5. Desenvolvimento

- `http://factory.localhost:3000` e `http://ops.localhost:3000` funcionam sem configurar hosts.
- `npm test` (Vitest: SLA, hosts, RBAC, workflow, briefing) · `npm run typecheck` · `npm run build`.

## Fluxo de um pedido

Produto → Configuração → Briefing → Pagamento (Stripe) → webhook confirma → prazo calculado
(2 dias úteis, America/Sao_Paulo, sem fins de semana e feriados de `holidays`) → Ops: aceitar →
atribuir → iniciar → revisão → pronto → enviar entrega → cliente recebe “Seu produto está pronto.”

Pedidos Custom/Enterprise não pagam no ato: Ops define o orçamento (setup, mensalidade, prazo) e o cliente paga pela própria área.
