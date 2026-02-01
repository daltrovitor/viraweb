"use client"


import { ArrowRight, Sparkles, ArrowLeft } from "lucide-react"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { Button } from "@/components/ui/button"



interface website {
  id: number,
  title: string,
  description: string,
  image: string,
  url: string,
}

const sites: website[] = [
  {
    id: 1,
    title: "Pinster Games",
    image: "https://pinstergames.vercel.app/",
    description: "Um site feito para uma empresa de jogos",
    url: "https://pinstergames.vercel.app/",
  },
  {
    id: 2,
    title: "Site pra Dentista",
    image: "https://marcelodaltro.com.br/",
    description: "Site feito para um dentista famoso",
    url: "https://marcelodaltro.com.br/",
  },
  {
    id: 3,
    title: "Site para uma empresa de lixas",
    image: "https://www.libraslixas.com.br/",
    description: "Site de uma empresa de lixas com mais de 40 anos de experiência",
    url: "https://libraslixas.com.br",
  },
  {
    id: 4,
    title: "Site para uma agencia de marketing",
    image: "https://flowstore.vercel.app/",
    description: "Site para uma agencia de marketing com mais de 200 clientes",
    url: "https://flowstore.vercel.app/",
  },
]; 


export default function WebSites() {

     return ( <>
         <section id="websites" className="w-screen bg-white py-20 mt-24 relative left-1/2 right-1/2 -mx-[50vw]">
         <div className="container mx-auto px-6 ">
        <Link href="/portfolio">
          <Button variant="ghost" className="mb-8 border-2 hover:border-secondary border-transparent hover:bg-  text-muted-foreground cursor-pointer">
            <ArrowLeft className="mr-2 h-4 w-4" />
             Voltar para a pagina inicial
          </Button>
        </Link>
      </div>
  <div className="container mx-auto px-4">
    <div className="text-center max-w-3xl mx-auto mb-16">
      <h2 className="text-3xl md:text-5xl font-bold text-balance mb-4">
        Web Sites
      </h2>
      <p className="text-muted-foreground text-lg">
        Alguns dos projetos digitais que ajudaram nossos clientes a crescer
      </p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {sites.map((site) => (
        <div
          key={site.id}
          className="transition-all duration-300 hover:scale-[1.02]"
        >
          <div className="bg-card rounded-lg overflow-hidden shadow-sm border border-border hover:shadow-md transition-shadow flex flex-col">
              <div className="aspect-[12/16] bg-muted relative overflow-hidden">
              <iframe src={site.image} title={site.title} loading="lazy" className=" bg-cover w-full h-full "></iframe>
            </div>
            <div className="p-4 md:p-6 flex flex-col justify-between flex-1">
              <div>
                <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2">
                  {site.title}
                </h3>
                <p className="text-sm text-muted-foreground text-pretty mb-4">
                  {site.description}
                </p>
              </div>
              <a
                href={site.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto inline-block text-center cursor-pointer hover:scale-105 duration-300 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
              >
                Visitar Site
              </a>
            </div>
          </div>
        </div>
      ))}
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
  </section>
  </>
  )
}
