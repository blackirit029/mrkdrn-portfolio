import type { NavItem } from '../types'

export const site = {
  name: 'Mark Adrian Grandia',
  role: 'Frontend Developer',
  tagline:
    'I build responsive web and mobile applications with React, React Native and TypeScript, turning UI designs into clean, reusable components.',
  location: 'Consolacion, Cebu, Philippines',
  email: 'markadrian.grandia@gmail.com',
  yearsOfExperience: '8+',
  // TODO: replace with your profile URLs
  socials: [
    { label: 'GitHub', url: 'https://github.com/' },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/' },
  ],
}

export const navItems: NavItem[] = [
  { label: 'Home', id: 'home' },
  { label: 'Projects', id: 'projects' },
  { label: 'Resume', id: 'resume' },
  { label: 'About', id: 'about' },
]

export const sectionIds = navItems.map((item) => item.id)
