// Hello World
'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { requirePermission, requireRole, type SessionUser } from '@/lib/auth/guards';
import { can, ROLES } from '@/lib/auth/roles';
import { createAdminClient } from '@/lib/supabase/admin';
import { isStripeConfigured } from '@/lib/env';
import { getStripe } from '@/lib/stripe';
import { logAudit } from '@/lib/audit';
import { calcDeadline } from '@/lib/sla';
import { loadHolidays } from '@/lib/factory/repo';
import { briefingSchemaValidator } from '@/lib/factory/briefing';
import { CATEGORY_IDS, PREVIEW_KINDS, TIERS, type OrderState } from '@/lib/factory/types';
import { allowedActions, transitionPatch, type OpsAction } from '@/lib/factory/workflow';

export interface OpsFormState {
  error?: string;
  message?: string;
}

const uuid = z.string().uuid();
const ORDER_STATE =
  'id, code, user_id, status, payment_status, briefing_status, production_status, tier, accepted_at, assigned_to, setup_price, delivery_url, delivered_at, products(name)';

type LoadedOrder = OrderState & { id: string; code: string; user_id: string; delivered_at: string | null; products: { name: string } | null };

function refresh() {
  revalidatePath('/sites/ops', 'layout');
  revalidatePath('/sites/factory/dashboard', 'layout');
}

async function loadOrder(id: string): Promise<LoadedOrder> {
  if (!uuid.safeParse(id).success) throw new Error('invalid_order');
  const { data } = await createAdminClient().from('orders').select(ORDER_STATE).eq('id', id).single();
  if (!data) throw new Error('order_not_found');
  return data as unknown as LoadedOrder;
}

function assertAllowed(order: LoadedOrder, user: SessionUser, action: OpsAction) {
  if (!allowedActions(order, user.role, user.id).includes(action)) throw new Error('action_not_allowed');
}

async function notifyCustomer(order: LoadedOrder, title: string, message: string) {
  await createAdminClient().from('notifications').insert({
    user_id: order.user_id,
    type: 'order.update',
    title,
    message: `${order.code} · ${message}`,
    link: `/dashboard/orders/${order.id}`,
  });
}

const CUSTOMER_MESSAGE: Partial<Record<OpsAction, [string, string]>> = {
  start: ['Produção iniciada', 'Seu produto está sendo construído.'],
  review: ['Em revisão', 'Estamos revisando cada detalhe antes da entrega.'],
  suspend: ['Produto suspenso', 'Regularize a assinatura para reativar.'],
  reactivate: ['Produto reativado', 'Tudo certo novamente.'],
  cancel: ['Pedido cancelado', 'Seu pedido foi cancelado.'],
};

/** Form-less transitions (accept, start, review, rework, approve, reopen, suspend, reactivate, cancel). */
export async function runOrderAction(orderId: string, action: OpsAction): Promise<void> {
  const user = await requireRole();
  const order = await loadOrder(orderId);
  assertAllowed(order, user, action);
  const patch = transitionPatch(action, order, new Date());
  if (!patch) throw new Error('action_requires_form');

  const admin = createAdminClient();
  const { error } = await admin.from('orders').update(patch).eq('id', order.id);
  if (error) throw new Error(error.message);

  if (action === 'cancel' && isStripeConfigured()) {
    const { data: subs } = await admin.from('subscriptions').select('stripe_subscription_id, status').eq('order_id', order.id);
    for (const sub of subs ?? []) {
      if (sub.status !== 'canceled') await getStripe().subscriptions.cancel(sub.stripe_subscription_id as string);
    }
  }

  await logAudit({
    userId: user.id,
    action: action === 'cancel' ? 'order.cancel' : 'order.status',
    entity: 'order',
    entityId: order.code,
    metadata: {
      action,
      ...(patch.status ? { status: `${order.status} → ${patch.status}` } : {}),
      ...(patch.production_status ? { production: `${order.production_status} → ${patch.production_status}` } : {}),
    },
  });
  const message = CUSTOMER_MESSAGE[action];
  if (message) await notifyCustomer(order, message[0], message[1]);
  refresh();
}

export async function assignOrder(orderId: string, _prev: OpsFormState, form: FormData): Promise<OpsFormState> {
  const user = await requirePermission('orders:assign');
  const order = await loadOrder(orderId);
  try {
    assertAllowed(order, user, 'assign');
  } catch {
    return { error: 'Este pedido não pode ser atribuído agora.' };
  }
  const assignee = uuid.safeParse(form.get('assignee'));
  if (!assignee.success) return { error: 'Escolha um responsável.' };
  const admin = createAdminClient();
  const { data: person } = await admin.from('users').select('id, name, email, role').eq('id', assignee.data).single();
  if (!person || !['admin', 'production'].includes(person.role as string)) return { error: 'Responsável inválido.' };

  await admin.from('orders').update({ assigned_to: person.id }).eq('id', order.id);
  await logAudit({ userId: user.id, action: 'order.update', entity: 'order', entityId: order.code, metadata: { assigned_to: person.email } });
  refresh();
  return { message: `Atribuído a ${person.name ?? person.email}.` };
}

const deliverySchema = z.object({
  url: z.string().trim().url('Informe a URL completa (https://…).').refine((v) => v.startsWith('https://'), 'Use uma URL com https://'),
  version: z.string().trim().max(40).optional().default(''),
  notes: z.string().trim().max(4000).optional().default(''),
  instructions: z.string().trim().max(4000).optional().default(''),
});

export async function deliverOrder(orderId: string, _prev: OpsFormState, form: FormData): Promise<OpsFormState> {
  const user = await requireRole('admin', 'production');
  const order = await loadOrder(orderId);
  try {
    assertAllowed(order, user, 'deliver');
  } catch {
    return { error: 'Marque como pronto antes de enviar a entrega.' };
  }
  const parsed = deliverySchema.safeParse(Object.fromEntries(form));
  if (!parsed.success) return { error: parsed.error.issues[0]?.message };

  const admin = createAdminClient();
  const now = new Date().toISOString();
  await admin.from('deliveries').insert({
    order_id: order.id,
    url: parsed.data.url,
    version: parsed.data.version || null,
    notes: parsed.data.notes || null,
    instructions: parsed.data.instructions || null,
    created_by: user.id,
  });
  await admin
    .from('orders')
    .update({ status: 'ready', production_status: 'done', delivery_url: parsed.data.url, ...(order.delivered_at ? {} : { delivered_at: now }) })
    .eq('id', order.id);
  await admin.from('revisions').update({ status: 'done', completed_at: now }).eq('order_id', order.id).eq('status', 'in_progress');

  await notifyCustomer(order, 'Seu produto está pronto.', `${order.products?.name ?? 'Produto'} — acesse pela sua área.`);
  await logAudit({
    userId: user.id,
    action: 'delivery.send',
    entity: 'order',
    entityId: order.code,
    metadata: { url: parsed.data.url, version: parsed.data.version, status: `${order.status} → ready` },
  });
  refresh();
  return { message: 'Entrega enviada ao cliente.' };
}

/** BRL "1.497,00" / "1497" / "1497.5" → cents. */
function toCents(value: FormDataEntryValue | null): number | null {
  if (typeof value !== 'string' || value.trim() === '') return null;
  const normalized = value.trim().replace(/\s|R\$/g, '').replace(/\.(?=\d{3}(\D|$))/g, '').replace(',', '.');
  const amount = Number(normalized);
  return Number.isFinite(amount) && amount >= 0 ? Math.round(amount * 100) : Number.NaN;
}

export async function quoteOrder(orderId: string, _prev: OpsFormState, form: FormData): Promise<OpsFormState> {
  const user = await requirePermission('prices:write');
  const order = await loadOrder(orderId);
  try {
    assertAllowed(order, user, 'quote');
  } catch {
    return { error: 'Orçamento disponível apenas para pedidos Custom/Enterprise não pagos.' };
  }
  const setup = toCents(form.get('setup'));
  const monthly = toCents(form.get('monthly'));
  const days = z.coerce.number().int().min(1).max(180).safeParse(form.get('delivery_days'));
  if (setup === null || Number.isNaN(setup) || monthly === null || Number.isNaN(monthly)) return { error: 'Informe setup e mensalidade válidos.' };
  if (!days.success) return { error: 'Prazo entre 1 e 180 dias úteis.' };
  const note = z.string().trim().max(2000).safeParse(form.get('note') ?? '');

  const admin = createAdminClient();
  await admin
    .from('orders')
    .update({ setup_price: setup, monthly_price: monthly, delivery_days: days.data, status: 'awaiting_payment', notes: note.success ? note.data || null : null })
    .eq('id', order.id);
  await notifyCustomer(order, 'Sua proposta está pronta', `Escopo aprovado: ${days.data} dias úteis. Revise e pague para iniciar.`);
  await logAudit({
    userId: user.id,
    action: 'price.update',
    entity: 'order',
    entityId: order.code,
    metadata: { setup, monthly, delivery_days: days.data, status: `${order.status} → awaiting_payment` },
  });
  refresh();
  return { message: 'Proposta enviada ao cliente.' };
}

export async function recalcDeadline(orderId: string): Promise<void> {
  const user = await requirePermission('orders:write');
  const order = await loadOrder(orderId);
  const { data } = await createAdminClient().from('orders').select('paid_at, delivery_days').eq('id', order.id).single();
  if (!data?.paid_at || !data.delivery_days) return;
  const deadline = calcDeadline(new Date(data.paid_at as string), data.delivery_days as number, await loadHolidays()).toISOString();
  await createAdminClient().from('orders').update({ deadline }).eq('id', order.id);
  await logAudit({ userId: user.id, action: 'order.update', entity: 'order', entityId: order.code, metadata: { deadline } });
  refresh();
}

export async function respondRevision(revisionId: string, _prev: OpsFormState, form: FormData): Promise<OpsFormState> {
  const user = await requireRole();
  if (!uuid.safeParse(revisionId).success) return { error: 'Solicitação inválida.' };
  const admin = createAdminClient();
  const { data: revision } = await admin.from('revisions').select('id, order_id').eq('id', revisionId).single();
  if (!revision) return { error: 'Solicitação não encontrada.' };
  const order = await loadOrder(revision.order_id as string);
  const mayRespond = can(user.role, 'revisions:respond') || (user.role === 'production' && order.assigned_to === user.id);
  if (!mayRespond) return { error: 'Sem permissão para responder.' };

  const parsed = z
    .object({ status: z.enum(['open', 'in_progress', 'done']), response: z.string().trim().max(3000).optional().default('') })
    .safeParse(Object.fromEntries(form));
  if (!parsed.success) return { error: 'Dados inválidos.' };

  await admin
    .from('revisions')
    .update({ status: parsed.data.status, response: parsed.data.response || null, completed_at: parsed.data.status === 'done' ? new Date().toISOString() : null })
    .eq('id', revisionId);
  await notifyCustomer(order, 'Atualização na sua alteração', parsed.data.response || 'Status atualizado.');
  await logAudit({ userId: user.id, action: 'revision.update', entity: 'revision', entityId: order.code, metadata: { revision: revisionId, status: parsed.data.status } });
  refresh();
  return { message: 'Resposta registrada.' };
}

// Products ----------------------------------------------------------------------

const productSchema = z.object({
  name: z.string().trim().min(2).max(80),
  slug: z.string().trim().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug: letras minúsculas, números e hífens.').max(60),
  summary: z.string().trim().max(200).default(''),
  description: z.string().trim().max(2000).default(''),
  category: z.enum(CATEGORY_IDS),
  tier: z.enum(TIERS),
  preview: z.enum(PREVIEW_KINDS),
  delivery_days: z.union([z.literal(''), z.coerce.number().int().min(1).max(180)]),
  sort_order: z.coerce.number().int().min(0).max(100000),
  image_url: z.union([z.literal(''), z.string().url()]),
  external_costs_note: z.string().trim().max(300).default(''),
  seo_title: z.string().trim().max(70).default(''),
  seo_description: z.string().trim().max(160).default(''),
});

export async function saveProduct(productId: string | null, _prev: OpsFormState, form: FormData): Promise<OpsFormState> {
  const user = await requirePermission('products:write');
  const raw = Object.fromEntries(form);
  const parsed = productSchema.safeParse(raw);
  if (!parsed.success) return { error: parsed.error.issues.map((i) => `${String(i.path[0])}: ${i.message}`)[0] };
  const setup = toCents(form.get('setup_price'));
  const monthly = toCents(form.get('monthly_price'));
  if (Number.isNaN(setup) || Number.isNaN(monthly)) return { error: 'Preços inválidos.' };
  if (parsed.data.tier === 'standard' && (setup === null || monthly === null || parsed.data.delivery_days === '')) {
    return { error: 'Produtos Standard precisam de setup, mensalidade e prazo.' };
  }

  let briefing: unknown = [];
  const briefingRaw = String(form.get('briefing_schema') ?? '').trim();
  if (briefingRaw) {
    try {
      const check = briefingSchemaValidator.safeParse(JSON.parse(briefingRaw));
      if (!check.success) return { error: `Briefing: ${check.error.issues[0]?.message}` };
      briefing = check.data;
    } catch {
      return { error: 'Briefing: JSON inválido.' };
    }
  }
  const features = String(form.get('features') ?? '')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .slice(0, 20);

  const row = {
    ...parsed.data,
    delivery_days: parsed.data.delivery_days === '' ? null : parsed.data.delivery_days,
    image_url: parsed.data.image_url || null,
    external_costs_note: parsed.data.external_costs_note || null,
    seo_title: parsed.data.seo_title || null,
    seo_description: parsed.data.seo_description || null,
    setup_price: setup,
    monthly_price: monthly,
    price_from: raw.price_from === 'on',
    featured: raw.featured === 'on',
    active: raw.active === 'on',
    briefing_schema: briefing,
  };

  const admin = createAdminClient();
  type Prices = { setup_price: number | null; monthly_price: number | null };
  let previous: Prices | null = null;
  let id = productId;
  if (id) {
    if (!uuid.safeParse(id).success) return { error: 'Produto inválido.' };
    const { data } = await admin.from('products').select('setup_price, monthly_price').eq('id', id).single();
    previous = (data as Prices | null) ?? null;
    const { error } = await admin.from('products').update(row).eq('id', id);
    if (error) return { error: error.code === '23505' ? 'Já existe um produto com esse slug.' : error.message };
  } else {
    const { data, error } = await admin.from('products').insert(row).select('id').single();
    if (error || !data) return { error: error?.code === '23505' ? 'Já existe um produto com esse slug.' : (error?.message ?? 'Erro ao criar.') };
    id = data.id as string;
  }

  await admin.from('product_features').delete().eq('product_id', id);
  if (features.length) await admin.from('product_features').insert(features.map((name) => ({ product_id: id, name })));

  await logAudit({ userId: user.id, action: 'product.update', entity: 'product', entityId: row.slug, metadata: { created: !productId } });
  if (previous && (previous.setup_price !== setup || previous.monthly_price !== monthly)) {
    await logAudit({
      userId: user.id,
      action: 'price.update',
      entity: 'product',
      entityId: row.slug,
      metadata: { setup: `${previous.setup_price} → ${setup}`, monthly: `${previous.monthly_price} → ${monthly}` },
    });
    // Stored Stripe prices no longer match: checkout falls back to inline prices until re-synced.
    await admin.from('products').update({ stripe_setup_price_id: null, stripe_monthly_price_id: null }).eq('id', id);
  }
  revalidatePath('/sites/factory', 'layout');
  refresh();
  if (!productId) redirect(`/products/${id}?criado=1`);
  return { message: 'Produto salvo. O site público atualiza em instantes.' };
}

export async function deleteProduct(productId: string): Promise<void> {
  const user = await requirePermission('products:write');
  if (!uuid.safeParse(productId).success) return;
  const admin = createAdminClient();
  const { count } = await admin.from('orders').select('id', { count: 'exact', head: true }).eq('product_id', productId);
  const { data } = await admin.from('products').select('slug').eq('id', productId).single();
  if ((count ?? 0) > 0) {
    await admin.from('products').update({ active: false }).eq('id', productId);
  } else {
    await admin.from('products').delete().eq('id', productId);
  }
  await logAudit({ userId: user.id, action: 'product.update', entity: 'product', entityId: (data?.slug as string) ?? productId, metadata: { removed: (count ?? 0) === 0, deactivated: (count ?? 0) > 0 } });
  revalidatePath('/sites/factory', 'layout');
  refresh();
  redirect('/products');
}

export async function syncStripePrices(productId: string): Promise<void> {
  const user = await requirePermission('prices:write');
  if (!isStripeConfigured() || !uuid.safeParse(productId).success) return;
  const admin = createAdminClient();
  const { data: product } = await admin.from('products').select('id, name, slug, setup_price, monthly_price, stripe_product_id').eq('id', productId).single();
  if (!product || product.setup_price === null || product.monthly_price === null) return;

  const stripe = getStripe();
  const stripeProductId =
    (product.stripe_product_id as string | null) ??
    (await stripe.products.create({ name: `ViraWeb Factory — ${product.name}`, metadata: { slug: product.slug as string } })).id;
  const setupPrice = await stripe.prices.create({ product: stripeProductId, currency: 'brl', unit_amount: product.setup_price as number, nickname: 'setup' });
  const monthlyPrice = await stripe.prices.create({
    product: stripeProductId,
    currency: 'brl',
    unit_amount: product.monthly_price as number,
    recurring: { interval: 'month' },
    nickname: 'mensalidade',
  });
  await admin
    .from('products')
    .update({ stripe_product_id: stripeProductId, stripe_setup_price_id: setupPrice.id, stripe_monthly_price_id: monthlyPrice.id })
    .eq('id', productId);
  await logAudit({ userId: user.id, action: 'price.update', entity: 'product', entityId: product.slug as string, metadata: { stripe: 'synced' } });
  refresh();
}

// Settings ----------------------------------------------------------------------

export async function addHoliday(_prev: OpsFormState, form: FormData): Promise<OpsFormState> {
  const user = await requirePermission('settings:write');
  const parsed = z
    .object({ day: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Data inválida.'), name: z.string().trim().min(2).max(80) })
    .safeParse(Object.fromEntries(form));
  if (!parsed.success) return { error: parsed.error.issues[0]?.message };
  const { error } = await createAdminClient().from('holidays').upsert(parsed.data);
  if (error) return { error: error.message };
  await logAudit({ userId: user.id, action: 'settings.update', entity: 'holiday', entityId: parsed.data.day, metadata: { name: parsed.data.name } });
  refresh();
  return { message: 'Feriado salvo.' };
}

export async function removeHoliday(day: string): Promise<void> {
  const user = await requirePermission('settings:write');
  if (!/^\d{4}-\d{2}-\d{2}$/.test(day)) return;
  await createAdminClient().from('holidays').delete().eq('day', day);
  await logAudit({ userId: user.id, action: 'settings.update', entity: 'holiday', entityId: day, metadata: { removed: true } });
  refresh();
}

export async function setUserRole(_prev: OpsFormState, form: FormData): Promise<OpsFormState> {
  const user = await requirePermission('users:manage');
  const parsed = z
    .object({ email: z.string().trim().toLowerCase().email('E-mail inválido.'), role: z.enum(ROLES) })
    .safeParse(Object.fromEntries(form));
  if (!parsed.success) return { error: parsed.error.issues[0]?.message };
  if (parsed.data.email === user.email.toLowerCase() && parsed.data.role !== 'admin') {
    return { error: 'Você não pode remover o seu próprio acesso de admin.' };
  }
  const admin = createAdminClient();
  const { data: target } = await admin.from('users').select('id, role').eq('email', parsed.data.email).maybeSingle();
  if (!target) return { error: 'Usuário não encontrado. A pessoa precisa criar a conta antes.' };
  await admin.from('users').update({ role: parsed.data.role }).eq('id', target.id);
  await logAudit({
    userId: user.id,
    action: 'user.role',
    entity: 'user',
    entityId: parsed.data.email,
    metadata: { role: `${target.role} → ${parsed.data.role}` },
  });
  refresh();
  return { message: `Papel atualizado para ${parsed.data.role}.` };
}

export async function markOpsNotificationsRead(): Promise<void> {
  await requireRole();
  await createAdminClient().from('notifications').update({ read: true }).is('user_id', null).eq('read', false);
  refresh();
}
