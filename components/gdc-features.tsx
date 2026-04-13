"use client"

import { m } from "framer-motion"
import ScrollAnimate from "./scroll-animate"
import { Users, FileText, BarChart3, Upload, Bot, UserCog } from "lucide-react"
import { useTranslation } from "@/lib/i18n"

export function GDCFeatures() {
  const { t } = useTranslation()

  const gdcFeatures = [
    {
      icon: Users,
      title: t("gdc.f1.title"),
      description: t("gdc.f1.desc"),
      color: "#3396d3",
    },
    {
      icon: FileText,
      title: t("gdc.f2.title"),
      description: t("gdc.f2.desc"),
      color: "#3396d3",
    },
    {
      icon: BarChart3,
      title: t("gdc.f3.title"),
      description: t("gdc.f3.desc"),
      color: "#3396d3",
    },
    {
      icon: Upload,
      title: t("gdc.f4.title"),
      description: t("gdc.f4.desc"),
      color: "#3396d3",
    },
    {
      icon: Bot,
      title: t("gdc.f5.title"),
      description: t("gdc.f5.desc"),
      color: "#3396d3",
    },
    {
      icon: UserCog,
      title: t("gdc.f6.title"),
      description: t("gdc.f6.desc"),
      color: "#3396d3",
    },
  ]

  return (
    <section id="gdc-features" className="relative bg-[#f7f9fc] overflow-hidden">
      {/* Background decorativo */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: "radial-gradient(#1a2e4a 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />
        {/* Linhas decorativas diagonais */}
        <div
          className="absolute top-0 right-0 w-[400px] h-[400px] opacity-[0.03]"
          style={{
            background: "linear-gradient(135deg, #3396d3 0%, transparent 60%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-[300px] h-[300px] opacity-[0.03]"
          style={{
            background: "linear-gradient(315deg, #ffd400 0%, transparent 60%)",
          }}
        />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        {/* Texto introdutório centralizado */}
        <ScrollAnimate delay={0}>
          <div className="text-center max-w-4xl mx-auto mb-20">
            <div className="inline-flex items-center gap-2 mb-6">
              <span className="w-8 h-[3px] bg-[#ffd400] rounded-full" />
              <span className="text-sm font-bold tracking-[0.2em] uppercase text-[#1a2e4a]/60">
                {t("gdc.features.badge")}
              </span>
              <span className="w-8 h-[3px] bg-[#ffd400] rounded-full" />
            </div>

            <p className="text-base md:text-lg text-[#374151] leading-relaxed">
              {t("gdc.features.desc")}
            </p>
          </div>
        </ScrollAnimate>

        {/* Grid 3x2 de features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {gdcFeatures.map((feature, i) => (
            <ScrollAnimate key={i} delay={i * 0.06}>
              <m.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group h-full"
              >
                <div className="relative bg-white rounded-2xl p-8 border border-[#1a2e4a]/[0.06] hover:border-[#3396d3]/20 transition-all duration-500 h-full flex flex-col hover:shadow-xl hover:shadow-[#3396d3]/[0.04]">
                  {/* Glow sutil no hover */}
                  <div className="absolute -top-16 -right-16 w-32 h-32 rounded-full bg-[#3396d3]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-3xl" />

                  {/* Ícone */}
                  <div className="relative z-10 mb-6">
                    <div className="w-14 h-14 rounded-xl bg-[#e8f4fb] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <feature.icon className="h-6 w-6 text-[#3396d3]" strokeWidth={1.5} />
                    </div>
                  </div>

                  {/* Título */}
                  <h3 className="relative z-10 text-lg font-black text-[#1a2e4a] mb-3">
                    {feature.title}
                  </h3>

                  {/* Descrição */}
                  <p className="relative z-10 text-sm text-[#374151] leading-relaxed flex-1">
                    {feature.description}
                  </p>
                </div>
              </m.div>
            </ScrollAnimate>
          ))}
        </div>
      </div>
    </section>
  )
}
