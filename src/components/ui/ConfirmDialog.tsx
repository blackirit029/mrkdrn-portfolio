import { useEffect, useRef } from 'react'

const WarningIcon = () => (
  <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24" aria-hidden>
    <path strokeLinejoin="round" d="M12 3.5 2.5 20h19L12 3.5Z" />
    <path strokeLinecap="round" d="M12 10v4.5m0 2.5v.01" />
  </svg>
)

interface ConfirmDialogProps {
  open: boolean
  title: string
  description: string
  confirmLabel?: string
  onConfirm: () => void
  onCancel: () => void
}

/**
 * Modal confirmation for destructive actions, built on the native <dialog>:
 * focus stays inside it, Escape cancels, clicking the backdrop cancels,
 * and Cancel is focused first so the safe choice is the default.
 */
function ConfirmDialog({ open, title, description, confirmLabel = 'Delete', onConfirm, onCancel }: ConfirmDialogProps) {
  const ref = useRef<HTMLDialogElement>(null)
  const cancelRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (open && !dialog.open) {
      dialog.showModal()
      cancelRef.current?.focus()
    } else if (!open && dialog.open) {
      dialog.close()
    }
  }, [open])

  return (
    <dialog
      ref={ref}
      aria-labelledby="confirm-title"
      aria-describedby="confirm-description"
      // Escape key: the browser fires "cancel"; keep React state in charge of closing
      onCancel={(e) => {
        e.preventDefault()
        onCancel()
      }}
      // A click on the dialog element itself (not its content) is a click on the backdrop
      onClick={(e) => e.target === ref.current && onCancel()}
      className="m-auto w-[calc(100%-2rem)] max-w-sm rounded-xl border border-line bg-card p-0 text-fg shadow-2xl backdrop:bg-black/40 backdrop:backdrop-blur-sm open:motion-safe:animate-pop-in dark:shadow-black/60"
    >
      <div className="p-5 sm:p-6">
        <div className="flex gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-red-50 text-red-600 dark:bg-red-500/15 dark:text-red-400">
            <WarningIcon />
          </span>
          <div className="min-w-0">
            <h2 id="confirm-title" className="font-semibold text-fg">
              {title}
            </h2>
            <p id="confirm-description" className="mt-1 text-sm break-words text-muted">
              {description}
            </p>
          </div>
        </div>
        <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <button
            ref={cancelRef}
            type="button"
            onClick={onCancel}
            className="rounded-md border border-line px-4 py-2 text-sm font-medium text-fg transition-colors hover:bg-chip"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </dialog>
  )
}

export default ConfirmDialog
