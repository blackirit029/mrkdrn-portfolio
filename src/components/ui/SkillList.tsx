import SkillChip from './SkillChip'
import Tag from './Tag'

interface SkillListProps {
  title: string
  items: string[]
  /** Larger chips with logos */
  featured?: boolean
  /** Featured only: stagger the chips in, starting after this many milliseconds */
  enterDelay?: number
  /** Featured + enterDelay: hold the chips hidden until this turns true (e.g. when scrolled into view) */
  play?: boolean
}

function SkillList({ title, items, featured = false, enterDelay, play = true }: SkillListProps) {
  const animate = featured && enterDelay !== undefined
  const waiting = animate && !play

  const heading = waiting ? 'motion-safe:opacity-0' : animate ? 'motion-safe:animate-fade-up' : ''
  const chip = waiting ? 'motion-safe:opacity-0' : animate ? 'motion-safe:animate-pop-in' : ''

  return (
    <div>
      <h3
        className={`mb-3 text-xs font-semibold tracking-widest text-subtle uppercase ${heading}`}
        style={animate && play ? { animationDelay: `${enterDelay}ms` } : undefined}
      >
        {title}
      </h3>
      <div className={`flex flex-wrap ${featured ? 'gap-2.5' : 'gap-2'}`}>
        {items.map((item, index) =>
          featured ? (
            <SkillChip
              key={item}
              label={item}
              className={chip}
              style={animate && play ? { animationDelay: `${enterDelay! + 80 + index * 45}ms` } : undefined}
            />
          ) : (
            <Tag key={item} label={item} />
          ),
        )}
      </div>
    </div>
  )
}

export default SkillList
