import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import ScrollAnimate from "./scroll-animate"

export function CTA() {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-br from-primary/10 via-secondary/10 to-primary/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollAnimate>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-balance mb-6">Pronto para transformar seu negócio?</h2>
            <p className="text-lg md:text-xl text-muted-foreground text-balance mb-8 leading-relaxed">
              Entre em contato conosco e descubra como podemos ajudar sua empresa a alcançar resultados extraordinários no digital.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="https://wa.me/556292466109?text=olá%2C%20gostaria%20de%20fazer%20um%20orçamento!">
                <Button size="lg" className="cursor-pointer w-full sm:w-auto bg-primary text-white hover:scale-105">Falar no WhatsApp</Button>
              </a>
            </div>
          </div>
        </ScrollAnimate>
      </div>
    </section>
  )
}