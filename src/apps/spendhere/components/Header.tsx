import ThemeToggle from '../../../components/ui/ThemeToggle'
import { useTheme } from '../../../hooks/useTheme'
import { TABS, type Tab } from '../types'
import { WalletIcon } from './Icons'

interface HeaderProps {
  tab: Tab
  onSelectTab: (tab: Tab) => void
}

const labels: Record<Tab, string> = { dashboard: 'Dashboard', transactions: 'Transactions', budgets: 'Budgets' }

function Header({ tab, onSelectTab }: HeaderProps) {
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="sticky top-0 z-20 border-b border-line-soft bg-page/85 backdrop-blur">
      <div className="mx-auto grid max-w-5xl grid-cols-[1fr_auto] items-center gap-x-4 gap-y-3 px-4 py-3 sm:px-6 md:grid-cols-[1fr_auto_1fr]">
        <a href="#dashboard" className="flex items-center gap-2 font-semibold tracking-tight text-fg">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-accent text-accent-fg">
            <WalletIcon />
          </span>
          SpendHere
        </a>

        {/* Tabs: their own full-width row on phones, centered from md up */}
        <nav
          role="tablist"
          aria-label="Sections"
          className="col-span-2 row-start-2 grid grid-cols-3 rounded-lg bg-chip p-1 md:col-span-1 md:col-start-2 md:row-start-1 md:flex"
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
                className={`rounded-md px-3 py-1.5 text-sm transition-colors md:px-5 ${
                  isActive ? 'bg-card font-medium text-fg shadow-sm' : 'text-muted hover:text-fg'
                }`}
              >
                {labels[t]}
              </button>
            )
          })}
        </nav>

        <div className="flex items-center justify-end gap-1 md:col-start-3">
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
