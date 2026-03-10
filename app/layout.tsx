// =============================================
// BOATMARKET - Root Layout
// =============================================

import type { Metadata } from 'next'
import { Inter, Plus_Jakarta_Sans } from 'next/font/google'
import { SessionProvider } from 'next-auth/react'
import { auth } from '@/lib/auth/auth'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Toaster } from '@/components/ui/sonner'
import '@/styles/globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-jakarta' })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://boatmarket.com.ar'),
  title: {
    default: 'BoatMarket - Embarcaciones y Productos Nauticos en Argentina',
    template: '%s | BoatMarket',
  },
  description:
    'Compra y vende embarcaciones, motores, trailers y accesorios nauticos. El marketplace nautico mas completo de Argentina.',
  keywords: [
    'embarcaciones',
    'barcos',
    'lanchas',
    'veleros',
    'nautica',
    'marketplace nautico',
    'comprar barco',
    'vender embarcacion',
    'motores nauticos',
    'accesorios nauticos',
  ],
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    siteName: 'BoatMarket',
    images: [{ url: '/og-default.jpg', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()

  return (
    <html lang="es-AR" className={`${inter.variable} ${jakarta.variable}`}>
      <body className="min-h-screen bg-background font-sans antialiased">
        <SessionProvider session={session}>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <Toaster richColors position="bottom-right" />
        </SessionProvider>
      </body>
    </html>
  )
}
