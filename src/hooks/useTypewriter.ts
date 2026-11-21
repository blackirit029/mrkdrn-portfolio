import { useEffect, useState } from 'react'

type Phase = 'waiting' | 'typing' | 'holding' | 'deleting'

interface TypewriterOptions {
  /** Characters that are never deleted (e.g. the first name) */
  keep?: number
  typeSpeed?: number
  deleteSpeed?: number
  /** Pause with the full text shown */
  holdFull?: number
  /** Pause at the kept text before typing again (also the initial delay) */
  holdKept?: number
}

/**
 * Endless typewriter: types `text` letter by letter, holds, deletes back to the first
 * `keep` characters, holds, and types the rest again. Returns the visible text and whether
 * it's idle (for a blinking caret). With reduced motion it returns the full text, idle.
 */
export function useTypewriter(
  text: string,
  { keep = 0, typeSpeed = 95, deleteSpeed = 55, holdFull = 2400, holdKept = 700 }: TypewriterOptions = {},
) {
  const [reduceMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const [count, setCount] = useState(0)
  const [phase, setPhase] = useState<Phase>('waiting')

  useEffect(() => {
    if (reduceMotion) return
    let timer: number

    if (phase === 'waiting') {
      timer = window.setTimeout(() => setPhase('typing'), holdKept)
    } else if (phase === 'typing') {
      if (count < text.length) {
        // Slightly uneven timing reads as natural typing
        timer = window.setTimeout(() => setCount((c) => c + 1), typeSpeed * (0.7 + Math.random() * 0.6))
      } else {
        timer = window.setTimeout(() => setPhase('holding'), 0)
      }
    } else if (phase === 'holding') {
      timer = window.setTimeout(() => setPhase('deleting'), holdFull)
    } else if (count > keep) {
      timer = window.setTimeout(() => setCount((c) => c - 1), deleteSpeed)
    } else {
      timer = window.setTimeout(() => setPhase('waiting'), 0)
    }

    return () => window.clearTimeout(timer)
  }, [phase, count, text, keep, typeSpeed, deleteSpeed, holdFull, holdKept, reduceMotion])

  if (reduceMotion) return { visible: text, idle: true }
  return { visible: text.slice(0, count), idle: phase === 'waiting' || phase === 'holding' }
}
