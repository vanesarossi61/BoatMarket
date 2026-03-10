'use client'

// =============================================
// BOATMARKET - Dynamic Breadcrumb
// =============================================

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronRight, Home } from 'lucide-react'
import { JsonLd } from '@/components/seo/JsonLd'
import { generateBreadcrumbSchema } from '@/lib/seo/schemas'

const LABELS: Record<string, string> = {
  embarcaciones: 'Embarcaciones',
  productos: 'Productos',
  blog: 'Blog',
  dashboard: 'Panel de Control',
  'mis-embarcaciones': 'Mis Embarcaciones',
  'mis-consultas': 'Mis Consultas',
  'mis-pedidos': 'Mis Pedidos',
  perfil: 'Perfil',
  login: 'Ingresar',
  registro: 'Registro',
}

export function Breadcrumb() {
  const pathname = usePathname()
  const segments = pathname.split('/').filter(Boolean)

  if (segments.length === 0) return null

  const items = segments.map((segment, index) => {
    const url = '/' + segments.slice(0, index + 1).join('/')
    const label = LABELS[segment] || decodeURIComponent(segment).replace(/-/g, ' ')
    return { name: label, url }
  })

  const breadcrumbItems = [{ name: 'Inicio', url: '/' }, ...items]

  return (
    <>
      <JsonLd schema={generateBreadcrumbSchema(breadcrumbItems)} />
      <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-sm text-muted-foreground">
        <Link href="/" className="flex items-center gap-1 transition-colors hover:text-foreground">
          <Home className="h-3.5 w-3.5" />
          <span className="sr-only">Inicio</span>
        </Link>
        {items.map((item, index) => (
          <span key={item.url} className="flex items-center gap-1">
            <ChevronRight className="h-3.5 w-3.5" />
            {index === items.length - 1 ? (
              <span className="font-medium capitalize text-foreground">{item.name}</span>
            ) : (
              <Link href={item.url} className="capitalize transition-colors hover:text-foreground">
                {item.name}
              </Link>
            )}
          </span>
        ))}
      </nav>
    </>
  )
}
