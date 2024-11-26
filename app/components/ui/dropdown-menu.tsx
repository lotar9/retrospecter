"use client"

import { createContext, useContext, useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"
import React from "react"

const DropdownMenuContext = createContext<{
  isOpen: boolean
  setIsOpen: (value: boolean) => void
}>({
  isOpen: false,
  setIsOpen: () => {},
})

export function DropdownMenu({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    const handleMouseLeave = () => {
      // Clear any existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      // Set new timeout
      timeoutRef.current = setTimeout(() => {
        setIsOpen(false)
      }, 150) // 150ms delay for smoother experience
    }

    const handleMouseEnter = () => {
      // Clear timeout if mouse re-enters
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }

    const container = containerRef.current
    container?.addEventListener('mouseleave', handleMouseLeave)
    container?.addEventListener('mouseenter', handleMouseEnter)
    document.addEventListener('mousedown', handleClickOutside)
    
    return () => {
      container?.removeEventListener('mouseleave', handleMouseLeave)
      container?.removeEventListener('mouseenter', handleMouseEnter)
      document.removeEventListener('mousedown', handleClickOutside)
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])
  
  return (
    <div 
      ref={containerRef} 
      className="relative inline-block"
    >
      <DropdownMenuContext.Provider value={{ isOpen, setIsOpen }}>
        {children}
      </DropdownMenuContext.Provider>
    </div>
  )
}

export function DropdownMenuTrigger({ 
  children,
  asChild = false,
  className,
  ...props
}: {
  children: React.ReactNode
  asChild?: boolean
  className?: string
}) {
  const { isOpen, setIsOpen } = useContext(DropdownMenuContext)
  
  if (asChild) {
    const child = React.Children.only(children) as React.ReactElement
    return React.cloneElement(child, {
      onClick: (e: React.MouseEvent) => {
        e.stopPropagation()
        setIsOpen(!isOpen)
        child.props.onClick?.(e)
      },
      className: cn(child.props.className, className),
      ...props
    })
  }

  return (
    <button
      onClick={() => setIsOpen(!isOpen)}
      className={className}
      {...props}
    >
      {children}
    </button>
  )
}

export function DropdownMenuContent({ 
  children,
  className,
  sideOffset = 4,
  align = 'left',
  ...props
}: {
  children: React.ReactNode
  className?: string
  sideOffset?: number
  align?: 'left' | 'right'
}) {
  const { isOpen, setIsOpen } = useContext(DropdownMenuContext)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [setIsOpen])

  if (!isOpen) return null

  return (
    <div
      ref={ref}
      className={cn(
        "absolute z-50 min-w-[8rem] overflow-hidden rounded-md border border-gray-200 bg-white p-1 shadow-md",
        "dark:border-gray-700 dark:bg-gray-800",
        align === 'right' ? 'right-0' : 'left-0',
        'top-full mt-1',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function DropdownMenuItem({ 
  children,
  className,
  onClick,
  ...props
}: {
  children: React.ReactNode
  className?: string
  onClick?: (e: React.MouseEvent) => void
}) {
  const { setIsOpen } = useContext(DropdownMenuContext)

  return (
    <button
      onClick={(e) => {
        setIsOpen(false)
        onClick?.(e)
      }}
      className={cn(
        "w-full text-left",
        "relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none",
        "hover:bg-gray-100 dark:hover:bg-gray-700",
        "disabled:pointer-events-none disabled:opacity-50",
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
} 