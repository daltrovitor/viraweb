"use client"

import { useRef } from "react"
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion"
import { AdsScreen, GmbScreen, WebsiteScreen, WhatsAppScreen } from "./screens"
import { cn } from "@/lib/utils"

const frames = [
  {
    id: "website",
    label: "Website Ultra-Rápido",
    node: <WebsiteScreen />,
    className: "left-[4%] top-[8%] w-[48%] max-w-[360px] aspect-[16/10]",
    z: 40,
    rotate: "-6deg",
  },
  {
    id: "gmn",
    label: "Google Meu Negócio",
    node: <GmbScreen />,
    className: "right-[4%] top-[4%] w-[30%] max-w-[220px] aspect-[9/14]",
    z: 30,
    rotate: "8deg",
  },
  {
    id: "ads",
    label: "Tráfego Pago (Google & Meta)",
    node: <AdsScreen />,
    className: "left-[4%] bottom-[6%] w-[34%] max-w-[250px] aspect-[5/4]",
    z: 20,
    rotate: "5deg",
  },
  {
    id: "virabot",
    label: "ViraBot WhatsApp",
    node: <WhatsAppScreen />,
    className: "right-[10%] bottom-[2%] w-[28%] max-w-[210px] aspect-[9/16]",
    z: 50,
    rotate: "-3deg",
  },
] as const

export function OrbitStage() {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [10, -10]), {
    stiffness: 70,
    damping: 18,
  })
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-14, 14]), {
    stiffness: 70,
    damping: 18,
  })

  const onMove = (e: React.PointerEvent) => {
    if (reduce) return
    const box = ref.current?.getBoundingClientRect()
    if (!box) return
    mx.set((e.clientX - box.left) / box.width - 0.5)
    my.set((e.clientY - box.top) / box.height - 0.5)
  }

  const onLeave = () => {
    mx.set(0)
    my.set(0)
  }

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="relative h-full min-h-[440px] w-full md:min-h-[580px]"
      style={{ perspective: reduce ? undefined : 1400 }}
    >
      {/* Light Radial Glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[75%] w-[75%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.12),transparent_65%)]" />

      <motion.div
        className="relative h-full w-full"
        style={
          reduce
            ? undefined
            : { rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }
        }
      >
        {frames.map((frame, i) => (
          <motion.div
            key={frame.id}
            className={cn("absolute", frame.className)}
            style={{ zIndex: frame.z, rotate: reduce ? 0 : frame.rotate }}
            initial={reduce ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.15 + i * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <div className="h-full rounded-[1.35rem] bg-white/95 p-1.5 ring-1 ring-slate-900/10 shadow-[0_20px_40px_rgba(15,23,42,0.12)] backdrop-blur-xl">
              <div className="h-full overflow-hidden rounded-[calc(1.35rem-0.35rem)] ring-1 ring-slate-200">
                {frame.node}
              </div>
            </div>
            <p className="mt-2 text-center text-[11px] font-bold tracking-wide text-slate-600">
              {frame.label}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
