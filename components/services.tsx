"use client"

import { Target, Globe, Bot, MapPin, ArrowUpRight } from "lucide-react"
import { motion } from "framer-motion"
import ScrollAnimate from "./scroll-animate"
import { useTranslation } from "@/lib/i18n"

export function Services() {
  const { t } = useTranslation()

  const services = [
    {
      icon: Globe,
      title: t("services.creation"),
      description: t("services.creation.desc"),
      features: [t("hero.stats.sites"), "SEO", "Performance", t("nav.services")], // Fallback/Generic
      url: "https://wa.me/556292466109?text=olá%2C%20gostaria%20de%20fazer%20um%20orçamento%20de%20criação%20de%20sites!%0A",
      accent: "#3396d3",
    },
    {
      icon: Target,
      title: t("services.traffic"),
      description: t("services.traffic.desc"),
      features: ["Google Ads", "Meta Ads", "ROI", "Analytics"],
      url: "https://wa.me/556292466109?text=olá%2C%20gostaria%20de%20fazer%20um%20orçamento%20de%20tráfego%20pago%20e%20anuncios!",
      accent: "#ffd400",
    },
    {
      icon: Bot,
      title: t("services.assistant"),
      description: t("services.assistant.desc"),
      features: ["AI", "24/7", "Leads", "WhatsApp"],
      url: "https://wa.me/556292466109?text=olá%2C%20gostaria%20de%20fazer%20um%20orçamento%20para%20um%20Assistente%20Virtual!",
      accent: "#3396d3",
    },
    {
      icon: MapPin,
      title: t("services.gmn"),
      description: t("services.gmn.desc"),
      features: ["Local SEO", "Reviews", "Google Maps", "Metrics"],
      url: "https://wa.me/556292466109?text=olá%2C%20gostaria%20de%20fazer%20um%20orçamento%20da%20ferramenta%20google%20meu%20negócio!",
      accent: "#ffd400",
    },
  ]

  return (
    <section id="servicos" className="relative bg-white overflow-hidden">
      {/* Background geométrico */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Dots grid sutil */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: "radial-gradient(#1a2e4a 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        {/* V geométrico decorativo */}
        <svg className="absolute -bottom-20 -right-20 w-80 text-[#3396d3] opacity-[0.04]" viewBox="0 0 120 140" fill="none">
          <path d="M60 140L10 40L35 40L60 95L85 40L110 40L60 140Z" fill="currentColor" />
        </svg>
        <svg className="absolute top-10 -left-10 w-48 text-[#ffd400] opacity-[0.05]" viewBox="0 0 120 140" fill="none">
          <path d="M60 140L10 40L35 40L60 95L85 40L110 40L60 140Z" fill="currentColor" />
        </svg>
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        {/* Header da seção — alinhado à esquerda, estilo diferente */}
        <ScrollAnimate delay={0}>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
            <div>
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="w-8 h-[3px] bg-[#ffd400] rounded-full" />
                <span className="text-sm font-bold tracking-[0.2em] uppercase text-[#1a2e4a]/60">
                  {t("services.badge")}
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#1a2e4a] leading-tight">
                {t("services.title1")}{" "}
                <span className="relative inline-block">
                  <span className="relative z-10">{t("services.title2")}</span>
                  <span className="absolute bottom-1 left-0 right-0 h-3 bg-[#ffd400]/40 -z-0 rounded-sm" />
                </span>
                <br />
                {t("services.title3")}
              </h2>
            </div>
            <p className="text-base text-[#4b5563] max-w-sm leading-relaxed md:text-right">
              {t("services.subtitle")}
            </p>
          </div>
        </ScrollAnimate>

        {/* Grid de serviços — layout assimétrico */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {services.map((service, i) => (
            <ScrollAnimate key={i} delay={i * 0.08}>
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group relative"
              >
                <div className="relative bg-[#f7f9fc] rounded-2xl p-8 border border-[#1a2e4a]/5 hover:border-[#1a2e4a]/15 transition-all duration-500 overflow-hidden h-full">
                  {/* Barra lateral colorida */}
                  <div
                    className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl transition-all duration-500 group-hover:w-1.5"
                    style={{ backgroundColor: service.accent }}
                  />

                  {/* Glow no hover */}
                  <div
                    className="absolute -top-20 -right-20 w-40 h-40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-3xl"
                    style={{ backgroundColor: service.accent + "15" }}
                  />

                  <div className="relative z-10">
                    {/* Ícone + Título na mesma linha */}
                    <div className="flex items-center gap-4 mb-4">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                        style={{ backgroundColor: service.accent + "15" }}
                      >
                        <service.icon className="h-5 w-5" style={{ color: service.accent }} />
                      </div>
                      <h3 className="text-xl font-black text-[#1a2e4a]">{service.title}</h3>
                    </div>

                    <p className="text-sm text-[#4b5563] leading-relaxed mb-6 ml-16">
                      {service.description}
                    </p>

                    {/* Features como tags inline */}
                    <div className="flex flex-wrap gap-2 mb-6 ml-16">
                      {service.features.map((feature, idx) => (
                        <span
                          key={idx}
                          className="text-xs font-medium px-3 py-1.5 rounded-full bg-white text-[#4b5563] border border-[#1a2e4a]/8"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>

                    {/* CTA */}
                    <div className="ml-16">
                      <a href={service.url} target="_blank" rel="noopener noreferrer">
                        <motion.span
                          whileHover={{ x: 4 }}
                          className="inline-flex items-center gap-1.5 text-sm font-bold transition-colors cursor-pointer"
                          style={{ color: service.accent === "#ffd400" ? "#b39600" : service.accent }}
                        >
                          {t("services.cta")}
                          <ArrowUpRight className="h-4 w-4" />
                        </motion.span>
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </ScrollAnimate>
          ))}
        </div>
      </div>
    </section>
  )
}
