import { useMemo, useState } from 'react'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import CategoryGrid from './components/CategoryGrid'
import Header from './components/Header'
import Hero from './components/Hero'
import ProductList from './components/ProductList'
import TopProducts from './components/TopProducts'
import { categoryName, products } from './data'
import type { Cart, SortOption } from './types'

const sorters: Record<SortOption, (a: (typeof products)[number], b: (typeof products)[number]) => number> = {
  popular: (a, b) => b.sold - a.sold,
  rating: (a, b) => b.rating - a.rating || b.sold - a.sold,
  'price-asc': (a, b) => a.price - b.price,
  'price-desc': (a, b) => b.price - a.price,
}

const scrollToProducts = () => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })

function App() {
  const [query, setQuery] = useState('')
  const [categoryId, setCategoryId] = useState<string | null>(null)
  const [sort, setSort] = useState<SortOption>('popular')
  const [cart, setCart] = useLocalStorage<Cart>('shophere:cart', {})

  const visibleProducts = useMemo(() => {
    const q = query.trim().toLowerCase()
    return products
      .filter((p) => !categoryId || p.categoryId === categoryId)
      .filter((p) => !q || `${p.name} ${categoryName(p.categoryId)}`.toLowerCase().includes(q))
      .sort(sorters[sort])
  }, [query, categoryId, sort])

  const addToCart = (id: string) => setCart((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }))
  const removeFromCart = (id: string) =>
    setCart((prev) => Object.fromEntries(Object.entries(prev).filter(([key]) => key !== id)))

  const selectCategory = (id: string | null) => {
    setCategoryId(id)
    if (id) scrollToProducts()
  }

  return (
    <div id="top" className="flex min-h-screen flex-col">
      <Header
        query={query}
        onQueryChange={setQuery}
        onSearch={scrollToProducts}
        cart={cart}
        onRemoveFromCart={removeFromCart}
        onClearCart={() => setCart({})}
      />

      <main className="mx-auto w-full max-w-6xl flex-1 space-y-10 px-4 py-5 motion-safe:animate-fade-in sm:space-y-14 sm:px-6 sm:py-8">
        <Hero onShopCategory={selectCategory} />
        <CategoryGrid activeId={categoryId} onSelect={selectCategory} />
        <TopProducts onAddToCart={addToCart} />
        <ProductList
          products={visibleProducts}
          query={query}
          categoryId={categoryId}
          sort={sort}
          cart={cart}
          onSortChange={setSort}
          onClearQuery={() => setQuery('')}
          onClearCategory={() => setCategoryId(null)}
          onAddToCart={addToCart}
        />
      </main>

      <footer className="mt-16 border-t border-line-soft">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-6 text-xs text-subtle sm:flex-row sm:px-6">
          <p>ShopHere is a demo store. No real orders are placed.</p>
          <p>Photos from Unsplash</p>
        </div>
      </footer>
    </div>
  )
}

export default App
