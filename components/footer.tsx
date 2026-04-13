"use client"

import { Mail, Phone, Instagram, Facebook, Linkedin, ArrowUpRight } from "lucide-react"
import Image from "next/image"

import { m } from "framer-motion"
import { useTranslation } from "@/lib/i18n"

export function Footer() {
  const { t } = useTranslation()
  return (
    <footer id="contato" className="relative bg-[#0f1923] overflow-hidden">
      {/* Textura dots sutil */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#3396d3 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Linha amarela no topo */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#ffd400] to-transparent" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        {/* Grid principal */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
          {/* Logo + descrição — ocupa mais espaço */}
          <div className="lg:col-span-4">
            <Image
              src="/viraweb3.png"
              alt="Vira Web"
              width={1024}
              height={1024}
              sizes="150px"
              className="w-36 mb-6"
            />
            <p className="text-sm text-gray-200 leading-relaxed max-w-xs mb-6">
              {t("footer.description")}
            </p>
            {/* Redes sociais */}
            <div className="flex items-center gap-3">
              {[
                { icon: Instagram, href: "#", label: "Instagram" },
                { icon: Facebook, href: "#", label: "Facebook" },
                { icon: Linkedin, href: "#", label: "LinkedIn" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  className="w-9 h-9 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-gray-200 hover:text-[#ffd400] hover:border-[#ffd400]/30 hover:bg-[#ffd400]/5 transition-all duration-300"
                  aria-label={label}
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Serviços */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-bold tracking-[0.15em] uppercase text-white/40 mb-5">{t("footer.services")}</h3>
            <ul className="space-y-3">
              {[
                { label: t("services.creation"), href: "#servicos" },
                { label: t("services.traffic"), href: "#servicos" },
                { label: t("services.assistant"), href: "#servicos" },
                { label: t("services.gmn"), href: "#servicos" },
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors inline-flex items-center gap-1 group"
                  >
                    {item.label}
                    <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Empresa */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-bold tracking-[0.15em] uppercase text-white/40 mb-5">{t("footer.company")}</h3>
            <ul className="space-y-3">
              {[
                { label: "G.D.C.", href: "https://gdc.viraweb.online/" },
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-400 hover:text-white transition-colors inline-flex items-center gap-1 group"
                  >
                    {item.label}
                    <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contato */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-bold tracking-[0.15em] uppercase text-white/40 mb-5">{t("footer.contact")}</h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="mailto:suporte@viraweb.online"
                  className="flex items-center gap-3 text-sm text-gray-400 hover:text-white transition-colors group"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#3396d3]/10 flex items-center justify-center group-hover:bg-[#3396d3]/20 transition-colors">
                    <Mail className="h-3.5 w-3.5 text-[#3396d3]" />
                  </div>
                  suporte@viraweb.online
                </a>
              </li>
              <li>
                <a
                  href="tel:+556299246-6109"
                  className="flex items-center gap-3 text-sm text-gray-400 hover:text-white transition-colors group"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#3396d3]/10 flex items-center justify-center group-hover:bg-[#3396d3]/20 transition-colors">
                    <Phone className="h-3.5 w-3.5 text-[#3396d3]" />
                  </div>
                  (62) 9 9246-6109
                </a>
              </li>
            </ul>

            {/* Mini CTA no footer */}
            <a href="https://wa.me/556292466109?text=olá%2C%20gostaria%20de%20fazer%20um%20orçamento!">
              <m.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="mt-6 cursor-pointer bg-[#ffd400] text-[#1a2e4a] font-bold text-xs px-5 py-3 rounded-lg inline-flex items-center gap-1.5 hover:shadow-lg hover:shadow-[#ffd400]/10 transition-all duration-300"
              >
                {t("footer.cta")}
                <ArrowUpRight className="h-3.5 w-3.5" />
              </m.button>
            </a>
          </div>
        </div>

        {/* Barra inferior */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-300">
            © {new Date().getFullYear()} Vira Web. {t("footer.rights")}
          </p>
          <div className="flex items-center gap-1 text-xs text-gray-300">
            <span>{t("footer.made_with")}</span>
            <span className="text-[#ffd400]">♦</span>
            <span>{t("footer.by")}</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
