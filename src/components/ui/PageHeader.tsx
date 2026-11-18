interface PageHeaderProps {
  title: string
  subtitle?: string
}

function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <header className="mb-12">
      <h2 className="text-3xl font-semibold tracking-tight text-fg sm:text-4xl">{title}</h2>
      {subtitle && <p className="mt-3 text-muted">{subtitle}</p>}
    </header>
  )
}

export default PageHeader
