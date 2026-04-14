"use client"

import * as React from "react"
import { useTranslation } from "@/lib/i18n"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Globe } from "lucide-react"

export function LanguageSwitcher() {
  const { language, setLanguage } = useTranslation()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const languages = [
    { code: "pt", label: "Português", flag: "🇧🇷" },
    { code: "en", label: "English", flag: "🇺🇸" },
    { code: "es", label: "Español", flag: "🇪🇸" },
  ] as const

  const currentLang = languages.find((l) => l.code === language)

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="sm"
        className="h-9 px-3 flex items-center gap-2 text-sm font-medium transition-all hover:text-primary cursor-pointer text-white"
        aria-label="Select language"
      >
        <Globe className="h-4 w-4 opacity-100" />
        <span className="uppercase">{language}</span>
      </Button>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-9 px-3 flex items-center gap-2 text-sm font-medium transition-all hover:text-primary  cursor-pointer active:scale-95 text-white"
          aria-label="Select language"
        >
          <Globe className="h-4 w-4 opacity-100" />
          <span className="uppercase">{language}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-[#0f1923] border-white/10 text-white min-w-[140px]">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            className={`flex items-center gap-3 cursor-pointer transition-colors focus:bg-white/5 focus:text-white ${
              language === lang.code ? "bg-white/10 text-[#ffd400]" : "text-gray-300"
            }`}
            onClick={() => setLanguage(lang.code)}
          >
            <span className="text-base">{lang.flag}</span>
            <span className="text-sm font-medium">{lang.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
