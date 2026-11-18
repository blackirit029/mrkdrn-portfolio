import { useEffect, useState } from 'react'

/** useState that persists to localStorage under `key`. `initialValue` may be a function, called only when nothing is saved. */
export function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
  const [value, setValue] = useState<T>(() => {
    const fallback = () => (initialValue instanceof Function ? initialValue() : initialValue)
    try {
      const raw = localStorage.getItem(key)
      return raw ? (JSON.parse(raw) as T) : fallback()
    } catch {
      return fallback()
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // storage full or unavailable: keep working in memory
    }
  }, [key, value])

  return [value, setValue] as const
}
