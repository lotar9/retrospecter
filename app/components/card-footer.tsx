import { cn } from '@/lib/utils'
import { Button } from './ui/button'
import { ChatBubbleLeftIcon, ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/outline'

interface CardFooterProps {
  commentCount: number
  voteCount: number
  onVote: (direction: 'up' | 'down') => void
}

export function CardFooter({ commentCount, voteCount, onVote }: CardFooterProps) {
  return (
    <div className="flex items-end justify-between">
      <Button 
        variant="ghost" 
        size="sm" 
        className={cn(
          "h-8",
          commentCount > 0 && "text-blue-500 hover:text-blue-600 font-bold"
        )}
      >
        <ChatBubbleLeftIcon className={cn(
          "h-4 w-4 mr-1",
          commentCount > 0 && "font-bold"
        )} />
        <span className={cn(
          commentCount > 0 && "font-bold"
        )}>{commentCount}</span>
      </Button>

      <div className="flex items-center gap-0.5">
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 px-2"
          disabled={voteCount <= 0}
          onClick={() => onVote('down')}
        >
          <ChevronDownIcon className="h-4 w-4" />
        </Button>
        <span className="min-w-[1.5rem] text-center">{voteCount}</span>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 px-2"
          onClick={() => onVote('up')}
        >
          <ChevronUpIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
} 