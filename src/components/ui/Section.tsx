import type { ReactNode } from 'react'
import { useInView } from '../../hooks/useInView'

interface SectionProps {
  id: string
  children: ReactNode
  className?: string
}

/** A page section that is a scroll target and fades in when it enters the viewport. */
function Section({ id, children, className = '' }: SectionProps) {
  const [ref, inView] = useInView<HTMLDivElement>()

  return (
    <section id={id} className={`scroll-mt-16 ${className}`}>
      <div
        ref={ref}
        className={`mx-auto max-w-4xl px-5 sm:px-6 ${inView ? 'motion-safe:animate-fade-in' : 'motion-safe:opacity-0'}`}
      >
        {children}
      </div>
    </section>
  )
}

export default Section
