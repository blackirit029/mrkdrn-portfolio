import { useEffect, useRef, useState } from 'react'

/**
 * Returns a ref and whether that element has scrolled into view (fires once).
 * `offset` is how far up from the bottom of the screen (0–1) the element's top must
 * reach before it counts as in view; larger values make it wait longer.
 */
export function useInView<T extends Element>(offset = 0.1) {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const reveal = () => {
      setInView(true)
      observer.disconnect()
    }

    const observer = new IntersectionObserver(([entry]) => entry.isIntersecting && reveal(), {
      rootMargin: `0px 0px -${Math.round(offset * 100)}% 0px`,
    })
    observer.observe(el)

    // Safety net: anything already past the trigger line at load is revealed right away,
    // so above-the-fold content never stays hidden if the observer is slow to fire
    const frame = requestAnimationFrame(() => {
      const rect = el.getBoundingClientRect()
      if (rect.top < window.innerHeight * (1 - offset) && rect.bottom > 0) reveal()
    })

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
    }
  }, [offset])

  return [ref, inView] as const
}
