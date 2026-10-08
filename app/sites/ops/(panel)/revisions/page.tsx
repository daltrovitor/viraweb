// Hello World
import type { Metadata } from 'next';
import Link from 'next/link';
import { requirePermission } from '@/lib/auth/guards';
import { createClient } from '@/lib/supabase/server';
import { formatDateTime } from '@/lib/factory/format';
import { cn } from '@/lib/utils';
import { StatusBadge } from '@/components/factory/status-badge';
import { Empty, PageHeader, tableClass, tableWrap, tdClass, thClass } from '@/components/ops/ui';

export const metadata: Metadata = { title: 'Alterações' };
export const dynamic = 'force-dynamic';

const LABEL = { open: ['Aberta', 'warning'], in_progress: ['Em andamento', 'progress'], done: ['Concluída', 'success'] } as const;

interface Row {
  id: string;
  description: string;
  status: keyof typeof LABEL;
  created_at: string;
  orders: { id: string; code: string; products: { name: string } | null } | null;
}

export default async function RevisionsPage({ searchParams }: { searchParams: Promise<{ todas?: string }> }) {
  await requirePermission('orders:read');
  const { todas } = await searchParams;
  const supabase = await createClient();
  let query = supabase
    .from('revisions')
    .select('id, description, status, created_at, orders(id, code, products(name))')
    .order('created_at', { ascending: false })
    .limit(200);
  if (!todas) query = query.neq('status', 'done');
  const { data } = await query;
  // RLS may hide the parent order (production only sees assigned orders).
  const rows = ((data ?? []) as unknown as Row[]).filter((r) => r.orders);

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Solicitações de alteração"
        description={todas ? 'Todas as solicitações' : 'Abertas e em andamento'}
        actions={
          <Link href={todas ? '/revisions' : '/revisions?todas=1'} className="text-sm font-medium text-brand hover:underline">
            {todas ? 'Só pendentes' : 'Ver todas'}
          </Link>
        }
      />
      <div className={tableWrap}>
        {rows.length === 0 ? (
          <Empty>Nenhuma solicitação pendente.</Empty>
        ) : (
          <table className={tableClass}>
            <thead>
              <tr>
                {['Pedido', 'Produto', 'Solicitação', 'Data', 'Status'].map((h) => (
                  <th key={h} scope="col" className={thClass}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="hover:bg-surface">
                  <td className={tdClass}>
                    <Link href={`/orders/${r.orders?.id}`} className="font-mono text-xs font-medium text-brand hover:underline">{r.orders?.code}</Link>
                  </td>
                  <td className={tdClass}>{r.orders?.products?.name}</td>
                  <td className={cn(tdClass, 'max-w-md')}><span className="line-clamp-2">{r.description}</span></td>
                  <td className={cn(tdClass, 'whitespace-nowrap text-xs text-ink-soft')}>{formatDateTime(r.created_at)}</td>
                  <td className={tdClass}><StatusBadge tone={LABEL[r.status][1]}>{LABEL[r.status][0]}</StatusBadge></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
