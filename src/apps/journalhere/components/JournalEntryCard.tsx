import { useState, type CSSProperties, type FormEvent, type KeyboardEvent } from 'react'
import type { JournalEntry } from '../types'
import { formatDay, formatTime } from '../utils'
import { PencilIcon, TrashIcon } from './Icons'

interface JournalEntryCardProps {
  entry: JournalEntry
  onUpdate: (id: string, changes: Pick<JournalEntry, 'title' | 'body'>) => void
  onRequestDelete: (entry: JournalEntry) => void
  style?: CSSProperties
}

const inputClass =
  'w-full rounded-md border border-line bg-page px-3 py-2 text-fg placeholder:text-subtle focus:border-subtle focus:outline-none focus:ring-2 focus:ring-fg/10'
const iconButton =
  'shrink-0 rounded-md p-1.5 text-subtle transition hover:bg-chip hover:text-fg sm:opacity-0 sm:group-hover:opacity-100 sm:focus-visible:opacity-100'

/** A journal entry that can be read, edited in place, or deleted (after confirmation). */
function JournalEntryCard({ entry, onUpdate, onRequestDelete, style }: JournalEntryCardProps) {
  const [editing, setEditing] = useState(false)
  // The entrance plays once; without this it would replay after every edit
  const [entered, setEntered] = useState(false)
  const [title, setTitle] = useState(entry.title)
  const [body, setBody] = useState(entry.body)

  const changed = title.trim() !== entry.title || body.trim() !== entry.body
  const canSave = body.trim().length > 0 && changed

  const startEditing = () => {
    setTitle(entry.title)
    setBody(entry.body)
    setEditing(true)
  }

  const save = () => {
    if (!canSave) return
    onUpdate(entry.id, { title: title.trim(), body: body.trim() })
    setEditing(false)
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    save()
  }

  // Ctrl/Cmd + Enter saves, Escape cancels
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) save()
    if (e.key === 'Escape') setEditing(false)
  }

  if (editing) {
    return (
      <li className="rounded-lg border border-fg/30 bg-card p-4 shadow-sm ring-2 ring-fg/5 motion-safe:animate-fade-in sm:p-5">
        <form onSubmit={handleSubmit} onKeyDown={handleKeyDown} className="space-y-3" aria-label="Edit entry">
          <label className="sr-only" htmlFor={`edit-title-${entry.id}`}>
            Title
          </label>
          <input
            id={`edit-title-${entry.id}`}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title (optional)"
            maxLength={120}
            className={`${inputClass} font-medium`}
          />
          <label className="sr-only" htmlFor={`edit-body-${entry.id}`}>
            Entry
          </label>
          <textarea
            id={`edit-body-${entry.id}`}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={Math.min(10, Math.max(4, body.split('\n').length + 1))}
            autoFocus
            onFocus={(e) => e.currentTarget.setSelectionRange(e.currentTarget.value.length, e.currentTarget.value.length)}
            className={`${inputClass} resize-y text-sm leading-relaxed`}
          />
          <div className="flex items-center justify-between gap-3">
            <span className="hidden text-xs text-subtle sm:inline">Ctrl + Enter to save · Esc to cancel</span>
            <div className="ml-auto flex gap-2">
              <button
                type="button"
                onClick={() => setEditing(false)}
                className="rounded-md border border-line px-3 py-1.5 text-sm text-fg transition-colors hover:bg-chip"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!canSave}
                className="rounded-md bg-inverse px-3 py-1.5 text-sm font-medium text-inverse-fg transition-colors hover:bg-inverse-hover disabled:cursor-not-allowed disabled:opacity-40"
              >
                Save changes
              </button>
            </div>
          </div>
        </form>
      </li>
    )
  }

  return (
    <li
      style={entered ? undefined : style}
      onAnimationEnd={() => setEntered(true)}
      className={`group rounded-lg border border-line bg-card p-4 sm:p-5 ${entered ? '' : 'motion-safe:animate-slide-in-left'}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          {entry.title && <h3 className="font-medium break-words text-fg">{entry.title}</h3>}
          <p className="text-xs text-subtle">
            <time dateTime={entry.createdAt}>{formatTime(entry.createdAt)}</time>
            {entry.updatedAt && (
              <span title={`Edited ${formatDay(entry.updatedAt)} at ${formatTime(entry.updatedAt)}`}> · edited</span>
            )}
          </p>
        </div>
        <div className="flex shrink-0 gap-0.5">
          <button type="button" onClick={startEditing} aria-label={`Edit entry${entry.title ? ` "${entry.title}"` : ''}`} className={iconButton}>
            <PencilIcon />
          </button>
          <button
            type="button"
            onClick={() => onRequestDelete(entry)}
            aria-label={`Delete entry${entry.title ? ` "${entry.title}"` : ''}`}
            className={`${iconButton} hover:text-red-600 dark:hover:text-red-400`}
          >
            <TrashIcon />
          </button>
        </div>
      </div>
      <p className="mt-2 text-sm leading-relaxed break-words whitespace-pre-wrap text-body">{entry.body}</p>
    </li>
  )
}

export default JournalEntryCard
