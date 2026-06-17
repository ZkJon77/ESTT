"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ArrowLeft, CreditCard, QrCode, Receipt, Check, ShoppingBag, Truck } from "lucide-react"

type CartItem = {
  id: number
  name: string
  price: number
  qty: number
  imageUrl: string
}

const fmt = (n: number) => `R$ ${n.toFixed(2).replace(".", ",")}`

// ✅ Formata CEP automaticamente
const formatCep = (value: string) => {
  const digits = value.replace(/\D/g, "").slice(0, 8)
  if (digits.length > 5) return `${digits.slice(0, 5)}-${digits.slice(5)}`
  return digits
}

// ✅ Header extraído para evitar duplicação
function Header({ onBack }: { onBack: () => void }) {
  return (
    <header style={{ background: "#1a1464", padding: "16px", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
      <div className="container mx-auto flex items-center relative">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
        >
          <ArrowLeft size={20} />
          <span className="text-sm font-medium">Voltar para a loja</span>
        </button>
        {/* ✅ Logo centralizada corretamente */}
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2">
          <div style={{ fontFamily: "Georgia, serif", fontStyle: "italic", fontWeight: 900, fontSize: 22, color: "white" }}>
            Silver
          </div>
          <div style={{ fontSize: 8, color: "rgba(255,255,255,0.5)", letterSpacing: 2, textTransform: "uppercase" }}>
            tintas
          </div>
        </div>
      </div>
    </header>
  )
}

export default function CheckoutPage() {
  const router = useRouter()
  const [cart, setCart] = useState<CartItem[]>([])
  const [paymentMethod, setPaymentMethod] = useState("pix")
  const [isProcessing, setIsProcessing] = useState(false)
  const [isFinished, setIsFinished] = useState(false)

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    cep: "",
    address: "",
    number: "",
    complement: "",
    city: "",
    state: "",
  })

  useEffect(() => {
    const savedCart = localStorage.getItem("silver-cart")
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart))
      } catch {
        setCart([])
      }
    }
  }, [])

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0)
  const shipping = subtotal > 300 ? 0 : 25
  const total = subtotal + shipping

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (cart.length === 0) return  // ✅ guarda extra
    setIsProcessing(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsProcessing(false)
    setIsFinished(true)
    localStorage.removeItem("silver-cart")
  }

  if (isFinished) {
    return (
      <div className="min-h-screen flex flex-col" style={{ background: "#1a1464", fontFamily: "system-ui, -apple-system, sans-serif" }}>
        <Header onBack={() => router.push("/")} />
        <div className="flex-1 flex items-center justify-center p-4">
          <Card className="w-full max-w-md border-0 shadow-2xl text-center" style={{ background: "white", borderRadius: 16 }}>
            <CardContent className="pt-10 pb-10 px-6">
              <div className="mx-auto w-20 h-20 rounded-full flex items-center justify-center mb-6" style={{ background: "#ecfdf5" }}>
                <Check className="h-10 w-10" style={{ color: "#059669" }} />
              </div>
              <h1 className="text-2xl font-bold mb-2" style={{ color: "#1a1464" }}>
                Pedido Confirmado!
              </h1>
              <p className="text-muted-foreground mb-8">
                Obrigado pela sua compra. Você receberá um email com os detalhes do pedido.
              </p>
              <Button
                onClick={() => router.push("/")}
                className="w-full h-11 font-bold"
                style={{ background: "#1a1464" }}
              >
                <ShoppingBag className="mr-2 h-5 w-5" />
                Continuar Comprando
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#f7f8fc", fontFamily: "system-ui, -apple-system, sans-serif" }}>
      <Header onBack={() => router.push("/")} />

      <div className="flex-1 container mx-auto p-4 py-8">
        <h1 className="text-2xl font-bold mb-6" style={{ color: "#1a1464" }}>
          Finalizar Compra
        </h1>

        {/* ✅ Aviso de carrinho vazio visível antes do formulário */}
        {cart.length === 0 && (
          <div className="mb-6 p-4 rounded-lg border border-yellow-200 bg-yellow-50 text-yellow-800 text-sm font-medium">
            Seu carrinho está vazio. Adicione produtos antes de finalizar a compra.
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Formulário */}
          <div className="lg:col-span-2 space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Dados Pessoais */}
              <Card className="border-0 shadow-sm" style={{ borderRadius: 12 }}>
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg flex items-center gap-2" style={{ color: "#1a1464" }}>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white" style={{ background: "#1a1464" }}>1</div>
                    Dados Pessoais
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Nome Completo</Label>
                      <Input
                        id="fullName"
                        placeholder="Digite seu nome"
                        value={formData.fullName}
                        onChange={(e) => handleChange("fullName", e.target.value)}
                        required
                        className="h-11"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="seu@email.com"
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        required
                        className="h-11"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="(19) 99999-9999"
                      value={formData.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      required
                      className="h-11"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Endereço */}
              <Card className="border-0 shadow-sm" style={{ borderRadius: 12 }}>
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg flex items-center gap-2" style={{ color: "#1a1464" }}>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white" style={{ background: "#1a1464" }}>2</div>
                    Endereço de Entrega
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2 md:col-span-1">
                      <Label htmlFor="cep">CEP</Label>
                      <Input
                        id="cep"
                        placeholder="00000-000"
                        value={formData.cep}
                        // ✅ Formata CEP automaticamente
                        onChange={(e) => handleChange("cep", formatCep(e.target.value))}
                        required
                        className="h-11"
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="address">Endereço</Label>
                      <Input
                        id="address"
                        placeholder="Rua, Avenida, etc."
                        value={formData.address}
                        onChange={(e) => handleChange("address", e.target.value)}
                        required
                        className="h-11"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="number">Número</Label>
                      <Input
                        id="number"
                        placeholder="123"
                        value={formData.number}
                        onChange={(e) => handleChange("number", e.target.value)}
                        required
                        className="h-11"
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="complement">Complemento</Label>
                      <Input
                        id="complement"
                        placeholder="Apto, Bloco, etc."
                        value={formData.complement}
                        onChange={(e) => handleChange("complement", e.target.value)}
                        className="h-11"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">Cidade</Label>
                      <Input
                        id="city"
                        placeholder="Campinas"
                        value={formData.city}
                        onChange={(e) => handleChange("city", e.target.value)}
                        required
                        className="h-11"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">Estado</Label>
                      <Input
                        id="state"
                        placeholder="SP"
                        maxLength={2}
                        value={formData.state}
                        onChange={(e) => handleChange("state", e.target.value.toUpperCase())}
                        required
                        className="h-11"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Pagamento */}
              <Card className="border-0 shadow-sm" style={{ borderRadius: 12 }}>
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg flex items-center gap-2" style={{ color: "#1a1464" }}>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white" style={{ background: "#1a1464" }}>3</div>
                    Forma de Pagamento
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3">
                    {[
                      { value: "pix", icon: <QrCode className="h-5 w-5" style={{ color: "#1a1464" }} />, label: "PIX", sub: "Pagamento instantâneo" },
                      { value: "card", icon: <CreditCard className="h-5 w-5" style={{ color: "#1a1464" }} />, label: "Cartão de Crédito", sub: "Parcele em até 12x" },
                      { value: "boleto", icon: <Receipt className="h-5 w-5" style={{ color: "#1a1464" }} />, label: "Boleto Bancário", sub: "Vencimento em 3 dias úteis" },
                    ].map((opt) => (
                      <div key={opt.value} className="flex items-center space-x-3 rounded-lg border p-4 cursor-pointer hover:bg-gray-50 transition-colors">
                        <RadioGroupItem value={opt.value} id={opt.value} />
                        <Label htmlFor={opt.value} className="flex items-center gap-3 cursor-pointer flex-1">
                          <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: "#dbeafe" }}>
                            {opt.icon}
                          </div>
                          <div>
                            <p className="font-semibold text-sm">{opt.label}</p>
                            <p className="text-xs text-muted-foreground">{opt.sub}</p>
                          </div>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </CardContent>
              </Card>

              <Button
                type="submit"
                disabled={isProcessing || cart.length === 0}
                className="w-full h-14 font-bold text-lg"
                style={{ background: "#1a1464" }}
              >
                {isProcessing ? (
                  <>
                    <div className="mr-2 h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Processando...
                  </>
                ) : (
                  <>
                    <Check className="mr-2 h-5 w-5" />
                    Confirmar Pedido — {fmt(total)}
                  </>
                )}
              </Button>
            </form>
          </div>

          {/* Resumo */}
          <div>
            <Card className="border-0 shadow-sm sticky top-4" style={{ borderRadius: 12 }}>
              <CardHeader className="pb-4">
                <CardTitle className="text-lg flex items-center gap-2" style={{ color: "#1a1464" }}>
                  <ShoppingBag className="h-5 w-5" />
                  Resumo do Pedido
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {cart.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-4">Seu carrinho está vazio</p>
                ) : (
                  <>
                    <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                      {cart.map((item) => (
                        <div key={item.id} className="flex items-center gap-3">
                          {/* ✅ fallback se imagem falhar */}
                          <img
                            src={item.imageUrl}
                            alt={item.name}
                            className="w-12 h-12 object-contain rounded-md bg-gray-50"
                            onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder.png" }}
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{item.name}</p>
                            <p className="text-xs text-muted-foreground">Qtd: {item.qty}</p>
                          </div>
                          <p className="text-sm font-semibold whitespace-nowrap" style={{ color: "#1a1464" }}>
                            {fmt(item.price * item.qty)}
                          </p>
                        </div>
                      ))}
                    </div>
                    <Separator />
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span className="font-medium">{fmt(subtotal)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground flex items-center gap-1">
                          <Truck className="h-3.5 w-3.5" /> Entrega
                        </span>
                        <span className="font-medium">{shipping === 0 ? "Grátis" : fmt(shipping)}</span>
                      </div>
                      {shipping === 0 && (
                        <p className="text-xs" style={{ color: "#059669" }}>Você ganhou frete grátis!</p>
                      )}
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-base">Total</span>
                      <span className="font-bold text-xl" style={{ color: "#1a1464" }}>{fmt(total)}</span>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}