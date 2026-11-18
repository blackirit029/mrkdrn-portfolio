import { topProducts } from '../data'
import { formatPrice, formatSold } from '../utils'
import { PlusIcon } from './Icons'
import SectionHeading from './SectionHeading'

interface TopProductsProps {
  onAddToCart: (id: string) => void
}

function TopProducts({ onAddToCart }: TopProductsProps) {
  return (
    <section aria-labelledby="top-heading">
      <SectionHeading id="top-heading" title="Top Products" subtitle="Best sellers this month" />
      {/* Swipeable row on small screens, a single row of six from lg up */}
      <ol className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:px-6 lg:mx-0 lg:grid lg:grid-cols-6 lg:overflow-visible lg:px-0 lg:pb-0">
        {topProducts.map((product, index) => (
          <li
            key={product.id}
            className="group relative w-40 shrink-0 snap-start overflow-hidden rounded-xl border border-line bg-card sm:w-44 lg:w-auto"
          >
            <div className="relative aspect-square overflow-hidden bg-chip">
              <img
                src={product.image}
                alt={product.name}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <span className="absolute top-0 left-0 rounded-br-lg bg-accent px-2 py-1 text-[11px] font-bold tracking-wide text-accent-fg">
                TOP {index + 1}
              </span>
            </div>
            <div className="p-3">
              <p className="truncate text-sm text-fg" title={product.name}>
                {product.name}
              </p>
              <div className="mt-1 flex items-center justify-between gap-2">
                <div>
                  <p className="text-sm font-semibold text-accent-text">{formatPrice(product.price)}</p>
                  <p className="text-xs text-muted">{formatSold(product.sold)} sold</p>
                </div>
                <button
                  type="button"
                  onClick={() => onAddToCart(product.id)}
                  aria-label={`Add ${product.name} to cart`}
                  className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-line text-fg transition-colors hover:border-accent hover:bg-accent hover:text-accent-fg"
                >
                  <PlusIcon />
                </button>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}

export default TopProducts
