"use client"

import { useTranslation } from "@/lib/i18n"
import { ArrowRight, Check } from "lucide-react"

export default function HomePackageSpotlight() {
  const { t } = useTranslation()

  return (
    <section className="relative bg-[#F8FAFC] border-b border-slate-200 py-16 lg:py-20 text-slate-900">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-12">
        <div className="border border-slate-200 bg-white p-8 lg:p-12 rounded-sm shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-blue-600">
                {t("home.package.badge")}
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-950 mt-2">
                {t("home.package.title")}
              </h2>
              <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed max-w-[56ch]">
                {t("home.package.subtitle")}
              </p>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-medium text-slate-700">
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-blue-600 shrink-0" />
                  <span>Website Next.js + SEO Nativo</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-blue-600 shrink-0" />
                  <span>Google Meu Negócio & Maps</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-blue-600 shrink-0" />
                  <span>Google Ads & Meta Ads</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-blue-600 shrink-0" />
                  <span>ViraBot WhatsApp 24/7</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-center">
              <a
                href="/propostas"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-sm bg-[#2563EB] px-6 py-4 text-sm font-medium text-white transition-colors hover:bg-[#1D4ED8] cursor-pointer shadow-sm text-center"
              >
                <span>{t("home.package.cta")}</span>
                <ArrowRight className="h-4 w-4" />
              </a>
              <span className="mt-2.5 text-[11px] text-slate-500 text-center lg:text-right">
                Simulador em tempo real com desconto progressivo
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
