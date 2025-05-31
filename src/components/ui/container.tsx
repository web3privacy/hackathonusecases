import React from 'react'
import { cn } from '@/src/lib/utils'

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  centered?: boolean
  children: React.ReactNode
}

const containerSizes = {
  sm: 'max-w-2xl',
  md: 'max-w-4xl',
  lg: 'max-w-6xl',
  xl: 'max-w-7xl',
  full: 'max-w-full',
}

export function Container({
  size = 'lg',
  centered = true,
  className,
  children,
  ...props
}: ContainerProps) {
  return (
    <div className={cn(containerSizes[size], centered && 'mx-auto', 'px-4', className)} {...props}>
      {children}
    </div>
  )
}

// Specialized containers for common patterns
export function PageContainer({ className, children, ...props }: Omit<ContainerProps, 'size'>) {
  return (
    <Container size="lg" className={cn('mt-16', className)} {...props}>
      {children}
    </Container>
  )
}

export function SectionContainer({ className, children, ...props }: Omit<ContainerProps, 'size'>) {
  return (
    <Container size="lg" className={cn('mt-16 mb-12', className)} {...props}>
      {children}
    </Container>
  )
}
