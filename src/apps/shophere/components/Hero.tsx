import { heroImage, products } from '../data'
import { formatPrice } from '../utils'
import { TagIcon, TruckIcon } from './Icons'

interface HeroProps {
  onShopCategory: (categoryId: string) => void
}

const featured = products[0]

const promos = [
  { icon: TruckIcon, title: 'Free shipping', text: 'On orders over ₱999', categoryId: null },
  { icon: TagIcon, title: 'Up to 30% off', text: 'Home & living deals', categoryId: 'home' },
] as const

function Hero({ onShopCategory }: HeroProps) {
  return (
    <section aria-label="Featured" className="grid gap-3 sm:gap-4 lg:grid-cols-[2fr_1fr]">
      {/* Main banner */}
      <div className="relative isolate overflow-hidden rounded-2xl bg-chip">
        <img
          src={heroImage}
          alt={featured.name}
          width={1400}
          height={900}
          className="absolute inset-0 -z-10 h-full w-full object-cover object-[70%_center]"
          fetchPriority="high"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/80 via-black/50 to-transparent sm:via-black/35" />

        <div className="flex h-80 max-w-sm flex-col justify-center p-6 text-white sm:h-96 sm:p-10 lg:h-[26rem]">
          <span className="w-fit rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur">
            New arrival
          </span>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">Hear every detail.</h1>
          <p className="mt-3 text-sm text-white/80 sm:text-base">
            {featured.name} with 40-hour battery life and active noise cancelling.
          </p>
          <p className="mt-4 flex items-baseline gap-2">
            <span className="text-2xl font-semibold">{formatPrice(featured.price)}</span>
            {featured.originalPrice && (
              <span className="text-sm text-white/60 line-through">{formatPrice(featured.originalPrice)}</span>
            )}
          </p>
          <button
            type="button"
            onClick={() => onShopCategory(featured.categoryId)}
            className="mt-6 w-fit rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-zinc-900 transition-colors hover:bg-white/90"
          >
            Shop electronics
          </button>
        </div>
      </div>

      {/* Side promos: two columns under the banner on phones, stacked beside it on large screens */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-1">
        {promos.map(({ icon: Icon, title, text, categoryId }) => {
          const content = (
            <>
              <span className="grid h-10 w-10 place-items-center rounded-full bg-accent text-accent-fg">
                <Icon />
              </span>
              <div>
                <p className="font-semibold text-fg">{title}</p>
                <p className="mt-0.5 text-xs text-muted sm:text-sm">{text}</p>
              </div>
            </>
          )
          const className =
            'flex flex-col justify-center gap-3 rounded-2xl bg-accent-soft p-4 text-left sm:p-6 lg:flex-row lg:items-center'
          return categoryId ? (
            <button
              key={title}
              type="button"
              onClick={() => onShopCategory(categoryId)}
              className={`${className} transition-transform hover:-translate-y-0.5`}
            >
              {content}
            </button>
          ) : (
            <div key={title} className={className}>
              {content}
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default Hero
