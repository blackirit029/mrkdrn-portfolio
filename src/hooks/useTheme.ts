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

  const toggleTheme = useCallback(() => {
    setTheme((current) => {
      const next = current === 'dark' ? 'light' : 'dark'
      try {
        localStorage.setItem(STORAGE_KEY, next)
      } catch {
        // storage unavailable (private mode); the toggle still works for this visit
      }
      return next
    })
  }, [])

  return { theme, toggleTheme }
}
