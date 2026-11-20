import type { ReactNode } from 'react'
import CountUp from '../components/ui/CountUp'
import PageHeader from '../components/ui/PageHeader'
import Reveal from '../components/ui/Reveal'
import Section from '../components/ui/Section'
import { site } from '../data/site'
import { useInView } from '../hooks/useInView'

const years = parseInt(site.yearsOfExperience, 10)

/** Key facts: each card rises in turn, and the years count up from 0 */
function Facts() {
  const [ref, inView] = useInView<HTMLDListElement>(0.15)

  const facts: { label: string; value: ReactNode }[] = [
    { label: 'Role', value: site.role },
    { label: 'Experience', value: <CountUp to={years} start={inView} suffix="+ years" /> },
    { label: 'Location', value: site.location },
  ]

  return (
    <dl ref={ref} className="mt-12 grid max-w-3xl gap-4 sm:grid-cols-3">
      {facts.map((fact, i) => (
        <div
          key={fact.label}
          className={`rounded-xl border border-line bg-card p-4 shadow-sm ${inView ? 'motion-safe:animate-fade-up' : 'motion-safe:opacity-0'}`}
          style={inView ? { animationDelay: `${i * 120}ms` } : undefined}
        >
          <dt className="text-xs font-semibold tracking-widest text-subtle uppercase">{fact.label}</dt>
          <dd className="mt-1.5 text-base font-medium text-fg">{fact.value}</dd>
        </div>
      ))}
    </dl>
  )
}

function About() {
  const paragraphs = [
    <>
      I'm {site.name}, a frontend developer based in Cebu, Philippines, with {site.yearsOfExperience} years of experience
      building and maintaining responsive web and mobile applications.
    </>,
    <>
      I started my career in 2017 building React and React Native apps, from a messaging application to an e-commerce
      platform. Since then I've worked on a multifunction printer interface and, at Accenture, on a Japanese order
      management and purchasing application using React, Next.js, Vue.js and TypeScript.
    </>,
    <>
      I enjoy translating UI designs into reusable components, integrating REST APIs, tracking down tricky defects, and
      refactoring legacy code into something easier to maintain. I'm comfortable working with cross-functional and
      international teams in Agile/Scrum environments.
    </>,
  ]

  return (
    <Section id="about" selfAnimated className="border-t border-line-soft bg-surface py-16 sm:py-24">
      <Reveal animation="slide-in-left">
        <PageHeader title="About" />
      </Reveal>

      {/* A thin accent rule on the left draws the eye down the text as it rises in */}
      <div className="max-w-2xl space-y-5 border-l-2 border-line pl-5 leading-relaxed text-body sm:pl-6">
        {paragraphs.map((paragraph, i) => (
          <Reveal as="p" key={i} delay={i * 140}>
            {paragraph}
          </Reveal>
        ))}
      </div>

      <Facts />

      <Reveal as="p" delay={200} className="mt-12 text-body">
        Want to get in touch? Email me at{' '}
        <a href={`mailto:${site.email}`} className="break-all text-fg underline underline-offset-4 sm:break-normal">
          {site.email}
        </a>
        .
      </Reveal>
    </Section>
  )
}

export default About
