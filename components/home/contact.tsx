// Hello World
'use client';

import { ArrowUpRight } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';
import { EXTERNAL_LINK_PROPS, SITE, whatsappLink, type Copy } from '@/lib/site';
import { SplitWords } from '@/components/motion/split-words';
import { Reveal } from '@/components/motion/reveal';
import { Magnetic } from '@/components/motion/magnetic';
import { ActionLink } from '@/components/ui/action-link';

interface ContactCopy {
  label: string;
  titleA: string;
  titleEm: string;
  lede: string;
  cta: string;
  whatsapp: string;
}

const COPY: Copy<ContactCopy> = {
  pt: {
    label: 'Contato',
    titleA: 'Pronto para',
    titleEm: 'escalar?',
    lede: 'Uma sessão estratégica de 15 minutos com o nosso time técnico. Analisamos suas necessidades de software e automação sem custo.',
    cta: 'Agendar diagnóstico gratuito',
    whatsapp: 'Olá ViraWeb! Gostaria de agendar um diagnóstico digital gratuito para a minha empresa.',
  },
  en: {
    label: 'Contact',
    titleA: 'Ready to',
    titleEm: 'scale?',
    lede: 'A 15-minute strategy session with our technical team. We analyse your software and automation needs at no cost.',
    cta: 'Schedule a free assessment',
    whatsapp: 'Hello ViraWeb! I would like to schedule a digital assessment for my business.',
  },
  es: {
    label: 'Contacto',
    titleA: '¿Listo para',
    titleEm: 'escalar?',
    lede: 'Una sesión estratégica de 15 minutos con nuestro equipo técnico. Analizamos sus necesidades de software y automatización sin costo.',
    cta: 'Agendar diagnóstico gratuito',
    whatsapp: '¡Hola ViraWeb! Me gustaría agendar un diagnóstico digital para mi empresa.',
  },
};

export function Contact() {
  const { language } = useTranslation();
  const copy = COPY[language];

  const channels = [
    { name: 'WhatsApp', detail: SITE.whatsappDisplay, href: whatsappLink(copy.whatsapp), external: true },
    { name: 'E-mail', detail: SITE.email, href: `mailto:${SITE.email}`, external: false },
    { name: 'Instagram', detail: SITE.instagramHandle, href: SITE.instagramUrl, external: true },
  ];

  return (
    <section id="contato" aria-labelledby="contact-title" className="border-t border-line bg-white py-24 sm:py-36">
      <div className="mx-auto grid max-w-[1440px] grid-cols-12 gap-x-4 gap-y-10 px-4 sm:px-8 lg:px-12">
        <p className="col-span-12 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-mute lg:col-span-2 lg:pt-6">
          ({copy.label})
        </p>
        <SplitWords
          id="contact-title"
          className="col-span-12 text-[clamp(3.2rem,11vw,11.5rem)] font-semibold leading-[0.86] tracking-[-0.06em] text-ink lg:col-span-10"
          parts={[copy.titleA, { br: true }, { text: copy.titleEm, className: 'font-serif font-normal italic tracking-[-0.03em] text-brand' }]}
        />

        <div className="col-span-12 grid grid-cols-12 items-end gap-x-4 gap-y-8 lg:col-span-10 lg:col-start-3">
          <Reveal className="col-span-12 md:col-span-6">
            <p className="max-w-[44ch] text-base leading-relaxed text-ink-soft sm:text-lg">{copy.lede}</p>
          </Reveal>
          <Reveal className="col-span-12 md:col-span-6 md:justify-self-end" delay={0.1}>
            <Magnetic>
              <ActionLink href={whatsappLink(copy.whatsapp)} {...EXTERNAL_LINK_PROPS} label={copy.cta} />
            </Magnetic>
          </Reveal>
        </div>

        <ul className="col-span-12 mt-8 border-t border-ink lg:col-span-10 lg:col-start-3">
          {channels.map((channel, i) => (
            <li key={channel.name} className="border-b border-line">
              <Reveal y={20} delay={i * 0.06}>
                <a
                  href={channel.href}
                  {...(channel.external ? EXTERNAL_LINK_PROPS : {})}
                  className="group relative flex min-h-20 items-center justify-between gap-4 overflow-hidden py-6 sm:py-8"
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 origin-bottom scale-y-0 bg-surface transition-transform duration-500 ease-out-expo group-hover:scale-y-100"
                  />
                  <span className="relative text-[clamp(2rem,5vw,4.5rem)] font-semibold leading-none tracking-[-0.05em] text-ink transition-transform duration-500 ease-out-expo group-hover:translate-x-3">
                    {channel.name}
                  </span>
                  <span className="relative flex items-center gap-4 sm:gap-8">
                    <span className="hidden font-mono text-sm text-ink-soft sm:inline">{channel.detail}</span>
                    <ArrowUpRight
                      aria-hidden="true"
                      className="size-6 text-ink transition-transform duration-500 ease-out-expo group-hover:rotate-45 sm:size-8"
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
