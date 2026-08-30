"use client"

import { MapPin, Star, Send } from "lucide-react"

export function WebsiteScreen() {
  return (
    <div className="flex h-full flex-col bg-[#07111f] text-[#F4F7FB]">
      <div className="flex items-center gap-1.5 border-b border-white/8 px-3 py-2">
        <span className="h-1.5 w-1.5 rounded-full bg-white/25" />
        <span className="h-1.5 w-1.5 rounded-full bg-white/25" />
        <span className="h-1.5 w-1.5 rounded-full bg-[#FFD400]" />
        <span className="ml-2 truncate font-mono text-[9px] tracking-wide text-white/40">
          clinicaaurora.com.br
        </span>
      </div>
      <div className="relative flex-1 overflow-hidden px-4 py-4">
        <p className="text-[9px] font-medium uppercase tracking-[0.18em] text-[#FFD400]/80">
          Clínica Aurora
        </p>
        <h4 className="mt-1 max-w-[16ch] text-[15px] font-semibold leading-[1.15] tracking-tight">
          Agenda cheia a partir do Google.
        </h4>
        <p className="mt-2 max-w-[28ch] text-[10px] leading-relaxed text-white/55">
          Site rápido, ficha no mapa e WhatsApp respondendo sozinho.
        </p>
        <div className="mt-3 inline-flex rounded-full bg-[#FFD400] px-3 py-1 text-[9px] font-semibold text-[#0a192f]">
          Agendar avaliação
        </div>
        <div className="absolute right-3 bottom-3 h-16 w-24 rounded-lg bg-gradient-to-br from-[#FFD400]/30 to-transparent ring-1 ring-white/10" />
      </div>
    </div>
  )
}

export function GmbScreen() {
  return (
    <div className="flex h-full flex-col bg-[#0d1b33] text-[#F4F7FB]">
      <div className="relative h-[42%] overflow-hidden bg-[#132445]">
        <div className="absolute inset-0 opacity-70">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_50%,rgba(255,212,0,0.28),transparent_42%)]" />
          <div className="absolute left-[12%] top-[30%] h-px w-[70%] bg-white/10" />
          <div className="absolute left-[20%] top-[55%] h-px w-[55%] bg-white/10" />
          <div className="absolute left-[40%] top-[18%] h-[60%] w-px bg-white/10" />
        </div>
        <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
          <MapPin className="h-7 w-7 text-[#FFD400]" strokeWidth={1.4} fill="rgba(255,212,0,0.2)" />
        </div>
      </div>
      <div className="flex flex-1 flex-col px-3 py-2.5">
        <p className="text-[12px] font-semibold tracking-tight">Clínica Aurora</p>
        <div className="mt-1 flex items-center gap-1 text-[10px] text-[#FFD400]">
          <Star className="h-3 w-3 fill-[#FFD400]" strokeWidth={0} />
          <span className="font-semibold">4.9</span>
          <span className="text-white/45">(214 avaliações)</span>
        </div>
        <p className="mt-1 text-[10px] text-white/50">Aberto agora · Centro, Goiânia</p>
        <div className="mt-auto grid grid-cols-3 gap-1 pt-2">
          {["Ligar", "Rotas", "Site"].map((label) => (
            <span
              key={label}
              className="rounded-full bg-white/6 py-1 text-center text-[9px] text-white/70 ring-1 ring-white/8"
            >
              {label}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export function AdsScreen() {
  return (
    <div className="flex h-full flex-col gap-2 bg-[#07111f] p-2.5">
      <div className="rounded-xl bg-white/[0.04] p-2.5 ring-1 ring-white/8">
        <p className="text-[8px] font-medium uppercase tracking-wider text-white/35">Patrocinado</p>
        <p className="mt-1 text-[11px] font-semibold leading-tight text-[#8ab4f8]">
          Clínica Aurora | Avaliação em 24h
        </p>
        <p className="mt-0.5 font-mono text-[9px] text-emerald-400/80">www.clinicaaurora.com.br</p>
        <p className="mt-1 text-[9px] leading-snug text-white/50">
          Apareça no topo quando o cliente pesquisa o seu serviço.
        </p>
      </div>
      <div className="flex flex-1 gap-2 rounded-xl bg-white/[0.04] p-2 ring-1 ring-white/8">
        <div className="h-full w-[38%] rounded-lg bg-gradient-to-b from-[#FFD400]/25 to-[#0a192f]" />
        <div className="flex flex-1 flex-col justify-center">
          <p className="text-[8px] uppercase tracking-wider text-white/35">Meta Ads</p>
          <p className="mt-0.5 text-[11px] font-semibold leading-tight">Sua agenda no automático</p>
          <p className="mt-1 text-[9px] text-white/45">Clique vira conversa no WhatsApp.</p>
        </div>
      </div>
    </div>
  )
}

export function WhatsAppScreen() {
  return (
    <div className="flex h-full flex-col bg-[#0b141a] text-[#e9edef]">
      <div className="flex items-center gap-2 bg-[#1f2c34] px-3 py-2">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#FFD400] text-[9px] font-bold text-[#0a192f]">
          V
        </span>
        <div>
          <p className="text-[11px] font-semibold leading-none">ViraBot</p>
          <p className="mt-0.5 text-[8px] text-emerald-400">online</p>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-1.5 px-2.5 py-2">
        <div className="max-w-[88%] self-start rounded-2xl rounded-tl-sm bg-[#1f2c34] px-2.5 py-1.5 text-[10px] leading-snug">
          Olá! Sou o ViraBot da Clínica Aurora. Quer agendar uma avaliação?
        </div>
        <div className="max-w-[80%] self-end rounded-2xl rounded-tr-sm bg-[#005c4b] px-2.5 py-1.5 text-[10px] leading-snug">
          Sim, amanhã de manhã
        </div>
        <div className="max-w-[88%] self-start rounded-2xl rounded-tl-sm bg-[#1f2c34] px-2.5 py-1.5 text-[10px] leading-snug">
          Perfeito. Separei 9h30 com a Dra. Helena. Confirma?
        </div>
      </div>
      <div className="flex items-center gap-2 bg-[#1f2c34] px-2 py-1.5">
        <span className="flex-1 rounded-full bg-[#0b141a] px-3 py-1 text-[9px] text-white/35">
          Mensagem
        </span>
        <Send className="h-3.5 w-3.5 text-[#FFD400]" strokeWidth={1.5} />
      </div>
    </div>
  )
}
