import type { ReactNode } from 'react'
import { useInView } from '../../hooks/useInView'

interface SectionProps {
  id: string
  children: ReactNode
  className?: string
  /** Fade in on page load instead of on scroll (for the section at the top of the page) */
  revealOnLoad?: boolean
  /** The children run their own (staggered) entrance, so the section itself doesn't fade */
  selfAnimated?: boolean
}

/** A page section that is a scroll target and fades in when it enters the viewport. */
function Section({ id, children, className = '', revealOnLoad = false, selfAnimated = false }: SectionProps) {
  const [ref, scrolledIntoView] = useInView<HTMLDivElement>()
  const inView = revealOnLoad || scrolledIntoView
  const animation = selfAnimated ? '' : inView ? 'motion-safe:animate-fade-in' : 'motion-safe:opacity-0'

  return (
    <section id={id} className={`scroll-mt-16 ${className}`}>
      <div ref={ref} className={`mx-auto max-w-4xl px-5 sm:px-6 ${animation}`}>
        {children}
      </div>
    </section>
  )
}

export default Section
