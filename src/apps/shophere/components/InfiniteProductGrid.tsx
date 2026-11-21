import { useEffect, useRef, useState } from 'react'
import type { Cart, Product } from '../types'
import ProductCard from './ProductCard'

interface InfiniteProductGridProps {
  products: Product[]
  cart: Cart
  onAddToCart: (id: string) => void
  pageSize?: number
  /** Simulated network delay before the next page appears (ms) */
  loadDelay?: number
}

const gridClass = 'grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5'

function SkeletonCard() {
  return (
    <li aria-hidden className="overflow-hidden rounded-xl border border-line bg-card">
      <div className="aspect-square animate-pulse bg-chip" />
      <div className="space-y-2 p-3">
        <div className="h-3.5 w-11/12 animate-pulse rounded bg-chip" />
        <div className="h-3.5 w-2/3 animate-pulse rounded bg-chip" />
        <div className="h-4 w-1/3 animate-pulse rounded bg-chip" />
        <div className="mt-3 h-8 w-full animate-pulse rounded-lg bg-chip" />
      </div>
    </li>
  )
}

/**
 * Shows `pageSize` products, then loads the next page when the visitor scrolls near the bottom:
 * skeleton cards and a loading message for a moment, then the new products rise in.
 * Remount it (via `key`) to start over when the filters change.
 */
function InfiniteProductGrid({ products, cart, onAddToCart, pageSize = 10, loadDelay = 1200 }: InfiniteProductGridProps) {
  const [visibleCount, setVisibleCount] = useState(pageSize)
  const [loading, setLoading] = useState(false)
  const [nearBottom, setNearBottom] = useState(false)
  const sentinel = useRef<HTMLDivElement>(null)

  const total = products.length
  const hasMore = visibleCount < total

  // Watch a marker under the grid; "near bottom" starts a little before it scrolls into view.
  // An IntersectionObserver does the work, with a throttled scroll check as a backup in case
  // the observer is slow to report (it can lag behind fast scrolling).
  useEffect(() => {
    const el = sentinel.current
    if (!el) return
    const MARGIN = 200
    const observer = new IntersectionObserver(([entry]) => setNearBottom(entry.isIntersecting), {
      rootMargin: `0px 0px ${MARGIN}px 0px`,
    })
    observer.observe(el)

    let frame = 0
    const check = () => {
      frame = 0
      const rect = el.getBoundingClientRect()
      setNearBottom(rect.top < window.innerHeight + MARGIN && rect.bottom > -MARGIN)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(check)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  // Step 1: start loading while the marker is in reach (also re-triggers on tall screens
  // where one page doesn't fill the view)
  useEffect(() => {
    if (!nearBottom || !hasMore || loading) return
    const start = window.setTimeout(() => setLoading(true), 0)
    return () => window.clearTimeout(start)
  }, [nearBottom, hasMore, loading])

  // Step 2: once loading, reveal the next page after the delay. Kept separate from step 1 so that
  // turning `loading` on doesn't cancel this timer.
  useEffect(() => {
    if (!loading) return
    const done = window.setTimeout(() => {
      setVisibleCount((c) => Math.min(c + pageSize, total))
      setLoading(false)
    }, loadDelay)
    return () => window.clearTimeout(done)
  }, [loading, pageSize, total, loadDelay])

  const skeletons = loading ? Math.min(pageSize, total - visibleCount) : 0

  return (
    <>
      <ul className={gridClass}>
        {products.slice(0, visibleCount).map((product, i) => (
          <li
            key={product.id}
            className="motion-safe:animate-fade-up"
            // Each page's cards rise in one after another
            style={{ animationDelay: `${(i % pageSize) * 50}ms` }}
          >
            <ProductCard product={product} quantityInCart={cart[product.id] ?? 0} onAddToCart={onAddToCart} />
          </li>
        ))}
        {Array.from({ length: skeletons }, (_, i) => (
          <SkeletonCard key={`skeleton-${i}`} />
        ))}
      </ul>

      <div ref={sentinel} className="mt-8 flex min-h-10 items-center justify-center text-sm text-muted" aria-live="polite">
        {loading ? (
          <span className="inline-flex items-center gap-2">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent" aria-hidden />
            Loading more products…
          </span>
        ) : hasMore ? (
          <span className="text-xs text-subtle">
            Showing {visibleCount} of {total}
          </span>
        ) : total > pageSize ? (
          <span className="text-xs text-subtle">You've seen all {total} products</span>
        ) : null}
      </div>
    </>
  )
}

export default InfiniteProductGrid
