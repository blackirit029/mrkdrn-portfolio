import profile from '../assets/profile.jpg'
import Section from '../components/ui/Section'
import SkillList from '../components/ui/SkillList'
import { site } from '../data/site'
import { techStack, tools } from '../data/skills'

type Entrance = 'fade-up' | 'scale-in' | 'pop-in'

const entranceClass: Record<Entrance, string> = {
  'fade-up': 'motion-safe:animate-fade-up',
  'scale-in': 'motion-safe:animate-scale-in',
  'pop-in': 'motion-safe:animate-pop-in',
}

/** Staggered entrance on page load: an animation plus its start delay (ms) */
const enter = (delay: number, animation: Entrance = 'fade-up') => ({
  className: entranceClass[animation],
  style: { animationDelay: `${delay}ms` },
})

// Timeline: the navbar finishes ~500ms, then the hero text, photo and skills follow
const HERO_START = 350

function ProfilePhoto() {
  const badgeLeft = enter(HERO_START + 650, 'pop-in')
  const badgeRight = enter(HERO_START + 750, 'pop-in')

  return (
    <figure className="group/photo relative mx-auto w-52 sm:w-60 md:w-full md:max-w-[19rem]">
      {/* Soft glow behind the photo; brightens and spreads on hover */}
      <div
        aria-hidden
        className="absolute -inset-6 -z-10 rounded-[3rem] bg-[radial-gradient(closest-side,var(--color-chip-hover),transparent)] opacity-80 blur-2xl transition-[opacity,scale] duration-700 group-hover/photo:scale-110 group-hover/photo:opacity-100"
      />
      {/* Offset outline frame: stays put while the photo lifts, for a sense of depth */}
      <div aria-hidden className="absolute inset-0 translate-x-3 translate-y-3 rounded-[2rem] border border-line" />

      {/* Hover: the photo lifts, tilts slightly and grows... */}
      <div className="relative transition-[translate,rotate,scale] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/photo:-translate-y-2 group-hover/photo:-rotate-2 group-hover/photo:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover/photo:transform-none">
        {/* ...then keeps floating gently while hovered */}
        <div className="motion-safe:group-hover/photo:animate-float">
          {/* The original is a wide full-body shot: zoom in on head and shoulders */}
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] shadow-xl ring-1 ring-black/5 transition-shadow duration-700 group-hover/photo:shadow-2xl dark:shadow-black/40 dark:ring-white/10">
            <img
              src={profile}
              alt={`Portrait of ${site.name}`}
              width={960}
              height={1280}
              className="h-full w-full origin-[44%_40%] scale-[1.9] object-cover"
            />
          </div>
        </div>
      </div>

      {/* Floating detail chips */}
      <figcaption
        style={badgeLeft.style}
        className={`absolute -bottom-4 -left-4 flex items-center gap-2 rounded-full border border-line bg-card/90 px-3 py-1.5 text-xs font-medium text-fg shadow-lg backdrop-blur transition-[translate] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/photo:-translate-x-2 group-hover/photo:translate-y-1 sm:-left-6 dark:shadow-black/40 ${badgeLeft.className}`}
      >
        <svg className="h-3.5 w-3.5 text-muted" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z" />
          <circle cx="12" cy="9.5" r="2.5" />
        </svg>
        Cebu, Philippines
      </figcaption>
      <div
        style={badgeRight.style}
        className={`absolute -top-3 -right-3 rounded-2xl border border-line bg-card/90 px-3 py-2 text-center shadow-lg backdrop-blur transition-[translate] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/photo:translate-x-2 group-hover/photo:-translate-y-2 sm:-right-5 dark:shadow-black/40 ${badgeRight.className}`}
      >
        <p className="text-lg leading-none font-semibold text-fg">{site.yearsOfExperience}</p>
        <p className="mt-0.5 text-[10px] tracking-wide text-muted uppercase">Years</p>
      </div>
    </figure>
  )
}

function Home() {
  const photo = enter(HERO_START + 100, 'scale-in')

  return (
    <Section id="home" revealOnLoad selfAnimated className="pt-12 pb-16 sm:pt-16 sm:pb-24">
      <div className="grid min-h-[calc(70svh-4rem)] items-center gap-12 md:grid-cols-[1.35fr_1fr] md:gap-10">
        <div className="order-last md:order-first">
          <p style={enter(HERO_START).style} className={`text-sm font-medium text-muted ${enter(HERO_START).className}`}>
            Hi, I'm
          </p>
          <h1
            style={enter(HERO_START + 90).style}
            className={`mt-2 text-4xl font-semibold tracking-tight text-balance text-fg sm:text-5xl md:text-6xl ${enter(HERO_START + 90).className}`}
          >
            {site.name}
          </h1>
          <p
            style={enter(HERO_START + 180).style}
            className={`mt-4 text-lg text-muted sm:text-xl ${enter(HERO_START + 180).className}`}
          >
            {site.role} · {site.yearsOfExperience} years of experience
          </p>
          <p
            style={enter(HERO_START + 270).style}
            className={`mt-6 max-w-xl leading-relaxed text-body ${enter(HERO_START + 270).className}`}
          >
            {site.tagline}
          </p>
          <div
            style={enter(HERO_START + 360).style}
            className={`mt-10 flex flex-col gap-3 min-[400px]:flex-row min-[400px]:flex-wrap sm:gap-4 ${enter(HERO_START + 360).className}`}
          >
            <a
              href="#projects"
              className="rounded-md bg-inverse px-5 py-2.5 text-center text-sm font-medium text-inverse-fg transition hover:-translate-y-0.5 hover:bg-inverse-hover hover:shadow-md"
            >
              View projects
            </a>
            <a
              href="#resume"
              className="rounded-md border border-line px-5 py-2.5 text-center text-sm font-medium text-fg transition hover:-translate-y-0.5 hover:bg-surface"
            >
              View resume
            </a>
          </div>
        </div>

        <div style={photo.style} className={`order-first pt-2 md:order-last md:pt-0 ${photo.className}`}>
          <ProfilePhoto />
        </div>
      </div>

      <div className="mt-12 grid gap-10 border-t border-line-soft pt-10 sm:mt-16 sm:grid-cols-2 sm:pt-12">
        <SkillList title="Tech stack" items={techStack} featured enterDelay={HERO_START + 550} />
        <SkillList title="Tools" items={tools} featured enterDelay={HERO_START + 700} />
      </div>
    </Section>
  )
}

export default Home
