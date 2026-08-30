"use client"

import { useState } from "react"
import { Check, AlertCircle, ArrowRight } from "lucide-react"
import { useTranslation } from "@/lib/i18n"
import {
  getServices,
  ServiceId,
  PACKAGE_IDS,
  quoteTotals,
  waLink,
  planMessage,
} from "@/lib/pricing"
import { cn } from "@/lib/utils"

export function LandingSimulator() {
  const { language } = useTranslation()
  const [selected, setSelected] = useState<ServiceId[]>(PACKAGE_IDS)

  const toggleService = (id: ServiceId) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  const selectAll = () => {
    setSelected(PACKAGE_IDS)
  }

  const services = getServices(language)
  const totals = quoteTotals(selected, language)

  return (
    <section id="simulador" className="relative bg-slate-50/70 border-b border-slate-200 py-20 lg:py-28 text-slate-900">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-12">
        {/* Section Header */}
        <div className="max-w-3xl">
          <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-blue-600 mb-3">
            {language === "en" ? "SCOPE & INVESTMENT CALCULATOR" : language === "es" ? "CALCULADORA DE ALCANCE E INVERSIÓN" : "CALCULADORA DE ESCOPO"}
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-950">
            {language === "en" ? "Custom Plan Simulator" : language === "es" ? "Simulador de Plan Personalizado" : "Simulador de Plano Personalizado"}
          </h2>
          <p className="mt-4 text-base text-slate-600 leading-relaxed font-normal">
            {language === "en"
              ? "Select the necessary modules for your company. Setup and monthly recurring costs are calculated in real time with progressive discounts."
              : language === "es"
              ? "Seleccione los módulos requeridos para su empresa. Los valores de Setup y Recurrencia mensual se calculan en tiempo real."
              : "Selecione os módulos necessários para a operação da sua empresa. Os valores de Setup e Recorrência são calculados em tempo real."}
          </p>
        </div>

        {/* Discount Rules Notice */}
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 border-l-2 border-blue-600 bg-white py-3 px-4 text-xs text-slate-600">
          <span className="font-semibold text-slate-900">
            {language === "en" ? "Progressive discount policy:" : language === "es" ? "Política de descuento progresivo:" : "Regras de desconto progressivo:"}
          </span>
          <span>&bull; {language === "en" ? "2 to 3 services:" : language === "es" ? "2 a 3 servicios:" : "2 a 3 serviços:"} <strong className="font-semibold text-slate-900">{language === "en" ? "10% off on Setup" : language === "es" ? "10% de descuento en Setup" : "10% de desconto no Setup"}</strong></span>
          <span>&bull; {language === "en" ? "4 services (Full Package):" : language === "es" ? "4 servicios (Paquete Completo):" : "4 serviços (Pacote Completo):"} <strong className="font-semibold text-blue-600">{language === "en" ? "20% on Setup + 15% Monthly" : language === "es" ? "20% en Setup + 15% Mensual" : "20% no Setup + 15% na Mensalidade"}</strong></span>
        </div>

        {/* Simulator Grid */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Services Selection Column */}
          <div className="lg:col-span-7 flex flex-col gap-3">
            <div className="flex items-center justify-between pb-1">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-500">
                {language === "en" ? `Available modules (${selected.length}/${services.length})` : language === "es" ? `Módulos disponibles (${selected.length}/${services.length})` : `Módulos disponíveis (${selected.length}/${services.length})`}
              </span>
              {!totals.fullPackage && (
                <button
                  type="button"
                  onClick={selectAll}
                  className="text-xs font-semibold text-blue-600 hover:text-blue-800 cursor-pointer"
                >
                  {language === "en" ? "Select all (Unlock 20% + 15% OFF)" : language === "es" ? "Seleccionar todos (Liberar 20% + 15% OFF)" : "Selecionar todos (Liberar 20% + 15% OFF)"}
                </button>
              )}
            </div>

            {services.map((service) => {
              const isChecked = selected.includes(service.id)
              return (
                <div
                  key={service.id}
                  onClick={() => toggleService(service.id)}
                  className={cn(
                    "group relative flex cursor-pointer items-start gap-4 border p-5 rounded-sm transition-all select-none",
                    isChecked
                      ? "border-slate-900 bg-white shadow-xs"
                      : "border-slate-200 bg-white/70 hover:border-slate-400"
                  )}
                >
                  <div
                    className={cn(
                      "mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-xs border transition-colors",
                      isChecked
                        ? "border-slate-900 bg-slate-900 text-white"
                        : "border-slate-300 bg-white text-transparent group-hover:border-slate-400"
                    )}
                  >
                    <Check className="h-3 w-3 stroke-[3]" />
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="text-sm font-bold text-slate-950">
                        {service.name}
                      </h3>
                      <div className="flex items-baseline gap-3 font-mono text-xs">
                        <span className="text-slate-500">Setup: <strong className="font-semibold text-slate-900">{service.setupFormatted}</strong></span>
                        <span className="text-slate-400">|</span>
                        <span className="text-slate-700">{language === "en" ? "Monthly:" : language === "es" ? "Mensual:" : "Mensal:"} <strong className="font-semibold text-slate-900">{service.monthlyFormatted}{language === "en" ? "/mo" : language === "es" ? "/mes" : "/mês"}</strong></span>
                      </div>
                    </div>
                    <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Real-time Order Summary Column */}
          <div className="lg:col-span-5 sticky top-24 border border-slate-200 bg-white p-6 sm:p-7 rounded-sm shadow-xs">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <h3 className="text-sm font-mono font-semibold uppercase tracking-wider text-slate-900">
                {language === "en" ? "Proposal Summary" : language === "es" ? "Resumen de la Propuesta" : "Resumo da Proposta"}
              </h3>
              {totals.fullPackage ? (
                <span className="text-[11px] font-mono font-semibold text-blue-700">
                  20% + 15% OFF ACTIVE
                </span>
              ) : totals.discounted ? (
                <span className="text-[11px] font-mono font-semibold text-blue-700">
                  10% OFF SETUP
                </span>
              ) : null}
            </div>

            {/* Selected Items List */}
            <div className="mt-4 min-h-[90px] divide-y divide-slate-100">
              {totals.items.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-6 text-center text-slate-400">
                  <AlertCircle className="h-6 w-6 stroke-1 mb-1.5" />
                  <p className="text-xs">
                    {language === "en"
                      ? "Select at least one module to compute the proposal."
                      : language === "es"
                      ? "Seleccione al menos un módulo para calcular la propuesta."
                      : "Selecione ao menos um serviço para calcular a proposta."}
                  </p>
                </div>
              ) : (
                totals.items.map((item) => (
                  <div key={item.id} className="py-2.5 first:pt-0 last:pb-0 flex items-center justify-between text-xs">
                    <span className="text-slate-700 font-medium truncate max-w-[200px]">{item.name}</span>
                    <span className="font-mono text-slate-500 shrink-0">{item.setupFormatted} + {item.monthlyFormatted}{language === "en" ? "/m" : language === "es" ? "/m" : "/m"}</span>
                  </div>
                ))
              )}
            </div>

            {/* Financial Totals */}
            <div className="mt-6 border-t border-slate-200 pt-5 space-y-3">
              {totals.discounted && (
                <div className="bg-slate-50 border border-slate-200 p-2.5 text-xs text-slate-700">
                  {totals.fullPackage ? (
                    <span>
                      {language === "en" ? (
                        <>Package discount applied: <strong className="font-semibold text-blue-700">{totals.setupSavedFormatted}</strong> on setup and <strong className="font-semibold text-blue-700">{totals.monthlySavedFormatted}/mo</strong>.</>
                      ) : language === "es" ? (
                        <>Descuento de paquete aplicado: <strong className="font-semibold text-blue-700">{totals.setupSavedFormatted}</strong> en setup y <strong className="font-semibold text-blue-700">{totals.monthlySavedFormatted}/mes</strong>.</>
                      ) : (
                        <>Desconto de pacote aplicado: <strong className="font-semibold text-blue-700">{totals.setupSavedFormatted}</strong> no setup e <strong className="font-semibold text-blue-700">{totals.monthlySavedFormatted}/mês</strong>.</>
                      )}
                    </span>
                  ) : (
                    <span>
                      {language === "en" ? (
                        <>10% Setup discount applied: <strong className="font-semibold text-slate-900">{totals.setupSavedFormatted} savings</strong>.</>
                      ) : language === "es" ? (
                        <>10% de descuento en Setup aplicado: <strong className="font-semibold text-slate-900">{totals.setupSavedFormatted} de ahorro</strong>.</>
                      ) : (
                        <>Desconto de 10% aplicado no Setup: <strong className="font-semibold text-slate-900">{totals.setupSavedFormatted} de economia</strong>.</>
                      )}
                    </span>
                  )}
                </div>
              )}

              <div className="flex items-baseline justify-between text-xs text-slate-600">
                <span>{language === "en" ? "One-time Setup (Implementation Fee):" : language === "es" ? "Setup Único (Tasa de Implementación):" : "Setup Único (Taxa de Implementação):"}</span>
                <div className="text-right font-mono">
                  {totals.setupSaved > 0 && (
                    <span className="mr-2 text-xs text-slate-400 line-through">{totals.setupGrossFormatted}</span>
                  )}
                  <span className="text-base font-bold text-slate-950">
                    {totals.setupFormatted}
                  </span>
                </div>
              </div>

              <div className="flex items-baseline justify-between text-xs text-slate-600 border-t border-slate-100 pt-2.5">
                <span>{language === "en" ? "Monthly Recurrence (Hosting & Support):" : language === "es" ? "Mensualidad Recurrente (Hosting y Soporte):" : "Recorrência Mensal (Hospedagem & Gestão):"}</span>
                <div className="text-right font-mono">
                  {totals.monthlySaved > 0 && (
                    <span className="mr-2 text-xs text-slate-400 line-through">{totals.monthlyGrossFormatted}{language === "en" ? "/mo" : language === "es" ? "/mes" : "/mês"}</span>
                  )}
                  <span className="text-lg font-bold text-blue-600">
                    {totals.monthlyFormatted}<span className="text-xs text-slate-500 font-normal">{language === "en" ? "/mo" : language === "es" ? "/mes" : "/mês"}</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Action CTA */}
            <div className="mt-6">
              <a
                href={waLink(planMessage(selected, false, language))}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 rounded-sm bg-[#2563EB] px-5 py-3.5 text-sm font-medium text-white transition-colors hover:bg-[#1D4ED8] cursor-pointer text-center"
              >
                <span>{language === "en" ? "Contract My Custom Plan" : language === "es" ? "Contratar Mi Plan Personalizado" : "Contratar Meu Plano Personalizado"}</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            <p className="mt-3 text-center text-[11px] text-slate-500 font-normal">
              {language === "en"
                ? "The proposal above will be sent pre-formatted to our technical WhatsApp."
                : language === "es"
                ? "La propuesta será enviada preformateada a nuestro WhatsApp técnico."
                : "A proposta acima será enviada pré-formatada para o nosso WhatsApp técnico."}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
