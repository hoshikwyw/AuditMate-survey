import { PERSONAL } from './personal'
import type { Lang, Text } from './types'

const MYANMAR_DIGITS = '၀၁၂၃၄၅၆၇၈၉'

/** Converts 0-9 to Myanmar digits when the language is Burmese. */
export function localizeDigits(value: string | number, lang: Lang): string {
  const s = String(value)
  return lang === 'my' ? s.replace(/[0-9]/g, (d) => MYANMAR_DIGITS[Number(d)]) : s
}

/**
 * Picks the right language and fills placeholders.
 * {her} / {me} come from personal.ts; any other {key} comes from `vars`.
 */
export function tr(text: Text, lang: Lang, vars: Record<string, string | number> = {}): string {
  const all: Record<string, string | number> = { her: PERSONAL.herName, me: PERSONAL.yourName, ...vars }
  return text[lang].replace(/\{(\w+)\}/g, (match, key: string) =>
    key in all ? localizeDigits(all[key], typeof all[key] === 'number' ? lang : 'en') : match,
  )
}
