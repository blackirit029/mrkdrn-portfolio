import { products } from './data'
import type { Cart, CartLine, DeliveryOption, PaymentMethod, ShippingDetails } from './types'

export const FREE_SHIPPING_MIN = 999

export const deliveryOptions: Record<DeliveryOption, { label: string; eta: string; days: [number, number]; fee: number }> = {
  standard: { label: 'Standard', eta: '3–5 business days', days: [3, 5], fee: 79 },
  express: { label: 'Express', eta: '1–2 business days', days: [1, 2], fee: 149 },
}

export const paymentOptions: Record<PaymentMethod, { label: string; description: string }> = {
  cod: { label: 'Cash on delivery', description: 'Pay the courier when your order arrives.' },
  gcash: { label: 'GCash', description: 'Pay with your e-wallet after placing the order.' },
  card: { label: 'Credit / debit card', description: 'Visa or Mastercard, confirmed after placing the order.' },
}

export const emptyDetails: ShippingDetails = {
  fullName: '',
  phone: '',
  address: '',
  city: '',
  province: '',
  postalCode: '',
}

export const cartLines = (cart: Cart): CartLine[] =>
  products.filter((p) => cart[p.id]).map((product) => ({ product, qty: cart[product.id] }))

export const subtotalOf = (lines: CartLine[]) => lines.reduce((sum, line) => sum + line.qty * line.product.price, 0)

/** Standard shipping is free over the minimum; express always costs extra */
export const shippingFeeFor = (subtotal: number, delivery: DeliveryOption) =>
  delivery === 'standard' && subtotal >= FREE_SHIPPING_MIN ? 0 : deliveryOptions[delivery].fee

export function validateDetails(details: ShippingDetails) {
  const errors: Partial<Record<keyof ShippingDetails, string>> = {}
  if (details.fullName.trim().length < 2) errors.fullName = 'Enter your full name.'
  if (!/^(09|\+639)\d{9}$/.test(details.phone.replace(/[\s-]/g, ''))) errors.phone = 'Enter a mobile number like 0917 123 4567.'
  if (details.address.trim().length < 5) errors.address = 'Enter your street address.'
  if (!details.city.trim()) errors.city = 'Enter your city.'
  if (!details.province.trim()) errors.province = 'Enter your province.'
  if (!/^\d{4}$/.test(details.postalCode.trim())) errors.postalCode = 'Postal codes have 4 digits.'
  return errors
}

/** e.g. "Nov 24 – Nov 26", counting business days from today */
export function deliveryWindow(delivery: DeliveryOption, from = new Date()) {
  const addBusinessDays = (days: number) => {
    const date = new Date(from)
    let added = 0
    while (added < days) {
      date.setDate(date.getDate() + 1)
      if (date.getDay() !== 0 && date.getDay() !== 6) added++
    }
    return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
  }
  const [min, max] = deliveryOptions[delivery].days
  return `${addBusinessDays(min)} – ${addBusinessDays(max)}`
}

export const createOrderId = () => `SH-${Date.now().toString(36).toUpperCase().slice(-6)}`
