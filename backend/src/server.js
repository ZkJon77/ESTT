import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import prisma from './prismaClient.js'

const app = express()

app.use(helmet())
app.use(cors())
app.use(express.json())

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-me'
const JWT_EXPIRES_IN = '7d'

function normalizeEmail(email) {
  return String(email || '').trim().toLowerCase()
}

function cryptoRandomId() {
  return Math.random().toString(16).slice(2) + Date.now().toString(16)
}

app.get('/', (_req, res) => {
  res.json({ ok: true, service: 'backend', message: 'ESTT API is running' })
})

app.get('/health', (_req, res) => {
  res.json({ ok: true, service: 'backend', ts: Date.now() })
})

app.post('/api/auth/register', async (req, res) => {
  const { email, password } = req.body || {}

  const normalizedEmail = normalizeEmail(email)
  if (!normalizedEmail || !password) {
    return res.status(400).json({ error: 'email and password are required' })
  }

  if (String(password).length < 6) {
    return res.status(400).json({ error: 'password must be at least 6 characters' })
  }

  try {
    const passwordHash = await bcrypt.hash(String(password), 10)

    const user = await prisma.user.create({
      data: {
        id: cryptoRandomId(),
        email: normalizedEmail,
        passwordHash,
      },
      select: { email: true },
    })

    return res.status(201).json({
      ok: true,
      message: 'registered',
      user: { email: user.email },
    })
  } catch (err) {
    if (String(err?.code) === 'P2002') {
      return res.status(409).json({ error: 'email already in use' })
    }
    console.error(err)
    return res.status(500).json({ error: 'internal error' })
  }
})

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body || {}
  const normalizedEmail = normalizeEmail(email)

  if (!normalizedEmail || !password) {
    return res.status(400).json({ error: 'email and password are required' })
  }

  const user = await prisma.user.findUnique({
    where: { email: normalizedEmail },
    select: { id: true, email: true, passwordHash: true },
  })

  if (!user) {
    return res.status(401).json({ error: 'invalid credentials' })
  }

  const ok = await bcrypt.compare(String(password), user.passwordHash)
  if (!ok) {
    return res.status(401).json({ error: 'invalid credentials' })
  }

  const token = jwt.sign({ sub: user.id, email: user.email }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN })

  return res.json({
    ok: true,
    message: 'login successful',
    user: { email: user.email },
    token,
  })
})

// Local dev only — na Vercel o app é exportado como handler serverless
if (process.env.NODE_ENV !== 'production') {
  const port = process.env.PORT ? Number(process.env.PORT) : 4000
  app.listen(port, () => {
    console.log(`Backend listening on http://localhost:${port}`)
  })
}

export default app
