'use client'

// =============================================
// BOATMARKET - Product Card
// =============================================

import Link from 'next/link'
import Image from 'next/image'
import { ShoppingCart, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { formatPrice } from '@/lib/utils/formatters'
import { useCart } from '@/hooks/useCart'
import type { Product } from '@/types'
import { cn } from '@/lib/utils'

interface ProductCardProps {
  product: Product
  className?: string
}

export function ProductCard({ product, className }: ProductCardProps) {
  const { add, isInCart } = useCart()
  const imageUrl = product.images?.[0]?.image?.url || '/images/product-placeholder.jpg'
  const hasDiscount = product.compareAtPrice && product.compareAtPrice > product.price
  const discountPercent = hasDiscount
    ? Math.round(((product.compareAtPrice! - product.price) / product.compareAtPrice!) * 100)
    : 0

  return (
    <div className={cn('group relative flex flex-col overflow-hidden rounded-xl border bg-white shadow-sm card-hover', className)}>
      <Link href={`/productos/${product.slug}`} className="relative aspect-square overflow-hidden bg-gray-100">
        <Image
          src={imageUrl}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
        {hasDiscount && (
          <Badge className="absolute left-3 top-3 bg-red-500 text-white text-xs">
            -{discountPercent}%
          </Badge>
        )}
        {product.featured && (
          <Badge className="absolute right-3 top-3 bg-amber-500 text-white text-xs">
            Destacado
          </Badge>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-4">
        {/* Category */}
        {product.category && (
          <p className="mb-1 text-xs font-medium uppercase tracking-wider text-blue-600">
            {product.category.name}
          </p>
        )}

        {/* Name */}
        <Link href={`/productos/${product.slug}`}>
          <h3 className="mb-2 line-clamp-2 text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        {product.rating && product.rating > 0 && (
          <div className="mb-2 flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={cn(
                  'h-3.5 w-3.5',
                  i < Math.round(product.rating!)
                    ? 'fill-amber-400 text-amber-400'
                    : 'fill-gray-200 text-gray-200'
                )}
              />
            ))}
            {product.reviewCount && (
              <span className="ml-1 text-xs text-gray-500">({product.reviewCount})</span>
            )}
          </div>
        )}

        {/* Price */}
        <div className="mb-3 mt-auto">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-navy-900">
              {formatPrice(product.price, product.currency as 'ARS' | 'USD')}
            </span>
            {hasDiscount && (
              <span className="text-sm text-gray-400 line-through">
                {formatPrice(product.compareAtPrice!, product.currency as 'ARS' | 'USD')}
              </span>
            )}
          </div>
        </div>

        {/* Add to Cart */}
        <Button
          size="sm"
          className={cn(
            'w-full',
            isInCart(product.id)
              ? 'bg-green-600 hover:bg-green-700'
              : 'bg-blue-600 hover:bg-blue-700'
          )}
          disabled={!product.inStock}
          onClick={(e) => {
            e.preventDefault()
            add(product)
          }}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          {!product.inStock ? 'Sin stock' : isInCart(product.id) ? 'En el carrito' : 'Agregar al carrito'}
        </Button>
      </div>
    </div>
  )
}
