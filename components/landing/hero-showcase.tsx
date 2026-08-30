"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Globe, MapPin, Target, Bot, Star, Zap, CheckCircle2, ArrowUpRight, MessageCircle, TrendingUp, Sparkles, Send } from "lucide-react"
import { cn } from "@/lib/utils"

const tabs = [
  { id: "website", label: "Website Ultra-Rápido", icon: Globe, badge: "0.4s load" },
  { id: "gmn", label: "Google Meu Negócio", icon: MapPin, badge: "1º no Mapa" },
  { id: "ads", label: "Tráfego Pago", icon: Target, badge: "+320% Leads" },
  { id: "virabot", label: "ViraBot WhatsApp", icon: Bot, badge: "Ativo 24/7" },
]

export function HeroShowcase() {
  const [activeTab, setActiveTab] = useState<string>("website")

  // Auto cycle tabs if user doesn't interact, but allow instant click
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTab((curr) => {
        const idx = tabs.findIndex((t) => t.id === curr)
        return tabs[(idx + 1) % tabs.length].id
      })
    }, 4500)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative w-full max-w-[620px] mx-auto select-none">
      {/* Outer Glow */}
      <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-blue-500/20 via-cyan-400/15 to-blue-600/20 blur-xl opacity-75" />

      {/* Main Glassmorphic Window Container */}
      <div className="relative rounded-2xl border border-slate-200/80 bg-white/95 shadow-[0_20px_50px_rgba(15,23,42,0.08)] backdrop-blur-2xl overflow-hidden">
        {/* Browser Top Window Bar */}
        <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/80 px-4 py-3">
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full bg-rose-400/80" />
            <span className="h-3 w-3 rounded-full bg-amber-400/80" />
            <span className="h-3 w-3 rounded-full bg-emerald-400/80" />
          </div>

          <div className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3.5 py-1 text-[11px] font-mono font-medium text-slate-500 shadow-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>viraweb.online/sua-empresa</span>
          </div>

          <div className="flex items-center gap-1 text-[10px] font-bold text-blue-600 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-md">
            <Sparkles className="h-3 w-3" />
            <span className="hidden sm:inline">AO VIVO</span>
          </div>
        </div>

        {/* Pillar Switcher Navigation Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 p-2 bg-slate-100/60 border-b border-slate-100">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex flex-col items-center gap-1 rounded-xl p-2 text-center transition-all duration-200 cursor-pointer",
                  isActive
                    ? "bg-white text-blue-600 shadow-xs font-bold ring-1 ring-slate-200/80"
                    : "text-slate-500 hover:text-slate-900 hover:bg-white/50 font-medium"
                )}
              >
                <div className="flex items-center gap-1.5">
                  <Icon className={cn("h-3.5 w-3.5", isActive ? "text-blue-600" : "text-slate-400")} />
                  <span className="text-[11px] truncate max-w-[90px]">{tab.label}</span>
                </div>
                <span
                  className={cn(
                    "text-[9px] font-mono px-1.5 py-0.2 rounded-full",
                    isActive ? "bg-blue-50 text-blue-700 font-bold" : "text-slate-400"
                  )}
                >
                  {tab.badge}
                </span>
              </button>
            )
          })}
        </div>

        {/* Tab Content Display Area */}
        <div className="p-5 sm:p-6 min-h-[310px] flex flex-col justify-between">
          <AnimatePresence mode="wait">
            {activeTab === "website" && (
              <motion.div
                key="website"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-full">
                      Pilar 01 • Website Next.js
                    </span>
                    <h4 className="text-lg font-black text-slate-900 mt-1.5">
                      Sua Marca Com Autoridade Máxima
                    </h4>
                  </div>
                  <div className="flex items-center gap-1 rounded-lg bg-emerald-50 border border-emerald-200 px-2.5 py-1 text-xs font-bold text-emerald-700">
                    <Zap className="h-3.5 w-3.5 fill-emerald-500 text-emerald-500" />
                    <span>100/100 PageSpeed</span>
                  </div>
                </div>

                <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-4 space-y-2.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-700">Velocidade de Carregamento</span>
                    <span className="font-mono font-bold text-blue-600">0.4 segundos (Ultra-rápido)</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-slate-200 overflow-hidden">
                    <div className="h-full w-[98%] rounded-full bg-gradient-to-r from-blue-500 to-cyan-500" />
                  </div>
                  <div className="flex items-center gap-4 pt-1 text-[11px] text-slate-500 font-medium">
                    <span className="flex items-center gap-1"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" /> SEO Otimizado</span>
                    <span className="flex items-center gap-1"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" /> 100% Responsivo</span>
                    <span className="flex items-center gap-1"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" /> Código Próprio</span>
                  </div>
                </div>

                <div className="flex items-center justify-between rounded-xl bg-blue-600 p-3 text-white">
                  <div className="text-xs font-medium">
                    <p className="font-bold">Agendamento & Conversão Ativa</p>
                    <p className="text-blue-100 text-[11px]">Visitantes viram mensagens diretas no WhatsApp</p>
                  </div>
                  <div className="rounded-lg bg-white/20 px-3 py-1.5 text-xs font-bold backdrop-blur-xs flex items-center gap-1">
                    <span>Ver Demonstração</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "gmn" && (
              <motion.div
                key="gmn"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-full">
                      Pilar 02 • Google Meu Negócio
                    </span>
                    <h4 className="text-lg font-black text-slate-900 mt-1.5">
                      Top 1 nas Buscas Locais e no Maps
                    </h4>
                  </div>
                  <div className="flex items-center gap-1 rounded-lg bg-amber-50 border border-amber-200 px-2.5 py-1 text-xs font-bold text-amber-800">
                    <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    <span>4.9 (214 avaliações)</span>
                  </div>
                </div>

                <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-bold text-slate-900">Sua Empresa no Google Maps</p>
                      <p className="text-xs text-slate-500">Aberto agora • Atendimento Imediato</p>
                    </div>
                    <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                      Verificado & Otimizado
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 pt-1">
                    <div className="rounded-lg bg-white border border-slate-200 p-2 text-center shadow-xs">
                      <p className="text-[10px] text-slate-500 font-medium">Visualizações</p>
                      <p className="text-sm font-bold text-blue-600">+480%</p>
                    </div>
                    <div className="rounded-lg bg-white border border-slate-200 p-2 text-center shadow-xs">
                      <p className="text-[10px] text-slate-500 font-medium">Rotas Pedidas</p>
                      <p className="text-sm font-bold text-slate-900">1.250/mês</p>
                    </div>
                    <div className="rounded-lg bg-white border border-slate-200 p-2 text-center shadow-xs">
                      <p className="text-[10px] text-slate-500 font-medium">Chamadas</p>
                      <p className="text-sm font-bold text-emerald-600">Direto no Zap</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                  <CheckCircle2 className="h-4 w-4 text-blue-600 shrink-0" />
                  <span>Configuração de fotos profissionais, catálogo de produtos e palavras-chave.</span>
                </div>
              </motion.div>
            )}

            {activeTab === "ads" && (
              <motion.div
                key="ads"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-full">
                      Pilar 03 • Tráfego Pago de Elite
                    </span>
                    <h4 className="text-lg font-black text-slate-900 mt-1.5">
                      Google Ads & Meta Ads Contínuos
                    </h4>
                  </div>
                  <div className="flex items-center gap-1 rounded-lg bg-blue-50 border border-blue-200 px-2.5 py-1 text-xs font-bold text-blue-700">
                    <TrendingUp className="h-3.5 w-3.5" />
                    <span>ROI Otimizado</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3.5 space-y-1">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Google Ads (Pesquisa)</p>
                    <p className="text-sm font-bold text-slate-900">Apareça no topo exato</p>
                    <p className="text-[11px] text-slate-500">Quando o cliente busca pelo seu serviço na sua cidade.</p>
                  </div>
                  <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3.5 space-y-1">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Meta Ads (Instagram)</p>
                    <p className="text-sm font-bold text-slate-900">Anúncios de Alta Conversão</p>
                    <p className="text-[11px] text-slate-500">Clique do anúncio abre direto uma conversa no WhatsApp.</p>
                  </div>
                </div>

                <div className="rounded-xl border border-emerald-100 bg-emerald-50/60 p-3 flex items-center justify-between text-xs text-emerald-800 font-semibold">
                  <span>Gestão diária de lances, criativos e segmentação cirúrgica.</span>
                  <span className="font-mono font-bold text-emerald-600">+300% ROI</span>
                </div>
              </motion.div>
            )}

            {activeTab === "virabot" && (
              <motion.div
                key="virabot"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="space-y-3.5"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-full">
                      Pilar 04 • ViraBot WhatsApp
                    </span>
                    <h4 className="text-lg font-black text-slate-900 mt-1">
                      Atendimento & Agendamento 24 Horas
                    </h4>
                  </div>
                  <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-bold text-emerald-800 flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
                    Online 24/7
                  </span>
                </div>

                {/* Simulated WhatsApp Chat Bubble */}
                <div className="rounded-xl border border-slate-200 bg-[#EFEAE2] p-3 space-y-2">
                  <div className="flex items-start gap-2 max-w-[85%]">
                    <div className="rounded-xl rounded-tl-none bg-white p-2.5 text-xs text-slate-800 shadow-xs leading-relaxed">
                      Olá! Gostaria de saber valores e agendar uma avaliação.
                    </div>
                  </div>

                  <div className="flex items-start justify-end gap-2">
                    <div className="rounded-xl rounded-tr-none bg-[#D9FDD3] p-2.5 text-xs text-slate-800 shadow-xs leading-relaxed max-w-[88%]">
                      <p className="font-bold text-emerald-900 text-[11px] mb-0.5">🤖 ViraBot</p>
                      Olá! Seja bem-vindo. Separei o horário das <strong>14h30</strong> para você. Confirma o agendamento?
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500 font-medium pt-1">
                  <span>Zero leads perdidos por demora no atendimento.</span>
                  <span className="font-bold text-blue-600">Resposta em &lt; 3 seg</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Quick Real-Time Metrics Footer */}
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-500">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              <span>Infraestrutura Completa Turn-Key</span>
            </div>
            <div className="font-bold text-[#2563EB]">
              Economia de 25% no Pacote
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
