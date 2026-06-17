"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, LogIn, UserPlus, Eye, EyeOff, AlertCircle, CheckCircle2 } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isRegistering, setIsRegistering] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [errors, setErrors] = useState<{ email?: string; password?: string; confirmPassword?: string }>({})
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const validate = () => {
    const newErrors: typeof errors = {}

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Insira um e-mail válido."
    }
    if (!password || password.length < 6) {
      newErrors.password = "A senha deve ter pelo menos 6 caracteres."
    }
    if (isRegistering && password !== confirmPassword) {
      newErrors.confirmPassword = "As senhas não conferem."
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setIsLoading(true)
    // Simula chamada de API
    await new Promise((r) => setTimeout(r, 1200))
    setIsLoading(false)
    setSuccess(true)
    await new Promise((r) => setTimeout(r, 800))
    router.push("/")
  }

  const switchMode = () => {
    setIsRegistering(!isRegistering)
    setErrors({})
    setPassword("")
    setConfirmPassword("")
    setSuccess(false)
  }

  const passwordStrength = (pw: string) => {
    if (!pw) return null
    if (pw.length < 6) return { level: 1, label: "Fraca", color: "#ef4444" }
    if (pw.length < 10 || !/[A-Z]/.test(pw) || !/[0-9]/.test(pw)) return { level: 2, label: "Média", color: "#f59e0b" }
    return { level: 3, label: "Forte", color: "#22c55e" }
  }

  const strength = isRegistering ? passwordStrength(password) : null

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      background: "linear-gradient(135deg, #0f0c3a 0%, #1a1464 50%, #22197a 100%)",
      fontFamily: "'Georgia', serif",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Decorative background blobs */}
      <div style={{
        position: "absolute", top: -120, right: -120,
        width: 400, height: 400, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: -80, left: -80,
        width: 340, height: 340, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(139,92,246,0.13) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* Header */}
      <header style={{
        padding: "18px 24px",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        backdropFilter: "blur(8px)",
        position: "relative",
        zIndex: 10,
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", position: "relative" }}>
          <button
            onClick={() => router.push("/")}
            style={{
              display: "flex", alignItems: "center", gap: 8,
              color: "rgba(255,255,255,0.65)", background: "none", border: "none",
              cursor: "pointer", fontSize: 14, fontFamily: "system-ui, sans-serif",
              transition: "color 0.2s",
            }}
            onMouseEnter={e => (e.currentTarget.style.color = "white")}
            onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.65)")}
          >
            <ArrowLeft size={18} />
            Voltar para a loja
          </button>

          {/* Logo centrada */}
          <div style={{
            position: "absolute", left: "50%", transform: "translateX(-50%)",
            display: "flex", alignItems: "baseline", gap: 6,
          }}>
            <span style={{ fontFamily: "Georgia, serif", fontStyle: "italic", fontWeight: 900, fontSize: 24, color: "white", letterSpacing: "-0.5px" }}>
              Silver
            </span>
            <span style={{ fontSize: 9, color: "rgba(255,255,255,0.45)", letterSpacing: 3, textTransform: "uppercase", fontFamily: "system-ui, sans-serif" }}>
              tintas
            </span>
          </div>
        </div>
      </header>

      {/* Conteúdo principal */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "32px 16px", position: "relative", zIndex: 10 }}>
        <div style={{
          width: "100%", maxWidth: 440,
          background: "rgba(255,255,255,0.97)",
          borderRadius: 20,
          boxShadow: "0 32px 64px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.08)",
          overflow: "hidden",
        }}>
          {/* Barra de cor no topo */}
          <div style={{ height: 5, background: "linear-gradient(90deg, #1a1464, #4f46e5, #7c3aed)" }} />

          <div style={{ padding: "40px 40px 36px" }}>
            {/* Ícone + Título */}
            <div style={{ textAlign: "center", marginBottom: 32 }}>
              <div style={{
                width: 52, height: 52, borderRadius: "50%", background: "#1a1464",
                display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 16px",
                boxShadow: "0 8px 20px rgba(26,20,100,0.35)",
              }}>
                {isRegistering
                  ? <UserPlus size={24} color="white" />
                  : <LogIn size={24} color="white" />}
              </div>
              <h1 style={{ fontSize: 24, fontWeight: 800, color: "#1a1464", margin: 0, fontFamily: "Georgia, serif" }}>
                {isRegistering ? "Criar Conta" : "Bem-vindo de volta"}
              </h1>
              <p style={{ color: "#6b7280", fontSize: 14, margin: "6px 0 0", fontFamily: "system-ui, sans-serif" }}>
                {isRegistering
                  ? "Preencha seus dados para começar"
                  : "Entre na sua conta Silver Tintas"}
              </p>
            </div>

            <form onSubmit={handleSubmit} noValidate>
              {/* Campo Email */}
              <Field label="E-mail" error={errors.email}>
                <input
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setErrors(p => ({ ...p, email: undefined })) }}
                  required
                  style={inputStyle(!!errors.email)}
                />
              </Field>

              {/* Campo Senha */}
              <Field label="Senha" error={errors.password} style={{ marginTop: 16 }}>
                <div style={{ position: "relative" }}>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setErrors(p => ({ ...p, password: undefined })) }}
                    required
                    style={{ ...inputStyle(!!errors.password), paddingRight: 44 }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#9ca3af", padding: 4 }}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {/* Indicador de força */}
                {strength && (
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 6 }}>
                    <div style={{ flex: 1, height: 4, borderRadius: 99, background: "#e5e7eb", overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${(strength.level / 3) * 100}%`, background: strength.color, borderRadius: 99, transition: "width 0.3s, background 0.3s" }} />
                    </div>
                    <span style={{ fontSize: 11, color: strength.color, fontFamily: "system-ui, sans-serif", fontWeight: 600, minWidth: 36 }}>{strength.label}</span>
                  </div>
                )}
              </Field>

              {/* Confirmar senha (só no cadastro) */}
              {isRegistering && (
                <Field label="Confirmar Senha" error={errors.confirmPassword} style={{ marginTop: 16 }}>
                  <div style={{ position: "relative" }}>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => { setConfirmPassword(e.target.value); setErrors(p => ({ ...p, confirmPassword: undefined })) }}
                      required
                      style={{ ...inputStyle(!!errors.confirmPassword), paddingRight: 44 }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#9ca3af", padding: 4 }}
                    >
                      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                    {/* Check de match */}
                    {confirmPassword && password === confirmPassword && (
                      <div style={{ position: "absolute", right: 44, top: "50%", transform: "translateY(-50%)" }}>
                        <CheckCircle2 size={16} color="#22c55e" />
                      </div>
                    )}
                  </div>
                </Field>
              )}

              {/* Esqueci a senha (só no login) */}
              {!isRegistering && (
                <div style={{ textAlign: "right", marginTop: 6 }}>
                  <button type="button" style={{ background: "none", border: "none", color: "#1a1464", fontSize: 13, cursor: "pointer", fontFamily: "system-ui, sans-serif", textDecoration: "underline", opacity: 0.7 }}>
                    Esqueci minha senha
                  </button>
                </div>
              )}

              {/* Botão principal */}
              <button
                type="submit"
                disabled={isLoading || success}
                style={{
                  width: "100%", height: 48, marginTop: 24,
                  background: success ? "#22c55e" : "linear-gradient(135deg, #1a1464, #4f46e5)",
                  color: "white", border: "none", borderRadius: 10,
                  fontSize: 15, fontWeight: 700, fontFamily: "system-ui, sans-serif",
                  cursor: isLoading || success ? "not-allowed" : "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                  transition: "opacity 0.2s, transform 0.1s, background 0.3s",
                  opacity: isLoading ? 0.85 : 1,
                  boxShadow: "0 4px 16px rgba(26,20,100,0.3)",
                }}
                onMouseEnter={e => { if (!isLoading && !success) e.currentTarget.style.opacity = "0.9" }}
                onMouseLeave={e => { e.currentTarget.style.opacity = "1" }}
              >
                {success ? (
                  <><CheckCircle2 size={20} /> Sucesso!</>
                ) : isLoading ? (
                  <><Spinner /> {isRegistering ? "Criando conta..." : "Entrando..."}</>
                ) : isRegistering ? (
                  <><UserPlus size={18} /> Cadastrar</>
                ) : (
                  <><LogIn size={18} /> Entrar</>
                )}
              </button>
            </form>

            {/* Divisor */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "24px 0" }}>
              <div style={{ flex: 1, height: 1, background: "#e5e7eb" }} />
              <span style={{ color: "#9ca3af", fontSize: 12, fontFamily: "system-ui, sans-serif" }}>ou</span>
              <div style={{ flex: 1, height: 1, background: "#e5e7eb" }} />
            </div>

            {/* Trocar modo */}
            <p style={{ textAlign: "center", color: "#6b7280", fontSize: 14, margin: 0, fontFamily: "system-ui, sans-serif" }}>
              {isRegistering ? "Já tem uma conta?" : "Ainda não tem conta?"}{" "}
              <button
                type="button"
                onClick={switchMode}
                style={{ background: "none", border: "none", color: "#1a1464", fontWeight: 700, cursor: "pointer", fontSize: 14, fontFamily: "system-ui, sans-serif" }}
              >
                {isRegistering ? "Fazer login" : "Cadastre-se"}
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer style={{ textAlign: "center", padding: "16px", color: "rgba(255,255,255,0.3)", fontSize: 12, fontFamily: "system-ui, sans-serif", position: "relative", zIndex: 10 }}>
        © 2026 Silver Tintas — Campinas, SP
      </footer>
    </div>
  )
}

// ─── Helpers ────────────────────────────────────────────────────────────────

function Field({ label, error, children, style }: { label: string; error?: string; children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6, ...style }}>
      <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", fontFamily: "system-ui, sans-serif" }}>{label}</label>
      {children}
      {error && (
        <div style={{ display: "flex", alignItems: "center", gap: 5, color: "#ef4444", fontSize: 12, fontFamily: "system-ui, sans-serif" }}>
          <AlertCircle size={13} />
          {error}
        </div>
      )}
    </div>
  )
}

function inputStyle(hasError: boolean): React.CSSProperties {
  return {
    width: "100%",
    height: 44,
    padding: "0 14px",
    borderRadius: 10,
    border: `1.5px solid ${hasError ? "#ef4444" : "#d1d5db"}`,
    fontSize: 14,
    fontFamily: "system-ui, sans-serif",
    color: "#111827",
    background: hasError ? "#fff5f5" : "white",
    outline: "none",
    transition: "border-color 0.2s, box-shadow 0.2s",
    boxSizing: "border-box",
  }
}

function Spinner() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ animation: "spin 0.8s linear infinite" }}>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="3" />
      <path d="M12 2a10 10 0 0 1 10 10" stroke="white" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}