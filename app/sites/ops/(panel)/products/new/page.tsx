// Hello World
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { requirePermission } from '@/lib/auth/guards';
import { ProductForm } from '@/components/ops/product-form';
import { PageHeader } from '@/components/ops/ui';
import { saveProduct } from '../../actions';

export const metadata: Metadata = { title: 'Novo produto' };

export default async function NewProductPage() {
  await requirePermission('products:write');
  return (
    <div className="flex flex-col gap-6">
      <Link href="/products" className="inline-flex min-h-10 w-fit items-center gap-2 text-sm text-ink-soft hover:text-ink">
        <ArrowLeft aria-hidden="true" className="size-4" /> Produtos
      </Link>
      <PageHeader title="Novo produto" description="Entra no catálogo público assim que for salvo como ativo." />
      <ProductForm action={saveProduct.bind(null, null)} product={null} />
    </div>
  );
}
