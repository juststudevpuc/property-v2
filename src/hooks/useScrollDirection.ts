import { useState, useEffect, useRef } from 'react'

type ScrollDirection = 'up' | 'down' | 'idle'

/**
 * Tracks scroll direction with a dead-zone threshold to prevent
 * jitter on tiny movements (same technique as the original site).
 */
export function useScrollDirection(threshold = 10): ScrollDirection {
  const [direction, setDirection] = useState<ScrollDirection>('idle')
  const lastY = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY
      const delta = currentY - lastY.current

      if (Math.abs(delta) < threshold) return

      setDirection(delta > 0 ? 'down' : 'up')
      lastY.current = currentY
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])

  return direction
}
