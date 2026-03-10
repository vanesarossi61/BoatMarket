// =============================================
// BOATMARKET - 404 Not Found Page
// =============================================

import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pagina no encontrada',
}

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <div className="mb-8">
        <h1 className="text-9xl font-bold text-primary/20">404</h1>
        <h2 className="mt-4 text-2xl font-semibold text-foreground">
          Pagina no encontrada
        </h2>
        <p className="mt-2 text-muted-foreground">
          Lo sentimos, la pagina que buscas no existe o fue movida.
        </p>
      </div>
      <div className="flex gap-4">
        <Link
          href="/"
          className="inline-flex items-center rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Volver al inicio
        </Link>
        <Link
          href="/embarcaciones"
          className="inline-flex items-center rounded-lg border border-input bg-background px-6 py-3 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          Ver embarcaciones
        </Link>
      </div>
    </div>
  )
}
