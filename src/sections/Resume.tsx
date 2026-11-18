import type { ReactNode } from 'react'
import Section from '../components/ui/Section'
import PageHeader from '../components/ui/PageHeader'
import SkillList from '../components/ui/SkillList'
import Tag from '../components/ui/Tag'
import { education, experience, summary } from '../data/resume'
import { practices, techStack, tools } from '../data/skills'

function ResumeSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="mb-14 last:mb-0">
      <h3 className="mb-6 text-xs font-semibold uppercase tracking-widest text-subtle">{title}</h3>
      {children}
    </div>
  )
}

function Resume() {
  return (
    <Section id="resume" className="border-t border-line-soft py-16 sm:py-24">
      <PageHeader title="Resume" subtitle="Experience, skills and education." />

      <ResumeSection title="Professional summary">
        <p className="max-w-3xl leading-relaxed text-body">{summary}</p>
      </ResumeSection>

      <ResumeSection title="Professional experience">
        <ol className="space-y-10 border-l border-line pl-6">
          {experience.map((job) => (
            <li key={`${job.company}-${job.period}`} className="relative">
              <span className="absolute top-2 -left-[29px] h-2 w-2 rounded-full bg-subtle" aria-hidden />
              <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-baseline">
                <h4 className="font-medium text-fg">
                  {job.role} <span className="font-normal text-muted">· {job.company}</span>
                </h4>
                <span className="shrink-0 text-sm text-subtle">{job.period}</span>
              </div>
              <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-body">
                {job.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
              {job.tech && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {job.tech.map((t) => (
                    <Tag key={t} label={t} />
                  ))}
                </div>
              )}
            </li>
          ))}
        </ol>
      </ResumeSection>

      <ResumeSection title="Skills">
        <div className="grid gap-8 sm:grid-cols-2">
          <SkillList title="Tech stack" items={techStack} />
          <SkillList title="Tools" items={tools} />
          <div className="sm:col-span-2">
            <SkillList title="Ways of working" items={practices} />
          </div>
        </div>
      </ResumeSection>

      <ResumeSection title="Education">
        <ul className="space-y-5">
          {education.map((edu) => (
            <li key={edu.credential} className="flex flex-col justify-between gap-1 sm:flex-row sm:items-baseline">
              <div>
                <h4 className="font-medium text-fg">{edu.credential}</h4>
                <p className="text-sm text-muted">{edu.school}</p>
              </div>
              <span className="shrink-0 text-sm text-subtle">{edu.year}</span>
            </li>
          ))}
        </ul>
      </ResumeSection>
    </Section>
  )
}

export default Resume
