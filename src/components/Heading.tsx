import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'

/**
 * Screen title. Takes focus when the screen appears, so screen readers announce
 * the new question and keyboard users start from the top.
 */
export function Heading({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLHeadingElement>(null)
  useEffect(() => {
    ref.current?.focus({ preventScroll: true })
    window.scrollTo({ top: 0 })
  }, [])
  return (
    <h1 ref={ref} tabIndex={-1} className={`text-[22px] leading-snug font-bold text-ink outline-none ${className}`}>
      {children}
    </h1>
  )
}
