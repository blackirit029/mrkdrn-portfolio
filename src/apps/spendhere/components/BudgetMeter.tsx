import { budgetStatus, formatMoney } from '../utils'
import { AlertIcon, CheckCircleIcon, OverIcon } from './Icons'

interface BudgetMeterProps {
  spent: number
  limit: number
  /** Thin meter for dense rows */
  size?: 'sm' | 'md'
}

// Severity: accent while on track, then warning, then critical. The track is a lighter step of the fill.
const fills = { good: 'var(--accent)', warning: 'var(--warning)', over: 'var(--critical)' }

export function BudgetMeter({ spent, limit, size = 'md' }: BudgetMeterProps) {
  const status = budgetStatus(spent, limit)
  const pct = limit > 0 ? Math.min(100, (spent / limit) * 100) : spent > 0 ? 100 : 0
  const color = fills[status]

  return (
    <div
      role="meter"
      aria-valuemin={0}
      aria-valuemax={limit}
      aria-valuenow={Math.round(spent)}
      aria-label={`${formatMoney(spent)} of ${formatMoney(limit)} spent`}
      className={`w-full overflow-hidden rounded-full ${size === 'sm' ? 'h-1.5' : 'h-2'}`}
      style={{ background: `color-mix(in oklab, ${color} 18%, transparent)` }}
    >
      <div className="h-full rounded-full transition-[width] duration-500" style={{ width: `${pct}%`, background: color }} />
    </div>
  )
}

/** Status never relies on color alone: icon + label */
export function BudgetStatusLabel({ spent, limit }: { spent: number; limit: number }) {
  const status = budgetStatus(spent, limit)
  if (status === 'over')
    return (
      <span className="inline-flex items-center gap-1 text-xs font-medium text-bad-text">
        <OverIcon className="h-3.5 w-3.5" /> Over by {formatMoney(spent - limit)}
      </span>
    )
  if (status === 'warning')
    return (
      <span className="inline-flex items-center gap-1 text-xs font-medium text-fg">
        <AlertIcon className="h-3.5 w-3.5 text-warning" /> Near limit
      </span>
    )
  return (
    <span className="inline-flex items-center gap-1 text-xs text-muted">
      <CheckCircleIcon className="h-3.5 w-3.5 text-good" /> On track
    </span>
  )
}
