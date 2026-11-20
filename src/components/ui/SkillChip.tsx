import type { CSSProperties } from 'react'
import { iconColor, skillIcons } from '../../data/skillIcons'

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

/** A skill chip with the technology's logo to the left of its name. */
function SkillChip({ label, size = 'md', style, className = '' }: SkillChipProps) {
  const icon = skillIcons[label]

  return (
    <span
      style={style}
      className={`inline-flex items-center rounded-full border border-line bg-card text-fg shadow-sm transition hover:-translate-y-0.5 hover:border-subtle hover:shadow-md dark:shadow-black/30 ${sizes[size].chip} ${className}`}
    >
      {icon && (
        <svg viewBox="0 0 24 24" className={`shrink-0 ${sizes[size].icon}`} fill={iconColor(icon)} aria-hidden>
          <path d={icon.path} />
        </svg>
      )}
      {label}
    </span>
  )
}

export default SkillChip
