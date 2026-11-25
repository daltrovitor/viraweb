// Hello World
'use client';

import type { CSSProperties } from 'react';
import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { useTranslation } from '@/lib/i18n';
import { EXTERNAL_LINK_PROPS, whatsappLink, type Copy } from '@/lib/site';
import { trackContact } from '@/lib/analytics';
import { BrandMark, MARK_POLYGONS, MARK_VECTORS } from '@/components/brand/brand-mark';
import { SignalCanvas } from '@/components/motion/signal-canvas';
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
    ticker: ['Plataformas web', 'Productos por suscripción', 'Automatización de procesos', 'Integraciones', 'Sistemas internos'],
  },
};

const vars = (values: Record<string, string | number>) => values as CSSProperties;

// Extrude the facets of the original mark into a dimensional brand sculpture.
const facets = MARK_POLYGONS.map(({ points, fill }) => {
  const vertices = points.split(' ').map((point) => point.split(',').map(Number));
  const edges = vertices.map(([x, y], index) => {
    const [nextX, nextY] = vertices[(index + 1) % vertices.length];
    return `${x},${y} ${nextX},${nextY} ${nextX + 18},${nextY + 32} ${x + 18},${y + 32}`;
  });
  return { points, fill, edges };
});

function HeroStage() {
  const stage = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: stage, offset: ['start center', 'end start'] });
  const rotate = useTransform(scrollYProgress, [0, 1], [-8, 10]);
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '13%']);

  return (
    <div ref={stage} aria-hidden="true" className="sculpture-stage">
      <SignalCanvas mode="assembly" />
      <motion.div className="sculpture-object" style={reduced ? undefined : { rotate, y }}>
        <svg viewBox="-45 -40 900 756" className="block w-full overflow-visible">
          {facets.map(({ points, fill, edges }, index) => {
            const vector = MARK_VECTORS[index];
            return (
              <g key={points} className="sculpture-facet" style={vars({
                '--i': index,
                '--facet-x': `${vector.x * 125}px`,
                '--facet-y': `${vector.y * 125}px`,
                '--facet-rotation': `${index % 2 === 0 ? -22 : 22}deg`,
              })}>
                {edges.map((edge) => <polygon key={edge} points={edge} fill={fill} style={{ filter: 'brightness(.59)' }} />)}
                <polygon points={points} fill={fill} stroke={fill} strokeWidth="1.4" />
              </g>
            );
          })}
        </svg>
      </motion.div>
    </div>
  );
}

export function Hero() {
  const { language } = useTranslation();
  const copy = COPY[language];
  const ticker = [...copy.ticker, ...copy.ticker];

  return (
    <section id="top" aria-labelledby="hero-title" className="relative overflow-x-clip hero-atmosphere pt-[calc(var(--nav-h)+1.5rem)]">
      <div className="brand-curtain" aria-hidden="true">
        <div className="brand-curtain-mark">
          <BrandMark className="w-full" />
        </div>
      </div>
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

        <div className="col-span-12 lg:col-span-5" style={vars({ '--i': 2 })}>
          <HeroStage />
        </div>
      </div>

      {/* Capability ticker */}
      <div aria-hidden="true" className="marquee relative overflow-hidden border-y border-line bg-white py-5 sm:py-7">
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
