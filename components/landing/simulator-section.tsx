"use client"

import { useState } from "react"
import { Check, Sliders, Sparkles, AlertCircle, ArrowRight, ShieldCheck } from "lucide-react"
import { motion, useReducedMotion } from "framer-motion"
import {
  SERVICES,
  ServiceId,
  PACKAGE_IDS,
  quoteTotals,
  brl,
  waLink,
  planMessage,
} from "@/lib/pricing"
import { cn } from "@/lib/utils"

export function LandingSimulator() {
  const reduce = useReducedMotion()
  const [selected, setSelected] = useState<ServiceId[]>(PACKAGE_IDS)

  const toggleService = (id: ServiceId) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  const selectAll = () => {
    setSelected(PACKAGE_IDS)
  }

  const totals = quoteTotals(selected)

  return (
    <section id="simulador" className="relative isolate overflow-hidden bg-[#F8FAFC] border-b border-[#E2E8F0] px-4 py-20 md:px-8 md:py-28 text-slate-900 select-none">
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
            <Sliders className="h-3.5 w-3.5 text-[#2563EB]" />
            <span>Calculadora em Tempo Real</span>
          </div>
          <h2 className="text-3xl font-black tracking-tight text-[#0F172A] sm:text-4xl md:text-5xl leading-tight">
            Simulador de Plano Personalizado
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600 md:text-lg font-medium">
            Marque ou desmarque os serviços em tempo real para visualizar o valor exato do Setup Único e da Recorrência Mensal.
          </p>
        </motion.div>

        {/* Discount Progress Rule Banner */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 rounded-2xl border border-blue-100 bg-white p-4 text-center text-xs font-semibold text-slate-700 shadow-xs">
          <div className="flex items-center gap-1.5 text-[#2563EB]">
            <Sparkles className="h-4 w-4" />
            <span>Regras de Desconto Progressivo:</span>
          </div>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-700">
            2 a 3 serviços: <strong className="text-[#2563EB]">10% OFF no Setup</strong>
          </span>
          <span className="rounded-full bg-blue-50 px-3 py-1 text-[#2563EB] font-bold border border-blue-200">
            4 serviços (Pacote ViraWeb): <strong>20% OFF no Setup + 15% OFF na Mensalidade</strong>
          </span>
        </div>

        {/* Simulator Grid */}
        <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:items-start">
          {/* Services Selection Column */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Selecione os módulos desejados:
              </span>
              {!totals.fullPackage && (
                <button
                  type="button"
                  onClick={selectAll}
                  className="text-xs font-bold text-[#2563EB] underline-offset-4 hover:underline cursor-pointer"
                >
                  Marcar todos (Liberar 20% OFF Setup + 15% OFF Mensal)
                </button>
              )}
            </div>

            {SERVICES.map((service) => {
              const isChecked = selected.includes(service.id)
              return (
                <div
                  key={service.id}
                  onClick={() => toggleService(service.id)}
                  className={cn(
                    "group relative flex cursor-pointer items-start gap-4 rounded-2xl border p-5 transition-all duration-300 select-none shadow-xs",
                    isChecked
                      ? "border-[#2563EB] bg-white ring-2 ring-[#2563EB]/20 shadow-md"
                      : "border-[#E2E8F0] bg-white/70 hover:border-slate-300 hover:bg-white"
                  )}
                >
                  <div
                    className={cn(
                      "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border transition-all duration-300",
                      isChecked
                        ? "border-[#2563EB] bg-[#2563EB] text-white"
                        : "border-slate-300 bg-transparent text-transparent group-hover:border-slate-400"
                    )}
                  >
                    <Check className="h-4 w-4 stroke-[2.5]" />
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h4 className="text-base font-bold tracking-tight text-[#0F172A]">
                        {service.name}
                      </h4>
                      <div className="flex flex-wrap items-center gap-3 font-mono text-xs font-semibold">
                        <span className="text-slate-500">Setup: <strong className="text-slate-900">{brl(service.setup)}</strong></span>
                        <span className="text-[#2563EB]">Recorrência: <strong>{brl(service.monthly)}/mês</strong></span>
                      </div>
                    </div>
                    <p className="mt-1.5 text-xs leading-relaxed text-slate-500 font-medium">
                      {service.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Real-time Order Summary Card */}
          <div className="sticky top-24 rounded-3xl border border-[#E2E8F0] bg-white p-6 shadow-xl md:p-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="text-lg font-bold tracking-tight text-[#0F172A]">
                Resumo do Seu Plano
              </h3>
              {totals.fullPackage ? (
                <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#2563EB] border border-blue-200">
                  20% OFF Setup + 15% OFF Mensal
                </span>
              ) : totals.discounted ? (
                <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#2563EB] border border-blue-200">
                  10% OFF Setup
                </span>
              ) : null}
            </div>

            {/* Selected Items List */}
            <div className="mt-4 min-h-[100px] space-y-2">
              {totals.items.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-6 text-center text-slate-400">
                  <AlertCircle className="h-8 w-8 stroke-1" />
                  <p className="mt-2 text-xs font-medium">Marque os serviços ao lado para simular o valor final.</p>
                </div>
              ) : (
                totals.items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between text-xs font-semibold text-slate-700">
                    <span>{item.name}</span>
                    <span className="font-mono text-slate-500">{brl(item.setup)} + {brl(item.monthly)}/mês</span>
                  </div>
                ))
              )}
            </div>

            {/* Totals */}
            <div className="mt-6 border-t border-slate-100 pt-5">
              {totals.fullPackage ? (
                <div className="mb-3 rounded-xl bg-emerald-50 p-2.5 text-center text-xs font-bold text-emerald-600 border border-emerald-200">
                  Economia do Pacote Completo: {brl(totals.setupSaved)} no setup + {brl(totals.monthlySaved)}/mês!
                </div>
              ) : totals.discounted ? (
                <div className="mb-3 rounded-xl bg-blue-50 p-2.5 text-center text-xs font-bold text-[#2563EB] border border-blue-200">
                  Desconto de 10% no Setup aplicado! ({brl(totals.setupSaved)} de economia)
                </div>
              ) : null}

              <div className="flex items-center justify-between text-sm text-slate-600 font-medium">
                <span>Setup Único (Taxa única):</span>
                <div className="text-right">
                  {totals.setupSaved > 0 && (
                    <span className="mr-2 text-xs text-slate-400 line-through font-mono">{brl(totals.setupGross)}</span>
                  )}
                  <span className="font-mono text-base font-black text-[#0F172A]">
                    {brl(totals.setup)}
                  </span>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between text-sm text-slate-600 font-medium">
                <span>Recorrência Mensal:</span>
                <div className="text-right">
                  {totals.monthlySaved > 0 && (
                    <span className="mr-2 text-xs text-slate-400 line-through font-mono">{brl(totals.monthlyGross)}/mês</span>
                  )}
                  <span className="font-mono text-lg font-black text-[#2563EB]">
                    {brl(totals.monthly)}<span className="text-xs font-normal text-slate-500">/mês</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Action CTA */}
            <div className="mt-6">
              <a
                href={waLink(planMessage(selected, false))}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-sm px-6 py-4 rounded-xl transition-all shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 cursor-pointer active:scale-95 text-center"
              >
                <span>Contratar Meu Plano Personalizado</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            <p className="mt-3 text-center text-[11px] text-slate-400 font-medium">
              Envio pré-formatado via WhatsApp. Transparência total e suporte técnico ativo.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
