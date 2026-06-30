'use client';
import { useTranslation } from '@/lib/i18n';
import { Phone, Mail, Instagram, Globe, ArrowRight, ArrowUpRight } from 'lucide-react';

export default function ContactCta() {
  const { t, language } = useTranslation();

  const handleWhatsAppRedirect = () => {
    const text = language === 'en'
      ? 'Hello ViraWeb! I would like to request a 15-minute strategic session for my business.'
      : language === 'es'
      ? '¡Hola ViraWeb! Me gustaría solicitar una sesión estratégica de 15 minutos para mi empresa.'
      : 'Olá ViraWeb! Gostaria de solicitar uma sessão estratégica gratuita de 15 minutos para a minha empresa.';
    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/5562992466109?text=${encodedText}`, '_blank');
  };

  const handleInstagramRedirect = () => {
    window.open('https://instagram.com/viraweb.online', '_blank');
  };

  return (
    <section className="py-24 bg-white border-b border-[#E2E8F0] relative overflow-hidden">
      {/* Structural blueprint visual grids */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-[30%] left-0 w-full h-[1px] bg-[#E2E8F0]" />
        <div className="absolute top-[70%] left-0 w-full h-[1px] bg-[#E2E8F0]" />
        <div className="absolute left-[30%] top-0 h-full w-[1px] bg-[#E2E8F0]" />
        <div className="absolute left-[70%] top-0 h-full w-[1px] bg-[#E2E8F0]" />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        <div className="bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#0F172A] rounded-2xl p-8 md:p-12 transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Heading & Value Prop */}
          <div className="lg:col-span-8 flex flex-col items-start text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D97706]/10 text-[#D97706] text-xs font-bold uppercase tracking-wider mb-6 border border-[#D97706]/20">
              {t('cta.badge')}
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-[#0F172A] tracking-tighter leading-none mb-6">
              {t('cta.title1')} <br className="hidden sm:inline" />
              <span className="text-[#2563EB]">{t('cta.title2')}</span> {t('cta.title3')}
            </h2>
            <p className="text-[#475569] text-base leading-relaxed max-w-[65ch] mb-8">
              {t('cta.subtitle')}
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto select-none">
              <button
                onClick={handleWhatsAppRedirect}
                className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-base px-8 py-4 rounded-xl transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 group cursor-pointer active:scale-95"
              >
                {t('cta.button')}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => window.open('mailto:suporte@viraweb.online')}
                className="border border-[#E2E8F0] hover:border-[#0F172A] bg-white text-[#0F172A] font-semibold text-base px-8 py-4 rounded-xl transition-all active:scale-95 cursor-pointer"
              >
                Fale por E-mail
              </button>
            </div>
          </div>

          {/* Right Column: High fidelity contact details card */}
          <div className="lg:col-span-4 w-full">
            <div className="bg-white border border-[#E2E8F0] p-6 rounded-xl space-y-4">
              <h4 className="font-bold text-xs text-[#0F172A] uppercase tracking-wider mb-2">Soporte Técnico Directo</h4>
              
              {/* Phone item */}
              <div
                onClick={handleWhatsAppRedirect}
                className="flex items-center justify-between p-3 rounded-lg border border-[#E2E8F0] hover:border-[#2563EB] hover:bg-blue-50/20 transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#2563EB]" />
                  <span className="text-xs font-mono font-bold text-[#0F172A]">+55 62 99246-6109</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#94A3B8] group-hover:text-[#2563EB] transition-colors" />
              </div>

              {/* Email item */}
              <a
                href="mailto:suporte@viraweb.online"
                className="flex items-center justify-between p-3 rounded-lg border border-[#E2E8F0] hover:border-[#2563EB] hover:bg-blue-50/20 transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#06B6D4]" />
                  <span className="text-xs font-mono font-bold text-[#0F172A]">suporte@viraweb.online</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#94A3B8] group-hover:text-[#06B6D4] transition-colors" />
              </a>

              {/* Instagram item */}
              <div
                onClick={handleInstagramRedirect}
                className="flex items-center justify-between p-3 rounded-lg border border-[#E2E8F0] hover:border-[#2563EB] hover:bg-blue-50/20 transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <Instagram className="w-4 h-4 text-[#D97706]" />
                  <span className="text-xs font-mono font-bold text-[#0F172A]">@viraweb.online</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#94A3B8] group-hover:text-[#D97706] transition-colors" />
              </div>

              {/* Website item */}
              <div
                className="flex items-center justify-between p-3 rounded-lg border border-[#E2E8F0] text-slate-300"
              >
                <div className="flex items-center gap-3">
                  <Globe className="w-4 h-4 text-[#10B981]" />
                  <span className="text-xs font-mono font-bold text-[#0F172A]">viraweb.online</span>
                </div>
                <span className="text-[9px] bg-slate-100 text-slate-500 font-bold px-1.5 py-0.5 rounded uppercase select-none">Principal</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
