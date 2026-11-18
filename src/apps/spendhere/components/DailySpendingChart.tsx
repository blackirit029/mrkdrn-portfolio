import { useMemo, useState } from 'react'
import type { Month, Transaction } from '../types'
import { currentMonth, daysInMonth, formatAxis, formatMoney, niceTicks, shortDate, todayKey } from '../utils'

interface DailySpendingChartProps {
  month: Month
  transactions: Transaction[]
}

/** Single-series column chart: one bar per day, hover/focus for the exact value, table view for the rest. */
function DailySpendingChart({ month, transactions }: DailySpendingChartProps) {
  const [active, setActive] = useState<number | null>(null)

  const days = useMemo(() => {
    const totals = Array.from({ length: daysInMonth(month) }, (_, i) => ({
      date: `${month}-${String(i + 1).padStart(2, '0')}`,
      total: 0,
    }))
    for (const t of transactions) totals[Number(t.date.slice(8)) - 1].total += t.amount
    return totals
  }, [month, transactions])

  const max = Math.max(...days.map((d) => d.total))
  const ticks = niceTicks(max, 3)
  const top = ticks[ticks.length - 1]
  const today = todayKey()
  const isCurrent = month === currentMonth()
  const labelDays = new Set([1, 8, 15, 22, days.length])

  const activeDay = active === null ? null : days[active]
  // Keep the tooltip inside the plot near the edges
  const align = active === null ? '' : active < 4 ? 'translate-x-0' : active > days.length - 5 ? '-translate-x-full' : '-translate-x-1/2'

  return (
    <section aria-labelledby="daily-heading" className="rounded-xl border border-line bg-card p-4 sm:p-5">
      <h2 id="daily-heading" className="text-sm font-medium text-fg">
        Daily spending
      </h2>
      <p className="text-xs text-muted">Hover or tap a bar for the day's total</p>

      <div className="mt-5 flex gap-2">
        {/* Y axis */}
        <div className="relative h-44 w-12 shrink-0 text-right text-[11px] text-subtle tabular-nums">
          {ticks.map((tick) => (
            <span key={tick} className="absolute right-0 translate-y-1/2" style={{ bottom: `${(tick / top) * 100}%` }}>
              {formatAxis(tick, top)}
            </span>
          ))}
        </div>

        <div className="min-w-0 flex-1">
          {/* Plot */}
          <div className="relative h-44" onPointerLeave={() => setActive(null)}>
            {ticks.map((tick) => (
              <div
                key={tick}
                className={`absolute inset-x-0 h-px ${tick === 0 ? 'bg-subtle/60' : 'bg-line-soft'}`}
                style={{ bottom: `${(tick / top) * 100}%` }}
              />
            ))}

            <div className="absolute inset-0 flex items-end gap-px sm:gap-0.5">
              {days.map((day, i) => {
                const isFuture = isCurrent && day.date > today
                return (
                  <button
                    key={day.date}
                    type="button"
                    disabled={isFuture}
                    onPointerEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onBlur={() => setActive(null)}
                    onClick={() => setActive(i)}
                    aria-label={`${shortDate(day.date)}: ${formatMoney(day.total)}`}
                    className="group flex h-full flex-1 items-end justify-center outline-none"
                  >
                    <span
                      className={`block w-full max-w-6 rounded-t transition-opacity ${
                        active !== null && active !== i ? 'opacity-40' : ''
                      } group-focus-visible:ring-2 group-focus-visible:ring-fg/40`}
                      style={{
                        height: day.total > 0 ? `max(${(day.total / top) * 100}%, 2px)` : 0,
                        background: 'var(--accent)',
                      }}
                    />
                  </button>
                )
              })}
            </div>

            {activeDay && active !== null && (
              <div
                role="status"
                className={`pointer-events-none absolute z-10 rounded-md border border-line bg-card px-2.5 py-1.5 text-xs whitespace-nowrap shadow-lg ${align} dark:shadow-black/50`}
                style={{
                  left: `${((active + 0.5) / days.length) * 100}%`,
                  bottom: `calc(${(activeDay.total / top) * 100}% + 8px)`,
                }}
              >
                <p className="text-muted">{shortDate(activeDay.date)}</p>
                <p className="font-semibold text-fg">{formatMoney(activeDay.total)}</p>
              </div>
            )}
          </div>

          {/* X axis */}
          <div className="mt-2 flex text-[11px] text-subtle">
            {days.map((day, i) => (
              <span key={day.date} className="relative flex-1">
                {labelDays.has(i + 1) && (
                  <span className={`absolute ${i === days.length - 1 ? 'right-0' : i === 0 ? 'left-0' : 'left-1/2 -translate-x-1/2'}`}>
                    {i + 1}
                  </span>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Table view: the same data for screen readers and anyone who prefers numbers */}
      <details className="mt-6 text-sm">
        <summary className="cursor-pointer text-xs text-muted hover:text-fg">Show as table</summary>
        <div className="mt-3 max-h-60 overflow-y-auto rounded-lg border border-line-soft">
          <table className="w-full text-left text-xs">
            <thead className="sticky top-0 bg-card text-muted">
              <tr>
                <th className="px-3 py-2 font-medium">Date</th>
                <th className="px-3 py-2 text-right font-medium">Spent</th>
              </tr>
            </thead>
            <tbody className="tabular-nums">
              {days
                .filter((d) => d.total > 0)
                .map((d) => (
                  <tr key={d.date} className="border-t border-line-soft">
                    <td className="px-3 py-1.5 text-body">{shortDate(d.date)}</td>
                    <td className="px-3 py-1.5 text-right text-fg">{formatMoney(d.total)}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </details>
    </section>
  )
}

export default DailySpendingChart
