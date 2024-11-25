import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface ScrollAreaProps extends React.HTMLProps<HTMLDivElement> {}

export const ScrollArea = forwardRef<HTMLDivElement, ScrollAreaProps>(
  function ScrollArea({ className, children, ...props }, ref) {
    return (
      <div
        ref={ref}
        className={cn('overflow-auto', className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)

ScrollArea.displayName = 'ScrollArea' 