// =============================================
// BOATMARKET - Meilisearch Client & Index Setup
// Sub-50ms faceted search
// =============================================

import { MeiliSearch } from 'meilisearch'

export const meili = new MeiliSearch({
  host: process.env.MEILISEARCH_HOST || 'http://localhost:7700',
  apiKey: process.env.MEILISEARCH_API_KEY || 'masterKey',
})

// Index names
export const INDICES = {
  BOATS: 'boats',
  PRODUCTS: 'products',
  BLOG: 'blog-posts',
} as const

// Searchable attributes per index
const BOATS_SEARCHABLE = [
  'title', 'brand', 'model', 'description',
  'location.city', 'location.state', 'location.country',
  'category', 'subcategory', 'sellerName',
]

const BOATS_FILTERABLE = [
  'type', 'condition', 'brand', 'yearBuilt', 'price',
  'lengthFt', 'fuelType', 'hullMaterial', 'engineCount',
  'location.state', 'location.country', 'location.lat', 'location.lng',
  'status', 'isFeatured', 'hasTrailer',
]

const BOATS_SORTABLE = [
  'price', 'yearBuilt', 'lengthFt', 'createdAt', 'views',
]

const PRODUCTS_SEARCHABLE = [
  'name', 'description', 'brand', 'category', 'sku',
]

const PRODUCTS_FILTERABLE = [
  'category', 'brand', 'price', 'inStock',
  'compatibleBoatTypes', 'isOnSale',
]

const PRODUCTS_SORTABLE = ['price', 'createdAt', 'rating']

// Setup all indices with their config
export async function setupIndices() {
  // Boats index
  const boatsIndex = meili.index(INDICES.BOATS)
  await boatsIndex.updateSearchableAttributes(BOATS_SEARCHABLE)
  await boatsIndex.updateFilterableAttributes(BOATS_FILTERABLE)
  await boatsIndex.updateSortableAttributes(BOATS_SORTABLE)
  await boatsIndex.updateDisplayedAttributes(['*'])
  await boatsIndex.updateTypoTolerance({
    enabled: true,
    minWordSizeForTypos: { oneTypo: 4, twoTypos: 8 },
  })

  // Products index
  const productsIndex = meili.index(INDICES.PRODUCTS)
  await productsIndex.updateSearchableAttributes(PRODUCTS_SEARCHABLE)
  await productsIndex.updateFilterableAttributes(PRODUCTS_FILTERABLE)
  await productsIndex.updateSortableAttributes(PRODUCTS_SORTABLE)

  // Blog index
  const blogIndex = meili.index(INDICES.BLOG)
  await blogIndex.updateSearchableAttributes(['title', 'excerpt', 'content', 'tags'])
  await blogIndex.updateFilterableAttributes(['category', 'tags', 'status'])
  await blogIndex.updateSortableAttributes(['publishedAt'])

  console.log('Meilisearch indices configured successfully')
}

// Search helpers
export async function searchBoats(query: string, options?: {
  filters?: string
  sort?: string[]
  page?: number
  hitsPerPage?: number
  facets?: string[]
}) {
  return meili.index(INDICES.BOATS).search(query, {
    filter: options?.filters,
    sort: options?.sort,
    page: options?.page || 1,
    hitsPerPage: options?.hitsPerPage || 24,
    facets: options?.facets || BOATS_FILTERABLE,
    attributesToHighlight: ['title', 'description'],
    highlightPreTag: '<mark>',
    highlightPostTag: '</mark>',
  })
}

export async function searchProducts(query: string, options?: {
  filters?: string
  sort?: string[]
  page?: number
  hitsPerPage?: number
}) {
  return meili.index(INDICES.PRODUCTS).search(query, {
    filter: options?.filters,
    sort: options?.sort,
    page: options?.page || 1,
    hitsPerPage: options?.hitsPerPage || 24,
    facets: PRODUCTS_FILTERABLE,
  })
}
