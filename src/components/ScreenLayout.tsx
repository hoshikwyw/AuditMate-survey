import type { ReactNode } from 'react'

interface ScreenLayoutProps {
  /** Top bar content (progress, language toggle). */
  header?: ReactNode
  children: ReactNode
  /** Bottom buttons; stays pinned to the bottom of the screen on phones. */
  footer?: ReactNode
}

/** Phone-width page: header on top, scrollable content, buttons pinned at the bottom. */
export function ScreenLayout({ header, children, footer }: ScreenLayoutProps) {
  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col">
      {header && <header className="px-4 pt-[max(1rem,env(safe-area-inset-top))] pb-2">{header}</header>}
      <main className="flex flex-1 flex-col px-4 py-4">{children}</main>
      {footer && (
        <footer className="sticky bottom-0 border-t border-line bg-cream/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur">
          {footer}
        </footer>
      )}
    </div>
  )
}
