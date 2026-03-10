'use client'

// =============================================
// BOATMARKET - Search Filters Hook with URL Sync
// =============================================

import { useState, useCallback, useEffect } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import type { SearchFilters, BoatCondition, FuelType, HullMaterial } from '@/types'

interface UseFiltersReturn {
  filters: SearchFilters
  setFilter: <K extends keyof SearchFilters>(key: K, value: SearchFilters[K]) => void
  toggleArrayFilter: (key: 'type' | 'condition' | 'brand' | 'category' | 'fuelType' | 'hullMaterial', value: string) => void
  setPriceRange: (min?: number, max?: number) => void
  setYearRange: (min?: number, max?: number) => void
  setLengthRange: (min?: number, max?: number) => void
  setLocation: (location: string, radius?: number) => void
  setSortBy: (sort: SearchFilters['sortBy']) => void
  clearAll: () => void
  clearFilter: (key: keyof SearchFilters) => void
  activeFilterCount: number
  hasActiveFilters: boolean
}

function parseSearchParams(searchParams: URLSearchParams): Partial<SearchFilters> {
  const filters: Partial<SearchFilters> = {}

  const q = searchParams.get('q')
  if (q) filters.query = q

  const types = searchParams.getAll('type')
  if (types.length) filters.type = types

  const conditions = searchParams.getAll('condition')
  if (conditions.length) filters.condition = conditions as BoatCondition[]

  const brands = searchParams.getAll('brand')
  if (brands.length) filters.brand = brands

  const categories = searchParams.getAll('category')
  if (categories.length) filters.category = categories

  const fuelTypes = searchParams.getAll('fuelType')
  if (fuelTypes.length) filters.fuelType = fuelTypes as FuelType[]

  const hullMaterials = searchParams.getAll('hullMaterial')
  if (hullMaterials.length) filters.hullMaterial = hullMaterials as HullMaterial[]

  const priceMin = searchParams.get('priceMin')
  if (priceMin) filters.priceMin = Number(priceMin)

  const priceMax = searchParams.get('priceMax')
  if (priceMax) filters.priceMax = Number(priceMax)

  const yearMin = searchParams.get('yearMin')
  if (yearMin) filters.yearMin = Number(yearMin)

  const yearMax = searchParams.get('yearMax')
  if (yearMax) filters.yearMax = Number(yearMax)

  const lengthMin = searchParams.get('lengthMin')
  if (lengthMin) filters.lengthMin = Number(lengthMin)

  const lengthMax = searchParams.get('lengthMax')
  if (lengthMax) filters.lengthMax = Number(lengthMax)

  const location = searchParams.get('location')
  if (location) filters.location = location

  const radius = searchParams.get('radius')
  if (radius) filters.radius = Number(radius)

  const sortBy = searchParams.get('sortBy')
  if (sortBy) filters.sortBy = sortBy as SearchFilters['sortBy']

  const page = searchParams.get('page')
  if (page) filters.page = Number(page)

  return filters
}

function filtersToParams(filters: SearchFilters): URLSearchParams {
  const params = new URLSearchParams()

  if (filters.query) params.set('q', filters.query)
  filters.type?.forEach((t) => params.append('type', t))
  filters.condition?.forEach((c) => params.append('condition', c))
  filters.brand?.forEach((b) => params.append('brand', b))
  filters.category?.forEach((c) => params.append('category', c))
  filters.fuelType?.forEach((f) => params.append('fuelType', f))
  filters.hullMaterial?.forEach((h) => params.append('hullMaterial', h))
  if (filters.priceMin) params.set('priceMin', String(filters.priceMin))
  if (filters.priceMax) params.set('priceMax', String(filters.priceMax))
  if (filters.yearMin) params.set('yearMin', String(filters.yearMin))
  if (filters.yearMax) params.set('yearMax', String(filters.yearMax))
  if (filters.lengthMin) params.set('lengthMin', String(filters.lengthMin))
  if (filters.lengthMax) params.set('lengthMax', String(filters.lengthMax))
  if (filters.location) params.set('location', filters.location)
  if (filters.radius) params.set('radius', String(filters.radius))
  if (filters.sortBy && filters.sortBy !== 'newest') params.set('sortBy', filters.sortBy)
  if (filters.page && filters.page > 1) params.set('page', String(filters.page))

  return params
}

export function useFilters(): UseFiltersReturn {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [filters, setFilters] = useState<SearchFilters>(() => ({
    query: '',
    page: 1,
    hitsPerPage: 24,
    sortBy: 'newest',
    ...parseSearchParams(searchParams),
  }))

  // Sync URL when filters change
  useEffect(() => {
    const params = filtersToParams(filters)
    const newUrl = params.toString() ? `${pathname}?${params.toString()}` : pathname
    router.replace(newUrl, { scroll: false })
  }, [filters, pathname, router])

  const setFilter = useCallback(<K extends keyof SearchFilters>(key: K, value: SearchFilters[K]) => {
    setFilters((prev) => ({ ...prev, [key]: value, page: 1 }))
  }, [])

  const toggleArrayFilter = useCallback(
    (key: 'type' | 'condition' | 'brand' | 'category' | 'fuelType' | 'hullMaterial', value: string) => {
      setFilters((prev) => {
        const current = (prev[key] as string[] | undefined) || []
        const next = current.includes(value)
          ? current.filter((v) => v !== value)
          : [...current, value]
        return { ...prev, [key]: next.length > 0 ? next : undefined, page: 1 }
      })
    },
    []
  )

  const setPriceRange = useCallback((min?: number, max?: number) => {
    setFilters((prev) => ({ ...prev, priceMin: min, priceMax: max, page: 1 }))
  }, [])

  const setYearRange = useCallback((min?: number, max?: number) => {
    setFilters((prev) => ({ ...prev, yearMin: min, yearMax: max, page: 1 }))
  }, [])

  const setLengthRange = useCallback((min?: number, max?: number) => {
    setFilters((prev) => ({ ...prev, lengthMin: min, lengthMax: max, page: 1 }))
  }, [])

  const setLocation = useCallback((location: string, radius?: number) => {
    setFilters((prev) => ({ ...prev, location, radius: radius || 50, page: 1 }))
  }, [])

  const setSortBy = useCallback((sort: SearchFilters['sortBy']) => {
    setFilters((prev) => ({ ...prev, sortBy: sort, page: 1 }))
  }, [])

  const clearAll = useCallback(() => {
    setFilters({ query: '', page: 1, hitsPerPage: 24, sortBy: 'newest' })
  }, [])

  const clearFilter = useCallback((key: keyof SearchFilters) => {
    setFilters((prev) => {
      const next = { ...prev }
      delete next[key]
      return { ...next, page: 1 }
    })
  }, [])

  const activeFilterCount = [
    filters.type?.length,
    filters.condition?.length,
    filters.brand?.length,
    filters.category?.length,
    filters.fuelType?.length,
    filters.hullMaterial?.length,
    filters.priceMin ? 1 : 0,
    filters.priceMax ? 1 : 0,
    filters.yearMin ? 1 : 0,
    filters.yearMax ? 1 : 0,
    filters.lengthMin ? 1 : 0,
    filters.lengthMax ? 1 : 0,
    filters.location ? 1 : 0,
  ].reduce((sum, val) => sum + (val || 0), 0)

  return {
    filters,
    setFilter,
    toggleArrayFilter,
    setPriceRange,
    setYearRange,
    setLengthRange,
    setLocation,
    setSortBy,
    clearAll,
    clearFilter,
    activeFilterCount,
    hasActiveFilters: activeFilterCount > 0,
  }
}
