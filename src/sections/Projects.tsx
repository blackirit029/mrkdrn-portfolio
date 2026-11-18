import { useMemo, useState } from 'react'
import PageHeader from '../components/ui/PageHeader'
import ProjectCard from '../components/ui/ProjectCard'
import Section from '../components/ui/Section'
import Tag from '../components/ui/Tag'
import { projects } from '../data/projects'

const ALL = 'All'
const tags = [ALL, ...new Set(projects.flatMap((p) => p.tags))]

function Projects() {
  const [activeTag, setActiveTag] = useState(ALL)

  const visible = useMemo(
    () => (activeTag === ALL ? projects : projects.filter((p) => p.tags.includes(activeTag))),
    [activeTag],
  )

  return (
    <Section id="projects" className="border-t border-line-soft bg-surface py-16 sm:py-24">
      <PageHeader title="My Mini Projects" subtitle="Small apps I'm building to explore ideas and sharpen my skills." />

      <div className="mb-8 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Tag key={tag} label={tag} active={tag === activeTag} onClick={() => setActiveTag(tag)} />
        ))}
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {visible.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </Section>
  )
}

export default Projects
