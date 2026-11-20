import { withBase } from '../lib/withBase'
import journalDark from '../assets/projects/journalhere-dark.jpg'
import journalLight from '../assets/projects/journalhere-light.jpg'
import shopDark from '../assets/projects/shophere-dark.jpg'
import shopLight from '../assets/projects/shophere-light.jpg'
import spendDark from '../assets/projects/spendhere-dark.jpg'
import spendLight from '../assets/projects/spendhere-light.jpg'
import type { Project } from '../types'

export const projects: Project[] = [
  {
    id: 'journalhere',
    title: 'JournalHere',
    status: 'In progress',
    description: 'A personal journal combined with a to-do list, so daily notes and tasks live in one place.',
    features: ['Write and browse journal entries', 'To-do list with filters', 'Saved in your browser'],
    tags: ['Productivity'],
    liveUrl: withBase('journalhere/'),
    screenshot: { light: journalLight, dark: journalDark },
  },
  {
    id: 'shophere',
    title: 'ShopHere',
    status: 'In progress',
    description: 'An online marketplace inspired by sites like Shopee and Lazada.',
    features: ['Search and category browsing', 'Top products and product list', 'Add to cart'],
    tags: ['E-commerce'],
    liveUrl: withBase('shophere/'),
    screenshot: { light: shopLight, dark: shopDark },
  },
  {
    id: 'spendhere',
    title: 'SpendHere',
    status: 'In progress',
    description: 'An expense tracker with a dashboard that summarizes where your money goes.',
    features: ['Spending dashboard with charts', 'Log and filter transactions', 'Monthly budgets per category'],
    tags: ['Finance', 'Dashboard'],
    liveUrl: withBase('spendhere/'),
    screenshot: { light: spendLight, dark: spendDark },
  },
]
