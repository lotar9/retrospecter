import { Button } from './ui/button'
import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/app/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/ui/avatar'

interface CardHeaderProps {
  reporter: {
    name: string
    avatar: string
  }
}

export function CardHeader({ reporter }: CardHeaderProps) {
  return (
    <div className="flex items-center justify-between relative">
      <div className="flex items-center gap-2">
        <Avatar className="h-6 w-6">
          <AvatarImage src={reporter.avatar} alt={reporter.name} />
          <AvatarFallback>{reporter.name.slice(0, 2)}</AvatarFallback>
        </Avatar>
        <span className="text-sm font-medium">{reporter.name}</span>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            type="button"
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <EllipsisHorizontalIcon className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="right">
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuItem className="text-red-600 dark:text-red-400">Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
} 