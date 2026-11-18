import { deliveryOptions, deliveryWindow, paymentOptions } from '../../checkout'
import type { Order } from '../../types'
import { CheckIcon } from '../Icons'
import OrderSummary from './OrderSummary'

interface OrderConfirmationProps {
  order: Order
  onContinueShopping: () => void
}

function OrderConfirmation({ order, onContinueShopping }: OrderConfirmationProps) {
  const { details } = order
  return (
    <div className="mx-auto max-w-xl">
      <div className="text-center">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-accent text-accent-fg">
          <CheckIcon className="h-7 w-7" />
        </span>
        <h1 className="mt-5 text-2xl font-semibold tracking-tight text-fg">Thank you, your order is placed!</h1>
        <p className="mt-2 text-sm text-muted">
          Order <span className="font-medium text-fg">{order.id}</span> · arriving{' '}
          <span className="font-medium text-fg">{deliveryWindow(order.delivery, new Date(order.placedAt))}</span>
        </p>
      </div>

      <div className="mt-8 grid gap-4 rounded-xl border border-line bg-card p-4 text-sm sm:grid-cols-2 sm:p-5">
        <div>
          <p className="text-xs font-semibold tracking-wide text-subtle uppercase">Shipping to</p>
          <p className="mt-1.5 font-medium text-fg">{details.fullName}</p>
          <p className="text-body">{details.phone}</p>
          <p className="break-words text-body">
            {details.address}, {details.city}, {details.province} {details.postalCode}
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold tracking-wide text-subtle uppercase">Delivery & payment</p>
          <p className="mt-1.5 text-fg">{deliveryOptions[order.delivery].label} delivery</p>
          <p className="text-body">{paymentOptions[order.payment].label}</p>
        </div>
      </div>

      <div className="mt-4">
        <OrderSummary lines={order.lines} subtotal={order.subtotal} shippingFee={order.shippingFee} />
      </div>

      <p className="mt-4 text-center text-xs text-subtle">This is a demo order: nothing will be shipped or charged.</p>

      <div className="mt-6 text-center">
        <button
          type="button"
          onClick={onContinueShopping}
          className="rounded-lg bg-accent px-6 py-2.5 text-sm font-medium text-accent-fg transition-colors hover:bg-accent-hover"
        >
          Continue shopping
        </button>
      </div>
    </div>
  )
}

export default OrderConfirmation
