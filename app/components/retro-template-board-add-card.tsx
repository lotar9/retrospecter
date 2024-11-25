'use client'

import { XMarkIcon, PlusCircleIcon } from '@heroicons/react/24/outline'
import { Button } from '@/app/components/ui/button'
import { Input } from '@/app/components/ui/input'
import { useState } from 'react'

interface RetroTemplateBoardAddCardProps {
  onSave: (text: string) => void
  onCancel: () => void
}

export function RetroTemplateBoardAddCard({ onSave, onCancel }: RetroTemplateBoardAddCardProps) {
  const [text, setText] = useState('')

  const handleSave = () => {
    if (text.trim()) {
      onSave(text)
      setText('')
    }
  }

  return (
    <div className="flex-shrink-0 space-y-2 pt-2">
      <Input
        placeholder="Enter card text..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleSave()
          if (e.key === 'Escape') onCancel()
        }}
        autoFocus
      />
      <div className="flex gap-2">
        <Button
          className="flex-1 text-gray-700 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-gray-100 dark:hover:bg-gray-700"
          variant="ghost"
          onClick={handleSave}
        >
          <PlusCircleIcon className="h-4 w-4 mr-1" />
          Save
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="text-gray-700 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-gray-100 dark:hover:bg-gray-700"
          onClick={onCancel}
        >
          <XMarkIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
} 