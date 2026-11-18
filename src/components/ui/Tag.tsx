interface TagProps {
  label: string
  active?: boolean
  onClick?: () => void
}

function Tag({ label, active = false, onClick }: TagProps) {
  const base = 'rounded-full px-3 py-1 text-xs transition-colors'
  const style = active ? 'bg-inverse text-inverse-fg' : 'bg-chip text-chip-fg'

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-pressed={active}
        className={`${base} ${style} cursor-pointer ${active ? '' : 'hover:bg-chip-hover'}`}
      >
        {label}
      </button>
    )
  }

  return <span className={`${base} ${style}`}>{label}</span>
}

export default Tag
