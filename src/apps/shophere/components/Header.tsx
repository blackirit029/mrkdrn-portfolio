import type { FormEvent } from 'react'
import ThemeToggle from '../../../components/ui/ThemeToggle'
import { useTheme } from '../../../hooks/useTheme'
import type { Cart } from '../types'
import CartMenu from './CartMenu'
import { BagIcon, CloseIcon, SearchIcon } from './Icons'

interface HeaderProps {
  query: string
  onQueryChange: (query: string) => void
  onSearch: () => void
  cart: Cart
  onRemoveFromCart: (id: string) => void
  onClearCart: () => void
  onCheckout: () => void
  /** Checkout shows a pared-down header: no search or cart, just a way back */
  isCheckout: boolean
  onContinueShopping: () => void
}

function Header({
  query,
  onQueryChange,
  onSearch,
  cart,
  onRemoveFromCart,
  onClearCart,
  onCheckout,
  isCheckout,
  onContinueShopping,
}: HeaderProps) {
  const { theme, toggleTheme } = useTheme()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    onSearch()
  }

  return (
    <header className="sticky top-0 z-20 border-b border-line-soft bg-page/85 backdrop-blur">
      <div
        className={`mx-auto grid max-w-6xl grid-cols-[1fr_auto] items-center gap-x-4 gap-y-3 px-4 py-3 sm:px-6 ${
          isCheckout ? '' : 'md:grid-cols-[auto_1fr_auto] md:gap-x-8'
        }`}
      >
        <a
          href="#top"
          onClick={(e) => {
            if (!isCheckout) return
            e.preventDefault()
            onContinueShopping()
          }}
          className="flex items-center gap-2 text-lg font-semibold tracking-tight text-fg"
        >
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-accent text-accent-fg">
            <BagIcon className="h-4.5 w-4.5" />
          </span>
          ShopHere
        </a>

        {/* Search: its own full-width row on phones, centered between logo and actions from md up */}
        {!isCheckout && (
          <form
            role="search"
            onSubmit={handleSubmit}
            className="col-span-2 row-start-2 flex md:col-span-1 md:col-start-2 md:row-start-1"
          >
            <label htmlFor="shop-search" className="sr-only">
              Search products
            </label>
            <div className="relative flex-1">
              <SearchIcon className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-subtle" />
              <input
                id="shop-search"
                type="text"
                inputMode="search"
                value={query}
                onChange={(e) => onQueryChange(e.target.value)}
                placeholder="Search for products"
                autoComplete="off"
                className="h-10 w-full rounded-l-lg border border-r-0 border-line bg-card pr-9 pl-9 text-sm text-fg placeholder:text-subtle focus:border-accent focus:outline-none"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => onQueryChange('')}
                  aria-label="Clear search"
                  className="absolute top-1/2 right-2 -translate-y-1/2 rounded p-1 text-subtle hover:text-fg"
                >
                  <CloseIcon className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
            <button
              type="submit"
              className="h-10 shrink-0 rounded-r-lg bg-accent px-4 text-sm font-medium text-accent-fg transition-colors hover:bg-accent-hover sm:px-5"
            >
              Search
            </button>
          </form>
        )}

        <div className={`flex items-center justify-end gap-1 ${isCheckout ? '' : 'md:col-start-3'}`}>
          {isCheckout ? (
            <button
              type="button"
              onClick={onContinueShopping}
              className="rounded-md px-2 py-1.5 text-sm text-muted transition-colors hover:bg-chip hover:text-fg"
            >
              <span aria-hidden>← </span>Continue shopping
            </button>
          ) : (
            <a
              href="/#projects"
              className="hidden rounded-md px-2 py-1.5 text-sm text-muted transition-colors hover:bg-chip hover:text-fg sm:block"
            >
              <span aria-hidden>← </span>Portfolio
            </a>
          )}
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
          {!isCheckout && <CartMenu cart={cart} onRemove={onRemoveFromCart} onClear={onClearCart} onCheckout={onCheckout} />}
        </div>
      </div>
    </header>
  )
}

export default Header
