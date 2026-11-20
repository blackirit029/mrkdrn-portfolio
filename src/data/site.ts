import type { NavItem } from '../types'

export const site = {
  name: 'Mark Adrian Grandia',
  role: 'Frontend Developer',
  tagline:
    'I build responsive web and mobile applications with React, React Native and TypeScript, turning UI designs into clean, reusable components.',
  location: 'Consolacion, Cebu, Philippines',
  email: 'markadrian.grandia@gmail.com',
  yearsOfExperience: '8+',
  // Footer links (open in a new tab)
  socials: [
    { label: 'GitHub', url: 'https://github.com/blackirit029' },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/mark-adrian-grandia-82546b207/' },
  ],
}

export const navItems: NavItem[] = [
  { label: 'Home', id: 'home' },
  { label: 'Projects', id: 'projects' },
  { label: 'Resume', id: 'resume' },
  { label: 'About', id: 'about' },
]

export const sectionIds = navItems.map((item) => item.id)
