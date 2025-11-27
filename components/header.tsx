"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect } from "react"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)



  useEffect(() => {
    if (typeof window !== "undefined") {
      let ultimaPosicao = 0;
      window.addEventListener("scroll", () => {
        const nav: any = document.querySelector("#nav");
        let atualPosicao = window.scrollY;

        if (atualPosicao > ultimaPosicao && atualPosicao > 0) {
          // nav.classList.remove( "" );
          nav.style.transform = "translateY(-100%)";
        } else {
          // nav.classList.add( "" );
          nav.style.transform = "translateY(0%)";
        }
        if (atualPosicao < 80) {
          // nav.classList.remove( "" );
          nav.style.transform = "translateY(0%)";
          nav.style.transition = "0.5s";
        }
        ultimaPosicao = atualPosicao;
      });
    }
  }, []);

  return (
    <header id="nav" className="fixed top-0 left-0 right-0 z-50 bg-white backdrop-blur-md border-b-3">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center">
            <a href="#">
              <Image
                src="viraweb3.png"
                alt="Vira Web"
                width={1024}
                height={1024}
                className=" w-40"
              />
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#servicos" className="text-foreground hover:text-primary transition-colors font-medium">
              Serviços
            </a>
            <Link href="/portfolio" className="text-foreground hover:text-primary transition-colors font-medium">
              Portfólio
            </Link>
            <Link href="/termos">
       <div   className="text-foreground hover:text-primary transition-colors font-medium">
              Termos
          </div>
            </Link> <a href="https://wa.me/556292466109?text=olá%2C%20gostaria%20de%20fazer%20um%20orçamento!">
            <Button className="bg-primary hover:bg-primary/90 cursor-pointer text-primary-foreground">Fale Conosco</Button>
              </a>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
            {mobileMenuOpen ? <X className="h-6 w-6 text-foreground" /> : <Menu className="h-6 w-6 text-foreground" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              <a
                href="#servicos"
                className="text-foreground hover:text-primary transition-colors font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Serviços
              </a>
              <Link
                href="/portfolio"
                className="text-foreground hover:text-primary transition-colors font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Portfólio
              </Link>
              <Link href="/termos"
                className="text-foreground hover:text-primary transition-colors font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Termos
              </Link><a href="https://wa.me/556292466109?text=olá%2C%20gostaria%20de%20fazer%20um%20orçamento!">
                
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground w-full">Fale Conosco</Button>
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}