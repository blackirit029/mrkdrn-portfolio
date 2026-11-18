export const TABS = ['dashboard', 'transactions', 'budgets'] as const
export type Tab = (typeof TABS)[number]

export type CategoryId = 'food' | 'transport' | 'shopping' | 'bills' | 'entertainment' | 'health' | 'education' | 'other'

export interface Category {
  id: CategoryId
  name: string
  /** CSS color for this category (a fixed categorical slot) */
  color: string
}

export interface Transaction {
  id: string
  amount: number
  categoryId: CategoryId
  note: string
  /** Local date, YYYY-MM-DD */
  date: string
  createdAt: number
}

export type Budgets = Record<CategoryId, number>

/** Month key, YYYY-MM */
export type Month = string
