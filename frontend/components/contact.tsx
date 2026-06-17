import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Phone, Clock, Globe, MessageCircle, Navigation } from "lucide-react"

const contactInfo = [
  {
    icon: MapPin,
    title: "Endereço",
    content: "Av. Arymana, 299B",
    subcontent: "Parque Universitário de Viracopos, Campinas - SP",
    link: "https://maps.google.com/?q=Av.+Arymana,+299B+-+Parque+Universitario+de+Viracopos,+Campinas+-+SP,+13056-464",
    linkText: "Ver no mapa",
  },
  {
    icon: Phone,
    title: "Telefone",
    content: "(19) 3266-0789",
    subcontent: "Ligue ou mande mensagem",
    link: "tel:+551932660789",
    linkText: "Ligar agora",
  },
  {
    icon: Clock,
    title: "Horário",
    content: "Segunda a Sexta: 08:00 - 18:00",
    subcontent: "Sábado: 08:00 - 13:00",
    link: null,
    linkText: null,
  },
  {
    icon: Globe,
    title: "Site",
    content: "silvertintas.com.br",
    subcontent: "Acesse nosso site oficial",
    link: "https://silvertintas.com.br",
    linkText: "Visitar site",
  },
]

export function Contact() {
  return (
    <section id="contato" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 text-primary border-primary">
            Contato
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
            Venha Nos Visitar ou Entre em Contato
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Estamos prontos para atender você e ajudar a encontrar as melhores soluções para sua pintura.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {contactInfo.map((info) => (
            <Card key={info.title} className="border-border/50 hover:border-primary/50 transition-colors">
              <CardContent className="pt-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 mb-4">
                  <info.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">{info.title}</h3>
                <p className="text-foreground font-medium">{info.content}</p>
                <p className="text-sm text-muted-foreground mb-3">{info.subcontent}</p>
                {info.link && (
                  <a 
                    href={info.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline font-medium"
                  >
                    {info.linkText} →
                  </a>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-stretch">
          <div className="relative rounded-2xl overflow-hidden h-80 lg:h-auto">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3675.5!2d-47.1!3d-22.95!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDU3JzAwLjAiUyA0N8KwMDYnMDAuMCJX!5e0!3m2!1spt-BR!2sbr!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: 320 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-2xl"
              title="Localização Silver Tintas"
            />
          </div>

          <Card className="bg-primary text-primary-foreground border-0">
            <CardContent className="p-8 flex flex-col justify-center h-full">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Pronto para Começar Sua Pintura?
              </h3>
              <p className="text-primary-foreground/90 mb-8 text-lg leading-relaxed">
                Entre em contato conosco agora mesmo! Nossa equipe está pronta para 
                atender você e oferecer as melhores soluções em tintas e acessórios.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" variant="secondary" className="flex-1" asChild>
                  <a href="https://wa.me/551932660789" target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="mr-2 h-5 w-5" />
                    WhatsApp
                  </a>
                </Button>
                <Button size="lg" variant="outline" className="flex-1 bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
                  <a href="https://maps.google.com/?q=Av.+Arymana,+299B+-+Parque+Universitario+de+Viracopos,+Campinas+-+SP" target="_blank" rel="noopener noreferrer">
                    <Navigation className="mr-2 h-5 w-5" />
                    Como Chegar
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
