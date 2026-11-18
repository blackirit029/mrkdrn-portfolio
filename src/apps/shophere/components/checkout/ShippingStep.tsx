import { useState, type FormEvent } from 'react'
import { validateDetails } from '../../checkout'
import type { ShippingDetails } from '../../types'

interface ShippingStepProps {
  details: ShippingDetails
  onChange: (details: ShippingDetails) => void
  onNext: () => void
}

type Field = keyof ShippingDetails

const fields: { id: Field; label: string; placeholder: string; autoComplete: string; inputMode?: 'tel' | 'numeric'; span?: boolean }[] = [
  { id: 'fullName', label: 'Full name', placeholder: 'Juan Dela Cruz', autoComplete: 'name' },
  { id: 'phone', label: 'Mobile number', placeholder: '0917 123 4567', autoComplete: 'tel', inputMode: 'tel' },
  { id: 'address', label: 'Street address', placeholder: 'House no., street, barangay', autoComplete: 'street-address', span: true },
  { id: 'city', label: 'City / municipality', placeholder: 'Consolacion', autoComplete: 'address-level2' },
  { id: 'province', label: 'Province', placeholder: 'Cebu', autoComplete: 'address-level1' },
  { id: 'postalCode', label: 'Postal code', placeholder: '6001', autoComplete: 'postal-code', inputMode: 'numeric' },
]

function ShippingStep({ details, onChange, onNext }: ShippingStepProps) {
  // Show errors only for fields the shopper has left, or after they try to continue
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({})
  const [submitted, setSubmitted] = useState(false)
  const errors = validateDetails(details)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    if (Object.keys(errors).length === 0) onNext()
    else document.getElementById(`ship-${Object.keys(errors)[0]}`)?.focus()
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="rounded-xl border border-line bg-card p-4 sm:p-6">
      <h2 className="text-base font-semibold text-fg">Shipping details</h2>
      <p className="mt-0.5 text-sm text-muted">Where should we deliver your order?</p>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {fields.map((field) => {
          const error = (submitted || touched[field.id]) && errors[field.id]
          return (
            <label key={field.id} className={`block ${field.span ? 'sm:col-span-2' : ''}`}>
              <span className="mb-1 block text-xs font-medium text-muted">{field.label}</span>
              <input
                id={`ship-${field.id}`}
                value={details[field.id]}
                onChange={(e) => onChange({ ...details, [field.id]: e.target.value })}
                onBlur={() => setTouched((t) => ({ ...t, [field.id]: true }))}
                placeholder={field.placeholder}
                autoComplete={field.autoComplete}
                inputMode={field.inputMode}
                aria-invalid={Boolean(error)}
                aria-describedby={error ? `ship-${field.id}-error` : undefined}
                className={`h-10 w-full rounded-lg border bg-page px-3 text-sm text-fg placeholder:text-subtle focus:outline-none ${
                  error ? 'border-red-500 focus:border-red-500' : 'border-line focus:border-accent'
                }`}
              />
              {error && (
                <span id={`ship-${field.id}-error`} className="mt-1 block text-xs text-red-600 dark:text-red-400">
                  {error}
                </span>
              )}
            </label>
          )
        })}
      </div>

      <div className="mt-6 flex justify-end">
        <button
          type="submit"
          className="w-full rounded-lg bg-accent px-6 py-2.5 text-sm font-medium text-accent-fg transition-colors hover:bg-accent-hover sm:w-auto"
        >
          Continue to delivery
        </button>
      </div>
    </form>
  )
}

export default ShippingStep
