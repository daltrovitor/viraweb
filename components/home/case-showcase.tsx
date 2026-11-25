'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { cases } from '@/lib/home/cases';
import { useTranslation } from '@/lib/i18n';
import { CaseArtwork } from './case-artwork';
import './case-showcase.css';

const copy = {
  pt: { title: 'Cases e produtos desenvolvidos', open: 'Ver projeto' },
  en: { title: 'Case studies and products', open: 'View project' },
  es: { title: 'Casos y productos desarrollados', open: 'Ver proyecto' },
};

export function CaseShowcase() {
  const { language } = useTranslation();
  const text = copy[language];

  return (
    <section id="trabalhos" aria-labelledby="cases-title" className="case-showcase scroll-mt-[var(--nav-h)] py-20 text-white sm:py-28">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12">
        <h2 id="cases-title" className="case-showcase-title">{text.title}</h2>
        <ul className="case-showcase-grid">
          {cases.map((project) => {
            const details = project.copy[language];
            const name = project.name[language];

            return (
              <li id={project.slug} key={project.slug} className={`case-entry case-entry--${project.slug} scroll-mt-24`}>
                <Link href={`/cases/${project.slug}`} className="case-entry-link" aria-labelledby={`case-name-${project.slug}`}>
                  <CaseArtwork slug={project.slug} language={language} />
                  <div className="case-entry-copy">
                    <p className="case-entry-category">{details.category}</p>
                    <h3 id={`case-name-${project.slug}`}>{name}</h3>
                    <p className="case-entry-summary">{details.summary}</p>
                    <ul className="case-entry-features" role="list">
                      {details.features.map((feature) => <li key={feature}>{feature}</li>)}
                    </ul>
                    <span aria-hidden="true" className="case-entry-action">
                      {text.open} <ArrowUpRight size={15} strokeWidth={1.75} />
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
