import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { JsonLd } from '@/components/seo/JsonLd'

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  image: string
  date: string
  category: string
  readingTime: number
  author: {
    name: string
    avatar: string
  }
  content: string
}

const POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'Guia completa para elegir tu primera lancha',
    slug: 'guia-elegir-primera-lancha',
    excerpt: 'Todo lo que necesitas saber antes de comprar tu primera embarcacion.',
    image: '/images/blog/primera-lancha.jpg',
    date: '2026-03-05',
    category: 'Guias',
    readingTime: 8,
    author: { name: 'Martin Aguirre', avatar: '/images/avatars/martin.jpg' },
    content: `
      <p>Comprar tu primera lancha es una de las decisiones mas emocionantes que podes tomar. Sin embargo, hay muchos factores que considerar antes de dar el paso. En esta guia te vamos a acompa\u00f1ar en todo el proceso.</p>

      <h2>1. Defini el uso principal</h2>
      <p>Antes de mirar modelos y precios, pensa en como vas a usar la embarcacion. Vas a pescar en el rio? Paseos familiares por el Delta? Deportes acuaticos en lagos? Cada actividad requiere un tipo de casco y motorizacion diferente.</p>
      <p>Para pesca deportiva, las lanchas de casco en V profunda ofrecen mejor estabilidad en aguas abiertas. Para paseos tranquilos por el Delta, un casco semi-V o plano es mas que suficiente y consume menos combustible.</p>

      <h2>2. Elegi el tama\u00f1o correcto</h2>
      <p>El tama\u00f1o de la lancha depende de la cantidad de personas que van a navegar habitualmente y del tipo de agua. Para rios y lagos interiores, embarcaciones de 16 a 20 pies son ideales. Si pensas salir a mar abierto, necesitas al menos 22 pies.</p>
      <p>Recorda que una lancha mas grande implica mayor costo de amarre, mantenimiento y combustible. No siempre mas grande es mejor.</p>

      <h2>3. Motor: fuera de borda vs inboard</h2>
      <p>Los motores fuera de borda son mas populares en Argentina por su facilidad de mantenimiento y reemplazo. Los motores inboard ofrecen mejor distribucion de peso pero son mas costosos de reparar.</p>
      <p>Para lanchas de hasta 20 pies, un fuera de borda de 90 a 150 HP es lo mas comun. Marcas como Mercury, Yamaha y Evinrude tienen excelente servicio tecnico en el pais.</p>

      <h2>4. Nuevo vs Usado</h2>
      <p>Una embarcacion usada puede ser una excelente opcion para tu primera compra. Los cascos de fibra de vidrio duran decadas si estan bien mantenidos. Lo mas importante es revisar la estructura del casco, el motor y la parte electrica.</p>
      <p>Si optas por un usado, siempre hace una inspeccion con un perito naval antes de cerrar la operacion. Es una inversion peque\u00f1a que te puede ahorrar muchos dolores de cabeza.</p>

      <h2>5. Documentacion y seguros</h2>
      <p>Toda embarcacion debe estar inscripta en el Registro Nacional de Buques (RENAVE). Ademas, necesitas tener al dia la matricula, el seguro obligatorio y la habilitacion de Prefectura Naval Argentina.</p>
      <p>No te olvides de sacar la licencia de conduccion nautica (timonel de yate como minimo) si todavia no la tenes.</p>
    `,
  },
  {
    id: '2',
    title: 'Mantenimiento de motor fuera de borda: checklist 2026',
    slug: 'mantenimiento-motor-fuera-borda-2026',
    excerpt: 'Un checklist actualizado con los pasos esenciales para mantener tu motor.',
    image: '/images/blog/mantenimiento-motor.jpg',
    date: '2026-02-28',
    category: 'Mantenimiento',
    readingTime: 6,
    author: { name: 'Lucia Fernandez', avatar: '/images/avatars/lucia.jpg' },
    content: `
      <p>El mantenimiento preventivo de tu motor fuera de borda es fundamental para garantizar la seguridad y prolongar su vida util. Segui este checklist cada temporada.</p>

      <h2>Antes de cada salida</h2>
      <p>Verifica el nivel de aceite, revisa las conexiones de combustible y asegurate de que no haya perdidas visibles. Proba el arranque en seco antes de llegar al agua.</p>

      <h2>Cada 100 horas de uso</h2>
      <p>Cambia el aceite del motor y el filtro de aceite. Revisa las bujias y reemplazalas si estan desgastadas. Lubrica los cables de control y las articulaciones del motor.</p>

      <h2>Al inicio de temporada</h2>
      <p>Si el motor estuvo guardado durante el invierno, hace un servicio completo: cambio de aceite, filtros, bujias, anodos de sacrificio y revision de la bomba de agua (impeller).</p>
    `,
  },
  {
    id: '3',
    title: 'Los mejores destinos nauticos del Delta del Parana',
    slug: 'destinos-nauticos-delta-parana',
    excerpt: 'Descubri los rincones mas lindos del Delta para navegar en familia.',
    image: '/images/blog/delta-parana.jpg',
    date: '2026-02-20',
    category: 'Destinos',
    readingTime: 7,
    author: { name: 'Martin Aguirre', avatar: '/images/avatars/martin.jpg' },
    content: `
      <p>El Delta del Parana es uno de los destinos nauticos mas accesibles y hermosos de Argentina. A pocos kilometros de Buenos Aires, ofrece un laberinto de rios y arroyos perfecto para explorar.</p>

      <h2>Rio Carapachay</h2>
      <p>Uno de los rios mas transitados y con mejor infraestructura. Ideal para familias, con varios recreos y restaurantes sobre la costa donde podes amarrar y almorzar.</p>

      <h2>Arroyo Anguilas</h2>
      <p>Si buscas tranquilidad, el arroyo Anguilas es una joya escondida. Aguas calmas, vegetacion exuberante y muy poco trafico nautico. Perfecto para kayak o lanchas peque\u00f1as.</p>
    `,
  },
]

function getPost(slug: string): BlogPost | undefined {
  return POSTS.find((p) => p.slug === slug)
}

function getRelatedPosts(currentSlug: string): BlogPost[] {
  return POSTS.filter((p) => p.slug !== currentSlug).slice(0, 3)
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('es-AR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) return { title: 'Articulo no encontrado | BoatMarket' }

  return {
    title: `${post.title} | Blog BoatMarket`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author.name],
      images: [{ url: post.image, width: 1200, height: 630 }],
    },
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const post = getPost(slug)

  if (!post) notFound()

  const related = getRelatedPosts(slug)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.image,
    datePublished: post.date,
    author: {
      '@type': 'Person',
      name: post.author.name,
    },
    publisher: {
      '@type': 'Organization',
      name: 'BoatMarket',
      url: 'https://boatmarket.com.ar',
    },
  }

  return (
    <>
      <JsonLd data={jsonLd} />

      <main className="min-h-screen bg-white">
        {/* Hero Image */}
        <div className="relative aspect-video max-h-[480px] w-full bg-gray-200 overflow-hidden">
          <Image
            src={post.image}
            alt={post.title}
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>

        <div className="container mx-auto px-4 -mt-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Article Content */}
            <article className="lg:col-span-2 bg-white rounded-xl shadow-sm p-8 max-w-3xl">
              <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full mb-4">
                {post.category}
              </span>

              <h1 className="text-3xl md:text-4xl font-bold text-navy-900 leading-tight mb-4">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-8 pb-6 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-navy-600 flex items-center justify-center text-white text-xs font-bold">
                    {post.author.name.charAt(0)}
                  </div>
                  <span className="font-medium text-gray-700">{post.author.name}</span>
                </div>
                <span className="text-gray-300">|</span>
                <time>{formatDate(post.date)}</time>
                <span className="text-gray-300">|</span>
                <span>{post.readingTime} min de lectura</span>
              </div>

              <div
                className="prose prose-lg prose-blue max-w-none prose-headings:text-navy-900 prose-headings:font-bold prose-p:text-gray-600 prose-p:leading-relaxed prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Share Buttons */}
              <div className="mt-10 pt-6 border-t border-gray-100">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
                  Compartir
                </h3>
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      if (typeof navigator !== 'undefined') {
                        navigator.clipboard.writeText(window.location.href)
                      }
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                    Copiar link
                  </button>
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(post.title + ' - https://boatmarket.com.ar/blog/' + post.slug)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-green-500 text-white text-sm font-medium hover:bg-green-600 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                    </svg>
                    WhatsApp
                  </a>
                </div>
              </div>
            </article>

            {/* Sidebar: Related Posts */}
            <aside className="space-y-6">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-lg font-bold text-navy-900 mb-4">Posts relacionados</h2>
                <div className="space-y-4">
                  {related.map((rPost) => (
                    <Link
                      key={rPost.id}
                      href={`/blog/${rPost.slug}`}
                      className="flex gap-3 group"
                    >
                      <div className="flex-shrink-0 w-16 h-12 relative rounded-lg overflow-hidden bg-gray-200">
                        <Image
                          src={rPost.image}
                          alt={rPost.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-semibold text-navy-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                          {rPost.title}
                        </h4>
                        <time className="text-xs text-gray-400 mt-1 block">
                          {formatDate(rPost.date)}
                        </time>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="bg-gradient-to-br from-navy-900 to-blue-800 rounded-xl p-6 text-center">
                <h3 className="text-white font-bold text-lg mb-2">
                  Buscas embarcacion?
                </h3>
                <p className="text-blue-200 text-sm mb-4">
                  Explora las mejores ofertas del mercado nautico argentino
                </p>
                <Link
                  href="/embarcaciones"
                  className="inline-block bg-white text-navy-900 font-semibold px-6 py-2.5 rounded-lg hover:bg-gray-100 transition-colors text-sm"
                >
                  Ver embarcaciones
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </>
  )
}
