import type { Metadata } from 'next'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import {
  ChevronRight,
  Clock,
  User,
  Calendar,
  Tag,
  Mail,
  ChevronLeft,
  Search,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Blog N\u00e1utico | Gu\u00edas, Consejos y Novedades | BoatMarket',
  description:
    'Descubr\u00ed gu\u00edas de compra, consejos de mantenimiento, comparativas y las \u00faltimas novedades del mundo n\u00e1utico en el blog de BoatMarket.',
  openGraph: {
    title: 'Blog N\u00e1utico | Gu\u00edas, Consejos y Novedades | BoatMarket',
    description:
      'Descubr\u00ed gu\u00edas de compra, consejos de mantenimiento, comparativas y las \u00faltimas novedades del mundo n\u00e1utico.',
    type: 'website',
  },
}

/* ---------- Types ---------- */
interface BlogArticle {
  slug: string
  title: string
  excerpt: string
  category: string
  categorySlug: string
  author: string
  authorInitial: string
  date: string
  readingTime: string
  image: string
  featured?: boolean
}

interface BlogCategory {
  label: string
  slug: string
  count: number
}

/* ---------- Mock Data ---------- */
const categories: BlogCategory[] = [
  { label: 'Todas', slug: 'todas', count: 42 },
  { label: 'Gu\u00edas de Compra', slug: 'guias-de-compra', count: 12 },
  { label: 'Mantenimiento', slug: 'mantenimiento', count: 8 },
  { label: 'Navegaci\u00f3n', slug: 'navegacion', count: 6 },
  { label: 'Pesca', slug: 'pesca', count: 5 },
  { label: 'Novedades', slug: 'novedades', count: 7 },
  { label: 'Comparativas', slug: 'comparativas', count: 4 },
]

const popularTags = [
  'Lanchas',
  'Veleros',
  'GPS',
  'Motor Fueraborda',
  'Seguridad',
  'Pesca',
  'Mantenimiento',
  'Navegaci\u00f3n',
  'Yates',
  'Electr\u00f3nica',
]

const articles: BlogArticle[] = [
  {
    slug: 'guia-completa-comprar-primera-lancha',
    title: 'Gu\u00eda Completa para Comprar tu Primera Lancha',
    excerpt:
      'Todo lo que necesit\u00e1s saber antes de dar el salto: presupuesto, tipo de embarcaci\u00f3n, motor, documentaci\u00f3n y los errores m\u00e1s comunes que deber\u00edas evitar.',
    category: 'Gu\u00edas de Compra',
    categorySlug: 'guias-de-compra',
    author: 'Mart\u00edn L\u00f3pez',
    authorInitial: 'M',
    date: '8 Mar 2026',
    readingTime: '12 min de lectura',
    image: '/images/blog/primera-lancha.jpg',
    featured: true,
  },
  {
    slug: 'mantenimiento-motor-fueraborda-tips',
    title: 'Mantenimiento de Motor Fueraborda: 10 Tips Esenciales',
    excerpt:
      'Manten\u00e9 tu motor en \u00f3ptimas condiciones con estos consejos pr\u00e1cticos de los expertos. Desde el cambio de aceite hasta la invernada.',
    category: 'Mantenimiento',
    categorySlug: 'mantenimiento',
    author: 'Carlos Ruiz',
    authorInitial: 'C',
    date: '5 Mar 2026',
    readingTime: '8 min de lectura',
    image: '/images/blog/motor-fueraborda.jpg',
  },
  {
    slug: 'mejores-gps-marinos-2026-comparativa',
    title: 'Mejores GPS Marinos 2026: Comparativa',
    excerpt:
      'Analizamos los 5 mejores GPS marinos del mercado: Garmin, Lowrance, Raymarine, Simrad y Humminbird. Precios, funciones y cu\u00e1l te conviene.',
    category: 'Comparativas',
    categorySlug: 'comparativas',
    author: 'Ana Gonz\u00e1lez',
    authorInitial: 'A',
    date: '1 Mar 2026',
    readingTime: '10 min de lectura',
    image: '/images/blog/gps-marinos.jpg',
  },
  {
    slug: 'preparar-embarcacion-invierno',
    title: 'C\u00f3mo Preparar tu Embarcaci\u00f3n para el Invierno',
    excerpt:
      'La invernada correcta es clave para proteger tu inversi\u00f3n. Te explicamos paso a paso c\u00f3mo dejar tu embarcaci\u00f3n lista para la temporada baja.',
    category: 'Mantenimiento',
    categorySlug: 'mantenimiento',
    author: 'Roberto D\u00edaz',
    authorInitial: 'R',
    date: '25 Feb 2026',
    readingTime: '7 min de lectura',
    image: '/images/blog/invernada.jpg',
  },
  {
    slug: 'top-5-destinos-nauticos-argentina',
    title: 'Top 5 Destinos N\u00e1uticos en Argentina',
    excerpt:
      'Desde el Delta del Paran\u00e1 hasta la Patagonia, descubr\u00ed los mejores lugares para navegar en el pa\u00eds. Rutas, marinas y tips para cada destino.',
    category: 'Navegaci\u00f3n',
    categorySlug: 'navegacion',
    author: 'Laura Fern\u00e1ndez',
    authorInitial: 'L',
    date: '20 Feb 2026',
    readingTime: '9 min de lectura',
    image: '/images/blog/destinos-nauticos.jpg',
  },
  {
    slug: 'velero-vs-lancha-cual-elegir',
    title: 'Velero vs Lancha: \u00bfCu\u00e1l Elegir?',
    excerpt:
      'La eterna pregunta de todo navegante principiante. Comparamos costos, experiencia de navegaci\u00f3n, mantenimiento y estilo de vida de cada opci\u00f3n.',
    category: 'Gu\u00edas de Compra',
    categorySlug: 'guias-de-compra',
    author: 'Mart\u00edn L\u00f3pez',
    authorInitial: 'M',
    date: '15 Feb 2026',
    readingTime: '11 min de lectura',
    image: '/images/blog/velero-vs-lancha.jpg',
  },
]

/* ---------- Sub-components ---------- */
function ArticleCard({ article }: { article: BlogArticle }) {
  return (
    <Link href={`/blog/${article.slug}`} className="group">
      <Card className="h-full overflow-hidden border-gray-200 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
        {/* Image */}
        <div className="relative h-48 bg-gradient-to-br from-sky-100 to-blue-200 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center text-blue-300">
            <svg
              className="h-16 w-16"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1}
            >
              <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <Badge className="absolute top-3 left-3 bg-blue-600 text-white hover:bg-blue-700 text-xs">
            {article.category}
          </Badge>
        </div>

        <CardContent className="p-5">
          <h3 className="text-lg font-bold text-navy-900 group-hover:text-blue-600 transition-colors line-clamp-2 mb-2">
            {article.title}
          </h3>
          <p className="text-sm text-gray-600 line-clamp-3 mb-4">
            {article.excerpt}
          </p>

          {/* Author & meta */}
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-full bg-navy-900 text-white flex items-center justify-center text-xs font-semibold">
                {article.authorInitial}
              </div>
              <span className="font-medium text-gray-700">
                {article.author}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {article.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {article.readingTime}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

function FeaturedArticle({ article }: { article: BlogArticle }) {
  return (
    <Link href={`/blog/${article.slug}`} className="group block">
      <Card className="overflow-hidden border-gray-200 transition-all duration-300 hover:shadow-xl">
        <div className="grid md:grid-cols-2 gap-0">
          {/* Image */}
          <div className="relative h-64 md:h-full min-h-[300px] bg-gradient-to-br from-sky-100 to-blue-300 overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center text-blue-400">
              <svg
                className="h-24 w-24"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1}
              >
                <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <Badge className="absolute top-4 left-4 bg-amber-500 text-white hover:bg-amber-600">
              Destacado
            </Badge>
          </div>

          {/* Content */}
          <div className="p-8 flex flex-col justify-center">
            <Badge
              variant="outline"
              className="w-fit mb-3 border-blue-600 text-blue-600"
            >
              {article.category}
            </Badge>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-3">
              {article.title}
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              {article.excerpt}
            </p>

            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-navy-900 text-white flex items-center justify-center text-sm font-semibold">
                  {article.authorInitial}
                </div>
                <span className="font-medium text-gray-700">
                  {article.author}
                </span>
              </div>
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {article.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {article.readingTime}
              </span>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  )
}

/* ---------- Page ---------- */
export default function BlogPage({
  searchParams,
}: {
  searchParams: { categoria?: string; pagina?: string }
}) {
  const activeCategory = searchParams.categoria || 'todas'
  const currentPage = Number(searchParams.pagina) || 1
  const ITEMS_PER_PAGE = 6

  // Filter articles by category
  const filteredArticles =
    activeCategory === 'todas'
      ? articles
      : articles.filter((a) => a.categorySlug === activeCategory)

  // Separate featured from rest
  const featuredArticle = filteredArticles.find((a) => a.featured)
  const regularArticles = filteredArticles.filter((a) => !a.featured)

  // Pagination
  const totalPages = Math.ceil(regularArticles.length / ITEMS_PER_PAGE)
  const paginatedArticles = regularArticles.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

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
            <span className="text-gray-900 font-medium">Blog</span>
          </nav>
        </div>
      </div>

      {/* -- Hero -- */}
      <section className="relative bg-navy-900 overflow-hidden">
        {/* Decorative blurs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-sky-400/10 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <Badge className="bg-blue-600/20 text-blue-300 border-blue-500/30 mb-4">
            +42 articulos publicados
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Blog Nautico
          </h1>
          <p className="text-lg text-blue-200 max-w-2xl mx-auto">
            Guias de compra, mantenimiento y las ultimas novedades del mundo
            nautico
          </p>
        </div>
      </section>

      {/* -- Category Pills -- */}
      <section className="border-b border-gray-200 bg-white sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto py-4 scrollbar-hide">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.slug
              return (
                <Link
                  key={cat.slug}
                  href={
                    cat.slug === 'todas'
                      ? '/blog'
                      : `/blog?categoria=${cat.slug}`
                  }
                  className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-navy-900 text-white shadow-md'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {cat.label}
                  <span
                    className={`text-xs ${
                      isActive ? 'text-blue-300' : 'text-gray-400'
                    }`}
                  >
                    ({cat.count})
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* -- Main Content -- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-10">
          {/* -- Left: Articles -- */}
          <div className="lg:col-span-2">
            {/* Featured Article */}
            {featuredArticle && currentPage === 1 && (
              <div className="mb-10">
                <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
                  Articulo Destacado
                </h2>
                <FeaturedArticle article={featuredArticle} />
              </div>
            )}

            {/* Articles Grid */}
            <div className="mb-4">
              <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-6">
                Ultimos Articulos
              </h2>
            </div>

            {paginatedArticles.length > 0 ? (
              <div className="grid sm:grid-cols-2 gap-6">
                {paginatedArticles.map((article) => (
                  <ArticleCard key={article.slug} article={article} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No encontramos articulos
                </h3>
                <p className="text-gray-500 mb-6">
                  Proba seleccionando otra categoria.
                </p>
                <Button asChild variant="outline">
                  <Link href="/blog">Ver todos los articulos</Link>
                </Button>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-10">
                {currentPage > 1 && (
                  <Link
                    href={`/blog?${
                      activeCategory !== 'todas'
                        ? `categoria=${activeCategory}&`
                        : ''
                    }pagina=${currentPage - 1}`}
                    className="inline-flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Anterior
                  </Link>
                )}

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <Link
                      key={page}
                      href={`/blog?${
                        activeCategory !== 'todas'
                          ? `categoria=${activeCategory}&`
                          : ''
                      }pagina=${page}`}
                      className={`inline-flex items-center justify-center h-10 w-10 text-sm font-medium rounded-lg transition-colors ${
                        page === currentPage
                          ? 'bg-navy-900 text-white'
                          : 'text-gray-600 bg-white border border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {page}
                    </Link>
                  )
                )}

                {currentPage < totalPages && (
                  <Link
                    href={`/blog?${
                      activeCategory !== 'todas'
                        ? `categoria=${activeCategory}&`
                        : ''
                    }pagina=${currentPage + 1}`}
                    className="inline-flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Siguiente
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                )}
              </div>
            )}
          </div>

          {/* -- Right: Sidebar -- */}
          <aside className="space-y-8">
            {/* Newsletter */}
            <Card className="border-gray-200 overflow-hidden">
              <div className="bg-navy-900 p-6 text-center">
                <Mail className="h-10 w-10 text-amber-400 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-white mb-1">
                  Newsletter Nautico
                </h3>
                <p className="text-sm text-blue-200">
                  Recibi las ultimas novedades y guias en tu casilla.
                </p>
              </div>
              <CardContent className="p-5">
                <form className="space-y-3">
                  <Input
                    type="email"
                    placeholder="Tu email"
                    className="border-gray-300 focus:border-blue-500"
                  />
                  <Button className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold">
                    Suscribirme
                  </Button>
                </form>
                <p className="text-xs text-gray-400 mt-3 text-center">
                  Sin spam. Podes darte de baja cuando quieras.
                </p>
              </CardContent>
            </Card>

            {/* Categories with count */}
            <Card className="border-gray-200">
              <CardContent className="p-5">
                <h3 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Tag className="h-4 w-4 text-blue-600" />
                  Categorias
                </h3>
                <ul className="space-y-2">
                  {categories
                    .filter((c) => c.slug !== 'todas')
                    .map((cat) => (
                      <li key={cat.slug}>
                        <Link
                          href={`/blog?categoria=${cat.slug}`}
                          className={`flex items-center justify-between py-2 px-3 rounded-lg text-sm transition-colors ${
                            activeCategory === cat.slug
                              ? 'bg-sky-50 text-blue-600 font-medium'
                              : 'text-gray-600 hover:bg-gray-50'
                          }`}
                        >
                          <span>{cat.label}</span>
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full ${
                              activeCategory === cat.slug
                                ? 'bg-blue-100 text-blue-700'
                                : 'bg-gray-100 text-gray-500'
                            }`}
                          >
                            {cat.count}
                          </span>
                        </Link>
                      </li>
                    ))}
                </ul>
              </CardContent>
            </Card>

            {/* Popular Tags */}
            <Card className="border-gray-200">
              <CardContent className="p-5">
                <h3 className="text-base font-bold text-gray-900 mb-4">
                  Tags Populares
                </h3>
                <div className="flex flex-wrap gap-2">
                  {popularTags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/blog?query=${encodeURIComponent(tag)}`}
                      className="inline-block px-3 py-1.5 bg-gray-100 text-gray-600 text-xs font-medium rounded-full hover:bg-sky-50 hover:text-blue-600 transition-colors"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </aside>
        </div>
      </section>
    </main>
  )
}
