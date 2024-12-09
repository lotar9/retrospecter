'use client'

import { PlusCircleIcon } from '@heroicons/react/24/outline'
import { ReactNode, useState } from 'react'
import { Button } from '@/app/components/ui/button'
import { ScrollArea } from '@/app/components/ui/scroll-area'
import { cn } from '@/app/lib/utils'
import { RetroTemplateBoardColumnFooter } from './retro-template-board-column-footer'
import { RetroTemplateBoardAddCard } from './retro-template-board-add-card'
import { Column } from '../types/cards'

interface RetroTemplateBoardColumnProps {
  column: Column
  onDrop: (cardId: string, sourceColumn: string, targetColumn: string) => void
  onAdd: (column: Column, content:string) => void
  children: ReactNode
}

export function RetroTemplateBoardColumn({
  column, onDrop,onAdd, children
}:RetroTemplateBoardColumnProps) {
  const [isDragOver, setIsDragOver] = useState(false)
  const [isAddingCard, setIsAddingCard] = useState(false)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    if (!isDragOver) setIsDragOver(true)
  }

  const handleDragLeave = () => {
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    const cardId = e.dataTransfer.getData('cardId')
    const sourceColumn = e.dataTransfer.getData('sourceColumn')
    onDrop(cardId, sourceColumn, column.columnId)
  }

  const handleAddCard = (text: string) => {
    console.log('Adding card:', text)
    onAdd(column,text)
    setIsAddingCard(false)

  }

  return (
    <div 
      className={cn(
        "flex h-[calc(100vh-theme(spacing.32))] flex-1 flex-col rounded-lg border bg-gray-50 dark:bg-gray-800 p-4 overflow-hidden",
        isDragOver && "ring-2 ring-orange-500 ring-opacity-100 bg-orange-500/20 transition-colors duration-200"
      )}
      style={column.color ? { 
        borderTopColor: `var(--${column.color})`,
        borderTopWidth: '4px'
      } : undefined}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Header */}
      <div className="flex flex-col flex-shrink-0">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-gray-600 dark:text-gray-400">{column.heroIcon}</span>
            <h3 className="font-medium text-gray-900 dark:text-gray-100">{column.description}</h3>
          </div>
        </div>

        {column.name && (
          <span className="mt-1 text-sm text-gray-600 dark:text-gray-400">{column.name}</span>
        )}
      </div>

      {/* Scrollable content */}
      <ScrollArea className="min-h-0 flex-1">
        <div className="flex flex-col gap-2 py-4">{children}</div>
      </ScrollArea>

      {isAddingCard ? (
        <RetroTemplateBoardAddCard
          onSave={handleAddCard}
          onCancel={() => setIsAddingCard(false)}
        />
      ) : (
        <RetroTemplateBoardColumnFooter onAdd={() => setIsAddingCard(true)} />
      )}
    </div>
  )
}
