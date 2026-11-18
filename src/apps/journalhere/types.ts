export const TABS = ['journal', 'todo'] as const
export type Tab = (typeof TABS)[number]

export interface JournalEntry {
  id: string
  title: string
  body: string
  createdAt: string // ISO date
}

export interface Todo {
  id: string
  text: string
  done: boolean
  createdAt: string // ISO date
}

export type TodoFilter = 'all' | 'active' | 'done'
