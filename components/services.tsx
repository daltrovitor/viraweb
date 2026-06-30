'use client';
import { useTranslation } from '@/lib/i18n';
import { Code, Settings, MessageSquareCode, MapPin, ArrowUpRight } from 'lucide-react';

export default function Services() {
  const { t, language } = useTranslation();

  const handleWhatsAppRedirect = (serviceName: string) => {
    let text = '';
    if (language === 'en') {
      text = `Hello ViraWeb! I am interested in your ${serviceName} solutions and would like to talk to a software engineer.`;
    } else if (language === 'es') {
      text = `¡Hola ViraWeb! Estoy interesado en sus soluciones de ${serviceName} y me gustaría hablar con un ingeniero de software.`;
    } else {
      text = `Olá ViraWeb! Estou interessado na solução de ${serviceName} e gostaria de conversar com um engenheiro de software.`;
    }
    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/5562992466109?text=${encodedText}`, '_blank');
  };

  const services = [
    {
      key: 'creation',
      title: t('services.creation'),
      desc: t('services.creation.desc'),
      icon: <Code className="w-8 h-8 text-[#2563EB]" />,
      badge: 'SPEED & SEO',
      features: ['Carregamento < 1.5s', 'SEO Técnico Nativo', 'CMS Próprio/Flexível', 'Design Responsivo Premium']
    },
    {
      key: 'systems',
      title: t('services.traffic'),
      desc: t('services.traffic.desc'),
      icon: <Settings className="w-8 h-8 text-[#06B6D4]" />,
      badge: 'ARCHITECTURE',
      features: ['ERPs & CRMs sob medida', 'Integrações de APIs complexas', 'Bancos de dados otimizados', 'Segurança granular']
    },
    {
      key: 'bot',
      title: t('services.assistant'),
      desc: t('services.assistant.desc'),
      icon: <MessageSquareCode className="w-8 h-8 text-[#D97706]" />,
      badge: 'INTELLIGENCE',
      features: ['Funcionamento 24/7', 'Qualificação de leads', 'Triagem e agendamentos', 'Integração de CRM ativa']
    },
    {
      key: 'seo',
      title: t('services.gmn'),
      desc: t('services.gmn.desc'),
      icon: <MapPin className="w-8 h-8 text-[#10B981]" />,
      badge: 'CONVERSION',
      features: ['Presença no Maps', 'Atração de leads locais', 'Revisões estruturadas', 'Otimização orgânica']
    }
  ];

  return (
    <section id="services" className="py-24 bg-white border-b border-[#E2E8F0] relative">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="max-w-4xl mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2563EB]/10 text-[#2563EB] text-xs font-bold uppercase tracking-wider mb-4 border border-blue-500/10">
            {t('services.badge')}
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-[#0F172A] tracking-tighter leading-none mb-6">
            {t('services.title1')} <br className="hidden sm:inline" />
            <span className="text-[#2563EB]">{t('services.title2')}</span> {t('services.title3')}
          </h2>
          <p className="text-[#475569] text-base leading-relaxed max-w-[65ch]">
            {t('services.subtitle')}
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service) => (
            <div
              key={service.key}
              onClick={() => handleWhatsAppRedirect(service.title)}
              className="group bg-white hover:bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#0F172A] p-8 rounded-2xl transition-all duration-300 flex flex-col justify-between min-h-[320px] cursor-pointer shadow-sm relative overflow-hidden"
            >
              {/* Corner Accent Line */}
              <div className="absolute top-0 right-0 w-24 h-[1px] bg-gradient-to-r from-transparent to-[#2563EB] opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute top-0 right-0 h-24 w-[1px] bg-gradient-to-b from-[#2563EB] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div>
                {/* Header Icon + Action arrow */}
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3 bg-[#F8FAFC] group-hover:bg-white border border-[#E2E8F0] rounded-xl transition-colors">
                    {service.icon}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold tracking-widest text-[#64748B] uppercase border border-[#E2E8F0] px-2 py-1 rounded">
                      {service.badge}
                    </span>
                    <div className="w-8 h-8 rounded-full border border-[#E2E8F0] group-hover:border-[#0F172A] group-hover:bg-[#0F172A] group-hover:text-white flex items-center justify-center transition-all">
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </div>
                  </div>
                </div>

                {/* Title & Desc */}
                <h3 className="text-xl font-bold text-[#0F172A] mb-3 group-hover:text-[#2563EB] transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm text-[#475569] leading-relaxed mb-6">
                  {service.desc}
                </p>
              </div>

              {/* Sub-features list */}
              <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 pt-4 border-t border-[#E2E8F0]/60">
                {service.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs font-medium text-[#475569]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
                    {feat}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Global CTA Section Bottom */}
        <div className="mt-16 flex justify-center">
          <button
            onClick={() => handleWhatsAppRedirect('Falar com Engenheiro')}
            className="group bg-[#0F172A] hover:bg-[#2563EB] text-white font-bold text-base px-8 py-4 rounded-xl transition-all shadow-md active:scale-[0.98] flex items-center gap-3 cursor-pointer"
          >
            {t('services.cta')}
            <ArrowUpRight className="w-5 h-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>
    </section>
  );
}
