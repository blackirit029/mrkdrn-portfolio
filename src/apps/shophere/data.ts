import type { Category, Product } from './types'

// Photos from Unsplash (free to use), stored in public/shophere
const img = (name: string) => `/shophere/products/${name}.jpg`

export const heroImage = '/shophere/hero.jpg'

export const categories: Category[] = [
  { id: 'electronics', name: 'Electronics', image: img('headphones') },
  { id: 'fashion', name: 'Fashion', image: img('tshirt') },
  { id: 'shoes', name: 'Shoes', image: img('sneakers') },
  { id: 'bags', name: 'Bags', image: img('backpack') },
  { id: 'beauty', name: 'Beauty', image: img('skincare') },
  { id: 'home', name: 'Home & Living', image: img('lamp') },
  { id: 'watches', name: 'Watches', image: img('watch') },
  { id: 'eyewear', name: 'Eyewear', image: img('sunglasses') },
]

export const products: Product[] = [
  { id: 'p1', name: 'Over-Ear Wireless Headphones', categoryId: 'electronics', price: 2499, originalPrice: 3999, rating: 4.8, sold: 12400, location: 'Cebu City', image: img('headphones') },
  { id: 'p2', name: 'Minimalist Smartwatch with Fitness Tracking', categoryId: 'watches', price: 3299, originalPrice: 4599, rating: 4.6, sold: 5300, location: 'Makati', image: img('watch') },
  { id: 'p3', name: 'Lightweight Running Shoes', categoryId: 'shoes', price: 2899, originalPrice: 3599, rating: 4.7, sold: 8900, location: 'Quezon City', image: img('sneakers') },
  { id: 'p4', name: 'Instant Film Camera', categoryId: 'electronics', price: 4590, originalPrice: 5490, rating: 4.8, sold: 2100, location: 'Pasig', image: img('camera') },
  { id: 'p5', name: 'Classic Polarized Sunglasses', categoryId: 'eyewear', price: 899, originalPrice: 1499, rating: 4.5, sold: 7600, location: 'Davao City', image: img('sunglasses') },
  { id: 'p6', name: 'Daily Hydrating Moisturizer 50ml', categoryId: 'beauty', price: 449, originalPrice: 599, rating: 4.6, sold: 15200, location: 'Mandaue', image: img('skincare') },
  { id: 'p7', name: 'Everyday Laptop Backpack', categoryId: 'bags', price: 1299, originalPrice: 1899, rating: 4.7, sold: 9800, location: 'Cebu City', image: img('backpack') },
  { id: 'p8', name: 'Ultrathin 13" Laptop, 16GB RAM', categoryId: 'electronics', price: 45990, originalPrice: 52990, rating: 4.9, sold: 860, location: 'Taguig', image: img('laptop') },
  { id: 'p9', name: 'Essential Cotton Tee', categoryId: 'fashion', price: 299, originalPrice: 449, rating: 4.4, sold: 21000, location: 'Manila', image: img('tshirt') },
  { id: 'p10', name: 'Ceramic Coffee Mug 350ml', categoryId: 'home', price: 199, rating: 4.5, sold: 6400, location: 'Lapu-Lapu', image: img('mug') },
  { id: 'p11', name: 'Adjustable Desk Lamp', categoryId: 'home', price: 1099, originalPrice: 1499, rating: 4.6, sold: 3200, location: 'Iloilo City', image: img('lamp') },
  { id: 'p12', name: 'Slim Wireless Keyboard', categoryId: 'electronics', price: 1599, originalPrice: 1999, rating: 4.5, sold: 4100, location: 'Quezon City', image: img('keyboard') },
  { id: 'p13', name: 'Succulent in Ceramic Pot', categoryId: 'home', price: 249, rating: 4.8, sold: 5600, location: 'Baguio', image: img('plant') },
  { id: 'p14', name: 'Eau de Parfum 100ml', categoryId: 'beauty', price: 3899, originalPrice: 4500, rating: 4.7, sold: 1900, location: 'Makati', image: img('perfume') },
  { id: 'p15', name: 'Wooden Bar Stool', categoryId: 'home', price: 1799, originalPrice: 2199, rating: 4.3, sold: 1200, location: 'Consolacion', image: img('chair') },
]

/** Best sellers, ranked by units sold */
export const topProducts = [...products].sort((a, b) => b.sold - a.sold).slice(0, 6)

export const categoryName = (id: string) => categories.find((c) => c.id === id)?.name ?? id
