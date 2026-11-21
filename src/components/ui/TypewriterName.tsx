import { useTypewriter } from '../../hooks/useTypewriter'

interface TypewriterNameProps {
  name: string
}

/**
 * The name types itself out, deletes back to the first name, and types again, endlessly.
 * Screen readers get the full name once; the animated text is hidden from them.
 */
function TypewriterName({ name }: TypewriterNameProps) {
  const firstName = name.split(' ')[0]
  const { visible, idle } = useTypewriter(name, { keep: firstName.length })

  return (
    <>
      <span className="sr-only">{name}</span>
      <span aria-hidden className="inline-flex items-center whitespace-pre">
        {visible}
        <span
          className={`ml-0.5 inline-block h-[1.1em] w-0.5 rounded-full bg-current ${idle ? 'motion-safe:animate-caret' : ''}`}
        />
      </span>
    </>
  )
}

export default TypewriterName
