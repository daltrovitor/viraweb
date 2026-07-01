'use client';

import { useTranslation } from '@/lib/i18n';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowRight, Sparkles } from 'lucide-react';
import { GLSLHills } from '@/components/ui/glsl-hills';

export default function Hero() {
  const { t, language } = useTranslation();
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleWhatsAppRedirect = () => {
    const text = language === 'en'
      ? 'Hello ViraWeb! I want to schedule a free digital strategic assessment.'
      : language === 'es'
      ? '¡Hola ViraWeb! Quiero agendar un diagnóstico estratégico gratuito.'
      : 'Olá ViraWeb! Quero agendar um diagnóstico estratégico gratuito para minha empresa.';
    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/5562992466109?text=${encodedText}`, '_blank');
  };

  useEffect(() => {
    if (!contentRef.current) return;
    
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.4 } });

      tl.fromTo(
        '.hero-badge',
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, delay: 0.3 }
      )
        .fromTo(
          '.hero-title span',
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, stagger: 0.15 },
          '-=1.0'
        )
        .fromTo(
          '.hero-subtext',
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0 },
          '-=0.8'
        )
        .fromTo(
          '.hero-ctas',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0 },
          '-=0.8'
        );
    }, contentRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden bg-white"
    >
      {/* 3D GLSL Hills WebGL Background Canvas (Light style) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <GLSLHills 
          cameraZ={135} 
          planeSize={256} 
          speed={0.4} 
          lineColorHex="#CBD5E1" // Slate-300 lines for subtle wireframe terrain
        />
        {/* Subtle bottom fade gradient */}
        <div className="absolute bottom-0 left-0 w-full h-[30vh] bg-gradient-to-t from-white to-transparent pointer-events-none" />
      </div>

      {/* Blueprint Grid Lines overlaid for layout texture */}
      <div className="absolute inset-0 pointer-events-none opacity-25 z-0">
        {/* Horizontal grid lines */}
        <div className="absolute top-[20%] left-0 w-full h-[1px] bg-[#E2E8F0]" />
        <div className="absolute top-[50%] left-0 w-full h-[1px] bg-[#E2E8F0]" />
        <div className="absolute top-[80%] left-0 w-full h-[1px] bg-[#E2E8F0]" />
        {/* Vertical grid lines */}
        <div className="absolute left-[15%] top-0 h-full w-[1px] bg-[#E2E8F0]" />
        <div className="absolute left-[50%] top-0 h-full w-[1px] bg-[#E2E8F0]" />
        <div className="absolute left-[85%] top-0 h-full w-[1px] bg-[#E2E8F0]" />
      </div>

      <div 
        ref={contentRef}
        className="max-w-[1000px] mx-auto px-6 md:px-12 relative z-10 flex flex-col items-center text-center select-none"
      >
       

        {/* Clean Center-Aligned Title */}
        <h1 className="hero-title text-4xl sm:text-6xl md:text-7xl font-black text-[#0F172A] tracking-tighter leading-[0.95] mb-8">
          <span className="font-light italic text-2xl sm:text-4xl md:text-5xl block text-[#475569] mb-4">
            {language === 'en' ? 'Elite Code. Sustainable Scale.' : language === 'es' ? 'Código de Élite. Escala Sostenible.' : 'Código de Elite. Escala Sustentável.'}
          </span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] to-[#06B6D4] font-black pb-1">
            {language === 'en' ? 'Designs That Speak' : language === 'es' ? 'Diseños que Hablan' : 'Designs que Falam'}
          </span>
          <span className="block">
            {language === 'en' ? 'Louder Than Words' : language === 'es' ? 'Más Alto que las Palabras' : 'Mais Alto que Palavras'}
          </span>
        </h1>

        {/* Subtitle */}
        <p className="hero-subtext text-sm sm:text-base md:text-lg text-[#475569] leading-relaxed max-w-[65ch] mb-10 font-medium">
          {language === 'en' 
            ? 'Development of exclusive software, integrated artificial intelligence, high-scale qualified traffic, and tailor-made systems for your operation.'
            : language === 'es'
            ? 'Desarrollo de software exclusivo, inteligencia artificial integrada, tráfico calificado a gran escala y sistemas a la medida para su operación.'
            : 'Desenvolvimento de softwares exclusivos, inteligência artificial integrada, tráfego qualificado de alta escala e sistemas sob medida para a sua operação.'}
        </p>

        {/* Magnetic/Centered Action CTAs */}
        <div className="hero-ctas flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <button
            onClick={handleWhatsAppRedirect}
            className="w-full sm:w-auto bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-sm md:text-base px-8 py-4 rounded-xl transition-all shadow-lg shadow-blue-500/20 active:scale-[0.97] flex items-center justify-center gap-2 group cursor-pointer"
          >
            {language === 'en' ? 'Schedule Free Assessment' : language === 'es' ? 'Agendar Diagnóstico Gratuito' : 'Agendar Diagnóstico Gratuito'}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <a
            href="#services"
            className="w-full sm:w-auto border border-[#E2E8F0] hover:border-[#0F172A] bg-white/80 backdrop-blur text-[#0F172A] font-bold text-sm md:text-base px-8 py-4 rounded-xl transition-all text-center active:scale-[0.97] cursor-pointer"
          >
            {language === 'en' ? 'Explore Solutions' : language === 'es' ? 'Explorar Soluciones' : 'Explorar Soluções'}
          </a>
        </div>
      </div>
    </section>
  );
}
