'use client'

// =============================================
// BOATMARKET - Featured Products Grid with Tabs
// =============================================

import { useState } from 'react'
import { ProductCard } from './ProductCard'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import type { Product } from '@/types'

interface FeaturedProductsProps {
  products: Product[]
}

const CATEGORIES = [
  { value: 'all', label: 'Todos' },
  { value: 'electronics', label: 'Electronica' },
  { value: 'accessories', label: 'Accesorios' },
  { value: 'maintenance', label: 'Mantenimiento' },
  { value: 'safety', label: 'Seguridad' },
]

export function FeaturedProducts({ products }: FeaturedProductsProps) {
  const [activeCategory, setActiveCategory] = useState('all')

  const filteredProducts =
    activeCategory === 'all'
      ? products
      : products.filter((p) => p.category?.slug === activeCategory)

  return (
    <div>
      <Tabs value={activeCategory} onValueChange={setActiveCategory} className="mb-6">
        <TabsList className="bg-gray-100">
          {CATEGORIES.map((cat) => (
            <TabsTrigger key={cat.value} value={cat.value} className="text-sm">
              {cat.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <p className="py-12 text-center text-sm text-gray-500">
          No hay productos en esta categoria todavia.
        </p>
      )}
    </div>
  )
}
