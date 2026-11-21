import { useState, type CSSProperties, type FormEvent, type KeyboardEvent } from 'react'
import type { Todo } from '../types'
import { CheckIcon, PencilIcon, TrashIcon, XIcon } from './Icons'

interface TodoItemProps {
  todo: Todo
  onToggle: (id: string) => void
  onUpdate: (id: string, text: string) => void
  onRequestDelete: (todo: Todo) => void
  style?: CSSProperties
}

const iconButton =
  'shrink-0 rounded-md p-1.5 text-subtle transition hover:bg-chip hover:text-fg sm:opacity-0 sm:group-hover:opacity-100 sm:focus-visible:opacity-100'

/**
 * One task: tick it off, edit it in place (pencil or double-click; Enter saves, Escape cancels),
 * or delete it after confirmation.
 */
function TodoItem({ todo, onToggle, onUpdate, onRequestDelete, style }: TodoItemProps) {
  const [editing, setEditing] = useState(false)
  // The entrance plays once; without this it would replay after every edit
  const [entered, setEntered] = useState(false)
  const [text, setText] = useState(todo.text)

  const startEditing = () => {
    setText(todo.text)
    setEditing(true)
  }

  const save = () => {
    const value = text.trim()
    // An empty edit is treated as cancel rather than a silent delete
    if (value && value !== todo.text) onUpdate(todo.id, value)
    setEditing(false)
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    save()
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') setEditing(false)
  }

  if (editing) {
    return (
      <li className="bg-chip/40 px-4 py-2.5">
        <form onSubmit={handleSubmit} className="flex items-center gap-2" aria-label="Edit task">
          <label className="sr-only" htmlFor={`edit-todo-${todo.id}`}>
            Task
          </label>
          <input
            id={`edit-todo-${todo.id}`}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            maxLength={200}
            autoFocus
            onFocus={(e) => e.currentTarget.select()}
            className="min-w-0 flex-1 rounded-md border border-fg/30 bg-page px-2.5 py-1.5 text-sm text-fg focus:ring-2 focus:ring-fg/10 focus:outline-none"
          />
          <button
            type="submit"
            disabled={!text.trim()}
            aria-label="Save task"
            title="Save (Enter)"
            className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-inverse text-inverse-fg transition-colors hover:bg-inverse-hover disabled:opacity-40"
          >
            <CheckIcon className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={() => setEditing(false)}
            aria-label="Cancel editing"
            title="Cancel (Esc)"
            className="grid h-8 w-8 shrink-0 place-items-center rounded-md border border-line text-muted transition-colors hover:bg-chip hover:text-fg"
          >
            <XIcon className="h-3.5 w-3.5" />
          </button>
        </form>
      </li>
    )
  }

  return (
    <li
      style={entered ? undefined : style}
      onAnimationEnd={() => setEntered(true)}
      className={`group flex items-center gap-3 px-4 py-3 ${entered ? '' : 'motion-safe:animate-slide-in-left'}`}
    >
      <button
        type="button"
        role="checkbox"
        aria-checked={todo.done}
        aria-label={`Mark "${todo.text}" as ${todo.done ? 'not done' : 'done'}`}
        onClick={() => onToggle(todo.id)}
        className={`grid h-5 w-5 shrink-0 place-items-center rounded-full border transition-colors ${
          todo.done ? 'border-inverse bg-inverse text-inverse-fg' : 'border-subtle hover:border-fg'
        }`}
      >
        {todo.done && <CheckIcon className="h-3 w-3" />}
      </button>
      <span
        onDoubleClick={startEditing}
        title="Double-click to edit"
        className={`min-w-0 flex-1 cursor-text text-sm break-words transition-colors ${todo.done ? 'text-subtle line-through' : 'text-fg'}`}
      >
        {todo.text}
      </span>
      {/* Outside the text so a completed task's strike-through doesn't cross it out */}
      {todo.updatedAt && <span className="shrink-0 text-xs text-subtle">edited</span>}
      <button type="button" onClick={startEditing} aria-label={`Edit "${todo.text}"`} className={iconButton}>
        <PencilIcon />
      </button>
      <button
        type="button"
        onClick={() => onRequestDelete(todo)}
        aria-label={`Delete "${todo.text}"`}
        className={`${iconButton} hover:text-red-600 dark:hover:text-red-400`}
      >
        <TrashIcon />
      </button>
    </li>
  )
}

export default TodoItem
