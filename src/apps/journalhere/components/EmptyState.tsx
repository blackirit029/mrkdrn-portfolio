interface EmptyStateProps {
  title: string
  description: string
}

function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="rounded-lg border border-dashed border-line px-6 py-12 text-center">
      <p className="font-medium text-fg">{title}</p>
      <p className="mt-1 text-sm text-muted">{description}</p>
    </div>
  )
}

export default EmptyState
