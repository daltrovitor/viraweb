"use client"

import { ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"

type Props = {
  href: string
  children: React.ReactNode
  variant?: "gold" | "ghost"
  className?: string
  external?: boolean
}

export function CtaButton({
  href,
  children,
  variant = "gold",
  className,
  external,
}: Props) {
  const gold = variant === "gold"
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={cn(
        "group inline-flex max-w-full items-center gap-3 rounded-full py-2 pl-5 pr-1.5 text-sm font-semibold tracking-tight whitespace-nowrap transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98]",
        gold
          ? "bg-[#FFD400] text-[#0a192f]"
          : "border border-white/15 bg-white/6 text-[#F4F7FB] shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]",
        className
      )}
    >
      <span>{children}</span>
      <span
        className={cn(
          "flex h-8 w-8 items-center justify-center rounded-full transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-px group-hover:scale-105",
          gold ? "bg-[#0a192f]/10" : "bg-white/10"
        )}
      >
        <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
      </span>
    </a>
  )
}
