import { useMemo, useState, type FormEvent, type KeyboardEvent } from 'react'
import type { JournalEntry } from '../types'
import { createId, groupByDay } from '../utils'
import ConfirmDialog from '../../../components/ui/ConfirmDialog'
import EmptyState from './EmptyState'
import { SearchIcon } from './Icons'
import JournalEntryCard from './JournalEntryCard'

interface JournalViewProps {
  entries: JournalEntry[]
  onAdd: (entry: JournalEntry) => void
  onUpdate: (id: string, changes: Pick<JournalEntry, 'title' | 'body'>) => void
  onDelete: (id: string) => void
}

/** Short preview of an entry for the delete confirmation */
const describe = (entry: JournalEntry) =>
  entry.title ? `"${entry.title}"` : `"${entry.body.length > 60 ? `${entry.body.slice(0, 60)}…` : entry.body}"`

const inputClass =
  'w-full rounded-md border border-line bg-card px-3 py-2 text-fg placeholder:text-subtle focus:border-subtle focus:outline-none focus:ring-2 focus:ring-fg/10'

function JournalView({ entries, onAdd, onUpdate, onDelete }: JournalViewProps) {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [query, setQuery] = useState('')
  const [pendingDelete, setPendingDelete] = useState<JournalEntry | null>(null)

  const canSave = body.trim().length > 0

  const save = () => {
    if (!canSave) return
    onAdd({ id: createId(), title: title.trim(), body: body.trim(), createdAt: new Date().toISOString() })
    setTitle('')
    setBody('')
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    save()
  }

  // Ctrl/Cmd + Enter saves from the textarea
  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) save()
  }

  const groups = useMemo(() => {
    const q = query.trim().toLowerCase()
    const matches = q
      ? entries.filter((entry) => `${entry.title} ${entry.body}`.toLowerCase().includes(q))
      : entries
    return groupByDay(matches)
  }, [entries, query])

  return (
    <div className="space-y-10">
      <section aria-labelledby="new-entry">
        <h1 id="new-entry" className="text-2xl font-semibold tracking-tight text-fg">
          Journal
        </h1>
        <p className="mt-1 text-sm text-muted">Capture your thoughts for the day.</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-3 rounded-lg border border-line bg-card p-4 sm:p-5">
          <label className="sr-only" htmlFor="entry-title">
            Title
          </label>
          <input
            id="entry-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title (optional)"
            className={`${inputClass} font-medium`}
            maxLength={120}
          />
          <label className="sr-only" htmlFor="entry-body">
            Entry
          </label>
          <textarea
            id="entry-body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="What's on your mind today?"
            rows={5}
            className={`${inputClass} resize-y leading-relaxed`}
          />
          <div className="flex items-center justify-between gap-4">
            <span className="hidden text-xs text-subtle sm:inline">Ctrl + Enter to save</span>
            <button
              type="submit"
              disabled={!canSave}
              className="ml-auto rounded-md bg-inverse px-4 py-2 text-sm font-medium text-inverse-fg transition-colors hover:bg-inverse-hover disabled:cursor-not-allowed disabled:opacity-40"
            >
              Save entry
            </button>
          </div>
        </form>
      </section>

      <section aria-label="Entries" className="space-y-6">
        {entries.length > 0 && (
          <div className="relative">
            <SearchIcon className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-subtle" />
            <label className="sr-only" htmlFor="entry-search">
              Search entries
            </label>
            <input
              id="entry-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={`Search ${entries.length} ${entries.length === 1 ? 'entry' : 'entries'}`}
              className={`${inputClass} pl-9 text-sm`}
            />
          </div>
        )}

        {entries.length === 0 ? (
          <EmptyState title="No entries yet" description="Your journal entries will appear here." />
        ) : groups.length === 0 ? (
          <EmptyState title="No matches" description={`Nothing found for "${query}".`} />
        ) : (
          groups.map((group, groupIndex) => (
            <div key={group.label}>
              <h2 className="mb-3 text-xs font-semibold tracking-widest text-subtle uppercase">{group.label}</h2>
              <ul className="space-y-3">
                {group.items.map((entry, i) => (
                  <JournalEntryCard
                    key={entry.id}
                    entry={entry}
                    onUpdate={onUpdate}
                    onRequestDelete={setPendingDelete}
                    // Entries slide in from the left one after another
                    style={{ animationDelay: `${Math.min(150 + (groupIndex * 3 + i) * 70, 700)}ms` }}
                  />
                ))}
              </ul>
            </div>
          ))
        )}
      </section>

      <ConfirmDialog
        open={pendingDelete !== null}
        title="Delete this entry?"
        description={pendingDelete ? `${describe(pendingDelete)} will be permanently deleted. This can't be undone.` : ''}
        confirmLabel="Delete entry"
        onCancel={() => setPendingDelete(null)}
        onConfirm={() => {
          if (pendingDelete) onDelete(pendingDelete.id)
          setPendingDelete(null)
        }}
      />
    </div>
  )
}

export default JournalView
