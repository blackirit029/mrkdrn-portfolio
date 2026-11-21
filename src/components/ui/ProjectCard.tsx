import type { CSSProperties } from 'react'
import { useInView } from '../../hooks/useInView'
import type { Project, ProjectStatus } from '../../types'
import Tag from './Tag'

interface ProjectCardProps {
  project: Project
  index: number
}

const statusStyles: Record<ProjectStatus, string> = {
  Planned: 'bg-chip text-muted',
  'In progress': 'bg-amber-50 text-amber-700 dark:bg-amber-400/10 dark:text-amber-300',
  Completed: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300',
}

// Sits above the whole-card link (z-20) so it stays separately clickable
const linkClass = 'relative z-30 text-fg underline-offset-4 hover:underline'

/**
 * One project per row: a framed screenshot on the left, details on the right.
 * Enters from the left when scrolled into view: the card slides in, the screenshot
 * wipes open, then the details rise in one after another.
 */
function ProjectCard({ project, index }: ProjectCardProps) {
  const { liveUrl, repoUrl, screenshot } = project
  // Wait until the card is a quarter of the way up the screen, so each scroll brings in one project
  const [ref, inView] = useInView<HTMLElement>(0.25)

  /** Staggered entrance for a child, started once the card is in view */
  const enter = (animation: string, delay: number): { className: string; style?: CSSProperties } =>
    inView ? { className: animation, style: { animationDelay: `${delay}ms` } } : { className: '' }

  const shot = enter('motion-safe:animate-reveal-right', 250)
  const step = (n: number) => enter('motion-safe:animate-fade-up', 450 + n * 90)
  const number = String(index + 1).padStart(2, '0')

  return (
    <article
      ref={ref}
      className={`group relative grid overflow-hidden rounded-2xl border border-line bg-card shadow-sm transition-[box-shadow,border-color] duration-300 md:grid-cols-[1.15fr_1fr] ${
        liveUrl
          ? 'cursor-pointer hover:border-subtle hover:shadow-xl has-[a:focus-visible]:ring-2 has-[a:focus-visible]:ring-fg/30 dark:hover:shadow-black/50'
          : ''
      } ${inView ? 'motion-safe:animate-slide-in-left' : 'motion-safe:opacity-0'}`}
    >
      {/* Whole-card link: a direct child of the card so it always covers all of it, layered above the content */}
      {liveUrl && (
        <a
          href={liveUrl}
          target="_blank"
          rel="noreferrer"
          aria-label={`Open ${project.title} in a new tab`}
          className="absolute inset-0 z-20 rounded-2xl outline-none"
        />
      )}

      {/* Screenshot in a browser frame */}
      <div className="relative border-b border-line-soft bg-surface p-4 sm:p-6 md:border-r md:border-b-0 lg:p-8">
        {/* Hover: the screenshot lifts, tilts slightly and grows... */}
        <div className="transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-2 group-hover:-rotate-[1.5deg] group-hover:scale-[1.05] motion-reduce:transition-none motion-reduce:group-hover:transform-none">
          {/* ...then keeps floating gently while hovered */}
          <div className="motion-safe:group-hover:animate-float">
            <div
              style={shot.style}
              className={`overflow-hidden rounded-lg border border-line bg-card shadow-lg transition-shadow duration-700 group-hover:shadow-2xl dark:shadow-black/40 ${shot.className}`}
            >
              <div className="flex items-center gap-1.5 border-b border-line-soft bg-chip/60 px-3 py-2" aria-hidden>
                <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
                <span className="ml-2 truncate rounded bg-card px-2 py-0.5 text-[10px] text-subtle">
                  {project.title.toLowerCase()}.app
                </span>
              </div>
              <div className="aspect-[16/10] overflow-hidden bg-chip">
                {screenshot ? (
                  <>
                    <img
                      src={screenshot.light}
                      alt={`Screenshot of ${project.title}`}
                      loading="lazy"
                      width={1280}
                      height={800}
                      className="h-full w-full object-cover object-top dark:hidden"
                    />
                    <img
                      src={screenshot.dark}
                      alt={`Screenshot of ${project.title}`}
                      loading="lazy"
                      width={1280}
                      height={800}
                      className="hidden h-full w-full object-cover object-top dark:block"
                    />
                  </>
                ) : (
                  <div className="grid h-full place-items-center text-sm text-subtle">Preview coming soon</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="flex flex-col p-5 sm:p-8">
        <div style={step(0).style} className={`flex items-center justify-between gap-4 ${step(0).className}`}>
          <span className="font-mono text-xs tracking-widest text-subtle">{number}</span>
          <span className={`shrink-0 rounded px-2 py-0.5 text-xs font-medium ${statusStyles[project.status]}`}>
            {project.status}
          </span>
        </div>

        <h3 style={step(1).style} className={`mt-3 text-2xl font-semibold tracking-tight text-fg ${step(1).className}`}>
          {project.title}
        </h3>

        <p style={step(2).style} className={`mt-2 text-sm leading-relaxed text-body ${step(2).className}`}>
          {project.description}
        </p>

        <ul style={step(3).style} className={`mt-4 flex-1 space-y-1.5 text-sm text-muted ${step(3).className}`}>
          {project.features.map((feature) => (
            <li key={feature} className="flex gap-2">
              <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-subtle" />
              {feature}
            </li>
          ))}
        </ul>

        <div style={step(4).style} className={`mt-5 flex flex-wrap gap-2 ${step(4).className}`}>
          {project.tags.map((tag) => (
            <Tag key={tag} label={tag} />
          ))}
        </div>

        {(repoUrl || liveUrl) && (
          <div style={step(5).style} className={`mt-6 flex items-center gap-4 text-sm ${step(5).className}`}>
            {liveUrl && (
              <span
                aria-hidden
                className="inline-flex items-center gap-1.5 rounded-full bg-inverse px-4 py-2 font-medium text-inverse-fg transition-colors group-hover:bg-inverse-hover"
              >
                Open app
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
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
      </div>
    </article>
  )
}

export default ProjectCard
