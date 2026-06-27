"use client"

import React, { useState, useEffect, useCallback, useRef } from "react"
import {
  Search, User, ShoppingCart, ChevronRight, ChevronLeft,
  Check, Instagram, Facebook, MessageCircle, Heart, Paintbrush, Plus, Minus,
  Calculator, Package, Truck, Star, Layers, Droplets, Brush, ChevronDown, X, Upload, Palette, Zap
} from "lucide-react"

// ─── TYPES ───────────────────────────────────────────────────────────────────

interface Product {
  id: number
  name: string
  price: number
  imageUrl: string
  category: string
  brand: string
  stars: number
  description?: string
  coverage?: number
}

interface CartItem extends Product {
  qty: number
}

interface ToastData {
  message: string
  type: "success" | "error" | "info"
}

// ─── DATA ────────────────────────────────────────────────────────────────────

const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Eucatex Protege 18L",
    price: 365.40,
    imageUrl: "https://lojaeucatex.vtexassets.com/arquivos/ids/168579/protege-18-l.png?v=638588362063130000",
    category: "Tintas",
    brand: "Eucatex",
    stars: 5,
    coverage: 400,
    description: "Tinta acrílica fosco de alta cobertura e durabilidade."
  },
  {
    id: 2,
    name: "Suvinil Cor & Proteção ",
    price: 289.90,
    imageUrl: "https://lojasuvinil.vteximg.com.br/arquivos/ids/905034/esmalte-suvinil-cor-protecao-acetinado-base-solvente-branco-neve-3-6l.jpg?v=638094842956100000",
    category: "Tintas",
    brand: "Suvinil",
    stars: 5,
    coverage: 380,
    description: "Tinta premium com proteção UV e resistência à umidade."
  },
  {
    id: 3,
    name: "Rolo de Pintura 23cm Atlas",
    price: 19.80,
    imageUrl: "https://images.tcdn.com.br/img/img_prod/765502/conjunto_de_pintura_la_mista_23cm_atlas_9425_1_20200612155121.png",
    category: "Ferramentas para Pintura",
    brand: "Atlas",
    stars: 4,
    description: "Rolo de lã para aplicação uniforme."
  },
  {
    id: 4,
    name: "Kit verniz 0,900",
    price: 205.90,
    imageUrl: "https://cdn.awsli.com.br/2500x2500/1869/1869036/produto/153855114/3ca522bacc.jpg",
    category: "Tintas",
    brand: "Iquine",
    stars: 4,
    coverage: 360,
    description: "Acabamento semibrilho resistente a limpeza."
  },
  {
    id: 5,
    name: "Lazzuril Preto Cadilac Pu 2,7L",
    price: 189.90,
    imageUrl: "https://img.irroba.com.br/fit-in/600x600/filters:format(webp):fill(transparent):quality(80)/construt/catalog/sherwin-williams/red-esmalte-pu-preto-cadillac-2-7-litros-lazzuril-2.png",
    category: "Tintas",
    brand: "Lazzuril",
    stars: 5,
    coverage: 320
  },
  {
    id: 6,
    name: "Primer Universal Cinza 3,6L ",
    price: 149.90,
    imageUrl: "https://bite.vteximg.com.br/arquivos/ids/158249/28134.jpg?v=636615448624870000",
    category: "Impermeabilizante",
    brand: "anjo",
    stars: 4,
    coverage: 280
  },

  {
    id: 8,
    name: "Esmalte Sintético Branco 3,6L",
    price: 89.90,
    imageUrl: "https://m.media-amazon.com/images/I/5156f0sCGDL._AC_SL1000_.jpg",
    category: "Tintas",
    brand: "Sherwin-Williams",
    stars: 5,
    coverage: 350
  },
  {
    id: 9,
    name: "Fita Crepe Profissional 48mm",
    price: 8.90,
    imageUrl: "https://www.condor.ind.br/cache/produto/EdxkslPraqybIP7AHl0nElY0Y6UQGh-metaMTIyNC0xMjQ4LSgzKS5wbmc=--546-546-fit.webp",
    category: "Acessórios",
    brand: "Condor",
    stars: 5,
    description: "Fita crepe para acabamentos precisos."
  },
  {
    id: 10,
    name: "Massa Corrida PVA 25kg",
    price: 89.90,
    imageUrl: "https://cdn.leroymerlin.com.br/products/massa_pva_corrida_eucatex_balde_25kg_1572096855_4352_600x600.jpg",
    category: "Acessórios",
    brand: "Eucatex",
    stars: 4,
    description: "Massa corrida para nivelamento de paredes."
  },
  {
    id: 11,
    name: "Bandeja para Rolo 23cm",
    price: 12.90,
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLdjz-j_xODuHB9LSjyOznDCeJS1VY_vuhLQ&s",
    category: "Ferramentas para Pintura",
    brand: "Atlas",
    stars: 4,
    description: "Bandeja plástica reforçada."
  },
  {
    id: 12,
    name: "Lona Plástica 4x4m",
    price: 24.90,
    imageUrl: "https://images.tcdn.com.br/img/img_prod/1018104/lona_plastica_4x4_preta_sacaria_abraao_211037_1_513c9910af95523df679991a505e44a7.jpg",
    category: "Acessórios",
    brand: "Cortinas",
    stars: 4,
    description: "Proteção de piso e móveis durante pintura."
  }
]

const KITS = [
  {
    id: "quarto",
    name: "Kit Quarto Completo",
    icon: "🛏️",
    description: "Tudo para pintar um quarto de até 15m²",
    items: ["Tinta 18L", "Rolo 23cm", "Bandeja", "Fita Crepe", "Lona Plástica"],
    price: 349.90,
    originalPrice: 420.00,
    color: "#6366f1",
  },
  {
    id: "banheiro",
    name: "Kit Banheiro Anti-mofo",
    icon: "🚿",
    description: "Proteção contra umidade e mofo",
    items: ["Tinta Anti-Mofo 3,6L", "Pincel", "Fita Crepe", "Selador"],
    price: 229.90,
    originalPrice: 280.00,
    color: "#0ea5e9",
  },
  {
    id: "fachada",
    name: "Kit Fachada Premium",
    icon: "🏠",
    description: "Proteção máxima para área externa",
    items: ["Tinta Textura 25kg", "Rolo Médio", "Bandeja", "Primer", "Lona"],
    price: 479.90,
    originalPrice: 560.00,
    color: "#f59e0b",
  },
]

const COLOR_PALETTE = [
  { name: "Branco neve", hex: "#F5F5F0", group: "Branco" },
  { name: "Creme suave", hex: "#FDF6E3", group: "Bege" },
  { name: "Areia dourada", hex: "#D4B483", group: "Bege" },
  { name: "Cinza pérola", hex: "#C9C9C9", group: "Cinza" },
  { name: "Grafite urbano", hex: "#555555", group: "Cinza" },
  { name: "Azul sereno", hex: "#B8D4E8", group: "Azul" },
  { name: "Azul oceano", hex: "#2563EB", group: "Azul" },
  { name: "Azul marinho", hex: "#1E3A5F", group: "Azul" },
  { name: "Verde salvia", hex: "#A7C5A1", group: "Verde" },
  { name: "Verde musgo", hex: "#4A7C59", group: "Verde" },
  { name: "Verde oliva", hex: "#6B7A3E", group: "Verde" },
  { name: "Rosa blush", hex: "#F4C2C2", group: "Rosa" },
  { name: "Terracota", hex: "#C1705A", group: "Laranja" },
  { name: "Amarelo palha", hex: "#F0D080", group: "Amarelo" },
  { name: "Roxo lavanda", hex: "#C4B0D8", group: "Roxo" },
  { name: "Preto ônix", hex: "#1A1A1A", group: "Preto" },
]

const CATEGORIES = [
  { name: "Tintas", icon: "🪣" },
  { name: "Ferramentas para Pintura", icon: "🖌️" },
  { name: "Impermeabilizante", icon: "💧" },
  { name: "Sprays", icon: "🔵" },
  { name: "Acessórios", icon: "🧰" },
]

const BRANDS = [
  { name: "Coral", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Coral_Tintas_Logo.svg/320px-Coral_Tintas_Logo.svg.png" },
  { name: "Indutil", logo: null },
  { name: "Sherwin-Williams", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Sherwin-Williams_logo.svg/320px-Sherwin-Williams_logo.svg.png" },
  { name: "Suvinil", logo: null },
  { name: "Natrielli", logo: null },
  { name: "PPG", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/PPG_Industries_logo.svg/320px-PPG_Industries_logo.svg.png" },
]

// FIX #1: imagem da Coral trocada para uma URL estável (a antiga estava retornando erro/quebrada
// no carrossel). Mantive a mesma estrutura, só troquei a fonte da imagem do slide.
const HERO_SLIDES = [
  { bg: "#1a1464", image: "https://images.tcdn.com.br/img/img_prod/650361/tinta_acrilica_fosco_completo_coral_branco_18l_4025_1_20200422151912.jpg", brand: "Coral", title: "renova", sub: "Creme de Pintura", fallback: "🎨" },
  { bg: "#0d4a1a", image: "https://m.media-amazon.com/images/I/61kJlFbPaoL._AC_SX679_.jpg", brand: "Suvinil", title: "Cor & Proteção", sub: "Interior e Exterior", fallback: "🪣" },
]

const fmt = (n: number) => `R$ ${n.toFixed(2).replace(".", ",")}`

const StarRow = ({ count = 5, size = 12 }: { count?: number; size?: number }) => (
  <div style={{ display: "flex", gap: 1 }}>
    {[...Array(5)].map((_, i) => (
      <span key={i} style={{ color: i < count ? "#f59e0b" : "#d1d5db", fontSize: size }}>★</span>
    ))}
  </div>
)

// ─── HEADER ──────────────────────────────────────────────────────────────────

interface HeaderProps {
  cartCount: number
  onCartOpen: () => void
  onGoHome: () => void
  onGoCor: () => void
  currentPage: string
  setPage: (p: string) => void
}

const Header = ({ cartCount, onCartOpen, onGoHome, onGoCor, currentPage, setPage }: HeaderProps) => (
  <header style={{ background: "#1a1464", padding: "0", position: "sticky", top: 0, zIndex: 100, boxShadow: "0 2px 8px rgba(0,0,0,0.3)" }}>
    <div style={{ maxWidth: 1400, margin: "0 auto", padding: "12px 32px", display: "flex", alignItems: "center", gap: 20 }}>
      <div onClick={onGoHome} style={{ cursor: "pointer", flexShrink: 0 }}>
        <div style={{ fontFamily: "Georgia, serif", fontStyle: "italic", fontWeight: 900, fontSize: 32, color: "white", lineHeight: 1, letterSpacing: "-1px" }}>Silver</div>
        <div style={{ fontSize: 9, color: "rgba(255,255,255,0.5)", letterSpacing: 3, textTransform: "uppercase" }}>tintas</div>
      </div>
      <div style={{ flex: 1, maxWidth: 600, background: "white", borderRadius: 6, display: "flex", alignItems: "center", padding: "8px 14px", gap: 8 }}>
        <Search size={16} color="#999" />
        <span style={{ fontSize: 14, color: "#bbb" }}>Buscar tintas, ferramentas, marcas...</span>
      </div>
      {/* Nav links */}
      <div style={{ display: "flex", gap: 2, alignItems: "center" }}>
        {[
          { id: "home", label: "Início" },
          { id: "produtos", label: "Produtos" },
          { id: "kits", label: "Kits" },
          { id: "calculadora", label: "Calculadora" },
          { id: "Catalogo", label: "Catalogo" },
          { id: "entrega", label: "Entrega" },
        ].map(item => (
          <button key={item.id} onClick={() => setPage(item.id)}
            style={{ background: "none", border: "none", color: currentPage === item.id ? "white" : "rgba(255,255,255,0.65)", fontSize: 13, fontWeight: currentPage === item.id ? 700 : 500, cursor: "pointer", padding: "6px 12px", borderRadius: 6, borderBottom: currentPage === item.id ? "2px solid #fbbf24" : "2px solid transparent", transition: "all 0.2s", whiteSpace: "nowrap" }}>
            {item.label}
          </button>
        ))}
      </div>
      <div style={{ display: "flex", gap: 16, alignItems: "center", flexShrink: 0 }}>
        <button onClick={onGoCor}
          style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.3)", borderRadius: 20, padding: "7px 16px", color: "white", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
          <Paintbrush size={14} /> Consultar Cor
        </button>
        <User size={22} color="white" style={{ cursor: "pointer" }} />
        <div style={{ position: "relative", cursor: "pointer" }} onClick={onCartOpen}>
          <ShoppingCart size={22} color="white" />
          {cartCount > 0 && (
            <span style={{ position: "absolute", top: -7, right: -7, background: "#e53e3e", color: "white", borderRadius: "50%", width: 18, height: 18, fontSize: 10, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>{cartCount}</span>
          )}
        </div>
      </div>
    </div>
  </header>
)

// ─── HERO CAROUSEL ────────────────────────────────────────────────────────────
// FIX #1 (imagem quebrada) + FIX #2 (dots minúsculos):
// - A <img> agora tem onError que troca a imagem por um placeholder com emoji (fallback),
//   evitando o ícone de "imagem quebrada" do navegador sobreposto ao texto.
// - O estado de erro é resetado a cada troca de slide (key={idx} + useEffect).
// - Os dots foram aumentados (de 6px para 9px / ativo 24px), com borda e sombra para
//   ficarem visíveis sobre qualquer cor de fundo do slide, e foram movidos um pouco
//   pra cima (bottom: 14) para não colarem na borda da seção.

const HeroCarousel = () => {
  const [idx, setIdx] = useState(0)
  const [imgError, setImgError] = useState(false)

  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % HERO_SLIDES.length), 3500)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    setImgError(false)
  }, [idx])

  const slide = HERO_SLIDES[idx]

  return (
    <div style={{ position: "relative", background: slide.bg, overflow: "hidden", minHeight: 340, display: "flex", alignItems: "center", transition: "background 0.5s" }}>
      <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, ${slide.bg} 40%, rgba(255,255,255,0.05) 100%)` }} />
      <div style={{ maxWidth: 1400, margin: "0 auto", width: "100%", padding: "40px 32px", display: "flex", alignItems: "center", position: "relative", zIndex: 2 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", textTransform: "uppercase", letterSpacing: 3, marginBottom: 8 }}>{slide.brand}</div>
          <div style={{ fontFamily: "Georgia, serif", fontStyle: "italic", fontSize: 64, fontWeight: 900, color: "white", lineHeight: 1 }}>{slide.title}</div>
          <div style={{ fontSize: 18, color: "rgba(255,255,255,0.7)", marginTop: 8 }}>{slide.sub}</div>
        </div>
        <div style={{ padding: "10px 0", width: 210, height: 260, display: "flex", alignItems: "center", justifyContent: "center" }}>
          {!imgError ? (
            <img
              key={idx}
              src={slide.image}
              alt={slide.title}
              onError={() => setImgError(true)}
              style={{ height: 260, width: 210, objectFit: "contain", filter: "drop-shadow(0 8px 32px rgba(0,0,0,0.4))" }}
            />
          ) : (
            <div style={{
              width: 180, height: 220, borderRadius: 16, background: "rgba(255,255,255,0.12)",
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 72,
            }}>
              {slide.fallback}
            </div>
          )}
        </div>
      </div>
      <button onClick={() => setIdx(i => (i - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)}
        style={{ position: "absolute", left: 8, top: "50%", transform: "translateY(-50%)", background: "rgba(255,255,255,0.2)", border: "none", borderRadius: "50%", width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", zIndex: 3 }}>
        <ChevronLeft size={16} color="white" />
      </button>
      <button onClick={() => setIdx(i => (i + 1) % HERO_SLIDES.length)}
        style={{ position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)", background: "rgba(255,255,255,0.2)", border: "none", borderRadius: "50%", width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", zIndex: 3 }}>
        <ChevronRight size={16} color="white" />
      </button>
      <div style={{ position: "absolute", bottom: 14, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 7, zIndex: 3 }}>
        {HERO_SLIDES.map((_, i) => (
          <div
            key={i}
            onClick={() => setIdx(i)}
            style={{
              width: i === idx ? 24 : 9,
              height: 9,
              borderRadius: 5,
              background: i === idx ? "#fbbf24" : "rgba(255,255,255,0.55)",
              border: i === idx ? "none" : "1px solid rgba(255,255,255,0.3)",
              boxShadow: i === idx ? "0 0 0 2px rgba(251,191,36,0.25)" : "none",
              cursor: "pointer",
              transition: "all 0.3s",
            }}
          />
        ))}
      </div>
    </div>
  )
}

// ─── QUICK FEATURES STRIP ─────────────────────────────────────────────────────

const QuickFeatures = ({ setPage }: { setPage: (p: string) => void }) => (
  <div style={{ background: "#1a1464", padding: "16px 32px" }}>
    <div style={{ maxWidth: 1400, margin: "0 auto", display: "flex", justifyContent: "flex-start", gap: 24 }}>
    {[
      { icon: <Calculator size={18} color="#fbbf24" />, label: "Calculadora", page: "calculadora" },
      { icon: <Palette size={18} color="#fbbf24" />, label: "Simulador", page: "simulador" },
      { icon: <Package size={18} color="#fbbf24" />, label: "Kits", page: "kits" },
      { icon: <Truck size={18} color="#fbbf24" />, label: "Entrega", page: "entrega" },
    ].map(item => (
      <button key={item.page} onClick={() => setPage(item.page)}
        style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, background: "none", border: "none", cursor: "pointer" }}>
        <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          {item.icon}
        </div>
        <span style={{ fontSize: 10, color: "rgba(255,255,255,0.8)", fontWeight: 600 }}>{item.label}</span>
      </button>
    ))}
  </div>
  </div>
)

// ─── CATEGORIES GRID ─────────────────────────────────────────────────────────
// FIX #3 (ícones cortados): o emoji estava com fontSize:28 sem lineHeight nem
// altura mínima de linha controlada, o que fazia o glifo "vazar" pra fora da div
// dependendo da fonte do SO e cortar visualmente na parte de baixo. Agora o emoji
// fica dentro de um span com lineHeight:1 e a div do ícone tem overflow:visible +
// um pouco mais de altura/padding de segurança.

const CategoriesGrid = ({ onCategoryClick }: { onCategoryClick: (cat: string) => void }) => (
  <div style={{ background: "white", padding: "32px 32px 40px" }}>
    <div style={{ maxWidth: 1400, margin: "0 auto" }}>
    <h2 style={{ fontSize: 20, fontWeight: 700, textAlign: "center", marginBottom: 20, color: "#222" }}>O que procura?</h2>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 16, maxWidth: 700, margin: "0 auto" }}>
      {CATEGORIES.map(cat => (
        <div key={cat.name} onClick={() => onCategoryClick(cat.name)}
          style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, cursor: "pointer" }}>
          <div style={{
            width: 64,
            height: 64,
            borderRadius: 16,
            background: "#e8ecf5",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "visible",
            transition: "background 0.2s",
          }}>
            <span style={{ fontSize: 28, lineHeight: 1, display: "block" }}>{cat.icon}</span>
          </div>
          <span style={{ fontSize: 11, color: "#444", textAlign: "center", fontWeight: 600, textTransform: "uppercase", lineHeight: 1.2 }}>{cat.name}</span>
        </div>
      ))}
    </div>
    </div>
  </div>
)

// ─── FEATURED PRODUCTS ────────────────────────────────────────────────────────

const FeaturedProducts = ({ onAdd, favorites, onToggleFavorite }: { onAdd: (p: Product) => void; favorites: number[]; onToggleFavorite: (id: number) => void }) => {
  const featured = PRODUCTS.slice(0, 8)
  return (
    <div style={{ background: "#f7f8fc", padding: "32px 32px" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
      <h2 style={{ fontSize: 22, fontWeight: 800, color: "#1a1464", marginBottom: 20 }}>Destaques</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
        {featured.map(p => (
          <div key={p.id} style={{ background: "white", borderRadius: 10, border: "1px solid #e5e7eb", overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
            <div style={{ background: "#f9fafb", padding: 10, position: "relative", textAlign: "center" }}>
              <img src={p.imageUrl} alt={p.name} style={{ height: 100, width: "100%", objectFit: "contain" }}
                onError={e => { (e.target as HTMLImageElement).style.opacity = "0.15" }} />
              <button onClick={() => onToggleFavorite(p.id)}
                style={{ position: "absolute", top: 8, right: 8, background: favorites.includes(p.id) ? "#ef4444" : "white", border: "1px solid #ddd", borderRadius: "50%", width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                <Heart size={14} color={favorites.includes(p.id) ? "white" : "#999"} fill={favorites.includes(p.id) ? "white" : "none"} />
              </button>
            </div>
            <div style={{ padding: "10px 10px 12px" }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: "#1a1464", marginBottom: 2 }}>{p.brand}</div>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#333", lineHeight: 1.3, marginBottom: 4 }}>{p.name}</div>
              <StarRow count={p.stars} />
              <div style={{ fontSize: 15, fontWeight: 800, color: "#1a1464", margin: "6px 0 8px" }}>{fmt(p.price)}</div>
              <button onClick={() => onAdd(p)} style={{ width: "100%", background: "#1a1464", color: "white", border: "none", borderRadius: 6, padding: "8px 0", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>
                COMPRAR
              </button>
            </div>
          </div>
        ))}
      </div>
      </div>
    </div>
  )
}

const KitsPage = ({ onAddKit }: { onAddKit: (name: string, price: number) => void }) => (
  <div style={{ background: "#f7f8fc", minHeight: "100vh", padding: "0 0 80px" }}>
    <div style={{ background: "linear-gradient(135deg, #1a1464 0%, #2d3a8c 100%)", padding: "32px 32px 28px" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", display: "flex", alignItems: "center", gap: 10 }}>
        <Package size={26} color="#fbbf24" />
        <div>
          <h1 style={{ fontSize: 26, fontWeight: 800, color: "white", margin: 0 }}>Kits de Pintura</h1>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", margin: 0, marginTop: 4 }}>Kits completos para cada ambiente. Economize e comece a pintar hoje!</p>
        </div>
      </div>
    </div>

    <div style={{ padding: "24px 32px" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
      {KITS.map(kit => {
        const discount = Math.round((1 - kit.price / kit.originalPrice) * 100)
        return (
          <div key={kit.id} style={{ background: "white", borderRadius: 14, overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.08)", border: "1px solid #e5e7eb" }}>
            <div style={{ background: kit.color, padding: "20px 20px 16px", display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ fontSize: 42 }}>{kit.icon}</div>
              <div>
                <div style={{ fontSize: 18, fontWeight: 800, color: "white" }}>{kit.name}</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.8)", marginTop: 2 }}>{kit.description}</div>
              </div>
              <div style={{ marginLeft: "auto", background: "#ef4444", borderRadius: 8, padding: "4px 10px", fontSize: 13, fontWeight: 800, color: "white" }}>
                -{discount}%
              </div>
            </div>
            <div style={{ padding: "16px 20px" }}>
              <div style={{ marginBottom: 14 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#666", marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>Inclui:</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {kit.items.map(item => (
                    <span key={item} style={{ background: "#f0f4ff", color: "#1a1464", fontSize: 11, fontWeight: 600, padding: "4px 10px", borderRadius: 20, display: "flex", alignItems: "center", gap: 4 }}>
                      <Check size={10} /> {item}
                    </span>
                  ))}
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <div style={{ fontSize: 12, color: "#999", textDecoration: "line-through" }}>{fmt(kit.originalPrice)}</div>
                  <div style={{ fontSize: 22, fontWeight: 900, color: "#1a1464" }}>{fmt(kit.price)}</div>
                  <div style={{ fontSize: 11, color: "#059669", fontWeight: 600 }}>ou 6x de {fmt(kit.price / 6)} s/juros</div>
                </div>
                <button onClick={() => onAddKit(kit.name, kit.price)}
                  style={{ background: "#1a1464", color: "white", border: "none", borderRadius: 10, padding: "14px 22px", fontSize: 14, fontWeight: 800, cursor: "pointer" }}>
                  Adicionar Kit
                </button>
              </div>
            </div>
          </div>
        )
      })}
      </div>
    </div>
  </div>
)

// ─── PAINT CALCULATOR PAGE ────────────────────────────────────────────────────

const SURFACE_TYPES = [
  { value: "lisa", label: "Lisa", multiplier: 1.0, desc: "Tinta parede normal" },
  { value: "texturizada", label: "Texturizada", multiplier: 1.3, desc: "+30% de consumo" },
  { value: "massa_corrida", label: "Massa Corrida", multiplier: 0.85, desc: "-15% de consumo" },
  { value: "concreto", label: "Concreto Aparente", multiplier: 1.5, desc: "+50% de consumo" },
  { value: "madeira", label: "Madeira", multiplier: 1.2, desc: "+20% de consumo" },
]

const PRODUCTS_SUGGESTION = [
  { name: "Coral Rende Muito", coverage: 400, price18L: 189.90, price36L: 54.90, brand: "Coral", type: "lisa" },
  { name: "Suvinil Clássica", coverage: 350, price18L: 169.90, price36L: 48.90, brand: "Suvinil", type: "lisa" },
  { name: "Coral Textura", coverage: 280, price18L: 209.90, price36L: 62.90, brand: "Coral", type: "texturizada" },
  { name: "Suvinil Textura", coverage: 300, price18L: 199.90, price36L: 58.90, brand: "Suvinil", type: "texturizada" },
  { name: "Coral Massa Corrida", coverage: 450, price18L: 149.90, price36L: 42.90, brand: "Coral", type: "massa_corrida" },
  { name: "Montana Primer", coverage: 320, price18L: 179.90, price36L: 52.90, brand: "Montana", type: "concreto" },
  { name: "Suvinil Madeira", coverage: 300, price18L: 159.90, price36L: 46.90, brand: "Suvinil", type: "madeira" },
]

const ROOM_PRESETS = [
  { name: "Sala", width: "5", length: "4", height: "2.8", doors: 1, windows: 2 },
  { name: "Quarto", width: "3.5", length: "3.5", height: "2.7", doors: 1, windows: 1 },
  { name: "Cozinha", width: "3", length: "4", height: "2.7", doors: 1, windows: 1 },
  { name: "Banheiro", width: "2", length: "2.5", height: "2.5", doors: 1, windows: 0 },
  { name: "Garagem", width: "6", length: "5", height: "3", doors: 1, windows: 0 },
]

type Room = {
  id: number
  name: string
  width: string
  length: string
  height: string
  doors: number
  windows: number
  surface: string
  coats: number
  includeCeiling: boolean
}

type RoomResult = {
  id: number
  name: string
  area: number
  liters: number
  cans18L: number
  cans36L: number
}

const emptyRoom = (id: number): Room => ({
  id,
  name: `Ambiente ${id}`,
  width: "",
  length: "",
  height: "2.8",
  doors: 1,
  windows: 1,
  surface: "lisa",
  coats: 2,
  includeCeiling: false,
})

const CalculatorPage = () => {
  const [rooms, setRooms] = useState<Room[]>([emptyRoom(1)])
  const [coverage, setCoverage] = useState(400)
  const [pricePerCan18L, setPricePerCan18L] = useState("")
  const [results, setResults] = useState<RoomResult[] | null>(null)
  const [activeRoom, setActiveRoom] = useState(0)
  const [showSuggestions, setShowSuggestions] = useState(false)

  const updateRoom = (id: number, field: keyof Room, value: string | number | boolean) => {
    setRooms(prev => prev.map(r => r.id === id ? { ...r, [field]: value } : r))
  }

  const addRoom = () => {
    const newId = Date.now()
    setRooms(prev => [...prev, emptyRoom(newId)])
    setActiveRoom(rooms.length)
  }

  const removeRoom = (id: number) => {
    if (rooms.length === 1) return
    setRooms(prev => prev.filter(r => r.id !== id))
    setActiveRoom(0)
  }

  const applyPreset = (preset: typeof ROOM_PRESETS[0], roomId: number) => {
    setRooms(prev => prev.map(r => r.id === roomId ? {
      ...r,
      name: preset.name,
      width: preset.width,
      length: preset.length,
      height: preset.height,
      doors: preset.doors,
      windows: preset.windows,
    } : r))
  }

  const calculate = () => {
    const roomResults: RoomResult[] = []

    for (const room of rooms) {
      const w = parseFloat(room.width)
      const l = parseFloat(room.length)
      const h = parseFloat(room.height)
      if (!w || !l || !h) continue

      const surface = SURFACE_TYPES.find(s => s.value === room.surface)!
      const wallArea = (2 * (w + l)) * h
      const ceilingArea = room.includeCeiling ? w * l : 0
      const doorArea = room.doors * 2.1
      const windowArea = room.windows * 1.2
      const netArea = Math.max(0, wallArea + ceilingArea - doorArea - windowArea)
      const adjustedArea = netArea * surface.multiplier
      const litersTotal = (adjustedArea / coverage) * room.coats
      const cans18L = Math.ceil(litersTotal / 18)
      const cans36L = Math.ceil(litersTotal / 3.6)

      roomResults.push({
        id: room.id,
        name: room.name,
        area: Math.round(netArea * 10) / 10,
        liters: Math.round(litersTotal * 10) / 10,
        cans18L,
        cans36L,
      })
    }

    setResults(roomResults)
    setShowSuggestions(true)
  }

  const totalArea = results?.reduce((s, r) => s + r.area, 0) ?? 0
  const totalLiters = results?.reduce((s, r) => s + r.liters, 0) ?? 0
  const totalCans18L = results?.reduce((s, r) => s + r.cans18L, 0) ?? 0
  const totalCans36L = results?.reduce((s, r) => s + r.cans36L, 0) ?? 0
  const totalCost = pricePerCan18L ? totalCans18L * parseFloat(pricePerCan18L) : null

  const currentRoom = rooms[activeRoom] ?? rooms[0]
  const currentSurface = SURFACE_TYPES.find(s => s.value === currentRoom.surface)!
  const suggestedProducts = PRODUCTS_SUGGESTION.filter(p => p.type === currentRoom.surface)

  return (
    <div style={{ background: "#f7f8fc", minHeight: "100vh", paddingBottom: 80 }}>

      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #064e3b 0%, #065f46 100%)", padding: "24px 16px 20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
          <span style={{ fontSize: 22 }}>🧮</span>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: "white", margin: 0 }}>Calculadora de Tinta</h1>
        </div>
        <p style={{ fontSize: 12, color: "rgba(255,255,255,0.7)", margin: 0 }}>
          Calcule por ambiente · Custo total · Sugestão de produto
        </p>
      </div>

      <div style={{ padding: "16px 16px 0" }}>

        {/* Room tabs */}
        <div style={{ display: "flex", gap: 8, overflowX: "auto", marginBottom: 14, paddingBottom: 4 }}>
          {rooms.map((r, i) => (
            <button key={r.id} onClick={() => setActiveRoom(i)}
              style={{
                flexShrink: 0, padding: "7px 14px", borderRadius: 20,
                border: activeRoom === i ? "none" : "1px solid #d1d5db",
                background: activeRoom === i ? "#065f46" : "white",
                color: activeRoom === i ? "white" : "#555",
                fontSize: 12, fontWeight: 700, cursor: "pointer",
              }}>
              {r.name}
            </button>
          ))}
          <button onClick={addRoom}
            style={{
              flexShrink: 0, padding: "7px 14px", borderRadius: 20,
              border: "2px dashed #d1d5db", background: "transparent",
              color: "#059669", fontSize: 12, fontWeight: 700, cursor: "pointer",
            }}>
            + Ambiente
          </button>
        </div>

        {/* Room form */}
        <div style={{ background: "white", borderRadius: 14, padding: 16, marginBottom: 14, boxShadow: "0 1px 8px rgba(0,0,0,0.06)" }}>

          {/* Room name + remove */}
          <div style={{ display: "flex", gap: 8, marginBottom: 14, alignItems: "center" }}>
            <input
              value={currentRoom.name}
              onChange={e => updateRoom(currentRoom.id, "name", e.target.value)}
              style={{ flex: 1, border: "1px solid #d1d5db", borderRadius: 8, padding: "8px 12px", fontSize: 14, fontWeight: 700, outline: "none", color: "#1a1464" }}
            />
            {rooms.length > 1 && (
              <button onClick={() => removeRoom(currentRoom.id)}
                style={{ border: "1px solid #fca5a5", borderRadius: 8, padding: "8px 10px", background: "#fff5f5", cursor: "pointer", color: "#ef4444", fontSize: 12, fontWeight: 700 }}>
                🗑 Remover
              </button>
            )}
          </div>

          {/* Presets */}
          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#555", marginBottom: 6 }}>⚡ Preencher com preset:</div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {ROOM_PRESETS.map(p => (
                <button key={p.name} onClick={() => applyPreset(p, currentRoom.id)}
                  style={{ padding: "4px 10px", borderRadius: 8, border: "1px solid #d1d5db", background: "white", fontSize: 11, fontWeight: 600, cursor: "pointer", color: "#333" }}>
                  {p.name}
                </button>
              ))}
            </div>
          </div>

          {/* Dimensões */}
          <div style={{ fontSize: 13, fontWeight: 800, color: "#1a1464", marginBottom: 10 }}>📐 Dimensões</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 14 }}>
            {[
              { label: "Largura (m)", field: "width" as keyof Room, placeholder: "4.0" },
              { label: "Comprimento (m)", field: "length" as keyof Room, placeholder: "5.0" },
              { label: "Altura (m)", field: "height" as keyof Room, placeholder: "2.8" },
            ].map(({ label, field, placeholder }) => (
              <div key={field}>
                <label style={{ fontSize: 10, fontWeight: 600, color: "#555", display: "block", marginBottom: 4 }}>{label}</label>
                <input
                  type="number"
                  value={currentRoom[field] as string}
                  onChange={e => updateRoom(currentRoom.id, field, e.target.value)}
                  placeholder={placeholder}
                  style={{ width: "100%", border: "1px solid #d1d5db", borderRadius: 8, padding: "9px 10px", fontSize: 13, outline: "none", boxSizing: "border-box" }}
                />
              </div>
            ))}
          </div>

          {/* Teto */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14, background: "#f0fdf4", borderRadius: 8, padding: "10px 12px" }}>
            <input
              type="checkbox"
              id="ceiling"
              checked={currentRoom.includeCeiling}
              onChange={e => updateRoom(currentRoom.id, "includeCeiling", e.target.checked)}
              style={{ accentColor: "#059669", width: 16, height: 16 }}
            />
            <label htmlFor="ceiling" style={{ fontSize: 12, fontWeight: 600, color: "#065f46", cursor: "pointer" }}>
              🏠 Incluir teto no cálculo
            </label>
          </div>

          {/* Aberturas */}
          <div style={{ fontSize: 13, fontWeight: 800, color: "#1a1464", marginBottom: 10 }}>🚪 Aberturas</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
            {[
              { label: "Portas", field: "doors" as keyof Room },
              { label: "Janelas", field: "windows" as keyof Room },
            ].map(({ label, field }) => (
              <div key={field}>
                <label style={{ fontSize: 11, fontWeight: 600, color: "#555", display: "block", marginBottom: 6 }}>{label}</label>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <button onClick={() => updateRoom(currentRoom.id, field, Math.max(0, (currentRoom[field] as number) - 1))}
                    style={{ width: 32, height: 32, border: "1px solid #d1d5db", borderRadius: 8, background: "white", cursor: "pointer", fontSize: 16, fontWeight: 700 }}>−</button>
                  <span style={{ fontSize: 16, fontWeight: 700, minWidth: 24, textAlign: "center" }}>{currentRoom[field] as number}</span>
                  <button onClick={() => updateRoom(currentRoom.id, field, (currentRoom[field] as number) + 1)}
                    style={{ width: 32, height: 32, border: "1px solid #d1d5db", borderRadius: 8, background: "white", cursor: "pointer", fontSize: 16, fontWeight: 700 }}>+</button>
                </div>
              </div>
            ))}
          </div>

          {/* Demãos */}
          <div style={{ marginBottom: 14 }}>
            <label style={{ fontSize: 12, fontWeight: 700, color: "#555", display: "block", marginBottom: 6 }}>
              Número de demãos: <strong style={{ color: "#1a1464" }}>{currentRoom.coats}</strong>
            </label>
            <input type="range" min={1} max={3} value={currentRoom.coats}
              onChange={e => updateRoom(currentRoom.id, "coats", Number(e.target.value))}
              style={{ width: "100%", accentColor: "#065f46" }} />
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "#999" }}>
              <span>1</span><span>2 (recomendado)</span><span>3</span>
            </div>
          </div>

          {/* Tipo de superfície */}
          <div style={{ fontSize: 13, fontWeight: 800, color: "#1a1464", marginBottom: 10 }}>🖌️ Tipo de Superfície</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 14 }}>
            {SURFACE_TYPES.map(s => (
              <button key={s.value} onClick={() => updateRoom(currentRoom.id, "surface", s.value)}
                style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "10px 14px", borderRadius: 10,
                  border: currentRoom.surface === s.value ? "2px solid #059669" : "1px solid #e5e7eb",
                  background: currentRoom.surface === s.value ? "#f0fdf4" : "white",
                  cursor: "pointer", textAlign: "left",
                }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: currentRoom.surface === s.value ? "#065f46" : "#333" }}>{s.label}</span>
                <span style={{ fontSize: 11, color: "#888" }}>{s.desc}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Rendimento global */}
        <div style={{ background: "white", borderRadius: 14, padding: 16, marginBottom: 14, boxShadow: "0 1px 8px rgba(0,0,0,0.06)" }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: "#1a1464", marginBottom: 10 }}>⚙️ Configurações Gerais</div>
          <div style={{ marginBottom: 12 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: "#555", display: "block", marginBottom: 6 }}>Rendimento da tinta (m²/18L)</label>
            <select value={coverage} onChange={e => setCoverage(Number(e.target.value))}
              style={{ width: "100%", border: "1px solid #d1d5db", borderRadius: 8, padding: "10px 12px", fontSize: 13, background: "white", outline: "none" }}>
              <option value={280}>Baixo – 280 m²/18L</option>
              <option value={350}>Médio – 350 m²/18L</option>
              <option value={400}>Alto – 400 m²/18L (padrão)</option>
              <option value={450}>Premium – 450 m²/18L</option>
            </select>
          </div>
          <div>
            <label style={{ fontSize: 12, fontWeight: 600, color: "#555", display: "block", marginBottom: 6 }}>
              💰 Preço por lata 18L (R$) <span style={{ color: "#aaa", fontWeight: 400 }}>opcional</span>
            </label>
            <input
              type="number"
              value={pricePerCan18L}
              onChange={e => setPricePerCan18L(e.target.value)}
              placeholder="Ex: 189.90"
              style={{ width: "100%", border: "1px solid #d1d5db", borderRadius: 8, padding: "10px 12px", fontSize: 14, outline: "none", boxSizing: "border-box" }}
            />
          </div>
        </div>

        {/* Calcular */}
        <button onClick={calculate}
          style={{ width: "100%", background: "linear-gradient(135deg, #064e3b, #065f46)", color: "white", border: "none", borderRadius: 12, padding: "16px", fontSize: 15, fontWeight: 800, cursor: "pointer", marginBottom: 16 }}>
          🧮 Calcular {rooms.length > 1 ? `${rooms.length} Ambientes` : ""}
        </button>

        {/* Resultados */}
        {results && results.length > 0 && (
          <>
            {/* Por ambiente */}
            {results.map(r => (
              <div key={r.id} style={{ background: "white", borderRadius: 14, padding: 14, marginBottom: 10, boxShadow: "0 1px 8px rgba(0,0,0,0.06)", borderLeft: "4px solid #059669" }}>
                <div style={{ fontSize: 13, fontWeight: 800, color: "#065f46", marginBottom: 10 }}>🏠 {r.name}</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
                  {[
                    { label: "Área", value: `${r.area}m²`, icon: "📐" },
                    { label: "Litros", value: `${r.liters}L`, icon: "🪣" },
                    { label: "Latas 18L", value: `${r.cans18L}`, icon: "📦" },
                    { label: "Galões 3,6L", value: `${r.cans36L}`, icon: "🔵" },
                  ].map(item => (
                    <div key={item.label} style={{ background: "#f0fdf4", borderRadius: 8, padding: "8px 4px", textAlign: "center" }}>
                      <div style={{ fontSize: 16, marginBottom: 2 }}>{item.icon}</div>
                      <div style={{ fontSize: 13, fontWeight: 900, color: "#1a1464" }}>{item.value}</div>
                      <div style={{ fontSize: 9, color: "#666" }}>{item.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Total geral */}
            {rooms.length > 1 && (
              <div style={{ background: "#1a1464", borderRadius: 14, padding: 16, marginBottom: 14 }}>
                <div style={{ fontSize: 14, fontWeight: 800, color: "#fbbf24", marginBottom: 12 }}>📊 Total Geral — {results.length} ambientes</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  {[
                    { label: "Área total", value: `${Math.round(totalArea * 10) / 10} m²` },
                    { label: "Total de tinta", value: `${Math.round(totalLiters * 10) / 10} L` },
                    { label: "Latas 18L", value: `${totalCans18L} lata(s)` },
                    { label: "Galões 3,6L", value: `${totalCans36L} galão(ões)` },
                  ].map(item => (
                    <div key={item.label} style={{ background: "rgba(255,255,255,0.1)", borderRadius: 10, padding: "12px", textAlign: "center" }}>
                      <div style={{ fontSize: 16, fontWeight: 900, color: "white" }}>{item.value}</div>
                      <div style={{ fontSize: 10, color: "rgba(255,255,255,0.6)", marginTop: 2 }}>{item.label}</div>
                    </div>
                  ))}
                </div>

                {totalCost && (
                  <div style={{ marginTop: 12, background: "#fbbf24", borderRadius: 10, padding: "14px", textAlign: "center" }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: "#1a1464" }}>💰 CUSTO ESTIMADO TOTAL</div>
                    <div style={{ fontSize: 26, fontWeight: 900, color: "#1a1464" }}>
                      R$ {totalCost.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                    </div>
                    <div style={{ fontSize: 10, color: "#78350f", marginTop: 2 }}>
                      {totalCans18L} lata(s) × R$ {parseFloat(pricePerCan18L).toFixed(2)}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Custo (1 ambiente) */}
            {rooms.length === 1 && totalCost && (
              <div style={{ background: "#fbbf24", borderRadius: 14, padding: 16, marginBottom: 14, textAlign: "center" }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#78350f" }}>💰 CUSTO ESTIMADO</div>
                <div style={{ fontSize: 28, fontWeight: 900, color: "#1a1464" }}>
                  R$ {totalCost.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </div>
                <div style={{ fontSize: 11, color: "#78350f" }}>
                  {totalCans18L} lata(s) 18L × R$ {parseFloat(pricePerCan18L).toFixed(2)}
                </div>
              </div>
            )}

            {/* Sugestões de produto */}
            {showSuggestions && (
              <div style={{ background: "white", borderRadius: 14, padding: 16, marginBottom: 14, boxShadow: "0 1px 8px rgba(0,0,0,0.06)" }}>
                <div style={{ fontSize: 14, fontWeight: 800, color: "#1a1464", marginBottom: 4 }}>
                  🛒 Produtos Sugeridos
                </div>
                <div style={{ fontSize: 11, color: "#888", marginBottom: 12 }}>
                  Para superfície: <strong>{currentSurface.label}</strong>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {(suggestedProducts.length > 0 ? suggestedProducts : PRODUCTS_SUGGESTION.slice(0, 3)).map(p => {
                    const unitCost = totalCans18L * p.price18L
                    return (
                      <div key={p.name} style={{
                        display: "flex", alignItems: "center", justifyContent: "space-between",
                        padding: "12px 14px", borderRadius: 10, border: "1px solid #e5e7eb",
                        background: "#fafafa",
                      }}>
                        <div>
                          <div style={{ fontSize: 13, fontWeight: 800, color: "#1a1464" }}>{p.name}</div>
                          <div style={{ fontSize: 10, color: "#888", marginTop: 2 }}>{p.brand} · {p.coverage} m²/18L</div>
                          <div style={{ fontSize: 11, color: "#059669", fontWeight: 700, marginTop: 4 }}>
                            Lata 18L: R$ {p.price18L.toFixed(2)} · Galão: R$ {p.price36L.toFixed(2)}
                          </div>
                        </div>
                        <div style={{ textAlign: "right" }}>
                          <div style={{ fontSize: 11, color: "#555" }}>{totalCans18L} lata(s)</div>
                          <div style={{ fontSize: 14, fontWeight: 900, color: "#1a1464" }}>
                            R$ {unitCost.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                          </div>
                          <button style={{
                            marginTop: 6, padding: "5px 10px", borderRadius: 8,
                            border: "none", background: "#1a1464", color: "white",
                            fontSize: 11, fontWeight: 700, cursor: "pointer",
                          }}>
                            + Carrinho
                          </button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Dica */}
            <div style={{ background: "#fffbeb", border: "1px solid #fcd34d", borderRadius: 10, padding: "12px 14px", fontSize: 11, color: "#78350f", marginBottom: 16 }}>
              💡 Recomendamos comprar 10% a mais para retoques futuros. Os valores de superfície texturizada e concreto consomem mais tinta que o normal.
            </div>
          </>
        )}
      </div>
    </div>
  )
}

// ─── COLOR CATALOG ────────────────────────────────────────────────────────────

const COLOR_CATALOG = [
  { name: "Branco Neve", hex: "#FAFAFA", group: "Brancos & Neutros" },
  { name: "Branco Gelo", hex: "#F0F4F8", group: "Brancos & Neutros" },
  { name: "Branco Puro", hex: "#FFFFFF", group: "Brancos & Neutros" },
  { name: "Branco Areia", hex: "#F5F0E8", group: "Brancos & Neutros" },
  { name: "Branco Creme", hex: "#FFFDD0", group: "Brancos & Neutros" },
  { name: "Marfim", hex: "#FFFFF0", group: "Brancos & Neutros" },
  { name: "Pérola", hex: "#F0EAD6", group: "Brancos & Neutros" },
  { name: "Gesso", hex: "#E8E4DA", group: "Brancos & Neutros" },
  { name: "Cinza Claro", hex: "#D9D9D9", group: "Cinzas" },
  { name: "Cinza Prata", hex: "#C0C0C0", group: "Cinzas" },
  { name: "Cinza Médio", hex: "#9E9E9E", group: "Cinzas" },
  { name: "Cinza Chumbo", hex: "#616161", group: "Cinzas" },
  { name: "Cinza Escuro", hex: "#424242", group: "Cinzas" },
  { name: "Cinza Grafite", hex: "#2D2D2D", group: "Cinzas" },
  { name: "Cinza Fumaça", hex: "#B0B0B0", group: "Cinzas" },
  { name: "Cinza Ardósia", hex: "#708090", group: "Cinzas" },
  { name: "Cinza Azulado", hex: "#7B8FA1", group: "Cinzas" },
  { name: "Cinza Quente", hex: "#A09080", group: "Cinzas" },
  { name: "Preto Fosco", hex: "#1A1A1A", group: "Pretos" },
  { name: "Preto Brilhante", hex: "#0D0D0D", group: "Pretos" },
  { name: "Preto Grafite", hex: "#222222", group: "Pretos" },
  { name: "Preto Aveludado", hex: "#111111", group: "Pretos" },
  { name: "Amarelo Ouro", hex: "#FFD700", group: "Amarelos" },
  { name: "Amarelo Sol", hex: "#FFC107", group: "Amarelos" },
  { name: "Amarelo Canário", hex: "#FFEB3B", group: "Amarelos" },
  { name: "Amarelo Mostarda", hex: "#D4A017", group: "Amarelos" },
  { name: "Amarelo Palha", hex: "#E8D88A", group: "Amarelos" },
  { name: "Amarelo Cúrcuma", hex: "#C8A415", group: "Amarelos" },
  { name: "Amarelo Limão", hex: "#F9E04B", group: "Amarelos" },
  { name: "Amarelo Âmbar", hex: "#FFBF00", group: "Amarelos" },
  { name: "Laranja Queimado", hex: "#CC5500", group: "Laranjas" },
  { name: "Laranja Vivo", hex: "#FF6600", group: "Laranjas" },
  { name: "Laranja Pêssego", hex: "#FFAD8A", group: "Laranjas" },
  { name: "Laranja Terracota", hex: "#C04A2A", group: "Laranjas" },
  { name: "Laranja Cobre", hex: "#B87333", group: "Laranjas" },
  { name: "Laranja Coral", hex: "#FF6B4A", group: "Laranjas" },
  { name: "Laranja Abóbora", hex: "#E67300", group: "Laranjas" },
  { name: "Vermelho Cardinal", hex: "#C41E3A", group: "Vermelhos" },
  { name: "Vermelho Tijolo", hex: "#8B2500", group: "Vermelhos" },
  { name: "Vermelho Cereja", hex: "#DC143C", group: "Vermelhos" },
  { name: "Vermelho Sangue", hex: "#880808", group: "Vermelhos" },
  { name: "Vermelho Framboesa", hex: "#C72050", group: "Vermelhos" },
  { name: "Vermelho Coral", hex: "#E8524A", group: "Vermelhos" },
  { name: "Vermelho Escarlate", hex: "#FF2400", group: "Vermelhos" },
  { name: "Vermelho Vinho", hex: "#722F37", group: "Vermelhos" },
  { name: "Vermelho Pimentão", hex: "#B22222", group: "Vermelhos" },
  { name: "Rosa Bebê", hex: "#FFB6C1", group: "Rosas" },
  { name: "Rosa Choque", hex: "#FF69B4", group: "Rosas" },
  { name: "Rosa Antigo", hex: "#C8737A", group: "Rosas" },
  { name: "Rosa Quartzo", hex: "#F4A7B9", group: "Rosas" },
  { name: "Rosa Salmão", hex: "#FA8072", group: "Rosas" },
  { name: "Rosa Nude", hex: "#E8B4A0", group: "Rosas" },
  { name: "Rosa Magenta", hex: "#FF00A0", group: "Rosas" },
  { name: "Roxo Real", hex: "#6B2FA0", group: "Roxos & Violetas" },
  { name: "Roxo Uva", hex: "#4B0082", group: "Roxos & Violetas" },
  { name: "Violeta", hex: "#8B00FF", group: "Roxos & Violetas" },
  { name: "Lilás", hex: "#C8A2C8", group: "Roxos & Violetas" },
  { name: "Lavanda", hex: "#B57EDC", group: "Roxos & Violetas" },
  { name: "Roxo Berinjela", hex: "#480048", group: "Roxos & Violetas" },
  { name: "Orquídea", hex: "#DA70D6", group: "Roxos & Violetas" },
  { name: "Ametista", hex: "#9966CC", group: "Roxos & Violetas" },
  { name: "Azul Marinho", hex: "#001F5B", group: "Azuis" },
  { name: "Azul Royal", hex: "#1a1464", group: "Azuis" },
  { name: "Azul Celeste", hex: "#4A90D9", group: "Azuis" },
  { name: "Azul Bebê", hex: "#ADD8E6", group: "Azuis" },
  { name: "Azul Cobalto", hex: "#0047AB", group: "Azuis" },
  { name: "Azul Petróleo", hex: "#005F73", group: "Azuis" },
  { name: "Azul Índigo", hex: "#4B0082", group: "Azuis" },
  { name: "Azul Aço", hex: "#4682B4", group: "Azuis" },
  { name: "Azul Denim", hex: "#1560BD", group: "Azuis" },
  { name: "Azul Piscina", hex: "#0099CC", group: "Azuis" },
  { name: "Azul Gelo", hex: "#D6EAF8", group: "Azuis" },
  { name: "Azul Meia-noite", hex: "#191970", group: "Azuis" },
  { name: "Verde Floresta", hex: "#228B22", group: "Verdes" },
  { name: "Verde Oliva", hex: "#6B7C3A", group: "Verdes" },
  { name: "Verde Militar", hex: "#4A5240", group: "Verdes" },
  { name: "Verde Menta", hex: "#98D8C8", group: "Verdes" },
  { name: "Verde Limão", hex: "#8BC34A", group: "Verdes" },
  { name: "Verde Esmeralda", hex: "#009473", group: "Verdes" },
  { name: "Verde Musgo", hex: "#4A5240", group: "Verdes" },
  { name: "Verde Jade", hex: "#00A86B", group: "Verdes" },
  { name: "Verde Abacate", hex: "#568203", group: "Verdes" },
  { name: "Verde Tiffany", hex: "#0ABAB5", group: "Verdes" },
  { name: "Verde Pistache", hex: "#93C572", group: "Verdes" },
  { name: "Verde Bambu", hex: "#6BAA75", group: "Verdes" },
  { name: "Marrom Café", hex: "#6F4E37", group: "Marrons & Terrosos" },
  { name: "Marrom Chocolate", hex: "#3D1C02", group: "Marrons & Terrosos" },
  { name: "Marrom Caramelo", hex: "#C68642", group: "Marrons & Terrosos" },
  { name: "Marrom Canela", hex: "#8B4513", group: "Marrons & Terrosos" },
  { name: "Bege Areia", hex: "#C2A882", group: "Marrons & Terrosos" },
  { name: "Bege Claro", hex: "#D9C4A0", group: "Marrons & Terrosos" },
  { name: "Terracota", hex: "#A0522D", group: "Marrons & Terrosos" },
  { name: "Siena", hex: "#882D17", group: "Marrons & Terrosos" },
  { name: "Ocre", hex: "#CC7722", group: "Marrons & Terrosos" },
  { name: "Mogno", hex: "#6B2D0A", group: "Marrons & Terrosos" },
  { name: "Dourado Metálico", hex: "#CFB53B", group: "Especiais" },
  { name: "Prata Metálica", hex: "#A8A9AD", group: "Especiais" },
  { name: "Bronze", hex: "#8C6A2F", group: "Especiais" },
  { name: "Cobre Metálico", hex: "#AD6F3B", group: "Especiais" },
  { name: "Champagne", hex: "#F7E7CE", group: "Especiais" },
  { name: "Grafite Metálico", hex: "#404040", group: "Especiais" },
]

const ColorCatalog = () => {
  const [selectedGroup, setSelectedGroup] = useState("Todos")
  const [search, setSearch] = useState("")
  const [selectedColor, setSelectedColor] = useState<typeof COLOR_CATALOG[0] | null>(null)
  const [copied, setCopied] = useState(false)

  const groups = ["Todos", ...Array.from(new Set(COLOR_CATALOG.map(c => c.group)))]

  const filtered = COLOR_CATALOG.filter(c => {
    const matchGroup = selectedGroup === "Todos" || c.group === selectedGroup
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.hex.toLowerCase().includes(search.toLowerCase())
    return matchGroup && matchSearch
  })

  const copyHex = (hex: string) => {
    navigator.clipboard.writeText(hex)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div style={{ background: "#f7f8fc", minHeight: "100vh", paddingBottom: 80 }}>
      <div style={{ background: "linear-gradient(135deg, #1a1464 0%, #2d24a0 100%)", padding: "24px 16px 20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
          <span style={{ fontSize: 22 }}>🎨</span>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: "white", margin: 0 }}>Catálogo de Cores</h1>
        </div>
        <p style={{ fontSize: 12, color: "rgba(255,255,255,0.7)", margin: "0 0 16px" }}>
          {COLOR_CATALOG.length} cores disponíveis · Automotivo, Industrial e muito mais
        </p>
        <div style={{ position: "relative" }}>
          <input
            type="text"
            placeholder="Buscar por nome ou código hex..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              width: "100%", padding: "10px 16px 10px 40px",
              borderRadius: 10, border: "none", fontSize: 13,
              background: "rgba(255,255,255,0.15)", color: "white",
              outline: "none", boxSizing: "border-box",
            }}
          />
          <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", fontSize: 16 }}>🔍</span>
        </div>
      </div>

      <div style={{ padding: "12px 16px 0" }}>
        <div style={{ display: "flex", gap: 8, overflowX: "auto", marginBottom: 14, paddingBottom: 4 }}>
          {groups.map(g => (
            <button key={g} onClick={() => setSelectedGroup(g)}
              style={{
                flexShrink: 0, padding: "6px 14px", borderRadius: 20,
                border: selectedGroup === g ? "none" : "1px solid #d1d5db",
                background: selectedGroup === g ? "#1a1464" : "white",
                color: selectedGroup === g ? "white" : "#555",
                fontSize: 11, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap",
              }}>
              {g}
            </button>
          ))}
        </div>

        <div style={{ fontSize: 12, color: "#888", marginBottom: 10 }}>
          {filtered.length} cores encontradas
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
          {filtered.map(color => (
            <button
              key={color.hex + color.name}
              onClick={() => setSelectedColor(color)}
              style={{
                border: selectedColor?.hex === color.hex ? "3px solid #1a1464" : "2px solid #e5e7eb",
                borderRadius: 12, padding: "8px 4px 10px",
                background: "white", cursor: "pointer",
                display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
                boxShadow: selectedColor?.hex === color.hex ? "0 0 0 2px rgba(26,20,100,0.15)" : "none",
                transition: "all 0.2s",
              }}>
              <div style={{
                width: 48, height: 48, borderRadius: 10,
                background: color.hex, border: "1px solid rgba(0,0,0,0.08)",
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              }} />
              <span style={{ fontSize: 9, fontWeight: 600, color: "#444", textAlign: "center", lineHeight: 1.3, padding: "0 2px" }}>
                {color.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {selectedColor && (
        <div style={{
          position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 50,
          background: "white", borderRadius: "20px 20px 0 0",
          boxShadow: "0 -4px 30px rgba(0,0,0,0.15)",
          padding: "20px 20px 32px",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{
              width: 64, height: 64, borderRadius: 14,
              background: selectedColor.hex,
              border: "1px solid rgba(0,0,0,0.08)",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              flexShrink: 0,
            }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 16, fontWeight: 800, color: "#1a1464" }}>{selectedColor.name}</div>
              <div style={{ fontSize: 12, color: "#888", marginTop: 2 }}>{selectedColor.group}</div>
              <div style={{ fontSize: 12, color: "#555", fontFamily: "monospace", marginTop: 4, fontWeight: 700 }}>
                {selectedColor.hex}
              </div>
            </div>
            <button onClick={() => setSelectedColor(null)}
              style={{ background: "#f3f4f6", border: "none", borderRadius: "50%", width: 32, height: 32, cursor: "pointer", fontSize: 16 }}>
              ✕
            </button>
          </div>
          <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
            <button onClick={() => copyHex(selectedColor.hex)}
              style={{
                flex: 1, padding: "12px", borderRadius: 10,
                border: "1px solid #e5e7eb", background: "white",
                fontSize: 13, fontWeight: 600, cursor: "pointer", color: "#333",
              }}>
              {copied ? "✓ Copiado!" : "📋 Copiar HEX"}
            </button>
            <button style={{
              flex: 1, padding: "12px", borderRadius: 10,
              border: "none", background: "#1a1464",
              fontSize: 13, fontWeight: 600, cursor: "pointer", color: "white",
            }}>
              🛒 Adicionar ao carrinho
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── DELIVERY PAGE ────────────────────────────────────────────────────────────

const DeliveryPage = () => {
  const [mode, setMode] = useState<"delivery" | "pickup" | null>(null)
  const [cep, setCep] = useState("")
  const [result, setResult] = useState<{ days: number; price: string } | null>(null)
  const [loading, setLoading] = useState(false)

  const checkDelivery = () => {
    if (cep.length < 8) return
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setResult({ days: 2, price: cep.startsWith("130") ? "Grátis" : "R$ 24,90" })
    }, 1200)
  }

  return (
    <div style={{ background: "#f7f8fc", minHeight: "100vh", padding: "0 0 80px" }}>
      <div style={{ background: "linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)", padding: "24px 16px 20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
          <Truck size={22} color="#e9d5ff" />
          <h1 style={{ fontSize: 22, fontWeight: 800, color: "white", margin: 0 }}>Entrega & Retirada</h1>
        </div>
        <p style={{ fontSize: 12, color: "rgba(255,255,255,0.75)", margin: 0 }}>Entregamos em toda Campinas e região. Ou retire na loja!</p>
      </div>

      <div style={{ padding: 16 }}>
        {/* Mode selection */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
          {[
            { id: "delivery" as const, icon: "🚚", title: "Entrega em Casa", desc: "Receba no conforto do seu lar" },
            { id: "pickup" as const, icon: "🏪", title: "Retire na Loja", desc: "Pronto em até 2 horas" },
          ].map(opt => (
            <button key={opt.id} onClick={() => setMode(opt.id)}
              style={{ background: mode === opt.id ? "#1a1464" : "white", border: mode === opt.id ? "none" : "1px solid #e5e7eb", borderRadius: 12, padding: "16px 12px", cursor: "pointer", textAlign: "center", boxShadow: "0 1px 8px rgba(0,0,0,0.06)" }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{opt.icon}</div>
              <div style={{ fontSize: 13, fontWeight: 800, color: mode === opt.id ? "white" : "#1a1464", marginBottom: 4 }}>{opt.title}</div>
              <div style={{ fontSize: 10, color: mode === opt.id ? "rgba(255,255,255,0.7)" : "#888" }}>{opt.desc}</div>
            </button>
          ))}
        </div>

        {mode === "delivery" && (
          <div style={{ background: "white", borderRadius: 14, padding: 16, marginBottom: 16, boxShadow: "0 1px 8px rgba(0,0,0,0.06)" }}>
            <h3 style={{ fontSize: 14, fontWeight: 800, color: "#1a1464", marginBottom: 12 }}>Calcule o frete</h3>
            <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
              <input value={cep} onChange={e => setCep(e.target.value.replace(/\D/g, "").slice(0, 8))} placeholder="CEP (ex: 13056000)"
                style={{ flex: 1, border: "1px solid #d1d5db", borderRadius: 8, padding: "10px 12px", fontSize: 14, outline: "none" }} />
              <button onClick={checkDelivery}
                style={{ background: "#1a1464", color: "white", border: "none", borderRadius: 8, padding: "10px 16px", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
                {loading ? "..." : "OK"}
              </button>
            </div>
            {result && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <div style={{ background: "#f0fdf4", border: "1px solid #86efac", borderRadius: 10, padding: 12, textAlign: "center" }}>
                  <div style={{ fontSize: 20, marginBottom: 4 }}>📅</div>
                  <div style={{ fontSize: 14, fontWeight: 800, color: "#1a1464" }}>{result.days} dias úteis</div>
                  <div style={{ fontSize: 10, color: "#666" }}>Prazo estimado</div>
                </div>
                <div style={{ background: result.price === "Grátis" ? "#f0fdf4" : "#fff7ed", border: `1px solid ${result.price === "Grátis" ? "#86efac" : "#fed7aa"}`, borderRadius: 10, padding: 12, textAlign: "center" }}>
                  <div style={{ fontSize: 20, marginBottom: 4 }}>{result.price === "Grátis" ? "🎉" : "💳"}</div>
                  <div style={{ fontSize: 14, fontWeight: 800, color: "#1a1464" }}>{result.price}</div>
                  <div style={{ fontSize: 10, color: "#666" }}>Frete</div>
                </div>
              </div>
            )}
          </div>
        )}

        {mode === "pickup" && (
          <div style={{ background: "white", borderRadius: 14, padding: 16, marginBottom: 16, boxShadow: "0 1px 8px rgba(0,0,0,0.06)" }}>
            <h3 style={{ fontSize: 14, fontWeight: 800, color: "#1a1464", marginBottom: 12 }}>Nossa loja</h3>
            <div style={{ background: "#f0f4ff", borderRadius: 10, padding: 12, marginBottom: 12 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#1a1464", marginBottom: 4 }}>Silver Tintas</div>
              <div style={{ fontSize: 12, color: "#555", lineHeight: 1.6 }}>
                Av. Arymana, 299B<br />
                Parque Universitário de Viracopos<br />
                Campinas – SP, 13056-464
              </div>
              <div style={{ fontSize: 12, color: "#1a1464", fontWeight: 600, marginTop: 6 }}>📞 (19) 3266-0789</div>
            </div>
            <div style={{ background: "#fffbeb", border: "1px solid #fcd34d", borderRadius: 8, padding: "10px 12px", fontSize: 11, color: "#78350f" }}>
              ⏱️ Pedido pronto para retirada em até 2 horas após confirmação.
            </div>
          </div>
        )}

        {/* Shipping info cards */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {[
            { icon: "🚚", title: "Frete Grátis", desc: "Compras acima de R$ 400 em Campinas" },
            { icon: "📦", title: "Embalagem", desc: "Produtos 100% seguros para transporte" },
            { icon: "🔄", title: "Troca fácil", desc: "7 dias para troca ou devolução" },
            { icon: "💳", title: "Parcelamento", desc: "Até 6x sem juros no cartão" },
          ].map(item => (
            <div key={item.title} style={{ background: "white", borderRadius: 10, padding: "12px 10px", border: "1px solid #e5e7eb", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
              <div style={{ fontSize: 22, marginBottom: 6 }}>{item.icon}</div>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#1a1464", marginBottom: 2 }}>{item.title}</div>
              <div style={{ fontSize: 10, color: "#888", lineHeight: 1.4 }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── CATEGORY SECTION ─────────────────────────────────────────────────────────

const CategorySection = ({ onCategoryClick }: { onCategoryClick: (cat: string) => void }) => (
  <div style={{ background: "white", padding: "20px 16px" }}>
    <h2 style={{ fontSize: 16, fontWeight: 800, color: "#1a1464", marginBottom: 12 }}>Categorias</h2>
    <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 4 }}>
      {CATEGORIES.map(cat => (
        <button key={cat.name} onClick={() => onCategoryClick(cat.name)}
          style={{ flexShrink: 0, padding: "8px 16px", borderRadius: 20, border: "1px solid #d1d5db", background: "white", color: "#555", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
          {cat.icon} {cat.name}
        </button>
      ))}
    </div>
  </div>
)

// ─── STORE BANNER ─────────────────────────────────────────────────────────────

const StoreBanner = () => (
  <div style={{ display: "flex", background: "#f7f8fc", overflow: "hidden" }}>
    <div style={{ flex: 1, minHeight: 140, background: "#1a88d4", position: "relative", overflow: "hidden" }}>
      <img src="https://lh5.googleusercontent.com/p/AF1QipME5Ys4k0HB0q2f4I1H3HlFEXVFhqNGTTNGMJg=w426-h240-k-no" alt="Loja Silver Tintas"
        style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.85 }} onError={e => { (e.target as HTMLImageElement).style.display = "none" }} />
    </div>
    <div style={{ flex: 1.2, background: "#1a1464", padding: "16px 14px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
      <div style={{ fontSize: 15, fontWeight: 800, color: "white", marginBottom: 8, lineHeight: 1.2 }}>conheça nossa<br />loja física</div>
      <div style={{ fontSize: 10, color: "rgba(255,255,255,0.7)", lineHeight: 1.5 }}>Av. Arymana, 299B · Parque Universitário de Viracopos<br />Campinas – SP, 13056-464</div>
      <div style={{ fontSize: 11, color: "rgba(255,255,255,0.8)", marginTop: 6, fontWeight: 600 }}>Telefone: (19) 3266-0789</div>
    </div>
  </div>
)

// ─── COLOR BANNER ─────────────────────────────────────────────────────────────

const ColorBanner = ({ setPage }: { setPage: (p: string) => void }) => (
  <div style={{ margin: "0 12px 16px", borderRadius: 12, overflow: "hidden", border: "1px solid #e5e7eb", background: "#f0f4ff", position: "relative" }}>
    <div style={{ display: "flex", alignItems: "center", padding: "16px 14px", gap: 12 }}>
      <div style={{ width: 70, height: 70, flexShrink: 0 }}>
        <svg viewBox="0 0 100 100" style={{ width: "100%", height: "100%" }}>
          {[
            { color: "#e53e3e", d: "M50,50 L50,10 A40,40 0 0,1 84,30 Z" },
            { color: "#ed8936", d: "M50,50 L84,30 A40,40 0 0,1 90,50 Z" },
            { color: "#ecc94b", d: "M50,50 L90,50 A40,40 0 0,1 84,70 Z" },
            { color: "#48bb78", d: "M50,50 L84,70 A40,40 0 0,1 50,90 Z" },
            { color: "#38b2ac", d: "M50,50 L50,90 A40,40 0 0,1 16,70 Z" },
            { color: "#4299e1", d: "M50,50 L16,70 A40,40 0 0,1 10,50 Z" },
            { color: "#805ad5", d: "M50,50 L10,50 A40,40 0 0,1 16,30 Z" },
            { color: "#e53e3e", d: "M50,50 L16,30 A40,40 0 0,1 50,10 Z" },
          ].map((s, i) => <path key={i} d={s.d} fill={s.color} />)}
          <circle cx="50" cy="50" r="12" fill="white" />
        </svg>
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 16, fontWeight: 800, color: "#1a1464", lineHeight: 1.2, marginBottom: 4 }}>escolha a cor ideal para seu ambiente</div>
        <div style={{ fontSize: 10, color: "#666", marginBottom: 8 }}>Sua criatividade começa aqui, explore nossas cores.</div>
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={() => setPage("cor")} style={{ background: "#1a1464", color: "white", border: "none", borderRadius: 20, padding: "6px 14px", fontSize: 11, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 5 }}>
            Código <ChevronRight size={12} />
          </button>
          <button onClick={() => setPage("simulador")} style={{ background: "#6d28d9", color: "white", border: "none", borderRadius: 20, padding: "6px 14px", fontSize: 11, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 5 }}>
            Simular <Palette size={10} />
          </button>
        </div>
      </div>
    </div>
    <div style={{ background: "#dbeafe", padding: "6px 14px", fontSize: 10, color: "#1e40af" }}>📸 @silverpintura</div>
  </div>
)

// ─── BRANDS SECTION ───────────────────────────────────────────────────────────

const BrandsSection = () => (
  <div style={{ background: "white", padding: "20px 16px 24px" }}>
    <h2 style={{ fontSize: 16, fontWeight: 800, textAlign: "center", marginBottom: 16, color: "#222", letterSpacing: 1, textTransform: "uppercase" }}>Procure por Marcas</h2>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
      {BRANDS.map(brand => (
        <div key={brand.name} style={{ border: "1px solid #e5e7eb", borderRadius: 8, height: 56, display: "flex", alignItems: "center", justifyContent: "center", padding: "8px 12px", cursor: "pointer", background: "white" }}>
          {brand.logo ? (
            <img src={brand.logo} alt={brand.name} style={{ maxHeight: 30, maxWidth: "100%", objectFit: "contain" }}
              onError={e => { const img = e.target as HTMLImageElement; img.style.display = "none"; const s = img.nextSibling as HTMLElement | null; if (s) s.style.display = "block" }} />
          ) : null}
          <span style={{ fontSize: 11, fontWeight: 700, color: "#333", display: brand.logo ? "none" : "block" }}>{brand.name}</span>
        </div>
      ))}
    </div>
  </div>
)

// ─── TIPS SECTION ─────────────────────────────────────────────────────────────

const TipsSection = () => {
  const tips = [
    { icon: "🖌️", title: "Fosco, Acetinado ou Semibrilho?", desc: "Fosco esconde imperfeições; semibrilho é lavável; acetinado equilibra os dois." },
    { icon: "💧", title: "Áreas úmidas", desc: "Use tinta antimofo em banheiros e cozinhas. Sempre aplique selador antes." },
    { icon: "☀️", title: "Pintando fachadas", desc: "Escolha tintas com proteção UV para garantir durabilidade de 5+ anos." },
    { icon: "🧹", title: "Preparação é tudo", desc: "Lixe, aplique massa corrida e fundo preparador antes de pintar. O resultado faz diferença!" },
  ]
  return (
    <div style={{ background: "#1a1464", padding: "20px 16px 24px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
        <Zap size={18} color="#fbbf24" />
        <h2 style={{ fontSize: 16, fontWeight: 800, color: "white", margin: 0 }}>Dicas dos especialistas</h2>
      </div>
      <div style={{ display: "flex", gap: 12, overflowX: "auto", paddingBottom: 4 }}>
        {tips.map(tip => (
          <div key={tip.title} style={{ flexShrink: 0, width: 180, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 12, padding: "14px 12px" }}>
            <div style={{ fontSize: 24, marginBottom: 8 }}>{tip.icon}</div>
            <div style={{ fontSize: 12, fontWeight: 800, color: "white", marginBottom: 6, lineHeight: 1.2 }}>{tip.title}</div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.6)", lineHeight: 1.5 }}>{tip.desc}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── FOOTER ──────────────────────────────────────────────────────────────────

const Footer = () => (
  <footer style={{ background: "#0f0c38", color: "white", padding: "24px 16px 16px" }}>
    <div style={{ marginBottom: 6 }}>
      <div style={{ fontFamily: "Georgia, serif", fontStyle: "italic", fontWeight: 900, fontSize: 28, color: "white" }}>Silver</div>
      <div style={{ fontSize: 9, color: "rgba(255,255,255,0.4)", letterSpacing: 2, textTransform: "uppercase" }}>Qualidade que você confia</div>
    </div>
    <div style={{ display: "flex", gap: 14, margin: "14px 0" }}>
      <a href="https://wa.me/5519326607089" target="_blank" rel="noreferrer" style={{ width: 32, height: 32, borderRadius: "50%", background: "rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", textDecoration: "none" }}>
        <MessageCircle size={16} color="white" />
      </a>
      <div style={{ width: 32, height: 32, borderRadius: "50%", background: "rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
        <Instagram size={16} color="white" />
      </div>
      <div style={{ width: 32, height: 32, borderRadius: "50%", background: "rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
        <Facebook size={16} color="white" />
      </div>
    </div>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
      <div>
        <div style={{ fontSize: 11, fontWeight: 700, marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>Institucional</div>
        {["Sobre nós", "Loja", "Contato"].map(l => (<div key={l} style={{ fontSize: 10, color: "rgba(255,255,255,0.5)", marginBottom: 5, cursor: "pointer" }}>{l}</div>))}
      </div>
      <div>
        <div style={{ fontSize: 11, fontWeight: 700, marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>Atendimento</div>
        {["Central de ajuda", "Política de trocas", "Envio e entregas"].map(l => (<div key={l} style={{ fontSize: 10, color: "rgba(255,255,255,0.5)", marginBottom: 5, cursor: "pointer" }}>{l}</div>))}
      </div>
    </div>
    <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 12, fontSize: 9, color: "rgba(255,255,255,0.3)" }}>
      © 2026 Silver Tintas · Av. Arymana, 299B · Campinas – SP · (19) 3266-0789
    </div>
  </footer>
)

// ─── COLOR PAGE ───────────────────────────────────────────────────────────────

const ColorPage = () => {
  const [code, setCode] = useState("")
  const [result, setResult] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const handleSearch = () => {
    if (!code) return
    setLoading(true)
    setTimeout(() => { setLoading(false); setResult(`Cor encontrada para ${code}: Preto Metálico`) }, 1200)
  }
  return (
    <div style={{ padding: 20 }}>
      <div style={{ background: "linear-gradient(135deg, #1a1464 0%, #2a52be 100%)", borderRadius: 12, padding: "20px 16px", marginBottom: 16, color: "white" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
          <Paintbrush size={24} color="#fbbf24" />
          <div style={{ fontSize: 18, fontWeight: 800 }}>Consultar Cor</div>
        </div>
        <p style={{ fontSize: 12, color: "rgba(255,255,255,0.7)" }}>Digite o código da peça do veículo para encontrar a tinta correta.</p>
      </div>
      <div style={{ background: "white", borderRadius: 12, padding: 16, border: "1px solid #e5e7eb" }}>
        <label style={{ fontSize: 13, fontWeight: 700, color: "#333", display: "block", marginBottom: 8 }}>Código da cor</label>
        <div style={{ display: "flex", gap: 8 }}>
          <input value={code} onChange={e => setCode(e.target.value.toUpperCase())} placeholder="Ex: NH731P"
            style={{ flex: 1, border: "1px solid #d1d5db", borderRadius: 8, padding: "10px 12px", fontSize: 14, outline: "none" }} />
          <button onClick={handleSearch} style={{ background: "#1a1464", color: "white", border: "none", borderRadius: 8, padding: "10px 16px", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
            {loading ? "..." : "Buscar"}
          </button>
        </div>
        {result && (
          <div style={{ marginTop: 12, padding: 12, background: "#ecfdf5", border: "1px solid #86efac", borderRadius: 8, fontSize: 13, color: "#166534", display: "flex", alignItems: "center", gap: 8 }}>
            <Check size={18} /> {result}
          </div>
        )}
      </div>
    </div>
  )
}

// ─── PRODUCTS PAGE ────────────────────────────────────────────────────────────

const ProductsPage = ({ onAdd, favorites, onToggleFavorite, initialCategory }: { onAdd: (p: Product) => void; favorites: number[]; onToggleFavorite: (id: number) => void; initialCategory?: string }) => {
  const [selCat, setSelCat] = useState(initialCategory || "Todos")
  const filtered = selCat === "Todos" ? PRODUCTS : PRODUCTS.filter(p => p.category === selCat)
  const cats = ["Todos", ...CATEGORIES.map(c => c.name)]

  return (
    <div style={{ background: "#f7f8fc", minHeight: "100vh" }}>
      <div style={{ background: "white", padding: "20px 32px", borderBottom: "1px solid #e5e7eb" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", display: "flex", alignItems: "center", gap: 16 }}>
          <h1 style={{ fontSize: 24, fontWeight: 800, color: "#1a1464", margin: 0 }}>Produtos</h1>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {cats.map(cat => (
              <button key={cat} onClick={() => setSelCat(cat)}
                style={{ padding: "7px 16px", borderRadius: 20, border: selCat === cat ? "none" : "1px solid #d1d5db", background: selCat === cat ? "#1a1464" : "white", color: selCat === cat ? "white" : "#555", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                {cat}
              </button>
            ))}
          </div>
          <div style={{ marginLeft: "auto", fontSize: 13, color: "#888" }}>{filtered.length} produto(s)</div>
        </div>
      </div>
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "24px 32px", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
        {filtered.map(p => (
          <div key={p.id} style={{ background: "white", borderRadius: 12, border: "1px solid #e5e7eb", overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.06)", transition: "box-shadow 0.2s" }}>
            <div style={{ background: "#f9fafb", padding: 16, position: "relative", textAlign: "center" }}>
              <img src={p.imageUrl} alt={p.name} style={{ height: 140, width: "100%", objectFit: "contain" }}
                onError={e => { (e.target as HTMLImageElement).style.opacity = "0.15" }} />
              <button onClick={() => onToggleFavorite(p.id)} style={{ position: "absolute", top: 10, right: 10, background: favorites.includes(p.id) ? "#ef4444" : "white", border: "1px solid #ddd", borderRadius: "50%", width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                <Heart size={16} color={favorites.includes(p.id) ? "white" : "#999"} fill={favorites.includes(p.id) ? "white" : "none"} />
              </button>
            </div>
            <div style={{ padding: "12px 14px 16px" }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#1a1464", marginBottom: 3 }}>{p.brand}</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#333", lineHeight: 1.3, marginBottom: 6, minHeight: 40 }}>{p.name}</div>
              <StarRow count={p.stars} size={14} />
              {p.coverage && <div style={{ fontSize: 11, color: "#666", marginTop: 4 }}>Rendimento: {p.coverage} m²/18L</div>}
              <div style={{ fontSize: 18, fontWeight: 800, color: "#1a1464", margin: "8px 0 4px" }}>{fmt(p.price)}</div>
              <div style={{ fontSize: 11, color: "#059669", fontWeight: 600, marginBottom: 10 }}>6x de {fmt(p.price / 6)}</div>
              <button onClick={() => onAdd(p)} style={{ width: "100%", background: "#1a1464", color: "white", border: "none", borderRadius: 8, padding: "10px 0", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
                COMPRAR
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── CART MODAL ───────────────────────────────────────────────────────────────

const CartModal = ({ cart, onClose, onRemove, onChangeQty, onCheckout }: {
  cart: CartItem[]
  onClose: () => void
  onRemove: (id: number) => void
  onChangeQty: (id: number, delta: number) => void
  onCheckout: () => void
}) => {
  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0)
  const freeShipping = subtotal >= 400
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 300, display: "flex", alignItems: "flex-end" }}
      onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={{ background: "white", width: "100%", borderRadius: "20px 20px 0 0", maxHeight: "80vh", overflowY: "auto", padding: "20px 16px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div style={{ fontSize: 18, fontWeight: 800, color: "#1a1464" }}>Carrinho</div>
          <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 22, cursor: "pointer", color: "#999" }}>×</button>
        </div>

        {/* Free shipping bar */}
        {cart.length > 0 && (
          <div style={{ marginBottom: 14, background: freeShipping ? "#f0fdf4" : "#f0f4ff", border: `1px solid ${freeShipping ? "#86efac" : "#bfdbfe"}`, borderRadius: 8, padding: "8px 12px" }}>
            {freeShipping ? (
              <div style={{ fontSize: 11, color: "#059669", fontWeight: 700 }}>🎉 Você ganhou frete grátis!</div>
            ) : (
              <>
                <div style={{ fontSize: 11, color: "#1a1464", fontWeight: 600, marginBottom: 4 }}>
                  Falta {fmt(400 - subtotal)} para frete grátis
                </div>
                <div style={{ height: 4, background: "#dbeafe", borderRadius: 2 }}>
                  <div style={{ height: "100%", background: "#1a1464", borderRadius: 2, width: `${Math.min(100, (subtotal / 400) * 100)}%`, transition: "width 0.3s" }} />
                </div>
              </>
            )}
          </div>
        )}

        {cart.length === 0 ? <p style={{ color: "#999", textAlign: "center", padding: 24 }}>Carrinho vazio</p> : (
          <>
            {cart.map(item => (
              <div key={item.id} style={{ display: "flex", gap: 12, alignItems: "center", padding: "12px 0", borderBottom: "1px solid #f3f4f6" }}>
                <img src={item.imageUrl} alt={item.name} style={{ width: 52, height: 52, objectFit: "contain" }}
                  onError={e => { (e.target as HTMLImageElement).style.opacity = "0.15" }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#333" }}>{item.name}</div>
                  <div style={{ fontSize: 12, color: "#1a1464", fontWeight: 700 }}>{fmt(item.price)}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 6 }}>
                    <button onClick={() => onChangeQty(item.id, -1)} style={{ width: 24, height: 24, border: "1px solid #d1d5db", borderRadius: 4, background: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><Minus size={12} /></button>
                    <span style={{ fontSize: 13, fontWeight: 600 }}>{item.qty}</span>
                    <button onClick={() => onChangeQty(item.id, 1)} style={{ width: 24, height: 24, border: "1px solid #d1d5db", borderRadius: 4, background: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><Plus size={12} /></button>
                  </div>
                </div>
                <button onClick={() => onRemove(item.id)} style={{ background: "none", border: "none", color: "#999", cursor: "pointer", fontSize: 18 }}>×</button>
              </div>
            ))}
            <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 800, fontSize: 16, padding: "12px 0", borderTop: "2px solid #e5e7eb" }}>
              <span>Total</span><span style={{ color: "#1a1464" }}>{fmt(subtotal)}</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 4 }}>
              <div style={{ background: "#f0f4ff", borderRadius: 8, padding: "8px", textAlign: "center", fontSize: 10, color: "#1a1464", fontWeight: 600 }}>
                💳 6x de {fmt(subtotal / 6)}
              </div>
              <div style={{ background: "#f0fdf4", borderRadius: 8, padding: "8px", textAlign: "center", fontSize: 10, color: "#059669", fontWeight: 600 }}>
                {freeShipping ? "🚚 Frete grátis!" : "🚚 A partir de R$ 400"}
              </div>
            </div>
            <button onClick={onCheckout} style={{ width: "100%", background: "#1a1464", color: "white", border: "none", borderRadius: 10, padding: "14px", fontSize: 14, fontWeight: 800, cursor: "pointer", marginTop: 12 }}>
              FINALIZAR COMPRA
            </button>
          </>
        )}
      </div>
    </div>
  )
}

// ─── TOAST ───────────────────────────────────────────────────────────────────

const Toast = ({ message, type, onClose }: { message: string; type: string; onClose: () => void }) => {
  useEffect(() => { const t = setTimeout(onClose, 2500); return () => clearTimeout(t) }, [onClose])
  const bg = type === "success" ? "#059669" : type === "error" ? "#dc2626" : "#1a1464"
  return (
    <div style={{ position: "fixed", top: 70, right: 12, background: bg, color: "white", padding: "10px 16px", borderRadius: 10, zIndex: 400, fontSize: 13, fontWeight: 600, boxShadow: "0 4px 16px rgba(0,0,0,0.2)", display: "flex", alignItems: "center", gap: 8, maxWidth: 280 }}>
      <Check size={16} />{message}
    </div>
  )
}

// ─── WHATSAPP FAB ─────────────────────────────────────────────────────────────

const WhatsAppFAB = () => (
  <a href="https://wa.me/551932660789?text=Olá! Gostaria de mais informações."
    target="_blank" rel="noreferrer"
    style={{ position: "fixed", bottom: 20, right: 16, width: 52, height: 52, borderRadius: "50%", background: "#25d366", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 16px rgba(37,211,102,0.5)", zIndex: 200, textDecoration: "none" }}>
    <MessageCircle size={26} color="white" fill="white" />
  </a>
)

// ─── APP ROOT ────────────────────────────────────────────────────────────────

export default function App() {
  const [page, setPage] = useState("home")
  const [cart, setCart] = useState<CartItem[]>([])
  const [cartOpen, setCartOpen] = useState(false)
  const [favorites, setFavorites] = useState<number[]>([])
  const [toast, setToast] = useState<ToastData | null>(null)

  const showToast = useCallback((message: string, type: ToastData["type"] = "success") => setToast({ message, type }), [])

  const addToCart = useCallback((p: Product) => {
    setCart(prev => {
      const ex = prev.find(i => i.id === p.id)
      return ex ? prev.map(i => i.id === p.id ? { ...i, qty: i.qty + 1 } : i) : [...prev, { ...p, qty: 1 }]
    })
    showToast(`${p.name} adicionado!`)
  }, [showToast])

  const addKitToCart = useCallback((name: string, price: number) => {
    const kitProduct: Product = { id: Date.now(), name, price, imageUrl: "", category: "Kits", brand: "Silver", stars: 5 }
    setCart(prev => [...prev, { ...kitProduct, qty: 1 }])
    showToast(`Kit adicionado ao carrinho! 🎉`)
  }, [showToast])

  const toggleFavorite = useCallback((id: number) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id])
  }, [])

  const removeFromCart = useCallback((id: number) => {
    setCart(prev => prev.filter(i => i.id !== id))
    showToast("Removido do carrinho", "error")
  }, [showToast])

  const changeQty = useCallback((id: number, delta: number) => {
    setCart(prev => prev.map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i))
  }, [])

  const cartCount = cart.reduce((s, i) => s + i.qty, 0)
  const goToCategory = (_cat: string) => setPage("produtos")

  return (
    <div style={{ minHeight: "100vh", background: "#f7f8fc", fontFamily: "system-ui, -apple-system, sans-serif", width: "100%" }}>
      <Header cartCount={cartCount} onCartOpen={() => setCartOpen(true)} onGoHome={() => setPage("home")} onGoCor={() => setPage("cor")} currentPage={page} setPage={setPage} />

      {page === "home" && (
        <>
          <HeroCarousel />
          <QuickFeatures setPage={setPage} />
          <CategoriesGrid onCategoryClick={goToCategory} />
          <FeaturedProducts onAdd={addToCart} favorites={favorites} onToggleFavorite={toggleFavorite} />
          <TipsSection />
          <CategorySection onCategoryClick={goToCategory} />
          <StoreBanner />
          <ColorBanner setPage={setPage} />
          <BrandsSection />
          <Footer />
        </>
      )}

      {page === "produtos" && (
        <>
          <ProductsPage onAdd={addToCart} favorites={favorites} onToggleFavorite={toggleFavorite} />
          <Footer />
        </>
      )}

      {page === "cor" && (<><ColorPage /><Footer /></>)}
      {page === "kits" && (<><KitsPage onAddKit={addKitToCart} /><Footer /></>)}
      {page === "calculadora" && (<><CalculatorPage /><Footer /></>)}
      {page === "simulador" && (<><ColorCatalog /><Footer /></>)}
      {page === "entrega" && (<><DeliveryPage /><Footer /></>)}

      <WhatsAppFAB />

      {cartOpen && (
        <CartModal cart={cart} onClose={() => setCartOpen(false)} onRemove={removeFromCart} onChangeQty={changeQty}
          onCheckout={() => {
            setCartOpen(false)
            if (typeof window !== "undefined" && cart.length > 0) {
              localStorage.setItem("silver-cart", JSON.stringify(cart))
              window.location.href = "/checkout"
            }
          }} />
      )}

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  )
}