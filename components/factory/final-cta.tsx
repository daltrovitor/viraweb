// Hello World
import { SplitWords } from '@/components/motion/split-words';
import { Reveal } from '@/components/motion/reveal';
import { Magnetic } from '@/components/motion/magnetic';
import { ActionNavLink } from '@/components/factory/action-nav-link';

export function FinalCta() {
  return (
    <section aria-labelledby="final-cta-title" className="border-t border-line bg-white py-28 sm:py-40">
      <div className="mx-auto grid max-w-[1440px] grid-cols-12 gap-x-4 gap-y-10 px-4 sm:px-8 lg:px-12">
        <SplitWords
          id="final-cta-title"
          className="col-span-12 text-[clamp(2.6rem,8vw,8.5rem)] font-semibold leading-[0.9] tracking-[-0.055em] text-ink lg:col-span-10"
          parts={[
            'Tem uma ideia?',
            { br: true },
            { text: 'Conte para a gente.', className: 'font-serif font-normal italic tracking-[-0.02em] text-brand' },
          ]}
        />
        <Reveal className="col-span-12 flex flex-col gap-8 border-t border-ink pt-8 sm:flex-row sm:items-center sm:justify-between lg:col-span-10">
          <p className="text-[clamp(1.25rem,2.4vw,1.75rem)] font-semibold tracking-[-0.035em] text-ink">Você explica. A gente constrói.</p>
          <Magnetic>
            <ActionNavLink href="/products" label="Criar meu produto" className="w-full sm:w-auto" />
          </Magnetic>
        </Reveal>
      </div>
    </section>
  );
}
