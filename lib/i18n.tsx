"use client"

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo, useRef, ReactNode } from "react"

export type Language = "pt" | "en" | "es"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
  /** Applies the visitor's saved language; see <LanguageSync />. */
  syncSavedLanguage: () => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const translations: Record<Language, Record<string, string>> = {
  pt: {
    "footer.description": "Desenvolvemos sistemas sob medida para conectar ferramentas, automatizar rotinas e lançar produtos digitais.",
    "footer.cta": "Iniciar Conversa no WhatsApp",
    "process.badge": "Engenharia de Execução",
    "process.title": "Como construímos sua operação.",
    "process.subtitle": "Você acompanha as decisões e testa as entregas antes de colocar o sistema em operação.",
    "process.step1.num": "01",
    "process.step1.title": "Entender sua operação",
    "process.step1.desc": "Identificamos onde a equipe perde tempo e definimos o que a primeira entrega precisa resolver.",
    "process.step2.num": "02",
    "process.step2.title": "Desenhar a experiência",
    "process.step2.desc": "Você testa como as pessoas vão usar o sistema antes da construção.",
    "process.step3.num": "03",
    "process.step3.title": "Construir e testar",
    "process.step3.desc": "Entregamos por etapas para a equipe testar com situações reais e ajustar o que for preciso.",
    "process.step4.num": "04",
    "process.step4.title": "Colocar em operação",
    "process.step4.desc": "Conectamos as ferramentas, orientamos a equipe e acompanhamos o início do uso.",
    "testimonials.title": "Quem confia na nossa engenharia.",
    "testimonials.subtitle": "Veja relatos de marcas, clínicas e SaaS que escalaram suas operações com a ViraWeb."
  },
  en: {
    "footer.description": "We build custom systems to connect tools, automate workflows and launch digital products.",
    "footer.cta": "Start WhatsApp Chat",
    "process.badge": "Execution Engineering",
    "process.title": "How we build your operation.",
    "process.subtitle": "Follow the decisions and test each release before putting the system into operation.",
    "process.step1.num": "01",
    "process.step1.title": "Understand your operations",
    "process.step1.desc": "We find where your team loses time and decide what the first release needs to solve.",
    "process.step2.num": "02",
    "process.step2.title": "Design the experience",
    "process.step2.desc": "You try the main workflows before development starts.",
    "process.step3.num": "03",
    "process.step3.title": "Build and test",
    "process.step3.desc": "We deliver in stages so your team can test real scenarios and request adjustments.",
    "process.step4.num": "04",
    "process.step4.title": "Launch and onboard",
    "process.step4.desc": "We connect your tools, guide the team and support the rollout.",
    "testimonials.title": "Who trusts our engineering.",
    "testimonials.subtitle": "See reports from brands, clinics, and SaaS that scaled their operations with ViraWeb."
  },
  es: {
    "footer.description": "Desarrollamos sistemas a medida para conectar herramientas, automatizar procesos y lanzar productos digitales.",
    "footer.cta": "Iniciar Conversación en WhatsApp",
    "process.badge": "Ingeniería de Ejecución",
    "process.title": "Cómo construimos su operación.",
    "process.subtitle": "Acompañe las decisiones y pruebe las entregas antes de poner el sistema en operación.",
    "process.step1.num": "01",
    "process.step1.title": "Entender su operación",
    "process.step1.desc": "Identificamos dónde pierde tiempo su equipo y definimos qué debe resolver la primera entrega.",
    "process.step2.num": "02",
    "process.step2.title": "Diseñar la experiencia",
    "process.step2.desc": "Usted prueba los recorridos principales antes de construir el sistema.",
    "process.step3.num": "03",
    "process.step3.title": "Construir y probar",
    "process.step3.desc": "Entregamos por etapas para probar situaciones reales y ajustar lo necesario.",
    "process.step4.num": "04",
    "process.step4.title": "Poner en operación",
    "process.step4.desc": "Conectamos las herramientas, orientamos al equipo y acompañamos el lanzamiento.",
    "testimonials.title": "Quién confía en nuestra ingeniería.",
    "testimonials.subtitle": "Vea testimonios de marcas, clínicas y SaaS que escalaron sus operaciones con ViraWeb."
  },
}

const STORAGE_KEY = "lang"
const HTML_LANG: Record<Language, string> = { pt: "pt-BR", en: "en", es: "es" }
const isLanguage = (value: unknown): value is Language => value === "pt" || value === "en" || value === "es"

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Always "pt" during SSR and hydration so server and client markup match.
  // The saved preference is applied afterwards by <LanguageSync />.
  const [language, setLanguageState] = useState<Language>("pt")
  const synced = useRef(false)

  const setLanguage = useCallback((lang: Language) => {
    synced.current = true
    setLanguageState(lang)
    try {
      localStorage.setItem(STORAGE_KEY, lang)
    } catch {
      // Storage unavailable (private mode, blocked cookies): keep the in-memory choice.
    }
  }, [])

  const syncSavedLanguage = useCallback(() => {
    if (synced.current) return
    synced.current = true
    let saved: string | null = null
    try {
      saved = localStorage.getItem(STORAGE_KEY)
    } catch {
      saved = null
    }
    if (isLanguage(saved)) setLanguageState(saved)
  }, [])

  useEffect(() => {
    document.documentElement.lang = HTML_LANG[language]
  }, [language])

  const t = useCallback((key: string): string => {
    return translations[language]?.[key] || translations.pt[key] || key
  }, [language])

  const value = useMemo(
    () => ({ language, setLanguage, t, syncSavedLanguage }),
    [language, setLanguage, t, syncSavedLanguage],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useTranslation() {
  const context = useContext(LanguageContext)
  if (!context) {
    return {
      language: "pt" as Language,
      setLanguage: () => {},
      t: (key: string) => key,
      syncSavedLanguage: () => {},
    }
  }
  return context
}

/**
 * Render as the last element of a page tree. Its effect only fires once that
 * tree has hydrated, so switching to the saved language can never race
 * hydration (which would otherwise mismatch the "pt" server HTML).
 */
export function LanguageSync() {
  const { syncSavedLanguage } = useTranslation()
  useEffect(() => {
    syncSavedLanguage()
  }, [syncSavedLanguage])
  return null
}
