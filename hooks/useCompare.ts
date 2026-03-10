'use client'

// =============================================
// BOATMARKET - Compare Boats Hook
// =============================================

import { useState, useEffect, useCallback } from 'react'
import type { BoatCard } from '@/types'

const MAX_COMPARE = 3
const STORAGE_KEY = 'boatmarket_compare'

interface UseCompareReturn {
  boats: BoatCard[]
  count: number
  isFull: boolean
  isInCompare: (boatId: string) => boolean
  add: (boat: BoatCard) => void
  remove: (boatId: string) => void
  clear: () => void
  toggle: (boat: BoatCard) => void
}

function loadFromStorage(): BoatCard[] {
  if (typeof window === 'undefined') return []
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

function saveToStorage(boats: BoatCard[]) {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(boats))
  } catch {
    // Storage full or unavailable
  }
}

export function useCompare(): UseCompareReturn {
  const [boats, setBoats] = useState<BoatCard[]>([])

  // Load from localStorage on mount
  useEffect(() => {
    setBoats(loadFromStorage())
  }, [])

  // Persist to localStorage on change
  useEffect(() => {
    saveToStorage(boats)
  }, [boats])

  const isInCompare = useCallback(
    (boatId: string) => boats.some((b) => b.id === boatId),
    [boats]
  )

  const add = useCallback(
    (boat: BoatCard) => {
      setBoats((prev) => {
        if (prev.length >= MAX_COMPARE) return prev
        if (prev.some((b) => b.id === boat.id)) return prev
        return [...prev, boat]
      })
    },
    []
  )

  const remove = useCallback((boatId: string) => {
    setBoats((prev) => prev.filter((b) => b.id !== boatId))
  }, [])

  const clear = useCallback(() => {
    setBoats([])
  }, [])

  const toggle = useCallback(
    (boat: BoatCard) => {
      if (isInCompare(boat.id)) {
        remove(boat.id)
      } else {
        add(boat)
      }
    },
    [isInCompare, add, remove]
  )

  return {
    boats,
    count: boats.length,
    isFull: boats.length >= MAX_COMPARE,
    isInCompare,
    add,
    remove,
    clear,
    toggle,
  }
}
