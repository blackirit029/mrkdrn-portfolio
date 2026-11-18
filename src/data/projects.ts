import type { Project } from '../types'

export const projects: Project[] = [
  {
    id: 'journalhere',
    title: 'JournalHere',
    status: 'In progress',
    description: 'A personal journal combined with a to-do list, so daily notes and tasks live in one place.',
    features: ['Write and browse journal entries', 'To-do list with filters', 'Saved in your browser'],
    tags: ['Productivity'],
    liveUrl: '/journalhere/',
  },
  {
    id: 'shophere',
    title: 'ShopHere',
    status: 'In progress',
    description: 'An online marketplace inspired by sites like Shopee and Lazada.',
    features: ['Search and category browsing', 'Top products and product list', 'Add to cart'],
    tags: ['E-commerce'],
    liveUrl: '/shophere/',
  },
  {
    id: 'spendhere',
    title: 'SpendHere',
    status: 'In progress',
    description: 'An expense tracker with a dashboard that summarizes where your money goes.',
    features: ['Spending dashboard with charts', 'Log and filter transactions', 'Monthly budgets per category'],
    tags: ['Finance', 'Dashboard'],
    liveUrl: '/spendhere/',
  },
]
