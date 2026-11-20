import { useMemo, useState } from 'react'
import PageHeader from '../components/ui/PageHeader'
import ProjectCard from '../components/ui/ProjectCard'
import Section from '../components/ui/Section'
import Tag from '../components/ui/Tag'
import { projects } from '../data/projects'
import { useInView } from '../hooks/useInView'

const ALL = 'All'
const tags = [ALL, ...new Set(projects.flatMap((p) => p.tags))]

function Projects() {
  const [activeTag, setActiveTag] = useState(ALL)
  // The heading and filters slide in from the left when the section scrolls into view
  const [headerRef, headerInView] = useInView<HTMLDivElement>(0.15)

  const visible = useMemo(
    () => (activeTag === ALL ? projects : projects.filter((p) => p.tags.includes(activeTag))),
    [activeTag],
  )

  return (
    <Section id="projects" selfAnimated className="border-t border-line-soft bg-surface py-16 sm:py-24">
      <div ref={headerRef} className={headerInView ? 'motion-safe:animate-slide-in-left' : 'motion-safe:opacity-0'}>
        <PageHeader title="My Mini Projects" subtitle="Small apps I'm building to explore ideas and sharpen my skills." />

        <div className="mb-10 flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span
              key={tag}
              className={headerInView ? 'motion-safe:animate-slide-in-left' : ''}
              style={headerInView ? { animationDelay: `${150 + index * 60}ms` } : undefined}
            >
              <Tag label={tag} active={tag === activeTag} onClick={() => setActiveTag(tag)} />
            </span>
          ))}
        </div>
      </div>

      {/* One project per row; each enters from the left as it scrolls into view */}
      <div className="flex flex-col gap-8 sm:gap-12">
        {visible.map((project) => (
          <ProjectCard key={project.id} project={project} index={projects.indexOf(project)} />
        ))}
      </div>
    </Section>
  )
}

export default Projects
