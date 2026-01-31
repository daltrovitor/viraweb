import { Mail, Phone, MapPin, Instagram, Facebook, Linkedin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function Footer() {
  return (
    <footer id="contato" className="bg-card border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <Image
              src="viraweb3.png"
              alt="Vira Web"
              width={1024}
              height={1024}
              className="w-40 mb-4"
            />
            <p className="text-muted-foreground text-sm leading-relaxed">
              Transformando negócios através de sites e tráfego pago.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Serviços</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Tráfego Pago
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Criação de Sites
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  criação de bots
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Google Meu Negócio
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Empresa</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Sobre Nós
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Portfólio
                </a>
              </li>
              <li>
                <Link href="/termos/#termos" className="hover:text-primary transition-colors">
                  Termos de Serviço
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Contato</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-[#3396d3]" />
                <a href="mailto:contato@viraweb.com.br" className="hover:text-primary transition-colors">
                  suporte@viraweb.online
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-[#3396d3]" />
                <a href="tel:+556299246-6109" className="hover:text-primary transition-colors">
                  (62) 9 9246-6109
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">© 2025 Vira Web. Todos os direitos reservados.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-muted-foreground hover:text-[#3396d3] transition-colors" aria-label="Instagram">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-[#3396d3] transition-colors" aria-label="Facebook">
              <Facebook className="h-5 w-5" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-[#3396d3] transition-colors" aria-label="LinkedIn">
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
