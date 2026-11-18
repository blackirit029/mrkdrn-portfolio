import Tag from './Tag'

interface SkillListProps {
  title: string
  items: string[]
}

function SkillList({ title, items }: SkillListProps) {
  return (
    <div>
      <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-subtle">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <Tag key={item} label={item} />
        ))}
      </div>
    </div>
  )
}

export default SkillList
