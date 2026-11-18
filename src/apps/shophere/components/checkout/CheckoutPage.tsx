import { useEffect, useRef, useState } from 'react'
import { useLocalStorage } from '../../../../hooks/useLocalStorage'
import { cartLines, createOrderId, emptyDetails, shippingFeeFor, subtotalOf } from '../../checkout'
import type { Cart, DeliveryOption, Order, PaymentMethod, ShippingDetails } from '../../types'
import OrderConfirmation from './OrderConfirmation'
import OrderSummary from './OrderSummary'
import PaymentStep from './PaymentStep'
import ReviewStep from './ReviewStep'
import ShippingStep from './ShippingStep'
import Stepper from './Stepper'

interface CheckoutPageProps {
  cart: Cart
  onQuantityChange: (id: string, qty: number) => void
  onRemove: (id: string) => void
  onOrderPlaced: () => void
  onContinueShopping: () => void
}

const STEPS = ['Shipping', 'Delivery & payment', 'Review']

function CheckoutPage({ cart, onQuantityChange, onRemove, onOrderPlaced, onContinueShopping }: CheckoutPageProps) {
  const [step, setStep] = useState(0)
  // Remembered so returning shoppers don't retype their address
  const [details, setDetails] = useLocalStorage<ShippingDetails>('shophere:shipping', emptyDetails)
  const [delivery, setDelivery] = useState<DeliveryOption>('standard')
  const [payment, setPayment] = useState<PaymentMethod>('cod')
  const [isPlacing, setIsPlacing] = useState(false)
  const [order, setOrder] = useState<Order | null>(null)
  const timer = useRef<number | undefined>(undefined)

  const lines = cartLines(cart)
  const subtotal = subtotalOf(lines)
  const shippingFee = shippingFeeFor(subtotal, delivery)

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const goTo = (next: number) => {
    setStep(next)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const placeOrder = () => {
    setIsPlacing(true)
    // Simulated processing delay
    timer.current = window.setTimeout(() => {
      setOrder({
        id: createOrderId(),
        lines,
        subtotal,
        shippingFee,
        total: subtotal + shippingFee,
        details,
        delivery,
        payment,
        placedAt: new Date().toISOString(),
      })
      setIsPlacing(false)
      onOrderPlaced()
      window.scrollTo({ top: 0 })
    }, 1200)
  }

  if (order) return <OrderConfirmation order={order} onContinueShopping={onContinueShopping} />

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-md rounded-xl border border-dashed border-line px-6 py-16 text-center">
        <p className="font-medium text-fg">Your cart is empty</p>
        <p className="mt-1 text-sm text-muted">Add a few products before checking out.</p>
        <button
          type="button"
          onClick={onContinueShopping}
          className="mt-5 rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-accent-fg hover:bg-accent-hover"
        >
          Browse products
        </button>
      </div>
    )
  }

  return (
    <>
      <h1 className="text-2xl font-semibold tracking-tight text-fg">Checkout</h1>
      <div className="mt-5 max-w-xl">
        <Stepper steps={STEPS} current={step} onSelect={goTo} />
      </div>

      <div className="mt-6 grid items-start gap-6 lg:grid-cols-[1fr_22rem]">
        <div key={step} className="motion-safe:animate-fade-in">
          {step === 0 && <ShippingStep details={details} onChange={setDetails} onNext={() => goTo(1)} />}
          {step === 1 && (
            <PaymentStep
              subtotal={subtotal}
              delivery={delivery}
              payment={payment}
              onDeliveryChange={setDelivery}
              onPaymentChange={setPayment}
              onBack={() => goTo(0)}
              onNext={() => goTo(2)}
            />
          )}
          {step === 2 && (
            <ReviewStep
              details={details}
              delivery={delivery}
              payment={payment}
              total={subtotal + shippingFee}
              isPlacing={isPlacing}
              onEdit={goTo}
              onBack={() => goTo(1)}
              onPlaceOrder={placeOrder}
            />
          )}
        </div>

        <div className="lg:sticky lg:top-24">
          <OrderSummary
            lines={lines}
            subtotal={subtotal}
            shippingFee={step === 0 ? null : shippingFee}
            onQuantityChange={isPlacing ? undefined : onQuantityChange}
            onRemove={isPlacing ? undefined : onRemove}
          />
        </div>
      </div>
    </>
  )
}

export default CheckoutPage
