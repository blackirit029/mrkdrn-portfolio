import { useMemo } from 'react'
import { categories } from '../data'
import type { Budgets, CategoryId, Month, Transaction } from '../types'
import { formatMoney, inMonth, monthName } from '../utils'
import { BudgetMeter, BudgetStatusLabel } from './BudgetMeter'
import ViewHeader from './ViewHeader'

interface BudgetsViewProps {
  month: Month
  onMonthChange: (month: Month) => void
  transactions: Transaction[]
  budgets: Budgets
  onBudgetChange: (categoryId: CategoryId, limit: number) => void
  onReset: () => void
}

function BudgetsView({ month, onMonthChange, transactions, budgets, onBudgetChange, onReset }: BudgetsViewProps) {
  const spentByCategory = useMemo(() => {
    const totals = Object.fromEntries(categories.map((c) => [c.id, 0])) as Record<CategoryId, number>
    for (const t of inMonth(transactions, month)) totals[t.categoryId] += t.amount
    return totals
  }, [transactions, month])

  const totalBudget = Object.values(budgets).reduce((s, v) => s + v, 0)
  const totalSpent = Object.values(spentByCategory).reduce((s, v) => s + v, 0)

  return (
    <>
      <ViewHeader title="Budgets" month={month} onMonthChange={onMonthChange} />

      <section aria-label="Budget summary" className="rounded-xl border border-line bg-card p-5 sm:p-6">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-xs text-muted">Monthly budget</p>
            <p className="mt-1 text-lg font-semibold text-fg sm:text-2xl">{formatMoney(totalBudget)}</p>
          </div>
          <div>
            <p className="text-xs text-muted">Spent in {monthName(month)}</p>
            <p className="mt-1 text-lg font-semibold text-fg sm:text-2xl">{formatMoney(totalSpent)}</p>
          </div>
          <div>
            <p className="text-xs text-muted">{totalSpent > totalBudget ? 'Over budget' : 'Remaining'}</p>
            <p className="mt-1 text-lg font-semibold text-fg sm:text-2xl">{formatMoney(Math.abs(totalBudget - totalSpent))}</p>
          </div>
        </div>
        <div className="mt-5 space-y-2">
          <BudgetMeter spent={totalSpent} limit={totalBudget} />
          <BudgetStatusLabel spent={totalSpent} limit={totalBudget} />
        </div>
      </section>

      <div className="mt-6 mb-3 flex items-center justify-between gap-3 px-1">
        <h2 className="text-xs font-semibold tracking-widest text-subtle uppercase">By category</h2>
        <button type="button" onClick={onReset} className="text-xs text-muted underline-offset-4 hover:text-fg hover:underline">
          Reset to default limits
        </button>
      </div>

      <ul className="grid gap-3 sm:grid-cols-2">
        {categories.map((category) => {
          const spent = spentByCategory[category.id]
          const limit = budgets[category.id]
          return (
            <li key={category.id} className="rounded-xl border border-line bg-card p-4">
              <div className="flex items-center justify-between gap-3">
                <span className="flex min-w-0 items-center gap-2 text-sm font-medium text-fg">
                  <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: category.color }} aria-hidden />
                  <span className="truncate">{category.name}</span>
                </span>
                <label className="flex shrink-0 items-center gap-1.5 text-xs text-muted">
                  Limit
                  <span className="relative">
                    <span className="pointer-events-none absolute top-1/2 left-2 -translate-y-1/2 text-subtle">₱</span>
                    <input
                      type="number"
                      inputMode="numeric"
                      min="0"
                      step="100"
                      value={limit}
                      onChange={(e) => onBudgetChange(category.id, Math.max(0, Number(e.target.value) || 0))}
                      aria-label={`${category.name} monthly limit`}
                      className="h-8 w-24 rounded-md border border-line bg-page pr-2 pl-5 text-right text-sm text-fg tabular-nums focus:border-accent focus:outline-none"
                    />
                  </span>
                </label>
              </div>
              <div className="mt-3">
                <BudgetMeter spent={spent} limit={limit} size="sm" />
              </div>
              <div className="mt-2 flex items-center justify-between gap-2 text-xs">
                <span className="text-muted tabular-nums">
                  {formatMoney(spent)} of {formatMoney(limit)}
                </span>
                <BudgetStatusLabel spent={spent} limit={limit} />
              </div>
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default BudgetsView
