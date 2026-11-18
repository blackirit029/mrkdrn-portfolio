import { useEffect, useState } from 'react'

function readHash<T extends string>(tabs: readonly T[], fallback: T): T {
  const hash = window.location.hash.slice(1)
  return (tabs as readonly string[]).includes(hash) ? (hash as T) : fallback
}

/**
 * The active tab, stored in the URL hash (#journal, #todo) so a refresh,
 * a shared link, and the browser back button all keep the right section.
 */
export function useHashTab<T extends string>(tabs: readonly T[], fallback: T) {
  const [tab, setTab] = useState<T>(() => readHash(tabs, fallback))

  useEffect(() => {
    const onHashChange = () => setTab(readHash(tabs, fallback))
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [tabs, fallback])

  const selectTab = (next: T) => {
    if (next !== tab) window.location.hash = next
  }

  return [tab, selectTab] as const
}
