// Hello World
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { CATEGORIES } from '@/lib/factory/catalog';
import { deliveryLabel, monthlyLabel, setupLabel } from '@/lib/factory/format';
import { listProducts } from '@/lib/factory/repo';
import { CategoryRail } from '@/components/factory/category-rail';
import { TierBadge } from '@/components/factory/tier-badge';
import { SplitWords } from '@/components/motion/split-words';

export const revalidate = 300;

export const metadata: Metadata = {
  title: 'Produtos',
  description: 'Catálogo da ViraWeb Factory: sites, automações, bots, sistemas, ferramentas e apps com preço de setup e mensalidade transparentes.',
  alternates: { canonical: '/products' },
};

export default async function ProductsPage() {
  const products = await listProducts();
  const groups = CATEGORIES.map((category) => ({
    ...category,
    items: products.filter((p) => p.category === category.id),
  })).filter((group) => group.items.length > 0);

  return (
    <div className="mx-auto max-w-[1440px] px-4 pb-24 pt-[calc(var(--nav-h)+4rem)] sm:px-8 sm:pb-32 lg:px-12">
      <header className="grid grid-cols-12 gap-x-4 gap-y-6 pb-12 sm:pb-16">
        <SplitWords
          as="h1"
          className="col-span-12 text-[clamp(2.75rem,9vw,8rem)] font-semibold leading-[0.9] tracking-[-0.055em] text-ink lg:col-span-9"
          parts={['Escolha.', { br: true }, { text: 'Explique. Receba.', className: 'font-serif font-normal italic tracking-[-0.02em] text-brand' }]}
        />
        <p className="col-span-12 max-w-[44ch] text-ink-soft md:col-span-7 lg:col-span-3 lg:self-end">
          Produtos <strong className="font-semibold text-ink">Standard</strong> ficam prontos em até 2 dias úteis.
          Custom e Enterprise têm escopo e prazo definidos após análise do briefing.
        </p>
      </header>

      <CategoryRail categories={groups.map((g) => ({ id: g.id, label: g.label, count: g.items.length }))} />

      {groups.map((group) => (
        <section key={group.id} id={group.id} aria-labelledby={`${group.id}-title`} className="scroll-mt-40 pt-16 sm:pt-20">
          <div className="grid grid-cols-12 gap-x-4 gap-y-3 border-b border-ink pb-5">
            <h2 id={`${group.id}-title`} className="col-span-12 text-[clamp(1.75rem,3.6vw,3rem)] font-semibold tracking-[-0.045em] text-ink md:col-span-6">
              {group.label}
            </h2>
            <p className="col-span-12 text-ink-soft md:col-span-5 md:col-start-8 md:self-end md:text-right">{group.description}</p>
          </div>
          <ul>
            {group.items.map((product) => (
              <li key={product.slug} className="border-b border-line">
                <Link
                  href={`/products/${product.slug}`}
                  className="group grid grid-cols-12 items-baseline gap-x-4 gap-y-2 py-6 transition-colors hover:bg-surface sm:px-2"
                >
                  <span className="col-span-12 flex items-center gap-3 md:col-span-4">
                    <span className="text-[1.3rem] font-semibold tracking-[-0.035em] text-ink">{product.name}</span>
                    <TierBadge tier={product.tier} />
                  </span>
                  <span className="col-span-12 text-ink-soft md:col-span-4">{product.summary}</span>
                  <span className="col-span-6 text-sm md:col-span-2">
                    <span className="block font-semibold text-ink">{setupLabel(product)}</span>
                    <span className="block text-mute">{product.monthlyPrice === null ? 'mensalidade sob análise' : `+ ${monthlyLabel(product)}`}</span>
                  </span>
                  <span className="col-span-6 flex items-center justify-end gap-3 text-right font-mono text-[0.72rem] uppercase tracking-[0.1em] text-mute md:col-span-2">
                    {deliveryLabel(product)}
                    <ArrowRight aria-hidden="true" className="size-4 shrink-0 text-ink transition-transform duration-500 ease-out-expo group-hover:translate-x-1" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
