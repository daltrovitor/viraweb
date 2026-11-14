import type { Metadata } from "next"
import SmoothScroll from "@/components/smooth-scroll"
import { buildMetadata } from "@/lib/seo"
import {
  LandingNav,
  LandingHero,
  LandingPackage,
  LandingSimulator,
  LandingEngineering,
  LandingSocialProof,
  LandingFaq,
  LandingFooter,
  LandingScrollStorytelling,
} from "@/components/landing"

// /pacote and /proposta re-export this metadata, so all three share one canonical.
export const metadata: Metadata = buildMetadata({
  title: "Proposta ViraWeb — Pacote ViraWeb & Sistemas Sob Medida",
  description:
    "Sua Empresa Dominando a Internet: Do Topo do Google ao Atendimento Automático no WhatsApp. Adquira o Pacote ViraWeb completo ou monte um plano sob medida.",
  path: "/propostas",
})

export default function PropostasPage() {
  return (
    <div className="relative min-h-screen bg-white text-slate-900 selection:bg-blue-500/10 selection:text-[#2563EB]">
      <SmoothScroll>
        <LandingScrollStorytelling />
        <LandingNav />
        <main>
          <LandingHero />
          <LandingPackage />
          <LandingSimulator />
          <LandingEngineering />
          <LandingSocialProof />
          <LandingFaq />
        </main>
        <LandingFooter />
      </SmoothScroll>
    </div>
  )
}
