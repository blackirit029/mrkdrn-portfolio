import Section from '../components/ui/Section'
import SkillList from '../components/ui/SkillList'
import { site } from '../data/site'
import { techStack, tools } from '../data/skills'

function Home() {
  return (
    <Section id="home" className="pt-12 pb-16 sm:pt-16 sm:pb-24">
      <div className="flex min-h-[calc(70svh-4rem)] flex-col justify-center">
        <p className="text-sm font-medium text-muted">Hi, I'm</p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-balance text-fg sm:text-5xl md:text-6xl">
          {site.name}
        </h1>
        <p className="mt-4 text-lg text-muted sm:text-xl">
          {site.role} · {site.yearsOfExperience} years of experience
        </p>
        <p className="mt-6 max-w-xl leading-relaxed text-body">{site.tagline}</p>
        <div className="mt-10 flex flex-col gap-3 min-[400px]:flex-row min-[400px]:flex-wrap sm:gap-4">
          <a
            href="#projects"
            className="rounded-md bg-inverse px-5 py-2.5 text-center text-sm font-medium text-inverse-fg transition-colors hover:bg-inverse-hover"
          >
            View projects
          </a>
          <a
            href="#resume"
            className="rounded-md border border-line px-5 py-2.5 text-center text-sm font-medium text-fg transition-colors hover:bg-surface"
          >
            View resume
          </a>
        </div>
      </div>

      <div className="mt-12 grid gap-10 border-t border-line-soft pt-10 sm:mt-16 sm:grid-cols-2 sm:pt-12">
        <SkillList title="Tech stack" items={techStack} />
        <SkillList title="Tools" items={tools} />
      </div>
    </Section>
  )
}

export default Home
