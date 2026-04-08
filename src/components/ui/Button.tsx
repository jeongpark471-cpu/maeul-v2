'use client'

import { ButtonHTMLAttributes } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost'

const variantStyles: Record<Variant, string> = {
  primary: 'bg-gradient-to-r from-[#8B6010] to-[#C89020] text-white hover:from-[#7A5510] hover:to-[#B88018] active:from-[#6A4A0E] active:to-[#A87015] shadow-sm',
  secondary: 'bg-[rgba(255,250,235,0.6)] text-[#5A5040] border border-[rgba(200,170,100,0.3)] hover:bg-[rgba(255,250,235,0.8)]',
  ghost: 'bg-transparent text-[#5A5040] hover:bg-[rgba(200,170,100,0.1)]',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  fullWidth?: boolean
}

export default function Button({
  variant = 'primary',
  fullWidth = false,
  className = '',
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`
        rounded-xl px-4 py-2.5 text-sm font-semibold
        transition-all disabled:opacity-50 disabled:cursor-not-allowed
        ${variantStyles[variant]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  )
}
