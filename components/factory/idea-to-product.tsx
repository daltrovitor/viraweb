// Hello World
'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Check } from 'lucide-react';
import { ProductPreview } from '@/components/factory/previews';
import { SectionHead, accent } from '@/components/factory/section-head';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const IDEA = 'Quero uma página para vender meu curso de inglês. Moderna, com bastante movimento e um botão para WhatsApp.';

const SPEC = ['Briefing analisado', 'Escopo Standard confirmado', 'Interface desenhada', 'Código e testes', 'Publicação com QA humano'];

function StageLabel({ index, children }: { index: string; children: string }) {
  return (
    <p className="flex items-center gap-3 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-mute">
      <span className="text-ink">{index}</span>
      {children}
    </p>
  );
}

/**
 * "De uma ideia a um produto": pinned, scrubbed storytelling on desktop.
 * Touch and reduced-motion visitors get the same three stages, fully visible and stacked.
 */
export function IdeaToProduct() {
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
        const tl = gsap.timeline({
          defaults: { ease: 'power2.out' },
          scrollTrigger: { trigger: stage.current, start: 'top top+=72', end: '+=170%', scrub: 0.6, pin: true, anticipatePin: 1 },
        });
        // Words light up from the muted tone (still AA-legible) to ink, never fading out of contrast.
        tl.from('.itp-word', { color: '#5a6577', stagger: 0.04, duration: 0.5 })
          .from('.itp-link-1', { scaleX: 0, transformOrigin: 'left center', duration: 0.4 })
          .from('.itp-spec', { opacity: 0, y: 14, stagger: 0.12, duration: 0.4 })
          .from('.itp-link-2', { scaleX: 0, transformOrigin: 'left center', duration: 0.4 })
          .fromTo('.itp-cover', { scaleY: 1 }, { scaleY: 0, transformOrigin: 'center bottom', duration: 1, ease: 'power3.inOut' })
          .from('.itp-ready', { opacity: 0, y: 10, duration: 0.3 });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section id="como-funciona" ref={root} aria-labelledby="itp-title" className="scroll-mt-20 border-t border-line bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12">
        <SectionHead
          id="itp-title"
          index="02"
          title={['De uma ideia', { br: true }, accent('a um produto.')]}
          lede="Você descreve com as suas palavras. A fábrica transforma em especificação, interface e código — e uma pessoa da equipe revisa antes de entregar."
        />
      </div>

      <div ref={stage} className="mx-auto mt-14 max-w-[1440px] px-4 sm:px-8 lg:mt-20 lg:flex lg:min-h-[calc(100svh-72px)] lg:items-center lg:px-12">
        <div className="grid w-full grid-cols-1 gap-12 lg:grid-cols-[1fr_auto_1fr_auto_1.35fr] lg:items-start lg:gap-6">
          <div className="flex flex-col gap-5">
            <StageLabel index="A">Sua ideia</StageLabel>
            <p className="rounded-sm border border-line-strong bg-surface p-5 text-[clamp(1.05rem,1.6vw,1.35rem)] leading-snug tracking-[-0.02em] text-ink">
              {IDEA.split(' ').map((word, i) => (
                <span key={i} className="itp-word">
                  {word}{' '}
                </span>
              ))}
            </p>
          </div>

          <span aria-hidden="true" className="itp-link-1 mx-auto block h-10 w-px bg-ink lg:mt-28 lg:h-px lg:w-16" />

          <div className="flex flex-col gap-5">
            <StageLabel index="B">ViraWeb Factory</StageLabel>
            <ul className="border-t border-ink">
              {SPEC.map((step) => (
                <li key={step} className="itp-spec flex min-h-11 items-center justify-between gap-4 border-b border-line text-[0.95rem] text-ink">
                  {step}
                  <Check aria-hidden="true" className="size-4 text-brand" />
                </li>
              ))}
            </ul>
          </div>

          <span aria-hidden="true" className="itp-link-2 mx-auto block h-10 w-px bg-ink lg:mt-28 lg:h-px lg:w-16" />

          <div className="flex flex-col gap-5">
            <StageLabel index="C">Seu produto</StageLabel>
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <ProductPreview kind="landing" />
              <span aria-hidden="true" className="itp-cover absolute inset-0 grid origin-bottom scale-y-0 place-items-center bg-surface-2">
                <span className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-mute">Construindo interface…</span>
              </span>
            </div>
            <p className="itp-ready font-mono text-[0.72rem] uppercase tracking-[0.14em] text-brand">Pronto · publicado e no ar</p>
          </div>
        </div>
      </div>
    </section>
  );
}
