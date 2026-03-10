// =============================================
// BOATMARKET - Embarcaciones Listing Page
// Server Component with Suspense boundaries
// =============================================

import { Suspense } from 'react'
import type { Metadata } from 'next'
import { searchBoats } from '@/lib/search/meilisearch'
import { SearchFilters } from '@/components/search/SearchFilters'
import { SearchResults } from '@/components/search/SearchResults'
import { Breadcrumb } from '@/components/layout/Breadcrumb'

export const metadata: Metadata = {
  title: 'Embarcaciones en venta | BoatMarket',
  description:
    'Explora el catalogo mas completo de embarcaciones en venta en Argentina. Lanchas, veleros, yates, motos de agua y mas. Encontra tu proxima embarcacion en BoatMarket.',
  openGraph: {
    title: 'Embarcaciones en venta | BoatMarket',
    description:
      'El marketplace nautico mas completo de Argentina. Miles de embarcaciones esperandote.',
    url: 'https://boatmarket.com.ar/embarcaciones',
    siteName: 'BoatMarket',
    type: 'website',
  },
  alternates: {
    canonical: 'https://boatmarket.com.ar/embarcaciones',
  },
}

interface PageProps {
  searchParams: {
    q?: string
    type?: string
    minPrice?: string
    maxPrice?: string
    minYear?: string
    maxYear?: string
    minLength?: string
    maxLength?: string
    brand?: string
    fuel?: string
    condition?: string
    location?: string
    sort?: string
    page?: string
  }
}

export default async function EmbarcacionesPage({ searchParams }: PageProps) {
  const page = parseInt(searchParams.page || '1', 10)
  const hitsPerPage = 24

  // Build Meilisearch filter string
  const filterParts: string[] = []
  filterParts.push('status = "active"')
  if (searchParams.type) filterParts.push(`type = "${searchParams.type}"`)
  if (searchParams.condition) filterParts.push(`condition = "${searchParams.condition}"`)
  if (searchParams.brand) filterParts.push(`brand = "${searchParams.brand}"`)
  if (searchParams.fuel) filterParts.push(`fuelType = "${searchParams.fuel}"`)
  if (searchParams.minPrice) filterParts.push(`price >= ${searchParams.minPrice}`)
  if (searchParams.maxPrice) filterParts.push(`price <= ${searchParams.maxPrice}`)
  if (searchParams.minYear) filterParts.push(`yearBuilt >= ${searchParams.minYear}`)
  if (searchParams.maxYear) filterParts.push(`yearBuilt <= ${searchParams.maxYear}`)
  if (searchParams.minLength) filterParts.push(`lengthFt >= ${searchParams.minLength}`)
  if (searchParams.maxLength) filterParts.push(`lengthFt <= ${searchParams.maxLength}`)
  if (searchParams.location) filterParts.push(`location.state = "${searchParams.location}"`)

  // Sort mapping
  const sortMap: Record<string, string[]> = {
    price_asc: ['price:asc'],
    price_desc: ['price:desc'],
    year_desc: ['yearBuilt:desc'],
    year_asc: ['yearBuilt:asc'],
    newest: ['createdAt:desc'],
    views: ['views:desc'],
  }
  const sort = sortMap[searchParams.sort || 'newest'] || ['createdAt:desc']

  const results = await searchBoats(searchParams.q || '', {
    filters: filterParts.join(' AND '),
    sort,
    page,
    hitsPerPage,
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        <Breadcrumb
          items={[
            { label: 'Inicio', href: '/' },
            { label: 'Embarcaciones' },
          ]}
        />

        <div className="mt-6 flex flex-col gap-8 lg:flex-row">
          {/* Sidebar Filters */}
          <aside className="w-full shrink-0 lg:w-80">
            <Suspense
              fallback={
                <div className="h-96 animate-pulse rounded-xl bg-white shadow-sm" />
              }
            >
              <SearchFilters
                facets={results.facetDistribution}
                totalHits={results.totalHits}
              />
            </Suspense>
          </aside>

          {/* Main Results */}
          <main className="flex-1">
            <Suspense
              fallback={
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div
                      key={i}
                      className="h-80 animate-pulse rounded-xl bg-white shadow-sm"
                    />
                  ))}
                </div>
              }
            >
              <SearchResults
                results={results.hits}
                totalHits={results.totalHits}
                page={page}
                totalPages={Math.ceil(results.totalHits / hitsPerPage)}
                query={searchParams.q}
              />
            </Suspense>
          </main>
        </div>
      </div>
    </div>
  )
}
