import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"
import ScrollAnimate from "./scroll-animate"

export function Hero() {
  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-32 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Layout lado a lado */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
          {/* Texto */}
          <ScrollAnimate className="max-w-2xl text-center md:text-left" delay={0}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/20 text-secondary-foreground mb-6">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Soluções digitais que geram resultados</span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-balance mb-6">
              Transformamos <span className="text-primary">ideias</span> em presenças <span className="text-primary">digitais</span> poderosas.
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground text-balance mb-8 leading-relaxed">
              Na <span className="font-bold">
                <span className="text-primary">Vira</span>
                <span className="text-secondary">Web</span>
              </span>
              , unimos estratégia, design e programação para fazer sua marca se
              destacar no universo online. Construímos sites, campanhas e identidades
              digitais que conectam você ao seu público e impulsionam o crescimento
              do seu negócio.
            </p>

            <div className="flex flex-col sm:flex-row items-center md:items-start justify-center md:justify-start gap-4">
              <a href="https://wa.me/556292466109?text=olá%2C%20gostaria%20de%20fazer%20um%20orçamento!">
                <Button size="lg" className="bg-primary cursor-pointer hover:scale-105 text-primary-foreground group w-full sm:w-auto">
                  Começar Agora
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </a>
              <a href="#servicos">
                <Button size="lg" className="w-full cursor-pointer text-white hover:bg-secondary hover:scale-105 sm:w-auto bg-secondary">
                  Ver Nossos Serviços
                </Button>
              </a>
            </div>
          </ScrollAnimate>



  
            <ScrollAnimate className="transition-all duration-300 hover:scale-102 w-full md:w-1/3" delay={0.12}>
              <div className="bg-white rounded-lg w-90 cursor-pointer overflow-hidden shadow-lg border border-border hover:shadow-md transition-shadow">
                <div className="aspect-[12/16] bg-white relative overflow-hidden">
                  <iframe
                    src="https://gdc.viraweb.online/"
                    title="G.D.C. preview - Vira Web"
                    loading="lazy"
                    className="bg-cover w-full h-[81%] cursor-pointer"
                  />
                  <div className="p-4 md:p-6 items-center flex justify-center ">
                    <a href="https://gdc.viraweb.online/">

                      <button className="bg-secondary  hover:scale-105 cursor-pointer duration-300 text-secondary-foreground px-15 py-4 rounded-lg font-semibold hover:bg-secondary/90 transition-colors inline-flex items-center gap-2 shadow-sm">
                        Conheça o nosso G.D.C

                      </button>
                    </a>
                  </div>
                </div>
              </div>
            </ScrollAnimate>



        </div>
      </div>
    </section>
  )
}
