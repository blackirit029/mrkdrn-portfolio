import { useMemo } from 'react'
import { allocatedOf, categories } from '../data'
import type { CategoryId, Month, MonthBudget, Transaction } from '../types'
import { formatMoney, inMonth, isFutureMonth, monthName, shiftMonth } from '../utils'
import { BudgetMeter, BudgetStatusLabel } from './BudgetMeter'
import { enter } from '../enter'
import ViewHeader from './ViewHeader'

interface BudgetsViewProps {
  month: Month
  onMonthChange: (month: Month) => void
  transactions: Transaction[]
  budget: MonthBudget
  previousBudget: MonthBudget
  onTotalChange: (total: number) => void
  onCategoryChange: (categoryId: CategoryId, limit: number) => void
  onCopyPrevious: () => void
  onClear: () => void
}

/** Whole pesos, never negative; an empty field means 0 */
const toAmount = (value: string) => Math.max(0, Math.round(Number(value) || 0))

function BudgetsView({
  month,
  onMonthChange,
  transactions,
  budget,
  previousBudget,
  onTotalChange,
  onCategoryChange,
  onCopyPrevious,
  onClear,
}: BudgetsViewProps) {
  const spentByCategory = useMemo(() => {
    const totals = Object.fromEntries(categories.map((c) => [c.id, 0])) as Record<CategoryId, number>
    for (const t of inMonth(transactions, month)) totals[t.categoryId] += t.amount
    return totals
  }, [transactions, month])

  const totalSpent = Object.values(spentByCategory).reduce((s, v) => s + v, 0)
  const allocated = allocatedOf(budget)
  const unallocated = budget.total - allocated
  const isEmpty = budget.total === 0 && allocated === 0
  const prevMonth = shiftMonth(month, -1)
  const canCopy = previousBudget.total > 0 || allocatedOf(previousBudget) > 0
  const upcoming = isFutureMonth(month)

  return (
    <>
      <ViewHeader title="Budgets" month={month} onMonthChange={onMonthChange} />

      {isEmpty && (
        <div
          style={enter(0).style}
          className={`mb-4 flex flex-col gap-3 rounded-xl border border-dashed border-line px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5 ${enter(0).className}`}
        >
          <p className="text-sm text-body">
            <span className="font-medium text-fg">No budget for {monthName(month)} yet.</span> Enter a monthly budget below
            {canCopy ? `, or start from ${monthName(prevMonth)}'s.` : '.'}
          </p>
          {canCopy && (
            <button
              type="button"
              onClick={onCopyPrevious}
              className="shrink-0 rounded-md bg-accent px-4 py-2 text-sm font-medium text-accent-fg hover:bg-accent-hover"
            >
              Copy {monthName(prevMonth)}'s budget
            </button>
          )}
        </div>
      )}

      <section
        aria-label="Monthly budget"
        style={enter(1).style}
        className={`rounded-xl border border-line bg-card p-5 sm:p-6 ${enter(1).className}`}
      >
        <div className="grid gap-5 sm:grid-cols-3">
          <label className="block">
            <span className="text-xs text-muted">Monthly budget</span>
            <span className="relative mt-1 block">
              <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-lg text-subtle">₱</span>
              <input
                type="number"
                inputMode="numeric"
                min="0"
                step="500"
                value={budget.total || ''}
                placeholder="0"
                onChange={(e) => onTotalChange(toAmount(e.target.value))}
                aria-label={`Total budget for ${monthName(month)}`}
                className="h-11 w-full rounded-lg border border-line bg-page pr-3 pl-8 text-xl font-semibold text-fg tabular-nums placeholder:text-subtle focus:border-accent focus:outline-none"
              />
            </span>
          </label>
          <div>
            <p className="text-xs text-muted">{upcoming ? 'Spent so far' : `Spent in ${monthName(month)}`}</p>
            <p className="mt-2 text-xl font-semibold text-fg sm:text-2xl">{formatMoney(totalSpent)}</p>
          </div>
          <div>
            <p className="text-xs text-muted">{totalSpent > budget.total ? 'Over budget' : 'Remaining'}</p>
            <p className="mt-2 text-xl font-semibold text-fg sm:text-2xl">{formatMoney(Math.abs(budget.total - totalSpent))}</p>
          </div>
        </div>

        <div className="mt-5 space-y-2">
          <BudgetMeter spent={totalSpent} limit={budget.total} />
          <BudgetStatusLabel spent={totalSpent} limit={budget.total} />
        </div>

        {/* How the monthly budget is split across categories */}
        <div className="mt-5 flex flex-col gap-2 border-t border-line-soft pt-4 text-sm sm:flex-row sm:items-center sm:justify-between">
          {unallocated >= 0 ? (
            <p className="text-body">
              <span className="font-medium text-fg">{formatMoney(allocated)}</span> assigned to categories
              {budget.total > 0 && (
                <>
                  {' · '}
                  <span className="font-medium text-fg">{formatMoney(unallocated)}</span> unassigned
                </>
              )}
            </p>
          ) : (
            <p className="text-bad-text">
              Category limits add up to {formatMoney(allocated)}, {formatMoney(-unallocated)} more than the monthly budget.
            </p>
          )}
          {unallocated < 0 && (
            <button
              type="button"
              onClick={() => onTotalChange(allocated)}
              className="shrink-0 self-start rounded-md border border-line px-3 py-1.5 text-xs font-medium text-fg hover:bg-chip sm:self-auto"
            >
              Raise budget to {formatMoney(allocated)}
            </button>
          )}
        </div>
      </section>

      <div style={enter(2).style} className={`mt-6 mb-3 flex flex-wrap items-center justify-between gap-3 px-1 ${enter(2).className}`}>
        <h2 className="text-xs font-semibold tracking-widest text-subtle uppercase">Category limits</h2>
        <div className="flex gap-4 text-xs">
          <button
            type="button"
            onClick={onCopyPrevious}
            disabled={!canCopy}
            className="text-muted underline-offset-4 hover:text-fg hover:underline disabled:pointer-events-none disabled:opacity-40"
          >
            Copy from {monthName(prevMonth)}
          </button>
          <button
            type="button"
            onClick={onClear}
            disabled={isEmpty}
            className="text-muted underline-offset-4 hover:text-fg hover:underline disabled:pointer-events-none disabled:opacity-40"
          >
            Clear all
          </button>
        </div>
      </div>

      <ul className="grid gap-3 sm:grid-cols-2">
        {categories.map((category, i) => {
          const spent = spentByCategory[category.id]
          const limit = budget.categories[category.id]
          return (
            <li key={category.id} style={enter(3 + i, 70).style} className={`rounded-xl border border-line bg-card p-4 ${enter(3 + i, 70).className}`}>
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
                      value={limit || ''}
                      placeholder="0"
                      onChange={(e) => onCategoryChange(category.id, toAmount(e.target.value))}
                      aria-label={`${category.name} limit for ${monthName(month)}`}
                      className="h-8 w-24 rounded-md border border-line bg-page pr-2 pl-5 text-right text-sm text-fg tabular-nums placeholder:text-subtle focus:border-accent focus:outline-none"
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
