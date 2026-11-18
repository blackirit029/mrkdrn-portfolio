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
