"use client"

import { useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Register GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

export function LandingScrollStorytelling() {
  useEffect(() => {
    if (typeof window === "undefined") return

    const ctx = gsap.context(() => {
      // 1. Hero text & CTA parallax entrance
      gsap.fromTo(
        "#hero h1, #hero p, #hero a",
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          stagger: 0.15,
          ease: "power3.out",
        }
      )

      // 2. Pacote ViraWeb deliverables stagger animation
      gsap.fromTo(
        "#pacote .group",
        { opacity: 0, y: 40, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: "#pacote",
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      )

      // 3. Simulador card reveal
      gsap.fromTo(
        "#simulador .sticky",
        { opacity: 0, x: 40, scale: 0.96 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 1.0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: "#simulador",
            start: "top 70%",
            toggleActions: "play none none none",
          },
        }
      )

      // 4. Sistemas Sob Medida cards stagger
      gsap.fromTo(
        "#sistemas .group",
        { opacity: 0, y: 45, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: "#sistemas",
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      )

      // 5. Cases & ROI metrics stagger
      gsap.fromTo(
        "#cases .group",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: "#cases",
            start: "top 80%",
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
