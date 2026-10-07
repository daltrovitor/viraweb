// Hello World
'use client';

import type { CSSProperties } from 'react';
import Image from 'next/image';
import { useTranslation, type Language } from '@/lib/i18n';
import { allReviews, reviewTranslations, type Review } from '@/lib/testimonials';
import { SplitWords } from '@/components/motion/split-words';
import { Reveal } from '@/components/motion/reveal';
import type { Copy } from '@/lib/site';

const LABEL: Copy<string> = { pt: 'Depoimentos', en: 'Testimonials', es: 'Testimonios' };

// The odonto platform is no longer offered, so reviews about it are left out.
const REVIEWS = allReviews.filter((review) => !/\bodonto\b/.test(review.body));
const PER_ROW = 10;
const ROWS: Review[][] = [
  REVIEWS.filter((_, i) => i % 2 === 0).slice(0, PER_ROW),
  REVIEWS.filter((_, i) => i % 2 === 1).slice(0, PER_ROW),
];

const localized = (review: Review, language: Language) =>
  language === 'pt' ? review.body : reviewTranslations[review.username]?.[language] ?? review.body;

function ReviewCard({ review, language, hidden }: { review: Review; language: Language; hidden: boolean }) {
  return (
    <figure
      aria-hidden={hidden || undefined}
      className="mr-4 flex w-[300px] shrink-0 flex-col justify-between rounded-sm border border-line bg-white p-6 sm:w-[360px]"
    >
      <blockquote className="text-[0.95rem] leading-relaxed text-ink">“{localized(review, language)}”</blockquote>
      <figcaption className="mt-6 flex items-center gap-3">
        <Image
          src={review.img}
          alt=""
          width={40}
          height={40}
          sizes="40px"
          className="size-10 rounded-sm object-cover grayscale"
        />
        <span>
          <span className="block text-sm font-semibold text-ink">{review.name}</span>
          <span className="block font-mono text-[0.7rem] text-mute">{review.username}</span>
        </span>
      </figcaption>
    </figure>
  );
}

export function Testimonials() {
  const { t, language } = useTranslation();

  return (
    <section id="testimonials" aria-labelledby="testimonials-title" className="overflow-hidden border-t border-line bg-surface py-24 sm:py-36">
      <div className="mx-auto grid max-w-[1440px] grid-cols-12 gap-x-4 gap-y-8 px-4 sm:px-8 lg:px-12">
        <p className="col-span-12 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-mute lg:col-span-2 lg:pt-4">
          ({LABEL[language]})
        </p>
        <SplitWords
          id="testimonials-title"
          className="col-span-12 text-[clamp(2.2rem,5vw,5rem)] font-semibold leading-[0.95] tracking-[-0.05em] text-ink lg:col-span-7"
          parts={[t('testimonials.title')]}
        />
        <Reveal className="col-span-12 md:col-span-6 lg:col-span-3 lg:pt-4">
          <p className="text-base leading-relaxed text-ink-soft">{t('testimonials.subtitle')}</p>
        </Reveal>
      </div>

      <div className="mt-16 space-y-4">
        {ROWS.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="marquee"
            style={{
              maskImage: 'linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)',
              WebkitMaskImage: 'linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)',
            }}
          >
            <div
              className="marquee-track"
              data-reverse={rowIndex === 1}
              style={{ '--marquee-duration': `${row.length * 6}s` } as CSSProperties}
            >
              {[0, 1].map((copyIndex) =>
                row.map((review) => (
                  <ReviewCard
                    key={`${copyIndex}-${review.username}`}
                    review={review}
                    language={language}
                    hidden={copyIndex === 1}
                  />
                )),
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
