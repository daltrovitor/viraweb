// Hello World
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { isSupabaseConfigured } from '@/lib/env';
import { getSessionUser } from '@/lib/auth/guards';
import { briefingFieldsFor } from '@/lib/factory/briefing';
import { deliveryLabel, monthlyLabel, setupLabel } from '@/lib/factory/format';
import { getProduct } from '@/lib/factory/repo';
import { FACTORY } from '@/lib/factory/site';
import { EXTERNAL_LINK_PROPS, whatsappLink } from '@/lib/site';
import { submitOrder } from './actions';
import { BriefingForm } from '@/components/factory/briefing-form';
import { AuthForm } from '@/components/factory/auth-form';
import { FormMessage } from '@/components/factory/ui/form';
import { TierBadge } from '@/components/factory/tier-badge';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  return { title: product ? `Criar ${product.name}` : 'Criar produto', robots: { index: false, follow: false } };
}

const STEPS = ['Produto', 'Configuração', 'Briefing', 'Pagamento'];

export default async function OrderPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();

  const configured = isSupabaseConfigured();
  const user = configured ? await getSessionUser() : null;
  const action = submitOrder.bind(null, product.slug);

  return (
    <div className="mx-auto grid max-w-[1440px] grid-cols-12 gap-x-4 gap-y-12 px-4 pb-24 pt-[calc(var(--nav-h)+2.5rem)] sm:px-8 sm:pb-32 lg:px-12">
      <aside className="col-span-12 lg:col-span-4">
        <div className="lg:sticky lg:top-[calc(var(--nav-h)+2rem)]">
          <Link href={`/products/${product.slug}`} className="inline-flex min-h-12 items-center gap-2 text-sm text-ink-soft hover:text-ink">
            <ArrowLeft aria-hidden="true" className="size-4" />
            Voltar ao produto
          </Link>
          <p className="mt-8 flex items-center gap-3">
            <TierBadge tier={product.tier} />
            <span className="font-mono text-[0.72rem] uppercase tracking-[0.12em] text-mute">{deliveryLabel(product)}</span>
          </p>
          <h1 className="mt-4 text-[clamp(2.25rem,5vw,4.5rem)] font-semibold leading-[0.95] tracking-[-0.05em] text-ink">{product.name}</h1>
          <p className="mt-4 max-w-[36ch] text-ink-soft">{product.summary}</p>
          <ol aria-label="Etapas do pedido" className="mt-10 border-t border-line">
            {STEPS.map((step, i) => (
              <li key={step} className="flex min-h-11 items-center gap-4 border-b border-line text-sm">
                <span className="font-mono text-[0.72rem] text-mute">0{i + 1}</span>
                <span className={i === 0 ? 'text-mute line-through' : 'text-ink'}>{step}</span>
              </li>
            ))}
          </ol>
          {product.externalCostsNote ? <p className="mt-4 text-sm text-mute">{product.externalCostsNote}</p> : null}
        </div>
      </aside>

      <section aria-label="Pedido" className="col-span-12 lg:col-span-7 lg:col-start-6">
        {!configured || !product.id ? (
          <FormMessage tone="info">
            Os pedidos online estão sendo ativados.{' '}
            <a href={whatsappLink(`Olá! Quero criar: ${product.name} (ViraWeb Factory).`)} {...EXTERNAL_LINK_PROPS} className="font-medium text-ink underline underline-offset-4">
              Peça pelo WhatsApp
            </a>{' '}
            e começamos agora.
          </FormMessage>
        ) : user ? (
          <BriefingForm
            action={action}
            fields={briefingFieldsFor(product)}
            tier={product.tier}
            priceSummary={{
              setup: setupLabel(product),
              monthly: product.monthlyPrice === null ? 'Sob análise' : monthlyLabel(product),
              delivery: deliveryLabel(product),
            }}
            termsUrl={`${FACTORY.mainUrl}/termos`}
          />
        ) : (
          <div className="max-w-xl">
            <h2 className="text-[1.75rem] font-semibold tracking-[-0.04em] text-ink">Primeiro, sua conta.</h2>
            <p className="mt-2 text-ink-soft">É por ela que você acompanha a produção e acessa o produto pronto.</p>
            <div className="mt-8">
              <AuthForm next={`/order/${product.slug}`} initialMode="signup" />
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
