import { FREE_SHIPPING_MIN } from '../../checkout'
import type { CartLine } from '../../types'
import { formatPrice } from '../../utils'
import { CloseIcon, MinusIcon, PlusIcon } from '../Icons'

interface OrderSummaryProps {
  lines: CartLine[]
  subtotal: number
  shippingFee: number | null
  /** Quantity controls are hidden once the order is placed */
  onQuantityChange?: (id: string, qty: number) => void
  onRemove?: (id: string) => void
}

function OrderSummary({ lines, subtotal, shippingFee, onQuantityChange, onRemove }: OrderSummaryProps) {
  const total = subtotal + (shippingFee ?? 0)
  const toFreeShipping = FREE_SHIPPING_MIN - subtotal
  const editable = Boolean(onQuantityChange)

  return (
    <section aria-labelledby="summary-heading" className="rounded-xl border border-line bg-card">
      <h2 id="summary-heading" className="border-b border-line-soft px-4 py-3 text-sm font-semibold text-fg sm:px-5">
        Order summary
        <span className="ml-1.5 font-normal text-muted">
          ({lines.reduce((n, l) => n + l.qty, 0)} {lines.reduce((n, l) => n + l.qty, 0) === 1 ? 'item' : 'items'})
        </span>
      </h2>

      <ul className="max-h-80 divide-y divide-line-soft overflow-y-auto">
        {lines.map(({ product, qty }) => (
          <li key={product.id} className="flex gap-3 px-4 py-3 sm:px-5">
            <img src={product.image} alt="" className="h-14 w-14 shrink-0 rounded-lg object-cover" />
            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-2">
                <p className="line-clamp-2 text-sm text-fg">{product.name}</p>
                {onRemove && (
                  <button
                    type="button"
                    onClick={() => onRemove(product.id)}
                    aria-label={`Remove ${product.name}`}
                    className="-mt-0.5 shrink-0 rounded p-1 text-subtle hover:bg-chip hover:text-fg"
                  >
                    <CloseIcon className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
              <div className="mt-1.5 flex items-center justify-between gap-2">
                {editable ? (
                  <div className="flex items-center rounded-md border border-line" role="group" aria-label={`Quantity of ${product.name}`}>
                    <button
                      type="button"
                      onClick={() => onQuantityChange?.(product.id, qty - 1)}
                      disabled={qty <= 1}
                      aria-label="Decrease quantity"
                      className="grid h-7 w-7 place-items-center text-muted hover:text-fg disabled:opacity-30"
                    >
                      <MinusIcon className="h-3.5 w-3.5" />
                    </button>
                    <span className="w-7 text-center text-sm text-fg tabular-nums">{qty}</span>
                    <button
                      type="button"
                      onClick={() => onQuantityChange?.(product.id, qty + 1)}
                      disabled={qty >= 99}
                      aria-label="Increase quantity"
                      className="grid h-7 w-7 place-items-center text-muted hover:text-fg disabled:opacity-30"
                    >
                      <PlusIcon className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ) : (
                  <span className="text-xs text-muted">Qty {qty}</span>
                )}
                <span className="text-sm font-medium text-fg tabular-nums">{formatPrice(product.price * qty)}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <dl className="space-y-2 border-t border-line-soft px-4 py-4 text-sm sm:px-5">
        <div className="flex justify-between">
          <dt className="text-muted">Subtotal</dt>
          <dd className="text-fg tabular-nums">{formatPrice(subtotal)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-muted">Shipping</dt>
          <dd className="text-fg tabular-nums">
            {shippingFee === null ? 'Calculated next' : shippingFee === 0 ? 'Free' : formatPrice(shippingFee)}
          </dd>
        </div>
        {editable && toFreeShipping > 0 && (
          <p className="rounded-md bg-accent-soft px-3 py-2 text-xs text-accent-text">
            Add {formatPrice(toFreeShipping)} more for free standard shipping.
          </p>
        )}
        <div className="flex items-baseline justify-between border-t border-line-soft pt-3">
          <dt className="font-semibold text-fg">Total</dt>
          <dd className="text-lg font-semibold text-fg tabular-nums">{formatPrice(total)}</dd>
        </div>
      </dl>
    </section>
  )
}

export default OrderSummary
