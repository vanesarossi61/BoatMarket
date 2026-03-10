// =============================================
// BOATMARKET - Zod Validation Schemas
// Forms, API inputs, query params
// =============================================

import { z } from 'zod'

// ---- Auth schemas ----
export const loginSchema = z.object({
  email: z.string().email('Email invalido'),
  password: z.string().min(8, 'Minimo 8 caracteres'),
})

export const registerSchema = z.object({
  name: z.string().min(2, 'Minimo 2 caracteres').max(100),
  email: z.string().email('Email invalido'),
  password: z.string()
    .min(8, 'Minimo 8 caracteres')
    .regex(/[A-Z]/, 'Debe contener una mayuscula')
    .regex(/[0-9]/, 'Debe contener un numero'),
  confirmPassword: z.string(),
  role: z.enum(['BUYER', 'SELLER', 'DEALER']).default('BUYER'),
  dealerName: z.string().optional(),
  phone: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Las contrasenas no coinciden',
  path: ['confirmPassword'],
}).refine(
  (data) => data.role !== 'DEALER' || (data.dealerName && data.dealerName.length > 0),
  { message: 'Nombre del dealer requerido', path: ['dealerName'] }
)

// ---- Boat listing schemas ----
export const boatBasicSchema = z.object({
  title: z.string().min(10, 'Minimo 10 caracteres').max(200),
  type: z.enum([
    'SAILBOAT', 'MOTORBOAT', 'FISHING', 'PONTOON', 'JET_SKI',
    'YACHT', 'CATAMARAN', 'INFLATABLE', 'HOUSEBOAT', 'OTHER',
  ]),
  condition: z.enum(['NEW', 'USED', 'REFURBISHED']),
  brand: z.string().min(1, 'Marca requerida'),
  model: z.string().min(1, 'Modelo requerido'),
  yearBuilt: z.number().int().min(1900).max(new Date().getFullYear() + 1),
  price: z.number().positive('Precio debe ser positivo'),
  currency: z.enum(['ARS', 'USD']).default('USD'),
  negotiable: z.boolean().default(false),
})

export const boatSpecsSchema = z.object({
  lengthFt: z.number().positive().max(500),
  beamFt: z.number().positive().max(100).optional(),
  draftFt: z.number().positive().max(50).optional(),
  weightLbs: z.number().positive().optional(),
  hullMaterial: z.enum([
    'FIBERGLASS', 'ALUMINUM', 'STEEL', 'WOOD', 'CARBON_FIBER',
    'INFLATABLE', 'COMPOSITE', 'OTHER',
  ]).optional(),
  fuelType: z.enum(['GASOLINE', 'DIESEL', 'ELECTRIC', 'HYBRID', 'NONE']).optional(),
  fuelCapacityGal: z.number().positive().optional(),
  engineBrand: z.string().optional(),
  engineModel: z.string().optional(),
  engineHP: z.number().positive().optional(),
  engineCount: z.number().int().min(0).max(6).optional(),
  engineHours: z.number().min(0).optional(),
  maxSpeedKnots: z.number().positive().optional(),
  cruisingSpeedKnots: z.number().positive().optional(),
  cabins: z.number().int().min(0).optional(),
  berths: z.number().int().min(0).optional(),
  heads: z.number().int().min(0).optional(),
  passengerCapacity: z.number().int().min(1).optional(),
})

export const boatLocationSchema = z.object({
  city: z.string().min(1, 'Ciudad requerida'),
  state: z.string().min(1, 'Provincia requerida'),
  country: z.string().default('Argentina'),
  marina: z.string().optional(),
  lat: z.number().min(-90).max(90).optional(),
  lng: z.number().min(-180).max(180).optional(),
})

export const boatListingSchema = boatBasicSchema
  .merge(boatSpecsSchema)
  .merge(boatLocationSchema)
  .extend({
    description: z.string().min(50, 'Minimo 50 caracteres').max(5000),
    features: z.array(z.string()).default([]),
    hasTrailer: z.boolean().default(false),
    trailerIncluded: z.boolean().default(false),
  })

// ---- Search/filter schemas ----
export const boatSearchSchema = z.object({
  q: z.string().optional(),
  type: z.string().optional(),
  condition: z.string().optional(),
  brand: z.string().optional(),
  minPrice: z.coerce.number().optional(),
  maxPrice: z.coerce.number().optional(),
  minYear: z.coerce.number().optional(),
  maxYear: z.coerce.number().optional(),
  minLength: z.coerce.number().optional(),
  maxLength: z.coerce.number().optional(),
  fuelType: z.string().optional(),
  hullMaterial: z.string().optional(),
  state: z.string().optional(),
  hasTrailer: z.coerce.boolean().optional(),
  sort: z.enum(['price_asc', 'price_desc', 'year_desc', 'newest', 'length_desc']).default('newest'),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(24),
})

// ---- Inquiry schema ----
export const inquirySchema = z.object({
  boatId: z.string().optional(),
  productId: z.string().optional(),
  subject: z.string().min(5, 'Minimo 5 caracteres').max(200),
  message: z.string().min(20, 'Minimo 20 caracteres').max(2000),
  name: z.string().min(2).max(100),
  email: z.string().email('Email invalido'),
  phone: z.string().optional(),
  preferredContact: z.enum(['EMAIL', 'PHONE', 'WHATSAPP']).default('EMAIL'),
}).refine(
  (data) => data.boatId || data.productId,
  { message: 'Debe especificar una embarcacion o producto' }
)

// ---- Review schema ----
export const reviewSchema = z.object({
  boatId: z.string().optional(),
  productId: z.string().optional(),
  rating: z.number().int().min(1).max(5),
  title: z.string().min(5).max(200),
  content: z.string().min(20).max(2000),
}).refine(
  (data) => data.boatId || data.productId,
  { message: 'Debe especificar una embarcacion o producto' }
)

// ---- Product schema ----
export const productSchema = z.object({
  name: z.string().min(3).max(200),
  description: z.string().min(20).max(5000),
  price: z.number().positive(),
  compareAtPrice: z.number().positive().optional(),
  sku: z.string().min(1),
  category: z.string().min(1),
  brand: z.string().optional(),
  stock: z.number().int().min(0).default(0),
  weight: z.number().positive().optional(),
  compatibleBoatTypes: z.array(z.string()).default([]),
})

// Type exports
export type LoginInput = z.infer<typeof loginSchema>
export type RegisterInput = z.infer<typeof registerSchema>
export type BoatListingInput = z.infer<typeof boatListingSchema>
export type BoatSearchInput = z.infer<typeof boatSearchSchema>
export type InquiryInput = z.infer<typeof inquirySchema>
export type ReviewInput = z.infer<typeof reviewSchema>
export type ProductInput = z.infer<typeof productSchema>
