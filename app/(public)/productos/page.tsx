// =============================================
// BOATMARKET - Products Listing Page
// Server Component with category tabs & pagination
// =============================================

import { Suspense } from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { searchProducts } from '@/lib/search/meilisearch'
import { ProductCard } from '@/components/products/ProductCard'
import { Breadcrumb } from '@/components/layout/Breadcrumb'
import { Button } from '@/components/ui/button'
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select'
import { ChevronLeft, ChevronRight, SlidersHorizontal } from 'lucide-react'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Productos Nauticos | BoatMarket',
  description:
    'Compra motores, trailers, electronica marina, accesorios de seguridad, pesca y mas. Envios a toda Argentina.',
  openGraph: {
    title: 'Productos Nauticos | BoatMarket',
    description: 'Todo para tu embarcacion en un solo lugar.',
    url: 'https://boatmarket.com.ar/productos',
  },
  alternates: { canonical: 'https://boatmarket.com.ar/productos' },
}

const CATEGORIES = [
  { label: 'Todos', value: '' },
  { label: 'Motores', value: 'motores' },
  { label: 'Trailers', value: 'trailers' },
  { label: 'Electronica', value: 'electronica' },
  { label: 'Seguridad', value: 'seguridad' },
  { label: 'Accesorios', value: 'accesorios' },
  { label: 'Limpieza', value: 'limpieza' },
  { label: 'Pintura', value: 'pintura' },
  { label: 'Pesca', value: 'pesca' },
  { label: 'Deportes Acuaticos', value: 'deportes-acuaticos' },
  { label: 'Amarre', value: 'amarre' },
  { label: 'Confort', value: 'confort' },
] as const

interface PageProps {
  searchParams: {
    categoria?: string
    minPrice?: string
    maxPrice?: string
    sort?: string
    page?: string
  }
}

export default async function ProductosPage({ searchParams }: PageProps) {
  const page = parseInt(searchParams.page || '1', 10)
  const hitsPerPage = 24
  const activeCategory = searchParams.categoria || ''

  const filterParts: string[] = []
  if (activeCategory) filterParts.push(`category = "${activeCategory}"`)
  if (searchParams.minPrice) filterParts.push(`price >= ${searchParams.minPrice}`)
  if (searchParams.maxPrice) filterParts.push(`price <= ${searchParams.maxPrice}`)

  const sortMap: Record<string, string[]> = {
    price_asc: ['price:asc'],
    price_desc: ['price:desc'],
    newest: ['createdAt:desc'],
    rating: ['rating:desc'],
  }
  const sort = sortMap[searchParams.sort || 'newest'] || ['createdAt:desc']

  const results = await searchProducts('', {
    filters: filterParts.length ? filterParts.join(' AND ') : undefined,
    sort,
    page,
    hitsPerPage,
  })

  const totalPages = Math.ceil(results.totalHits / hitsPerPage)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        <Breadcrumb
          items={[
            { label: 'Inicio', href: '/' },
            { label: 'Productos' },
          ]}
        />

        <div className="mt-6">
          <h1 className="text-3xl font-bold text-navy-900">Productos Nauticos</h1>
          <p className="mt-2 text-gray-600">
            Todo lo que necesitas para tu embarcacion, en un solo lugar.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="mt-8 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.value}
              href={cat.value ? `/productos?categoria=${cat.value}` : '/productos'}
              className={cn(
                'shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors',
                activeCategory === cat.value
                  ? 'bg-navy-900 text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-blue-50 border'
              )}
            >
              {cat.label}
            </Link>
          ))}
        </div>

        {/* Sorting & Count */}
        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            {results.totalHits} producto{results.totalHits !== 1 ? 's' : ''} encontrado
            {results.totalHits !== 1 ? 's' : ''}
          </p>
          <div className="flex items-center gap-3">
            <SlidersHorizontal className="h-4 w-4 text-gray-400" />
            <Select defaultValue={searchParams.sort || 'newest'}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Mas recientes</SelectItem>
                <SelectItem value="price_asc">Menor precio</SelectItem>
                <SelectItem value="price_desc">Mayor precio</SelectItem>
                <SelectItem value="rating">Mejor valorados</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Product Grid */}
        <Suspense
          fallback={
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="h-72 animate-pulse rounded-xl bg-white shadow-sm" />
              ))}
            </div>
          }
        >
          {results.hits.length > 0 ? (
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {results.hits.map((product: any) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="mt-16 flex flex-col items-center text-center">
              <div className="rounded-full bg-sky-100 p-6">
                <SlidersHorizontal className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-navy-900">
                No encontramos productos
              </h3>
              <p className="mt-2 text-gray-500">
                Proba ajustando los filtros o busca en otra categoria.
              </p>
              <Button asChild className="mt-4 bg-blue-600 hover:bg-blue-700">
                <Link href="/productos">Ver todos los productos</Link>
              </Button>
            </div>
          )}
        </Suspense>

        {/* Pagination */}
        {totalPages > 1 && (
          <nav className="mt-10 flex items-center justify-center gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={page <= 1}
              asChild={page > 1}
            >
              {page > 1 ? (
                <Link
                  href={`/productos?${new URLSearchParams({
                    ...(searchParams as Record<string, string>),
                    page: String(page - 1),
                  })}`}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Link>
              ) : (
                <span>
                  <ChevronLeft className="h-4 w-4" />
                </span>
              )}
            </Button>

            {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
              let pageNum: number
              if (totalPages <= 7) pageNum = i + 1
              else if (page <= 4) pageNum = i + 1
              else if (page >= totalPages - 3) pageNum = totalPages - 6 + i
              else pageNum = page - 3 + i
              return (
                <Button
                  key={pageNum}
                  variant={pageNum === page ? 'default' : 'outline'}
                  size="sm"
                  className={pageNum === page ? 'bg-navy-900' : ''}
                  asChild
                >
                  <Link
                    href={`/productos?${new URLSearchParams({
                      ...(searchParams as Record<string, string>),
                      page: String(pageNum),
                    })}`}
                  >
                    {pageNum}
                  </Link>
                </Button>
              )
            })}

            <Button
              variant="outline"
              size="sm"
              disabled={page >= totalPages}
              asChild={page < totalPages}
            >
              {page < totalPages ? (
                <Link
                  href={`/productos?${new URLSearchParams({
                    ...(searchParams as Record<string, string>),
                    page: String(page + 1),
                  })}`}
                >
                  <ChevronRight className="h-4 w-4" />
                </Link>
              ) : (
                <span>
                  <ChevronRight className="h-4 w-4" />
                </span>
              )}
            </Button>
          </nav>
        )}
      </div>
    </div>
  )
}
