export const createId = () =>
  typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`

const dayKey = (date: Date) => date.toDateString()

/** "Today", "Yesterday", or a readable date such as "Mon, Nov 17, 2026". */
export function formatDay(iso: string) {
  const date = new Date(iso)
  const today = new Date()
  const yesterday = new Date(today)
  yesterday.setDate(today.getDate() - 1)

  if (dayKey(date) === dayKey(today)) return 'Today'
  if (dayKey(date) === dayKey(yesterday)) return 'Yesterday'
  return date.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })
}

export const formatTime = (iso: string) =>
  new Date(iso).toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' })

/** Groups items by calendar day, keeping the incoming order. */
export function groupByDay<T extends { createdAt: string }>(items: T[]) {
  const groups = new Map<string, { label: string; items: T[] }>()
  for (const item of items) {
    const key = dayKey(new Date(item.createdAt))
    const group = groups.get(key) ?? { label: formatDay(item.createdAt), items: [] }
    group.items.push(item)
    groups.set(key, group)
  }
  return [...groups.values()]
}
