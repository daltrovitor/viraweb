// Hello World
'use client';

import type { CSSProperties } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { useTranslation } from '@/lib/i18n';
import { whatsappLink, EXTERNAL_LINK_PROPS, type Copy } from '@/lib/site';
import { ActionLink } from '@/components/ui/action-link';
import { RollText } from '@/components/motion/roll-text';
import { InteractiveMark } from '@/components/home/interactive-mark';

interface HeroCopy {
  line1: string;
  line2: { lead: string; em: string };
  line3: string;
  lede: string;
  primary: string;
  secondary: string;
  whatsapp: string;
  disciplines: string[];
  location: string;
}

const COPY: Copy<HeroCopy> = {
  pt: {
    line1: 'Código',
    line2: { lead: 'que', em: 'vira' },
    line3: 'resultado.',
    lede: 'Desenvolvimento de softwares exclusivos, inteligência artificial integrada, tráfego qualificado de alta escala e sistemas sob medida para a sua operação.',
    primary: 'Agendar diagnóstico gratuito',
    secondary: 'Ver soluções',
    whatsapp: 'Olá ViraWeb! Quero agendar um diagnóstico estratégico gratuito para minha empresa.',
    disciplines: ['Sites premium', 'Sistemas sob medida', 'IA no WhatsApp', 'SEO local'],
    location: 'Goiânia — GO, Brasil',
  },
  en: {
    line1: 'Code',
    line2: { lead: 'that', em: 'turns' },
    line3: 'into revenue.',
    lede: 'Development of exclusive software, integrated artificial intelligence, high-scale qualified traffic, and tailor-made systems for your operation.',
    primary: 'Schedule a free assessment',
    secondary: 'Explore solutions',
    whatsapp: 'Hello ViraWeb! I want to schedule a free digital strategic assessment.',
    disciplines: ['Premium websites', 'Custom systems', 'WhatsApp AI', 'Local SEO'],
    location: 'Goiânia — GO, Brazil',
  },
  es: {
    line1: 'Código',
    line2: { lead: 'que', em: 'genera' },
    line3: 'resultados.',
    lede: 'Desarrollo de software exclusivo, inteligencia artificial integrada, tráfico calificado a gran escala y sistemas a la medida para su operación.',
    primary: 'Agendar diagnóstico gratuito',
    secondary: 'Ver soluciones',
    whatsapp: '¡Hola ViraWeb! Quiero agendar un diagnóstico estratégico gratuito.',
    disciplines: ['Sitios premium', 'Sistemas a medida', 'IA en WhatsApp', 'SEO local'],
    location: 'Goiânia — GO, Brasil',
  },
};

const line = (i: number) => ({ '--i': i }) as CSSProperties;

export function Hero() {
  const { language } = useTranslation();
  const copy = COPY[language];
  const reduceMotion = useReducedMotion();

  const { scrollY } = useScroll();
  const headlineY = useTransform(scrollY, [0, 900], [0, reduceMotion ? 0 : -140]);
  const headlineOpacity = useTransform(scrollY, [0, 700], [1, reduceMotion ? 1 : 0.15]);

  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative flex min-h-[100svh] flex-col overflow-x-clip bg-white pt-[calc(var(--nav-h)+2.5rem)] pb-8 sm:pb-10"
    >
      <div className="mx-auto grid w-full max-w-[1440px] flex-1 grid-cols-12 gap-x-4 px-4 sm:px-8 lg:px-12">
        {/* Interactive mark — floats top-right on mobile, owns the right third on desktop */}
        <div className="pointer-events-auto absolute right-4 top-[calc(var(--nav-h)+1.25rem)] w-[30vw] max-w-[150px] sm:right-8 lg:static lg:col-span-4 lg:col-start-9 lg:row-start-1 lg:mt-6 lg:w-full lg:max-w-[420px] lg:justify-self-end lg:self-start">
          <InteractiveMark />
        </div>

        <motion.div
          style={{ y: headlineY, opacity: headlineOpacity }}
          className="col-span-12 col-start-1 row-start-1 self-end pt-28 sm:pt-32 lg:col-span-9 lg:col-start-1 lg:pt-0"
        >
          <h1
            id="hero-title"
            className="text-[clamp(2.75rem,14.5vw,4.5rem)] font-semibold sm:text-[clamp(3rem,9vw,10.5rem)] leading-[0.88] tracking-[-0.055em] text-ink"
          >
            <span className="mask-line">
              <span className="mask-inner" style={line(0)}>
                {copy.line1}
              </span>
            </span>
            <span className="mask-line pl-[0.9em]">
              <span className="mask-inner" style={line(1)}>
                {copy.line2.lead}{' '}
                <em className="font-serif font-normal italic tracking-[-0.02em] text-brand">{copy.line2.em}</em>
              </span>
            </span>
            <span className="mask-line">
              <span className="mask-inner" style={line(2)}>
                {copy.line3}
              </span>
            </span>
          </h1>
        </motion.div>
      </div>

      <div className="mx-auto mt-10 grid w-full max-w-[1440px] grid-cols-12 items-end gap-x-4 gap-y-10 px-4 sm:mt-14 sm:px-8 lg:px-12">
        <div className="col-span-12 md:col-span-7 lg:col-span-5">
          <p className="fade-up max-w-[46ch] text-base leading-relaxed text-ink-soft sm:text-lg" style={line(0)}>
            {copy.lede}
          </p>
          <div className="fade-up mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6" style={line(1)}>
            <ActionLink
              href={whatsappLink(copy.whatsapp)}
              {...EXTERNAL_LINK_PROPS}
              label={copy.primary}
              className="w-full sm:w-auto"
            />
            <a
              href="/#services"
              className="roll-trigger group inline-flex min-h-12 items-center justify-center gap-2 text-[0.95rem] font-medium text-ink sm:justify-start"
            >
              <span className="relative">
                <RollText text={copy.secondary} />
                <span
                  aria-hidden="true"
                  className="absolute -bottom-1 left-0 h-px w-full origin-left bg-ink transition-transform duration-500 ease-out-expo group-hover:scale-x-0"
                />
              </span>
            </a>
          </div>
        </div>

        <div
          className="fade-up col-span-12 grid grid-cols-1 gap-x-4 gap-y-4 border-t sm:grid-cols-2 sm:gap-y-6 border-line pt-6 font-mono text-[0.72rem] uppercase tracking-[0.12em] text-mute md:col-span-5 md:col-start-8 xl:col-span-4 xl:col-start-9"
          style={line(2)}
        >
          <ul className="space-y-1.5">
            {copy.disciplines.map((discipline, i) => (
              <li key={discipline} className="flex gap-3">
                <span className="text-mute" aria-hidden="true">
                  0{i + 1}
                </span>
                <span className="text-ink-soft">{discipline}</span>
              </li>
            ))}
          </ul>
          <p className="leading-relaxed sm:self-end sm:text-right">
            {copy.location}
            <br />
            <span className="text-ink-soft">Next.js · TypeScript · IA</span>
          </p>
        </div>
      </div>
    </section>
  );
}
