"use client"

import { useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function LandingScrollStorytelling() {
  useEffect(() => {
    if (typeof window === "undefined") return

    const ctx = gsap.context(() => {
      // 1. Pacote deliverables entrance
      gsap.fromTo(
        "#pacote .border-t > div",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: "#pacote",
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      )

      // 2. Sistemas Sob Medida rows entrance
      gsap.fromTo(
        "#sistemas .divide-y > div",
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: "#sistemas",
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      )

      // 3. Metrics numbers entrance
      gsap.fromTo(
        "#cases .font-mono.text-4xl",
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: "#cases",
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      )
    })

    return () => {
      ctx.revert()
    }
  }, [])

  return null
}
