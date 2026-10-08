// Hello World
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { requirePermission } from '@/lib/auth/guards';
import { isStripeConfigured } from '@/lib/env';
import { createClient } from '@/lib/supabase/server';
import { mapProduct, PRODUCT_SELECT, type ProductRow } from '@/lib/factory/repo';
import { FACTORY } from '@/lib/factory/site';
import { stripeDashboardUrl } from '@/lib/stripe';
import { ProductForm } from '@/components/ops/product-form';
import { OpsActionButton } from '@/components/ops/forms';
import { PageHeader, Panel } from '@/components/ops/ui';
import { deleteProduct, saveProduct, syncStripePrices } from '../../actions';

export const metadata: Metadata = { title: 'Editar produto' };
export const dynamic = 'force-dynamic';

interface Props {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ criado?: string }>;
}

export default async function EditProductPage({ params, searchParams }: Props) {
  await requirePermission('products:write');
  const [{ id }, { criado }] = await Promise.all([params, searchParams]);
  if (!/^[0-9a-f-]{36}$/i.test(id)) notFound();
  const supabase = await createClient();
  const { data } = await supabase
    .from('products')
    .select(`${PRODUCT_SELECT}, stripe_product_id, stripe_setup_price_id, stripe_monthly_price_id`)
    .eq('id', id)
    .maybeSingle();
  if (!data) notFound();
  const row = data as unknown as ProductRow & { stripe_product_id: string | null; stripe_setup_price_id: string | null; stripe_monthly_price_id: string | null };
  const product = mapProduct(row);
  const { count } = await supabase.from('orders').select('id', { count: 'exact', head: true }).eq('product_id', id);

  return (
    <div className="flex flex-col gap-6">
      <Link href="/products" className="inline-flex min-h-10 w-fit items-center gap-2 text-sm text-ink-soft hover:text-ink">
        <ArrowLeft aria-hidden="true" className="size-4" /> Produtos
      </Link>
      <PageHeader
        title={product.name}
        description={
          <>
            {criado ? 'Produto criado. ' : ''}
            <a href={`${FACTORY.url}/products/${product.slug}`} target="_blank" rel="noopener noreferrer" className="text-brand hover:underline">
              Ver no site ↗
            </a>{' '}
            · {count ?? 0} pedido(s)
          </>
        }
        actions={
          <OpsActionButton
            action={deleteProduct.bind(null, id)}
            label={(count ?? 0) > 0 ? 'Desativar' : 'Excluir'}
            variant="danger"
            confirm={(count ?? 0) > 0 ? 'O produto tem pedidos e será apenas desativado. Continuar?' : 'Excluir definitivamente este produto?'}
          />
        }
      />

      <ProductForm action={saveProduct.bind(null, id)} product={product} />

      <Panel title="Stripe">
        <div className="flex flex-col gap-3 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p className="text-ink-soft">
            {row.stripe_monthly_price_id ? (
              <>
                Preços sincronizados ·{' '}
                <a href={stripeDashboardUrl('products', row.stripe_product_id ?? '')} target="_blank" rel="noopener noreferrer" className="font-mono text-xs text-brand hover:underline">
                  {row.stripe_product_id} ↗
                </a>
              </>
            ) : (
              'Sem Prices no Stripe: o checkout usa preços inline do pedido (funciona normalmente). Sincronize para relatórios por produto no Stripe.'
            )}
          </p>
          {isStripeConfigured() && product.setupPrice !== null && product.monthlyPrice !== null ? (
            <OpsActionButton action={syncStripePrices.bind(null, id)} label={row.stripe_monthly_price_id ? 'Ressincronizar preços' : 'Criar Prices no Stripe'} />
          ) : null}
        </div>
      </Panel>
    </div>
  );
}
