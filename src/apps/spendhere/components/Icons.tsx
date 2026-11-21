interface IconProps {
  className?: string
}

const base = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, viewBox: '0 0 24 24', 'aria-hidden': true }

export const PencilIcon = ({ className = 'h-4 w-4' }: IconProps) => (
  <svg className={className} {...base}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 20h4L19 9l-4-4L4 16v4ZM13.5 6.5l4 4" />
  </svg>
)

export const WalletIcon =({ className = 'h-4.5 w-4.5' }: IconProps) => (
  <svg className={className} {...base}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 7a2 2 0 0 1 2-2h11v4M4 7v10a2 2 0 0 0 2 2h13V9H6a2 2 0 0 1-2-2Z" />
    <circle cx="15.5" cy="14" r="1.2" fill="currentColor" stroke="none" />
  </svg>
)

export const ChevronIcon = ({ className = 'h-4 w-4', direction = 'right' }: IconProps & { direction?: 'left' | 'right' }) => (
  <svg className={className} {...base} strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d={direction === 'left' ? 'M15 6l-6 6 6 6' : 'M9 6l6 6-6 6'} />
  </svg>
)

export const ArrowIcon = ({ className = 'h-3.5 w-3.5', direction = 'up' }: IconProps & { direction?: 'up' | 'down' }) => (
  <svg className={className} {...base} strokeWidth={2.2}>
    <path strokeLinecap="round" strokeLinejoin="round" d={direction === 'up' ? 'M12 19V5m-6 6 6-6 6 6' : 'M12 5v14m-6-6 6 6 6-6'} />
  </svg>
)

export const TrashIcon = ({ className = 'h-4 w-4' }: IconProps) => (
  <svg className={className} {...base}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M10 11v6m4-6v6M6 7l1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12M9 7V4h6v3" />
  </svg>
)

export const SearchIcon = ({ className = 'h-4 w-4' }: IconProps) => (
  <svg className={className} {...base}>
    <circle cx="11" cy="11" r="6.5" />
    <path strokeLinecap="round" d="m20 20-4.2-4.2" />
  </svg>
)

export const CheckCircleIcon = ({ className = 'h-4 w-4' }: IconProps) => (
  <svg className={className} {...base}>
    <circle cx="12" cy="12" r="9" />
    <path strokeLinecap="round" strokeLinejoin="round" d="m8 12.5 2.5 2.5L16 9.5" />
  </svg>
)

export const AlertIcon = ({ className = 'h-4 w-4' }: IconProps) => (
  <svg className={className} {...base}>
    <path strokeLinejoin="round" d="M12 3.5 2.5 20h19L12 3.5Z" />
    <path strokeLinecap="round" d="M12 10v4.5m0 2.5v.01" />
  </svg>
)

export const OverIcon = ({ className = 'h-4 w-4' }: IconProps) => (
  <svg className={className} {...base}>
    <circle cx="12" cy="12" r="9" />
    <path strokeLinecap="round" d="M12 7.5v5.5m0 3v.01" />
  </svg>
)
