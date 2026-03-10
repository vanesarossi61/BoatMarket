'use client'

// =============================================
// BOATMARKET - Global Error Boundary
// =============================================

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <div className="mb-8">
        <h1 className="text-6xl font-bold text-destructive/30">Error</h1>
        <h2 className="mt-4 text-2xl font-semibold text-foreground">
          Algo salio mal
        </h2>
        <p className="mt-2 max-w-md text-muted-foreground">
          Ocurrio un error inesperado. Por favor, intenta nuevamente.
        </p>
        {error.digest && (
          <p className="mt-1 text-xs text-muted-foreground/60">
            Codigo: {error.digest}
          </p>
        )}
      </div>
      <button
        onClick={reset}
        className="inline-flex items-center rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
      >
        Intentar de nuevo
      </button>
    </div>
  )
}
