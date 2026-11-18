import profile from '../assets/profile.jpg'
import Section from '../components/ui/Section'
import SkillList from '../components/ui/SkillList'
import { site } from '../data/site'
import { techStack, tools } from '../data/skills'

function ProfilePhoto() {
  return (
    <figure className="relative mx-auto w-52 sm:w-60 md:w-full md:max-w-[19rem]">
      {/* Soft glow behind the photo */}
      <div
        aria-hidden
        className="absolute -inset-6 -z-10 rounded-[3rem] bg-[radial-gradient(closest-side,var(--color-chip-hover),transparent)] opacity-80 blur-2xl"
      />
      {/* Offset outline frame */}
      <div aria-hidden className="absolute inset-0 translate-x-3 translate-y-3 rounded-[2rem] border border-line" />

      {/* The original is a wide full-body shot: zoom in on head and shoulders */}
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] shadow-xl ring-1 ring-black/5 dark:shadow-black/40 dark:ring-white/10">
        <img
          src={profile}
          alt={`Portrait of ${site.name}`}
          width={960}
          height={1280}
          className="h-full w-full origin-[44%_40%] scale-[1.9] object-cover"
        />
      </div>

      {/* Floating detail chips */}
      <figcaption className="absolute -bottom-4 -left-4 flex items-center gap-2 rounded-full border border-line bg-card/90 px-3 py-1.5 text-xs font-medium text-fg shadow-lg backdrop-blur sm:-left-6 dark:shadow-black/40">
        <svg className="h-3.5 w-3.5 text-muted" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z" />
          <circle cx="12" cy="9.5" r="2.5" />
        </svg>
        Cebu, Philippines
      </figcaption>
      <div className="absolute -top-3 -right-3 rounded-2xl border border-line bg-card/90 px-3 py-2 text-center shadow-lg backdrop-blur sm:-right-5 dark:shadow-black/40">
        <p className="text-lg leading-none font-semibold text-fg">{site.yearsOfExperience}</p>
        <p className="mt-0.5 text-[10px] tracking-wide text-muted uppercase">Years</p>
      </div>
    </figure>
  )
}

function Home() {
  return (
    <Section id="home" revealOnLoad className="pt-12 pb-16 sm:pt-16 sm:pb-24">
      <div className="grid min-h-[calc(70svh-4rem)] items-center gap-12 md:grid-cols-[1.35fr_1fr] md:gap-10">
        <div className="order-last md:order-first">
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

        <div className="order-first pt-2 md:order-last md:pt-0">
          <ProfilePhoto />
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
