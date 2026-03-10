// =============================================
// BOATMARKET - Cloudinary SDK Configuration
// =============================================

import { v2 as cloudinary } from 'cloudinary'

const globalForCloudinary = globalThis as unknown as {
  cloudinaryConfigured: boolean
}

if (!globalForCloudinary.cloudinaryConfigured) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
    api_key: process.env.CLOUDINARY_API_KEY!,
    api_secret: process.env.CLOUDINARY_API_SECRET!,
    secure: true,
  })
  globalForCloudinary.cloudinaryConfigured = true
}

export { cloudinary }

export const CLOUDINARY_FOLDERS = {
  BOATS: 'boatmarket/boats',
  PRODUCTS: 'boatmarket/products',
  AVATARS: 'boatmarket/avatars',
  BLOG: 'boatmarket/blog',
  BRANDS: 'boatmarket/brands',
  MISC: 'boatmarket/misc',
} as const

export const UPLOAD_PRESETS = {
  BOAT_IMAGE: 'boatmarket_boats',
  PRODUCT_IMAGE: 'boatmarket_products',
  AVATAR: 'boatmarket_avatars',
} as const

export const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
export const ALLOWED_FORMATS = ['jpg', 'jpeg', 'png', 'webp', 'avif'] as const
