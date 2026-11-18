export interface Category {
  id: string
  name: string
  image: string
}

export interface Product {
  id: string
  name: string
  categoryId: string
  price: number
  originalPrice?: number
  rating: number
  sold: number
  location: string
  image: string
}

/** Product id → quantity */
export type Cart = Record<string, number>

export type SortOption = 'popular' | 'rating' | 'price-asc' | 'price-desc'

export const VIEWS = ['shop', 'checkout'] as const
export type View = (typeof VIEWS)[number]

export interface ShippingDetails {
  fullName: string
  phone: string
  address: string
  city: string
  province: string
  postalCode: string
}

export type DeliveryOption = 'standard' | 'express'
export type PaymentMethod = 'cod' | 'gcash' | 'card'

export interface CartLine {
  product: Product
  qty: number
}

export interface Order {
  id: string
  lines: CartLine[]
  subtotal: number
  shippingFee: number
  total: number
  details: ShippingDetails
  delivery: DeliveryOption
  payment: PaymentMethod
  placedAt: string
}
