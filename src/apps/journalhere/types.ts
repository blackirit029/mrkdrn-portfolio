export const TABS = ['journal', 'todo'] as const
export type Tab = (typeof TABS)[number]

export interface JournalEntry {
  id: string
  title: string
  body: string
  createdAt: string // ISO date
  updatedAt?: string // ISO date, set when edited
}

export interface Todo {
  id: string
  text: string
  done: boolean
  createdAt: string // ISO date
  updatedAt?: string // ISO date, set when edited
}

export type TodoFilter = 'all' | 'active' | 'done'
