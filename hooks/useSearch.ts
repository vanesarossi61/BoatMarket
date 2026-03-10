'use client'

// =============================================
// BOATMARKET - Search Hook with Debounce
// =============================================

import { useState, useEffect, useCallback, useRef } from 'react'
import type { SearchFilters, SearchResult, BoatCard, FacetDistribution } from '@/types'

interface UseSearchOptions {
  initialFilters?: Partial<SearchFilters>
  debounceMs?: number
  autoSearch?: boolean
}

interface UseSearchReturn {
  query: string
  setQuery: (q: string) => void
  filters: SearchFilters
  setFilters: (filters: Partial<SearchFilters>) => void
  resetFilters: () => void
  results: BoatCard[]
  totalHits: number
  totalPages: number
  page: number
  setPage: (page: number) => void
  facets: FacetDistribution
  isLoading: boolean
  error: string | null
  search: () => Promise<void>
}

const DEFAULT_FILTERS: SearchFilters = {
  query: '',
  page: 1,
  hitsPerPage: 24,
  sortBy: 'newest',
}

export function useSearch(options: UseSearchOptions = {}): UseSearchReturn {
  const { initialFilters = {}, debounceMs = 350, autoSearch = true } = options

  const [filters, setFiltersState] = useState<SearchFilters>({
    ...DEFAULT_FILTERS,
    ...initialFilters,
  })
  const [results, setResults] = useState<BoatCard[]>([])
  const [totalHits, setTotalHits] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [facets, setFacets] = useState<FacetDistribution>({})
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const debounceRef = useRef<NodeJS.Timeout | null>(null)
  const abortRef = useRef<AbortController | null>(null)

  const search = useCallback(async () => {
    // Cancel previous request
    if (abortRef.current) {
      abortRef.current.abort()
    }
    abortRef.current = new AbortController()

    setIsLoading(true)
    setError(null)

    try {
      const params = new URLSearchParams()
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          if (Array.isArray(value)) {
            value.forEach((v) => params.append(key, String(v)))
          } else {
            params.set(key, String(value))
          }
        }
      })

      const response = await fetch(`/api/search?${params.toString()}`, {
        signal: abortRef.current.signal,
      })

      if (!response.ok) {
        throw new Error('Error al buscar embarcaciones')
      }

      const data: SearchResult<BoatCard> = await response.json()

      setResults(data.hits)
      setTotalHits(data.totalHits)
      setTotalPages(data.totalPages)
      if (data.facetDistribution) {
        setFacets(data.facetDistribution)
      }
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') return
      setError(err instanceof Error ? err.message : 'Error desconocido')
    } finally {
      setIsLoading(false)
    }
  }, [filters])

  // Debounced auto-search on filter changes
  useEffect(() => {
    if (!autoSearch) return

    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
    }

    debounceRef.current = setTimeout(() => {
      search()
    }, debounceMs)

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current)
      }
    }
  }, [filters, autoSearch, debounceMs, search])

  const setQuery = useCallback((q: string) => {
    setFiltersState((prev) => ({ ...prev, query: q, page: 1 }))
  }, [])

  const setFilters = useCallback((newFilters: Partial<SearchFilters>) => {
    setFiltersState((prev) => ({ ...prev, ...newFilters, page: 1 }))
  }, [])

  const resetFilters = useCallback(() => {
    setFiltersState({ ...DEFAULT_FILTERS, ...initialFilters })
  }, [initialFilters])

  const setPage = useCallback((page: number) => {
    setFiltersState((prev) => ({ ...prev, page }))
  }, [])

  return {
    query: filters.query || '',
    setQuery,
    filters,
    setFilters,
    resetFilters,
    results,
    totalHits,
    totalPages,
    page: filters.page || 1,
    setPage,
    facets,
    isLoading,
    error,
    search,
  }
}
