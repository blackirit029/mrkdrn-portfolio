import { useEffect, useRef, useState } from 'react'
import { products } from '../data'
import type { Cart } from '../types'
import { formatPrice } from '../utils'
import { CartIcon, CloseIcon } from './Icons'

interface CartMenuProps {
  cart: Cart
  onRemove: (id: string) => void
  onClear: () => void
  onCheckout: () => void
}

function CartMenu({ cart, onRemove, onClear, onCheckout }: CartMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const items = products.filter((p) => cart[p.id]).map((p) => ({ product: p, qty: cart[p.id] }))
  const count = items.reduce((sum, item) => sum + item.qty, 0)
  const subtotal = items.reduce((sum, item) => sum + item.qty * item.product.price, 0)

  // Close on outside click or Escape
  useEffect(() => {
    if (!isOpen) return
    const onPointer = (e: PointerEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false)
    }
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setIsOpen(false)
    document.addEventListener('pointerdown', onPointer)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onPointer)
      document.removeEventListener('keydown', onKey)
    }
  }, [isOpen])

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-label={`Cart, ${count} ${count === 1 ? 'item' : 'items'}`}
        aria-expanded={isOpen}
        className="relative grid h-9 w-9 place-items-center rounded-md text-muted transition-colors hover:bg-chip hover:text-fg"
      >
        <CartIcon />
        {count > 0 && (
          <span className="absolute -top-0.5 -right-0.5 grid h-4.5 min-w-4.5 place-items-center rounded-full bg-accent px-1 text-[10px] leading-none font-semibold text-accent-fg tabular-nums">
            {count > 99 ? '99+' : count}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="fixed inset-x-3 top-16 z-30 rounded-xl border border-line bg-card shadow-xl motion-safe:animate-fade-in sm:absolute sm:inset-x-auto sm:top-11 sm:right-0 sm:w-80 dark:shadow-black/50">
          <div className="flex items-center justify-between border-b border-line-soft px-4 py-3">
            <p className="text-sm font-semibold text-fg">Your cart</p>
            {count > 0 && (
              <button type="button" onClick={onClear} className="text-xs text-muted hover:text-fg">
                Clear
              </button>
            )}
          </div>

          {items.length === 0 ? (
            <p className="px-4 py-10 text-center text-sm text-muted">Your cart is empty.</p>
          ) : (
            <>
              <ul className="max-h-72 divide-y divide-line-soft overflow-y-auto">
                {items.map(({ product, qty }) => (
                  <li key={product.id} className="flex items-center gap-3 px-4 py-3">
                    <img src={product.image} alt="" className="h-11 w-11 shrink-0 rounded-md object-cover" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm text-fg">{product.name}</p>
                      <p className="text-xs text-muted">
                        {qty} × {formatPrice(product.price)}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => onRemove(product.id)}
                      aria-label={`Remove ${product.name}`}
                      className="rounded p-1 text-subtle hover:bg-chip hover:text-fg"
                    >
                      <CloseIcon />
                    </button>
                  </li>
                ))}
              </ul>
              <div className="space-y-3 border-t border-line-soft px-4 py-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted">Subtotal</span>
                  <span className="font-semibold text-fg">{formatPrice(subtotal)}</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false)
                    onCheckout()
                  }}
                  className="w-full rounded-md bg-accent py-2 text-sm font-medium text-accent-fg transition-colors hover:bg-accent-hover"
                >
                  Checkout
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}

export default CartMenu
