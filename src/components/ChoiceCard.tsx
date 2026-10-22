import { CheckIcon } from './icons'
import type { Lang } from '../config/types'

type Mode = 'single' | 'multi' | 'rank'

interface ChoiceCardProps {
  mode: Mode
  label: string
  lang: Lang
  selected: boolean
  /** 1-based position for rank mode. */
  rank?: number
  disabled?: boolean
  onClick: () => void
}

/**
 * One tappable answer. Renders as a radio (single), checkbox (multi),
 * or numbered checkbox (rank) for screen readers.
 */
export function ChoiceCard({ mode, label, lang, selected, rank, disabled = false, onClick }: ChoiceCardProps) {
  return (
    <button
      type="button"
      role={mode === 'single' ? 'radio' : 'checkbox'}
      aria-checked={selected}
      aria-disabled={disabled || undefined}
      onClick={disabled ? undefined : onClick}
      className={`flex min-h-14 w-full items-center gap-3 rounded-2xl border-2 px-4 py-3 text-left transition-colors focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-coral-500 ${
        selected
          ? 'border-coral-500 bg-coral-50'
          : disabled
            ? 'cursor-not-allowed border-line bg-white/60 opacity-50'
            : 'border-line bg-white hover:border-coral-100 active:bg-coral-50'
      }`}
    >
      <Marker mode={mode} selected={selected} rank={rank} />
      <span lang={lang} className="flex-1 text-[15px] leading-snug font-medium text-ink">
        {label}
      </span>
    </button>
  )
}

function Marker({ mode, selected, rank }: { mode: Mode; selected: boolean; rank?: number }) {
  if (mode === 'rank') {
    return (
      <span
        className={`flex size-7 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
          selected ? 'bg-coral-500 text-white' : 'border-2 border-line text-transparent'
        }`}
        aria-hidden="true"
      >
        {selected ? rank : ''}
      </span>
    )
  }
  const shape = mode === 'single' ? 'rounded-full' : 'rounded-md'
  return (
    <span
      className={`flex size-6 shrink-0 items-center justify-center border-2 ${shape} ${
        selected ? 'border-coral-500 bg-coral-500 text-white' : 'border-line bg-white'
      }`}
      aria-hidden="true"
    >
      {selected && <CheckIcon className="size-3.5" />}
    </span>
  )
}
