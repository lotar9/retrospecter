"use client"

import { EyeIcon, EyeSlashIcon, EllipsisHorizontalIcon } from '@heroicons/react/24/outline'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/app/components/ui/dropdown-menu'
import { Button } from '@/app/components/ui/button'

interface SurveyOption {
  id: string
  text: string
  percentage: number
}

interface SurveyProps {
  title: string
  isPublic: boolean
  options: SurveyOption[]
  totalVotes: number
  onVoteChange?: () => void
  onEdit?: () => void
  onReset?: () => void
  onDelete?: () => void
}

export function Survey({
  title,
  isPublic,
  options,
  totalVotes,
  onVoteChange,
  onEdit,
  onReset,
  onDelete
}: SurveyProps) {
  return (
    <div className="flex flex-col gap-4 rounded-lg border bg-white dark:bg-gray-800 p-4 min-w-0 w-full shadow-sm">
      {/* Header */}
      <div className="flex flex-col gap-2 min-w-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 min-w-0">
            {isPublic ? (
              <EyeIcon className="h-5 w-5 flex-shrink-0 text-gray-600 dark:text-gray-400" />
            ) : (
              <EyeSlashIcon className="h-5 w-5 flex-shrink-0 text-gray-600 dark:text-gray-400" />
            )}
            <span className="text-sm font-medium truncate text-gray-600 dark:text-gray-400">
              {isPublic ? 'Public Survey' : 'Anonymous Survey'}
            </span>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200">
                <EllipsisHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={onEdit}>Edit Survey</DropdownMenuItem>
              <DropdownMenuItem onClick={onReset}>Reset Survey</DropdownMenuItem>
              <DropdownMenuItem 
                onClick={onDelete}
                className="text-red-600 dark:text-red-400"
              >
                Delete Survey
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <h3 className="text-lg font-semibold truncate text-gray-900 dark:text-white">{title}</h3>
      </div>

      {/* Survey Options */}
      <div className="flex flex-col gap-3 min-w-0">
        {options.map((option) => (
          <div key={option.id} className="min-w-0">
            <div className="relative h-8">
              <div className="absolute inset-0 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden">
                <div
                  className="h-full rounded-full bg-blue-500 dark:bg-blue-500 transition-all duration-300"
                  style={{ width: `${option.percentage}%` }}
                />
              </div>
              <div className="absolute inset-0 flex items-center">
                <span className={`pl-3 text-sm font-medium truncate flex-1 text-gray-700 dark:text-gray-300`}>
                  {option.text}
                </span>
                <span className={`pr-3 text-sm font-medium flex-shrink-0 text-gray-700 dark:text-gray-300`}>
                  {option.percentage}%
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-2">
        <span className="text-sm text-gray-600 dark:text-gray-400">
          {totalVotes} {totalVotes === 1 ? 'vote' : 'votes'}
        </span>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={onVoteChange}
          className="flex-shrink-0 text-gray-700 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-gray-100 dark:hover:bg-gray-700"
        >
          Change Vote
        </Button>
      </div>
    </div>
  )
} 