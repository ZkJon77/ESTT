"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Check, CreditCard, QrCode, Receipt, ShoppingBag, Truck } from "lucide-react"

// ─── TIPOS ────────────────────────────────────────────────────────────────────

type CartItem = {
  id: number
  name: string
  price: number
  qty: number
  imageUrl: string
}

type PaymentMethod = "pix" | "card" | "boleto"

type FormData = {
  fullName: string
  email: string
  phone: string
  cep: string
  address: string
  number: string
  complement: string
  city: string
  state: string
}

// ─── CONSTANTES ───────────────────────────────────────────────────────────────

const BRAND_COLOR = "#1a1464"
const INITIAL_FORM: FormData = {
  fullName: "", email: "", phone: "",
  cep: "", address: "", number: "", complement: "", city: "", state: "",
}

const PAYMENT_OPTIONS = [
  { value: "pix" as PaymentMethod, icon: <QrCode size={20} color={BRAND_COLOR} />, label: "PIX", sub: "Pagamento instantâneo" },
  { value: "card" as PaymentMethod, icon: <CreditCard size={20} color={BRAND_COLOR} />, label: "Cartão de Crédito", sub: "Parcele em até 12x" },
  { value: "boleto" as PaymentMethod, icon: <Receipt size={20} color={BRAND_COLOR} />, label: "Boleto Bancário", sub: "Vencimento em 3 dias úteis" },
]

// ─── HELPERS ──────────────────────────────────────────────────────────────────

const fmt = (n: number) => `R$ ${n.toFixed(2).replace(".", ",")}`

const formatCep = (v: string) => {
  const d = v.replace(/\D/g, "").slice(0, 8)
  return d.length > 5 ? `${d.slice(0, 5)}-${d.slice(5)}` : d
}

const formatPhone = (v: string) => {
  const d = v.replace(/\D/g, "").slice(0, 11)
  if (d.length > 6) return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`
  if (d.length > 2) return `(${d.slice(0, 2)}) ${d.slice(2)}`
  return d
}

// ─── COMPONENTES AUXILIARES ───────────────────────────────────────────────────

const Header = ({ onBack }: { onBack: () => void }) => (
  <header style={{ background: BRAND_COLOR, padding: "16px 24px", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
    <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", position: "relative" }}>
      <button onClick={onBack}
        style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", color: "rgba(255,255,255,0.8)", cursor: "pointer", fontSize: 13, fontWeight: 500 }}>
        <ArrowLeft size={18} /> Voltar para a loja
      </button>
      <div style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", display: "flex", alignItems: "baseline", gap: 4 }}>
        <span style={{ fontFamily: "Georgia, serif", fontStyle: "italic", fontWeight: 900, fontSize: 22, color: "white" }}>Silver</span>
        <span style={{ fontSize: 8, color: "rgba(255,255,255,0.5)", letterSpacing: 2, textTransform: "uppercase" }}>tintas</span>
      </div>
    </div>
  </header>
)

const SectionCard = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: "white", borderRadius: 14, padding: 24, boxShadow: "0 1px 8px rgba(0,0,0,0.06)" }}>
    {children}
  </div>
)

const SectionTitle = ({ step, children }: { step: number; children: React.ReactNode }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
    <div style={{ width: 30, height: 30, borderRadius: "50%", background: BRAND_COLOR, color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800, flexShrink: 0 }}>
      {step}
    </div>
    <span style={{ fontSize: 16, fontWeight: 800, color: BRAND_COLOR }}>{children}</span>
  </div>
)

const Field = ({
  label, id, type = "text", placeholder, value, onChange, required = true, maxLength,
}: {
  label: string; id: string; type?: string; placeholder: string
  value: string; onChange: (v: string) => void; required?: boolean; maxLength?: number
}) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
    <label htmlFor={id} style={{ fontSize: 12, fontWeight: 600, color: "#374151" }}>{label}</label>
    <input
      id={id} type={type} placeholder={placeholder} value={value} required={required} maxLength={maxLength}
      onChange={e => onChange(e.target.value)}
      style={{ height: 44, padding: "0 14px", borderRadius: 8, border: "1px solid #d1d5db", fontSize: 14, outline: "none", boxSizing: "border-box", width: "100%" }}
      onFocus={e => (e.target.style.borderColor = BRAND_COLOR)}
      onBlur={e => (e.target.style.borderColor = "#d1d5db")}
    />
  </div>
)

// ─── SUCCESS SCREEN ───────────────────────────────────────────────────────────

const SuccessScreen = ({ onBack }: { onBack: () => void }) => (
  <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: BRAND_COLOR, fontFamily: "system-ui, sans-serif" }}>
    <Header onBack={onBack} />
    <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ background: "white", borderRadius: 20, padding: "48px 40px", maxWidth: 420, width: "100%", textAlign: "center", boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>
        <div style={{ width: 80, height: 80, borderRadius: "50%", background: "#ecfdf5", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
          <Check size={40} color="#059669" />
        </div>
        <h1 style={{ fontSize: 24, fontWeight: 800, color: BRAND_COLOR, marginBottom: 10 }}>Pedido Confirmado!</h1>
        <p style={{ fontSize: 14, color: "#6b7280", marginBottom: 32 }}>
          Obrigado pela sua compra. Você receberá um email com os detalhes do pedido.
        </p>
        <button onClick={onBack}
          style={{ width: "100%", height: 46, borderRadius: 10, border: "none", background: BRAND_COLOR, color: "white", fontSize: 14, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
          <ShoppingBag size={18} /> Continuar Comprando
        </button>
      </div>
    </div>
  </div>
)

// ─── CHECKOUT PAGE ────────────────────────────────────────────────────────────

export default function CheckoutPage() {
  const router = useRouter()
  const [cart, setCart] = useState<CartItem[]>([])
  const [payment, setPayment] = useState<PaymentMethod>("pix")
  const [form, setForm] = useState<FormData>(INITIAL_FORM)
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  useEffect(() => {
    try {
      const saved = localStorage.getItem("silver-cart")
      if (saved) setCart(JSON.parse(saved))
    } catch { setCart([]) }
  }, [])

  const set = (field: keyof FormData) => (value: string) =>
    setForm(prev => ({ ...prev, [field]: value }))

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0)
  const shipping = subtotal > 300 ? 0 : 25
  const total = subtotal + shipping

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (cart.length === 0) return
    setLoading(true)
    await new Promise(r => setTimeout(r, 2000))
    localStorage.removeItem("silver-cart")
    setLoading(false)
    setDone(true)
  }

  if (done) return <SuccessScreen onBack={() => router.push("/")} />

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "#f7f8fc", fontFamily: "system-ui, sans-serif" }}>
      <Header onBack={() => router.push("/")} />

      <div style={{ flex: 1, maxWidth: 1100, margin: "0 auto", width: "100%", padding: "32px 16px" }}>
        <h1 style={{ fontSize: 24, fontWeight: 800, color: BRAND_COLOR, marginBottom: 24 }}>Finalizar Compra</h1>

        {cart.length === 0 && (
          <div style={{ background: "#fffbeb", border: "1px solid #fcd34d", borderRadius: 10, padding: "12px 16px", fontSize: 13, color: "#78350f", fontWeight: 600, marginBottom: 20 }}>
            ⚠️ Seu carrinho está vazio. Adicione produtos antes de finalizar.
          </div>
        )}

        <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 24, alignItems: "start" }}>

          {/* ── Formulário ── */}
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>

            {/* 1. Dados pessoais */}
            <SectionCard>
              <SectionTitle step={1}>Dados Pessoais</SectionTitle>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
                <Field id="fullName" label="Nome Completo" placeholder="Seu nome" value={form.fullName} onChange={set("fullName")} />
                <Field id="email" label="Email" type="email" placeholder="seu@email.com" value={form.email} onChange={set("email")} />
              </div>
              <Field id="phone" label="Telefone" type="tel" placeholder="(19) 99999-9999"
                value={form.phone} onChange={v => set("phone")(formatPhone(v))} />
            </SectionCard>

            {/* 2. Endereço */}
            <SectionCard>
              <SectionTitle step={2}>Endereço de Entrega</SectionTitle>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 14, marginBottom: 14 }}>
                <Field id="cep" label="CEP" placeholder="00000-000"
                  value={form.cep} onChange={v => set("cep")(formatCep(v))} />
                <Field id="address" label="Endereço" placeholder="Rua, Avenida..." value={form.address} onChange={set("address")} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 14, marginBottom: 14 }}>
                <Field id="number" label="Número" placeholder="123" value={form.number} onChange={set("number")} />
                <Field id="complement" label="Complemento" placeholder="Apto, Bloco..." value={form.complement} onChange={set("complement")} required={false} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <Field id="city" label="Cidade" placeholder="Campinas" value={form.city} onChange={set("city")} />
                <Field id="state" label="Estado" placeholder="SP" maxLength={2}
                  value={form.state} onChange={v => set("state")(v.toUpperCase())} />
              </div>
            </SectionCard>

            {/* 3. Pagamento */}
            <SectionCard>
              <SectionTitle step={3}>Forma de Pagamento</SectionTitle>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {PAYMENT_OPTIONS.map(opt => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setPayment(opt.value)}
                    style={{
                      display: "flex", alignItems: "center", gap: 14,
                      padding: "14px 16px", borderRadius: 10, cursor: "pointer", textAlign: "left",
                      border: payment === opt.value ? `2px solid ${BRAND_COLOR}` : "1px solid #e5e7eb",
                      background: payment === opt.value ? "#eef2ff" : "white",
                      transition: "all 0.2s",
                    }}>
                    <div style={{ width: 40, height: 40, borderRadius: 10, background: "#dbeafe", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      {opt.icon}
                    </div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: "#111" }}>{opt.label}</div>
                      <div style={{ fontSize: 11, color: "#6b7280", marginTop: 2 }}>{opt.sub}</div>
                    </div>
                    <div style={{ marginLeft: "auto", width: 18, height: 18, borderRadius: "50%", border: `2px solid ${payment === opt.value ? BRAND_COLOR : "#d1d5db"}`, background: payment === opt.value ? BRAND_COLOR : "white", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {payment === opt.value && <div style={{ width: 7, height: 7, borderRadius: "50%", background: "white" }} />}
                    </div>
                  </button>
                ))}
              </div>
            </SectionCard>

            {/* Botão confirmar */}
            <button
              type="submit"
              disabled={loading || cart.length === 0}
              style={{
                height: 54, borderRadius: 12, border: "none",
                background: loading || cart.length === 0 ? "#9ca3af" : BRAND_COLOR,
                color: "white", fontSize: 16, fontWeight: 800,
                cursor: loading || cart.length === 0 ? "not-allowed" : "pointer",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
              }}>
              {loading
                ? <><div style={{ width: 20, height: 20, borderRadius: "50%", border: "2px solid rgba(255,255,255,0.4)", borderTopColor: "white", animation: "spin 0.8s linear infinite" }} /> Processando...</>
                : <><Check size={20} /> Confirmar Pedido — {fmt(total)}</>
              }
            </button>
          </form>

          {/* ── Resumo ── */}
          <div style={{ position: "sticky", top: 16 }}>
            <SectionCard>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
                <ShoppingBag size={18} color={BRAND_COLOR} />
                <span style={{ fontSize: 16, fontWeight: 800, color: BRAND_COLOR }}>Resumo do Pedido</span>
              </div>

              {cart.length === 0 ? (
                <p style={{ fontSize: 13, color: "#9ca3af", textAlign: "center", padding: "20px 0" }}>Carrinho vazio</p>
              ) : (
                <>
                  <div style={{ display: "flex", flexDirection: "column", gap: 12, maxHeight: 260, overflowY: "auto", marginBottom: 16 }}>
                    {cart.map(item => (
                      <div key={item.id} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <img
                          src={item.imageUrl} alt={item.name}
                          onError={e => ((e.target as HTMLImageElement).src = "/placeholder.png")}
                          style={{ width: 48, height: 48, objectFit: "contain", borderRadius: 8, background: "#f3f4f6", flexShrink: 0 }}
                        />
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: 13, fontWeight: 600, color: "#111", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.name}</div>
                          <div style={{ fontSize: 11, color: "#9ca3af" }}>Qtd: {item.qty}</div>
                        </div>
                        <div style={{ fontSize: 13, fontWeight: 700, color: BRAND_COLOR, flexShrink: 0 }}>{fmt(item.price * item.qty)}</div>
                      </div>
                    ))}
                  </div>

                  <div style={{ borderTop: "1px solid #f3f4f6", paddingTop: 14, display: "flex", flexDirection: "column", gap: 10 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#6b7280" }}>
                      <span>Subtotal</span><span style={{ fontWeight: 600, color: "#111" }}>{fmt(subtotal)}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#6b7280", alignItems: "center" }}>
                      <span style={{ display: "flex", alignItems: "center", gap: 4 }}><Truck size={13} /> Entrega</span>
                      <span style={{ fontWeight: 600, color: shipping === 0 ? "#059669" : "#111" }}>{shipping === 0 ? "Grátis 🎉" : fmt(shipping)}</span>
                    </div>
                    {shipping === 0 && (
                      <div style={{ fontSize: 11, color: "#059669", background: "#f0fdf4", borderRadius: 6, padding: "6px 10px" }}>
                        ✅ Frete grátis em compras acima de R$ 300,00
                      </div>
                    )}
                    <div style={{ borderTop: "1px solid #f3f4f6", paddingTop: 12, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: 15, fontWeight: 800, color: "#111" }}>Total</span>
                      <span style={{ fontSize: 20, fontWeight: 900, color: BRAND_COLOR }}>{fmt(total)}</span>
                    </div>
                  </div>
                </>
              )}
            </SectionCard>
          </div>
        </div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  )
}