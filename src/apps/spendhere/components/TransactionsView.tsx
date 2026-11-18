import { useMemo, useState, type FormEvent } from 'react'
import { categories, categoryById } from '../data'
import type { CategoryId, Month, Transaction } from '../types'
import { byNewest, createId, dayLabel, formatMoney, inMonth, monthName, sum, todayKey } from '../utils'
import { SearchIcon } from './Icons'
import TransactionRow from './TransactionRow'
import ViewHeader from './ViewHeader'

interface TransactionsViewProps {
  month: Month
  onMonthChange: (month: Month) => void
  transactions: Transaction[]
  onAdd: (transaction: Transaction) => void
  onDelete: (id: string) => void
}

const fieldClass =
  'h-10 w-full rounded-md border border-line bg-page px-3 text-sm text-fg placeholder:text-subtle focus:border-accent focus:outline-none'

function TransactionsView({ month, onMonthChange, transactions, onAdd, onDelete }: TransactionsViewProps) {
  const [amount, setAmount] = useState('')
  const [categoryId, setCategoryId] = useState<CategoryId>('food')
  const [note, setNote] = useState('')
  const [date, setDate] = useState(todayKey)
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState<CategoryId | 'all'>('all')

  const value = Number(amount)
  const canAdd = value > 0 && Boolean(date)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!canAdd) return
    onAdd({ id: createId(), amount: Math.round(value * 100) / 100, categoryId, note: note.trim(), date, createdAt: Date.now() })
    setAmount('')
    setNote('')
  }

  const { groups, count, total } = useMemo(() => {
    const q = query.trim().toLowerCase()
    const list = inMonth(transactions, month)
      .filter((t) => filter === 'all' || t.categoryId === filter)
      .filter((t) => !q || `${t.note} ${categoryById[t.categoryId].name}`.toLowerCase().includes(q))
      .sort(byNewest)

    const byDay = new Map<string, Transaction[]>()
    for (const t of list) byDay.set(t.date, [...(byDay.get(t.date) ?? []), t])
    return { groups: [...byDay.entries()], count: list.length, total: sum(list) }
  }, [transactions, month, filter, query])

  return (
    <>
      <ViewHeader title="Transactions" month={month} onMonthChange={onMonthChange} />

      <form onSubmit={handleSubmit} className="rounded-xl border border-line bg-card p-4 sm:p-5" aria-label="Add expense">
        <h2 className="text-sm font-medium text-fg">Add expense</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-[1fr_1.2fr_1.6fr_1fr_auto]">
          <label className="block">
            <span className="mb-1 block text-xs text-muted">Amount</span>
            <span className="relative block">
              <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-sm text-subtle">₱</span>
              <input
                type="number"
                inputMode="decimal"
                min="0"
                step="0.01"
                required
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0"
                className={`${fieldClass} pl-7 tabular-nums`}
              />
            </span>
          </label>
          <label className="block">
            <span className="mb-1 block text-xs text-muted">Category</span>
            <select value={categoryId} onChange={(e) => setCategoryId(e.target.value as CategoryId)} className={fieldClass}>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="mb-1 block text-xs text-muted">Note</span>
            <input value={note} onChange={(e) => setNote(e.target.value)} placeholder="e.g. Lunch" maxLength={80} className={fieldClass} />
          </label>
          <label className="block">
            <span className="mb-1 block text-xs text-muted">Date</span>
            <input type="date" required value={date} max={todayKey()} onChange={(e) => setDate(e.target.value)} className={fieldClass} />
          </label>
          <div className="flex items-end">
            <button
              type="submit"
              disabled={!canAdd}
              className="h-10 w-full rounded-md bg-accent px-5 text-sm font-medium text-accent-fg transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-40"
            >
              Add
            </button>
          </div>
        </div>
      </form>

      {/* Filters: one row above the list */}
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <label className="relative flex-1">
          <span className="sr-only">Search transactions</span>
          <SearchIcon className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-subtle" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search notes"
            className={`${fieldClass} bg-card pl-9`}
          />
        </label>
        <label className="sm:w-56">
          <span className="sr-only">Filter by category</span>
          <select value={filter} onChange={(e) => setFilter(e.target.value as CategoryId | 'all')} className={`${fieldClass} bg-card`}>
            <option value="all">All categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </label>
      </div>

      <p className="mt-4 text-sm text-muted">
        {count} {count === 1 ? 'transaction' : 'transactions'} in {monthName(month)} ·{' '}
        <span className="font-medium text-fg">{formatMoney(total)}</span>
      </p>

      {groups.length === 0 ? (
        <div className="mt-4 rounded-xl border border-dashed border-line px-6 py-12 text-center">
          <p className="font-medium text-fg">No transactions</p>
          <p className="mt-1 text-sm text-muted">Add an expense above or try another month or filter.</p>
        </div>
      ) : (
        <div className="mt-4 space-y-5">
          {groups.map(([day, items]) => (
            <section key={day} aria-label={dayLabel(day)}>
              <div className="mb-2 flex items-baseline justify-between px-1 text-xs">
                <h3 className="font-semibold tracking-widest text-subtle uppercase">{dayLabel(day)}</h3>
                <span className="text-muted tabular-nums">{formatMoney(sum(items))}</span>
              </div>
              <ul className="divide-y divide-line-soft overflow-hidden rounded-xl border border-line bg-card">
                {items.map((t) => (
                  <TransactionRow key={t.id} transaction={t} onDelete={onDelete} />
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}
    </>
  )
}

export default TransactionsView
