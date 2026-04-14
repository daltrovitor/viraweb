"use client"

import { m, AnimatePresence, LazyMotion } from "framer-motion"
import { LanguageSwitcher } from "./language-switcher"
import { ArrowUpRight } from "lucide-react"

const loadFeatures = () => import("../lib/framer-features").then((res) => res.default)

export function MobileMenu({ 
  mobileMenuOpen, 
  setMobileMenuOpen, 
  navLinks, 
  t 
}: { 
  mobileMenuOpen: boolean, 
  setMobileMenuOpen: (val: boolean) => void, 
  navLinks: any[], 
  t: any 
}) {
  return (
    <LazyMotion features={loadFeatures}>
    <AnimatePresence>
      {mobileMenuOpen && (
        <m.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "100vh", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ type: "spring", damping: 30, stiffness: 200 }}
          className="md:hidden fixed inset-0 top-0 left-0 w-full bg-[#0f1923] z-[40] flex flex-col pt-24 pb-12 px-6"
        >
          <div className="flex flex-col h-full">
            <div className="flex-1 flex flex-col justify-center gap-2">
              {navLinks.map((link: any, i: number) => (
                <m.div
                  key={link.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-5 text-3xl font-black text-white active:text-[#ffd400] transition-colors flex items-center justify-between group"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.label}
                      <ArrowUpRight className="h-8 w-8 text-[#ffd400]/40" />
                    </a>
                  ) : (
                    <a
                      href={link.href}
                      className="py-5 text-3xl font-black text-white active:text-[#ffd400] transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.label}
                    </a>
                  )}
                </m.div>
              ))}
            </div>

            <div className="pt-8 border-t border-white/10 flex flex-col gap-8">
              <div className="flex justify-between items-center">
                <span className="text-sm font-black uppercase text-gray-500 tracking-widest">Idioma</span>
                <LanguageSwitcher />
              </div>
              <a href="https://wa.me/556292466109?text=olá%2C%20gostaria%20de%20fazer%20um%20orçamento!">
                <button className="w-full cursor-pointer bg-[#ffd400] text-[#1a2e4a] font-black text-lg py-5 rounded-2xl inline-flex items-center justify-center gap-2 shadow-2xl shadow-[#ffd400]/20 active:scale-[0.98] transition-transform">
                  {t("nav.button")}
                  <ArrowUpRight className="h-5 w-5" />
                </button>
              </a>
            </div>
          </div>
        </m.div>
      )}
    </AnimatePresence>
    </LazyMotion>
  )
}
