"use client"

import { useEffect, useState } from "react"
import { Menu, X, ArrowUpRight } from "lucide-react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { specialistMessage, waLink } from "@/lib/pricing"
import { cn } from "@/lib/utils"

const links = [
  { href: "#pacote", label: "Pacote ViraWeb" },
  { href: "#simulador", label: "Simulador" },
  { href: "#sistemas", label: "Sistemas Sob Medida" },
  { href: "#cases", label: "Cases & ROI" },
  { href: "#faq", label: "FAQ" },
]

export function LandingNav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const reduce = useReducedMotion()

  useEffect(() => {
    const sentinel = document.getElementById("nav-sentinel")
    if (!sentinel) return
    const io = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { threshold: 0 }
    )
    io.observe(sentinel)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  return (
    <>
      <div id="nav-sentinel" className="pointer-events-none absolute top-0 h-2 w-full" />
      <header className="fixed inset-x-0 top-0 z-30 flex justify-center px-4 pt-4">
        <div
          className={cn(
            "flex h-16 w-full max-w-[1200px] items-center justify-between gap-4 rounded-full px-4 pl-6 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",
            scrolled
              ? "border border-[#E2E8F0] bg-white/90 shadow-md shadow-slate-900/5 backdrop-blur-xl"
              : "border border-slate-200/80 bg-white/80 backdrop-blur-md shadow-xs"
          )}
        >
          <a href="#hero" className="flex items-center gap-2 select-none group">
            <img
              src="/viraweb3.png"
              alt="ViraWeb Logo"
              className="h-8 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.03]"
            />
          </a>

          <nav className="hidden items-center gap-7 lg:flex">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs font-semibold text-slate-600 transition-colors duration-300 hover:text-[#2563EB]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden lg:block">
            <a
              href={waLink(specialistMessage())}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full bg-[#2563EB] px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-blue-500/20 transition-all duration-300 hover:bg-[#1D4ED8] active:scale-95 cursor-pointer"
            >
              <span>Falar no WhatsApp</span>
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          <button
            type="button"
            className="relative flex h-10 w-10 items-center justify-center rounded-full text-[#0F172A] lg:hidden"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">Menu</span>
            <span className="relative h-4 w-5">
              <span
                className={cn(
                  "absolute left-0 h-0.5 w-5 bg-current transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",
                  open ? "top-1.5 rotate-45" : "top-0.5"
                )}
              />
              <span
                className={cn(
                  "absolute left-0 top-1.5 h-0.5 w-5 bg-current transition-opacity duration-300",
                  open ? "opacity-0" : "opacity-100"
                )}
              />
              <span
                className={cn(
                  "absolute left-0 h-0.5 w-5 bg-current transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",
                  open ? "top-1.5 -rotate-45" : "top-3"
                )}
              />
            </span>
            {open ? <X className="sr-only" /> : <Menu className="sr-only" />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-20 flex flex-col justify-end bg-white/95 px-6 pb-8 pt-24 backdrop-blur-3xl lg:hidden"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <nav className="flex flex-col gap-3">
              {links.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-2xl px-4 py-3.5 text-2xl font-bold tracking-tight text-[#0F172A] hover:text-[#2563EB]"
                  initial={reduce ? false : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>
            <div className="mt-8 px-4">
              <a
                href={waLink(specialistMessage())}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#2563EB] py-4 font-bold text-white shadow-lg shadow-blue-500/20"
              >
                <span>Falar com Especialista via WhatsApp</span>
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
