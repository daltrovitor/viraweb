// Hello World
import type { Metadata } from 'next';
import SmoothScroll from '@/components/smooth-scroll';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { CaseShowcase } from '@/components/home/case-showcase';
import { Hero } from '@/components/home/hero';
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
  );
}
