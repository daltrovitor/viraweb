"use client"

import { useState, useEffect } from "react"
import { Menu, X, ArrowUpRight } from "lucide-react"
import Image from "next/image"
import { LanguageSwitcher } from "./language-switcher"
import { useTranslation } from "@/lib/i18n"
import dynamic from "next/dynamic"

const MobileMenu = dynamic(() => import("./mobile-menu").then(mod => mod.MobileMenu), {
  ssr: false
})

export function Header() {
  const { t } = useTranslation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    let lastPos = 0
    const onScroll = () => {
      const current = window.scrollY
      
      // Update scrolled state only if it changes
      const shouldBeScrolled = current > 20
      setScrolled(prev => prev !== shouldBeScrolled ? shouldBeScrolled : prev)

      // Update visibility only if it changes
      if (current > 80) {
        const isUp = current < lastPos
        setVisible(prev => prev !== isUp ? isUp : prev)
      } else {
        setVisible(prev => !prev ? true : prev)
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
      className={`fixed top-0 left-0 right-0 z-50 ${
        visible ? "translate-y-0" : "-translate-y-full"
      } ${
        scrolled || mobileMenuOpen
          ? "bg-[#0f1923]/98 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/10"
          : "bg-transparent transition-colors duration-500"
      }`}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo — viraweb3.png (logo original completa) */}
          <a href="#" className="relative z-10 flex items-center">
            <Image
              src="/viraweb3.png"
              alt="ViraWeb"
              width={180}
              height={50}
              priority
              fetchPriority="high"
              sizes="(max-width: 768px) 120px, 180px"
              className={`h-7 md:h-9 w-auto object-contain ${
                scrolled || mobileMenuOpen ? "brightness-0 invert" : ""
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
                      ? "text-gray-300 hover:text-white"
                      : "text-[#1a2e4a] hover:text-[#1a2e4a]"
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
                      ? "text-gray-300 hover:text-white"
                      : "text-[#1a2e4a] hover:text-[#1a2e4a]"
                  }`}
                >
                  {link.label}
                </a>
              )
            )}
            <LanguageSwitcher />

            <a href="https://wa.me/556292466109?text=olá%2C%20gostaria%20de%20fazer%20um%20orçamento!">
              <button
                className="cursor-pointer bg-[#ffd400] text-[#1a2e4a] font-bold text-sm px-5 py-2.5 rounded-lg inline-flex items-center gap-1.5 hover:shadow-lg hover:shadow-[#ffd400]/20 transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]"
              >
                {t("nav.button")}
                <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden p-2 rounded-lg transition-colors ${
              scrolled || mobileMenuOpen ? "text-white" : "text-[#1a2e4a]"
            }`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <MobileMenu 
          mobileMenuOpen={mobileMenuOpen} 
          setMobileMenuOpen={setMobileMenuOpen} 
          navLinks={navLinks} 
          t={t} 
        />
      </nav>
    </header>
  )
}