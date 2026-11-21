interface IconProps {
  className?: string
}

const base = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, viewBox: '0 0 24 24', 'aria-hidden': true }

export const PencilIcon = ({ className = 'h-4 w-4' }: IconProps) => (
  <svg className={className} {...base}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 20h4L19 9l-4-4L4 16v4ZM13.5 6.5l4 4" />
  </svg>
)

export const XIcon = ({ className = 'h-4 w-4' }: IconProps) => (
  <svg className={className} {...base} strokeWidth={2}>
    <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
  </svg>
)

export const TrashIcon = ({ className = 'h-4 w-4' }: IconProps) => (
  <svg className={className} {...base}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M10 11v6m4-6v6M6 7l1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12M9 7V4h6v3" />
  </svg>
)

export const CheckIcon = ({ className = 'h-3.5 w-3.5' }: IconProps) => (
  <svg className={className} {...base} strokeWidth={3}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12.5l4.5 4.5L19 7.5" />
  </svg>
)

export const SearchIcon = ({ className = 'h-4 w-4' }: IconProps) => (
  <svg className={className} {...base}>
    <circle cx="11" cy="11" r="6.5" />
    <path strokeLinecap="round" d="m20 20-4.2-4.2" />
  </svg>
)

export const BookIcon = ({ className = 'h-5 w-5' }: IconProps) => (
  <svg className={className} {...base}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 4.5A1.5 1.5 0 0 1 6.5 3H19v15H6.5A1.5 1.5 0 0 0 5 19.5v-15ZM5 19.5A1.5 1.5 0 0 0 6.5 21H19M9 7h6" />
  </svg>
)
