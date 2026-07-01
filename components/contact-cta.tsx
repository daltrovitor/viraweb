'use client';

import { useTranslation } from '@/lib/i18n';
import { FlipLink } from '@/components/ui/reveal-links';

export default function ContactCta() {
  const { language } = useTranslation();

  return (
    <section id="contact-cta" className="py-24 bg-white border-b border-[#E2E8F0] relative overflow-hidden">
      {/* Structural blueprint visual grids */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-[25%] left-0 w-full h-[1px] bg-[#E2E8F0]" />
        <div className="absolute top-[75%] left-0 w-full h-[1px] bg-[#E2E8F0]" />
        <div className="absolute left-[30%] top-0 h-full w-[1px] bg-[#E2E8F0]" />
        <div className="absolute left-[70%] top-0 h-full w-[1px] bg-[#E2E8F0]" />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        {/* Centered list of large FlipLinks occupying full width */}
        <div className="w-full flex flex-col items-center justify-center gap-6 sm:gap-8 md:gap-10 text-center select-none py-6">
          <FlipLink 
            href="https://wa.me/5562992466109" 
            className="text-4xl sm:text-7xl md:text-8xl lg:text-[7.5rem] font-black text-slate-900  transition-colors uppercase leading-[0.75]"
          >
            WhatsApp
          </FlipLink>
          
          <FlipLink 
            href="mailto:suporte@viraweb.online" 
            className="text-4xl sm:text-7xl md:text-8xl lg:text-[7.5rem] font-black text-slate-900 transition-colors uppercase leading-[0.75]"
          >
            E-mail
          </FlipLink>
          
          <FlipLink 
            href="https://instagram.com/viraweb.online" 
            className="text-4xl sm:text-7xl md:text-8xl lg:text-[7.5rem] font-black text-slate-900  transition-colors uppercase leading-[0.75]"
          >
            Instagram
          </FlipLink>
          
          <FlipLink 
            href="https://wa.me/5562992466109" 
            className="text-4xl sm:text-7xl md:text-8xl lg:text-[7.5rem] font-black text-black transition-colors uppercase leading-[0.75]"
          >
            {language === 'en' ? 'Start Now!' : language === 'es' ? '¡Comience Ahora!' : 'Começar Agora!'}
          </FlipLink>
        </div>
      </div>
    </section>
  );
}
