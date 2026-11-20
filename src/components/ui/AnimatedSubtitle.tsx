import { useInView } from '../../hooks/useInView'

interface AnimatedSubtitleProps {
  children: string
  className?: string
}

/**
 * Small uppercase section label. On entering view, a hairline draws from the left,
 * then the label rises out of a mask beside it.
 */
function AnimatedSubtitle({ children, className = '' }: AnimatedSubtitleProps) {
  const [ref, inView] = useInView<HTMLHeadingElement>(0.12)

  return (
    <h3 ref={ref} className={`flex items-center gap-3 text-xs font-semibold tracking-widest text-subtle uppercase ${className}`}>
      <span
        aria-hidden
        className={`h-px w-8 origin-left bg-fg/40 ${inView ? 'motion-safe:animate-line-grow' : 'motion-safe:scale-x-0'}`}
      />
      {/* overflow-hidden is the mask the text rises out of */}
      <span className="overflow-hidden pb-px">
        <span
          className={`block ${inView ? 'motion-safe:animate-rise-in' : 'motion-safe:translate-y-[110%]'}`}
          style={inView ? { animationDelay: '250ms' } : undefined}
        >
          {children}
        </span>
      </span>
    </h3>
  )
}

export default AnimatedSubtitle
