import { useState } from 'react'
import { useHashTab } from '../../hooks/useHashTab'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import BudgetsView from './components/BudgetsView'
import DashboardView from './components/DashboardView'
import Header from './components/Header'
import TransactionsView from './components/TransactionsView'
import { createSampleTransactions, defaultBudgets } from './data'
import { TABS, type Budgets, type Month, type Transaction } from './types'
import { currentMonth, monthOf } from './utils'

function App() {
  const [tab, selectTab] = useHashTab(TABS, 'dashboard')
  const [month, setMonth] = useState<Month>(currentMonth)
  const [transactions, setTransactions] = useLocalStorage<Transaction[]>('spendhere:transactions', createSampleTransactions)
  const [budgets, setBudgets] = useLocalStorage<Budgets>('spendhere:budgets', defaultBudgets)
  const [confirmReset, setConfirmReset] = useState(false)

  const addTransaction = (transaction: Transaction) => {
    setTransactions((prev) => [transaction, ...prev])
    setMonth(monthOf(transaction.date)) // show the month the new expense landed in
  }

  const resetData = () => {
    if (!confirmReset) {
      setConfirmReset(true)
      return
    }
    setTransactions(createSampleTransactions())
    setBudgets(defaultBudgets)
    setMonth(currentMonth())
    setConfirmReset(false)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header tab={tab} onSelectTab={selectTab} />

      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-6 sm:py-10">
        {/* Keyed by tab so the fade-in replays on every switch */}
        <div key={tab} role="tabpanel" aria-label={tab} className="motion-safe:animate-fade-in">
          {tab === 'dashboard' && (
            <DashboardView
              month={month}
              onMonthChange={setMonth}
              transactions={transactions}
              budgets={budgets}
              onViewAll={() => selectTab('transactions')}
            />
          )}
          {tab === 'transactions' && (
            <TransactionsView
              month={month}
              onMonthChange={setMonth}
              transactions={transactions}
              onAdd={addTransaction}
              onDelete={(id) => setTransactions((prev) => prev.filter((t) => t.id !== id))}
            />
          )}
          {tab === 'budgets' && (
            <BudgetsView
              month={month}
              onMonthChange={setMonth}
              transactions={transactions}
              budgets={budgets}
              onBudgetChange={(id, limit) => setBudgets((prev) => ({ ...prev, [id]: limit }))}
              onReset={() => setBudgets(defaultBudgets)}
            />
          )}
        </div>
      </main>

      <footer className="mx-auto flex w-full max-w-5xl flex-col items-center justify-between gap-2 px-4 py-6 text-xs text-subtle sm:flex-row sm:px-6">
        <p>Starts with sample data. Everything is saved in this browser only.</p>
        <button
          type="button"
          onClick={resetData}
          onBlur={() => setConfirmReset(false)}
          className={`underline-offset-4 hover:underline ${confirmReset ? 'font-medium text-bad-text' : 'hover:text-fg'}`}
        >
          {confirmReset ? 'Click again to reset all data' : 'Reset to sample data'}
        </button>
      </footer>
    </div>
  )
}

export default App
