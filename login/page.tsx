"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Eye, EyeOff, LogIn, UserPlus } from "lucide-react"

// ─── TIPOS ────────────────────────────────────────────────────────────────────

type Mode = "login" | "register"

interface FormState {
  email: string
  password: string
  confirmPassword: string
}

// ─── CONSTANTES ───────────────────────────────────────────────────────────────

const INITIAL_FORM: FormState = { email: "", password: "", confirmPassword: "" }

const BRAND = {
  title: "Silver",
  subtitle: "TINTAS",
  color: "#1a1464",
  year: 2026,
  city: "Campinas, SP",
}

// ─── COMPONENTES AUXILIARES ───────────────────────────────────────────────────

const Field = ({
  id, label, type, placeholder, value, onChange, required = true,
}: {
  id: string
  label: string
  type: string
  placeholder: string
  value: string
  onChange: (v: string) => void
  required?: boolean
}) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
    <label htmlFor={id} style={{ fontSize: 13, fontWeight: 600, color: "#374151" }}>
      {label}
    </label>
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={e => onChange(e.target.value)}
      required={required}
      style={{
        height: 44, padding: "0 14px", borderRadius: 8,
        border: "1px solid #d1d5db", fontSize: 14, outline: "none",
        transition: "border-color 0.2s",
      }}
      onFocus={e => (e.target.style.borderColor = BRAND.color)}
      onBlur={e => (e.target.style.borderColor = "#d1d5db")}
    />
  </div>
)

// ─── LOGIN PAGE ───────────────────────────────────────────────────────────────

export default function LoginPage() {
  const router = useRouter()
  const [mode, setMode] = useState<Mode>("login")
  const [form, setForm] = useState<FormState>(INITIAL_FORM)
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const isRegister = mode === "register"

  const set = (field: keyof FormState) => (value: string) => {
    setForm(prev => ({ ...prev, [field]: value }))
    setError("")
  }

  const switchMode = () => {
    setMode(m => m === "login" ? "register" : "login")
    setForm(INITIAL_FORM)
    setError("")
  }

  const validate = (): string => {
    if (!form.email.includes("@")) return "Email inválido."
    if (form.password.length < 6) return "Senha deve ter no mínimo 6 caracteres."
    if (isRegister && form.password !== form.confirmPassword) return "As senhas não conferem."
    return ""
  }

  const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:4000"

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const err = validate()
    if (err) {
      setError(err)
      return
    }

    setLoading(true)
    try {
      const endpoint = isRegister ? "/api/auth/register" : "/api/auth/login"
      const res = await fetch(`${API_BASE}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
        }),
      })

      const data = await res.json().catch(() => ({}))

      if (!res.ok) {
        const msg = data?.error || data?.message || "Falha ao autenticar."
        setError(msg)
        return
      }

      if (!isRegister && data?.token) {
        localStorage.setItem("silver-token", data.token)
      }

      // No cadastro: redireciona para home (pode depois ajustar para auto-login)
      setLoading(false)
      router.push("/")
    } catch {
      setLoading(false)
      setError("Erro de conexão com o servidor.")
    }
  }

  return (
    <div style={{
      minHeight: "100vh", display: "flex", flexDirection: "column",
      background: BRAND.color, fontFamily: "system-ui, -apple-system, sans-serif",
    }}>

      {/* Header */}
      <header style={{ padding: "16px 24px", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
        <div style={{ maxWidth: 480, margin: "0 auto", display: "flex", alignItems: "center", position: "relative" }}>
          <button
            onClick={() => router.push("/")}
            style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", color: "rgba(255,255,255,0.8)", cursor: "pointer", fontSize: 13, fontWeight: 500 }}
          >
            <ArrowLeft size={18} /> Voltar para a loja
          </button>
          <div style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", display: "flex", alignItems: "baseline", gap: 4 }}>
            <span style={{ fontFamily: "Georgia, serif", fontStyle: "italic", fontWeight: 900, fontSize: 22, color: "white" }}>
              {BRAND.title}
            </span>
            <span style={{ fontSize: 8, color: "rgba(255,255,255,0.5)", letterSpacing: 2, textTransform: "uppercase" }}>
              {BRAND.subtitle}
            </span>
          </div>
        </div>
      </header>

      {/* Card */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
        <div style={{
          width: "100%", maxWidth: 420, background: "white",
          borderRadius: 20, boxShadow: "0 20px 60px rgba(0,0,0,0.3)", overflow: "hidden",
        }}>

          {/* Card header */}
          <div style={{ padding: "32px 32px 24px", textAlign: "center", borderBottom: "1px solid #f3f4f6" }}>
            <div style={{
              width: 48, height: 48, borderRadius: "50%", background: BRAND.color,
              display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px",
            }}>
              {isRegister ? <UserPlus size={22} color="white" /> : <LogIn size={22} color="white" />}
            </div>
            <h1 style={{ fontSize: 22, fontWeight: 800, color: BRAND.color, margin: "0 0 6px" }}>
              {isRegister ? "Criar Conta" : "Entrar"}
            </h1>
            <p style={{ fontSize: 13, color: "#6b7280", margin: 0 }}>
              {isRegister ? "Preencha seus dados para se cadastrar" : "Acesse sua conta Silver Tintas"}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ padding: "24px 32px 28px", display: "flex", flexDirection: "column", gap: 16 }}>

            <Field id="email" label="Email" type="email" placeholder="seu@email.com"
              value={form.email} onChange={set("email")} />

            {/* Senha com toggle */}
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label htmlFor="password" style={{ fontSize: 13, fontWeight: 600, color: "#374151" }}>Senha</label>
              <div style={{ position: "relative" }}>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={form.password}
                  onChange={e => set("password")(e.target.value)}
                  required
                  style={{
                    width: "100%", height: 44, padding: "0 44px 0 14px", borderRadius: 8,
                    border: "1px solid #d1d5db", fontSize: 14, outline: "none", boxSizing: "border-box",
                  }}
                  onFocus={e => (e.target.style.borderColor = BRAND.color)}
                  onBlur={e => (e.target.style.borderColor = "#d1d5db")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(v => !v)}
                  style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#9ca3af" }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {isRegister && (
              <Field id="confirmPassword" label="Confirmar Senha" type="password" placeholder="••••••••"
                value={form.confirmPassword} onChange={set("confirmPassword")} />
            )}

            {/* Erro */}
            {error && (
              <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 8, padding: "10px 14px", fontSize: 12, color: "#dc2626", fontWeight: 600 }}>
                ⚠️ {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              style={{
                height: 46, borderRadius: 10, border: "none",
                background: loading ? "#6b7280" : BRAND.color,
                color: "white", fontSize: 14, fontWeight: 700,
                cursor: loading ? "not-allowed" : "pointer",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                transition: "opacity 0.2s",
              }}
            >
              {loading ? "Aguarde..." : isRegister ? <><UserPlus size={16} /> Cadastrar</> : <><LogIn size={16} /> Entrar</>}
            </button>

            {/* Switch mode */}
            <p style={{ textAlign: "center", fontSize: 13, color: "#6b7280", margin: 0 }}>
              {isRegister ? "Já tem uma conta?" : "Ainda não tem conta?"}{" "}
              <button
                type="button"
                onClick={switchMode}
                style={{ background: "none", border: "none", color: BRAND.color, fontWeight: 700, cursor: "pointer", fontSize: 13 }}
              >
                {isRegister ? "Fazer login" : "Cadastre-se"}
              </button>
            </p>
          </form>
        </div>
      </div>

      {/* Footer */}
      <footer style={{ textAlign: "center", padding: "16px", fontSize: 11, color: "rgba(255,255,255,0.3)" }}>
        © {BRAND.year} Silver Tintas — {BRAND.city}
      </footer>
    </div>
  )
}