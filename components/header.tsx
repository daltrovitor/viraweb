"use client"

import { useState, useEffect } from "react"
import { Menu, X, ArrowUpRight } from "lucide-react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { LanguageSwitcher } from "./language-switcher"
import { useTranslation } from "@/lib/i18n"

export function Header() {
  const { t } = useTranslation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    let lastPos = 0
    const onScroll = () => {
      const current = window.scrollY
      setScrolled(current > 20)
      if (current > 80) {
        setVisible(current < lastPos)
      } else {
        setVisible(true)
      }
      lastPos = current
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const navLinks = [
    { label: t("nav.services"), href: "#servicos" },
    { label: t("nav.gdc"), href: "https://gdc.viraweb.online/", external: true },
    { label: t("nav.contact"), href: "#contato" },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        visible ? "translate-y-0" : "-translate-y-full"
      } ${
        scrolled
          ? "bg-[#0f1923]/95 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/10"
          : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo — viraweb3.png (logo original completa) */}
          <a href="#" className="relative z-10 flex items-center">
            <Image
              src="/viraweb3.png"
              alt="ViraWeb"
              width={1024}
              height={1024}
              className={`h-9 md:h-11 w-auto transition-all duration-300 ${
                scrolled ? "brightness-0 invert" : ""
              }`}
            />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-7">
            {navLinks.map((link) =>
              link.external ? (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-sm font-semibold transition-colors inline-flex items-center gap-1 ${
                    scrolled
                      ? "text-gray-400 hover:text-white"
                      : "text-[#1a2e4a]/70 hover:text-[#1a2e4a]"
                  }`}
                >
                  {link.label}
                  <ArrowUpRight className="h-3 w-3 opacity-50" />
                </a>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  className={`text-sm font-semibold transition-colors ${
                    scrolled
                      ? "text-gray-400 hover:text-white"
                      : "text-[#1a2e4a]/70 hover:text-[#1a2e4a]"
                  }`}
                >
                  {link.label}
                </a>
              )
            )}
            <LanguageSwitcher />

            <a href="https://wa.me/556292466109?text=olá%2C%20gostaria%20de%20fazer%20um%20orçamento!">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="cursor-pointer bg-[#ffd400] text-[#1a2e4a] font-bold text-sm px-5 py-2.5 rounded-lg inline-flex items-center gap-1.5 hover:shadow-lg hover:shadow-[#ffd400]/20 transition-all duration-300"
              >
                {t("nav.button")}
                <ArrowUpRight className="h-3.5 w-3.5" />
              </motion.button>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden p-2 rounded-lg transition-colors ${
              scrolled ? "text-white" : "text-[#1a2e4a]"
            }`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden"
            >
              <div className="py-6 space-y-1 border-t border-white/5">
                {navLinks.map((link) =>
                  link.external ? (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`block py-3 px-4 rounded-lg text-sm font-semibold transition-colors inline-flex items-center gap-1 ${
                        scrolled
                          ? "text-gray-400 hover:text-white hover:bg-white/5"
                          : "text-[#1a2e4a]/70 hover:text-[#1a2e4a] hover:bg-[#1a2e4a]/5"
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.label}
                      <ArrowUpRight className="h-3 w-3 opacity-50" />
                    </a>
                  ) : (
                    <a
                      key={link.label}
                      href={link.href}
                      className={`block py-3 px-4 rounded-lg text-sm font-semibold transition-colors ${
                        scrolled
                          ? "text-gray-400 hover:text-white hover:bg-white/5"
                          : "text-[#1a2e4a]/70 hover:text-[#1a2e4a] hover:bg-[#1a2e4a]/5"
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.label}
                    </a>
                  )
                )}
                <div className="pt-3 px-4 flex flex-col gap-3">
                  <div className="flex justify-between items-center">
                    <span className={`text-xs font-bold uppercase ${scrolled ? "text-gray-500" : "text-[#1a2e4a]/50"}`}>Idioma</span>
                    <LanguageSwitcher />
                  </div>
                  <a href="https://wa.me/556292466109?text=olá%2C%20gostaria%20de%20fazer%20um%20orçamento!">
                    <button className="w-full cursor-pointer bg-[#ffd400] text-[#1a2e4a] font-bold text-sm px-5 py-3 rounded-lg inline-flex items-center justify-center gap-1.5">
                      {t("nav.button")}
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </button>
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}