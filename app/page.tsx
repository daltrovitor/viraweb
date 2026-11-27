// Hello World
import type { Metadata } from 'next';
import SmoothScroll from '@/components/smooth-scroll';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { CaseShowcase } from '@/components/home/case-showcase';
import { Hero } from '@/components/home/hero';
import { BrandMark } from '@/components/brand/brand-mark';
import { Process } from '@/components/home/process';
import { Testimonials } from '@/components/home/testimonials';
import { Faq } from '@/components/home/faq';
import { Contact } from '@/components/home/contact';
import { SITE } from '@/lib/site';
import { homeJsonLd, serializeJsonLd } from '@/lib/structured-data';

export const metadata: Metadata = {
  alternates: { canonical: SITE.url },
  openGraph: { url: SITE.url },
};

export default function Home() {
  return (
    <>
      <div className="brand-curtain" aria-hidden="true">
        <div className="brand-curtain-mark">
          <BrandMark className="w-full" />
        </div>
      </div>
      <SmoothScroll>
        <script id="ld-home" type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(homeJsonLd()) }} />
        <Navbar />
        <main id="conteudo" className="relative z-10 bg-white">
          <Hero />
          <CaseShowcase />
          <Process />
          <Testimonials />
          <Faq />
          <Contact />
        </main>
        <Footer />
      </SmoothScroll>
    </>
  );
}
