import type { Product } from '../types'
import { discountPercent, formatPrice, formatSold } from '../utils'
import { StarIcon } from './Icons'

interface ProductCardProps {
  product: Product
  quantityInCart: number
  onAddToCart: (id: string) => void
}

function ProductCard({ product, quantityInCart, onAddToCart }: ProductCardProps) {
  const discount = discountPercent(product.price, product.originalPrice)
  const inCart = quantityInCart > 0

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-line bg-card transition hover:-translate-y-0.5 hover:shadow-md dark:hover:shadow-black/40">
      <div className="relative aspect-square overflow-hidden bg-chip">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={600}
          height={600}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {discount > 0 && (
          <span className="absolute top-2 right-2 rounded-md bg-accent px-1.5 py-0.5 text-[11px] font-semibold text-accent-fg">
            -{discount}%
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-3">
        <h3 className="line-clamp-2 min-h-10 text-sm leading-5 text-fg">{product.name}</h3>

        <p className="mt-2 flex flex-wrap items-baseline gap-x-1.5">
          <span className="font-semibold text-accent-text">{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <span className="text-xs text-subtle line-through">{formatPrice(product.originalPrice)}</span>
          )}
        </p>

        <div className="mt-1.5 flex items-center gap-1.5 text-xs text-muted">
          <StarIcon className="h-3.5 w-3.5 text-amber-400" />
          <span>{product.rating.toFixed(1)}</span>
          <span className="text-line" aria-hidden>
            |
          </span>
          <span>{formatSold(product.sold)} sold</span>
        </div>
        <p className="mt-1 flex-1 text-xs text-subtle">{product.location}</p>

        <button
          type="button"
          onClick={() => onAddToCart(product.id)}
          className={`mt-3 w-full rounded-lg border py-1.5 text-xs font-medium transition-colors sm:text-sm ${
            inCart
              ? 'border-accent bg-accent-soft text-accent-text'
              : 'border-line text-fg hover:border-accent hover:bg-accent hover:text-accent-fg'
          }`}
        >
          {inCart ? `In cart (${quantityInCart}) · Add more` : 'Add to cart'}
        </button>
      </div>
    </article>
  )
}

export default ProductCard
