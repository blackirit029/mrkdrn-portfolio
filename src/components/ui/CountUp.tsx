import { useEffect, useState } from 'react'

interface CountUpProps {
  /** Final number to count to */
  to: number
  /** Start counting once this is true */
  start: boolean
  duration?: number
  suffix?: string
}

/** Counts from 0 to `to` with an ease-out curve. Shows the final value right away when motion is reduced. */
function CountUp({ to, start, duration = 1400, suffix = '' }: CountUpProps) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!start) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const frame = requestAnimationFrame(() => setValue(to))
      return () => cancelAnimationFrame(frame)
    }

    let frame = 0
    const began = performance.now()
    const tick = (now: number) => {
      const progress = Math.min(1, (now - began) / duration)
      const eased = 1 - (1 - progress) ** 3
      setValue(Math.round(eased * to))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [start, to, duration])

  return (
    <span className="tabular-nums">
      {value}
      {suffix}
    </span>
  )
}

export default CountUp
