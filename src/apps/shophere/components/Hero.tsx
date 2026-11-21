import HeroCarousel from './HeroCarousel'
import { TagIcon, TruckIcon } from './Icons'

interface HeroProps {
  onShopCategory: (categoryId: string) => void
}

const promos = [
  { icon: TruckIcon, title: 'Free shipping', text: 'On orders over ₱999', categoryId: null },
  { icon: TagIcon, title: 'Up to 30% off', text: 'Home & living deals', categoryId: 'home' },
] as const

function Hero({ onShopCategory }: HeroProps) {
  return (
    <section aria-label="Featured" className="grid gap-3 sm:gap-4 lg:grid-cols-[2fr_1fr]">
      <h1 className="sr-only">ShopHere</h1>
      {/* Main banner: a carousel of featured products */}
      <HeroCarousel onShopCategory={onShopCategory} />

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
