// =============================================
// BOATMARKET - Application Constants
// Centralized configuration values
// =============================================

// ---- User Roles ----
export const USER_ROLES = {
  ADMIN: 'ADMIN',
  DEALER: 'DEALER',
  SELLER: 'SELLER',
  BUYER: 'BUYER',
} as const

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES]

// ---- Boat Categories ----
export const BOAT_CATEGORIES = [
  { slug: 'lanchas', label: 'Lanchas', icon: 'Ship' },
  { slug: 'veleros', label: 'Veleros', icon: 'Sailboat' },
  { slug: 'cruceros', label: 'Cruceros', icon: 'Anchor' },
  { slug: 'motos-de-agua', label: 'Motos de Agua', icon: 'Waves' },
  { slug: 'botes', label: 'Botes', icon: 'LifeBuoy' },
  { slug: 'kayaks', label: 'Kayaks', icon: 'Droplets' },
  { slug: 'gomones', label: 'Gomones', icon: 'Circle' },
  { slug: 'yates', label: 'Yates', icon: 'Crown' },
  { slug: 'catamaranes', label: 'Catamaranes', icon: 'Layers' },
  { slug: 'pesqueros', label: 'Pesqueros', icon: 'Fish' },
] as const

// ---- Product Categories ----
export const PRODUCT_CATEGORIES = [
  { slug: 'motores', label: 'Motores', icon: 'Cog' },
  { slug: 'trailers', label: 'Trailers', icon: 'Truck' },
  { slug: 'electronica', label: 'Electronica', icon: 'Monitor' },
  { slug: 'seguridad', label: 'Seguridad', icon: 'Shield' },
  { slug: 'accesorios', label: 'Accesorios', icon: 'Package' },
  { slug: 'anclas-y-amarre', label: 'Anclas y Amarre', icon: 'Anchor' },
  { slug: 'pinturas', label: 'Pinturas', icon: 'Paintbrush' },
  { slug: 'pesca', label: 'Pesca', icon: 'Fish' },
  { slug: 'limpieza', label: 'Limpieza', icon: 'Sparkles' },
  { slug: 'confort', label: 'Confort', icon: 'Sofa' },
  { slug: 'repuestos', label: 'Repuestos', icon: 'Wrench' },
] as const

// ---- Fuel Types ----
export const FUEL_TYPES = [
  { value: 'NAFTA', label: 'Nafta' },
  { value: 'DIESEL', label: 'Diesel' },
  { value: 'ELECTRICO', label: 'Electrico' },
  { value: 'HIBRIDO', label: 'Hibrido' },
  { value: 'SIN_MOTOR', label: 'Sin Motor' },
] as const

// ---- Conditions ----
export const CONDITIONS = [
  { value: 'NUEVO', label: 'Nuevo' },
  { value: 'USADO', label: 'Usado' },
  { value: 'REACONDICIONADO', label: 'Reacondicionado' },
] as const

// ---- Listing Status ----
export const LISTING_STATUS = {
  DRAFT: 'DRAFT',
  ACTIVE: 'ACTIVE',
  PAUSED: 'PAUSED',
  SOLD: 'SOLD',
  EXPIRED: 'EXPIRED',
} as const

// ---- Inquiry Status ----
export const INQUIRY_STATUS = {
  PENDING: 'PENDING',
  RESPONDED: 'RESPONDED',
  CLOSED: 'CLOSED',
} as const

// ---- Pagination ----
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 12,
  MAX_PAGE_SIZE: 48,
  BOATS_PER_PAGE: 12,
  PRODUCTS_PER_PAGE: 16,
  BLOG_PER_PAGE: 9,
} as const

// ---- Price Ranges (ARS) ----
export const PRICE_RANGES = [
  { min: 0, max: 5_000_000, label: 'Hasta $5M' },
  { min: 5_000_000, max: 15_000_000, label: '$5M - $15M' },
  { min: 15_000_000, max: 30_000_000, label: '$15M - $30M' },
  { min: 30_000_000, max: 60_000_000, label: '$30M - $60M' },
  { min: 60_000_000, max: 100_000_000, label: '$60M - $100M' },
  { min: 100_000_000, max: Infinity, label: 'Mas de $100M' },
] as const

// ---- Year Ranges ----
export const YEAR_RANGE = {
  MIN: 1970,
  MAX: new Date().getFullYear() + 1,
} as const

// ---- Length Ranges (feet) ----
export const LENGTH_RANGES = [
  { min: 0, max: 20, label: 'Hasta 20 pies' },
  { min: 20, max: 30, label: '20 - 30 pies' },
  { min: 30, max: 40, label: '30 - 40 pies' },
  { min: 40, max: 60, label: '40 - 60 pies' },
  { min: 60, max: Infinity, label: 'Mas de 60 pies' },
] as const

// ---- Compare ----
export const MAX_COMPARE_ITEMS = 3

// ---- Media ----
export const MEDIA = {
  MAX_IMAGES_PER_LISTING: 20,
  MAX_IMAGE_SIZE_MB: 10,
  ACCEPTED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/webp', 'image/avif'],
  CLOUDINARY_FOLDER: 'boatmarket',
  THUMBNAIL_WIDTH: 400,
  GALLERY_WIDTH: 1200,
} as const

// ---- Argentine Provinces ----
export const PROVINCES = [
  'Buenos Aires', 'CABA', 'Catamarca', 'Chaco', 'Chubut',
  'Cordoba', 'Corrientes', 'Entre Rios', 'Formosa', 'Jujuy',
  'La Pampa', 'La Rioja', 'Mendoza', 'Misiones', 'Neuquen',
  'Rio Negro', 'Salta', 'San Juan', 'San Luis', 'Santa Cruz',
  'Santa Fe', 'Santiago del Estero', 'Tierra del Fuego', 'Tucuman',
] as const

// ---- Site Config ----
export const SITE_CONFIG = {
  name: 'BoatMarket',
  description: 'Marketplace de embarcaciones y productos nauticos en Argentina',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://boatmarket.com.ar',
  ogImage: '/og-default.jpg',
  locale: 'es-AR',
  currency: 'ARS',
  currencySymbol: '$',
  country: 'Argentina',
  contactEmail: 'info@boatmarket.com.ar',
  supportEmail: 'soporte@boatmarket.com.ar',
} as const
