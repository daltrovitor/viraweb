"use client"

import { Check, Sparkles, Globe, MapPin, Target, Bot, ArrowRight } from "lucide-react"
import { motion, useReducedMotion } from "framer-motion"
import { SERVICES, PACKAGE_IDS, quoteTotals, brl, waLink, packageMessage } from "@/lib/pricing"

const deliverables = [
  {
    id: "website",
    title: "1. Landing Page / Website Ultra-Rápido",
    tag: "Next.js + Tailwind",
    desc: "Site institucional ou landing page moderna de alta conversão, 100% responsiva, SEO técnico e carregamento instantâneo.",
    icon: Globe,
  },
  {
    id: "gmn",
    title: "2. Otimização & Domínio do Google Meu Negócio",
    tag: "SEO Local & Mapa",
    desc: "Configuração completa da ficha, catálogo de produtos/serviços, estratégia de avaliações 5 estrelas e topo das pesquisas locais.",
    icon: MapPin,
  },
  {
    id: "ads",
    title: "3. Gestão de Tráfego Pago",
    tag: "Google Ads & Meta Ads",
    desc: "Criação de campanhas, criativos de anúncios, direcionamento para públicos qualificados e otimização contínua de ROI.",
    icon: Target,
  },
  {
    id: "virabot",
    title: "4. ViraBot WhatsApp",
    tag: "Atendimento & Agendamento 24/7",
    desc: "Chatbot de IA inteligente ativo no seu WhatsApp para triagem, tira-dúvidas de clientes e agendamento de atendimentos.",
    icon: Bot,
  },
]

export function LandingPackage() {
  const reduce = useReducedMotion()
  const totals = quoteTotals(PACKAGE_IDS)

  return (
    <section id="pacote" className="relative isolate overflow-hidden bg-white border-b border-[#E2E8F0] px-4 py-20 md:px-8 md:py-28 text-slate-900 select-none">
      {/* Blueprint grid lines overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-[25%] left-0 w-full h-[1px] bg-[#E2E8F0]" />
        <div className="absolute top-[75%] left-0 w-full h-[1px] bg-[#E2E8F0]" />
        <div className="absolute left-[25%] top-0 h-full w-[1px] bg-[#E2E8F0]" />
        <div className="absolute left-[75%] top-0 h-full w-[1px] bg-[#E2E8F0]" />
      </div>

      <div className="mx-auto max-w-[1200px] relative z-10">
        {/* Section Header */}
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-xs font-bold text-[#2563EB] mb-3">
            <Sparkles className="h-3.5 w-3.5 text-[#2563EB]" />
            <span>Solução Turn-Key Pré-Configurada</span>
          </div>
          <h2 className="text-3xl font-black tracking-tight text-[#0F172A] sm:text-4xl md:text-5xl leading-tight">
            Pacote ViraWeb <span className="block text-[#2563EB] text-2xl sm:text-3xl font-bold mt-1">(Atraia, Posicione e Converta no Automático)</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#475569] md:text-lg font-medium">
            A solução completa para PMEs que querem acelerar rápido com infraestrutura digital de ponta a ponta.
          </p>
        </motion.div>

        {/* Deliverables Grid */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {deliverables.map((item, index) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.id}
                className="group relative flex flex-col justify-between rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-6 shadow-xs transition-all duration-300 hover:shadow-xl hover:border-blue-300 hover:bg-white"
                initial={reduce ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <div>
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 border border-blue-100 text-[#2563EB] transition-transform duration-300 group-hover:scale-110">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-base font-bold tracking-tight text-[#0F172A]">
                    {item.title}
                  </h3>
                  <span className="mt-2 inline-block rounded-full bg-blue-100/70 px-2.5 py-0.5 text-[10px] font-bold text-[#2563EB]">
                    {item.tag}
                  </span>
                  <p className="mt-3 text-xs leading-relaxed text-slate-500 font-medium">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Pricing Summary Box */}
        <motion.div
          className="relative mt-12 overflow-hidden rounded-3xl border border-blue-200 bg-gradient-to-br from-blue-50/60 via-white to-slate-50 p-8 shadow-xl md:p-10"
          initial={reduce ? false : { opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex flex-col items-center justify-between gap-8 lg:flex-row">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-[#2563EB] px-3.5 py-1 text-xs font-bold text-white shadow-sm">
                Economia Especial de Pacote Fechado
              </div>
              <h3 className="mt-3 text-2xl font-bold tracking-tight text-[#0F172A] sm:text-3xl">
                Economize contratando o Pacote ViraWeb completo
              </h3>
              <p className="mt-2 text-sm text-slate-600 font-medium">
                Garantimos <strong className="text-[#2563EB]">20% de desconto no Setup</strong> + <strong className="text-[#2563EB]">15% na mensalidade</strong> ao contratar a solução unificada.
              </p>
              <ul className="mt-5 grid gap-2.5 sm:grid-cols-2 text-xs font-semibold text-slate-700">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-[#2563EB]" />
                  <span>Site de Alta Conversão em Next.js</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-[#2563EB]" />
                  <span>Domínio no topo do Google Meu Negócio</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-[#2563EB]" />
                  <span>Gestão contínua de Google Ads & Meta Ads</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-[#2563EB]" />
                  <span>ViraBot rodando no WhatsApp 24h por dia</span>
                </li>
              </ul>
            </div>

            <div className="flex w-full flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-6 text-center lg:w-auto lg:min-w-[340px] shadow-md">
              <div className="text-xs text-slate-500 font-semibold uppercase">Setup Único com 20% OFF</div>
              <div className="mt-1 flex items-baseline justify-center gap-2">
                <span className="text-sm font-medium text-slate-400 line-through">{brl(totals.setupGross)}</span>
                <span className="text-2xl font-black font-mono text-[#0F172A]">{brl(totals.setup)}</span>
              </div>

              <div className="mt-4 text-xs text-slate-500 font-semibold uppercase">Mensalidade Unificada com 15% OFF</div>
              <div className="mt-1 flex items-baseline justify-center gap-2">
                <span className="text-sm font-medium text-slate-400 line-through">{brl(totals.monthlyGross)}/mês</span>
                <span className="text-3xl font-black font-mono text-[#2563EB]">{brl(totals.monthly)}<span className="text-xs font-medium text-slate-500">/mês</span></span>
              </div>

              <div className="mt-3 rounded-full bg-emerald-50 px-3 py-1 text-center text-xs font-bold text-emerald-600 border border-emerald-200">
                Você economiza {brl(totals.setupSaved)} no setup + {brl(totals.monthlySaved)}/mês!
              </div>

              <div className="mt-6 w-full">
                <a
                  href={waLink(packageMessage())}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-sm px-6 py-4 rounded-xl transition-all shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 cursor-pointer active:scale-95 text-center"
                >
                  <span>Garantir Pacote Completo no WhatsApp</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
