import { useState, type FormEvent, type KeyboardEvent } from 'react'
import { categories, categoryById } from '../data'
import type { CategoryId, Transaction } from '../types'
import { formatMoney, todayKey } from '../utils'
import { PencilIcon, TrashIcon } from './Icons'

type TransactionChanges = Pick<Transaction, 'amount' | 'categoryId' | 'note' | 'date'>

interface TransactionRowProps {
  transaction: Transaction
  subtitle?: string
  /** Edit and delete are offered only when these are given (the full list, not the dashboard preview) */
  onUpdate?: (id: string, changes: TransactionChanges) => void
  onRequestDelete?: (transaction: Transaction) => void
}

const fieldClass =
  'h-9 w-full rounded-md border border-line bg-page px-2.5 text-sm text-fg placeholder:text-subtle focus:border-accent focus:outline-none'
const iconButton =
  'shrink-0 rounded-md p-1.5 text-subtle transition hover:bg-chip hover:text-fg sm:opacity-0 sm:group-hover:opacity-100 sm:focus-visible:opacity-100'

function CategoryDot({ color }: { color: string }) {
  return (
    <span
      className="grid h-9 w-9 shrink-0 place-items-center rounded-full"
      style={{ background: `color-mix(in oklab, ${color} 16%, transparent)` }}
      aria-hidden
    >
      <span className="h-2.5 w-2.5 rounded-full" style={{ background: color }} />
    </span>
  )
}

/** One transaction: read, edit in place (amount, category, note, date), or delete after confirmation. */
function TransactionRow({ transaction, subtitle, onUpdate, onRequestDelete }: TransactionRowProps) {
  const category = categoryById[transaction.categoryId]
  const [editing, setEditing] = useState(false)
  const [amount, setAmount] = useState(String(transaction.amount))
  const [categoryId, setCategoryId] = useState<CategoryId>(transaction.categoryId)
  const [note, setNote] = useState(transaction.note)
  const [date, setDate] = useState(transaction.date)

  const value = Number(amount)
  const changed =
    value !== transaction.amount || categoryId !== transaction.categoryId || note.trim() !== transaction.note || date !== transaction.date
  const canSave = value > 0 && Boolean(date) && changed

  const startEditing = () => {
    setAmount(String(transaction.amount))
    setCategoryId(transaction.categoryId)
    setNote(transaction.note)
    setDate(transaction.date)
    setEditing(true)
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!canSave || !onUpdate) return
    onUpdate(transaction.id, { amount: Math.round(value * 100) / 100, categoryId, note: note.trim(), date })
    setEditing(false)
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') setEditing(false)
  }

  if (editing) {
    return (
      <li className="bg-accent-soft/60 px-4 py-3">
        <form onSubmit={handleSubmit} onKeyDown={handleKeyDown} aria-label="Edit transaction" className="space-y-3">
          <div className="grid gap-2 sm:grid-cols-[7rem_1fr_1.4fr_9.5rem]">
            <label className="block">
              <span className="sr-only">Amount</span>
              <span className="relative block">
                <span className="pointer-events-none absolute top-1/2 left-2.5 -translate-y-1/2 text-sm text-subtle">₱</span>
                <input
                  type="number"
                  inputMode="decimal"
                  min="0"
                  step="0.01"
                  required
                  autoFocus
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  onFocus={(e) => e.currentTarget.select()}
                  className={`${fieldClass} pl-6 tabular-nums`}
                />
              </span>
            </label>
            <label className="block">
              <span className="sr-only">Category</span>
              <select value={categoryId} onChange={(e) => setCategoryId(e.target.value as CategoryId)} className={fieldClass}>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="sr-only">Note</span>
              <input value={note} onChange={(e) => setNote(e.target.value)} placeholder="Note" maxLength={80} className={fieldClass} />
            </label>
            <label className="block">
              <span className="sr-only">Date</span>
              <input type="date" required value={date} max={todayKey()} onChange={(e) => setDate(e.target.value)} className={fieldClass} />
            </label>
          </div>
          <div className="flex items-center justify-between gap-3">
            <span className="hidden text-xs text-subtle sm:inline">Enter to save · Esc to cancel</span>
            <div className="ml-auto flex gap-2">
              <button
                type="button"
                onClick={() => setEditing(false)}
                className="rounded-md border border-line bg-card px-3 py-1.5 text-sm text-fg transition-colors hover:bg-chip"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!canSave}
                className="rounded-md bg-accent px-3 py-1.5 text-sm font-medium text-accent-fg transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-40"
              >
                Save changes
              </button>
            </div>
          </div>
        </form>
      </li>
    )
  }

  const label = `${transaction.note || category.name}, ${formatMoney(transaction.amount)}`

  return (
    <li className="group flex items-center gap-3 px-4 py-3">
      <CategoryDot color={category.color} />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm text-fg">{transaction.note || category.name}</p>
        <p className="truncate text-xs text-muted">
          {subtitle ?? category.name}
          {transaction.updatedAt && <span className="text-subtle"> · edited</span>}
        </p>
      </div>
      <span className="shrink-0 text-sm font-medium text-fg tabular-nums">−{formatMoney(transaction.amount)}</span>
      {onUpdate && (
        <button type="button" onClick={startEditing} aria-label={`Edit ${label}`} className={iconButton}>
          <PencilIcon />
        </button>
      )}
      {onRequestDelete && (
        <button
          type="button"
          onClick={() => onRequestDelete(transaction)}
          aria-label={`Delete ${label}`}
          className={`${iconButton} hover:text-red-600 dark:hover:text-red-400`}
        >
          <TrashIcon />
        </button>
      )}
    </li>
  )
}

export default TransactionRow
