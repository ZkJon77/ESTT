import express from 'express'
import cors from 'cors'
import helmet from 'helmet'

const app = express()

app.use(helmet())
app.use(cors())
app.use(express.json())

app.get('/health', (_req, res) => {
  res.json({ ok: true, service: 'backend', ts: Date.now() })
})

// Exemplo de rota para autenticação (placeholder)
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body || {}
  if (!email || !password) {
    return res.status(400).json({ error: 'email and password are required' })
  }

  // TODO: conectar com banco/serviço real
  return res.json({
    ok: true,
    message: 'login placeholder',
    user: { email },
    token: null,
  })
})

const port = process.env.PORT ? Number(process.env.PORT) : 4000
app.listen(port, () => {
  console.log(`Backend listening on http://localhost:${port}`)
})

