import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Droplet, Home, Building2, Paintbrush, Sparkles, Shield } from "lucide-react"

const products = [
  {
    title: "Tintas para Interiores",
    description: "Tintas acrílicas de alta cobertura para paredes internas. Acabamento perfeito e durabilidade.",
    icon: Home,
    badge: "Mais Vendido",
    features: ["Alta cobertura", "Secagem rápida", "Lavável"],
  },
  {
    title: "Tintas para Exteriores",
    description: "Resistência total às intempéries. Proteção UV e impermeabilização para sua fachada.",
    icon: Building2,
    badge: "Premium",
    features: ["Resistente à chuva", "Proteção UV", "Anti-mofo"],
  },
  {
    title: "Esmaltes e Vernizes",
    description: "Para madeiras, metais e superfícies especiais. Acabamento brilhante ou fosco.",
    icon: Sparkles,
    badge: null,
    features: ["Alto brilho", "Proteção", "Durável"],
  },
  {
    title: "Texturas e Efeitos",
    description: "Crie ambientes únicos com texturas decorativas e efeitos especiais nas paredes.",
    icon: Paintbrush,
    badge: "Novidade",
    features: ["Decorativo", "Fácil aplicação", "Exclusivo"],
  },
  {
    title: "Impermeabilizantes",
    description: "Proteção total contra umidade e infiltrações. Ideal para lajes e paredes.",
    icon: Shield,
    badge: null,
    features: ["Impermeável", "Flexível", "10 anos"],
  },
  {
    title: "Acessórios",
    description: "Rolos, pincéis, massas, lixas e tudo que você precisa para uma pintura perfeita.",
    icon: Droplet,
    badge: null,
    features: ["Qualidade", "Variedade", "Preço justo"],
  },
]

export function Products() {
  return (
    <section id="produtos" className="py-20 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 text-primary border-primary">
            Nossos Produtos
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
            Tudo para Sua Pintura em Um Só Lugar
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Trabalhamos com as melhores marcas do mercado: Suvinil, Coral, Sherwin-Williams e muito mais.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Card key={product.title} className="group hover:shadow-xl transition-all duration-300 border-border/50 hover:border-primary/50">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <product.icon className="h-7 w-7 text-primary" />
                  </div>
                  {product.badge && (
                    <Badge className="bg-primary text-primary-foreground">
                      {product.badge}
                    </Badge>
                  )}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{product.title}</h3>
                <p className="text-muted-foreground mb-4">{product.description}</p>
                <div className="flex flex-wrap gap-2">
                  {product.features.map((feature) => (
                    <span key={feature} className="text-xs bg-muted px-2 py-1 rounded-full text-muted-foreground">
                      {feature}
                    </span>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors" asChild>
                  <a href="https://wa.me/551932660789?text=Olá! Gostaria de saber mais sobre: ${product.title}">
                    Solicitar Informações
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-16 relative rounded-2xl overflow-hidden">
          <Image
            src="/images/paint-cans.jpg"
            alt="Variedade de tintas Silver Tintas"
            width={1200}
            height={400}
            className="w-full h-64 md:h-80 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/60 flex items-center">
            <div className="container mx-auto px-4">
              <div className="max-w-xl">
                <h3 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
                  Precisa de Ajuda para Escolher a Cor Perfeita?
                </h3>
                <p className="text-primary-foreground/90 mb-6">
                  Nossa equipe especializada está pronta para te ajudar a encontrar a combinação ideal para seu projeto.
                </p>
                <Button size="lg" variant="secondary" asChild>
                  <a href="https://wa.me/551932660789" target="_blank" rel="noopener noreferrer">
                    Falar com Especialista
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
