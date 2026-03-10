// =============================================
// BOATMARKET - JSON-LD Schema Generators
// Schema.org structured data for SEO
// =============================================

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://boatmarket.com.ar'
const SITE_NAME = 'BoatMarket'

interface BoatSchemaInput {
  title: string
  description: string
  url: string
  images: string[]
  price: number
  currency: string
  condition: 'new' | 'used' | 'certified_pre_owned' | 'restored'
  year: number
  brand: string
  model?: string
  lengthFt?: number
  fuelType?: string
  engineHp?: number
  engineCount?: number
  seller: { name: string; url?: string }
  location?: { city?: string; state?: string; country?: string }
}

export function generateBoatSchema(boat: BoatSchemaInput) {
  const conditionMap: Record<string, string> = {
    new: 'https://schema.org/NewCondition',
    used: 'https://schema.org/UsedCondition',
    certified_pre_owned: 'https://schema.org/UsedCondition',
    restored: 'https://schema.org/RefurbishedCondition',
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'Vehicle',
    name: boat.title,
    description: boat.description,
    url: boat.url,
    image: boat.images,
    vehicleModelDate: boat.year.toString(),
    manufacturer: {
      '@type': 'Organization',
      name: boat.brand,
    },
    model: boat.model || undefined,
    fuelType: boat.fuelType || undefined,
    vehicleEngine: boat.engineHp
      ? {
          '@type': 'EngineSpecification',
          enginePower: {
            '@type': 'QuantitativeValue',
            value: boat.engineHp * (boat.engineCount || 1),
            unitText: 'HP',
          },
        }
      : undefined,
    offers: {
      '@type': 'Offer',
      price: boat.price,
      priceCurrency: boat.currency,
      availability: 'https://schema.org/InStock',
      itemCondition: conditionMap[boat.condition] || conditionMap.used,
      seller: {
        '@type': 'Organization',
        name: boat.seller.name,
        url: boat.seller.url || SITE_URL,
      },
      areaServed: boat.location
        ? {
            '@type': 'Place',
            address: {
              '@type': 'PostalAddress',
              addressLocality: boat.location.city,
              addressRegion: boat.location.state,
              addressCountry: boat.location.country || 'AR',
            },
          }
        : undefined,
    },
    additionalProperty: boat.lengthFt
      ? [
          {
            '@type': 'PropertyValue',
            name: 'Eslora',
            value: boat.lengthFt,
            unitText: 'ft',
          },
        ]
      : undefined,
  }
}

interface ProductSchemaInput {
  name: string
  description: string
  url: string
  images: string[]
  price: number
  currency: string
  sku: string
  brand?: string
  inStock: boolean
  rating?: { value: number; count: number }
  category?: string
}

export function generateProductSchema(product: ProductSchemaInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    url: product.url,
    image: product.images,
    sku: product.sku,
    brand: product.brand
      ? { '@type': 'Brand', name: product.brand }
      : undefined,
    category: product.category,
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: product.currency,
      availability: product.inStock
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      seller: {
        '@type': 'Organization',
        name: SITE_NAME,
        url: SITE_URL,
      },
    },
    aggregateRating: product.rating
      ? {
          '@type': 'AggregateRating',
          ratingValue: product.rating.value,
          reviewCount: product.rating.count,
          bestRating: 5,
          worstRating: 1,
        }
      : undefined,
  }
}

export function generateLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE_URL}/#business`,
    name: SITE_NAME,
    description: 'Marketplace nautico lider en Argentina. Compra y venta de embarcaciones, motores y accesorios nauticos.',
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    image: `${SITE_URL}/og-default.jpg`,
    telephone: '+54-11-5555-0100',
    email: 'info@boatmarket.com.ar',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Av. Costanera Norte 1234',
      addressLocality: 'Buenos Aires',
      addressRegion: 'CABA',
      postalCode: 'C1425',
      addressCountry: 'AR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -34.5611,
      longitude: -58.4183,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '10:00',
        closes: '14:00',
      },
    ],
    sameAs: [
      'https://www.instagram.com/boatmarket.ar',
      'https://www.facebook.com/boatmarket.ar',
      'https://twitter.com/boatmarket_ar',
    ],
    priceRange: '$$',
  }
}

export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

export function generateBreadcrumbSchema(
  items: Array<{ name: string; url: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${SITE_URL}${item.url}`,
    })),
  }
}

export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    description: 'El marketplace nautico mas completo de Argentina',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/embarcaciones?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+54-11-5555-0100',
      contactType: 'customer service',
      areaServed: 'AR',
      availableLanguage: 'Spanish',
    },
    sameAs: [
      'https://www.instagram.com/boatmarket.ar',
      'https://www.facebook.com/boatmarket.ar',
    ],
  }
}
