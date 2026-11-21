import { useMemo, useState, type FormEvent } from 'react'
import type { Todo, TodoFilter } from '../types'
import { createId } from '../utils'
import ConfirmDialog from '../../../components/ui/ConfirmDialog'
import EmptyState from './EmptyState'
import TodoItem from './TodoItem'

interface TodoViewProps {
  todos: Todo[]
  onAdd: (todo: Todo) => void
  onToggle: (id: string) => void
  onUpdate: (id: string, text: string) => void
  onDelete: (id: string) => void
  onClearDone: () => void
}

/** What the confirmation dialog is asking about: one task, or every completed task */
type PendingDelete = { kind: 'one'; todo: Todo } | { kind: 'completed' } | null

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

function TodoView({ todos, onAdd, onToggle, onUpdate, onDelete, onClearDone }: TodoViewProps) {
  const [text, setText] = useState('')
  const [filter, setFilter] = useState<TodoFilter>('all')
  const [pending, setPending] = useState<PendingDelete>(null)

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
              onClick={() => setPending({ kind: 'completed' })}
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
          {visible.map((todo, i) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={onToggle}
              onUpdate={onUpdate}
              onRequestDelete={(t) => setPending({ kind: 'one', todo: t })}
              // Tasks slide in from the left one after another
              style={{ animationDelay: `${Math.min(150 + i * 60, 700)}ms` }}
            />
          ))}
        </ul>
      )}

      <ConfirmDialog
        open={pending !== null}
        title={pending?.kind === 'completed' ? 'Clear completed tasks?' : 'Delete this task?'}
        description={
          pending?.kind === 'completed'
            ? `${counts.done} completed ${counts.done === 1 ? 'task' : 'tasks'} will be permanently deleted. This can't be undone.`
            : pending?.kind === 'one'
              ? `"${pending.todo.text}" will be permanently deleted. This can't be undone.`
              : ''
        }
        confirmLabel={pending?.kind === 'completed' ? 'Clear completed' : 'Delete task'}
        onCancel={() => setPending(null)}
        onConfirm={() => {
          if (pending?.kind === 'completed') onClearDone()
          else if (pending?.kind === 'one') onDelete(pending.todo.id)
          setPending(null)
        }}
      />
    </div>
  )
}

export default TodoView
