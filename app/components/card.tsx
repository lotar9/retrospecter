import { ReactNode } from 'react'
import { cn } from '@/app/lib/utils'
import { CardHeader } from '@/app/components/card-header'
import { CardContent } from '@/app/components/card-content'
import { CardFooter } from '@/app/components/card-footer'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  id: string
  columnId: string
  color?: string
  reporter: {
    name: string
    avatar: string
  }
  commentCount?: number
  voteCount?: number
  onVote: (direction: 'up' | 'down') => void;
}

export function Card({ 
  className, 
  children, 
  id, 
  columnId,
  color,
  reporter,
  commentCount = 0,
  voteCount = 0,
  onVote,
  ...props 
}: CardProps) {
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('cardId', id)
    e.dataTransfer.setData('sourceColumn', columnId)
  }

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      className={cn(
        'flex flex-col gap-3 rounded-lg border p-4 shadow-sm',
        'bg-white dark:bg-gray-800',
        'border-gray-200 dark:border-gray-700',
        'border-l-4',
        'text-gray-900 dark:text-gray-100',
        'hover:border-gray-300 dark:hover:border-gray-600',
        'transition-colors duration-200',
        'cursor-move',
        className
      )}
      style={color ? { 
        borderLeftColor: `var(--${color})`,
        borderLeftWidth: '4px'
      } : undefined}
      {...props}
    >
      <CardHeader reporter={reporter} />
      <CardContent>{children}</CardContent>
      <CardFooter commentCount={commentCount} voteCount={voteCount} onVote={onVote} />
    </div>
  )
} 