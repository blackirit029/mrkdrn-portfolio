import { withBase } from '../../lib/withBase'
import type { Category, Product } from './types'

// Photos from Unsplash (free to use), stored in public/shophere
const img = (name: string) => withBase(`shophere/products/${name}.jpg`)

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
  { id: 'p16', name: 'Leather Top-Handle Bag', categoryId: 'bags', price: 2499, originalPrice: 3299, rating: 4.6, sold: 2700, location: 'Makati', image: img('bag-red') },
  { id: 'p17', name: 'Restorative Hair Mask 200ml', categoryId: 'beauty', price: 599, originalPrice: 799, rating: 4.5, sold: 4300, location: 'Quezon City', image: img('hair-mask') },
  { id: 'p18', name: 'True Wireless Earbuds with Charging Case', categoryId: 'electronics', price: 1899, originalPrice: 2799, rating: 4.7, sold: 10800, location: 'Cebu City', image: img('earbuds') },
  { id: 'p19', name: 'Relaxed Jogger Pants', categoryId: 'fashion', price: 699, originalPrice: 999, rating: 4.4, sold: 6100, location: 'Manila', image: img('joggers') },
  { id: 'p20', name: 'Studio Wireless Headphones', categoryId: 'electronics', price: 3499, originalPrice: 4299, rating: 4.6, sold: 3900, location: 'Pasig', image: img('headphones-studio') },
  { id: 'p21', name: 'Suede Bomber Jacket', categoryId: 'fashion', price: 1899, originalPrice: 2599, rating: 4.5, sold: 2200, location: 'Taguig', image: img('jacket') },
  { id: 'p22', name: 'Slim Fit Denim Jeans', categoryId: 'fashion', price: 1099, originalPrice: 1499, rating: 4.6, sold: 8700, location: 'Mandaue', image: img('jeans') },
  { id: 'p23', name: '15" Everyday Laptop, 8GB RAM', categoryId: 'electronics', price: 32990, originalPrice: 36990, rating: 4.7, sold: 640, location: 'Davao City', image: img('laptop-everyday') },
  { id: 'p24', name: 'Smartphone 128GB, Dual Camera', categoryId: 'electronics', price: 18990, originalPrice: 21990, rating: 4.8, sold: 2400, location: 'Quezon City', image: img('smartphone') },
  { id: 'p25', name: 'Knit Running Sneakers', categoryId: 'shoes', price: 2399, originalPrice: 2999, rating: 4.6, sold: 5200, location: 'Lapu-Lapu', image: img('sneakers-knit') },
  { id: 'p26', name: 'Suede Derby Shoes', categoryId: 'shoes', price: 2799, rating: 4.5, sold: 1300, location: 'Iloilo City', image: img('derby-shoes') },
  { id: 'p27', name: 'Velvet 3-Seater Sofa', categoryId: 'home', price: 18990, originalPrice: 22990, rating: 4.7, sold: 310, location: 'Consolacion', image: img('sofa') },
  { id: 'p28', name: 'Round Metal Sunglasses', categoryId: 'eyewear', price: 799, originalPrice: 1199, rating: 4.4, sold: 3600, location: 'Baguio', image: img('sunglasses-round') },
  { id: 'p29', name: 'Graphic Logo Tee', categoryId: 'fashion', price: 399, originalPrice: 549, rating: 4.5, sold: 9400, location: 'Cebu City', image: img('tee-black') },
  { id: 'p30', name: 'Chronograph Leather Watch', categoryId: 'watches', price: 4590, originalPrice: 5990, rating: 4.7, sold: 1800, location: 'Makati', image: img('watch-chrono') },
]

/** Hero carousel: each slide features a product and shops its category */
export interface HeroSlide {
  id: string
  image: string
  eyebrow: string
  headline: string
  description: string
  productId: string
  cta: { label: string; categoryId: string }
  /** Keeps the product in view behind the text on wide crops */
  objectPosition?: string
}

export const heroSlides: HeroSlide[] = [
  {
    id: 'audio',
    image: withBase('shophere/hero.jpg'),
    eyebrow: 'New arrival',
    headline: 'Hear every detail.',
    description: 'Over-ear wireless headphones with 40-hour battery life and active noise cancelling.',
    productId: 'p1',
    cta: { label: 'Shop electronics', categoryId: 'electronics' },
    objectPosition: '70% center',
  },
  {
    id: 'run',
    image: withBase('shophere/hero-sneakers.jpg'),
    eyebrow: 'Best seller',
    headline: 'Run lighter, go further.',
    description: 'Breathable knit uppers and a responsive sole for everyday miles.',
    productId: 'p3',
    cta: { label: 'Shop shoes', categoryId: 'shoes' },
    objectPosition: '75% center',
  },
  {
    id: 'time',
    image: withBase('shophere/hero-watch.jpg'),
    eyebrow: 'Up to 28% off',
    headline: 'Time, beautifully simple.',
    description: 'A minimalist smartwatch with fitness tracking and a week of battery.',
    productId: 'p2',
    cta: { label: 'Shop watches', categoryId: 'watches' },
    objectPosition: '80% center',
  },
  {
    id: 'capture',
    image: withBase('shophere/hero-camera.jpg'),
    eyebrow: 'Just landed',
    headline: 'Print the moment.',
    description: 'An instant film camera that turns everyday snapshots into keepsakes.',
    productId: 'p4',
    cta: { label: 'Shop electronics', categoryId: 'electronics' },
    objectPosition: '75% center',
  },
  {
    id: 'glow',
    image: withBase('shophere/hero-skincare.jpg'),
    eyebrow: 'Self-care week',
    headline: 'Your daily glow.',
    description: 'Lightweight hydration that keeps skin soft from morning to night.',
    productId: 'p6',
    cta: { label: 'Shop beauty', categoryId: 'beauty' },
    objectPosition: '65% center',
  },
]

/** Best sellers, ranked by units sold */
export const topProducts = [...products].sort((a, b) => b.sold - a.sold).slice(0, 6)

export const categoryName = (id: string) => categories.find((c) => c.id === id)?.name ?? id
