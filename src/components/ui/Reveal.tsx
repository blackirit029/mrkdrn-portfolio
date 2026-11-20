import type { ElementType, ReactNode } from 'react'
import { useInView } from '../../hooks/useInView'

type Animation = 'fade-up' | 'slide-in-left' | 'scale-in'

const animationClass: Record<Animation, string> = {
  'fade-up': 'motion-safe:animate-fade-up',
  'slide-in-left': 'motion-safe:animate-slide-in-left',
  'scale-in': 'motion-safe:animate-scale-in',
}

interface RevealProps {
  children: ReactNode
  as?: ElementType
  animation?: Animation
  /** Milliseconds after entering view before the animation starts */
  delay?: number
  /** How far up the screen (0–1) the element must reach before it animates */
  offset?: number
  className?: string
}

/** Plays an entrance animation once the element scrolls into view. Hidden until then (unless motion is reduced). */
function Reveal({ children, as: Tag = 'div', animation = 'fade-up', delay = 0, offset = 0.12, className = '' }: RevealProps) {
  const [ref, inView] = useInView<HTMLElement>(offset)

  return (
    <Tag
      ref={ref}
      className={`${inView ? animationClass[animation] : 'motion-safe:opacity-0'} ${className}`}
      style={inView && delay ? { animationDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  )
}

export default Reveal
