// =============================================
// BOATMARKET - Boat Detail Page
// Server Component with dynamic metadata & JSON-LD
// =============================================

import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { prisma } from '@/lib/db/client'
import { Gallery } from '@/components/shared/Gallery'
import { PriceDisplay } from '@/components/shared/PriceDisplay'
import { BoatSpecs } from '@/components/boats/BoatSpecs'
import { BoatGrid } from '@/components/boats/BoatGrid'
import { InquiryForm } from '@/components/forms/InquiryForm'
import { JsonLd } from '@/components/seo/JsonLd'
import { Breadcrumb } from '@/components/layout/Breadcrumb'
import { generateBoatSchema } from '@/lib/seo/schemas'
import {
  MapPin, Calendar, Ruler, Shield, Star, Phone, Mail, Clock, Eye,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import Image from 'next/image'
import Link from 'next/link'

interface PageProps {
  params: { slug: string }
}

async function getBoat(slug: string) {
  return prisma.boat.findUnique({
    where: { slug, status: 'active' },
    include: {
      seller: {
        select: {
          id: true, name: true, email: true, phone: true,
          avatar: true, role: true, isVerified: true,
          dealerInfo: true, createdAt: true,
        },
      },
      category: true,
      brand: true,
      images: { orderBy: { isPrimary: 'desc' } },
      tags: true,
    },
  })
}

async function getSimilarBoats(categoryId: string, excludeId: string) {
  return prisma.boat.findMany({
    where: { categoryId, id: { not: excludeId }, status: 'active' },
    include: {
      images: { where: { isPrimary: true }, take: 1 },
      brand: { select: { name: true, slug: true } },
      category: { select: { name: true, slug: true } },
    },
    take: 4,
    orderBy: { createdAt: 'desc' },
  })
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const boat = await getBoat(params.slug)
  if (!boat) return { title: 'Embarcacion no encontrada | BoatMarket' }

  const title = `${boat.title} - ${boat.year} | BoatMarket`
  const description =
    boat.description?.slice(0, 160) ||
    `${boat.title} ${boat.year} en venta. ${boat.lengthFt}ft. Consulta en BoatMarket.`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://boatmarket.com.ar/embarcaciones/${boat.slug}`,
      images: boat.images?.[0]?.image?.url
        ? [{ url: boat.images[0].image.url, width: 1200, height: 630 }]
        : [],
      type: 'website',
    },
    alternates: { canonical: `https://boatmarket.com.ar/embarcaciones/${boat.slug}` },
  }
}

export async function generateStaticParams() {
  const boats = await prisma.boat.findMany({
    where: { status: 'active' },
    select: { slug: true },
    orderBy: { viewCount: 'desc' },
    take: 50,
  })
  return boats.map((b) => ({ slug: b.slug }))
}

const conditionLabels: Record<string, string> = {
  new: 'Nuevo',
  used: 'Usado',
  certified_pre_owned: 'Certificado',
  restored: 'Restaurado',
}

export default async function BoatDetailPage({ params }: PageProps) {
  const boat = await getBoat(params.slug)
  if (!boat) notFound()

  const similarBoats = await getSimilarBoats(boat.categoryId, boat.id)

  // Track view (fire-and-forget)
  prisma.boat
    .update({ where: { id: boat.id }, data: { viewCount: { increment: 1 } } })
    .catch(() => {})

  const galleryImages = boat.images.map((img) => ({
    src: img.image?.url || '/images/boat-placeholder.jpg',
    alt: img.alt || boat.title,
  }))

  const boatSchema = generateBoatSchema({
    title: boat.title,
    description: boat.description || '',
    url: `https://boatmarket.com.ar/embarcaciones/${boat.slug}`,
    images: boat.images.map((img) => img.image?.url).filter(Boolean) as string[],
    price: boat.price,
    currency: boat.currency || 'USD',
    condition: boat.condition,
    year: boat.year,
    brand: boat.brand?.name || 'Sin marca',
    model: boat.model,
    lengthFt: boat.lengthFt,
    fuelType: boat.fuelType,
    engineHp: boat.engineHp,
    engineCount: boat.engineCount,
    seller: { name: boat.seller.name },
    location: boat.location,
  })

  return (
    <>
      <JsonLd data={boatSchema} />

      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-6">
          <Breadcrumb
            items={[
              { label: 'Inicio', href: '/' },
              { label: 'Embarcaciones', href: '/embarcaciones' },
              { label: boat.category?.name || 'Categoria', href: `/embarcaciones?type=${boat.category?.slug}` },
              { label: boat.title },
            ]}
          />

          {/* Gallery */}
          <section className="mt-6">
            <Gallery images={galleryImages} />
          </section>

          {/* Main Content */}
          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Left Column - Details */}
            <div className="lg:col-span-2 space-y-8">
              {/* Title & Quick Info */}
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <Badge variant="secondary" className="bg-sky-100 text-navy-900">
                    {conditionLabels[boat.condition] || boat.condition}
                  </Badge>
                  <Badge variant="outline">{boat.year}</Badge>
                  {boat.isFeatured && (
                    <Badge className="bg-amber-500 text-white">
                      <Star className="mr-1 h-3 w-3" /> Destacada
                    </Badge>
                  )}
                </div>

                <h1 className="text-3xl font-bold text-navy-900 lg:text-4xl">
                  {boat.title}
                </h1>

                {boat.brand && (
                  <p className="mt-1 text-lg text-gray-500">
                    {boat.brand.name} {boat.model && `- ${boat.model}`}
                  </p>
                )}

                <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-gray-600">
                  {boat.location?.city && (
                    <span className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {boat.location.city}
                      {boat.location.state ? `, ${boat.location.state}` : ''}
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" /> Ano {boat.year}
                  </span>
                  <span className="flex items-center gap-1">
                    <Ruler className="h-4 w-4" /> {boat.lengthFt} pies
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="h-4 w-4" /> {boat.viewCount} vistas
                  </span>
                </div>

                <div className="mt-6">
                  <PriceDisplay
                    price={boat.price}
                    currency={boat.currency}
                    negotiable={boat.priceNegotiable}
                    financing={boat.financingAvail}
                    monthlyEstimate={boat.monthlyEstimate}
                  />
                </div>
              </div>

              <Separator />

              {/* Description */}
              <div>
                <h2 className="text-xl font-semibold text-navy-900 mb-4">Descripcion</h2>
                <div className="prose prose-gray max-w-none text-gray-700 leading-relaxed whitespace-pre-line">
                  {boat.description}
                </div>
              </div>

              <Separator />

              {/* Specs */}
              <BoatSpecs boat={boat} />
            </div>

            {/* Right Column - Inquiry & Seller */}
            <div className="space-y-6">
              {/* Inquiry Form */}
              <Card className="border-blue-200 shadow-md sticky top-24">
                <CardHeader className="bg-gradient-to-r from-navy-900 to-blue-800 text-white rounded-t-lg">
                  <CardTitle className="text-lg">Consultar por esta embarcacion</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <InquiryForm
                    boatId={boat.id}
                    boatTitle={boat.title}
                    sellerId={boat.seller.id}
                  />
                </CardContent>
              </Card>

              {/* Seller Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Vendedor</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4">
                    <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full bg-gray-200">
                      {boat.seller.avatar?.url ? (
                        <Image
                          src={boat.seller.avatar.url}
                          alt={boat.seller.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-xl font-bold text-gray-500">
                          {boat.seller.name.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-navy-900">
                        {boat.seller.dealerInfo?.companyName || boat.seller.name}
                      </p>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        {boat.seller.isVerified && (
                          <Badge variant="outline" className="text-xs border-green-300 text-green-700">
                            <Shield className="mr-1 h-3 w-3" /> Verificado
                          </Badge>
                        )}
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          Miembro desde {new Date(boat.seller.createdAt).getFullYear()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 space-y-2">
                    {boat.seller.phone && (
                      <Button variant="outline" className="w-full justify-start" asChild>
                        <a href={`tel:${boat.seller.phone}`}>
                          <Phone className="mr-2 h-4 w-4" /> {boat.seller.phone}
                        </a>
                      </Button>
                    )}
                    <Button variant="outline" className="w-full justify-start" asChild>
                      <a href={`mailto:${boat.seller.email}`}>
                        <Mail className="mr-2 h-4 w-4" /> Enviar email
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Similar Boats */}
          {similarBoats.length > 0 && (
            <section className="mt-16">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-navy-900">
                  Embarcaciones similares
                </h2>
                <Link
                  href={`/embarcaciones?type=${boat.category?.slug}`}
                  className="text-sm font-medium text-blue-600 hover:underline"
                >
                  Ver todas
                </Link>
              </div>
              <BoatGrid boats={similarBoats} columns={4} />
            </section>
          )}
        </div>
      </div>
    </>
  )
}
