import { useMemo } from 'react'
import { categoryById } from '../data'
import type { CategoryId, Month, MonthBudget, Transaction } from '../types'
import {
  byNewest,
  currentMonth,
  daysInMonth,
  formatMoney,
  inMonth,
  isFutureMonth,
  monthName,
  shiftMonth,
  shortDate,
  sum,
  todayKey,
} from '../utils'
import { BudgetMeter, BudgetStatusLabel } from './BudgetMeter'
import CategoryBreakdown from './CategoryBreakdown'
import DailySpendingChart from './DailySpendingChart'
import { ArrowIcon } from './Icons'
import TransactionRow from './TransactionRow'
import ViewHeader from './ViewHeader'

interface DashboardViewProps {
  month: Month
  onMonthChange: (month: Month) => void
  transactions: Transaction[]
  budget: MonthBudget
  onViewAll: () => void
  onSetBudget: () => void
}

function StatTile({ label, value, detail }: { label: string; value: string; detail?: string }) {
  return (
    <div className="rounded-xl border border-line bg-card p-4">
      <p className="text-xs text-muted">{label}</p>
      <p className="mt-1 truncate text-xl font-semibold tracking-tight text-fg">{value}</p>
      {detail && <p className="mt-0.5 truncate text-xs text-muted">{detail}</p>}
    </div>
  )
}

function DashboardView({ month, onMonthChange, transactions, budget, onViewAll, onSetBudget }: DashboardViewProps) {
  const stats = useMemo(() => {
    const monthTx = inMonth(transactions, month)
    const isCurrent = month === currentMonth()
    const isFuture = isFutureMonth(month)
    const dayOfMonth = isFuture ? 0 : isCurrent ? Number(todayKey().slice(8)) : daysInMonth(month)

    // Compare against the same stretch of last month, so a half-finished month isn't compared to a full one
    const prevMonth = shiftMonth(month, -1)
    const prevComparable = inMonth(transactions, prevMonth).filter((t) => Number(t.date.slice(8)) <= dayOfMonth)

    const total = sum(monthTx)
    const prevTotal = sum(prevComparable)
    const change = !isFuture && prevTotal > 0 ? (total - prevTotal) / prevTotal : null

    const byCategory = new Map<CategoryId, number>()
    for (const t of monthTx) byCategory.set(t.categoryId, (byCategory.get(t.categoryId) ?? 0) + t.amount)
    const top = [...byCategory.entries()].sort((a, b) => b[1] - a[1])[0]

    return {
      monthTx,
      total,
      change,
      prevMonth,
      isCurrent,
      isFuture,
      dailyAverage: dayOfMonth ? total / dayOfMonth : 0,
      totalBudget: budget.total,
      top,
      recent: [...monthTx].sort(byNewest).slice(0, 5),
    }
  }, [transactions, month, budget])

  const remaining = stats.totalBudget - stats.total

  return (
    <>
      <ViewHeader title="Dashboard" month={month} onMonthChange={onMonthChange} />

      <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        {/* Hero figure: the one number this view leads with */}
        <section aria-label="Monthly total" className="flex flex-col justify-between rounded-xl border border-line bg-card p-5 sm:p-6">
          <div>
            <p className="text-sm text-muted">Spent in {monthName(month)}</p>
            <p className="mt-1 text-5xl font-semibold tracking-tight text-fg">{formatMoney(stats.total)}</p>
  
            {stats.change !== null && (
              <p className="mt-2 flex flex-wrap items-center gap-1.5 text-sm">
                <span
                  className={`inline-flex items-center gap-0.5 font-medium ${stats.change > 0 ? 'text-bad-text' : 'text-good-text'}`}
                >
                  <ArrowIcon direction={stats.change > 0 ? 'up' : 'down'} />
                  {Math.abs(Math.round(stats.change * 100))}%
                </span>
                <span className="text-muted">
                  vs {stats.isCurrent ? `the same days in ${monthName(stats.prevMonth)}` : monthName(stats.prevMonth)}
                </span>
              </p>
            )}
  
            {stats.isFuture && (
              <p className="mt-2 text-sm text-muted">{monthName(month)} hasn't started yet.</p>
            )}
          </div>

          {stats.totalBudget > 0 ? (
            <div className="mt-6 space-y-2">
              <div className="flex flex-wrap items-baseline justify-between gap-2 text-sm">
                <span className="text-body">
                  {remaining >= 0 ? (
                    <>
                      <span className="font-medium text-fg">{formatMoney(remaining)}</span> left of {formatMoney(stats.totalBudget)}
                    </>
                  ) : (
                    <>
                      <span className="font-medium text-fg">{formatMoney(stats.total)}</span> of {formatMoney(stats.totalBudget)} budget
                    </>
                  )}
                </span>
                <BudgetStatusLabel spent={stats.total} limit={stats.totalBudget} />
              </div>
              <BudgetMeter spent={stats.total} limit={stats.totalBudget} />
            </div>
          ) : (
            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-lg bg-accent-soft px-4 py-3 text-sm">
              <span className="text-body">No budget set for {monthName(month)}.</span>
              <button type="button" onClick={onSetBudget} className="font-medium text-accent hover:underline">
                Set a budget →
              </button>
            </div>
          )}
        </section>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-1">
          <StatTile
            label="Daily average"
            value={stats.isFuture ? '—' : formatMoney(stats.dailyAverage)}
            detail={stats.isFuture ? 'Month not started' : stats.isCurrent ? 'So far this month' : 'Over the month'}
          />
          <StatTile label="Transactions" value={String(stats.monthTx.length)} detail={`in ${monthName(month)}`} />
          <div className="col-span-2 lg:col-span-1">
            <StatTile
              label="Top category"
              value={stats.top ? categoryById[stats.top[0]].name : '—'}
              detail={stats.top ? `${formatMoney(stats.top[1])} · ${Math.round((stats.top[1] / stats.total) * 100)}% of spending` : undefined}
            />
          </div>
        </div>
      </div>

      <div className="mt-4">
        <DailySpendingChart month={month} transactions={stats.monthTx} />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <CategoryBreakdown transactions={stats.monthTx} />

        <section aria-labelledby="recent-heading" className="overflow-hidden rounded-xl border border-line bg-card">
          <div className="flex items-center justify-between px-4 pt-4 sm:px-5 sm:pt-5">
            <div>
              <h2 id="recent-heading" className="text-sm font-medium text-fg">
                Recent transactions
              </h2>
              <p className="text-xs text-muted">Latest in {monthName(month)}</p>
            </div>
            <button type="button" onClick={onViewAll} className="text-xs font-medium text-accent hover:underline">
              View all
            </button>
          </div>
          {stats.recent.length === 0 ? (
            <p className="py-10 text-center text-sm text-muted">No transactions yet.</p>
          ) : (
            <ul className="mt-2 divide-y divide-line-soft">
              {stats.recent.map((t) => (
                <TransactionRow key={t.id} transaction={t} subtitle={`${categoryById[t.categoryId].name} · ${shortDate(t.date)}`} />
              ))}
            </ul>
          )}
        </section>
      </div>
    </>
  )
}

export default DashboardView
