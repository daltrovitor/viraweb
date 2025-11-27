"use client"
import { useState } from "react"
import { ArrowRight, Sparkles, ArrowLeft } from "lucide-react"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { Button } from "@/components/ui/button"









 

interface ShowcaseItem {
  id: number
  before: {
    title: string
    description: string
    image: string
  }
  after: {
    title: string
    description: string
    image: string
  }
}

const showcaseData: ShowcaseItem[] = [
  {
    id: 1,
    before: {
      title: "Hambúrguer bom",
      description: "Iluminação fraca, fundo simples, menos profissional.",
      image: "/antes1.png",
    },
    after: {
      title: "Hambúrguer duplo perfeito",
      description: "Iluminação de cinema, alta qualidade.",
      image: "/depois1.png",
    },
  },
  {
    id: 2,
    before: {
      title: "Pizza crua",
      description: "Cores pálidas, nada apetitosa.",
      image: "/antes2.jpeg",
    },
    after: {
      title: "Pizza assada",
      description: "Vibrante, queijo derretido, pronta para comer.",
      image: "/depois2.png",
    },
  },
  {
    id: 3,
    before: {
      title: "Cachorro-quente caseiro",
      description: "Foto casual, menos atraente.",
      image: "/antes3.jpg",
    },
    after: {
      title: "Cachorro-quente gourmet",
      description: "Iluminação profissional, muito apetitoso.",
      image: "/depois3.png",
    },
  },
  {
    id: 4,
    before: {
      title: "Logo Antes",
      description: "Plano, simples, menos dinâmico.",
      image: "/antes4.png",
    },
    after: {
      title: "Logo Depois",
      description: "3D, profissional, impactante.",
      image: "/depois4.png",
    },
  },
]

export default function Design() {
    const [hoveredId, setHoveredId] = useState<number | null>(null)
return(


<div id="design" className="bg-white pt-10 pb-10">
 <div className="container mx-auto px-6 ">
        <Link href="/portfolio">
          <Button variant="ghost" className="mb-8 border-2 hover:border-secondary border-transparent hover:bg-  text-muted-foreground cursor-pointer">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar para o portfólio
          </Button>
        </Link>
      </div>
     
  
    <div className="text-center max-w-3xl mx-auto mb-16">
      <h2 className="text-3xl md:text-5xl font-bold text-balance mb-4">Design</h2>
    </div>
  
    {/* Before/After Timeline */}
    <div className="container mx-auto px-4 ">
      <div className="relative max-w-6xl mx-auto">
        {/* Column Headers */}
        <div className="grid grid-cols-[1fr_auto_1fr] gap-4 md:gap-8 mb-12">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Antes</h2>
            <p className="text-sm text-muted-foreground">Situação inicial</p>
          </div>
          <div className="w-16 md:w-24" />
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-secondary mb-2">Depois</h2>
            <p className="text-sm text-muted-foreground">Resultado alcançado</p>
          </div>
        </div>
  
        {/* Timeline Items */}
        <div className="relative ">
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2  hidden md:block" />
  
          <div className="space-y-8 md:space-y-16">
            {showcaseData.map((item, index) => (
              <div
                key={item.id}
                className="relative"
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 md:gap-8 items-center">
                  {/* Before */}
                  <div className={`transition-all  duration-300 ${hoveredId === item.id ? "scale-[1.02]" : ""}`}>
                    <div className="bg-card rounded-lg overflow-hidden shadow-sm border border-border hover:shadow-md transition-shadow">
                      <div className="aspect-[4/3] bg-muted relative overflow-hidden ">
                        <img
                          src={item.before.image || "/placeholder.svg"}
                          alt={item.before.title}
                          className="w-full h-full object-cover "
                        />
                      </div>
                      <div className="p-4 md:p-6">
                        <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2">
                          {item.before.title}
                        </h3>
                        <p className="text-sm text-muted-foreground text-pretty">{item.before.description}</p>
                      </div>
                    </div>
                  </div>
  
                  {/* Center Connector */}
                  <div className="hidden md:flex flex-col items-center justify-center relative z-10">
                    <div className="w-12 h-12 rounded-full bg-background border-2 border-secondary flex items-center justify-center shadow-sm">
                      <ArrowRight className="w-6 h-6 text-secondary" />
                    </div>
                    {index < showcaseData.length - 1 && <div className="absolute top-full w-0.5 h-16 bg-border" />}
                  </div>
  
                  {/* Mobile Arrow */}
                  <div className="flex md:hidden justify-center my-2">
                    <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
                      <ArrowRight className="w-5 h-5 text-secondary rotate-90" />
                    </div>
                  </div>
  
                  {/* After */}
                  <div className={`transition-all  duration-300 ${hoveredId === item.id ? "scale-[1.02]" : ""}`}>
                    <div className="bg-card rounded-lg overflow-hidden shadow-sm border border-secondary/20 hover:shadow-md hover:border-secondary/40 transition-all">
                      <div className="aspect-[4/3] bg-muted relative overflow-hidden">
                        <img
                          src={item.after.image || "/placeholder.svg"}
                          alt={item.after.title}
                          className="w-full h-full object-cover "
                        />
                        <div className="absolute top-3 right-3 bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-semibold">
                          ✓ Transformado
                        </div>
                      </div>
                      <div className="p-4 md:p-6">
                        <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2">{item.after.title}</h3>
                        <p className="text-sm text-muted-foreground text-pretty">{item.after.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
</div>
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
</div>)
}