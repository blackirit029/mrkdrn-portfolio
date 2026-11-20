import { useEffect, useState } from 'react'

const RADIUS = 21
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

/**
 * Floating "back to top" button. Appears once the visitor scrolls past most of the
 * first screen, shows reading progress as a ring, and smoothly returns to the top.
 */
function BackToTop() {
  const [visible, setVisible] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      setVisible(window.scrollY > window.innerHeight * 0.6)
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0)
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    schedule()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [])

  const scrollToTop = () => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' })
    // Drop any #section from the address bar so a refresh starts at the top too
    history.replaceState(null, '', window.location.pathname + window.location.search)
  }

  return (
    <div
      className={`fixed right-4 z-30 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] sm:right-6 ${
        visible ? 'translate-y-0 scale-100 opacity-100' : 'pointer-events-none translate-y-6 scale-75 opacity-0'
      }`}
      style={{ bottom: 'calc(1.25rem + env(safe-area-inset-bottom, 0px))' }}
    >
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Back to top"
        title="Back to top"
        tabIndex={visible ? 0 : -1}
        className="group relative grid h-12 w-12 place-items-center rounded-full border border-line bg-card/90 text-fg shadow-lg backdrop-blur transition-shadow hover:shadow-xl motion-safe:animate-float dark:shadow-black/50"
      >
        {/* Scroll progress ring */}
        <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 48 48" aria-hidden>
          <circle cx="24" cy="24" r={RADIUS} fill="none" stroke="var(--color-line)" strokeWidth="2" />
          <circle
            cx="24"
            cy="24"
            r={RADIUS}
            fill="none"
            stroke="var(--color-fg)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={CIRCUMFERENCE * (1 - progress)}
            className="transition-[stroke-dashoffset] duration-150"
          />
        </svg>
        <svg
          className="relative h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
          aria-hidden
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 19V5m-6 6 6-6 6 6" />
        </svg>
      </button>
    </div>
  )
}

export default BackToTop
