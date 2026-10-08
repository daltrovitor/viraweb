// Hello World
import type { Metadata } from 'next';
import { requirePermission } from '@/lib/auth/guards';
import { createClient } from '@/lib/supabase/server';
import { formatDateTime } from '@/lib/factory/format';
import { cn } from '@/lib/utils';
import { Empty, PageHeader, tableClass, tableWrap, tdClass, thClass } from '@/components/ops/ui';

export const metadata: Metadata = { title: 'Auditoria' };
export const dynamic = 'force-dynamic';

interface Row {
  id: string;
  action: string;
  entity: string;
  entity_id: string | null;
  metadata: Record<string, unknown>;
  created_at: string;
  users: { name: string | null; email: string; role: string } | null;
}

const VERB: Record<string, string> = {
  login: 'entrou no Operations',
  logout: 'saiu do Operations',
  'order.create': 'criou o pedido',
  'order.update': 'alterou',
  'order.status': 'alterou o pedido',
  'order.cancel': 'cancelou',
  'price.update': 'alterou preço de',
  'product.update': 'alterou o produto',
  'delivery.send': 'entregou o pedido',
  'subscription.update': 'atualizou a assinatura',
  'revision.update': 'respondeu alteração do pedido',
  'settings.update': 'alterou configuração',
  'user.role': 'alterou o papel de',
};

const ROLE = { admin: 'Admin', production: 'Produção', support: 'Suporte', customer: 'Cliente' } as Record<string, string>;

function describe(meta: Record<string, unknown>) {
  return Object.entries(meta)
    .filter(([key]) => key !== 'ip')
    .map(([key, value]) => `${key}: ${typeof value === 'object' ? JSON.stringify(value) : String(value)}`)
    .join(' · ');
}

export default async function AuditPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  await requirePermission('audit:read');
  const { q = '' } = await searchParams;
  const supabase = await createClient();
  let query = supabase
    .from('audit_logs')
    .select('id, action, entity, entity_id, metadata, created_at, users(name, email, role)')
    .order('created_at', { ascending: false })
    .limit(300);
  const term = q.trim().slice(0, 60);
  if (term) query = query.ilike('entity_id', `%${term.replace(/[%_]/g, '')}%`);
  const { data } = await query;
  const rows = (data ?? []) as unknown as Row[];

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Auditoria" description="Registro imutável das ações importantes (últimas 300)." />
      <form role="search" action="/audit" className="flex gap-2">
        <label htmlFor="audit-q" className="sr-only">Filtrar por entidade</label>
        <input id="audit-q" name="q" defaultValue={q} placeholder="VF-1024, slug, e-mail…  ( / )" data-ops-search className="block w-full max-w-sm rounded-sm border border-line-strong px-3 py-2 text-sm" />
      </form>
      <div className={tableWrap}>
        {rows.length === 0 ? <Empty>Nenhum registro.</Empty> : (
          <table className={tableClass}>
            <thead>
              <tr>{['Quando', 'Quem', 'Ação', 'Detalhes'].map((h) => <th key={h} scope="col" className={thClass}>{h}</th>)}</tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id}>
                  <td className={cn(tdClass, 'whitespace-nowrap text-xs text-ink-soft')}>{formatDateTime(r.created_at)}</td>
                  <td className={cn(tdClass, 'whitespace-nowrap')}>
                    {r.users ? `${ROLE[r.users.role] ?? ''} ${r.users.name ?? r.users.email}` : <span className="text-mute">Sistema (Stripe)</span>}
                  </td>
                  <td className={tdClass}>
                    {VERB[r.action] ?? r.action} {r.entity_id ? <span className="font-mono text-xs font-medium">#{r.entity_id}</span> : null}
                  </td>
                  <td className={cn(tdClass, 'max-w-md font-mono text-xs text-ink-soft')}>{describe(r.metadata)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
