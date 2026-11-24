'use client';

import Link from 'next/link';
import { ActionLink } from '@/components/ui/action-link';
import { SplitWords } from '@/components/motion/split-words';
import { useTranslation } from '@/lib/i18n';
import { EXTERNAL_LINK_PROPS, whatsappLink } from '@/lib/site';
import { ProductPreview, type PreviewKind } from '@/components/home/previews';
import { trackContact } from '@/lib/analytics';
import type { cases } from '@/lib/home/cases';

const previews: Partial<Record<(typeof cases)[number]['slug'], PreviewKind>> = {
  'pagina-de-lancamento': 'landing',
  virabot: 'whatsapp',
  'painel-de-aquisicao': 'dashboard',
};

const copy = {
  pt: { back: 'Voltar aos cases', illustration: 'Prévia ilustrativa em português', problem: 'O desafio', solution: 'A solução', visit: 'Acessar produto', cta: 'Solicitar um projeto semelhante', message: 'Olá ViraWeb! Vi este projeto e gostaria de um diagnóstico para uma solução semelhante' },
  en: { back: 'Back to case studies', illustration: 'Illustrative preview in Portuguese', problem: 'The challenge', solution: 'The solution', visit: 'Visit product', cta: 'Discuss a similar project', message: 'Hello ViraWeb! I saw this project and would like an assessment for a similar solution' },
  es: { back: 'Volver a los casos', illustration: 'Vista ilustrativa en portugués', problem: 'El desafío', solution: 'La solución', visit: 'Visitar producto', cta: 'Solicitar un proyecto similar', message: '¡Hola ViraWeb! Vi este proyecto y quisiera un diagnóstico para una solución similar' },
};

export function CaseDetails({ project }: { project: (typeof cases)[number] }) {
  const { language } = useTranslation();
  const text = copy[language];
  const details = project.copy[language];
  const name = project.name[language];
  const preview = previews[project.slug];

  return (
    <section aria-labelledby="case-title" className="case-atmosphere px-4 pb-20 pt-[calc(var(--nav-h)+3rem)] text-white sm:px-8 sm:pb-28 sm:pt-[calc(var(--nav-h)+5rem)]">
      <div className="mx-auto max-w-6xl">
        <Link href="/#trabalhos" className="inline-flex min-h-12 items-center text-sm text-blue-200 underline-offset-4 hover:underline">← {text.back}</Link>
        <p className="mt-9 font-medium text-blue-200">{details.category}</p>
        <SplitWords as="h1" id="case-title" parts={[name]} className="mt-4 text-[clamp(2.75rem,8vw,7rem)] font-semibold leading-[0.97] tracking-[-0.055em]" />
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-300">{details.summary}</p>
        <div className={preview ? 'mt-10 grid items-center gap-6 lg:grid-cols-2' : 'mt-10'}>
          <div className={preview ? 'grid gap-4' : 'grid gap-4 md:grid-cols-2'}>
            <div className="rounded-3xl border border-white/15 bg-white/5 p-6 sm:p-8">
              <h2 className="text-2xl font-semibold">{text.problem}</h2>
              <p className="mt-3 leading-relaxed text-slate-300">{details.problem}</p>
            </div>
            <div className="rounded-3xl border border-white/15 bg-white/5 p-6 sm:p-8">
              <h2 className="text-2xl font-semibold">{text.solution}</h2>
              <p className="mt-3 leading-relaxed text-slate-300">{details.solution}</p>
            </div>
          </div>
          {preview && (
            <figure className="rounded-3xl border border-white/15 bg-white/5 p-4 sm:p-8">
              <ProductPreview kind={preview} animate="inView" />
              <figcaption className="mt-4 text-center text-sm text-slate-300">{text.illustration}</figcaption>
            </figure>
          )}
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <ActionLink href={whatsappLink(`${text.message} (${name}).`)} {...EXTERNAL_LINK_PROPS} label={text.cta} variant="light" onClick={() => trackContact('product', project.slug)} />
          {project.url && <ActionLink href={project.url} {...EXTERNAL_LINK_PROPS} label={text.visit} className="ring-1 ring-inset ring-white/25" />}
        </div>
      </div>
    </section>
  );
}
