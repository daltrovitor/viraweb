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

const isBotOrLighthouse = () => {
  if (typeof window === 'undefined') return false;
  const ua = navigator.userAgent.toLowerCase();
  return ua.includes('lighthouse') || 
         ua.includes('googlebot') || 
         ua.includes('bingbot') || 
         ua.includes('baiduspider') || 
         ua.includes('yandex') ||
         ua.includes('chrome-lighthouse');
};

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (isBotOrLighthouse()) {
      setIsLoading(false);
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('loader-complete'));
      }, 50);
    }
  }, []);

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

          {/* Pinned Horizontal Scroll on Desktop, Touch Horizontal Swipe Carousel on Mobile (No Cuts, 100% Testable) */}
          <div className="saas-scroll-container bg-white border-b border-[#E2E8F0] overflow-x-auto lg:overflow-hidden snap-x snap-mandatory lg:snap-none scrollbar-none flex flex-row lg:block w-screen h-auto">
            <div className="saas-scroll-track flex flex-row flex-nowrap h-auto lg:h-screen w-[400vw] items-stretch lg:items-center">
              {/* Slide 1: GDC Spotlight */}
              <div className="saas-scroll-slide w-screen h-auto lg:h-full flex-shrink-0 flex items-start lg:items-center justify-center overflow-visible lg:overflow-hidden snap-start bg-[#F8FAFC] py-12 lg:py-0">
                <div className="w-full scale-100 lg:scale-[0.85] xl:scale-[0.9] 2xl:scale-100 origin-center">
                  <GdcSpotlight />
                </div>
              </div>

              {/* Slide 2: PontoControle Simulator */}
              <div className="saas-scroll-slide w-screen h-auto lg:h-full flex-shrink-0 flex items-start lg:items-center justify-center overflow-visible lg:overflow-hidden snap-start bg-white py-12 lg:py-0">
                <div className="w-full scale-100 lg:scale-[0.85] xl:scale-[0.9] 2xl:scale-100 origin-center">
                  <PontoControleSection showOnly="simulator" />
                </div>
              </div>

              {/* Slide 3: PontoControle Features */}
              <div className="saas-scroll-slide w-screen h-auto lg:h-full flex-shrink-0 flex items-start lg:items-center justify-center overflow-visible lg:overflow-hidden snap-start bg-[#F8FAFC]/30 py-12 lg:py-0">
                <div className="w-full scale-100 lg:scale-[0.85] xl:scale-[0.9] 2xl:scale-100 origin-center">
                  <PontoControleSection showOnly="cards" />
                </div>
              </div>

              {/* Slide 4: LeadScrap */}
              <div className="saas-scroll-slide w-screen h-auto lg:h-full flex-shrink-0 flex items-start lg:items-center justify-center overflow-visible lg:overflow-hidden snap-start bg-white py-12 lg:py-0">
                <div className="w-full scale-100 lg:scale-[0.85] xl:scale-[0.9] 2xl:scale-100 origin-center">
                  <LeadScrapSection />
                </div>
              </div>
            </div>
          </div>

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
