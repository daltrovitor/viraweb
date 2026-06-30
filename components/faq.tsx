'use client';

import { useTranslation } from '@/lib/i18n';
import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Home, Monitor, Box, Wrench, MessageSquare, ShieldCheck, Sparkles, Share2, X } from 'lucide-react';
import { gsap } from 'gsap';

export default function Faq() {
  const { t } = useTranslation();
  const [clickedIndex, setClickedIndex] = useState<number | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  const faqItems = [
    { 
      q: t('faq.q1'), 
      a: t('faq.a1'),
      icon: <Home className="w-5 h-5" />
    },
    { 
      q: t('faq.q2'), 
      a: t('faq.a2'),
      icon: <Monitor className="w-5 h-5" />
    },
    { 
      q: t('faq.q3'), 
      a: t('faq.a3'),
      icon: <Box className="w-5 h-5" />
    },
    { 
      q: t('faq.q4'), 
      a: t('faq.a4'),
      icon: <Wrench className="w-5 h-5" />
    },
    {
      q: 'Como funciona a automação do WhatsApp no comercial?',
      a: 'Integramos o fluxo de conversas do seu comercial diretamente com o seu CRM ou banco de dados. Isso automatiza lembretes, envio de orçamentos e qualificação de leads sem trabalho manual.',
      icon: <MessageSquare className="w-5 h-5" />
    },
    {
      q: 'Vocês oferecem suporte pós-entrega?',
      a: 'Sim, oferecemos suporte técnico ativo pós-entrega para garantir que os servidores estejam no ar, as APIs funcionem e que sua equipe saiba operar as ferramentas criadas.',
      icon: <ShieldCheck className="w-5 h-5" />
    },
    {
      q: 'O design das páginas é personalizado?',
      a: 'Sim, não utilizamos templates prontos. Cada layout é desenhado do zero para a sua marca, combinando estética premium com foco em conversão e experiência do usuário.',
      icon: <Sparkles className="w-5 h-5" />
    },
    {
      q: 'Como é feita a integração com meus sistemas atuais?',
      a: 'Desenvolvemos conectores de API sob medida para sincronizar seus dados em tempo real com plataformas externas (ERP, gateways de pagamento, CRMs e bancos de dados externos).',
      icon: <Share2 className="w-5 h-5" />
    }
  ];

  // Repeat the list 3 times to support smooth infinite loop translation
  const doubledItems = [...faqItems, ...faqItems, ...faqItems];

  useEffect(() => {
    if (!trackRef.current) return;

    // Create the infinite scroll marquee tween using GSAP
    const tween = gsap.to(trackRef.current, {
      xPercent: -33.3333,
      ease: 'none',
      duration: 35,
      repeat: -1,
    });

    tweenRef.current = tween;

    return () => {
      tween.kill();
    };
  }, []);

  // Control deceleration on click and acceleration on resume
  useEffect(() => {
    const tween = tweenRef.current;
    if (!tween) return;

    if (clickedIndex !== null) {
      // Smooth deceleration stop
      gsap.to(tween, {
        timeScale: 0,
        duration: 1.2,
        ease: 'power3.out',
      });
    } else {
      // Smooth acceleration resume
      gsap.to(tween, {
        timeScale: 1,
        duration: 1.2,
        ease: 'power2.inOut',
      });
    }
  }, [clickedIndex]);

  const handleCardClick = (idx: number) => {
    if (clickedIndex === idx) {
      setClickedIndex(null); // Resume marquee
    } else {
      setClickedIndex(idx); // Stop marquee and expand card
    }
  };

  return (
    <section id="faq" className="py-24 bg-white border-b border-[#E2E8F0] relative overflow-hidden select-none">
      
      {/* Blueprint Grid Lines background */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-15"
        style={{
          backgroundImage: 'radial-gradient(rgba(148, 163, 184, 0.15) 1.5px, transparent 1.5px)',
          backgroundSize: '24px 24px'
        }}
      />

      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        
        {/* Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div className="flex flex-col text-left">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">FAQS</span>
            <h2 className="text-3xl md:text-5xl font-black text-[#0F172A] tracking-tighter leading-none mb-4">
              Perguntas <span className="text-[#2563EB]">Frequentes</span>
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm font-semibold max-w-[50ch] leading-relaxed">
              Clique em um card para pausar o carrossel e ler a resposta detalhada. Clique novamente para retomar o movimento.
            </p>
          </div>
        </div>
      </div>

      {/* Infinite Horizontal Slider Track */}
      <div className="w-full overflow-hidden relative">
        <div 
          ref={trackRef}
          className="flex flex-row gap-6 px-4 py-6 w-max"
        >
          {doubledItems.map((item, idx) => {
            const isActive = clickedIndex === idx;
            return (
              <div
                key={idx}
                onClick={() => handleCardClick(idx)}
                className={cn(
                  "w-[300px] h-[380px] rounded-2xl p-7 flex flex-col justify-between transition-all duration-500 cursor-pointer select-none shrink-0 text-left border relative",
                  isActive 
                    ? "bg-[#0F172A] border-[#0F172A] text-white shadow-xl scale-100" 
                    : "bg-[#F1F5F9] border-[#E2E8F0] text-[#0F172A] hover:bg-[#E2E8F0] scale-95 opacity-80 hover:opacity-100"
                )}
              >
                {/* Top Row: Icon Badge & Optional Close Button */}
                <div className="flex items-center justify-between w-full">
                  <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-500",
                    isActive ? "bg-white/10 text-white" : "bg-slate-200 text-slate-600"
                  )}>
                    {item.icon}
                  </div>
                  {isActive && (
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setClickedIndex(null);
                      }}
                      className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Content Area */}
                <div className="flex flex-col justify-end flex-grow mt-4">
                  {isActive ? (
                    <div className="flex flex-col justify-start h-full pt-4">
                      <h3 className="text-lg font-black tracking-tight leading-snug mb-3">
                        {item.q}
                      </h3>
                      <p className="text-xs text-slate-300 font-semibold leading-relaxed overflow-y-auto pr-1">
                        {item.a}
                      </p>
                    </div>
                  ) : (
                    <h3 className="text-lg font-extrabold tracking-tight leading-snug">
                      {item.q}
                    </h3>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Shadow cover gradients to block overflow edge visibility */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent z-10"></div>
      </div>
    </section>
  );
}
