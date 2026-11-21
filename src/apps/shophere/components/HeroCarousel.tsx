import { useCallback, useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent } from 'react'
import { heroSlides, products } from '../data'
import { formatPrice } from '../utils'
import { ChevronIcon } from './Icons'

interface HeroCarouselProps {
  onShopCategory: (categoryId: string) => void
}

const SLIDE_SECONDS = 5.5
const SWIPE_THRESHOLD = 50

/**
 * Featured-products carousel. Autoplays (the active dot fills like a progress bar and its
 * animation end advances the slide), pauses on hover/focus, and supports arrows, dots,
 * swipe and ← → keys. Slides crossfade with a slow zoom; no autoplay with reduced motion.
 */
function HeroCarousel({ onShopCategory }: HeroCarouselProps) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [reduceMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const pointerStart = useRef<number | null>(null)
  const count = heroSlides.length

  const go = useCallback((next: number) => setIndex(((next % count) + count) % count), [count])
  const prev = () => go(index - 1)
  const next = () => go(index + 1)

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft') prev()
    if (e.key === 'ArrowRight') next()
  }

  // Swipe on touch screens (vertical scrolling still works thanks to touch-action: pan-y)
  const onPointerDown = (e: PointerEvent) => {
    pointerStart.current = e.clientX
  }
  const onPointerUp = (e: PointerEvent) => {
    if (pointerStart.current === null) return
    const dx = e.clientX - pointerStart.current
    pointerStart.current = null
    if (Math.abs(dx) > SWIPE_THRESHOLD) (dx < 0 ? next : prev)()
  }

  const autoplay = !reduceMotion

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured products"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setPaused(false)}
      onKeyDown={handleKeyDown}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      className="group/carousel relative isolate h-80 touch-pan-y overflow-hidden rounded-2xl bg-chip select-none sm:h-96 lg:h-[26rem]"
      style={{ '--slide-duration': `${SLIDE_SECONDS}s` } as CSSProperties}
    >
      {heroSlides.map((slide, i) => {
        const active = i === index
        const product = products.find((p) => p.id === slide.productId)
        return (
          <div
            key={slide.id}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${count}: ${slide.headline}`}
            aria-hidden={!active}
            inert={!active}
            className={`absolute inset-0 transition-opacity duration-700 ease-out ${active ? 'z-10 opacity-100' : 'z-0 opacity-0'}`}
          >
            <img
              src={slide.image}
              alt={product?.name ?? slide.headline}
              width={1400}
              height={900}
              draggable={false}
              loading={i === 0 ? 'eager' : 'lazy'}
              fetchPriority={i === 0 ? 'high' : 'auto'}
              style={{ objectPosition: slide.objectPosition }}
              // Slow zoom-out while the slide is showing
              className={`absolute inset-0 -z-10 h-full w-full object-cover transition-transform ease-out motion-reduce:transition-none ${
                active ? 'scale-100 duration-[6000ms]' : 'scale-110 duration-700'
              }`}
            />
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/80 via-black/50 to-transparent sm:via-black/35" />

            {/* Keyed by the active index so the text rises in each time its slide appears */}
            <div key={active ? `on-${index}` : 'off'} className="flex h-full max-w-sm flex-col justify-center p-6 text-white sm:p-10">
              <span className={`w-fit rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur ${active ? 'motion-safe:animate-fade-up' : ''}`}>
                {slide.eyebrow}
              </span>
              <h2
                className={`mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl ${active ? 'motion-safe:animate-fade-up' : ''}`}
                style={{ animationDelay: '80ms' }}
              >
                {slide.headline}
              </h2>
              <p className={`mt-3 text-sm text-white/80 sm:text-base ${active ? 'motion-safe:animate-fade-up' : ''}`} style={{ animationDelay: '160ms' }}>
                {slide.description}
              </p>
              {product && (
                <p className={`mt-4 flex items-baseline gap-2 ${active ? 'motion-safe:animate-fade-up' : ''}`} style={{ animationDelay: '240ms' }}>
                  <span className="text-2xl font-semibold">{formatPrice(product.price)}</span>
                  {product.originalPrice && (
                    <span className="text-sm text-white/60 line-through">{formatPrice(product.originalPrice)}</span>
                  )}
                </p>
              )}
              <button
                type="button"
                onClick={() => onShopCategory(slide.cta.categoryId)}
                className={`mt-6 w-fit rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-zinc-900 transition-colors hover:bg-white/90 ${active ? 'motion-safe:animate-fade-up' : ''}`}
                style={{ animationDelay: '320ms' }}
              >
                {slide.cta.label}
              </button>
            </div>
          </div>
        )
      })}

      {/* Controls: dots (with autoplay progress) and arrows */}
      <div className="absolute inset-x-0 bottom-0 z-20 flex items-center justify-between gap-3 p-4 sm:p-6">
        <div className="flex items-center gap-1.5" role="group" aria-label="Choose slide">
          {heroSlides.map((slide, i) => {
            const active = i === index
            return (
              <button
                key={slide.id}
                type="button"
                onClick={() => go(i)}
                aria-label={`Go to slide ${i + 1}: ${slide.headline}`}
                aria-current={active ? 'true' : undefined}
                className={`relative h-1.5 overflow-hidden rounded-full transition-all duration-500 ${
                  active ? 'w-10 bg-white/35' : 'w-1.5 bg-white/50 hover:bg-white/80'
                }`}
              >
                {active && autoplay && (
                  <span
                    key={index}
                    onAnimationEnd={next}
                    className="absolute inset-0 origin-left rounded-full bg-white animate-carousel-progress"
                    style={{ animationPlayState: paused ? 'paused' : 'running' }}
                  />
                )}
                {active && !autoplay && <span className="absolute inset-0 rounded-full bg-white" />}
              </button>
            )
          })}
        </div>

        <div className="flex gap-2 opacity-100 transition-opacity sm:opacity-0 sm:group-hover/carousel:opacity-100 sm:group-focus-within/carousel:opacity-100">
          <button
            type="button"
            onClick={prev}
            aria-label="Previous slide"
            className="grid h-9 w-9 place-items-center rounded-full bg-white/20 text-white backdrop-blur transition-colors hover:bg-white/35"
          >
            <ChevronIcon direction="left" />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next slide"
            className="grid h-9 w-9 place-items-center rounded-full bg-white/20 text-white backdrop-blur transition-colors hover:bg-white/35"
          >
            <ChevronIcon />
          </button>
        </div>
      </div>

      {/* Announce slide changes the visitor makes; silent while autoplaying */}
      <p className="sr-only" aria-live={paused ? 'polite' : 'off'}>
        Slide {index + 1} of {count}: {heroSlides[index].headline}
      </p>
    </section>
  )
}

export default HeroCarousel
