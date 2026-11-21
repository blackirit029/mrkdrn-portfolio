import { useEffect, useState } from 'react'
import { navItems, site } from '../../data/site'
import { useTheme } from '../../hooks/useTheme'
import ThemeToggle from '../ui/ThemeToggle'
import TypewriterName from '../ui/TypewriterName'

interface NavbarProps {
  activeId: string
}

const linkClass = (isActive: boolean) =>
  `transition-colors ${isActive ? 'font-semibold text-fg' : 'text-muted hover:text-fg'}`

function Navbar({ activeId }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const closeMenu = () => setIsOpen(false)

  // Close the mobile menu with Escape, or when the screen grows past the mobile breakpoint
  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setIsOpen(false)
    const desktop = window.matchMedia('(min-width: 640px)')
    const onResize = () => desktop.matches && setIsOpen(false)
    window.addEventListener('keydown', onKey)
    desktop.addEventListener('change', onResize)
    return () => {
      window.removeEventListener('keydown', onKey)
      desktop.removeEventListener('change', onResize)
    }
  }, [isOpen])

  return (
    <header className="sticky top-0 z-20 border-b border-line-soft bg-page/80 backdrop-blur motion-safe:animate-fade-down">
      <nav className="mx-auto flex h-16 max-w-4xl items-center justify-between gap-4 px-5 sm:px-6">
        <a
          href="#home"
          onClick={closeMenu}
          className="truncate font-semibold tracking-tight text-fg motion-safe:animate-fade-up"
          style={{ animationDelay: '120ms' }}
        >
          <TypewriterName name={site.name} />
        </a>

        <div className="flex items-center gap-2 sm:gap-6">
          {/* Desktop links: staggered entrance, sliding underline on the active/hovered link */}
          <ul className="hidden gap-6 text-sm sm:flex md:gap-8">
            {navItems.map((item, index) => {
              const isActive = activeId === item.id
              return (
                <li key={item.id} className="motion-safe:animate-fade-up" style={{ animationDelay: `${200 + index * 70}ms` }}>
                  <a
                    href={`#${item.id}`}
                    aria-current={isActive ? 'location' : undefined}
                    className={`${linkClass(isActive)} relative py-1 after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:bg-fg after:transition-transform after:duration-300 ${
                      isActive ? 'after:scale-x-100' : 'after:scale-x-0 hover:after:scale-x-100'
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              )
            })}
          </ul>

          <span className="motion-safe:animate-fade-up" style={{ animationDelay: '480ms' }}>
            <ThemeToggle theme={theme} onToggle={toggleTheme} />
          </span>

          {/* Mobile menu button */}
          <button
            type="button"
            className="grid h-9 w-9 place-items-center rounded-md text-muted transition-colors hover:bg-chip hover:text-fg sm:hidden"
            aria-label={isOpen ? 'Close navigation' : 'Open navigation'}
            aria-expanded={isOpen}
            aria-controls="mobile-nav"
            onClick={() => setIsOpen((open) => !open)}
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden>
              {isOpen ? (
                <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile links */}
      {isOpen && (
        <ul id="mobile-nav" className="border-t border-line-soft px-5 py-2 motion-safe:animate-fade-in sm:hidden">
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={closeMenu}
                aria-current={activeId === item.id ? 'location' : undefined}
                className={`block py-3 ${linkClass(activeId === item.id)}`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  )
}

export default Navbar
