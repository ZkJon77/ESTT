"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, Phone, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60" suppressHydrationWarning>
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <span className="text-xl font-bold text-primary-foreground">S</span>
            </div>
            <span className="text-xl font-bold text-foreground">Silver Tintas</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="#inicio" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              Início
            </Link>
            <Link href="#produtos" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              Produtos
            </Link>
            <Link href="#sobre" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              Sobre
            </Link>
            <Link href="#contato" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              Contato
            </Link>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <a href="tel:+551932660789" className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              <Phone className="h-4 w-4" />
              (19) 3266-0789
            </a>
            <Button asChild>
              <a href="https://wa.me/551932660789" target="_blank" rel="noopener noreferrer">
                Fale Conosco
              </a>
            </Button>
          </div>

          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <nav className="flex flex-col gap-4">
              <Link href="#inicio" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>
                Início
              </Link>
              <Link href="#produtos" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>
                Produtos
              </Link>
              <Link href="#sobre" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>
                Sobre
              </Link>
              <Link href="#contato" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>
                Contato
              </Link>
              <div className="flex flex-col gap-3 pt-4 border-t border-border">
                <a href="tel:+551932660789" className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  (19) 3266-0789
                </a>
                <a href="https://maps.google.com/?q=Av.+Arymana,+299B+-+Parque+Universitario+de+Viracopos,+Campinas+-+SP" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  Ver no Mapa
                </a>
                <Button asChild className="w-full">
                  <a href="https://wa.me/551932660789" target="_blank" rel="noopener noreferrer">
                    Fale Conosco
                  </a>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
