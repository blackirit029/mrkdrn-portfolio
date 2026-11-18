export interface NavItem {
  label: string
  id: string
}

export type ProjectStatus = 'Planned' | 'In progress' | 'Completed'

export interface Project {
  id: string
  title: string
  status: ProjectStatus
  description: string
  features: string[]
  tags: string[]
  repoUrl?: string
  liveUrl?: string
}

export interface Experience {
  role: string
  company: string
  period: string
  highlights: string[]
  tech?: string[]
}

export interface Education {
  credential: string
  school: string
  year: string
}

export interface SkillGroup {
  category: string
  items: string[]
}
