'use client'

import { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export default function Input({
  label,
  error,
  className = '',
  ...props
}: InputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-medium text-[#0D0B08]">{label}</label>
      )}
      <input
        className={`
          rounded-xl border border-[rgba(200,170,100,0.3)] bg-[rgba(255,250,235,0.5)] px-3 py-2.5 text-sm text-[#0D0B08]
          placeholder:text-[#8A7D6B]
          focus:border-[#B8820A] focus:outline-none focus:ring-1 focus:ring-[#B8820A]
          disabled:opacity-50
          ${error ? 'border-red-400 focus:border-red-400 focus:ring-red-400' : ''}
          ${className}
        `}
        {...props}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
}
