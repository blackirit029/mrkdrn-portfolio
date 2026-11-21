interface IconProps {
  className?: string
}

const base = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, viewBox: '0 0 24 24', 'aria-hidden': true }

export const ChevronIcon = ({ className = 'h-4 w-4', direction = 'right' }: IconProps & { direction?: 'left' | 'right' }) => (
  <svg className={className} {...base} strokeWidth={2.2}>
    <path strokeLinecap="round" strokeLinejoin="round" d={direction === 'left' ? 'M15 6l-6 6 6 6' : 'M9 6l6 6-6 6'} />
  </svg>
)

export const BagIcon =({ className = 'h-5 w-5' }: IconProps) => (
  <svg className={className} {...base}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 8h14l-1 12H6L5 8Zm4 0V6a3 3 0 0 1 6 0v2" />
  </svg>
)

export const CartIcon = ({ className = 'h-5 w-5' }: IconProps) => (
  <svg className={className} {...base}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 4h2l2.2 10.2a1.5 1.5 0 0 0 1.5 1.2h8.6a1.5 1.5 0 0 0 1.5-1.1L20.5 8H6.2" />
    <circle cx="9.5" cy="19.5" r="1.3" />
    <circle cx="17" cy="19.5" r="1.3" />
  </svg>
)

export const SearchIcon = ({ className = 'h-4 w-4' }: IconProps) => (
  <svg className={className} {...base}>
    <circle cx="11" cy="11" r="6.5" />
    <path strokeLinecap="round" d="m20 20-4.2-4.2" />
  </svg>
)

export const CloseIcon = ({ className = 'h-4 w-4' }: IconProps) => (
  <svg className={className} {...base} strokeWidth={2}>
    <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
  </svg>
)

export const PlusIcon = ({ className = 'h-4 w-4' }: IconProps) => (
  <svg className={className} {...base} strokeWidth={2}>
    <path strokeLinecap="round" d="M12 5v14M5 12h14" />
  </svg>
)

export const MinusIcon = ({ className = 'h-4 w-4' }: IconProps) => (
  <svg className={className} {...base} strokeWidth={2}>
    <path strokeLinecap="round" d="M5 12h14" />
  </svg>
)

export const CheckIcon = ({ className = 'h-4 w-4' }: IconProps) => (
  <svg className={className} {...base} strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12.5l4.5 4.5L19 7.5" />
  </svg>
)

export const TruckIcon =({ className = 'h-5 w-5' }: IconProps) => (
  <svg className={className} {...base}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 6h11v10H3zM14 9h4l3 3.5V16h-7" />
    <circle cx="7" cy="17.5" r="1.7" />
    <circle cx="17.5" cy="17.5" r="1.7" />
  </svg>
)

export const TagIcon = ({ className = 'h-5 w-5' }: IconProps) => (
  <svg className={className} {...base}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12V4h8l10 10-8 8L3 12Z" />
    <circle cx="7.5" cy="8.5" r="1.3" />
  </svg>
)

export const StarIcon = ({ className = 'h-3.5 w-3.5' }: IconProps) => (
  <svg className={className} viewBox="0 0 20 20" fill="currentColor" aria-hidden>
    <path d="M10 1.8l2.5 5.3 5.8.7-4.3 4 1.1 5.7L10 14.7l-5.1 2.8L6 11.8l-4.3-4 5.8-.7L10 1.8Z" />
  </svg>
)
