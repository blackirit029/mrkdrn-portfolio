import { useCallback, useEffect, useState } from 'react'

export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'theme'
const media = '(prefers-color-scheme: dark)'
/** How long the page shows light before the intro reveals dark (ms) */
const INTRO_DELAY = 350

function readSaved(): Theme | null {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved === 'light' || saved === 'dark' ? saved : null
  } catch {
    return null
  }
}

/** Center of the theme toggle button, if it's on the page */
function toggleCenter() {
  const button = document.querySelector('[data-theme-toggle]')
  if (!button) return undefined
  const rect = button.getBoundingClientRect()
  return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }
}

/**
 * Light/dark theme. Starts from the class index.html applied before paint
 * (saved choice, else the OS setting), follows OS changes until the user
 * picks a theme, and remembers that pick.
 *
 * Intro: when index.html marks the page with data-intro-theme="dark", the page
 * first renders light, then switches to dark with the same circle reveal as the toggle.
 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() =>
    document.documentElement.classList.contains('dark') ? 'dark' : 'light',
  )

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  // Follow the OS setting while the user hasn't chosen explicitly
  useEffect(() => {
    const query = window.matchMedia(media)
    const onChange = (e: MediaQueryListEvent) => {
      if (!readSaved()) setTheme(e.matches ? 'dark' : 'light')
    }
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])

  /**
   * Switch to `next`, spreading out in a circle from `origin` (viewport px) where supported.
   * `persist` saves it as the visitor's choice; the intro doesn't, so the OS setting keeps applying.
   */
  const switchTo = useCallback((next: Theme, origin?: { x: number; y: number }, persist = true) => {
    const root = document.documentElement
    if (persist) {
      try {
        localStorage.setItem(STORAGE_KEY, next)
      } catch {
        // storage unavailable (private mode); the switch still works for this visit
      }
    }

    const apply = () => {
      root.classList.toggle('dark', next === 'dark')
      setTheme(next)
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!('startViewTransition' in document) || reduceMotion) {
      apply()
      return
    }

    // Circle centered on the origin, large enough to cover the farthest corner
    const x = origin?.x ?? window.innerWidth / 2
    const y = origin?.y ?? 0
    const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y))
    root.style.setProperty('--theme-x', `${x}px`)
    root.style.setProperty('--theme-y', `${y}px`)
    root.style.setProperty('--theme-r', `${radius}px`)

    root.classList.add('theme-switching')
    const transition = document.startViewTransition(apply)
    transition.finished.finally(() => root.classList.remove('theme-switching'))
  }, [])

  /** `origin` is where the switch was clicked (viewport px); the new theme spreads out from there. */
  const toggleTheme = useCallback(
    (origin?: { x: number; y: number }) =>
      switchTo(document.documentElement.classList.contains('dark') ? 'light' : 'dark', origin),
    [switchTo],
  )

  // Intro: reveal dark shortly after the first (light) paint. The marker is removed only when the
  // switch actually runs, so a cancelled timer (e.g. React StrictMode's re-run) just reschedules it.
  useEffect(() => {
    const root = document.documentElement
    if (root.dataset.introTheme !== 'dark') return
    const timer = window.setTimeout(() => {
      delete root.dataset.introTheme
      switchTo('dark', toggleCenter(), false)
    }, INTRO_DELAY)
    return () => window.clearTimeout(timer)
  }, [switchTo])

  return { theme, toggleTheme }
}
