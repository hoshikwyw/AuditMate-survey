import type { ButtonHTMLAttributes } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost'

const VARIANTS: Record<Variant, string> = {
  primary:
    'bg-coral-500 text-white shadow-sm hover:bg-coral-600 active:bg-coral-700 disabled:bg-coral-100 disabled:text-coral-600/60 disabled:shadow-none',
  secondary: 'border border-line bg-white text-ink hover:bg-coral-50 active:bg-coral-100 disabled:opacity-50',
  ghost: 'text-muted hover:bg-white/70 hover:text-ink active:bg-white disabled:opacity-50',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  fullWidth?: boolean
}

export function Button({ variant = 'primary', fullWidth = false, className = '', type = 'button', ...props }: ButtonProps) {
  return (
    <button
      type={type}
      className={`inline-flex min-h-12 items-center whitespace-nowrap justify-center gap-2 rounded-2xl px-5 py-3 text-base font-semibold transition-colors focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-coral-500 disabled:cursor-not-allowed ${fullWidth ? 'w-full min-w-0 flex-1' : 'shrink-0'} ${VARIANTS[variant]} ${className}`}
      {...props}
    />
  )
}
