import { useEffect, useRef, useState } from 'react'

/** Returns a ref and whether that element has scrolled into view (fires once). */
export function useInView<T extends Element>() {
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
      rootMargin: '0px 0px -10% 0px',
    })
    observer.observe(el)

    // Safety net: anything already on screen at load is revealed right away,
    // so above-the-fold content never stays hidden if the observer is slow to fire
    const frame = requestAnimationFrame(() => {
      const rect = el.getBoundingClientRect()
      if (rect.top < window.innerHeight && rect.bottom > 0) reveal()
    })

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
    }
  }, [])

  return [ref, inView] as const
}
