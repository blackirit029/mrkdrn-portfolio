import Header from './components/Header'
import JournalView from './components/JournalView'
import TodoView from './components/TodoView'
import { useHashTab } from '../../hooks/useHashTab'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { TABS, type JournalEntry, type Todo } from './types'

function App() {
  const [tab, selectTab] = useHashTab(TABS, 'journal')
  const [entries, setEntries] = useLocalStorage<JournalEntry[]>('journalhere:entries', [])
  const [todos, setTodos] = useLocalStorage<Todo[]>('journalhere:todos', [])

  const counts = {
    journal: entries.length,
    todo: todos.filter((t) => !t.done).length,
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header tab={tab} onSelectTab={selectTab} counts={counts} />

      <main className="mx-auto w-full max-w-2xl flex-1 px-5 py-10 sm:px-6 sm:py-14">
        {/* Keyed by tab so the slide-in from the left replays on load and on every switch */}
        <div key={tab} role="tabpanel" aria-label={tab} className="motion-safe:animate-slide-in-left">
          {tab === 'journal' ? (
            <JournalView
              entries={entries}
              onAdd={(entry) => setEntries((prev) => [entry, ...prev])}
              onUpdate={(id, changes) =>
                setEntries((prev) =>
                  prev.map((e) => (e.id === id ? { ...e, ...changes, updatedAt: new Date().toISOString() } : e)),
                )
              }
              onDelete={(id) => setEntries((prev) => prev.filter((e) => e.id !== id))}
            />
          ) : (
            <TodoView
              todos={todos}
              onAdd={(todo) => setTodos((prev) => [todo, ...prev])}
              onToggle={(id) => setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)))}
              onUpdate={(id, text) =>
                setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, text, updatedAt: new Date().toISOString() } : t)))
              }
              onDelete={(id) => setTodos((prev) => prev.filter((t) => t.id !== id))}
              onClearDone={() => setTodos((prev) => prev.filter((t) => !t.done))}
            />
          )}
        </div>
      </main>

      <footer className="px-5 py-8 text-center text-xs text-subtle">
        Your entries and tasks are saved in this browser only.
      </footer>
    </div>
  )
}

export default App
