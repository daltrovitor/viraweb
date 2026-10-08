// Hello World
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Product } from '@/lib/factory/types';
import { formatBRL } from '@/lib/factory/format';
import { SectionHead, accent } from '@/components/factory/section-head';
import { Reveal } from '@/components/motion/reveal';

const COVERS = [
  'Infraestrutura',
  'Hospedagem',
  'Manutenção',
  'Disponibilidade',
  'Atualizações básicas',
  'Suporte conforme o plano',
];

/** Transparent pricing: what it costs to build, and what it costs to keep running. */
export function Pricing({ products }: { products: Product[] }) {
  return (
    <section id="precos" aria-labelledby="pricing-title" className="scroll-mt-20 border-t border-line bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12">
        <SectionHead
          id="pricing-title"
          index="04"
          title={['Um preço para construir.', { br: true }, accent('Outro para manter.')]}
          lede="Sem orçamento escondido. O setup paga a construção; a mensalidade mantém o produto no ar, funcionando e atualizado."
        />

        <div className="mt-14 grid grid-cols-12 gap-x-4 gap-y-12 lg:mt-20">
          <div className="col-span-12 lg:col-span-7 lg:col-start-3">
            <div className="border-t border-ink">
              <div aria-hidden="true" className="hidden grid-cols-[1fr_9rem_8rem_2rem] gap-4 border-b border-line py-3 font-mono text-[0.72rem] uppercase tracking-[0.12em] text-mute sm:grid">
                <span>Produto</span>
                <span className="text-right">Para construir</span>
                <span className="text-right">Para manter</span>
                <span />
              </div>
              <ul aria-label="Preços dos produtos Factory">
              {products.map((product) => (
                <li key={product.slug}>
                <Link
                  href={`/products/${product.slug}`}
                  className="group grid min-h-16 grid-cols-[1fr_auto] items-center gap-x-4 gap-y-1 border-b border-line py-4 transition-colors hover:bg-surface sm:grid-cols-[1fr_9rem_8rem_2rem] sm:px-2"
                >
                  <span className="col-span-2 text-[1.1rem] font-semibold tracking-[-0.03em] text-ink sm:col-span-1">
                    {product.name}
                  </span>
                  <span className="text-ink sm:text-right">
                    <span className="sr-only">Para construir: </span>
                    {product.setupPrice === null ? (
                      'Sob análise'
                    ) : (
                      <>
                        {product.priceFrom ? <span className="text-sm text-mute">a partir de </span> : null}
                        <span className="font-semibold tabular-nums">{formatBRL(product.setupPrice)}</span>
                      </>
                    )}
                  </span>
                  <span className="text-right tabular-nums text-ink-soft">
                    <span className="sr-only">Para manter: </span>
                    {product.monthlyPrice === null ? '—' : `${formatBRL(product.monthlyPrice)}/mês`}
                  </span>
                  <span className="hidden justify-self-end sm:block">
                    <ArrowRight aria-hidden="true" className="size-4 text-mute transition-transform duration-500 ease-out-expo group-hover:translate-x-1 group-hover:text-ink" />
                  </span>
                </Link>
                </li>
              ))}
              </ul>
            </div>
            <p className="mt-5 text-sm text-mute">
              Custos externos de API (WhatsApp, modelos de IA, envio de mensagens) são cobrados à parte, direto pelo provedor.
            </p>
          </div>

          <Reveal className="col-span-12 lg:col-span-3">
            <h3 className="text-[1.35rem] font-semibold leading-tight tracking-[-0.035em] text-ink">A mensalidade não é só hospedagem.</h3>
            <ul className="mt-5 border-t border-line">
              {COVERS.map((item, i) => (
                <li key={item} className="flex min-h-11 items-center gap-4 border-b border-line text-ink-soft">
                  <span className="font-mono text-[0.72rem] text-mute">{String(i + 1).padStart(2, '0')}</span>
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
