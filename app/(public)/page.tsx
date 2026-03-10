// =============================================
// BOATMARKET - Home Page
// =============================================

import { Suspense } from 'react'
import { prisma } from '@/lib/db/client'
import { HeroSearch } from '@/components/search/HeroSearch'
import { FeaturedBoats } from '@/components/boats/FeaturedBoats'
import { CategoryGrid } from '@/components/shared/CategoryGrid'
import { FeaturedProducts } from '@/components/products/FeaturedProducts'
import { TestimonialSlider } from '@/components/shared/TestimonialSlider'
import { BrandShowcase } from '@/components/shared/BrandShowcase'
import { LatestBlogPosts } from '@/components/shared/LatestBlogPosts'
import { JsonLd } from '@/components/seo/JsonLd'
import { generateWebsiteSchema, generateOrganizationSchema } from '@/lib/seo/schemas'

export default async function HomePage() {
  const [featuredBoats, categories, recentProducts, reviews] = await Promise.all([
    prisma.boat.findMany({
      where: { status: 'ACTIVE', featured: true },
      include: { brand: true, images: true, location: true },
      orderBy: { createdAt: 'desc' },
      take: 8,
    }),
    prisma.category.findMany({
      where: { parentId: null },
      include: { _count: { select: { boats: true } } },
      orderBy: { name: 'asc' },
    }),
    prisma.product.findMany({
      where: { status: 'ACTIVE' },
      include: { brand: true, images: true },
      orderBy: { createdAt: 'desc' },
      take: 6,
    }),
    prisma.review.findMany({
      where: { status: 'APPROVED', rating: { gte: 4 } },
      include: { user: { select: { name: true, image: true } } },
      orderBy: { createdAt: 'desc' },
      take: 6,
    }),
  ])

  return (
    <>
      <JsonLd schema={generateWebsiteSchema()} />
      <JsonLd schema={generateOrganizationSchema()} />

      <section className="relative">
        <HeroSearch />
      </section>

      <section className="container py-16">
        <h2 className="mb-8 text-3xl font-bold tracking-tight">Categorias</h2>
        <CategoryGrid categories={categories} />
      </section>

      <section className="container py-16">
        <h2 className="mb-8 text-3xl font-bold tracking-tight">Embarcaciones Destacadas</h2>
        <Suspense fallback={<div className="grid grid-cols-4 gap-6 animate-pulse" />}>
          <FeaturedBoats boats={featuredBoats} />
        </Suspense>
      </section>

      <section className="bg-muted py-16">
        <div className="container">
          <h2 className="mb-8 text-3xl font-bold tracking-tight">Productos Nauticos</h2>
          <FeaturedProducts products={recentProducts} />
        </div>
      </section>

      <section className="container py-16">
        <TestimonialSlider reviews={reviews} />
      </section>

      <section className="container py-16">
        <BrandShowcase />
      </section>

      <section className="container py-16">
        <LatestBlogPosts />
      </section>
    </>
  )
}
