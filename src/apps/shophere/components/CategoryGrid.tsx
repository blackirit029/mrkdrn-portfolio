import { categories } from '../data'
import SectionHeading from './SectionHeading'

interface CategoryGridProps {
  activeId: string | null
  onSelect: (categoryId: string | null) => void
}

function CategoryGrid({ activeId, onSelect }: CategoryGridProps) {
  return (
    <section aria-labelledby="categories-heading">
      <SectionHeading id="categories-heading" title="Categories" subtitle="Browse by what you need" />
      <ul className="grid grid-cols-4 gap-2 sm:gap-3 lg:grid-cols-8">
        {categories.map((category) => {
          const isActive = category.id === activeId
          return (
            <li key={category.id}>
              <button
                type="button"
                onClick={() => onSelect(isActive ? null : category.id)}
                aria-pressed={isActive}
                className={`group flex w-full flex-col items-center gap-2 rounded-xl border bg-card p-2 transition sm:p-3 ${
                  isActive ? 'border-accent ring-1 ring-accent' : 'border-line hover:border-subtle'
                }`}
              >
                <span className="block aspect-square w-full overflow-hidden rounded-lg bg-chip">
                  <img
                    src={category.image}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </span>
                <span
                  className={`text-center text-[11px] leading-tight sm:text-sm ${
                    isActive ? 'font-semibold text-accent-text' : 'text-fg'
                  }`}
                >
                  {category.name}
                </span>
              </button>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export default CategoryGrid
