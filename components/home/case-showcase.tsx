'use client';

import type { CSSProperties } from 'react';
import Link from 'next/link';
import { ArrowUpRight, ChartNoAxesCombined, Clock3, PanelsTopLeft, Smartphone, MessagesSquare } from 'lucide-react';
import { cases } from '@/lib/home/cases';
import { useTranslation } from '@/lib/i18n';
import { Reveal } from '@/components/motion/reveal';
import { SplitWords } from '@/components/motion/split-words';

const appearance = {
  prx: { icon: Smartphone, color: '#a78bfa' },
  pontocontrole: { icon: Clock3, color: '#5eead4' },
  'pagina-de-lancamento': { icon: PanelsTopLeft, color: '#fbbf24' },
  virabot: { icon: MessagesSquare, color: '#86efac' },
  'painel-de-aquisicao': { icon: ChartNoAxesCombined, color: '#93c5fd' },
} as const;

const copy = {
  pt: { title: 'Cases e produtos desenvolvidos', intro: 'Explore o desafio por trás de cada projeto e veja como ele virou uma solução.', open: 'Ver projeto' },
  en: { title: 'Case studies and products', intro: 'Explore the challenge behind each project and see how it became a solution.', open: 'Explore project' },
  es: { title: 'Casos y productos desarrollados', intro: 'Conozca el reto de cada proyecto y vea cómo se convirtió en una solución.', open: 'Ver proyecto' },
};

export function CaseShowcase() {
  const { language } = useTranslation();
  const text = copy[language];

  return (
    <section id="trabalhos" aria-labelledby="cases-title" className="case-atmosphere scroll-mt-[var(--nav-h)] py-24 text-white sm:py-32">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12">
        <SplitWords id="cases-title" parts={[text.title]} className="max-w-[20ch] text-[clamp(2.2rem,5.2vw,5.25rem)] font-semibold leading-[1] tracking-[-0.055em]" />
        <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">{text.intro}</p>
        <ul className="project-index mt-10">
          {cases.map((project, index) => {
            const { icon: Icon, color } = appearance[project.slug];
            const details = project.copy[language];
            return (
              <li id={project.slug} key={project.slug} className="scroll-mt-24">
                <Reveal y={20} delay={index * 0.055} className="h-full">
                  <Link href={`/cases/${project.slug}`} className="project-row group focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white" style={{ '--case-accent': color } as CSSProperties}>
                    <div className="project-symbol">
                      <span className="case-icon grid size-12 place-items-center rounded-xl border"><Icon aria-hidden="true" className="size-5" /></span>
                      <ArrowUpRight aria-hidden="true" className="project-arrow size-5 text-slate-300 transition-transform motion-safe:group-hover:-translate-y-1 motion-safe:group-hover:translate-x-1" />
                    </div>
                    <p className="project-category text-sm font-medium text-[var(--case-accent)]">{details.category}</p>
                    <h3 className="project-name text-2xl font-semibold tracking-tight">{project.name[language]}</h3>
                    <p className="project-summary text-sm leading-relaxed text-slate-300">{details.summary}</p>
                    <span className="sr-only">{text.open}</span>
                  </Link>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
