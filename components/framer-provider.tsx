"use client"

import { LazyMotion } from "framer-motion"
import { ReactNode } from "react"

const loadFeatures = () => import("../lib/framer-features").then((res) => res.default)

export function FramerProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      {children}
    </LazyMotion>
  )
}
