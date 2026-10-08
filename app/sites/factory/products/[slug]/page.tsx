// Hello World
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { STATIC_CATALOG, categoryMeta } from '@/lib/factory/catalog';
import { briefingFieldsFor } from '@/lib/factory/briefing';
import { deliveryLabel, formatBRL } from '@/lib/factory/format';
import { getProduct } from '@/lib/factory/repo';
import { FACTORY } from '@/lib/factory/site';
import { ProductPreview } from '@/components/factory/previews';
import { TierBadge } from '@/components/factory/tier-badge';
import { ActionNavLink } from '@/components/factory/action-nav-link';
import { Reveal } from '@/components/motion/reveal';

export const revalidate = 300;

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return STATIC_CATALOG.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) return { title: 'Produto não encontrado' };
  const price = product.setupPrice === null ? '' : ` A partir de ${formatBRL(product.setupPrice)}.`;
  const title = product.seoTitle ?? `${product.name} — ${product.tier === 'standard' ? 'pronto em até 2 dias úteis' : 'sob medida'}`;
  const description = product.seoDescription ?? `${product.summary}${price} ${product.description}`.slice(0, 300);
  return {
    title,
    description,
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: { title: `${title} · ViraWeb Factory`, description, url: `/products/${product.slug}` },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();

  const category = categoryMeta(product.category);
  const fields = briefingFieldsFor(product);
  const standard = product.tier === 'standard';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `${product.name} — ViraWeb Factory`,
    description: product.description,
    category: category.label,
    brand: { '@type': 'Brand', name: 'ViraWeb' },
    url: `${FACTORY.url}/products/${product.slug}`,
    ...(product.setupPrice !== null
      ? {
          offers: {
            '@type': 'Offer',
            price: (product.setupPrice / 100).toFixed(2),
            priceCurrency: 'BRL',
            availability: 'https://schema.org/InStock',
            url: `${FACTORY.url}/order/${product.slug}`,
          },
        }
      : {}),
  };

  return (
    <article className="mx-auto max-w-[1440px] px-4 pb-24 pt-[calc(var(--nav-h)+2.5rem)] sm:px-8 sm:pb-32 lg:px-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav aria-label="Trilha" className="mb-10">
        <Link href={`/products#${product.category}`} className="inline-flex min-h-12 items-center gap-2 text-sm text-ink-soft hover:text-ink">
          <ArrowLeft aria-hidden="true" className="size-4" />
          {category.label}
        </Link>
      </nav>

      <div className="grid grid-cols-12 gap-x-4 gap-y-12">
        <header className="col-span-12 lg:col-span-6">
          <div className="flex items-center gap-3">
            <TierBadge tier={product.tier} />
            <span className="font-mono text-[0.72rem] uppercase tracking-[0.12em] text-mute">{deliveryLabel(product)}</span>
          </div>
          <h1 className="mt-6 text-[clamp(2.75rem,7vw,6.5rem)] font-semibold leading-[0.92] tracking-[-0.055em] text-ink">{product.name}</h1>
          <p className="mt-6 max-w-[40ch] text-[clamp(1.15rem,1.8vw,1.4rem)] leading-snug tracking-[-0.02em] text-ink">{product.summary}</p>
          <p className="mt-4 max-w-[52ch] text-ink-soft">{product.description}</p>

          <dl className="mt-10 grid grid-cols-2 border-t border-ink">
            <div className="border-b border-r border-line py-5 pr-4">
              <dt className="font-mono text-[0.72rem] uppercase tracking-[0.12em] text-mute">Para construir</dt>
              <dd className="mt-2 text-[clamp(1.6rem,3vw,2.4rem)] font-semibold tracking-[-0.045em] text-ink">
                {product.setupPrice === null ? 'Sob análise' : (
                  <>
                    {product.priceFrom ? <span className="block text-sm font-normal tracking-normal text-mute">a partir de</span> : null}
                    {formatBRL(product.setupPrice)}
                  </>
                )}
              </dd>
            </div>
            <div className="border-b border-line py-5 pl-4">
              <dt className="font-mono text-[0.72rem] uppercase tracking-[0.12em] text-mute">Para manter</dt>
              <dd className="mt-2 text-[clamp(1.6rem,3vw,2.4rem)] font-semibold tracking-[-0.045em] text-ink">
                {product.monthlyPrice === null ? 'Sob análise' : (
                  <>
                    {formatBRL(product.monthlyPrice)}
                    <span className="text-base font-normal tracking-normal text-mute">/mês</span>
                  </>
                )}
              </dd>
            </div>
          </dl>
          {product.externalCostsNote ? <p className="mt-4 text-sm text-mute">{product.externalCostsNote}</p> : null}

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <ActionNavLink href={`/order/${product.slug}`} label={standard ? 'Criar meu produto' : 'Solicitar análise'} className="w-full sm:w-auto" />
            <p className="text-sm text-mute">
              {standard ? 'Pagamento seguro via Stripe. O prazo começa com o briefing completo.' : 'Sem cobrança agora. Você recebe escopo, preço e prazo.'}
            </p>
          </div>
        </header>

        <div className="col-span-12 lg:col-span-5 lg:col-start-8">
          <div className="aspect-[4/3] w-full lg:sticky lg:top-[calc(var(--nav-h)+2rem)]">
            <ProductPreview kind={product.preview} animate />
          </div>
        </div>

        <Reveal className="col-span-12 md:col-span-6 lg:col-span-5">
          <h2 className="text-[1.5rem] font-semibold tracking-[-0.04em] text-ink">O que está incluído</h2>
          <ul className="mt-5 border-t border-line">
            {product.features.map((feature, i) => (
              <li key={feature} className="flex min-h-12 items-center gap-4 border-b border-line text-ink">
                <span className="font-mono text-[0.72rem] text-mute">{String(i + 1).padStart(2, '0')}</span>
                {feature}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="col-span-12 md:col-span-6 lg:col-span-5 lg:col-start-8">
          <h2 className="text-[1.5rem] font-semibold tracking-[-0.04em] text-ink">O que vamos te perguntar</h2>
          <p className="mt-2 text-ink-soft">Um briefing curto. O campo principal é a sua ideia, do seu jeito.</p>
          <ol className="mt-5 border-t border-line">
            {fields.map((field) => (
              <li key={field.name} className="flex min-h-11 items-center justify-between gap-4 border-b border-line text-sm text-ink-soft">
                {field.label}
                {field.required ? <span className="font-mono text-[0.66rem] uppercase tracking-[0.1em] text-mute">obrigatório</span> : null}
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </article>
  );
}
