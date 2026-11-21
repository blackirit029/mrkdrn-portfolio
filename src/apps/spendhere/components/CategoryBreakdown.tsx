import { useMemo, type CSSProperties } from 'react'
import { categories } from '../data'
import type { Transaction } from '../types'
import { formatMoney } from '../utils'

interface CategoryBreakdownProps {
  transactions: Transaction[]
  style?: CSSProperties
  className?: string
}

/** Ranked bars, one per category: every bar carries its name and amount as text (no color-only identity). */
function CategoryBreakdown({ transactions, style, className = '' }: CategoryBreakdownProps) {
  const rows = useMemo(() => {
    const total = transactions.reduce((s, t) => s + t.amount, 0)
    return categories
      .map((category) => {
        const amount = transactions.filter((t) => t.categoryId === category.id).reduce((s, t) => s + t.amount, 0)
        return { category, amount, share: total ? amount / total : 0 }
      })
      .filter((row) => row.amount > 0)
      .sort((a, b) => b.amount - a.amount)
  }, [transactions])

  const max = rows[0]?.amount ?? 0

  return (
    <section aria-labelledby="category-heading" style={style} className={`rounded-xl border border-line bg-card p-4 sm:p-5 ${className}`}>
      <h2 id="category-heading" className="text-sm font-medium text-fg">
        By category
      </h2>
      <p className="text-xs text-muted">Where your money went this month</p>

      {rows.length === 0 ? (
        <p className="py-10 text-center text-sm text-muted">No spending this month.</p>
      ) : (
        <ul className="mt-5 space-y-4">
          {rows.map(({ category, amount, share }) => (
            <li key={category.id}>
              <div className="flex items-baseline justify-between gap-3 text-sm">
                <span className="flex min-w-0 items-center gap-2 text-fg">
                  <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: category.color }} aria-hidden />
                  <span className="truncate">{category.name}</span>
                </span>
                <span className="shrink-0 tabular-nums">
                  <span className="font-medium text-fg">{formatMoney(amount)}</span>
                  <span className="ml-2 inline-block w-9 text-right text-xs text-muted">{Math.round(share * 100)}%</span>
                </span>
              </div>
              <div className="mt-1.5 h-2">
                <div
                  className="h-full rounded-r"
                  style={{ width: `${Math.max((amount / max) * 100, 1)}%`, background: category.color }}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default CategoryBreakdown
