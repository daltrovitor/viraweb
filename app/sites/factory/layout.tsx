// Hello World
import type { Metadata } from 'next';
import SmoothScroll from '@/components/smooth-scroll';
import { FactoryNav } from '@/components/factory/factory-nav';
import { FactoryFooter } from '@/components/factory/factory-footer';
import { FACTORY } from '@/lib/factory/site';

const TITLE = 'ViraWeb Factory — Você explica. A gente constrói.';

export const metadata: Metadata = {
  metadataBase: new URL(FACTORY.url),
  title: { default: TITLE, template: '%s · ViraWeb Factory' },
  description: FACTORY.description,
  applicationName: FACTORY.name,
  alternates: { canonical: '/' },
  openGraph: {
    title: TITLE,
    description: FACTORY.description,
    url: FACTORY.url,
    siteName: FACTORY.name,
    locale: 'pt_BR',
    type: 'website',
    images: [{ url: '/favicon.png', alt: 'ViraWeb Factory', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: FACTORY.description,
    images: ['/favicon.png'],
  },
};

export default function FactoryLayout({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScroll>
      <FactoryNav />
      <main id="conteudo" className="relative z-10 min-h-[70svh] bg-white">
        {children}
      </main>
      <FactoryFooter />
    </SmoothScroll>
  );
}
