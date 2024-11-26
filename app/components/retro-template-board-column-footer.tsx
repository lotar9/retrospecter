'use client'

import { PlusCircleIcon } from '@heroicons/react/24/outline'
import { Button } from '@/app/components/ui/button'

interface RetroTemplateBoardColumnFooterProps {
  onAdd: () => void
}

export function RetroTemplateBoardColumnFooter({ onAdd }: RetroTemplateBoardColumnFooterProps) {
  return (
    <div className="flex-shrink-0 pt-2">
      <Button
        variant="ghost"
        className="w-full gap-1 text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-700"
        onClick={onAdd}
      >
        <PlusCircleIcon className="h-4 w-4" />
        Add card
      </Button>
    </div>
  )
} 