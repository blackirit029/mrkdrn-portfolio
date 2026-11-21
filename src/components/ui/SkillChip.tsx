import type { CSSProperties } from 'react'
import { chipHover, iconColor, skillIcons } from '../../data/skillIcons'

interface SkillChipProps {
  label: string
  /** md: Home/Skills; sm: compact rows such as the tech under each job */
  size?: 'sm' | 'md'
  style?: CSSProperties
  className?: string
}

const sizes = {
  sm: { chip: 'gap-1.5 py-1 pr-2.5 pl-2 text-xs', icon: 'h-3.5 w-3.5' },
  md: { chip: 'gap-2 py-1.5 pr-3.5 pl-2.5 text-sm', icon: 'h-4 w-4' },
}

/**
 * A skill chip with the technology's logo to the left of its name.
 * On hover the brand color sweeps across from the left and the text and logo turn white.
 */
function SkillChip({ label, size = 'md', style, className = '' }: SkillChipProps) {
  const icon = skillIcons[label]
  const hover = icon ? chipHover(icon) : { fill: 'var(--color-fg)', text: 'var(--color-page)' }

  return (
    <span
      style={{ ...style, '--chip-fill': hover.fill, '--chip-on': hover.text, '--chip-icon': icon ? iconColor(icon) : 'currentColor' } as CSSProperties}
      className={`group/chip relative isolate inline-flex items-center overflow-hidden rounded-full border border-line bg-card text-fg shadow-sm transition-[border-color,color] duration-300 hover:border-[var(--chip-fill)] hover:text-[var(--chip-on)] ${sizes[size].chip} ${className}`}
    >
      {/* Brand-color fill that sweeps in from the left on hover */}
      <span
        aria-hidden
        className="absolute inset-0 -z-10 origin-left scale-x-0 rounded-full bg-[var(--chip-fill)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/chip:scale-x-100 motion-reduce:transition-none"
      />
      {icon && (
        <svg
          viewBox="0 0 24 24"
          className={`shrink-0 fill-current text-[var(--chip-icon)] transition-colors duration-300 group-hover/chip:text-[var(--chip-on)] ${sizes[size].icon}`}
          aria-hidden
        >
          <path d={icon.path} />
        </svg>
      )}
      {label}
    </span>
  )
}

export default SkillChip
