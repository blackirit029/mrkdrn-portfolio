import type { Project, ProjectStatus } from '../../types'
import Tag from './Tag'

interface ProjectCardProps {
  project: Project
}

const statusStyles: Record<ProjectStatus, string> = {
  Planned: 'bg-chip text-muted',
  'In progress': 'bg-amber-50 text-amber-700 dark:bg-amber-400/10 dark:text-amber-300',
  Completed: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300',
}

const linkClass = 'relative z-10 text-fg underline-offset-4 hover:underline'

function ProjectCard({ project }: ProjectCardProps) {
  const { liveUrl, repoUrl } = project
  const isClickable = Boolean(liveUrl)

  return (
    <article
      className={`group relative flex flex-col rounded-lg border border-line bg-card p-5 transition sm:p-6 ${
        isClickable
          ? 'hover:-translate-y-0.5 hover:border-subtle hover:shadow-md focus-within:ring-2 focus-within:ring-fg/20 dark:hover:shadow-black/40'
          : ''
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-lg font-medium text-fg">
          {liveUrl ? (
            // The link's ::after covers the whole card, making the card clickable
            <a
              href={liveUrl}
              target="_blank"
              rel="noreferrer"
              className="outline-none after:absolute after:inset-0 after:rounded-lg after:content-['']"
            >
              {project.title}
            </a>
          ) : (
            project.title
          )}
        </h3>
        <span className={`shrink-0 rounded px-2 py-0.5 text-xs font-medium ${statusStyles[project.status]}`}>
          {project.status}
        </span>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-body">{project.description}</p>
      <ul className="mt-4 flex-1 list-disc space-y-1 pl-5 text-sm text-muted">
        {project.features.map((feature) => (
          <li key={feature}>{feature}</li>
        ))}
      </ul>
      <div className="mt-5 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <Tag key={tag} label={tag} />
        ))}
      </div>
      {(repoUrl || liveUrl) && (
        <div className="mt-4 flex gap-4 text-sm">
          {liveUrl && (
            <span className="font-medium text-fg" aria-hidden>
              Open app{' '}
              <span className="inline-block transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                ↗
              </span>
            </span>
          )}
          {repoUrl && (
            <a href={repoUrl} target="_blank" rel="noreferrer" className={linkClass}>
              Code →
            </a>
          )}
        </div>
      )}
    </article>
  )
}

export default ProjectCard
