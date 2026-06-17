import Link from "next/link"
import { Phone, MapPin, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                <span className="text-xl font-bold text-primary-foreground">S</span>
              </div>
              <span className="text-xl font-bold">Silver Tintas</span>
            </div>
            <p className="text-background/70 mb-4">
              Sua loja de tintas de confiança em Campinas. 
              Qualidade, variedade e os melhores preços.
            </p>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`h-5 w-5 ${i < 4 ? "fill-yellow-400 text-yellow-400" : "fill-yellow-400/70 text-yellow-400/70"}`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
              <span className="ml-2 text-sm text-background/70">4,7 (19 avaliações)</span>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Links Rápidos</h3>
            <nav className="flex flex-col gap-2">
              <Link href="#inicio" className="text-background/70 hover:text-background transition-colors">
                Início
              </Link>
              <Link href="#produtos" className="text-background/70 hover:text-background transition-colors">
                Produtos
              </Link>
              <Link href="#sobre" className="text-background/70 hover:text-background transition-colors">
                Sobre
              </Link>
              <Link href="#contato" className="text-background/70 hover:text-background transition-colors">
                Contato
              </Link>
              <a href="https://silvertintas.com.br" target="_blank" rel="noopener noreferrer" className="text-background/70 hover:text-background transition-colors">
                Site Oficial
              </a>
            </nav>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Contato</h3>
            <div className="flex flex-col gap-3">
              <a href="tel:+551932660789" className="flex items-center gap-2 text-background/70 hover:text-background transition-colors">
                <Phone className="h-4 w-4" />
                (19) 3266-0789
              </a>
              <a 
                href="https://maps.google.com/?q=Av.+Arymana,+299B+-+Parque+Universitario+de+Viracopos,+Campinas+-+SP" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-start gap-2 text-background/70 hover:text-background transition-colors"
              >
                <MapPin className="h-4 w-4 flex-shrink-0 mt-1" />
                <span>Av. Arymana, 299B - Parque Universitário de Viracopos, Campinas - SP</span>
              </a>
              <a href="https://silvertintas.com.br" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-background/70 hover:text-background transition-colors">
                <Mail className="h-4 w-4" />
                silvertintas.com.br
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-background/10 text-center">
          <p className="text-background/50 text-sm">
            © {new Date().getFullYear()} Silver Tintas. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
