import type { ReactNode } from 'react'

interface SectionHeadingProps {
  id: string
  title: string
  subtitle?: string
  action?: ReactNode
}

function SectionHeading({ id, title, subtitle, action }: SectionHeadingProps) {
  return (
    <div className="mb-4 flex flex-wrap items-end justify-between gap-3 sm:mb-5">
      <div>
        <h2 id={id} className="text-lg font-semibold tracking-tight text-fg sm:text-xl">
          {title}
        </h2>
        {subtitle && <p className="mt-0.5 text-sm text-muted">{subtitle}</p>}
      </div>
      {action}
    </div>
  )
}

export default SectionHeading
