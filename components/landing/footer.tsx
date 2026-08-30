"use client"

import { specialistMessage, waLink } from "@/lib/pricing"

export function LandingFooter() {
  return (
    <footer className="border-t border-[#E2E8F0] bg-white px-4 py-12 text-slate-900 md:px-8 select-none">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left">
        <div>
          <a href="#hero" className="flex items-center gap-2 group justify-center sm:justify-start">
            <img
              src="/viraweb3.png"
              alt="ViraWeb Logo"
              className="h-8 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.03]"
            />
          </a>
          <p className="mt-2 text-xs text-slate-500 font-medium">
            Sua empresa dominando a internet. Do topo do Google ao WhatsApp automático.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-semibold text-slate-600">
          <a href="#pacote" className="transition-colors hover:text-[#2563EB]">Pacote ViraWeb</a>
          <a href="#simulador" className="transition-colors hover:text-[#2563EB]">Simulador</a>
          <a href="#sistemas" className="transition-colors hover:text-[#2563EB]">Sistemas Sob Medida</a>
          <a href="#cases" className="transition-colors hover:text-[#2563EB]">Cases & ROI</a>
          <a href="#faq" className="transition-colors hover:text-[#2563EB]">FAQ</a>
          <a href={waLink(specialistMessage())} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-[#2563EB]">WhatsApp</a>
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-[1200px] border-t border-[#E2E8F0] pt-6 text-center text-xs text-slate-400 font-medium">
        © {new Date().getFullYear()} ViraWeb. Todos os direitos reservados.
      </div>
    </footer>
  )
}
