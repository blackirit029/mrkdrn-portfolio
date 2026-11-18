import { useMemo, useState, type FormEvent } from 'react'
import type { Todo, TodoFilter } from '../types'
import { createId } from '../utils'
import EmptyState from './EmptyState'
import { CheckIcon, TrashIcon } from './Icons'

interface TodoViewProps {
  todos: Todo[]
  onAdd: (todo: Todo) => void
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  onClearDone: () => void
}

const filters: { id: TodoFilter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'active', label: 'Active' },
  { id: 'done', label: 'Done' },
]

const emptyMessages: Record<TodoFilter, { title: string; description: string }> = {
  all: { title: 'Nothing to do yet', description: 'Add a task above to get started.' },
  active: { title: 'All caught up', description: 'Every task is done. Nice work!' },
  done: { title: 'Nothing completed yet', description: 'Tasks you finish will show up here.' },
}

function TodoView({ todos, onAdd, onToggle, onDelete, onClearDone }: TodoViewProps) {
  const [text, setText] = useState('')
  const [filter, setFilter] = useState<TodoFilter>('all')

  const counts = useMemo(() => {
    const done = todos.filter((t) => t.done).length
    return { all: todos.length, active: todos.length - done, done }
  }, [todos])

  const visible = useMemo(() => {
    if (filter === 'active') return todos.filter((t) => !t.done)
    if (filter === 'done') return todos.filter((t) => t.done)
    return todos
  }, [todos, filter])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const value = text.trim()
    if (!value) return
    onAdd({ id: createId(), text: value, done: false, createdAt: new Date().toISOString() })
    setText('')
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-fg">Todo</h1>
        <p className="mt-1 text-sm text-muted">
          {counts.all === 0
            ? 'Plan what you want to get done.'
            : `${counts.active} of ${counts.all} ${counts.all === 1 ? 'task' : 'tasks'} left`}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <label className="sr-only" htmlFor="todo-text">
          New task
        </label>
        <input
          id="todo-text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a task…"
          maxLength={200}
          className="min-w-0 flex-1 rounded-md border border-line bg-card px-3 py-2 text-fg placeholder:text-subtle focus:border-subtle focus:ring-2 focus:ring-fg/10 focus:outline-none"
        />
        <button
          type="submit"
          disabled={!text.trim()}
          className="shrink-0 rounded-md bg-inverse px-4 py-2 text-sm font-medium text-inverse-fg transition-colors hover:bg-inverse-hover disabled:cursor-not-allowed disabled:opacity-40"
        >
          Add
        </button>
      </form>

      {counts.all > 0 && (
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div role="group" aria-label="Filter tasks" className="flex gap-1">
            {filters.map((f) => (
              <button
                key={f.id}
                type="button"
                aria-pressed={filter === f.id}
                onClick={() => setFilter(f.id)}
                className={`rounded-full px-3 py-1 text-xs transition-colors ${
                  filter === f.id ? 'bg-inverse text-inverse-fg' : 'bg-chip text-chip-fg hover:bg-chip-hover'
                }`}
              >
                {f.label} <span className="tabular-nums opacity-70">{counts[f.id]}</span>
              </button>
            ))}
          </div>
          {counts.done > 0 && (
            <button
              type="button"
              onClick={onClearDone}
              className="text-xs text-muted underline-offset-4 hover:text-fg hover:underline"
            >
              Clear completed
            </button>
          )}
        </div>
      )}

      {visible.length === 0 ? (
        <EmptyState {...emptyMessages[filter]} />
      ) : (
        <ul className="divide-y divide-line-soft overflow-hidden rounded-lg border border-line bg-card">
          {visible.map((todo) => (
            <li key={todo.id} className="group flex items-center gap-3 px-4 py-3 motion-safe:animate-fade-in">
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
                className={`min-w-0 flex-1 text-sm break-words transition-colors ${
                  todo.done ? 'text-subtle line-through' : 'text-fg'
                }`}
              >
                {todo.text}
              </span>
              <button
                type="button"
                onClick={() => onDelete(todo.id)}
                aria-label={`Delete "${todo.text}"`}
                className="shrink-0 rounded-md p-1.5 text-subtle transition hover:bg-chip hover:text-fg sm:opacity-0 sm:group-hover:opacity-100 sm:focus:opacity-100"
              >
                <TrashIcon />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default TodoView
