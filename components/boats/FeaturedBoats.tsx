'use client'

// =============================================
// BOATMARKET - Featured Boats Carousel
// =============================================

import { useRef, useState, useEffect } from 'react'
import { BoatCard } from './BoatCard'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { BoatCard as BoatCardType } from '@/types'

interface FeaturedBoatsProps {
  boats: BoatCardType[]
}

export function FeaturedBoats({ boats }: FeaturedBoatsProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const autoplayRef = useRef<NodeJS.Timeout | null>(null)

  const checkScroll = () => {
    const el = scrollRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 0)
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10)
  }

  const scroll = (direction: 'left' | 'right') => {
    const el = scrollRef.current
    if (!el) return
    const cardWidth = el.querySelector(':first-child')?.clientWidth || 320
    el.scrollBy({
      left: direction === 'left' ? -cardWidth - 24 : cardWidth + 24,
      behavior: 'smooth',
    })
  }

  // Autoplay
  useEffect(() => {
    autoplayRef.current = setInterval(() => {
      const el = scrollRef.current
      if (!el) return
      if (el.scrollLeft >= el.scrollWidth - el.clientWidth - 10) {
        el.scrollTo({ left: 0, behavior: 'smooth' })
      } else {
        scroll('right')
      }
    }, 5000)

    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current)
    }
  }, [])

  // Pause autoplay on hover
  const pauseAutoplay = () => {
    if (autoplayRef.current) clearInterval(autoplayRef.current)
  }

  if (boats.length === 0) return null

  return (
    <div
      className="relative"
      onMouseEnter={pauseAutoplay}
      onMouseLeave={() => {
        autoplayRef.current = setInterval(() => scroll('right'), 5000)
      }}
    >
      {/* Scroll Buttons */}
      {canScrollLeft && (
        <Button
          variant="secondary"
          size="icon"
          className="absolute -left-4 top-1/2 z-10 h-10 w-10 -translate-y-1/2 rounded-full shadow-lg bg-white hover:bg-gray-50"
          onClick={() => scroll('left')}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
      )}
      {canScrollRight && (
        <Button
          variant="secondary"
          size="icon"
          className="absolute -right-4 top-1/2 z-10 h-10 w-10 -translate-y-1/2 rounded-full shadow-lg bg-white hover:bg-gray-50"
          onClick={() => scroll('right')}
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      )}

      {/* Scrollable Container */}
      <div
        ref={scrollRef}
        onScroll={checkScroll}
        className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth pb-2"
      >
        {boats.map((boat) => (
          <div key={boat.id} className="min-w-[300px] max-w-[340px] flex-shrink-0">
            <BoatCard boat={boat} />
          </div>
        ))}
      </div>
    </div>
  )
}
