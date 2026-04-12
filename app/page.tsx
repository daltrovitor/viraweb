import dynamic from "next/dynamic"
import { Header } from "@/components/header"
import { Hero } from "@/components/hero"

const GDCFeatures = dynamic(() => import("@/components/gdc-features").then((mod) => mod.GDCFeatures), {
  loading: () => <div className="h-[600px] w-full bg-[#1a2e4a]/5 animate-pulse rounded-3xl" />
})
const Services = dynamic(() => import("@/components/services").then((mod) => mod.Services), {
  loading: () => <div className="h-[400px] w-full bg-[#1a2e4a]/5 animate-pulse" />
})
const Stats = dynamic(() => import("@/components/stats").then((mod) => mod.Stats), {
  loading: () => <div className="h-32 w-full bg-[#1a2e4a]/5 animate-pulse" />
})
const CTA = dynamic(() => import("@/components/cta").then((mod) => mod.CTA), {
  loading: () => <div className="h-64 w-full bg-[#1a2e4a]/5 animate-pulse" />
})
const Footer = dynamic(() => import("@/components/footer").then((mod) => mod.Footer), {
  loading: () => <div className="h-96 w-full bg-[#1a2e4a]/20 animate-pulse" />
})
import { buildMetadata } from "@/lib/seo"
import type { Metadata } from "next"

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Criação de Sites - Vira Web",
    description:
      "Transformamos ideias em presenças digitais poderosas: tráfego pago, criação de sites, criação de bots e gestão de Google Meu Negócio.",
    path: "/",
    keywords: [ "criação de sites", "tráfego pago", "criação de bots gráfico"],
  })
}

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <GDCFeatures />
      <Stats />
      <Services />
      <CTA />
      <Footer />
    </main>
  )
}
