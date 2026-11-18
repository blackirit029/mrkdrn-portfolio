import type { ReactNode } from 'react'
import { deliveryOptions, deliveryWindow, paymentOptions } from '../../checkout'
import type { DeliveryOption, PaymentMethod, ShippingDetails } from '../../types'
import { formatPrice } from '../../utils'

interface ReviewStepProps {
  details: ShippingDetails
  delivery: DeliveryOption
  payment: PaymentMethod
  total: number
  isPlacing: boolean
  onEdit: (step: number) => void
  onBack: () => void
  onPlaceOrder: () => void
}

function ReviewBlock({ title, onEdit, children }: { title: string; onEdit: () => void; children: ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4 py-4 first:pt-0">
      <div className="min-w-0">
        <h3 className="text-xs font-semibold tracking-wide text-subtle uppercase">{title}</h3>
        <div className="mt-1.5 text-sm text-body">{children}</div>
      </div>
      <button type="button" onClick={onEdit} className="shrink-0 text-sm font-medium text-accent-text hover:underline">
        Edit
      </button>
    </div>
  )
}

function ReviewStep({ details, delivery, payment, total, isPlacing, onEdit, onBack, onPlaceOrder }: ReviewStepProps) {
  return (
    <div className="rounded-xl border border-line bg-card p-4 sm:p-6">
      <h2 className="text-base font-semibold text-fg">Review your order</h2>
      <p className="mt-0.5 text-sm text-muted">Check everything before placing your order.</p>

      <div className="mt-5 divide-y divide-line-soft">
        <ReviewBlock title="Ship to" onEdit={() => onEdit(0)}>
          <p className="font-medium text-fg">{details.fullName}</p>
          <p>{details.phone}</p>
          <p className="break-words">
            {details.address}, {details.city}, {details.province} {details.postalCode}
          </p>
        </ReviewBlock>
        <ReviewBlock title="Delivery" onEdit={() => onEdit(1)}>
          <p className="text-fg">
            {deliveryOptions[delivery].label} · {deliveryOptions[delivery].eta}
          </p>
          <p>Arrives {deliveryWindow(delivery)}</p>
        </ReviewBlock>
        <ReviewBlock title="Payment" onEdit={() => onEdit(1)}>
          <p className="text-fg">{paymentOptions[payment].label}</p>
        </ReviewBlock>
      </div>

      <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={onBack}
          disabled={isPlacing}
          className="rounded-lg px-4 py-2.5 text-sm text-muted hover:bg-chip hover:text-fg disabled:opacity-40"
        >
          ← Back
        </button>
        <button
          type="button"
          onClick={onPlaceOrder}
          disabled={isPlacing}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-6 py-2.5 text-sm font-semibold text-accent-fg transition-colors hover:bg-accent-hover disabled:cursor-wait disabled:opacity-80"
        >
          {isPlacing && (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent" aria-hidden />
          )}
          {isPlacing ? 'Placing order…' : `Place order · ${formatPrice(total)}`}
        </button>
      </div>
    </div>
  )
}

export default ReviewStep
