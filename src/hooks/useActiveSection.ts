import { useEffect, useState } from 'react'

/**
 * Scroll-spy: returns the id of the section currently being read.
 * A section becomes active once its top passes a line `offset` of the way
 * down the viewport. At the very bottom of the page the last section wins,
 * so a short final section can still be selected.
 */
export function useActiveSection(ids: readonly string[], offset = 0.35) {
  const [activeId, setActiveId] = useState(ids[0])

  useEffect(() => {
    let frame = 0

    const update = () => {
      frame = 0
      const line = window.innerHeight * offset
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2

      let current = ids[0]
      if (atBottom) {
        current = ids[ids.length - 1]
      } else {
        for (const id of ids) {
          const el = document.getElementById(id)
          if (el && el.getBoundingClientRect().top <= line) current = id
        }
      }
      setActiveId(current)
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
  }, [ids, offset])

  return activeId
}
