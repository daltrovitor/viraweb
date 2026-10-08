// Hello World
import type { Metadata } from 'next';
import Link from 'next/link';
import { requirePermission } from '@/lib/auth/guards';
import { createClient } from '@/lib/supabase/server';
import { CATEGORIES } from '@/lib/factory/catalog';
import { mapProduct, PRODUCT_SELECT, type ProductRow } from '@/lib/factory/repo';
import { monthlyLabel, setupLabel, TIER_LABEL, deliveryLabel } from '@/lib/factory/format';
import { cn } from '@/lib/utils';
import { StatusBadge } from '@/components/factory/status-badge';
import { Empty, PageHeader, opsButton, opsButtonVariant, tableClass, tableWrap, tdClass, thClass } from '@/components/ops/ui';

export const metadata: Metadata = { title: 'Produtos' };
export const dynamic = 'force-dynamic';

export default async function OpsProductsPage() {
  await requirePermission('products:write');
  const supabase = await createClient();
  const { data } = await supabase.from('products').select(PRODUCT_SELECT).order('sort_order', { ascending: true });
  const products = ((data ?? []) as unknown as ProductRow[]).map(mapProduct);
  const label = (id: string) => CATEGORIES.find((c) => c.id === id)?.label ?? id;

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Produtos"
        description="Catálogo público da Factory. Alterações aparecem no site em instantes, sem deploy."
        actions={<Link href="/products/new" className={cn(opsButton, opsButtonVariant.primary)}>Novo produto</Link>}
      />
      <div className={tableWrap}>
        {products.length === 0 ? (
          <Empty>Nenhum produto. Aplique as migrations do Supabase para carregar o catálogo.</Empty>
        ) : (
          <table className={tableClass}>
            <thead>
              <tr>
                {['Ordem', 'Produto', 'Categoria', 'Tipo', 'Setup', 'Mensalidade', 'Prazo', 'Status'].map((h) => (
                  <th key={h} scope="col" className={thClass}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-surface">
                  <td className={cn(tdClass, 'font-mono text-xs text-mute')}>{p.sortOrder}</td>
                  <td className={tdClass}>
                    <Link href={`/products/${p.id}`} className="font-medium text-ink hover:text-brand hover:underline">{p.name}</Link>
                    <span className="block font-mono text-[0.68rem] text-mute">/{p.slug}</span>
                  </td>
                  <td className={tdClass}>{label(p.category)}</td>
                  <td className={tdClass}>{TIER_LABEL[p.tier]}{p.featured ? <span className="ml-1 text-xs text-brand">· destaque</span> : null}</td>
                  <td className={cn(tdClass, 'whitespace-nowrap tabular-nums')}>{setupLabel(p)}</td>
                  <td className={cn(tdClass, 'whitespace-nowrap tabular-nums')}>{p.monthlyPrice === null ? '—' : monthlyLabel(p)}</td>
                  <td className={cn(tdClass, 'whitespace-nowrap text-xs')}>{deliveryLabel(p)}</td>
                  <td className={tdClass}><StatusBadge tone={p.active ? 'success' : 'neutral'}>{p.active ? 'Ativo' : 'Inativo'}</StatusBadge></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
