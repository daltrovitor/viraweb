"use client"
import React from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function notFound() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-white">
      {/* Background accents */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute left-[10%] top-[20%] h-[300px] w-[300px] rounded-full bg-brand-blue/[0.04] blur-[100px]" />
        <div className="absolute right-[15%] bottom-[20%] h-[250px] w-[250px] rounded-full bg-brand-yellow/[0.04] blur-[100px]" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center justify-center px-6 py-16 text-center">
        {/* Badge */}
        <div className="pill-badge mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
          <span>Página não encontrada</span>
        </div>

        <h1 className="text-[8rem] sm:text-[10rem] font-black tracking-tight text-slate-900 leading-none mb-4">
          404
        </h1>

        <div className="w-16 h-[3px] bg-gradient-to-r from-brand-blue to-brand-yellow rounded-full mb-6" />

        <p className="mx-auto max-w-lg text-xl font-bold text-slate-800 leading-tight">
          Ops! Parece que você se perdeu no caminho.
        </p>

        <p className="mx-auto mt-3 max-w-md text-sm text-slate-500">
          Esta página não está disponível ou foi movida.
          Vamos voltar para o início?
        </p>

        <Link
          href="/"
          className="mt-10 inline-flex items-center gap-2 bg-slate-900 text-white font-bold px-8 py-4 rounded-full hover:bg-slate-800 transition-all duration-200 hover:shadow-lg active:scale-[0.98]"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar ao Início
        </Link>
      </div>
    </section>
  )
}
