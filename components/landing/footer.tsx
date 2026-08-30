"use client"

import { useTranslation } from "@/lib/i18n"
import { specialistMessage, waLink } from "@/lib/pricing"

export function LandingFooter() {
  const { language } = useTranslation()

  return (
    <footer className="border-t border-slate-200 bg-white py-14 text-slate-900">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <a href="/" className="flex items-center gap-2 select-none" title="ViraWeb Home">
              <img
                src="/viraweb3.png"
                alt="ViraWeb"
                className="h-7 w-auto object-contain"
              />
            </a>
            <p className="mt-2.5 text-xs text-slate-500 max-w-[42ch] leading-relaxed">
              {language === "en"
                ? "Digital infrastructure, custom software engineering, and sales automation for businesses seeking predictable scale."
                : language === "es"
                ? "Infraestructura digital, ingeniería de software a medida y automatización comercial para empresas que buscan escala predecible."
                : "Infraestrutura digital, desenvolvimento de software sob medida e automação comercial para empresas que buscam escala."}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-x-8 gap-y-3 text-xs font-medium text-slate-600">
            <a href="#pacote" className="hover:text-slate-950 transition-colors">
              {language === "en" ? "ViraWeb Package" : language === "es" ? "Paquete ViraWeb" : "Pacote ViraWeb"}
            </a>
            <a href="#simulador" className="hover:text-slate-950 transition-colors">
              {language === "en" ? "Simulator" : language === "es" ? "Simulador" : "Simulador"}
            </a>
            <a href="#sistemas" className="hover:text-slate-950 transition-colors">
              {language === "en" ? "Custom Systems" : language === "es" ? "Sistemas a Medida" : "Sistemas Sob Medida"}
            </a>
            <a href="#cases" className="hover:text-slate-950 transition-colors">
              {language === "en" ? "Results" : language === "es" ? "Resultados" : "Resultados"}
            </a>
            <a href="#faq" className="hover:text-slate-950 transition-colors">FAQ</a>
            <a
              href={waLink(specialistMessage(language))}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 font-semibold hover:text-blue-800 transition-colors"
            >
              WhatsApp &rarr;
            </a>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <p>&copy; {new Date().getFullYear()} ViraWeb Tecnologias. {language === "en" ? "All rights reserved." : language === "es" ? "Todos los derechos reservados." : "Todos os direitos reservados."}</p>
          <p>Next.js &bull; TypeScript &bull; {language === "en" ? "Native Artificial Intelligence" : language === "es" ? "Inteligencia Artificial Nativa" : "Inteligência Artificial Nativa"}</p>
        </div>
      </div>
    </footer>
  )
}
