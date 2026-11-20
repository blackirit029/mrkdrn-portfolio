import type { ReactNode } from 'react'
import AnimatedSubtitle from '../components/ui/AnimatedSubtitle'
import PageHeader from '../components/ui/PageHeader'
import Reveal from '../components/ui/Reveal'
import Section from '../components/ui/Section'
import SkillChip from '../components/ui/SkillChip'
import SkillList from '../components/ui/SkillList'
import { education, experience, summary } from '../data/resume'
import { practices, techStack, tools } from '../data/skills'
import { useInView } from '../hooks/useInView'
import type { Experience } from '../types'

function ResumeSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="mb-16 last:mb-0">
      <AnimatedSubtitle className="mb-6">{title}</AnimatedSubtitle>
      {children}
    </div>
  )
}

/** One job on the timeline: the dot pops, the text rises, then the tech chips stagger in */
function Job({ job }: { job: Experience }) {
  const [ref, inView] = useInView<HTMLLIElement>(0.15)

  return (
    <li ref={ref} className="relative">
      <span
        aria-hidden
        className={`absolute top-1.5 -left-[31px] h-3 w-3 rounded-full border-2 border-page bg-fg/70 ring-4 ring-chip ${
          inView ? 'motion-safe:animate-pop-in' : 'motion-safe:scale-0'
        }`}
      />
      <div className={inView ? 'motion-safe:animate-fade-up' : 'motion-safe:opacity-0'} style={inView ? { animationDelay: '100ms' } : undefined}>
        <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-baseline">
          <h4 className="font-medium text-fg">
            {job.role} <span className="font-normal text-muted">· {job.company}</span>
          </h4>
          <span className="shrink-0 text-sm text-subtle tabular-nums">{job.period}</span>
        </div>
        <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-body marker:text-subtle">
          {job.highlights.map((highlight) => (
            <li key={highlight}>{highlight}</li>
          ))}
        </ul>
      </div>
      {job.tech && (
        <div className="mt-4 flex flex-wrap gap-2">
          {job.tech.map((t, i) => (
            <SkillChip
              key={t}
              label={t}
              size="sm"
              className={inView ? 'motion-safe:animate-pop-in' : 'motion-safe:opacity-0'}
              style={inView ? { animationDelay: `${350 + i * 60}ms` } : undefined}
            />
          ))}
        </div>
      )}
    </li>
  )
}

/** Tech stack and tools with logos; chips stagger in once the block is on screen */
function Skills() {
  const [ref, inView] = useInView<HTMLDivElement>(0.15)

  return (
    <div ref={ref} className="grid gap-10 sm:grid-cols-2">
      <SkillList title="Tech stack" items={techStack} featured enterDelay={0} play={inView} />
      <SkillList title="Tools" items={tools} featured enterDelay={200} play={inView} />
      <div className="sm:col-span-2">
        <Reveal delay={500}>
          <SkillList title="Ways of working" items={practices} />
        </Reveal>
      </div>
    </div>
  )
}

function Resume() {
  return (
    <Section id="resume" selfAnimated className="border-t border-line-soft py-16 sm:py-24">
      <Reveal animation="slide-in-left">
        <PageHeader title="Resume" subtitle="Experience, skills and education." />
      </Reveal>

      <ResumeSection title="Professional summary">
        <Reveal delay={150}>
          <p className="max-w-3xl leading-relaxed text-body">{summary}</p>
        </Reveal>
      </ResumeSection>

      <ResumeSection title="Professional experience">
        <ol className="space-y-12 border-l border-line pl-6">
          {experience.map((job) => (
            <Job key={`${job.company}-${job.period}`} job={job} />
          ))}
        </ol>
      </ResumeSection>

      <ResumeSection title="Skills & tools">
        <Skills />
      </ResumeSection>

      <ResumeSection title="Education">
        <ul className="space-y-5">
          {education.map((edu, i) => (
            <Reveal
              as="li"
              key={edu.credential}
              delay={150 + i * 120}
              className="flex flex-col justify-between gap-1 sm:flex-row sm:items-baseline"
            >
              <div>
                <h4 className="font-medium text-fg">{edu.credential}</h4>
                <p className="text-sm text-muted">{edu.school}</p>
              </div>
              <span className="shrink-0 text-sm text-subtle">{edu.year}</span>
            </Reveal>
          ))}
        </ul>
      </ResumeSection>
    </Section>
  )
}

export default Resume
