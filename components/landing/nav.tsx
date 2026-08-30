"use client"

import { useEffect, useState } from "react"
import { Menu, X, ArrowUpRight } from "lucide-react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { useTranslation, Language } from "@/lib/i18n"
import { specialistMessage, waLink } from "@/lib/pricing"
import { cn } from "@/lib/utils"

export function LandingNav() {
  const { language, setLanguage } = useTranslation()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const reduce = useReducedMotion()

  const links = [
    { href: "#pacote", label: language === "en" ? "ViraWeb Package" : language === "es" ? "Paquete ViraWeb" : "Pacote ViraWeb" },
    { href: "#simulador", label: language === "en" ? "Simulator" : language === "es" ? "Simulador" : "Simulador" },
    { href: "#sistemas", label: language === "en" ? "Custom Systems" : language === "es" ? "Sistemas a Medida" : "Sistemas Sob Medida" },
    { href: "#cases", label: language === "en" ? "Results & ROI" : language === "es" ? "Resultados y ROI" : "Resultados & ROI" },
    { href: "#faq", label: "FAQ" },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-300 bg-white/95 backdrop-blur-md border-b",
        scrolled ? "border-slate-200 shadow-xs" : "border-slate-100"
      )}
    >
      <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between px-6 lg:px-12">
        {/* Brand Logo */}
        <a href="/" className="flex items-center gap-3 select-none group" title="ViraWeb Home">
          <img
            src="/viraweb3.png"
            alt="ViraWeb"
            className="h-7 w-auto object-contain"
          />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[13px] font-medium tracking-normal text-slate-600 transition-colors hover:text-slate-950"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action Controls & Language Selector */}
        <div className="hidden md:flex items-center gap-5">
          {/* Language Switcher Pill */}
          <div className="flex items-center bg-slate-100 border border-slate-200/60 p-0.5 rounded-full select-none gap-0.5">
            {(["pt", "en", "es"] as const).map((lang) => (
              <button
                key={lang}
                type="button"
                onClick={() => setLanguage(lang)}
                className={cn(
                  "px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider rounded-full transition-all duration-200 cursor-pointer",
                  language === lang
                    ? "bg-[#2563EB] text-white shadow-xs"
                    : "text-slate-500 hover:text-slate-800"
                )}
              >
                {lang}
              </button>
            ))}
          </div>

          <a
            href={waLink(specialistMessage())}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-sm bg-[#2563EB] px-4 py-2 text-[13px] font-medium text-white transition-colors hover:bg-[#1D4ED8] active:scale-[0.99] cursor-pointer"
          >
            <span>{language === "en" ? "Chat on WhatsApp" : language === "es" ? "Hablar en WhatsApp" : "Falar no WhatsApp"}</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>

        {/* Mobile Menu Trigger & Lang */}
        <div className="flex items-center gap-3 md:hidden">
          <div className="flex items-center bg-slate-100 border border-slate-200/60 p-0.5 rounded-full select-none gap-0.5">
            {(["pt", "en", "es"] as const).map((lang) => (
              <button
                key={lang}
                type="button"
                onClick={() => setLanguage(lang)}
                className={cn(
                  "px-2 py-0.5 text-[9px] font-black uppercase rounded-full transition-all duration-200 cursor-pointer",
                  language === lang
                    ? "bg-[#2563EB] text-white shadow-xs"
                    : "text-slate-500 hover:text-slate-800"
                )}
              >
                {lang}
              </button>
            ))}
          </div>

          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center text-slate-900"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-x-0 top-16 z-30 flex flex-col bg-white border-b border-slate-200 px-6 py-8 shadow-xl md:hidden"
            initial={reduce ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            <nav className="flex flex-col gap-4">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-base font-medium text-slate-800 hover:text-blue-600"
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <div className="mt-6 pt-6 border-t border-slate-100">
              <a
                href={waLink(specialistMessage())}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-sm bg-[#2563EB] py-3 text-sm font-medium text-white shadow-xs"
              >
                <span>{language === "en" ? "Talk to a Specialist via WhatsApp" : language === "es" ? "Hablar con Especialista en WhatsApp" : "Falar com Especialista via WhatsApp"}</span>
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
