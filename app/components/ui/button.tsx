import { ButtonHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'ghost'
  size?: 'default' | 'icon' | 'sm'
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
          {
            'bg-primary text-primary-foreground hover:bg-primary/90':
              variant === 'default',
            'hover:bg-accent hover:text-accent-foreground': variant === 'ghost',
            'h-10 px-4': size === 'default',
            'h-10 w-10': size === 'icon',
            'h-8 px-3': size === 'sm',
          },
          className
        )}
        {...props}
      />
    )
  }
)

Button.displayName = 'Button' 