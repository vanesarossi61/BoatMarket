// =============================================
// BOATMARKET - Formatting Utilities
// Price, measurement, date formatters
// =============================================

// Currency formatter for ARS and USD
export function formatPrice(amount: number, currency: 'ARS' | 'USD' = 'USD'): string {
  return new Intl.NumberFormat(currency === 'ARS' ? 'es-AR' : 'en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

// Format price range
export function formatPriceRange(min: number, max: number, currency: 'ARS' | 'USD' = 'USD'): string {
  return `${formatPrice(min, currency)} - ${formatPrice(max, currency)}`
}

// Length in feet with optional meters
export function formatLength(feet: number, showMeters = true): string {
  const formatted = `${feet}'`
  if (showMeters) {
    const meters = (feet * 0.3048).toFixed(1)
    return `${formatted} (${meters}m)`
  }
  return formatted
}

// Engine hours
export function formatHours(hours: number): string {
  return `${hours.toLocaleString()} hs`
}

// Year display
export function formatYear(year: number): string {
  return year.toString()
}

// Relative time ("hace 2 dias", "hace 1 semana")
export function formatRelativeTime(date: Date | string): string {
  const now = new Date()
  const target = new Date(date)
  const diffMs = now.getTime() - target.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffDays === 0) return 'Hoy'
  if (diffDays === 1) return 'Ayer'
  if (diffDays < 7) return `Hace ${diffDays} dias`
  if (diffDays < 30) return `Hace ${Math.floor(diffDays / 7)} semanas`
  if (diffDays < 365) return `Hace ${Math.floor(diffDays / 30)} meses`
  return `Hace ${Math.floor(diffDays / 365)} anios`
}

// Full date format
export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat('es-AR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date))
}

// Slugify for URLs
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

// Generate boat SEO-friendly slug
export function boatSlug(boat: {
  brand: string
  model: string
  yearBuilt: number
  city?: string
}): string {
  const parts = [boat.brand, boat.model, boat.yearBuilt.toString()]
  if (boat.city) parts.push(boat.city)
  return slugify(parts.join(' '))
}

// Truncate text with ellipsis
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).trimEnd() + '...'
}

// Format phone number (Argentina)
export function formatPhone(phone: string): string {
  const clean = phone.replace(/\D/g, '')
  if (clean.length === 10) {
    return `(${clean.slice(0, 2)}) ${clean.slice(2, 6)}-${clean.slice(6)}`
  }
  if (clean.length === 11 && clean.startsWith('0')) {
    return `(${clean.slice(1, 3)}) ${clean.slice(3, 7)}-${clean.slice(7)}`
  }
  return phone
}

// Format number with separators
export function formatNumber(num: number): string {
  return num.toLocaleString('es-AR')
}
