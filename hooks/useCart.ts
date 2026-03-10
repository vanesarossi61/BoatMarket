'use client'

// =============================================
// BOATMARKET - Shopping Cart Hook
// =============================================

import { useState, useEffect, useCallback, useMemo } from 'react'
import type { CartItem, Product } from '@/types'

const STORAGE_KEY = 'boatmarket_cart'

interface UseCartReturn {
  items: CartItem[]
  itemCount: number
  subtotal: number
  add: (product: Product, quantity?: number) => void
  remove: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clear: () => void
  isInCart: (productId: string) => boolean
  getItem: (productId: string) => CartItem | undefined
}

function loadCart(): CartItem[] {
  if (typeof window === 'undefined') return []
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

function saveCart(items: CartItem[]) {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  } catch {
    // Storage full or unavailable
  }
}

export function useCart(): UseCartReturn {
  const [items, setItems] = useState<CartItem[]>([])

  useEffect(() => {
    setItems(loadCart())
  }, [])

  useEffect(() => {
    saveCart(items)
  }, [items])

  const add = useCallback((product: Product, quantity: number = 1) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.productId === product.id)
      if (existing) {
        return prev.map((item) =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      }
      return [
        ...prev,
        {
          productId: product.id,
          product,
          quantity,
          addedAt: new Date().toISOString(),
        },
      ]
    })
  }, [])

  const remove = useCallback((productId: string) => {
    setItems((prev) => prev.filter((item) => item.productId !== productId))
  }, [])

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((item) => item.productId !== productId))
      return
    }
    setItems((prev) =>
      prev.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      )
    )
  }, [])

  const clear = useCallback(() => {
    setItems([])
  }, [])

  const isInCart = useCallback(
    (productId: string) => items.some((item) => item.productId === productId),
    [items]
  )

  const getItem = useCallback(
    (productId: string) => items.find((item) => item.productId === productId),
    [items]
  )

  const itemCount = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  )

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    [items]
  )

  return {
    items,
    itemCount,
    subtotal,
    add,
    remove,
    updateQuantity,
    clear,
    isInCart,
    getItem,
  }
}
