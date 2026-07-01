'use client';
import { useState, useEffect } from 'react';
import { AnimatedScanLoader } from '@/components/ui/animated-scan-loader';
import { useTranslation } from '@/lib/i18n';
import SmoothScroll from '@/components/smooth-scroll';
import Navbar from '@/components/navbar';
import Hero from '@/components/hero';
import LogoWall from '@/components/logo-wall';
import Services from '@/components/services';
import GdcSpotlight from '@/components/gdc-spotlight';
import PontoControleSection from '@/components/pontocontrole-section';
import LeadScrapSection from '@/components/leadscrap-section';
import Testimonials from '@/components/testimonials';
import Faq from '@/components/faq';
import ContactCta from '@/components/contact-cta';
import Footer from '@/components/footer';
import TailedCursor from '@/components/tailed-cursor';

import ScrollStorytelling from '@/components/scroll-storytelling';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
      document.body.style.height = '100dvh';
    } else {
      document.body.style.overflow = '';
      document.body.style.height = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.height = '';
    };
  }, [isLoading]);

  return (
    <>
      {isLoading && (
        <AnimatedScanLoader 
          onStartExit={() => setIsExiting(true)}
          onComplete={() => {
            setIsLoading(false);
            setIsExiting(false);
          }} 
        />
      )}
      <div className={`transition-opacity duration-1000 ${isExiting || !isLoading ? 'opacity-100' : 'opacity-0 h-screen overflow-hidden'}`}>
        <SmoothScroll>
          <ScrollStorytelling />
          <div className="relative min-h-screen bg-white text-slate-900 selection:bg-blue-500/10 selection:text-blue-600">
        {/* Custom Ribbon-Tailed WebGL Cursor */}
        <TailedCursor
          colors={['#2563EB', '#06B6D4']}
          baseThickness={30}
          speedMultiplier={0.5}
          maxAge={500}
          enableFade={false}
          enableShaderEffect={false}
        />

        {/* Global Navigation */}
        <Navbar />

        {/* Main Content Layout */}
        <main>
          {/* Hero Section */}
          <Hero />

          {/* Scrolling Tech Logo Wall */}
          <LogoWall />

          {/* Services Bento Grid */}
          <Services />

          {/* Exclusive Technology G.D.C. Spotlight */}
          <GdcSpotlight />

          {/* SaaS Section 1: PontoControle (pontocontrole.com.br) */}
          <PontoControleSection />

          {/* SaaS Section 2: LeadScrap (ls.viraweb.online) */}
          <LeadScrapSection />

          {/* Client Testimonials */}
          <Testimonials />

          {/* FAQ Accordion */}
          <Faq />

          {/* Contact and Strategy Call CTA */}
          <ContactCta />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </SmoothScroll>
      </div>
    </>
  );
}
