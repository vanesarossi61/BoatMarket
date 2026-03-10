'use client'

// =============================================
// BOATMARKET - Boat Grid with Loading & Empty State
// =============================================

import { BoatCard } from './BoatCard'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { Ship, ChevronLeft, ChevronRight } from 'lucide-react'
import type { BoatCard as BoatCardType } from '@/types'

interface BoatGridProps {
  boats: BoatCardType[]
  isLoading?: boolean
  page?: number
  totalPages?: number
  onPageChange?: (page: number) => void
}

function BoatCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl border bg-white">
      <Skeleton className="aspect-boat-card w-full" />
      <div className="space-y-3 p-4">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-6 w-1/2" />
        <div className="flex gap-3 pt-2">
          <Skeleton className="h-3 w-12" />
          <Skeleton className="h-3 w-12" />
          <Skeleton className="h-3 w-16" />
        </div>
      </div>
    </div>
  )
}

export function BoatGrid({ boats, isLoading = false, page = 1, totalPages = 1, onPageChange }: BoatGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <BoatCardSkeleton key={i} />
        ))}
      </div>
    )
  }

  if (boats.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="mb-4 rounded-full bg-sky-50 p-4">
          <Ship className="h-10 w-10 text-blue-400" />
        </div>
        <h3 className="mb-2 text-lg font-semibold text-gray-900">
          No se encontraron embarcaciones
        </h3>
        <p className="mb-6 max-w-md text-sm text-gray-500">
          Intenta ajustar los filtros de busqueda o explorar otras categorias para encontrar lo que buscas.
        </p>
        <Button variant="outline" onClick={() => onPageChange?.(1)}>
          Limpiar filtros
        </Button>
      </div>
    )
  }

  return (
    <div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {boats.map((boat) => (
          <BoatCard key={boat.id} boat={boat} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8 flex items-center justify-center gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={page <= 1}
            onClick={() => onPageChange?.(page - 1)}
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Anterior
          </Button>
          <div className="flex items-center gap-1">
            {Array.from({ length: Math.min(totalPages, 7) }).map((_, i) => {
              const pageNum = i + 1
              return (
                <Button
                  key={pageNum}
                  variant={pageNum === page ? 'default' : 'ghost'}
                  size="sm"
                  className={pageNum === page ? 'bg-blue-600' : ''}
                  onClick={() => onPageChange?.(pageNum)}
                >
                  {pageNum}
                </Button>
              )
            })}
          </div>
          <Button
            variant="outline"
            size="sm"
            disabled={page >= totalPages}
            onClick={() => onPageChange?.(page + 1)}
          >
            Siguiente
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  )
}
