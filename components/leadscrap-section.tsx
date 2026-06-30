'use client';
import { useState } from 'react';
import { useTranslation } from '@/lib/i18n';
import { cn } from '@/lib/utils';
import { Search, Send, BarChart2, CheckCircle2, ArrowRight, TrendingUp, MessageSquare, ShieldAlert } from 'lucide-react';

export default function LeadScrapSection() {
  const { t, language } = useTranslation();

  const handleWhatsAppRedirect = () => {
    const text = language === 'en'
      ? 'Hello ViraWeb! I am interested in LeadScrap (LS) active prospecting tool.'
      : language === 'es'
      ? '¡Hola ViraWeb! Estou interesado en la herramienta de prospección LeadScrap (LS).'
      : 'Olá ViraWeb! Estou interessado no LeadScrap (LS) para automação de prospecção e disparos.';
    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/5562992466109?text=${encodedText}`, '_blank');
  };

  return (
    <section id="leadscrap" className="py-24 bg-white border-b border-[#E2E8F0] relative overflow-hidden">
      {/* Blueprint Visual grids */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-[25%] left-0 w-full h-[1px] bg-[#E2E8F0]" />
        <div className="absolute top-[75%] left-0 w-full h-[1px] bg-[#E2E8F0]" />
        <div className="absolute left-[30%] top-0 h-full w-[1px] bg-[#E2E8F0]" />
        <div className="absolute left-[70%] top-0 h-full w-[1px] bg-[#E2E8F0]" />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        
        {/* LeadScrap Mini-Landing Header Mockup inside Section */}
        <div className="w-full bg-[#F8FAFC]/60 border border-[#E2E8F0] rounded-2xl p-6 sm:p-8 flex flex-col gap-12 shadow-sm">
          
          {/* Header row (Exactly like Image 3 logo and menu style) */}
          <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-5 select-none">
            {/* Logo: favicon.png + ViraWeb + LS */}
            <div className="flex items-center gap-2 group">
              <img
                src="/favicon.png"
                alt="LeadScrap Logo Icon"
                className="h-6 w-auto object-contain"
              />
              <span className="font-bold text-base tracking-tight text-[#0F172A] flex items-center gap-1.5">
                ViraWeb <span className="font-black text-[#2563EB]">LS</span>
              </span>
            </div>

            {/* Menu Links */}
            <div className="hidden md:flex items-center gap-6 text-xs font-bold text-slate-500">
              <a href="#features" className="hover:text-slate-900 transition-colors">Recursos</a>
              <a href="#features" className="hover:text-slate-900 transition-colors">Problemas</a>
              <a href="#contact" className="hover:text-slate-900 transition-colors">Contato</a>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleWhatsAppRedirect}
                className="hidden sm:block text-xs font-bold text-[#0F172A] border border-[#E2E8F0] px-4 py-2 rounded-lg bg-white hover:border-slate-400 transition-all cursor-pointer"
              >
                Entrar
              </button>
              <button
                onClick={handleWhatsAppRedirect}
                className="bg-[#204E8A] hover:bg-[#2563EB] text-white font-bold text-xs px-4 py-2 rounded-lg transition-all cursor-pointer"
              >
                Começar Agora
              </button>
            </div>
          </div>

          {/* Hero Section Split Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Headline and pitch (Exactly like Image 3) */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#D97706]/10 text-[#D97706] text-xs font-bold uppercase tracking-wider mb-6 border border-[#D97706]/20">
                ⚡ TRANSFORME SUA PROSPECÇÃO EM 24H
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-[3rem] font-black text-[#0F172A] tracking-tighter leading-tight mb-6">
                Sua Máquina de <br />
                <span className="text-[#2563EB]">Vendas Automatizada</span> <br />
                no WhatsApp
              </h2>

              <p className="text-[#475569] text-sm sm:text-base leading-relaxed mb-8 max-w-[55ch]">
                Extraia contatos qualificados do Google Maps, dispare campanhas em massa com proteção anti-ban militar e automatize todo o seu funil de vendas. Pare de perder tempo com tarefas manuais.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-8 select-none">
                <button
                  onClick={handleWhatsAppRedirect}
                  className="bg-[#204E8A] hover:bg-[#2563EB] text-white font-bold text-sm px-8 py-4 rounded-xl transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                >
                  Garantir Acesso
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={handleWhatsAppRedirect}
                  className="border border-[#E2E8F0] hover:border-slate-400 bg-white text-slate-700 font-bold text-sm px-8 py-4 rounded-xl transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <TrendingUp className="w-4 h-4 text-blue-600" />
                  Ver Recursos
                </button>
              </div>

              {/* Badges list underneath (Exactly like Image 3) */}
              <div className="flex flex-wrap gap-x-6 gap-y-3 text-xs font-semibold text-slate-500 select-none">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Sem cartão de crédito</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Ativação imediata</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Suporte VIP</span>
                </div>
              </div>
            </div>

            {/* Right Column: Glowing Wireframe Sphere with floaters (Exactly like Image 3) */}
            <div className="lg:col-span-5 w-full flex items-center justify-center relative min-h-[320px] select-none">
              
              {/* Rotating Wireframe Sphere visual */}
              <div className="relative w-72 h-72 rounded-full border border-blue-500/10 flex items-center justify-center animate-[spin_40s_linear_infinite]">
                <div className="absolute inset-4 rounded-full border border-dashed border-blue-500/20" />
                <div className="absolute inset-8 rounded-full border border-blue-500/10 flex items-center justify-center">
                  <div className="w-40 h-40 rounded-full border border-dashed border-blue-500/20" />
                </div>
                {/* Diagonal lines to make it look like a wireframe globe */}
                <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-blue-500/10" />
                <div className="absolute left-0 right-0 top-1/2 h-[1px] bg-blue-500/10" />
                <div className="absolute inset-0 rounded-full border-t border-b border-blue-500/20 rotate-45" />
                <div className="absolute inset-0 rounded-full border-l border-r border-blue-500/20 -rotate-45" />
              </div>

              {/* Floating Card 1: DISPARO Ativo (Top Left) */}
              <div className="absolute top-8 left-0 sm:left-4 bg-white/95 backdrop-blur border border-[#E2E8F0] px-4 py-3 rounded-xl shadow-lg flex items-center gap-3 animate-[bounce_5s_infinite_ease-in-out]">
                <div className="p-2 bg-emerald-50 border border-emerald-100 rounded-lg text-emerald-600">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div className="text-left font-sans">
                  <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">DISPARO</div>
                  <span className="text-xs font-black text-[#0F172A]">Ativo</span>
                </div>
              </div>

              {/* Floating Card 2: LEADS +4.582 (Bottom Right) */}
              <div className="absolute bottom-8 right-0 sm:right-4 bg-white/95 backdrop-blur border border-[#E2E8F0] px-4 py-3 rounded-xl shadow-lg flex items-center gap-3 animate-[bounce_6s_infinite_ease-in-out_alternate]">
                <div className="p-2 bg-amber-50 border border-amber-100 rounded-lg text-amber-600">
                  <Search className="w-5 h-5" />
                </div>
                <div className="text-left font-sans">
                  <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">LEADS</div>
                  <span className="text-xs font-black text-[#0F172A]">+4.582</span>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
