import type { BudgetPlans, Budgets, Category, CategoryId, Month, MonthBudget, Transaction } from './types'
import { daysInMonth, shiftMonth, currentMonth, todayKey } from './utils'

// Fixed order = fixed color slot. Color follows the category everywhere in the app.
export const categories: Category[] = [
  { id: 'food', name: 'Food & Dining', color: 'var(--cat-1)' },
  { id: 'transport', name: 'Transport', color: 'var(--cat-2)' },
  { id: 'shopping', name: 'Shopping', color: 'var(--cat-3)' },
  { id: 'bills', name: 'Bills & Utilities', color: 'var(--cat-4)' },
  { id: 'entertainment', name: 'Entertainment', color: 'var(--cat-5)' },
  { id: 'health', name: 'Health', color: 'var(--cat-6)' },
  { id: 'education', name: 'Education', color: 'var(--cat-7)' },
  { id: 'other', name: 'Other', color: 'var(--cat-8)' },
]

export const categoryById = Object.fromEntries(categories.map((c) => [c.id, c])) as Record<CategoryId, Category>

/** Category limits used for the sample months */
export const sampleCategoryLimits: Budgets = {
  food: 9000,
  transport: 3000,
  shopping: 4000,
  bills: 13500,
  entertainment: 2000,
  health: 1500,
  education: 1500,
  other: 1500,
}

const sumLimits = (limits: Budgets) => Object.values(limits).reduce((s, v) => s + v, 0)

export const zeroLimits = Object.fromEntries(categories.map((c) => [c.id, 0])) as Budgets

/** Every month starts with nothing budgeted */
export const emptyBudget = (): MonthBudget => ({ total: 0, categories: { ...zeroLimits } })

export const budgetFor = (plans: BudgetPlans, month: Month): MonthBudget => plans[month] ?? emptyBudget()

export const allocatedOf = (budget: MonthBudget) => sumLimits(budget.categories)

/** Sample budgets for the two sample months (last month and this month); later months start at 0 */
export function createSamplePlans(): BudgetPlans {
  const thisMonth = currentMonth()
  const plan = (): MonthBudget => ({ total: sumLimits(sampleCategoryLimits), categories: { ...sampleCategoryLimits } })
  return { [shiftMonth(thisMonth, -1)]: plan(), [thisMonth]: plan() }
}

/**
 * First load: build plans from the old single, every-month budget if one was saved
 * (applied to the sample months), otherwise use the sample plans.
 */
export function loadInitialPlans(): BudgetPlans {
  try {
    const raw = localStorage.getItem('spendhere:budgets')
    if (raw) {
      const legacy = { ...zeroLimits, ...(JSON.parse(raw) as Partial<Budgets>) }
      const thisMonth = currentMonth()
      const plan = (): MonthBudget => ({ total: sumLimits(legacy), categories: { ...legacy } })
      return { [shiftMonth(thisMonth, -1)]: plan(), [thisMonth]: plan() }
    }
  } catch {
    // ignore unreadable legacy data
  }
  return createSamplePlans()
}

// ---- Sample data: last month and this month so far, so the dashboard has something to show ----

/** Small deterministic PRNG so the sample data is the same on every first visit */
function random(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const daily: { categoryId: CategoryId; chance: number; min: number; max: number; notes: string[] }[] = [
  { categoryId: 'food', chance: 0.95, min: 60, max: 380, notes: ['Lunch', 'Groceries', 'Coffee', 'Breakfast', 'Snacks'] },
  { categoryId: 'food', chance: 0.35, min: 150, max: 650, notes: ['Dinner with friends', 'Food delivery', 'Groceries'] },
  { categoryId: 'transport', chance: 0.7, min: 15, max: 320, notes: ['Jeepney fare', 'Grab ride', 'Gas', 'Bus fare', 'Parking'] },
  { categoryId: 'shopping', chance: 0.1, min: 250, max: 1600, notes: ['New shirt', 'Household items', 'Online order'] },
  { categoryId: 'entertainment', chance: 0.09, min: 150, max: 700, notes: ['Movie tickets', 'Concert', 'Games'] },
  { categoryId: 'health', chance: 0.05, min: 150, max: 900, notes: ['Pharmacy', 'Vitamins', 'Check-up'] },
  { categoryId: 'education', chance: 0.04, min: 300, max: 1200, notes: ['Online course', 'Books'] },
  { categoryId: 'other', chance: 0.05, min: 100, max: 700, notes: ['Gift', 'Haircut', 'Donation'] },
]

const monthlyBills: { day: number; amount: number; note: string; categoryId: CategoryId }[] = [
  { day: 3, amount: 8000, note: 'Rent', categoryId: 'bills' },
  { day: 5, amount: 2350, note: 'Electricity bill', categoryId: 'bills' },
  { day: 10, amount: 1699, note: 'Internet', categoryId: 'bills' },
  { day: 12, amount: 549, note: 'Streaming subscription', categoryId: 'entertainment' },
  { day: 15, amount: 599, note: 'Mobile plan', categoryId: 'bills' },
  { day: 20, amount: 420, note: 'Water bill', categoryId: 'bills' },
]

export function createSampleTransactions(): Transaction[] {
  const rand = random(2026)
  const pick = <T,>(list: T[]) => list[Math.floor(rand() * list.length)]
  const thisMonth = currentMonth()
  const today = todayKey()
  const result: Transaction[] = []
  let createdAt = 1

  for (const month of [shiftMonth(thisMonth, -1), thisMonth]) {
    for (let day = 1; day <= daysInMonth(month); day++) {
      const date = `${month}-${String(day).padStart(2, '0')}`
      if (date > today) break

      for (const bill of monthlyBills.filter((b) => b.day === day)) {
        result.push({ id: `s${createdAt}`, amount: bill.amount, categoryId: bill.categoryId, note: bill.note, date, createdAt: createdAt++ })
      }
      for (const rule of daily) {
        if (rand() > rule.chance) continue
        const amount = Math.round((rule.min + rand() * (rule.max - rule.min)) / 5) * 5
        result.push({ id: `s${createdAt}`, amount, categoryId: rule.categoryId, note: pick(rule.notes), date, createdAt: createdAt++ })
      }
    }
  }
  return result
}
