import { deliveryOptions, deliveryWindow, paymentOptions, shippingFeeFor } from '../../checkout'
import type { DeliveryOption, PaymentMethod } from '../../types'
import { formatPrice } from '../../utils'
import OptionCard from './OptionCard'

interface PaymentStepProps {
  subtotal: number
  delivery: DeliveryOption
  payment: PaymentMethod
  onDeliveryChange: (delivery: DeliveryOption) => void
  onPaymentChange: (payment: PaymentMethod) => void
  onBack: () => void
  onNext: () => void
}

function PaymentStep({ subtotal, delivery, payment, onDeliveryChange, onPaymentChange, onBack, onNext }: PaymentStepProps) {
  return (
    <div className="rounded-xl border border-line bg-card p-4 sm:p-6">
      <fieldset>
        <legend className="text-base font-semibold text-fg">Delivery</legend>
        <div className="mt-4 grid gap-3">
          {(Object.keys(deliveryOptions) as DeliveryOption[]).map((option) => {
            const fee = shippingFeeFor(subtotal, option)
            return (
              <OptionCard
                key={option}
                name="delivery"
                value={option}
                checked={delivery === option}
                onSelect={() => onDeliveryChange(option)}
                title={`${deliveryOptions[option].label} · ${deliveryOptions[option].eta}`}
                description={`Arrives ${deliveryWindow(option)}`}
                aside={fee === 0 ? 'Free' : formatPrice(fee)}
              />
            )
          })}
        </div>
      </fieldset>

      <fieldset className="mt-8">
        <legend className="text-base font-semibold text-fg">Payment method</legend>
        <div className="mt-4 grid gap-3">
          {(Object.keys(paymentOptions) as PaymentMethod[]).map((option) => (
            <OptionCard
              key={option}
              name="payment"
              value={option}
              checked={payment === option}
              onSelect={() => onPaymentChange(option)}
              title={paymentOptions[option].label}
              description={paymentOptions[option].description}
            />
          ))}
        </div>
        <p className="mt-3 text-xs text-subtle">This is a demo store: no payment details are asked for and nothing is charged.</p>
      </fieldset>

      <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
        <button type="button" onClick={onBack} className="rounded-lg px-4 py-2.5 text-sm text-muted hover:bg-chip hover:text-fg">
          ← Back to shipping
        </button>
        <button
          type="button"
          onClick={onNext}
          className="rounded-lg bg-accent px-6 py-2.5 text-sm font-medium text-accent-fg transition-colors hover:bg-accent-hover"
        >
          Review order
        </button>
      </div>
    </div>
  )
}

export default PaymentStep
