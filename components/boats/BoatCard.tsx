'use client'

// =============================================
// BOATMARKET - Boat Card Component
// =============================================

import Link from 'next/link'
import Image from 'next/image'
import { Heart, MapPin, Ruler, Calendar, Anchor } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { formatPrice, formatLength } from '@/lib/utils/formatters'
import type { BoatCard as BoatCardType } from '@/types'
import { cn } from '@/lib/utils'
import { useState } from 'react'

interface BoatCardProps {
  boat: BoatCardType
  className?: string
}

const conditionLabels: Record<string, { label: string; className: string }> = {
  new: { label: 'Nuevo', className: 'badge-new' },
  used: { label: 'Usado', className: 'badge-used' },
  certified_pre_owned: { label: 'Certificado', className: 'badge-featured' },
  restored: { label: 'Restaurado', className: 'badge-featured' },
}

export function BoatCard({ boat, className }: BoatCardProps) {
  const [isFavorite, setIsFavorite] = useState(false)
  const primaryImage = boat.images?.find((img) => img.isPrimary) || boat.images?.[0]
  const imageUrl = primaryImage?.image?.url || '/images/boat-placeholder.jpg'
  const condition = conditionLabels[boat.condition] || conditionLabels.used

  return (
    <Link
      href={`/embarcaciones/${boat.slug}`}
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-xl border bg-white shadow-sm card-hover',
        className
      )}
    >
      {/* Image */}
      <div className="relative aspect-boat-card overflow-hidden bg-gray-100">
        <Image
          src={imageUrl}
          alt={boat.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Condition Badge */}
        <Badge className={cn('absolute left-3 top-3 text-xs font-semibold', condition.className)}>
          {condition.label}
        </Badge>

        {/* Featured Badge */}
        {boat.isFeatured && (
          <Badge className="absolute right-12 top-3 bg-amber-500 text-white text-xs">
            Destacado
          </Badge>
        )}

        {/* Favorite Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-2 h-8 w-8 rounded-full bg-white/80 backdrop-blur hover:bg-white"
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            setIsFavorite(!isFavorite)
          }}
        >
          <Heart
            className={cn('h-4 w-4', isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600')}
          />
        </Button>

        {/* Financing badge */}
        {boat.financingAvail && (
          <div className="absolute bottom-3 left-3">
            <Badge variant="secondary" className="bg-green-100 text-green-800 text-[10px]">
              Financiacion disponible
            </Badge>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        {/* Brand */}
        {boat.brand && (
          <p className="mb-1 text-xs font-medium uppercase tracking-wider text-blue-600">
            {boat.brand.name}
          </p>
        )}

        {/* Title */}
        <h3 className="mb-2 line-clamp-2 text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
          {boat.title}
        </h3>

        {/* Price */}
        <div className="mb-3">
          <p className="text-lg font-bold text-navy-900">
            {formatPrice(boat.price, boat.currency as 'ARS' | 'USD')}
          </p>
          {boat.priceNegotiable && (
            <span className="text-xs text-gray-500">Precio negociable</span>
          )}
        </div>

        {/* Specs Row */}
        <div className="mt-auto flex items-center gap-3 border-t pt-3 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" />
            {boat.year}
          </span>
          <span className="flex items-center gap-1">
            <Ruler className="h-3.5 w-3.5" />
            {formatLength(boat.lengthFt, false)}
          </span>
          {boat.location?.city && (
            <span className="flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" />
              {boat.location.city}
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}
