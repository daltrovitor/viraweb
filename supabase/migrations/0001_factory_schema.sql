-- ViraWeb Factory — schema, RLS, seed. Apply in a Supabase project (SQL editor or CLI).

create extension if not exists "pgcrypto";

-- Enums ----------------------------------------------------------------------
create type user_role as enum ('customer', 'admin', 'production', 'support');
create type order_status as enum (
  'awaiting_payment', 'briefing_pending', 'received', 'in_production',
  'in_review', 'ready', 'suspended', 'canceled'
);
create type payment_status as enum ('unpaid', 'paid', 'failed', 'refunded');
create type briefing_status as enum ('pending', 'complete');
create type production_status as enum ('queued', 'in_progress', 'in_review', 'done');
create type order_tier as enum ('standard', 'custom', 'enterprise');
create type subscription_status as enum ('active', 'trialing', 'past_due', 'canceled', 'unpaid', 'paused', 'incomplete');
create type revision_status as enum ('open', 'in_progress', 'done');

-- Helpers --------------------------------------------------------------------
create or replace function set_updated_at() returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end $$;

-- Tables ---------------------------------------------------------------------
create table users (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  name text,
  avatar text,
  company text,
  role user_role not null default 'customer',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Role helpers live after `users` exists. security definer avoids RLS recursion.
create or replace function current_role_name() returns user_role
language sql stable security definer set search_path = public as $$
  select role from users where id = auth.uid()
$$;

create or replace function is_ops() returns boolean
language sql stable security definer set search_path = public as $$
  select coalesce(current_role_name() in ('admin', 'production', 'support'), false)
$$;

create or replace function is_admin() returns boolean
language sql stable security definer set search_path = public as $$
  select coalesce(current_role_name() = 'admin', false)
$$;

create table products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  category text not null,
  tier order_tier not null default 'standard',
  setup_price integer not null check (setup_price >= 0),          -- BRL cents
  monthly_price integer not null check (monthly_price >= 0),      -- BRL cents
  price_from boolean not null default false,                      -- "a partir de"
  delivery_days integer not null default 2,
  image_url text,
  sort_order integer not null default 0,
  briefing_schema jsonb not null default '[]'::jsonb,
  limits jsonb not null default '{}'::jsonb,
  stripe_product_id text,
  stripe_setup_price_id text,
  stripe_monthly_price_id text,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table product_features (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references products(id) on delete cascade,
  name text not null,
  description text
);

create sequence order_number_seq start 1000;

create table orders (
  id uuid primary key default gen_random_uuid(),
  code text not null unique default ('VF-' || nextval('order_number_seq')),
  user_id uuid not null references users(id),
  product_id uuid not null references products(id),
  tier order_tier not null default 'standard',
  status order_status not null default 'awaiting_payment',
  payment_status payment_status not null default 'unpaid',
  briefing_status briefing_status not null default 'pending',
  production_status production_status not null default 'queued',
  assigned_to uuid references users(id),
  delivery_url text,
  setup_price integer not null,
  monthly_price integer not null,
  started_at timestamptz,
  deadline timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index orders_user_idx on orders(user_id);
create index orders_status_idx on orders(status);
create index orders_assigned_idx on orders(assigned_to);
create index orders_deadline_idx on orders(deadline);

create table briefings (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null unique references orders(id) on delete cascade,
  data jsonb not null default '{}'::jsonb,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id),
  order_id uuid not null references orders(id),
  stripe_customer_id text not null,
  stripe_subscription_id text not null unique,
  stripe_price_id text,
  status subscription_status not null,
  current_period_end timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table payments (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references orders(id),
  stripe_payment_intent_id text,
  stripe_invoice_id text unique,
  amount integer not null,
  currency text not null default 'brl',
  status text not null,
  created_at timestamptz not null default now()
);

create table deliveries (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references orders(id) on delete cascade,
  url text not null,
  version text,
  notes text,
  delivered_at timestamptz not null default now()
);

create table revisions (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references orders(id) on delete cascade,
  description text not null,
  status revision_status not null default 'open',
  created_at timestamptz not null default now(),
  completed_at timestamptz
);

create table notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade,   -- null = broadcast to ops
  type text not null,
  title text not null,
  message text,
  link text,
  read boolean not null default false,
  created_at timestamptz not null default now()
);

create table audit_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id),
  action text not null,
  entity text not null,
  entity_id text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table holidays (
  day date primary key,
  name text not null
);

create table stripe_events (            -- webhook idempotency
  id text primary key,
  type text not null,
  processed_at timestamptz not null default now()
);

create table app_settings (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);

-- updated_at triggers
do $$ declare t text; begin
  foreach t in array array['users','products','orders','briefings','subscriptions'] loop
    execute format('create trigger %I_updated before update on %I for each row execute function set_updated_at()', t, t);
  end loop;
end $$;

-- Profile row for each new auth user (always a customer; promote via SQL only).
create or replace function handle_new_user() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  insert into users (id, email, name) values (new.id, new.email, new.raw_user_meta_data->>'name');
  return new;
end $$;
create trigger on_auth_user_created after insert on auth.users
  for each row execute function handle_new_user();

-- Row Level Security -----------------------------------------------------------
alter table users enable row level security;
alter table products enable row level security;
alter table product_features enable row level security;
alter table orders enable row level security;
alter table briefings enable row level security;
alter table subscriptions enable row level security;
alter table payments enable row level security;
alter table deliveries enable row level security;
alter table revisions enable row level security;
alter table notifications enable row level security;
alter table audit_logs enable row level security;
alter table holidays enable row level security;
alter table stripe_events enable row level security;
alter table app_settings enable row level security;

-- users: self read; ops read all; only admin writes (role changes never self-serve).
create policy users_self_read on users for select using (id = auth.uid());
create policy users_ops_read on users for select using (is_ops());
create policy users_admin_write on users for all using (is_admin()) with check (is_admin());
-- A customer may edit own non-privileged profile fields via a column-restricted grant below.
create policy users_self_update on users for update using (id = auth.uid())
  with check (id = auth.uid() and role = (select role from users where id = auth.uid()));

-- catalog: public read of active products; admin writes.
create policy products_public_read on products for select using (active or is_ops());
create policy products_admin_write on products for all using (is_admin()) with check (is_admin());
create policy features_public_read on product_features for select using (true);
create policy features_admin_write on product_features for all using (is_admin()) with check (is_admin());

-- orders
create policy orders_owner_read on orders for select using (user_id = auth.uid());
create policy orders_admin_support_read on orders for select using (current_role_name() in ('admin','support'));
create policy orders_production_read on orders for select
  using (current_role_name() = 'production' and assigned_to = auth.uid());
create policy orders_admin_write on orders for all using (is_admin()) with check (is_admin());
create policy orders_production_update on orders for update
  using (current_role_name() = 'production' and assigned_to = auth.uid())
  with check (current_role_name() = 'production' and assigned_to = auth.uid());

-- briefings follow their order's visibility.
create policy briefings_owner on briefings for all
  using (exists (select 1 from orders o where o.id = order_id and o.user_id = auth.uid()))
  with check (exists (select 1 from orders o where o.id = order_id and o.user_id = auth.uid()));
create policy briefings_ops_read on briefings for select
  using (exists (select 1 from orders o where o.id = order_id));  -- orders RLS filters per role

-- money tables: read only. Writes happen exclusively with the service role (webhooks).
create policy subs_owner_read on subscriptions for select using (user_id = auth.uid());
create policy subs_staff_read on subscriptions for select using (current_role_name() in ('admin','support'));
create policy payments_owner_read on payments for select
  using (exists (select 1 from orders o where o.id = order_id and o.user_id = auth.uid()));
create policy payments_admin_read on payments for select using (is_admin());

create policy deliveries_visible on deliveries for select
  using (exists (select 1 from orders o where o.id = order_id));
create policy deliveries_ops_write on deliveries for insert
  with check (is_ops() and exists (select 1 from orders o where o.id = order_id));

create policy revisions_owner on revisions for all
  using (exists (select 1 from orders o where o.id = order_id and o.user_id = auth.uid()))
  with check (exists (select 1 from orders o where o.id = order_id and o.user_id = auth.uid()));
create policy revisions_ops_read on revisions for select using (exists (select 1 from orders o where o.id = order_id));
create policy revisions_staff_update on revisions for update
  using (current_role_name() in ('admin','support')) with check (current_role_name() in ('admin','support'));

create policy notifications_owner on notifications for select using (user_id = auth.uid());
create policy notifications_owner_update on notifications for update using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy notifications_ops_broadcast on notifications for select using (user_id is null and is_ops());

create policy audit_admin_read on audit_logs for select using (is_admin());   -- inserts: service role only
create policy holidays_read on holidays for select using (true);
create policy holidays_admin_write on holidays for all using (is_admin()) with check (is_admin());
create policy settings_admin on app_settings for all using (is_admin()) with check (is_admin());
-- stripe_events: no policies = service role only.

-- Column-level hardening: authenticated clients cannot touch privileged order columns.
-- Order creation/pricing, status transitions and assignment run server-side with the
-- service role AFTER requireRole(); clients can only update production progress/URL.
revoke insert, delete on orders from authenticated, anon;
revoke update on orders from authenticated;
grant update (production_status, delivery_url) on orders to authenticated;
revoke update on users from authenticated;
grant update (name, avatar, company) on users to authenticated;   -- role is never self-serve
revoke insert, update, delete on subscriptions, payments, audit_logs, stripe_events from authenticated, anon;

-- Seed: standard catalog (prices in BRL cents; monthly/setup editable from Operations) -----
insert into products (name, slug, category, description, setup_price, monthly_price, price_from, sort_order) values
  ('Landing Page',       'landing-page',       'websites',   'Página de captação pronta para converter.',          29700,  4900, false, 10),
  ('Página de Vendas',   'pagina-de-vendas',   'websites',   'Página longa de vendas com checkout e prova social.', 49700,  7900, false, 20),
  ('Site Institucional', 'site-institucional', 'websites',   'Site completo para apresentar sua empresa.',          79700,  9900, false, 30),
  ('Bot de Atendimento', 'bot',                'bots',       'Bot que atende e qualifica seus contatos.',           49700, 14900, false, 40),
  ('Automação',          'automacao',          'automacao',  'Fluxos que eliminam trabalho manual.',                69700, 14900, false, 50),
  ('Bot de WhatsApp',    'whatsapp-bot',       'bots',       'Atendimento no WhatsApp. Custos de API cobrados à parte.', 79700, 19900, false, 60),
  ('Dashboard',          'dashboard',          'sistemas',   'Painel com seus dados e indicadores.',                99700, 14900, false, 70),
  ('Mini Sistema',       'mini-sistema',       'sistemas',   'Sistema enxuto sob medida.',                         149700, 19900, true,  80),
  ('Web App',            'web-app',            'apps',       'Aplicativo web completo.',                           199700, 24900, true,  90);

-- Brazilian national holidays are configured from Operations (holidays table).
