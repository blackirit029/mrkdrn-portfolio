import { useMemo, useState, type FormEvent, type KeyboardEvent } from 'react'
import type { JournalEntry } from '../types'
import { createId, formatTime, groupByDay } from '../utils'
import EmptyState from './EmptyState'
import { SearchIcon, TrashIcon } from './Icons'

interface JournalViewProps {
  entries: JournalEntry[]
  onAdd: (entry: JournalEntry) => void
  onDelete: (id: string) => void
}

const inputClass =
  'w-full rounded-md border border-line bg-card px-3 py-2 text-fg placeholder:text-subtle focus:border-subtle focus:outline-none focus:ring-2 focus:ring-fg/10'

function JournalView({ entries, onAdd, onDelete }: JournalViewProps) {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [query, setQuery] = useState('')

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
          groups.map((group) => (
            <div key={group.label}>
              <h2 className="mb-3 text-xs font-semibold tracking-widest text-subtle uppercase">{group.label}</h2>
              <ul className="space-y-3">
                {group.items.map((entry) => (
                  <li
                    key={entry.id}
                    className="group rounded-lg border border-line bg-card p-4 motion-safe:animate-fade-in sm:p-5"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        {entry.title && <h3 className="font-medium break-words text-fg">{entry.title}</h3>}
                        <time dateTime={entry.createdAt} className="text-xs text-subtle">
                          {formatTime(entry.createdAt)}
                        </time>
                      </div>
                      <button
                        type="button"
                        onClick={() => onDelete(entry.id)}
                        aria-label={`Delete entry${entry.title ? ` "${entry.title}"` : ''}`}
                        className="shrink-0 rounded-md p-1.5 text-subtle transition hover:bg-chip hover:text-fg sm:opacity-0 sm:group-hover:opacity-100 sm:focus:opacity-100"
                      >
                        <TrashIcon />
                      </button>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed break-words whitespace-pre-wrap text-body">{entry.body}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </section>
    </div>
  )
}

export default JournalView
