import type { Cart, Product, SortOption } from '../types'
import { categoryName } from '../data'
import { CloseIcon } from './Icons'
import InfiniteProductGrid from './InfiniteProductGrid'
import SectionHeading from './SectionHeading'

interface ProductListProps {
  products: Product[]
  query: string
  categoryId: string | null
  sort: SortOption
  cart: Cart
  onSortChange: (sort: SortOption) => void
  onClearQuery: () => void
  onClearCategory: () => void
  onAddToCart: (id: string) => void
}

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'popular', label: 'Most popular' },
  { value: 'rating', label: 'Top rated' },
  { value: 'price-asc', label: 'Price: low to high' },
  { value: 'price-desc', label: 'Price: high to low' },
]

function FilterChip({ label, onClear }: { label: string; onClear: () => void }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-accent-soft py-1 pr-1.5 pl-3 text-xs font-medium text-accent-text">
      {label}
      <button type="button" onClick={onClear} aria-label={`Remove filter ${label}`} className="rounded-full p-0.5 hover:bg-accent/15">
        <CloseIcon className="h-3 w-3" />
      </button>
    </span>
  )
}

function ProductList({
  products,
  query,
  categoryId,
  sort,
  cart,
  onSortChange,
  onClearQuery,
  onClearCategory,
  onAddToCart,
}: ProductListProps) {
  const hasFilters = Boolean(query.trim() || categoryId)

  return (
    <section id="products" aria-labelledby="products-heading" className="scroll-mt-36 md:scroll-mt-24">
      <SectionHeading
        id="products-heading"
        title="Discover Products"
        subtitle={`${products.length} ${products.length === 1 ? 'item' : 'items'}`}
        action={
          <label className="flex items-center gap-2 text-sm text-muted">
            <span className="hidden sm:inline">Sort by</span>
            <select
              value={sort}
              onChange={(e) => onSortChange(e.target.value as SortOption)}
              aria-label="Sort products"
              className="h-9 rounded-lg border border-line bg-card px-2 text-sm text-fg focus:border-accent focus:outline-none"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        }
      />

      {hasFilters && (
        <div className="mb-4 flex flex-wrap items-center gap-2">
          {query.trim() && <FilterChip label={`"${query.trim()}"`} onClear={onClearQuery} />}
          {categoryId && <FilterChip label={categoryName(categoryId)} onClear={onClearCategory} />}
        </div>
      )}

      {products.length === 0 ? (
        <div className="rounded-xl border border-dashed border-line px-6 py-16 text-center">
          <p className="font-medium text-fg">No products found</p>
          <p className="mt-1 text-sm text-muted">Try a different search or category.</p>
          <button
            type="button"
            onClick={() => {
              onClearQuery()
              onClearCategory()
            }}
            className="mt-4 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-accent-fg hover:bg-accent-hover"
          >
            Show all products
          </button>
        </div>
      ) : (
        // Keyed by the filters so a new search, category or sort starts again from the first page
        <InfiniteProductGrid key={`${query.trim()}|${categoryId}|${sort}`} products={products} cart={cart} onAddToCart={onAddToCart} />
      )}
    </section>
  )
}

export default ProductList
