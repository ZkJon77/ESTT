import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Star, Phone, ArrowRight } from "lucide-react"

export function Hero() {
  return (
    <section id="inicio" className="relative min-h-[90vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-paint.jpg"
          alt="Loja Silver Tintas"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-transparent" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 mb-6">
            <div className="flex items-center gap-1 bg-background/20 backdrop-blur-sm rounded-full px-4 py-2">
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              <span className="text-primary-foreground font-semibold">4,7</span>
              <span className="text-primary-foreground/80 text-sm">(19 avaliações)</span>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 leading-tight text-balance">
            Transforme Seus Ambientes com as Melhores Tintas
          </h1>

          <p className="text-lg md:text-xl text-primary-foreground/90 mb-8 leading-relaxed">
            A Silver Tintas oferece qualidade, variedade e os melhores preços de Campinas. 
            Encontre a cor perfeita para sua casa ou empresa!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-6" asChild>
              <a href="https://wa.me/551932660789" target="_blank" rel="noopener noreferrer">
                <Phone className="mr-2 h-5 w-5" />
                Solicitar Orçamento
              </a>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6 bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
              <a href="#produtos">
                Ver Produtos
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-6 pt-8 border-t border-primary-foreground/20">
            <div>
              <p className="text-3xl md:text-4xl font-bold text-primary-foreground">10+</p>
              <p className="text-primary-foreground/80 text-sm">Anos de Experiência</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-primary-foreground">5000+</p>
              <p className="text-primary-foreground/80 text-sm">Clientes Satisfeitos</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-primary-foreground">100+</p>
              <p className="text-primary-foreground/80 text-sm">Cores Disponíveis</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
