import type { ReactNode } from 'react'

interface OptionCardProps {
  name: string
  value: string
  checked: boolean
  onSelect: () => void
  title: string
  description: string
  aside?: ReactNode
}

/** A radio button styled as a selectable card */
function OptionCard({ name, value, checked, onSelect, title, description, aside }: OptionCardProps) {
  return (
    <label
      className={`flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition-colors ${
        checked ? 'border-accent bg-accent-soft' : 'border-line hover:border-subtle'
      }`}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onSelect}
        className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--accent)]"
      />
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-medium text-fg">{title}</span>
        <span className="mt-0.5 block text-xs text-muted">{description}</span>
      </span>
      {aside && <span className="shrink-0 text-sm font-medium text-fg">{aside}</span>}
    </label>
  )
}

export default OptionCard
