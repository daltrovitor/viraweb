import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Services } from "@/components/services"
import { Stats } from "@/components/stats"
import { CTA } from "@/components/cta"
import { Footer } from "@/components/footer"
import Video from "@/components/videosec"
import { FaWhatsapp } from "react-icons/fa";
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
      <Stats />
      <Services />
      <CTA />
      <Footer />
      <div className="text-white fixed flex items-end justify-end">
        <div className="rounded-full w-20 bg-[#25d366]">
          
                <FaWhatsapp />
        </div>
      </div>
    </main>
  )
}
