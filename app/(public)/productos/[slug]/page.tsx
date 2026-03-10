// =============================================
// BOATMARKET - Product Detail Page
// Server Component with reviews, specs & cart
// =============================================

import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { prisma } from '@/lib/db/client'
import { Gallery } from '@/components/shared/Gallery'
import { PriceDisplay } from '@/components/shared/PriceDisplay'
import { ProductCard } from '@/components/products/ProductCard'
import { ReviewForm } from '@/components/forms/ReviewForm'
import { JsonLd } from '@/components/seo/JsonLd'
import { Breadcrumb } from '@/components/layout/Breadcrumb'
import { generateProductSchema } from '@/lib/seo/schemas'
import {
  Star, ShoppingCart, Truck, Shield, RotateCcw, ThumbsUp, User,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface PageProps {
  params: { slug: string }
}

async function getProduct(slug: string) {
  return prisma.product.findUnique({
    where: { slug, status: 'active' },
    include: {
      category: true,
      brand: true,
      images: true,
      tags: true,
      reviews: {
        where: { status: 'approved' },
        include: { author: { select: { id: true, name: true, avatar: true } } },
        orderBy: { createdAt: 'desc' },
        take: 20,
      },
    },
  })
}

async function getRelatedProducts(categoryId: string, excludeId: string) {
  return prisma.product.findMany({
    where: { categoryId, id: { not: excludeId }, status: 'active' },
    include: {
      images: { take: 1 },
      brand: { select: { name: true } },
      category: { select: { name: true, slug: true } },
    },
    take: 5,
    orderBy: { rating: 'desc' },
  })
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const product = await getProduct(params.slug)
  if (!product) return { title: 'Producto no encontrado | BoatMarket' }

  const title = `${product.name} | BoatMarket`
  const description = product.shortDescription || product.description?.slice(0, 160) || ''

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://boatmarket.com.ar/productos/${product.slug}`,
      images: product.images?.[0]?.image?.url
        ? [{ url: product.images[0].image.url }]
        : [],
    },
    alternates: { canonical: `https://boatmarket.com.ar/productos/${product.slug}` },
  }
}

function RatingStars({ rating, size = 'md' }: { rating: number; size?: 'sm' | 'md' }) {
  const cls = size === 'sm' ? 'h-4 w-4' : 'h-5 w-5'
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={`${cls} ${
            i < Math.floor(rating)
              ? 'fill-amber-400 text-amber-400'
              : i < rating
                ? 'fill-amber-200 text-amber-400'
                : 'fill-gray-200 text-gray-200'
          }`}
        />
      ))}
    </div>
  )
}

export default async function ProductDetailPage({ params }: PageProps) {
  const product = await getProduct(params.slug)
  if (!product) notFound()

  const relatedProducts = await getRelatedProducts(product.categoryId, product.id)

  const galleryImages = product.images.map((img) => ({
    src: img.image?.url || '/images/product-placeholder.jpg',
    alt: img.alt || product.name,
  }))

  const productSchema = generateProductSchema({
    name: product.name,
    description: product.description || '',
    url: `https://boatmarket.com.ar/productos/${product.slug}`,
    images: product.images.map((img) => img.image?.url).filter(Boolean) as string[],
    price: product.price,
    currency: product.currency || 'USD',
    sku: product.sku,
    brand: product.brand?.name,
    inStock: product.inStock,
    rating:
      product.rating && product.reviewCount
        ? { value: product.rating, count: product.reviewCount }
        : undefined,
    category: product.category?.name,
  })

  const avgRating = product.rating || 0
  const reviewCount = product.reviewCount || 0

  return (
    <>
      <JsonLd data={productSchema} />

      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-6">
          <Breadcrumb
            items={[
              { label: 'Inicio', href: '/' },
              { label: 'Productos', href: '/productos' },
              {
                label: product.category?.name || 'Categoria',
                href: `/productos?categoria=${product.category?.slug}`,
              },
              { label: product.name },
            ]}
          />

          <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Gallery */}
            <Gallery images={galleryImages} />

            {/* Product Info */}
            <div className="space-y-6">
              {product.brand && (
                <p className="text-sm font-medium text-blue-600">{product.brand.name}</p>
              )}
              <h1 className="text-2xl font-bold text-navy-900 lg:text-3xl">
                {product.name}
              </h1>

              {reviewCount > 0 && (
                <div className="flex items-center gap-2">
                  <RatingStars rating={avgRating} />
                  <span className="text-sm text-gray-500">
                    {avgRating.toFixed(1)} ({reviewCount} opinion
                    {reviewCount !== 1 ? 'es' : ''})
                  </span>
                </div>
              )}

              <PriceDisplay
                price={product.price}
                currency={product.currency}
                compareAtPrice={product.compareAtPrice}
              />

              {product.shortDescription && (
                <p className="text-gray-700 leading-relaxed">{product.shortDescription}</p>
              )}

              {/* Stock */}
              <div className="flex items-center gap-2">
                <div
                  className={`h-3 w-3 rounded-full ${
                    product.inStock ? 'bg-green-500' : 'bg-red-500'
                  }`}
                />
                <span
                  className={`text-sm font-medium ${
                    product.inStock ? 'text-green-700' : 'text-red-700'
                  }`}
                >
                  {product.inStock ? 'En stock' : 'Sin stock'}
                </span>
                {product.inStock &&
                  product.stockQuantity != null &&
                  product.stockQuantity <= (product.lowStockThreshold || 5) && (
                    <Badge variant="outline" className="text-amber-600 border-amber-300">
                      Ultimas unidades
                    </Badge>
                  )}
              </div>

              {/* Add to Cart - sticky on mobile */}
              <div className="fixed bottom-0 left-0 right-0 z-40 border-t bg-white p-4 shadow-lg lg:static lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none">
                <Button
                  size="lg"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-lg"
                  disabled={!product.inStock}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  {product.inStock ? 'Agregar al carrito' : 'Sin stock'}
                </Button>
              </div>

              {/* Guarantees */}
              <div className="grid grid-cols-3 gap-3">
                <div className="flex flex-col items-center rounded-lg bg-sky-50 p-3 text-center">
                  <Truck className="h-5 w-5 text-blue-600" />
                  <span className="mt-1 text-xs text-gray-700">Envio a todo el pais</span>
                </div>
                <div className="flex flex-col items-center rounded-lg bg-sky-50 p-3 text-center">
                  <Shield className="h-5 w-5 text-blue-600" />
                  <span className="mt-1 text-xs text-gray-700">Garantia incluida</span>
                </div>
                <div className="flex flex-col items-center rounded-lg bg-sky-50 p-3 text-center">
                  <RotateCcw className="h-5 w-5 text-blue-600" />
                  <span className="mt-1 text-xs text-gray-700">Devolucion gratis</span>
                </div>
              </div>

              <p className="text-xs text-gray-400">SKU: {product.sku}</p>
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="description" className="mt-12">
            <TabsList className="w-full justify-start border-b bg-transparent">
              <TabsTrigger
                value="description"
                className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600"
              >
                Descripcion
              </TabsTrigger>
              <TabsTrigger
                value="specs"
                className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600"
              >
                Especificaciones
              </TabsTrigger>
              <TabsTrigger
                value="reviews"
                className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600"
              >
                Opiniones ({reviewCount})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="mt-6">
              <div className="prose prose-gray max-w-none whitespace-pre-line text-gray-700">
                {product.description || 'Sin descripcion disponible.'}
              </div>
            </TabsContent>

            <TabsContent value="specs" className="mt-6">
              {product.specifications && product.specifications.length > 0 ? (
                <div className="rounded-lg border">
                  {product.specifications.map((spec, i) => (
                    <div
                      key={i}
                      className={`flex items-center justify-between px-4 py-3 ${
                        i % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                      }`}
                    >
                      <span className="text-sm font-medium text-gray-600">{spec.key}</span>
                      <span className="text-sm font-semibold text-navy-900">{spec.value}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No hay especificaciones disponibles.</p>
              )}
            </TabsContent>

            <TabsContent value="reviews" className="mt-6 space-y-8">
              {reviewCount > 0 && (
                <div className="flex items-center gap-6 rounded-lg bg-sky-50 p-6">
                  <div className="text-center">
                    <p className="text-4xl font-bold text-navy-900">{avgRating.toFixed(1)}</p>
                    <RatingStars rating={avgRating} />
                    <p className="mt-1 text-sm text-gray-500">
                      {reviewCount} opinion{reviewCount !== 1 ? 'es' : ''}
                    </p>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                {(product as any).reviews?.map((review: any) => (
                  <Card key={review.id}>
                    <CardContent className="pt-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                            <User className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium text-navy-900">{review.author.name}</p>
                            <div className="flex items-center gap-2">
                              <RatingStars rating={review.rating} size="sm" />
                              <span className="text-xs text-gray-400">
                                {new Date(review.createdAt).toLocaleDateString('es-AR')}
                              </span>
                            </div>
                          </div>
                        </div>
                        {review.verifiedPurchase && (
                          <Badge
                            variant="outline"
                            className="text-xs border-green-300 text-green-700"
                          >
                            Compra verificada
                          </Badge>
                        )}
                      </div>
                      {review.title && (
                        <h4 className="mt-3 font-semibold text-navy-900">{review.title}</h4>
                      )}
                      <p className="mt-2 text-sm text-gray-700 leading-relaxed">
                        {review.content}
                      </p>
                      {review.pros?.length > 0 && (
                        <div className="mt-3">
                          <p className="text-xs font-semibold text-green-700">Pros:</p>
                          <ul className="mt-1 space-y-1">
                            {review.pros.map((p: any, i: number) => (
                              <li key={i} className="text-sm text-gray-600">
                                + {p.text}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {review.cons?.length > 0 && (
                        <div className="mt-2">
                          <p className="text-xs font-semibold text-red-700">Contras:</p>
                          <ul className="mt-1 space-y-1">
                            {review.cons.map((c: any, i: number) => (
                              <li key={i} className="text-sm text-gray-600">
                                - {c.text}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      <div className="mt-3">
                        <Button variant="ghost" size="sm" className="text-xs text-gray-500">
                          <ThumbsUp className="mr-1 h-3 w-3" /> Util ({review.helpfulCount})
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-semibold text-navy-900 mb-4">Deja tu opinion</h3>
                <ReviewForm targetId={product.id} targetType="product" />
              </div>
            </TabsContent>
          </Tabs>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <section className="mt-16">
              <h2 className="mb-6 text-2xl font-bold text-navy-900">
                Productos relacionados
              </h2>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                {relatedProducts.map((p: any) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </section>
          )}
        </div>
      </div>

      {/* Bottom spacer for sticky cart button on mobile */}
      <div className="h-20 lg:hidden" />
    </>
  )
}
