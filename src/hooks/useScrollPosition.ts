import { useState, useEffect } from 'react'

/**
 * Returns the current window.scrollY value.
 * Used to determine if the navbar has crossed the glassmorphism threshold.
 */
export function useScrollPosition(): number {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return scrollY
}
