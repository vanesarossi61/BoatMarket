import { NextRequest, NextResponse } from 'next/server'
import { searchBoats } from '@/lib/search/meilisearch'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl

    // Parse query parameters
    const q = searchParams.get('q') || ''
    const type = searchParams.get('type') || undefined
    const minPrice = searchParams.get('minPrice')
      ? Number(searchParams.get('minPrice'))
      : undefined
    const maxPrice = searchParams.get('maxPrice')
      ? Number(searchParams.get('maxPrice'))
      : undefined
    const minYear = searchParams.get('minYear')
      ? Number(searchParams.get('minYear'))
      : undefined
    const maxYear = searchParams.get('maxYear')
      ? Number(searchParams.get('maxYear'))
      : undefined
    const minLength = searchParams.get('minLength')
      ? Number(searchParams.get('minLength'))
      : undefined
    const maxLength = searchParams.get('maxLength')
      ? Number(searchParams.get('maxLength'))
      : undefined
    const brand = searchParams.get('brand') || undefined
    const fuel = searchParams.get('fuel') || undefined
    const condition = searchParams.get('condition') || undefined
    const location = searchParams.get('location') || undefined
    const sort = (searchParams.get('sort') as 'relevance' | 'price_asc' | 'price_desc' | 'newest') || 'relevance'
    const page = Math.max(1, Number(searchParams.get('page')) || 1)
    const limit = Math.min(100, Math.max(1, Number(searchParams.get('limit')) || 20))

    // Build filter array for Meilisearch
    const filters: string[] = []

    if (type) {
      filters.push(`category.slug = "${type}"`)
    }
    if (minPrice !== undefined) {
      filters.push(`price >= ${minPrice}`)
    }
    if (maxPrice !== undefined) {
      filters.push(`price <= ${maxPrice}`)
    }
    if (minYear !== undefined) {
      filters.push(`year >= ${minYear}`)
    }
    if (maxYear !== undefined) {
      filters.push(`year <= ${maxYear}`)
    }
    if (minLength !== undefined) {
      filters.push(`specs.length >= ${minLength}`)
    }
    if (maxLength !== undefined) {
      filters.push(`specs.length <= ${maxLength}`)
    }
    if (brand) {
      filters.push(`brand.slug = "${brand}"`)
    }
    if (fuel) {
      filters.push(`specs.fuelType = "${fuel}"`)
    }
    if (condition) {
      filters.push(`condition = "${condition}"`)
    }
    if (location) {
      filters.push(`location.province = "${location}"`)
    }

    // Build sort parameter
    let sortParam: string[] = []
    switch (sort) {
      case 'price_asc':
        sortParam = ['price:asc']
        break
      case 'price_desc':
        sortParam = ['price:desc']
        break
      case 'newest':
        sortParam = ['createdAt:desc']
        break
      default:
        // relevance — no explicit sort, Meilisearch uses relevance by default
        break
    }

    // Execute search
    const searchResult = await searchBoats(q, {
      filter: filters.length > 0 ? filters.join(' AND ') : undefined,
      sort: sortParam.length > 0 ? sortParam : undefined,
      limit,
      offset: (page - 1) * limit,
      facets: [
        'category.name',
        'brand.name',
        'condition',
        'specs.fuelType',
        'location.province',
      ],
    })

    const totalPages = Math.ceil(searchResult.estimatedTotalHits / limit)

    return NextResponse.json({
      results: searchResult.hits,
      totalHits: searchResult.estimatedTotalHits,
      facets: searchResult.facetDistribution,
      page,
      totalPages,
      processingTimeMs: searchResult.processingTimeMs,
    })
  } catch (error) {
    console.error('Search API error:', error)
    return NextResponse.json(
      { error: 'Error al realizar la busqueda' },
      { status: 500 }
    )
  }
}
