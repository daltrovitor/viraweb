// Hello World
'use client';

import type { CSSProperties } from 'react';
import { MapPin, ScanFace } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';
import { EXTERNAL_LINK_PROPS, whatsappLink, type Copy } from '@/lib/site';
import { trackContact } from '@/lib/analytics';
import { MARK_POLYGONS, MARK_VECTORS, MARK_VIEWBOX } from '@/components/brand/brand-mark';
import { ActionLink } from '@/components/ui/action-link';

interface HeroCopy {
  eyebrow: string;
  line1: string;
  em: string;
  tail: string;
  lede: string;
  primary: string;
  secondary: string;
  whatsapp: string;
  stageLabel: string;
  prxTag: string;
  pontoTitle: string;
  pontoMeta: string;
  speed: string;
  ticker: string[];
}

const COPY: Copy<HeroCopy> = {
  pt: {
    eyebrow: 'Desenvolvimento de software · Brasil',
    line1: 'Sistemas',
    em: 'sob',
    tail: 'medida.',
    lede: 'Criamos plataformas web, produtos por assinatura e automações que conectam suas ferramentas, reduzem o trabalho manual e acompanham o crescimento da sua operação.',
    primary: 'Solicitar diagnóstico do projeto',
    secondary: 'Explorar cases',
    whatsapp: 'Olá ViraWeb! Vi o site e quero agendar um diagnóstico gratuito para a minha empresa.',
    stageLabel: 'Produtos construídos pela ViraWeb',
    prxTag: 'O banco da Geração Z',
    pontoTitle: 'Ponto registrado',
    pontoMeta: '08:00 · GPS confirmado',
    speed: 'Uso fluido no celular',
    ticker: ['Plataformas web', 'Produtos por assinatura', 'Automações de processos', 'Integrações', 'Sistemas internos'],
  },
  en: {
    eyebrow: 'Software development · Brazil',
    line1: 'Custom',
    em: 'software',
    tail: 'systems.',
    lede: 'We build web platforms, subscription products and automations that connect your tools, reduce manual work and grow with your business.',
    primary: 'Request a project assessment',
    secondary: 'Explore case studies',
    whatsapp: 'Hello ViraWeb! I saw the website and would like to book a free assessment for my business.',
    stageLabel: 'Products built by ViraWeb',
    prxTag: 'The Gen Z bank',
    pontoTitle: 'Clock-in recorded',
    pontoMeta: '08:00 · GPS confirmed',
    speed: 'Smooth mobile experience',
    ticker: ['Web platforms', 'Subscription products', 'Process automation', 'Connected tools', 'Internal systems'],
  },
  es: {
    eyebrow: 'Desarrollo de software · Brasil',
    line1: 'Sistemas',
    em: 'a',
    tail: 'medida.',
    lede: 'Creamos plataformas web, productos por suscripción y automatizaciones que conectan sus herramientas, reducen el trabajo manual y acompañan el crecimiento de su operación.',
    primary: 'Solicitar diagnóstico del proyecto',
    secondary: 'Explorar casos',
    whatsapp: '¡Hola ViraWeb! Vi el sitio y quiero agendar un diagnóstico gratuito para mi empresa.',
    stageLabel: 'Productos construidos por ViraWeb',
    prxTag: 'El banco de la Generación Z',
    pontoTitle: 'Registro confirmado',
    pontoMeta: '08:00 · GPS confirmado',
    speed: 'Experiencia móvil fluida',
    ticker: ['Plataformas web', 'Productos por suscripción', 'Automatización de procesos', 'Integraciones', 'Sistemas internos'],
  },
};

const vars = (values: Record<string, string | number>) => values as CSSProperties;

/** The ViraWeb "V", assembled shard by shard in pure CSS (no hydration wait). */
function AssemblingMark() {
  return (
    <svg
      viewBox={`0 0 ${MARK_VIEWBOX.width} ${MARK_VIEWBOX.height}`}
      aria-hidden="true"
      focusable="false"
      className="block h-auto w-full overflow-visible"
    >
      {MARK_POLYGONS.map((polygon, i) => {
        const vector = MARK_VECTORS[i];
        const push = 120 + vector.distance * 0.35;
        return (
          <polygon
            key={polygon.points}
            points={polygon.points}
            fill={polygon.fill}
            stroke={polygon.fill}
            strokeWidth={1}
            strokeLinejoin="round"
            className="shard"
            style={vars({
              '--dx': `${(vector.x * push).toFixed(1)}px`,
              '--dy': `${(vector.y * push).toFixed(1)}px`,
              '--rot': `${i % 2 === 0 ? 18 : -14}deg`,
              '--i': i,
            })}
          />
        );
      })}
    </svg>
  );
}

function HeroStage({ copy }: { copy: HeroCopy }) {
  return (
    <figure aria-label={copy.stageLabel} className="relative mx-auto w-full max-w-[34rem]">
      <div className="bezel bezel-lg">
        <div className="bezel-core relative aspect-[5/5.4] sm:aspect-[5/5.2]">
          <div aria-hidden="true" className="dot-grid absolute inset-0 [mask-image:radial-gradient(75%_70%_at_50%_45%,#000_40%,transparent_100%)]" />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(55%_45%_at_68%_30%,rgba(25,88,165,0.16),transparent_70%),radial-gradient(45%_40%_at_30%_78%,rgba(242,191,18,0.18),transparent_70%)]"
          />

          <div className="absolute inset-x-[19%] top-[22%]">
            <div className="float-y">
              <AssemblingMark />
            </div>
          </div>

          {/* PRX — dark product card, tilted like a physical object on the tray */}
          <div className="pop-in absolute left-[5%] top-[6%] w-[46%] max-w-[13.5rem]" style={vars({ '--delay': '1.05s' })}>
            <div className="float-y-slow">
              <div className="-rotate-[4deg] rounded-[1.25rem] bg-prx-ink p-3.5 text-white shadow-[var(--shadow-float)] sm:p-4">
                <div className="flex items-center justify-between">
                  <span className="bg-gradient-to-r from-prx-violet to-prx-cyan bg-clip-text text-lg font-bold tracking-[-0.04em] text-transparent sm:text-xl">
                    PRX
                  </span>
                  <span className="size-2 rounded-full bg-prx-cyan shadow-[0_0_12px_var(--prx-cyan)]" />
                </div>
                <p className="mt-5 text-[0.7rem] leading-tight text-white/60 sm:mt-7">{copy.prxTag}</p>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-prx-violet to-prx-cyan" />
                </div>
              </div>
            </div>
          </div>

          {/* PontoControle — clock-in confirmation */}
          <div className="pop-in absolute bottom-[7%] right-[5%] w-[66%] max-w-[16rem] sm:w-[56%]" style={vars({ '--delay': '1.25s' })}>
            <div className="float-y">
              <div className="rotate-[3deg] rounded-[1.25rem] bg-white p-3 shadow-[var(--shadow-float)] ring-1 ring-black/5 sm:p-3.5">
                <div className="flex items-center gap-3">
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-brand-tint text-brand sm:size-10">
                    <ScanFace className="size-4 sm:size-5" strokeWidth={1.5} />
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-[0.8rem] font-semibold text-ink sm:text-sm">{copy.pontoTitle}</span>
                    <span className="flex items-center gap-1 truncate font-mono text-[0.62rem] text-mute sm:text-[0.68rem]">
                      <MapPin className="size-3 shrink-0" strokeWidth={1.5} />
                      {copy.pontoMeta}
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Performance badge */}
          <div className="pop-in absolute right-[6%] top-[9%]" style={vars({ '--delay': '1.4s' })}>
            <div className="flex items-center gap-2 rounded-full bg-white/90 py-1.5 pl-1.5 pr-3 shadow-[var(--shadow-soft)] ring-1 ring-black/5">
              <span className="grid size-6 place-items-center rounded-full bg-[#e8f6ee] font-mono text-[0.6rem] font-semibold text-[#15803d]">
                90
              </span>
              <span className="text-[0.7rem] font-medium text-ink-soft">{copy.speed}</span>
            </div>
          </div>
        </div>
      </div>
    </figure>
  );
}

/**
 * Hero: massive headline (CSS-only entrance, so the LCP never waits for
 * hydration), the brand mark assembling on a machined stage, and a ticker of
 * capabilities underneath.
 */
export function Hero() {
  const { language } = useTranslation();
  const copy = COPY[language];
  const ticker = [...copy.ticker, ...copy.ticker];

  return (
    <section id="top" aria-labelledby="hero-title" className="relative overflow-x-clip hero-atmosphere pt-[calc(var(--nav-h)+1.5rem)]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[44rem] bg-[radial-gradient(40%_50%_at_85%_10%,rgba(25,88,165,0.08),transparent_70%),radial-gradient(30%_40%_at_10%_0%,rgba(242,191,18,0.07),transparent_70%)]"
      />

      <div className="relative mx-auto grid max-w-[1440px] grid-cols-12 items-center gap-x-4 gap-y-14 px-4 pb-16 pt-10 sm:px-8 sm:pt-14 lg:gap-x-10 lg:px-12 lg:pb-24 lg:pt-16">
        <div className="col-span-12 lg:col-span-7">
          <p className="fade-up eyebrow" style={vars({ '--i': -3 })}>
            {copy.eyebrow}
          </p>

          <h1
            id="hero-title"
            className="mt-7 text-[clamp(2.6rem,11vw,4rem)] font-semibold leading-[0.95] tracking-[-0.055em] text-ink [overflow-wrap:anywhere] sm:mt-8 lg:text-[clamp(4rem,6.6vw,7.25rem)] lg:leading-[0.9]"
          >
            <span className="mask-line">
              <span className="mask-inner" style={vars({ '--i': 0 })}>
                {copy.line1}
              </span>
            </span>{' '}
            <span className="mask-line">
              <span className="mask-inner" style={vars({ '--i': 1 })}>
                <em className="font-serif font-normal italic tracking-[-0.02em] text-brand">{copy.em}</em>{' '}
                <span className="relative inline-block">
                  {copy.tail}
                  <span aria-hidden="true" className="z-rule absolute -bottom-1 left-0 h-[0.09em] w-full rounded-full bg-sun" style={vars({ '--delay': '1.1s' })} />
                </span>
              </span>
            </span>
          </h1>

          <p className="fade-up mt-8 max-w-[52ch] text-base leading-relaxed text-ink-soft sm:text-lg lg:mt-10" style={vars({ '--i': 0 })}>
            {copy.lede}
          </p>

          <div className="fade-up mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center" style={vars({ '--i': 1 })}>
            <ActionLink
              href={whatsappLink(copy.whatsapp)}
              {...EXTERNAL_LINK_PROPS}
              label={copy.primary}
              onClick={() => trackContact('hero')}
              className="w-full sm:w-auto"
            />
            <ActionLink href="/#trabalhos" label={copy.secondary} variant="outline" className="w-full sm:w-auto" />
          </div>
        </div>

        <div className="fade-up col-span-12 lg:col-span-5" style={vars({ '--i': 2 })}>
          <HeroStage copy={copy} />
        </div>
      </div>

      {/* Capability ticker */}
      <div aria-hidden="true" className="marquee relative overflow-hidden border-y border-line bg-white py-5 sm:py-7">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent sm:w-32" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent sm:w-32" />
        <div className="marquee-track" style={vars({ '--marquee-duration': '38s' })}>
          {ticker.map((item, i) => (
            <span
              key={`${item}-${i}`}
              className="flex shrink-0 items-center gap-6 pr-6 text-[clamp(1.5rem,3.2vw,2.75rem)] font-semibold tracking-[-0.045em] text-ink sm:gap-10 sm:pr-10"
            >
              {item}
              <span className="size-2.5 rotate-45 bg-sun sm:size-3" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
