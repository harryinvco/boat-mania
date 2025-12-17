'use client'

import { forwardRef } from 'react'
import { cn } from '@/lib/utils/cn'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, type = 'text', id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="mb-2 block text-sm font-medium text-slate-700">
            {label}
          </label>
        )}
        <input
          type={type}
          id={inputId}
          ref={ref}
          className={cn(
            'block w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder-slate-400',
            'focus:border-turquoise-500 focus:outline-none focus:ring-2 focus:ring-turquoise-500/20',
            'transition-colors duration-200',
            error && 'border-coral-500 focus:border-coral-500 focus:ring-coral-500/20',
            props.disabled && 'cursor-not-allowed bg-slate-50 text-slate-500',
            className
          )}
          {...props}
        />
        {error && <p className="mt-1.5 text-sm text-coral-500">{error}</p>}
        {helperText && !error && <p className="mt-1.5 text-sm text-slate-500">{helperText}</p>}
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input
