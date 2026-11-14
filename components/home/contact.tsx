// Hello World
'use client';

import { ArrowUpRight } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';
import { EXTERNAL_LINK_PROPS, SITE, whatsappLink, type Copy } from '@/lib/site';
import { trackContact } from '@/lib/analytics';
import { SplitWords } from '@/components/motion/split-words';
import { Reveal } from '@/components/motion/reveal';
import { BriefBuilder } from '@/components/home/brief-builder';

interface ContactCopy {
  titleA: string;
  titleEm: string;
  lede: string;
  whatsapp: string;
}

const COPY: Copy<ContactCopy> = {
  pt: {
    titleA: 'Vamos tirar o seu projeto',
    titleEm: 'do papel?',
    lede: 'Marque o que você precisa e envie. Um engenheiro de software responde no WhatsApp e faz um diagnóstico gratuito de 15 minutos, sem compromisso.',
    whatsapp: 'Olá ViraWeb! Quero agendar um diagnóstico gratuito para a minha empresa.',
  },
  en: {
    titleA: 'Shall we get your project',
    titleEm: 'off the ground?',
    lede: 'Mark what you need and send it. A software engineer replies on WhatsApp and runs a free 15-minute assessment, no strings attached.',
    whatsapp: 'Hello ViraWeb! I would like to book a free assessment for my business.',
  },
  es: {
    titleA: '¿Hacemos realidad',
    titleEm: 'su proyecto?',
    lede: 'Marque lo que necesita y envíe. Un ingeniero de software responde por WhatsApp y hace un diagnóstico gratuito de 15 minutos, sin compromiso.',
    whatsapp: '¡Hola ViraWeb! Quiero agendar un diagnóstico gratuito para mi empresa.',
  },
};

/** Closing conversion anchor: the brief builder again, plus every direct channel. */
export function Contact() {
  const { language } = useTranslation();
  const copy = COPY[language];

  const channels = [
    { name: 'WhatsApp', detail: SITE.whatsappDisplay, href: whatsappLink(copy.whatsapp), external: true },
    { name: 'E-mail', detail: SITE.email, href: `mailto:${SITE.email}`, external: false },
    { name: 'Instagram', detail: SITE.instagramHandle, href: SITE.instagramUrl, external: true },
  ];

  return (
    <section id="contato" aria-labelledby="contact-title" className="scroll-mt-4 border-t border-line bg-white py-20 sm:py-28">
      <div className="mx-auto grid max-w-[1440px] grid-cols-12 gap-x-4 gap-y-10 px-4 sm:px-8 lg:gap-x-10 lg:px-12">
        <div className="col-span-12 lg:col-span-5">
          <SplitWords
            id="contact-title"
            className="text-[clamp(2.4rem,5vw,5rem)] font-semibold leading-[0.95] tracking-[-0.05em] text-ink"
            parts={[copy.titleA, { text: copy.titleEm, className: 'font-serif font-normal italic tracking-[-0.02em] text-brand' }]}
          />
          <Reveal delay={0.08}>
            <p className="mt-6 max-w-[44ch] text-base leading-relaxed text-ink-soft sm:text-lg">{copy.lede}</p>
          </Reveal>
        </div>

        <Reveal className="col-span-12 lg:col-span-6 lg:col-start-7" delay={0.1} y={36}>
          <BriefBuilder location="contact" />
        </Reveal>

        <ul className="col-span-12 mt-6 border-t border-ink">
          {channels.map((channel, i) => (
            <li key={channel.name} className="border-b border-line">
              <Reveal y={20} delay={i * 0.06}>
                <a
                  href={channel.href}
                  {...(channel.external ? EXTERNAL_LINK_PROPS : {})}
                  onClick={() => trackContact('contact', channel.name)}
                  className="group relative flex min-h-16 items-center justify-between gap-4 overflow-hidden py-5 sm:py-6"
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 origin-bottom scale-y-0 bg-surface transition-transform duration-500 ease-out-expo group-hover:scale-y-100"
                  />
                  <span className="relative text-[clamp(1.6rem,3.4vw,3rem)] font-semibold leading-none tracking-[-0.045em] text-ink transition-transform duration-500 ease-out-expo group-hover:translate-x-3">
                    {channel.name}
                  </span>
                  <span className="relative flex items-center gap-4 sm:gap-8">
                    <span className="hidden font-mono text-sm text-ink-soft sm:inline">{channel.detail}</span>
                    <ArrowUpRight
                      aria-hidden="true"
                      className="size-6 text-ink transition-transform duration-500 ease-out-expo group-hover:rotate-45"
                    />
                  </span>
                </a>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
