import React from 'react'
import { cn } from '@/src/lib/utils'

// Base text variants for consistent typography
const textVariants = {
  // Archivo font variants (most common in the app)
  'archivo-xs': 'archivo text-xs',
  'archivo-sm': 'archivo text-sm',
  'archivo-md': 'archivo text-md',
  'archivo-lg': 'archivo text-lg',
  'archivo-xl': 'archivo text-xl',
  'archivo-2xl': 'archivo text-2xl',
  'archivo-3xl': 'arquivo text-3xl',
  'archivo-4xl': 'archivo text-4xl',
  'archivo-5xl': 'archivo text-5xl',

  // Specialized variants
  'button-primary': 'bg-white text-[#0d0d0d] archivo text-sm flex space-x-3 items-center p-2',
  'button-secondary': 'border archivo text-sm flex items-center p-2',
  'button-nav': 'border archivo text-xs flex space-x-3 items-center p-2',
  'title-main': 'major text-center text-3xl md:text-5xl',
  'title-section': 'major text-center text-4xl uppercase',
  subtitle: 'archivo text-center text-[#4c4c4c] mt-5 px-5 md:text-xl',
  'card-title': 'archivo text-lg mb-4',
  'card-author': 'archivo text-md font-medium',
  'card-description': 'archivo text-sm opacity-70',
  'card-meta': 'archivo text-right',
  'card-event': 'archivo mt-2 text-sm opacity-50 text-end hover:underline cursor-pointer',
} as const

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  variant: keyof typeof textVariants
  as?: React.ElementType
  children: React.ReactNode
}

export function Typography({
  variant,
  as: Component = 'span',
  className,
  children,
  ...props
}: TypographyProps) {
  return (
    <Component className={cn(textVariants[variant], className)} {...props}>
      {children}
    </Component>
  )
}

// Convenience components for common use cases
export function Button({
  variant = 'button-primary',
  className,
  ...props
}: Omit<TypographyProps, 'variant'> & {
  variant?: 'button-primary' | 'button-secondary' | 'button-nav'
}) {
  return <Typography as="button" variant={variant} className={className} {...props} />
}

export function Title({
  level = 1,
  className,
  children,
  ...props
}: {
  level?: 1 | 2
  className?: string
  children: React.ReactNode
} & React.HTMLAttributes<HTMLHeadingElement>) {
  const variant = level === 1 ? 'title-main' : 'title-section'
  const Component = level === 1 ? 'h1' : 'h2'
  return (
    <Typography as={Component} variant={variant} className={className} {...props}>
      {children}
    </Typography>
  )
}

export function CardText({
  variant = 'card-description',
  className,
  ...props
}: Omit<TypographyProps, 'variant'> & {
  variant?: 'card-title' | 'card-author' | 'card-description' | 'card-meta' | 'card-event'
}) {
  return <Typography variant={variant} className={className} {...props} />
}
