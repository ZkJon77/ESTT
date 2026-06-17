import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Award, Users, Clock } from "lucide-react"

const benefits = [
  "Atendimento personalizado",
  "Entrega em toda Campinas",
  "Preços competitivos",
  "Marcas de qualidade",
  "Estacionamento próprio",
  "Consultoria de cores grátis",
]

const stats = [
  { icon: Award, value: "10+", label: "Anos no mercado" },
  { icon: Users, value: "5.000+", label: "Clientes atendidos" },
  { icon: Clock, value: "Seg-Sáb", label: "Horário flexível" },
]

export function About() {
  return (
    <section id="sobre" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden">
              <Image
                src="/images/painting-wall.jpg"
                alt="Pintura profissional Silver Tintas"
                width={600}
                height={500}
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-primary text-primary-foreground p-6 rounded-2xl shadow-xl hidden md:block">
              <p className="text-4xl font-bold">4,7</p>
              <p className="text-sm opacity-90">Avaliação no Google</p>
            </div>
          </div>

          <div>
            <Badge variant="outline" className="mb-4 text-primary border-primary">
              Sobre Nós
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 text-balance">
              Sua Loja de Tintas de Confiança em Campinas
            </h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              A Silver Tintas é referência em qualidade e atendimento na região de Campinas. 
              Há mais de uma década, ajudamos milhares de clientes a transformarem seus ambientes 
              com as melhores tintas e produtos do mercado.
            </p>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Nossa equipe é especializada e está sempre pronta para oferecer as melhores 
              soluções para sua obra ou reforma, seja residencial ou comercial.
            </p>

            <div className="grid grid-cols-2 gap-3 mb-8">
              {benefits.map((benefit) => (
                <div key={benefit} className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="text-sm text-foreground">{benefit}</span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-4 p-6 bg-muted/50 rounded-xl">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <stat.icon className="h-6 w-6 text-primary mx-auto mb-2" />
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
