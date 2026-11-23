import type { Month, Transaction } from './types'

const peso = new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP', maximumFractionDigits: 0 })
const pesoCompact = new Intl.NumberFormat('en-PH', {
  style: 'currency',
  currency: 'PHP',
  notation: 'compact',
  maximumFractionDigits: 1,
})

export const formatMoney = (value: number) => peso.format(Math.round(value))
/** Axis ticks: in full under 10,000, compact above */
export const formatAxis = (value: number, max: number) => (max >= 10000 ? pesoCompact.format(value) : peso.format(value))

const pad = (n: number) => String(n).padStart(2, '0')

export const toDateKey = (date: Date) => `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
export const parseDateKey = (key: string) => {
  const [y, m, d] = key.split('-').map(Number)
  return new Date(y, m - 1, d)
}

export const todayKey = () => toDateKey(new Date())
export const monthOf = (dateKey: string): Month => dateKey.slice(0, 7)
export const currentMonth = (): Month => monthOf(todayKey())

export function shiftMonth(month: Month, delta: number): Month {
  const [y, m] = month.split('-').map(Number)
  const date = new Date(y, m - 1 + delta, 1)
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}`
}

export const daysInMonth = (month: Month) => {
  const [y, m] = month.split('-').map(Number)
  return new Date(y, m, 0).getDate()
}

export const monthLabel = (month: Month, style: 'long' | 'short' = 'long') =>
  parseDateKey(`${month}-01`).toLocaleDateString(undefined, { month: style, year: 'numeric' })

export const monthName = (month: Month) => parseDateKey(`${month}-01`).toLocaleDateString(undefined, { month: 'long' })

export const shortDate = (dateKey: string) =>
  parseDateKey(dateKey).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })

/** "Today", "Yesterday", or "Mon, Nov 17" */
export function dayLabel(dateKey: string) {
  const today = todayKey()
  const yesterday = toDateKey(new Date(Date.now() - 864e5))
  if (dateKey === today) return 'Today'
  if (dateKey === yesterday) return 'Yesterday'
  return parseDateKey(dateKey).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })
}

export const inMonth = (transactions: Transaction[], month: Month) =>
  transactions.filter((t) => monthOf(t.date) === month)

export const sum = (transactions: Transaction[]) => transactions.reduce((total, t) => total + t.amount, 0)

/** Newest first */
export const byNewest = (a: Transaction, b: Transaction) =>
  b.date.localeCompare(a.date) || b.createdAt - a.createdAt

/** Clean axis ticks from 0 to a round number at or above `max` */
export function niceTicks(max: number, count = 4) {
  if (max <= 0) return [0, 1]
  const rough = max / count
  const pow = 10 ** Math.floor(Math.log10(rough))
  const step = [1, 2, 2.5, 5, 10].map((m) => m * pow).find((s) => s >= rough) ?? 10 * pow
  const top = Math.ceil(max / step) * step
  return Array.from({ length: Math.round(top / step) + 1 }, (_, i) => i * step)
}

export const createId = () =>
  typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`

/** How many months ahead of the current one can be planned */
export const MONTHS_AHEAD = 3
export const lastPlannableMonth = (): Month => shiftMonth(currentMonth(), MONTHS_AHEAD)
export const isFutureMonth = (month: Month) => month > currentMonth()

/** Latest date a transaction can have: the last day of the furthest plannable month */
export const lastPlannableDate = () => {
  const month = lastPlannableMonth()
  return `${month}-${pad(daysInMonth(month))}`
}

/**
 * Sensible default date for adding to `month`: today in the current month,
 * the 1st of an upcoming month, the last day of a past month.
 */
export function defaultDateFor(month: Month) {
  const current = currentMonth()
  if (month === current) return todayKey()
  if (month > current) return `${month}-01`
  return `${month}-${pad(daysInMonth(month))}`
}

export type BudgetStatus = 'none' | 'good' | 'warning' | 'over'

/** No limit set at 0; on track below 80%, near limit up to 100%, then over */
export const budgetStatus = (spent: number, limit: number): BudgetStatus =>
  limit <= 0 ? 'none' : spent > limit ? 'over' : spent / limit >= 0.8 ? 'warning' : 'good'
