// Hello World
import SmoothScroll from '@/components/smooth-scroll';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { IntroOverlay } from '@/components/home/intro-overlay';
import { Hero } from '@/components/home/hero';
import { VelocityMarquee } from '@/components/home/velocity-marquee';
import { FactorySection } from '@/components/home/factory-section';
import { Manifesto } from '@/components/home/manifesto';
import { ServicesStack } from '@/components/home/services-stack';
import { PackageStrip } from '@/components/home/package-strip';
import { ProductsChapter } from '@/components/home/products-chapter';
import { OdontoSection } from '@/components/odonto/odonto-section';
import { PontoControle } from '@/components/home/pontocontrole';
import { LeadScrap } from '@/components/home/leadscrap';
import { Process } from '@/components/home/process';
import { Testimonials } from '@/components/home/testimonials';
import { Faq } from '@/components/home/faq';
import { Contact } from '@/components/home/contact';

export default function Home() {
  return (
    <SmoothScroll>
      <IntroOverlay />
      <Navbar />
      <main id="conteudo" className="relative z-10 bg-white">
        <Hero />
        <VelocityMarquee />
        <FactorySection />
        <Manifesto />
        <ServicesStack />
        <PackageStrip />
        <ProductsChapter />
        <OdontoSection />
        <PontoControle />
        <LeadScrap />
        <Process />
        <Testimonials />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
