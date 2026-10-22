import { GlobeIcon } from './icons'
import type { Lang } from '../config/types'

interface LanguageToggleProps {
  lang: Lang
  onChange: (lang: Lang) => void
}

/** Shows the *other* language as the button label, so it's readable to someone who needs it. */
export function LanguageToggle({ lang, onChange }: LanguageToggleProps) {
  const other: Lang = lang === 'en' ? 'my' : 'en'
  return (
    <button
      type="button"
      lang={other}
      onClick={() => onChange(other)}
      aria-label={other === 'my' ? 'Switch to Myanmar' : 'English သို့ ပြောင်းရန်'}
      className="inline-flex min-h-10 items-center gap-1.5 rounded-full border border-line bg-white px-3.5 text-sm font-medium text-ink transition-colors hover:bg-coral-50 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-coral-600"
    >
      <GlobeIcon />
      {other === 'my' ? 'မြန်မာ' : 'English'}
    </button>
  )
}
