import { useState } from 'react'
import { useHashTab } from '../../hooks/useHashTab'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import BudgetsView from './components/BudgetsView'
import DashboardView from './components/DashboardView'
import Header from './components/Header'
import TransactionsView from './components/TransactionsView'
import { budgetFor, createSamplePlans, createSampleTransactions, emptyBudget, loadInitialPlans } from './data'
import { TABS, type BudgetPlans, type Month, type MonthBudget, type Transaction } from './types'
import { currentMonth, monthOf, shiftMonth } from './utils'

function App() {
  const [tab, selectTab] = useHashTab(TABS, 'dashboard')
  const [month, setMonth] = useState<Month>(currentMonth)
  const [transactions, setTransactions] = useLocalStorage<Transaction[]>('spendhere:transactions', createSampleTransactions)
  // One budget per month; months without an entry start at 0
  const [plans, setPlans] = useLocalStorage<BudgetPlans>('spendhere:budgetPlans', loadInitialPlans)
  const [confirmReset, setConfirmReset] = useState(false)

  const budget = budgetFor(plans, month)
  const updateBudget = (change: (current: MonthBudget) => MonthBudget) =>
    setPlans((prev) => ({ ...prev, [month]: change(budgetFor(prev, month)) }))

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
    setPlans(createSamplePlans())
    setMonth(currentMonth())
    setConfirmReset(false)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header tab={tab} onSelectTab={selectTab} />

      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-6 sm:py-10">
        {/* Keyed by tab so each card's slide-in from the left replays on every switch */}
        <div key={tab} role="tabpanel" aria-label={tab}>
          {tab === 'dashboard' && (
            <DashboardView
              month={month}
              onMonthChange={setMonth}
              transactions={transactions}
              budget={budget}
              onViewAll={() => selectTab('transactions')}
              onSetBudget={() => selectTab('budgets')}
            />
          )}
          {tab === 'transactions' && (
            <TransactionsView
              month={month}
              onMonthChange={setMonth}
              transactions={transactions}
              onAdd={addTransaction}
              onUpdate={(id, changes) =>
                setTransactions((prev) => prev.map((t) => (t.id === id ? { ...t, ...changes, updatedAt: Date.now() } : t)))
              }
              onDelete={(id) => setTransactions((prev) => prev.filter((t) => t.id !== id))}
            />
          )}
          {tab === 'budgets' && (
            <BudgetsView
              month={month}
              onMonthChange={setMonth}
              transactions={transactions}
              budget={budget}
              previousBudget={budgetFor(plans, shiftMonth(month, -1))}
              onTotalChange={(total) => updateBudget((b) => ({ ...b, total }))}
              onCategoryChange={(id, limit) => updateBudget((b) => ({ ...b, categories: { ...b.categories, [id]: limit } }))}
              onCopyPrevious={() => {
                const previous = budgetFor(plans, shiftMonth(month, -1))
                updateBudget(() => ({ total: previous.total, categories: { ...previous.categories } }))
              }}
              onClear={() => updateBudget(emptyBudget)}
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
