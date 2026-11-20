import { useCallback, useEffect, useState } from 'react'

export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'theme'
const media = '(prefers-color-scheme: dark)'

function readSaved(): Theme | null {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved === 'light' || saved === 'dark' ? saved : null
  } catch {
    return null
  }
}

/**
 * Light/dark theme. Starts from the class index.html applied before paint
 * (saved choice, else the OS setting), follows OS changes until the user
 * picks a theme, and remembers that pick.
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

  /** `origin` is where the switch was clicked (viewport px); the new theme spreads out from there. */
  const toggleTheme = useCallback((origin?: { x: number; y: number }) => {
    const root = document.documentElement
    const next: Theme = root.classList.contains('dark') ? 'light' : 'dark'
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // storage unavailable (private mode); the toggle still works for this visit
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

    // Circle centered on the button, large enough to cover the farthest corner
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

  return { theme, toggleTheme }
}
