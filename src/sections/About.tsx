import Section from '../components/ui/Section'
import PageHeader from '../components/ui/PageHeader'
import { site } from '../data/site'

const facts = [
  { label: 'Role', value: site.role },
  { label: 'Experience', value: `${site.yearsOfExperience} years` },
  { label: 'Location', value: site.location },
]

function About() {
  return (
    <Section id="about" className="border-t border-line-soft bg-surface py-16 sm:py-24">
      <PageHeader title="About" />

      <div className="max-w-2xl space-y-5 leading-relaxed text-body">
        <p>
          I'm {site.name}, a frontend developer based in Cebu, Philippines, with {site.yearsOfExperience} years of
          experience building and maintaining responsive web and mobile applications.
        </p>
        <p>
          I started my career in 2017 building React and React Native apps, from a messaging application to an
          e-commerce platform. Since then I've worked on a multifunction printer interface and, at Accenture, on a
          Japanese order management and purchasing application using React, Next.js, Vue.js and TypeScript.
        </p>
        <p>
          I enjoy translating UI designs into reusable components, integrating REST APIs, tracking down tricky
          defects, and refactoring legacy code into something easier to maintain. I'm comfortable working with
          cross-functional and international teams in Agile/Scrum environments.
        </p>
      </div>

      <dl className="mt-12 grid max-w-2xl gap-6 border-t border-line-soft pt-8 sm:grid-cols-3">
        {facts.map((fact) => (
          <div key={fact.label}>
            <dt className="text-xs font-semibold uppercase tracking-widest text-subtle">{fact.label}</dt>
            <dd className="mt-1 text-sm text-fg">{fact.value}</dd>
          </div>
        ))}
      </dl>

      <p className="mt-12 text-body">
        Want to get in touch? Email me at{' '}
        <a href={`mailto:${site.email}`} className="break-all text-fg underline underline-offset-4 sm:break-normal">
          {site.email}
        </a>
        .
      </p>
    </Section>
  )
}

export default About
