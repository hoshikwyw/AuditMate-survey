import type { Lang } from '../config/types'

interface ChipProps {
  label: string
  lang: Lang
  onClick: () => void
}

/** Small pill button, used for the quick-fill note suggestions. */
export function Chip({ label, lang, onClick }: ChipProps) {
  return (
    <button
      type="button"
      lang={lang}
      onClick={onClick}
      className="min-h-10 rounded-full border border-line bg-white px-3.5 py-2 text-left text-sm text-ink transition-colors hover:border-coral-100 hover:bg-coral-50 active:bg-coral-100 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-coral-600"
    >
      {label}
    </button>
  )
}
