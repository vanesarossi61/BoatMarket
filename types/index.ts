// =============================================
// BOATMARKET - Central Type Definitions
// Based on Prisma schema + Payload CMS collections
// =============================================

// ---- Enums ----
export type UserRole = 'ADMIN' | 'DEALER' | 'SELLER' | 'BUYER'
export type BoatCondition = 'new' | 'used' | 'certified_pre_owned' | 'restored'
export type BoatStatus = 'draft' | 'pending_review' | 'active' | 'sold' | 'expired' | 'archived' | 'rejected'
export type ProductStatus = 'draft' | 'active' | 'discontinued'
export type InquiryType = 'boat' | 'product' | 'general' | 'negotiation' | 'visit' | 'sea_trial'
export type InquiryStatus = 'new' | 'read' | 'replied' | 'closed' | 'spam'
export type ReviewStatus = 'pending' | 'approved' | 'rejected'
export type ReviewType = 'boat' | 'product' | 'dealer'
export type BlogCategory = 'buying_guides' | 'maintenance' | 'destinations' | 'lifestyle' | 'news' | 'fishing' | 'safety' | 'technology'
export type FuelType = 'gasoline' | 'diesel' | 'electric' | 'hybrid' | 'none'
export type EngineType = 'outboard' | 'inboard' | 'sterndrive' | 'jet' | 'electric' | 'sail' | 'none'
export type HullMaterial = 'fiberglass' | 'aluminum' | 'wood' | 'pvc_hypalon' | 'carbon_fiber' | 'steel' | 'composite'
export type Currency = 'USD' | 'EUR' | 'GBP' | 'ARS'
export type DealerBadge = 'none' | 'verified' | 'premium' | 'top-seller'

// ---- Media ----
export interface MediaItem {
  id: string
  url: string
  alt?: string
  caption?: string
  width?: number
  height?: number
  mimeType?: string
  filename?: string
}

export interface BoatImage {
  image: MediaItem
  alt?: string
  caption?: string
  isPrimary: boolean
}

// ---- Brand ----
export interface Brand {
  id: string
  name: string
  slug: string
  logo?: MediaItem
  description?: string
  website?: string
  country?: string
  foundedYear?: number
  brandType: 'boat' | 'engine' | 'electronics' | 'accessories' | 'multi'
  isFeatured: boolean
}

// ---- Category ----
export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  image?: MediaItem
  icon?: string
  parent?: Category | null
  categoryType: 'boat' | 'product' | 'both'
  order: number
  isActive: boolean
  isFeatured: boolean
  seo?: { metaTitle?: string; metaDescription?: string }
  _count?: { boats?: number; products?: number }
}

// ---- Tag ----
export interface Tag {
  id: string
  name: string
  slug: string
}

// ---- User ----
export interface User {
  id: string
  name: string
  email: string
  phone?: string
  avatar?: MediaItem
  role: UserRole
  isVerified: boolean
  isActive: boolean
  dealerInfo?: {
    companyName?: string
    companyLogo?: MediaItem
    website?: string
    description?: string
    address?: string
    city?: string
    state?: string
    country?: string
    zipCode?: string
    latitude?: number
    longitude?: number
    dealerBadge?: DealerBadge
    dealerSince?: string
  }
  createdAt: string
  updatedAt: string
}

// ---- Location ----
export interface BoatLocation {
  city?: string
  state?: string
  country?: string
  zipCode?: string
  marina?: string
  latitude?: number
  longitude?: number
  waterType?: 'freshwater' | 'saltwater' | 'both'
}

// ---- Boat ----
export interface Boat {
  id: string
  title: string
  subtitle?: string
  slug: string
  description: string
  condition: BoatCondition
  year: number
  hullId?: string
  category: Category
  brand?: Brand
  tags?: Tag[]
  seller: User

  // Price
  price: number
  currency: Currency
  priceNegotiable: boolean
  priceDrop?: number
  priceDropDate?: string
  taxIncluded: boolean
  financingAvail: boolean
  monthlyEstimate?: number

  // Specs - Dimensions
  lengthFt: number
  lengthM?: number
  beamFt?: number
  beamM?: number
  draftFt?: number
  draftM?: number
  weightLbs?: number
  weightKg?: number

  // Specs - Capacity
  cabins?: number
  berths?: number
  heads?: number
  maxPassengers?: number

  // Specs - Tanks
  fuelCapGal?: number
  fuelCapLt?: number
  waterCapGal?: number
  holdingCapGal?: number
  bridgeClearance?: number
  deadrise?: number

  // Specs - Hull
  hullMaterial?: HullMaterial
  hullType?: string
  hullColor?: string
  deckMaterial?: string

  // Engine
  engineType?: EngineType
  engineMake?: string
  engineModel?: string
  engineYear?: number
  engineHp?: number
  engineCount?: number
  totalHp?: number
  engineHours?: number
  engineStroke?: 'two_stroke' | 'four_stroke'
  fuelType?: FuelType
  propellerType?: string
  driveType?: string
  maxSpeedKnots?: number
  cruiseSpeedKnots?: number

  // Equipment
  hasGps: boolean
  hasFishfinder: boolean
  hasRadar: boolean
  hasVhf: boolean
  hasAutopilot: boolean
  hasChartplotter: boolean
  hasAis: boolean
  hasAirCond: boolean
  hasGenerator: boolean
  hasBimini: boolean
  hasWindlass: boolean
  hasBowThruster: boolean
  hasSwimPlatform: boolean
  hasLivewell: boolean
  hasStabilizers: boolean
  hasShorepower: boolean
  generatorHrs?: number
  electronicsDesc?: string
  equipmentDesc?: string

  // Location
  location: BoatLocation

  // Media
  images: BoatImage[]

  // SEO
  metaTitle?: string
  metaDescription?: string
  ogImage?: MediaItem
  canonicalUrl?: string

  // Status
  status: BoatStatus
  isFeatured: boolean
  featuredUntil?: string
  viewCount: number
  inquiryCount: number
  publishedAt?: string
  createdAt: string
  updatedAt: string
}

// ---- Boat Card (lighter version for lists) ----
export interface BoatCard {
  id: string
  title: string
  slug: string
  condition: BoatCondition
  year: number
  price: number
  currency: Currency
  priceNegotiable: boolean
  financingAvail: boolean
  lengthFt: number
  brand?: { name: string; slug: string }
  category?: { name: string; slug: string }
  location: { city?: string; state?: string }
  images: Array<{ image: { url: string }; alt?: string; isPrimary: boolean }>
  status: BoatStatus
  isFeatured: boolean
  viewCount: number
  createdAt: string
}

// ---- Product ----
export interface Product {
  id: string
  name: string
  slug: string
  sku: string
  description?: string
  shortDescription?: string
  price: number
  compareAtPrice?: number
  currency: Currency
  inStock: boolean
  stockQuantity?: number
  lowStockThreshold?: number
  weight?: number
  category: Category
  brand?: Brand
  tags?: Tag[]
  compatibleBoatTypes?: string[]
  images: Array<{ image: MediaItem; alt?: string }>
  specifications?: Array<{ key: string; value: string }>
  status: ProductStatus
  featured: boolean
  rating?: number
  reviewCount?: number
  createdAt: string
  updatedAt: string
}

// ---- Review ----
export interface Review {
  id: string
  title: string
  reviewType: ReviewType
  boat?: Boat
  product?: Product
  dealer?: User
  author: User
  rating: number
  conditionRating?: number
  valueRating?: number
  serviceRating?: number
  content: string
  pros?: Array<{ text: string }>
  cons?: Array<{ text: string }>
  images?: Array<{ image: MediaItem }>
  verifiedPurchase: boolean
  helpfulCount: number
  status: ReviewStatus
  moderationNote?: string
  createdAt: string
  updatedAt: string
}

// ---- Inquiry ----
export interface Inquiry {
  id: string
  subject: string
  inquiryType: InquiryType
  from: User
  to: User
  boat?: Boat
  product?: Product
  message: string
  replies?: Array<{
    author: User
    message: string
    sentAt: string
  }>
  preferredContact: 'email' | 'phone' | 'whatsapp' | 'inapp'
  phone?: string
  status: InquiryStatus
  priority: 'low' | 'normal' | 'high' | 'urgent'
  createdAt: string
  updatedAt: string
}

// ---- Blog Post ----
export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  coverImage: MediaItem
  author: User
  category: BlogCategory
  tags?: Tag[]
  relatedBoats?: Boat[]
  relatedProducts?: Product[]
  seo?: { metaTitle?: string; metaDescription?: string; ogImage?: MediaItem }
  readingTime?: number
  featured: boolean
  status: 'draft' | 'published' | 'archived'
  publishedAt?: string
  createdAt: string
  updatedAt: string
}

// ---- Search ----
export interface SearchFilters {
  query?: string
  type?: string[]
  condition?: BoatCondition[]
  brand?: string[]
  category?: string[]
  fuelType?: FuelType[]
  hullMaterial?: HullMaterial[]
  priceMin?: number
  priceMax?: number
  yearMin?: number
  yearMax?: number
  lengthMin?: number
  lengthMax?: number
  location?: string
  radius?: number
  sortBy?: 'price_asc' | 'price_desc' | 'year_desc' | 'year_asc' | 'length_desc' | 'newest' | 'relevance'
  page?: number
  hitsPerPage?: number
}

export interface FacetDistribution {
  [key: string]: Record<string, number>
}

export interface SearchResult<T = BoatCard> {
  hits: T[]
  totalHits: number
  page: number
  totalPages: number
  hitsPerPage: number
  processingTimeMs: number
  facetDistribution?: FacetDistribution
  query: string
}

// ---- Cart ----
export interface CartItem {
  productId: string
  product: Product
  quantity: number
  addedAt: string
}

export interface Cart {
  items: CartItem[]
  subtotal: number
  shipping: number
  total: number
  itemCount: number
  currency: Currency
}

// ---- Checkout ----
export interface CheckoutSession {
  id: string
  stripeSessionId: string
  userId: string
  items: CartItem[]
  subtotal: number
  shipping: number
  total: number
  currency: Currency
  status: 'pending' | 'completed' | 'cancelled' | 'expired'
  shippingAddress?: {
    name: string
    line1: string
    line2?: string
    city: string
    state: string
    postalCode: string
    country: string
  }
  createdAt: string
}

// ---- Dashboard ----
export interface DashboardStats {
  totalListings: number
  activeListings: number
  totalViews: number
  viewsTrend: number
  totalInquiries: number
  inquiriesTrend: number
  totalFavorites: number
  favoritesTrend: number
  recentInquiries: Array<{
    id: string
    subject: string
    from: { name: string; email: string }
    boat?: { title: string; slug: string }
    status: InquiryStatus
    createdAt: string
  }>
  viewsChart: Array<{ date: string; views: number }>
}

// ---- API Response Wrapper ----
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// ---- Pagination ----
export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
}
