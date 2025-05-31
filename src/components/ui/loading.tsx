import React from 'react'
import { cn } from '@/src/lib/utils'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const spinnerSizes = {
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
}

export function LoadingSpinner({ size = 'md', className }: LoadingSpinnerProps) {
  return (
    <div
      className={cn(
        spinnerSizes[size],
        'animate-spin border-2 border-zinc-600 border-t-white rounded-full',
        className
      )}
    />
  )
}

interface LoadingPageProps {
  message?: string
  className?: string
}

export function LoadingPage({ message = 'Loading...', className }: LoadingPageProps) {
  return (
    <main
      className={cn('bg-black w-full min-h-screen flex items-center justify-center', className)}
    >
      <div className="flex flex-col items-center space-y-4">
        <LoadingSpinner size="lg" />
        <div className="text-white archivo">{message}</div>
      </div>
    </main>
  )
}

interface LoadingGridProps {
  count?: number
  className?: string
}

export function LoadingGrid({ count = 4, className }: LoadingGridProps) {
  return (
    <div className={cn('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6', className)}>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="bg-[#0d0d0d] w-full p-4 relative animate-pulse">
          <div className="h-6 bg-zinc-800 rounded mb-4" />
          <div className="h-4 bg-zinc-800 rounded mb-2" />
          <div className="h-4 bg-zinc-800 rounded w-3/4 mb-4" />
          <div className="flex space-x-2 mb-4">
            <div className="h-6 bg-zinc-800 rounded px-2" />
            <div className="h-6 bg-zinc-800 rounded px-2" />
          </div>
        </div>
      ))}
    </div>
  )
}
