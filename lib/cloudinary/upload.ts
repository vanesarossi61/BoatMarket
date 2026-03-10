// =============================================
// BOATMARKET - Cloudinary Upload & Transform
// =============================================

import { cloudinary, CLOUDINARY_FOLDERS, MAX_FILE_SIZE, ALLOWED_FORMATS } from './client'
import type { UploadApiResponse, UploadApiErrorResponse } from 'cloudinary'

interface UploadOptions {
  folder?: string
  publicId?: string
  tags?: string[]
  overwrite?: boolean
  transformation?: Record<string, unknown>[]
}

export async function uploadImage(
  source: string | Buffer,
  options: UploadOptions = {}
): Promise<UploadApiResponse> {
  const {
    folder = CLOUDINARY_FOLDERS.MISC,
    publicId,
    tags = ['boatmarket'],
    overwrite = false,
    transformation,
  } = options

  return new Promise((resolve, reject) => {
    const uploadOptions = {
      folder,
      public_id: publicId,
      tags,
      overwrite,
      resource_type: 'image' as const,
      allowed_formats: [...ALLOWED_FORMATS],
      max_bytes: MAX_FILE_SIZE,
      transformation: transformation || [
        { quality: 'auto:best', fetch_format: 'auto' },
      ],
      eager: [
        { width: 400, height: 300, crop: 'fill', quality: 'auto', fetch_format: 'avif' },
        { width: 800, height: 600, crop: 'fill', quality: 'auto', fetch_format: 'webp' },
        { width: 1200, height: 900, crop: 'fill', quality: 'auto', fetch_format: 'webp' },
      ],
      eager_async: true,
    }

    if (typeof source === 'string' && source.startsWith('data:')) {
      cloudinary.uploader.upload(source, uploadOptions, (error, result) => {
        if (error) reject(error as UploadApiErrorResponse)
        else resolve(result as UploadApiResponse)
      })
    } else if (Buffer.isBuffer(source)) {
      const stream = cloudinary.uploader.upload_stream(
        uploadOptions,
        (error, result) => {
          if (error) reject(error as UploadApiErrorResponse)
          else resolve(result as UploadApiResponse)
        }
      )
      stream.end(source)
    } else {
      cloudinary.uploader.upload(source, uploadOptions, (error, result) => {
        if (error) reject(error as UploadApiErrorResponse)
        else resolve(result as UploadApiResponse)
      })
    }
  })
}

export async function uploadMultiple(
  sources: Array<{ source: string | Buffer; options?: UploadOptions }>,
): Promise<UploadApiResponse[]> {
  const results = await Promise.allSettled(
    sources.map(({ source, options }) => uploadImage(source, options))
  )

  const successful: UploadApiResponse[] = []
  const errors: string[] = []

  results.forEach((result, index) => {
    if (result.status === 'fulfilled') {
      successful.push(result.value)
    } else {
      errors.push(`Image ${index + 1}: ${result.reason?.message || 'Error desconocido'}`)
    }
  })

  if (errors.length > 0) {
    console.error('Errores al subir imagenes:', errors)
  }

  return successful
}

export async function deleteImage(publicId: string): Promise<{ result: string }> {
  return cloudinary.uploader.destroy(publicId, {
    resource_type: 'image',
    invalidate: true,
  })
}

export async function deleteMultiple(publicIds: string[]): Promise<Record<string, string>> {
  const result = await cloudinary.api.delete_resources(publicIds, {
    resource_type: 'image',
    invalidate: true,
  })
  return result.deleted
}

interface TransformOptions {
  width?: number
  height?: number
  crop?: 'fill' | 'fit' | 'scale' | 'thumb' | 'limit'
  quality?: 'auto' | 'auto:best' | 'auto:low' | number
  format?: 'avif' | 'webp' | 'jpg' | 'png' | 'auto'
  gravity?: 'auto' | 'face' | 'center'
  watermark?: boolean
  blur?: number
}

export function generateTransformUrl(
  publicId: string,
  options: TransformOptions = {}
): string {
  const {
    width,
    height,
    crop = 'fill',
    quality = 'auto',
    format = 'auto',
    gravity = 'auto',
    watermark = false,
    blur,
  } = options

  const transformations: Record<string, unknown>[] = []

  // Main transformation
  const main: Record<string, unknown> = {
    quality,
    fetch_format: format,
    gravity,
  }
  if (width) main.width = width
  if (height) main.height = height
  if (width || height) main.crop = crop
  if (blur) main.effect = `blur:${blur}`
  transformations.push(main)

  // Watermark overlay
  if (watermark) {
    transformations.push({
      overlay: 'boatmarket:watermark',
      gravity: 'south_east',
      x: 20,
      y: 20,
      opacity: 60,
      width: 150,
      crop: 'scale',
    })
  }

  return cloudinary.url(publicId, {
    transformation: transformations,
    secure: true,
  })
}

// Pre-built transform presets
export const IMAGE_PRESETS = {
  thumbnail: (publicId: string) =>
    generateTransformUrl(publicId, { width: 150, height: 150, crop: 'thumb', gravity: 'face' }),
  card: (publicId: string) =>
    generateTransformUrl(publicId, { width: 400, height: 300, format: 'avif' }),
  gallery: (publicId: string) =>
    generateTransformUrl(publicId, { width: 800, height: 600, format: 'webp' }),
  hero: (publicId: string) =>
    generateTransformUrl(publicId, { width: 1200, height: 600, format: 'webp' }),
  fullSize: (publicId: string) =>
    generateTransformUrl(publicId, { width: 1920, quality: 'auto:best', format: 'webp', watermark: true }),
  ogImage: (publicId: string) =>
    generateTransformUrl(publicId, { width: 1200, height: 630, format: 'jpg' }),
}
