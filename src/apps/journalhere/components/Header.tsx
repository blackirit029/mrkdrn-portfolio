import ThemeToggle from '../../../components/ui/ThemeToggle'
import { useTheme } from '../../../hooks/useTheme'
import { TABS, type Tab } from '../types'
import { BookIcon } from './Icons'

interface HeaderProps {
  tab: Tab
  onSelectTab: (tab: Tab) => void
  counts: Record<Tab, number>
}

const labels: Record<Tab, string> = { journal: 'Journal', todo: 'Todo' }

function Header({ tab, onSelectTab, counts }: HeaderProps) {
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="sticky top-0 z-20 border-b border-line-soft bg-page/80 backdrop-blur">
      <div className="mx-auto grid max-w-3xl grid-cols-[1fr_auto] items-center gap-x-4 gap-y-3 px-5 py-3 sm:grid-cols-[1fr_auto_1fr] sm:px-6">
        <a href="#journal" className="flex items-center gap-2 font-semibold tracking-tight text-fg">
          <BookIcon />
          JournalHere
        </a>

        {/* Tab navigation: full width on its own row on phones, centered on larger screens */}
        <nav
          role="tablist"
          aria-label="Sections"
          className="col-span-2 row-start-2 grid grid-cols-2 rounded-lg bg-chip p-1 sm:col-span-1 sm:row-start-1 sm:col-start-2 sm:flex"
        >
          {TABS.map((t) => {
            const isActive = t === tab
            return (
              <button
                key={t}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => onSelectTab(t)}
                className={`flex items-center justify-center gap-2 rounded-md px-4 py-1.5 text-sm transition-colors sm:min-w-28 ${
                  isActive ? 'bg-card font-medium text-fg shadow-sm' : 'text-muted hover:text-fg'
                }`}
              >
                {labels[t]}
                {counts[t] > 0 && (
                  <span className={`rounded-full px-1.5 text-xs tabular-nums ${isActive ? 'bg-chip text-muted' : 'text-subtle'}`}>
                    {counts[t]}
                  </span>
                )}
              </button>
            )
          })}
        </nav>

        <div className="flex items-center justify-end gap-1 sm:col-start-3">
          <a
            href="/#projects"
            className="rounded-md px-2 py-1.5 text-sm text-muted transition-colors hover:bg-chip hover:text-fg"
          >
            <span aria-hidden>← </span>Portfolio
          </a>
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
        </div>
      </div>
    </header>
  )
}

export default Header
