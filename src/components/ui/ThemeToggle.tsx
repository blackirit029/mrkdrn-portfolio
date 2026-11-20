import type { MouseEvent } from 'react'
import type { Theme } from '../../hooks/useTheme'

interface ThemeToggleProps {
  theme: Theme
  /** Receives the button's center so the theme change can spread out from it */
  onToggle: (origin: { x: number; y: number }) => void
}

// Both icons stay mounted; the active one spins in while the other spins out.
const iconBase =
  'absolute inset-0 m-auto h-5 w-5 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] motion-reduce:transition-none'
const shown = 'rotate-0 scale-100 opacity-100'

function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  const isDark = theme === 'dark'
  const label = isDark ? 'Switch to light theme' : 'Switch to dark theme'

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    onToggle({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 })
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={label}
      title={label}
      className="relative h-9 w-9 overflow-hidden rounded-md text-muted transition-colors hover:bg-chip hover:text-fg active:scale-90"
    >
      {/* Sun: shown in dark mode (click for light) */}
      <svg
        className={`${iconBase} ${isDark ? shown : 'rotate-90 scale-0 opacity-0'}`}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        viewBox="0 0 24 24"
        aria-hidden
      >
        <circle cx="12" cy="12" r="4" />
        <path
          strokeLinecap="round"
          d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41m11.32-11.32 1.41-1.41"
        />
      </svg>
      {/* Moon: shown in light mode (click for dark) */}
      <svg
        className={`${iconBase} ${isDark ? '-rotate-90 scale-0 opacity-0' : shown}`}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        viewBox="0 0 24 24"
        aria-hidden
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    </button>
  )
}

export default ThemeToggle
