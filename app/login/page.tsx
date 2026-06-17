"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, LogIn, UserPlus } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")  // ✅ estado controlado
  const [isRegistering, setIsRegistering] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // ✅ Validação de senha ao cadastrar
    if (isRegistering && password !== confirmPassword) {
      alert("As senhas não conferem!")
      return
    }

    alert(isRegistering ? "Conta criada com sucesso!" : "Login realizado com sucesso!")
    router.push("/")
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#1a1464", fontFamily: "system-ui, -apple-system, sans-serif" }}>
      {/* Header */}
      <header style={{ background: "#1a1464", padding: "16px", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
        {/* ✅ Layout corrigido: relative + absolute para centralizar a logo */}
        <div className="container mx-auto flex items-center relative">
          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="text-sm font-medium">Voltar para a loja</span>
          </button>
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

      {/* Conteúdo */}
      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md border-0 shadow-2xl" style={{ background: "white", borderRadius: 16 }}>
          <CardHeader className="space-y-1 text-center pb-6">
            <div className="mx-auto w-12 h-12 rounded-full flex items-center justify-center mb-4" style={{ background: "#1a1464" }}>
              <LogIn className="h-6 w-6 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold" style={{ color: "#1a1464" }}>
              {isRegistering ? "Criar Conta" : "Entrar"}
            </CardTitle>
            <CardDescription>
              {isRegistering
                ? "Preencha seus dados para criar uma nova conta"
                : "Digite seu email e senha para acessar sua conta"}
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-11"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-11"
                />
              </div>

              {isRegistering && (
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirmar Senha</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}                        // ✅ controlado
                    onChange={(e) => setConfirmPassword(e.target.value)}  // ✅
                    required
                    className="h-11"
                  />
                </div>
              )}
            </CardContent>

            <CardFooter className="flex flex-col gap-4 pt-2">
              <Button
                type="submit"
                className="w-full h-11 font-bold text-base"
                style={{ background: "#1a1464" }}
              >
                {isRegistering ? (
                  <>
                    <UserPlus className="mr-2 h-5 w-5" />
                    Cadastrar
                  </>
                ) : (
                  <>
                    <LogIn className="mr-2 h-5 w-5" />
                    Entrar
                  </>
                )}
              </Button>

              <Separator />

              <p className="text-sm text-muted-foreground text-center">
                {isRegistering ? "Já tem uma conta?" : "Ainda não tem conta?"}{" "}
                <button
                  type="button"
                  onClick={() => setIsRegistering(!isRegistering)}
                  className="font-semibold hover:underline"
                  style={{ color: "#1a1464" }}
                >
                  {isRegistering ? "Fazer login" : "Cadastre-se"}
                </button>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>

      {/* Footer */}
      <footer className="text-center py-4 text-white/40 text-xs">
        © 2026 Silver Tintas — Campinas, SP
      </footer>
    </div>
  )
}