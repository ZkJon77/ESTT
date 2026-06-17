import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-mono' })

export const viewport: Viewport = {
  themeColor: '#1a1464',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export const metadata: Metadata = {
  title: {
    default: 'Silver Tintas | Loja de Tintas em Campinas',
    template: '%s | Silver Tintas',
  },
  description:
    'Silver Tintas — sua loja de tintas em Campinas desde 1995. Tintas automotivas, vernizes, esmaltes, ferramentas e acessórios. Entrega no mesmo dia. Av. Arymana, 299B — (19) 3266-0789.',
  keywords: [
    'tintas campinas',
    'loja de tintas campinas',
    'tinta automotiva',
    'verniz',
    'esmalte sintético',
    'coral tintas',
    'suvinil',
    'silver tintas',
    'tinta paredes',
    'ferramentas pintura',
  ],
  authors: [{ name: 'Silver Tintas', url: 'https://silvertintas.com.br' }],
  creator: 'Silver Tintas',
  publisher: 'Silver Tintas',
  metadataBase: new URL('https://silvertintas.com.br'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://silvertintas.com.br',
    siteName: 'Silver Tintas',
    title: 'Silver Tintas | Loja de Tintas em Campinas',
    description:
      'Tintas, vernizes, esmaltes e acessórios para pintura. Entrega no mesmo dia em Campinas. Desde 1995.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Silver Tintas — Loja de Tintas em Campinas',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Silver Tintas | Loja de Tintas em Campinas',
    description:
      'Tintas, vernizes, esmaltes e acessórios para pintura. Entrega no mesmo dia em Campinas.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
    shortcut: '/favicon.ico',
  },
  manifest: '/site.webmanifest',
  category: 'shopping',
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${geist.variable} ${geistMono.variable} font-sans antialiased`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
