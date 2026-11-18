import type { Month } from '../types'
import { MONTHS_AHEAD, isFutureMonth, lastPlannableMonth, monthLabel, shiftMonth } from '../utils'
import { ChevronIcon } from './Icons'

interface ViewHeaderProps {
  title: string
  month: Month
  onMonthChange: (month: Month) => void
}

/** Page title plus the month switcher every tab shares (up to MONTHS_AHEAD months into the future). */
function ViewHeader({ title, month, onMonthChange }: ViewHeaderProps) {
  const atLimit = month >= lastPlannableMonth()
  const buttonClass =
    'grid h-8 w-8 place-items-center rounded-md text-muted transition-colors hover:bg-chip hover:text-fg disabled:pointer-events-none disabled:opacity-30'

  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
      <div className="flex items-center gap-2">
        <h1 className="text-2xl font-semibold tracking-tight text-fg">{title}</h1>
        {isFutureMonth(month) && (
          <span className="rounded-full bg-accent-soft px-2 py-0.5 text-xs font-medium text-accent">Upcoming</span>
        )}
      </div>
      <div className="flex items-center gap-1 rounded-lg border border-line bg-card p-1">
        <button type="button" onClick={() => onMonthChange(shiftMonth(month, -1))} aria-label="Previous month" className={buttonClass}>
          <ChevronIcon direction="left" />
        </button>
        <span className="min-w-32 text-center text-sm font-medium text-fg" aria-live="polite">
          {monthLabel(month)}
        </span>
        <button
          type="button"
          onClick={() => onMonthChange(shiftMonth(month, 1))}
          aria-label="Next month"
          title={atLimit ? `You can plan up to ${MONTHS_AHEAD} months ahead` : undefined}
          disabled={atLimit}
          className={buttonClass}
        >
          <ChevronIcon />
        </button>
      </div>
    </div>
  )
}

export default ViewHeader
