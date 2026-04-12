import dynamic from "next/dynamic"
import { Header } from "@/components/header"
import { Hero } from "@/components/hero"

const GDCFeatures = dynamic(() => import("@/components/gdc-features").then((mod) => mod.GDCFeatures))
const Services = dynamic(() => import("@/components/services").then((mod) => mod.Services))
const Stats = dynamic(() => import("@/components/stats").then((mod) => mod.Stats))
const CTA = dynamic(() => import("@/components/cta").then((mod) => mod.CTA))
const Footer = dynamic(() => import("@/components/footer").then((mod) => mod.Footer))
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
