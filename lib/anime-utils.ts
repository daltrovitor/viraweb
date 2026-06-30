"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { animate, stagger } from "animejs"

/* ============================================
   useHeaderScroll — Navbar transparency on scroll
   ============================================ */
export function useHeaderScroll(threshold = 20) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > threshold)
          ticking = false
        })
        ticking = true
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [threshold])

  return { scrolled }
}

/* ============================================
   useAnimeReveal — Single element scroll reveal
   ============================================ */
export function useAnimeReveal<T extends HTMLElement = HTMLDivElement>({
  delay = 0,
  distance = 40,
  duration = 900,
  threshold = 0.15,
}: {
  delay?: number
  distance?: number
  duration?: number
  threshold?: number
} = {}) {
  const ref = useRef<T>(null!)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animate(el, {
            opacity: [0, 1],
            translateY: [distance, 0],
            duration,
            easing: "easeOutCubic",
            delay,
          })
          observer.unobserve(el)
        }
      },
      { threshold }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [delay, distance, duration, threshold])

  return ref
}

/* ============================================
   useAnimeStagger — Multi-child scroll reveal
   ============================================ */
export function useAnimeStagger<T extends HTMLElement = HTMLDivElement>({
  childSelector,
  staggerDelay = 80,
  delay = 0,
  distance = 32,
  duration = 800,
  threshold = 0.12,
}: {
  childSelector: string
  staggerDelay?: number
  delay?: number
  distance?: number
  duration?: number
  threshold?: number
}) {
  const ref = useRef<T>(null!)

  useEffect(() => {
    const container = ref.current
    if (!container) return

    const children = container.querySelectorAll(childSelector)
    if (!children.length) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animate(children, {
            opacity: [0, 1],
            translateY: [distance, 0],
            duration,
            easing: "easeOutCubic",
            delay: stagger(staggerDelay, { start: delay }),
          })
          observer.unobserve(container)
        }
      },
      { threshold }
    )

    observer.observe(container)
    return () => observer.disconnect()
  }, [childSelector, staggerDelay, delay, distance, duration, threshold])

  return ref
}

/* ============================================
   useAnimeCounter — Animated number counter
   ============================================ */
export function useAnimeCounter(
  target: number,
  {
    suffix = "",
    prefix = "",
    duration = 2000,
    easing = "easeOutExpo" as string,
    threshold = 0.3,
  } = {}
) {
  const ref = useRef<HTMLSpanElement>(null!)
  const [displayValue, setDisplayValue] = useState(`${prefix}0${suffix}`)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          const obj = { val: 0 }

          animate(obj, {
            val: target,
            duration,
            easing,
            onUpdate: () => {
              setDisplayValue(`${prefix}${Math.round(obj.val)}${suffix}`)
            },
          })

          observer.unobserve(el)
        }
      },
      { threshold }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [target, suffix, prefix, duration, easing, threshold])

  return { ref, displayValue }
}

/* ============================================
   useAnimeParallax — Subtle mouse parallax
   ============================================ */
export function useAnimeParallax(intensity = 0.015) {
  const ref = useRef<HTMLDivElement>(null!)

  const handleMouse = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current) return
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
      const x = (e.clientX - rect.left - rect.width / 2) * intensity
      const y = (e.clientY - rect.top - rect.height / 2) * intensity

      animate(ref.current, {
        translateX: x,
        translateY: y,
        duration: 600,
        easing: "easeOutCubic",
      })
    },
    [intensity]
  )

  const handleLeave = useCallback(() => {
    if (!ref.current) return
    animate(ref.current, {
      translateX: 0,
      translateY: 0,
      duration: 800,
      easing: "easeOutCubic",
    })
  }, [])

  return { ref, handleMouse, handleLeave }
}

/* ============================================
   useTextReveal — Line-by-line text reveal
   ============================================ */
export function useTextReveal<T extends HTMLElement = HTMLDivElement>({
  delay = 0,
  lineDuration = 700,
  lineStagger = 100,
  threshold = 0.2,
}: {
  delay?: number
  lineDuration?: number
  lineStagger?: number
  threshold?: number
} = {}) {
  const ref = useRef<T>(null!)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const lines = el.querySelectorAll("[data-reveal-line]")
    if (!lines.length) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animate(lines, {
            opacity: [0, 1],
            translateY: [28, 0],
            duration: lineDuration,
            easing: "easeOutCubic",
            delay: stagger(lineStagger, { start: delay }),
          })
          observer.unobserve(el)
        }
      },
      { threshold }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [delay, lineDuration, lineStagger, threshold])

  return ref
}

/* ============================================
   useHeroEntrance — Orchestrated hero animation
   ============================================ */
export function useHeroEntrance() {
  const containerRef = useRef<HTMLDivElement>(null!)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const elements = el.querySelectorAll("[data-hero-item]")
    if (!elements.length) return

    animate(elements, {
      opacity: [0, 1],
      translateY: [32, 0],
      duration: 900,
      easing: "easeOutCubic",
      delay: stagger(120, { start: 200 }),
    })
  }, [])

  return containerRef
}
