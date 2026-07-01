'use client';
import { useTranslation } from '@/lib/i18n';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Globe, Menu, X } from 'lucide-react';

export default function Navbar() {
  const { t, language, setLanguage } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleWhatsAppRedirect = (text: string) => {
    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/5562992466109?text=${encodedText}`, '_blank');
  };

  const navLinks = [
    { label: t('nav.services'), href: '#services' },
    { label: t('nav.gdc'), href: '#gdc' },
    { label: 'PontoControle', href: '#pontocontrole' },
    { label: 'LeadScrap', href: '#leadscrap' },
    { label: 'FAQ', href: '#faq' }
  ];

  const getWaMessage = () => {
    if (language === 'en') return 'Hello ViraWeb! I would like to schedule a digital assessment for my business.';
    if (language === 'es') return '¡Hola ViraWeb! Me gustaría agendar un diagnóstico digital para mi empresa.';
    return 'Olá ViraWeb! Gostaria de agendar um diagnóstico digital gratuito para a minha empresa.';
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-30 transition-all duration-300 border-b',
        isScrolled
          ? 'bg-white/80 backdrop-blur-md border-[#E2E8F0] py-3 shadow-sm'
          : 'bg-transparent border-transparent py-5'
      )}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <img
            src="/viraweb3.png"
            alt="ViraWeb Logo"
            className="h-8 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]"
          />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[#475569] hover:text-[#0F172A] font-medium text-sm transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="hidden md:flex items-center gap-6">
          {/* Premium Language Selector Pill */}
          <div className="flex items-center bg-slate-100 border border-slate-200/60 p-0.5 rounded-full select-none gap-0.5">
            {(['pt', 'en', 'es'] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={cn(
                  'px-3 py-1 text-[10px] md:text-xs font-black uppercase tracking-wider rounded-full transition-all duration-300 cursor-pointer',
                  language === lang 
                    ? 'bg-[#2563EB] text-white shadow-sm scale-100' 
                    : 'text-slate-500 hover:text-slate-800 hover:bg-slate-200/40 scale-95'
                )}
              >
                {lang}
              </button>
            ))}
          </div>

          {/* Scale CTA */}
          <button
            onClick={() => handleWhatsAppRedirect(getWaMessage())}
            className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold text-sm px-5 py-2.5 rounded-lg transition-all shadow-md shadow-blue-500/10 active:scale-95"
          >
            {t('nav.button')}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-3 md:hidden">
          {/* Mobile Language Selector Pill */}
          <div className="flex items-center bg-slate-100 border border-slate-200/60 p-0.5 rounded-full select-none gap-0.5">
            {(['pt', 'en', 'es'] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={cn(
                  'px-2 py-0.5 text-[9px] font-black uppercase rounded-full transition-all duration-200 cursor-pointer',
                  language === lang 
                    ? 'bg-[#2563EB] text-white shadow-xs' 
                    : 'text-slate-500 hover:text-slate-800'
                )}
              >
                {lang}
              </button>
            ))}
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-[#0F172A] p-1.5"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={cn(
          'fixed inset-x-0 top-[60px] bottom-0 bg-white z-20 px-6 py-8 border-t border-[#E2E8F0] md:hidden transition-transform duration-300 ease-in-out',
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="flex flex-col gap-6 h-full justify-between">
          <nav className="flex flex-col gap-5">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-semibold text-[#0F172A] border-b border-[#F8FAFC] pb-2"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex flex-col gap-4 pb-12">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                handleWhatsAppRedirect(getWaMessage());
              }}
              className="w-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-blue-500/10 text-center"
            >
              {t('nav.button')}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
