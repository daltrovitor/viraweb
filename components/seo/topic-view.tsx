// Hello World
// Server-rendered topic page: every word is in the HTML that crawlers and AI
// assistants fetch, with no client-side language switch for the copy.
import Link from 'next/link';
import { ArrowUpRight, Plus } from 'lucide-react';
import SmoothScroll from '@/components/smooth-scroll';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { Reveal } from '@/components/motion/reveal';
import { ActionLink } from '@/components/ui/action-link';
import { EXTERNAL_LINK_PROPS, SITE, whatsappLink } from '@/lib/site';
import { getPontoControle, getPrx } from '@/lib/home/products';
import { getTopicPage, type TopicPage } from '@/lib/seo/pages';
import { serializeJsonLd, topicJsonLd } from '@/lib/structured-data';

function Section({ id, eyebrow, title, children }: { id: string; eyebrow: string; title: string; children: React.ReactNode }) {
  return (
    <section aria-labelledby={id} className="mx-auto max-w-[1440px] px-4 py-16 sm:px-8 sm:py-24 lg:px-12">
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={id} className="mt-5 max-w-[22ch] text-[clamp(1.9rem,4vw,3.5rem)] font-semibold leading-[1] tracking-[-0.05em] text-ink">
        {title}
      </h2>
      <div className="mt-10 sm:mt-14">{children}</div>
    </section>
  );
}

export function TopicView({ page }: { page: TopicPage }) {
  const prx = getPrx('pt');
  const ponto = getPontoControle('pt');
  const related = page.related.map((slug) => getTopicPage(slug)).filter((item): item is TopicPage => Boolean(item));
  const wa = whatsappLink(page.cta.message);

  return (
    <SmoothScroll>
      <script id={`ld-${page.slug}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(topicJsonLd(page)) }} />
      <Navbar />
      <main id="conteudo" className="relative z-10 bg-white">
        {/* Hero */}
        <section aria-labelledby="topic-title" className="relative overflow-x-clip pt-[calc(var(--nav-h)+1.5rem)]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-[36rem] bg-[radial-gradient(40%_50%_at_85%_10%,rgba(25,88,165,0.08),transparent_70%),radial-gradient(30%_40%_at_10%_0%,rgba(242,191,18,0.07),transparent_70%)]"
          />
          <div className="relative mx-auto max-w-[1440px] px-4 pb-12 pt-8 sm:px-8 sm:pt-12 lg:px-12 lg:pb-16">
            <nav aria-label="Trilha de navegação" className="text-sm text-mute">
              <ol className="flex flex-wrap items-center gap-2">
                <li>
                  <Link href="/" className="transition-colors hover:text-ink">
                    Início
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" className="text-ink-soft">
                  {page.label}
                </li>
              </ol>
            </nav>

            <div className="mt-8 grid grid-cols-12 gap-x-4 gap-y-10 lg:gap-x-10">
              <div className="col-span-12 lg:col-span-8">
                <p className="eyebrow">{page.eyebrow}</p>
                <h1
                  id="topic-title"
                  className="mt-6 text-[clamp(2.4rem,8vw,3.5rem)] font-semibold leading-[0.95] tracking-[-0.055em] text-ink [overflow-wrap:anywhere] lg:text-[clamp(3.5rem,5.6vw,6rem)]"
                >
                  {page.h1}{' '}
                  {page.h1Em ? <em className="font-serif font-normal italic tracking-[-0.02em] text-brand">{page.h1Em}</em> : null}
                </h1>
                <p className="mt-8 max-w-[60ch] text-lg font-medium leading-relaxed text-ink sm:text-xl">{page.definition}</p>
                <p className="mt-5 max-w-[60ch] text-base leading-relaxed text-ink-soft sm:text-lg">{page.lede}</p>
                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <ActionLink href={wa} {...EXTERNAL_LINK_PROPS} label={page.cta.label} className="w-full sm:w-auto" />
                  <ActionLink href="/#trabalhos" label="Explorar cases" variant="outline" className="w-full sm:w-auto" />
                </div>
              </div>

              <aside className="col-span-12 self-end lg:col-span-4">
                <div className="bezel">
                  <dl className="bezel-core divide-y divide-line">
                    {page.facts.map((fact) => (
                      <div key={fact.label} className="px-5 py-4 sm:px-6">
                        <dt className="font-mono text-[0.66rem] uppercase tracking-[0.12em] text-mute">{fact.label}</dt>
                        <dd className="mt-1 text-[0.95rem] font-medium leading-snug text-ink">{fact.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* What is included */}
        <Section id="incluso" eyebrow="Escopo" title={page.includedTitle}>
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {page.included.map((item, i) => (
              <li key={item.title}>
                <Reveal y={20} delay={(i % 3) * 0.05} className="h-full rounded-[1.75rem] bg-white p-6 shadow-[var(--shadow-soft)] ring-1 ring-black/[0.05] sm:p-7">
                  <span aria-hidden="true" className="font-mono text-[0.7rem] text-mute">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mt-6 text-xl font-semibold tracking-[-0.03em] text-ink">{item.title}</h3>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-soft">{item.body}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </Section>

        {/* Audience + steps */}
        <section aria-labelledby="como-funciona" className="mx-auto grid max-w-[1440px] grid-cols-12 gap-x-4 gap-y-12 px-4 py-16 sm:px-8 sm:py-24 lg:gap-x-10 lg:px-12">
          <div className="col-span-12 lg:col-span-5">
            <p className="eyebrow">Público</p>
            <h2 className="mt-5 text-[clamp(1.9rem,3.4vw,3rem)] font-semibold leading-[1] tracking-[-0.05em] text-ink">{page.audienceTitle}</h2>
            <ul className="mt-8 border-t border-line">
              {page.audience.map((item) => (
                <li key={item} className="flex gap-3 border-b border-line py-4 text-[0.98rem] leading-relaxed text-ink">
                  <span aria-hidden="true" className="mt-[0.55em] size-1.5 shrink-0 rotate-45 bg-sun" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-12 lg:col-span-6 lg:col-start-7">
            <p className="eyebrow">Como funciona</p>
            <h2 id="como-funciona" className="mt-5 text-[clamp(1.9rem,3.4vw,3rem)] font-semibold leading-[1] tracking-[-0.05em] text-ink">
              Do diagnóstico ao ar, em quatro passos.
            </h2>
            <ol className="mt-8 space-y-3">
              {page.steps.map((step, i) => (
                <li key={step.title} className="flex gap-5 rounded-[1.5rem] bg-surface p-5 sm:p-6">
                  <span className="text-3xl font-semibold leading-none tracking-[-0.06em] text-ink/15">{String(i + 1).padStart(2, '0')}</span>
                  <span>
                    <span className="block text-lg font-semibold tracking-[-0.02em] text-ink">{step.title}</span>
                    <span className="mt-1 block text-[0.95rem] leading-relaxed text-ink-soft">{step.body}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Proof */}
        <Section id="provas" eyebrow="Trabalhos" title="Plataformas desenvolvidas pela ViraWeb">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <Link href="/cases/prx" className="group bezel bezel-lg block">
              <div className="bezel-core relative h-full bg-prx-ink p-7 text-white sm:p-10">
                <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(60%_80%_at_100%_0%,rgba(118,7,253,0.45),transparent_70%),radial-gradient(50%_60%_at_0%_100%,rgba(11,217,253,0.25),transparent_70%)]" />
                <div className="relative">
                  <p className="font-mono text-[0.66rem] uppercase tracking-[0.14em] text-white/55">Case · Projetado e desenvolvido pela ViraWeb</p>
                  <p className="mt-6 bg-gradient-to-r from-[#a066ff] to-prx-cyan bg-clip-text text-5xl font-bold tracking-[-0.06em] text-transparent">{prx.name}</p>
                  <p className="mt-2 text-2xl font-semibold tracking-[-0.03em]">{prx.tagline}</p>
                  <p className="mt-4 max-w-[48ch] text-[0.95rem] leading-relaxed text-white/70">{prx.definition}</p>
                  <span className="mt-8 inline-flex items-center gap-2 text-sm font-medium">
                    Ver o case <ArrowUpRight className="size-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={1.6} />
                  </span>
                </div>
              </div>
            </Link>
            <Link href="/cases/pontocontrole" className="group bezel bezel-lg block">
              <div className="bezel-core h-full p-7 sm:p-10">
                <p className="font-mono text-[0.66rem] uppercase tracking-[0.14em] text-mute">Produto próprio · Controle de jornada</p>
                <p className="mt-6 text-5xl font-bold tracking-[-0.06em] text-ink">{ponto.name}</p>
                <p className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-brand">{ponto.category}</p>
                <p className="mt-4 max-w-[48ch] text-[0.95rem] leading-relaxed text-ink-soft">{ponto.definition}</p>
                <span className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-ink">
                  Conhecer o PontoControle <ArrowUpRight className="size-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={1.6} />
                </span>
              </div>
            </Link>
          </div>
          <p className="mt-6 text-[0.75rem] leading-relaxed text-mute">{prx.disclaimer}</p>
        </Section>

        {/* FAQ — native details, so answers are in the HTML and work without JS */}
        <Section id="perguntas" eyebrow="Perguntas frequentes" title={`Perguntas sobre ${page.label.toLowerCase()}`}>
          <div className="border-t border-line">
            {page.faq.map((item) => (
              <details key={item.question} className="group border-b border-line">
                <summary className="flex min-h-16 cursor-pointer list-none items-start justify-between gap-6 py-6 [&::-webkit-details-marker]:hidden">
                  <h3 className="text-lg font-semibold leading-snug tracking-[-0.02em] text-ink sm:text-xl">{item.question}</h3>
                  <span aria-hidden="true" className="grid size-9 shrink-0 place-items-center rounded-full bg-ink/[0.05] text-ink transition-transform duration-500 group-open:rotate-45">
                    <Plus className="size-4" strokeWidth={1.6} />
                  </span>
                </summary>
                <p className="max-w-[70ch] pb-7 text-[0.98rem] leading-relaxed text-ink-soft">{item.answer}</p>
              </details>
            ))}
          </div>
        </Section>

        {/* Related + CTA */}
        <section aria-labelledby="relacionados" className="mx-auto max-w-[1440px] px-4 pb-24 sm:px-8 sm:pb-36 lg:px-12">
          <h2 id="relacionados" className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-mute">
            Veja também
          </h2>
          <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {related.map((item) => (
              <li key={item.slug}>
                <a
                  href={`/${item.slug}`}
                  className="group flex min-h-16 items-center justify-between gap-4 rounded-[1.25rem] bg-surface px-5 py-4 text-[1.05rem] font-semibold tracking-[-0.02em] text-ink transition-colors hover:bg-brand-tint"
                >
                  {item.label}
                  <ArrowUpRight className="size-4 shrink-0 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={1.6} />
                </a>
              </li>
            ))}
          </ul>

          <div className="bezel bezel-lg mt-12">
            <div className="bezel-core relative bg-ink px-6 py-12 text-white sm:px-12 sm:py-16">
              <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(45%_70%_at_90%_10%,rgba(25,88,165,0.55),transparent_70%),radial-gradient(35%_60%_at_0%_100%,rgba(242,191,18,0.16),transparent_70%)]" />
              <div className="relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <p className="text-[clamp(1.9rem,4vw,3.5rem)] font-semibold leading-[1] tracking-[-0.05em]">
                    Diagnóstico gratuito <em className="font-serif font-normal italic text-sun">em 15 minutos.</em>
                  </p>
                  <p className="mt-4 max-w-[52ch] text-white/70">
                    Fale direto com um engenheiro da ViraWeb pelo WhatsApp {SITE.whatsappDisplay}. Sem compromisso.
                  </p>
                </div>
                <ActionLink href={wa} {...EXTERNAL_LINK_PROPS} label={page.cta.label} variant="light" className="w-full shrink-0 sm:w-auto" />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </SmoothScroll>
  );
}
