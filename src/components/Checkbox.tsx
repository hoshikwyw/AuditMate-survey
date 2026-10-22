import { CheckIcon } from './icons'
import type { Lang } from '../config/types'

interface CheckboxProps {
  checked: boolean
  label: string
  lang: Lang
  onChange: (checked: boolean) => void
}

/** Native checkbox with a larger custom look, used for consent. */
export function Checkbox({ checked, label, lang, onChange }: CheckboxProps) {
  return (
    <label className="flex cursor-pointer items-start gap-3 rounded-2xl border-2 border-line bg-white px-4 py-3 has-[:checked]:border-coral-500 has-[:checked]:bg-coral-50 has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-coral-500">
      <input type="checkbox" className="peer sr-only" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      <span
        className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-md border-2 border-line bg-white text-white peer-checked:border-coral-500 peer-checked:bg-coral-500"
        aria-hidden="true"
      >
        {checked && <CheckIcon className="size-3.5" />}
      </span>
      <span lang={lang} className="text-[15px] leading-snug text-ink">
        {label}
      </span>
    </label>
  )
}
