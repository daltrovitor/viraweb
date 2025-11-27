"use client"

import { useState } from "react"
import { ArrowRight, Sparkles, ArrowLeft } from "lucide-react"
import { Footer } from "@/components/footer"
import Link from "next/link"
import {  Palette, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"




export default function Portfolio() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  return (
   <section className="relative bg-white py-16 ">

      <div className="container mx-auto px-6 md:block hidden">
        <Link href="/">
          <Button variant="ghost" className="mb-8 border-2  hover:border-secondary border-transparent hover:bg-  text-muted-foreground cursor-pointer">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar para a pagina inicial
          </Button>
        </Link>
      </div>
  {/* Header */}
  <div className="container mx-auto px-4   text-center">
    <div className="inline-flex items-center gap-2 bg-secondary/20 text-secondary-foreground px-4 py-2 rounded-full text-sm font-medium mb-6">
      <Sparkles className="w-4 h-4 text-primary" />
      <span>Transformação Digital</span>
    </div>
    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
      Portfólio <span className="text-primary">Vira</span>
      <span className="text-secondary">Web</span>
    </h1>
    <p className="text-xl md:text-2xl text-muted-foreground mb-4">
      Designer Gráfico & Web Sites
    </p>
    <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
      Veja como transformamos negócios através de design profissional e sites com tecnologia de ponta
    </p>
  </div>

{/* Services Anchor Section */}
      <section className="container mx-auto px-4 pt-16 ">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Escolha seu caminho</h2>
          <p className="text-gray-600 text-lg text-pretty">
            Explore nossos serviços e descubra como podemos ajudar seu negócio
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Design Card */}
          <Card className="group relative overflow-hidden border-2 hover:border-blue-600 transition-all duration-300 hover:shadow-xl">
            <Link href="/design" className="block p-8 md:p-10">
              <div className="flex flex-col items-center text-center space-y-6">
                <div className="w-20 h-20 rounded-2xl bg-blue-100 flex items-center justify-center group-hover:bg-blue-600 transition-colors duration-300">
                  <Palette className="w-10 h-10 text-blue-600 group-hover:text-white transition-colors duration-300" />
                </div>

                <div className="space-y-3">
                  <h3 className="text-2xl font-bold text-gray-900">Design Gráfico</h3>
                  <p className="text-gray-600 text-pretty">
                    Identidade visual, branding, materiais gráficos e muito mais para destacar sua marca no mercado
                  </p>
                </div>

                <div className="flex items-center gap-2 text-blue-600 font-semibold group-hover:gap-4 transition-all duration-300">
                  <span>Ver projetos de design</span>
                  <ArrowRight className="w-5 h-5" />
                </div>
              </div>
            </Link>
          </Card>

          {/* Websites Card */}
          <Card className="group relative overflow-hidden border-2 hover:border-yellow-400 transition-all duration-300 hover:shadow-xl">
            <Link href="/websites" className="block p-8 md:p-10">
              <div className="flex flex-col items-center text-center space-y-6">
                <div className="w-20 h-20 rounded-2xl bg-yellow-100 flex items-center justify-center group-hover:bg-yellow-400 transition-colors duration-300">
                  <Globe className="w-10 h-10 text-yellow-600 group-hover:text-white transition-colors duration-300" />
                </div>

                <div className="space-y-3">
                  <h3 className="text-2xl font-bold text-gray-900">Web Sites</h3>
                  <p className="text-gray-600 text-pretty">
                    Sites modernos, responsivos e otimizados com as melhores tecnologias para impulsionar seu negócio
                    online
                  </p>
                </div>

                <div className="flex items-center gap-2 text-yellow-600 font-semibold group-hover:gap-4 transition-all duration-300">
                  <span>Ver projetos web</span>
                  <ArrowRight className="w-5 h-5" />
                </div>
              </div>
            </Link>
          </Card>
        </div>
      </section>


    {/* CTA Section */}
    <div className="mt-16 md:mt-24 text-center w-screen py-20 mt-24 relative left-1/2 right-1/2 -mx-[50vw]  bg-neutral-100">
      <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4 text-balance">
        Pronto para transformar seu negócio?
      </h3>
      <p className="text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
        Entre em contato e descubra como podemos ajudar sua empresa a alcançar resultados extraordinários
      </p>
      <a
        target="_blank"
        href="https://wa.me/556292466109?text=olá%2C%20gostaria%20de%20fazer%20um%20orçamento!"
      >
        <button className="bg-secondary hover:scale-105 cursor-pointer duration-300 text-secondary-foreground px-8 py-4 rounded-lg font-semibold hover:bg-secondary/90 transition-colors inline-flex items-center gap-2 shadow-sm">
          Fale Conosco
          <ArrowRight className="w-5 h-5" />
        </button>
      </a>
    </div>


  <Footer />
</section>

  )
}

import { buildMetadata } from "@/lib/seo"
import type { Metadata } from "next"

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Portfólio — Vira Web",
    description: "Veja projetos de design e web que geram resultados reais para nossos clientes.",
    path: "/portfolio",
    keywords: ["portfólio web", "design gráfico", "sites responsivos"],
  })
}
