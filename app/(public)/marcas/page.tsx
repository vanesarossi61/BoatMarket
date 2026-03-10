import type { Metadata } from 'next'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { ChevronRight, MapPin, Package, Search } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Marcas de Embarcaciones y Productos N\u00e1uticos | BoatMarket',
  description:
    'Explor\u00e1 las mejores marcas del mundo n\u00e1utico: embarcaciones, motores, electr\u00f3nica y accesorios. Encontr\u00e1 productos de Bayliner, Yamaha, Garmin, Mercury y m\u00e1s en BoatMarket.',
  openGraph: {
    title: 'Marcas de Embarcaciones y Productos N\u00e1uticos | BoatMarket',
    description:
      'Las mejores marcas del mundo n\u00e1utico en un solo lugar.',
    type: 'website',
  },
}

/* ---------- Types ---------- */
interface Brand {
  slug: string
  name: string
  type: string
  typeSlug: string
  productCount: number
  country: string
  initials: string
  accentColor: string
}

/* ---------- Mock Data ---------- */
const filterTypes = [
  { label: 'Todas', slug: 'todas' },
  { label: 'Embarcaciones', slug: 'embarcaciones' },
  { label: 'Motores', slug: 'motores' },
  { label: 'Electr\u00f3nica', slug: 'electronica' },
  { label: 'Accesorios', slug: 'accesorios' },
]

const brands: Brand[] = [
  {
    slug: 'bayliner',
    name: 'Bayliner',
    type: 'Embarcaciones',
    typeSlug: 'embarcaciones',
    productCount: 24,
    country: 'Estados Unidos',
    initials: 'BY',
    accentColor: 'bg-blue-600',
  },
  {
    slug: 'sea-ray',
    name: 'Sea Ray',
    type: 'Embarcaciones',
    typeSlug: 'embarcaciones',
    productCount: 18,
    country: 'Estados Unidos',
    initials: 'SR',
    accentColor: 'bg-navy-900',
  },
  {
    slug: 'boston-whaler',
    name: 'Boston Whaler',
    type: 'Embarcaciones',
    typeSlug: 'embarcaciones',
    productCount: 15,
    country: 'Estados Unidos',
    initials: 'BW',
    accentColor: 'bg-red-600',
  },
  {
    slug: 'yamaha',
    name: 'Yamaha',
    type: 'Motores',
    typeSlug: 'motores',
    productCount: 42,
    country: 'Jap\u00f3n',
    initials: 'YM',
    accentColor: 'bg-red-500',
  },
  {
    slug: 'mercury',
    name: 'Mercury',
    type: 'Motores',
    typeSlug: 'motores',
    productCount: 38,
    country: 'Estados Unidos',
    initials: 'MC',
    accentColor: 'bg-gray-900',
  },
  {
    slug: 'honda-marine',
    name: 'Honda Marine',
    type: 'Motores',
    typeSlug: 'motores',
    productCount: 22,
    country: 'Jap\u00f3n',
    initials: 'HM',
    accentColor: 'bg-red-700',
  },
  {
    slug: 'garmin',
    name: 'Garmin',
    type: 'Electr\u00f3nica',
    typeSlug: 'electronica',
    productCount: 56,
    country: 'Estados Unidos',
    initials: 'GR',
    accentColor: 'bg-sky-600',
  },
  {
    slug: 'lowrance',
    name: 'Lowrance',
    type: 'Electr\u00f3nica',
    typeSlug: 'electronica',
    productCount: 34,
    country: 'Estados Unidos',
    initials: 'LW',
    accentColor: 'bg-blue-800',
  },
  {
    slug: 'raymarine',
    name: 'Raymarine',
    type: 'Electr\u00f3nica',
    typeSlug: 'electronica',
    productCount: 28,
    country: 'Reino Unido',
    initials: 'RM',
    accentColor: 'bg-teal-600',
  },
  {
    slug: 'torqeedo',
    name: 'Torqeedo',
    type: 'Motores',
    typeSlug: 'motores',
    productCount: 12,
    country: 'Alemania',
    initials: 'TQ',
    accentColor: 'bg-green-600',
  },
  {
    slug: 'brunswick',
    name: 'Brunswick',
    type: 'Embarcaciones',
    typeSlug: 'embarcaciones',
    productCount: 20,
    country: 'Estados Unidos',
    initials: 'BR',
    accentColor: 'bg-indigo-700',
  },
  {
    slug: 'zodiac',
    name: 'Zodiac',
    type: 'Embarcaciones',
    typeSlug: 'embarcaciones',
    productCount: 16,
    country: 'Francia',
    initials: 'ZD',
    accentColor: 'bg-orange-600',
  },
]

/* ---------- Page ---------- */
export default function MarcasPage({
  searchParams,
}: {
  searchParams: { tipo?: string }
}) {
  const activeType = searchParams.tipo || 'todas'

  const filteredBrands =
    activeType === 'todas'
      ? brands
      : brands.filter((b) => b.typeSlug === activeType)

  return (
    <main className="min-h-screen bg-white">
      {/* -- Breadcrumb -- */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-blue-600 transition-colors">
              Inicio
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-gray-900 font-medium">Marcas</span>
          </nav>
        </div>
      </div>

      {/* -- Hero -- */}
      <section className="relative bg-navy-900 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-sky-400/10 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Marcas Nauticas
          </h1>
          <p className="text-lg text-blue-200 max-w-2xl mx-auto">
            Las mejores marcas del mundo nautico en un solo lugar
          </p>
        </div>
      </section>

      {/* -- Filter Pills -- */}
      <section className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto py-4 scrollbar-hide">
            {filterTypes.map((ft) => {
              const isActive = activeType === ft.slug
              return (
                <Link
                  key={ft.slug}
                  href={
                    ft.slug === 'todas'
                      ? '/marcas'
                      : `/marcas?tipo=${ft.slug}`
                  }
                  className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-navy-900 text-white shadow-md'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {ft.label}
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* -- Brands Grid -- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <p className="text-sm text-gray-500">
            Mostrando{' '}
            <span className="font-semibold text-gray-900">
              {filteredBrands.length}
            </span>{' '}
            marcas
          </p>
        </div>

        {filteredBrands.length > 0 ? (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredBrands.map((brand) => (
              <Link key={brand.slug} href={`/marcas/${brand.slug}`} className="group">
                <Card className="h-full border-gray-200 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-blue-200">
                  <CardContent className="p-6 text-center">
                    {/* Logo placeholder: initials circle */}
                    <div
                      className={`mx-auto h-20 w-20 rounded-full ${brand.accentColor} flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110`}
                    >
                      <span className="text-2xl font-bold text-white">
                        {brand.initials}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-1">
                      {brand.name}
                    </h3>

                    <Badge
                      variant="secondary"
                      className="mb-3 text-xs"
                    >
                      {brand.type}
                    </Badge>

                    <div className="flex items-center justify-center gap-4 text-xs text-gray-500 mt-3">
                      <span className="flex items-center gap-1">
                        <Package className="h-3.5 w-3.5" />
                        {brand.productCount} productos
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" />
                        {brand.country}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No encontramos marcas
            </h3>
            <p className="text-gray-500 mb-6">
              Proba seleccionando otro tipo de producto.
            </p>
            <Link
              href="/marcas"
              className="inline-flex items-center px-4 py-2 bg-navy-900 text-white rounded-lg hover:bg-navy-800 transition-colors text-sm font-medium"
            >
              Ver todas las marcas
            </Link>
          </div>
        )}
      </section>
    </main>
  )
}
