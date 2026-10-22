import { useEffect } from 'react'
import type { Lang } from '../config/types'

/** Keeps <html lang> in sync so screen readers and the Myanmar font rules follow the chosen language. */
export function useDocumentLang(lang: Lang) {
  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])
}
