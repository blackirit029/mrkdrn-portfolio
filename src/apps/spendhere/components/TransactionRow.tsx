import { categoryById } from '../data'
import type { Transaction } from '../types'
import { formatMoney } from '../utils'
import { TrashIcon } from './Icons'

interface TransactionRowProps {
  transaction: Transaction
  subtitle?: string
  onDelete?: (id: string) => void
}

function TransactionRow({ transaction, subtitle, onDelete }: TransactionRowProps) {
  const category = categoryById[transaction.categoryId]

  return (
    <li className="group flex items-center gap-3 px-4 py-3">
      <span
        className="grid h-9 w-9 shrink-0 place-items-center rounded-full"
        style={{ background: `color-mix(in oklab, ${category.color} 16%, transparent)` }}
        aria-hidden
      >
        <span className="h-2.5 w-2.5 rounded-full" style={{ background: category.color }} />
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm text-fg">{transaction.note || category.name}</p>
        <p className="truncate text-xs text-muted">{subtitle ?? category.name}</p>
      </div>
      <span className="shrink-0 text-sm font-medium text-fg tabular-nums">−{formatMoney(transaction.amount)}</span>
      {onDelete && (
        <button
          type="button"
          onClick={() => onDelete(transaction.id)}
          aria-label={`Delete ${transaction.note || category.name}, ${formatMoney(transaction.amount)}`}
          className="shrink-0 rounded-md p-1.5 text-subtle transition hover:bg-chip hover:text-fg sm:opacity-0 sm:group-hover:opacity-100 sm:focus:opacity-100"
        >
          <TrashIcon />
        </button>
      )}
    </li>
  )
}

export default TransactionRow
