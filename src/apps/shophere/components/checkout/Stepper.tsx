import { CheckIcon } from '../Icons'

interface StepperProps {
  steps: string[]
  current: number
  /** Completed steps can be revisited */
  onSelect: (index: number) => void
}

function Stepper({ steps, current, onSelect }: StepperProps) {
  return (
    <ol className="flex items-center gap-2 text-sm sm:gap-3" aria-label="Checkout progress">
      {steps.map((label, index) => {
        const isDone = index < current
        const isCurrent = index === current
        return (
          <li
            key={label}
            className={`flex min-w-0 items-center gap-2 sm:gap-3 ${index < steps.length - 1 ? 'flex-1' : 'shrink-0'}`}
          >
            <button
              type="button"
              disabled={!isDone}
              onClick={() => onSelect(index)}
              aria-current={isCurrent ? 'step' : undefined}
              className="flex min-w-0 items-center gap-2 disabled:cursor-default"
            >
              <span
                className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-semibold transition-colors ${
                  isDone
                    ? 'bg-accent text-accent-fg'
                    : isCurrent
                      ? 'border-2 border-accent text-accent-text'
                      : 'border border-line text-subtle'
                }`}
              >
                {isDone ? <CheckIcon className="h-3.5 w-3.5" /> : index + 1}
              </span>
              <span
                className={`truncate ${isCurrent ? 'font-medium text-fg' : isDone ? 'text-fg hover:underline' : 'text-subtle'} ${
                  isCurrent ? '' : 'hidden sm:inline'
                }`}
              >
                {label}
              </span>
            </button>
            {index < steps.length - 1 && (
              <span aria-hidden className={`h-px flex-1 ${isDone ? 'bg-accent' : 'bg-line'}`} />
            )}
          </li>
        )
      })}
    </ol>
  )
}

export default Stepper
