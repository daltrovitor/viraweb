"use client"
import { m, LazyMotion } from "framer-motion"
import React from "react"

const loadFeatures = () => import("../lib/framer-features").then((res) => res.default)

type Props = {
  children: React.ReactNode
  className?: string
  delay?: number
  y?: number
  duration?: number
  once?: boolean
}

export default function ScrollAnimate({
  children,
  className,
  delay = 0,
  y = 20,
  duration = 0.6,
  once = true,
}: Props) {
  return (
    <LazyMotion features={loadFeatures}>
      <m.div
        initial={{ opacity: 0, y }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once, amount: 0.15 }}
        transition={{ duration, delay }}
        className={["motion-smooth", className].filter(Boolean).join(" ")}
      >
        {children}
      </m.div>
    </LazyMotion>
  )
}
