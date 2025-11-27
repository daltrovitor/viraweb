"use client";
import { Video } from "lucide-react";
import { Button } from "@/components/ui/button"
import ScrollAnimate from "./scroll-animate"

export default function VideoSec() {
  return (
    <>
      <section id="sobre" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6  lg:px-8">
          <ScrollAnimate>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl text-secondary-foreground font-bold mb-6">
                Conheça a<span className="text-primary"> Vira</span><span className="text-secondary">Web</span>
              </h2>
              <p className="text-xl text-secondary-foreground text-gray-300 max-w-3xl mx-auto">
                O ponto de virada entre o mundo físico e o digital. Criamos caminhos, não apenas sites. Transformamos presença física em presença digital — somos a ponte entre a ideia e a web.
              </p>
            </div>
          </ScrollAnimate>

          <ScrollAnimate>
            <div className="relative max-w-4xl mx-auto">
              <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl bg-primary">
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center text-white">
                    <Video size={64} className="mx-auto mb-4" />
                    <h3 className="text-2xl font-bold mb-2">Vídeo Explicativo</h3>
                    <p className="text-lg opacity-90">Em breve: Nossa história e visão</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="items-center justify-center flex">
              <button className="mt-6 px-50 py-3 bg-primary text-white font-semibold rounded-xl shadow-md hover:scale-110 transition-all duration-200 active:scale-95 cursor-pointer ">Orçamento</button>
            </div>
          </ScrollAnimate>
        </div>
      </section>
    </>
  );
}
