import React, { useState } from 'react'
import { cn } from '@/src/lib/utils'

interface AvatarProps {
  src?: string | null
  alt: string
  fallbackText?: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
  href?: string
  onClick?: () => void
}

const sizeClasses = {
  sm: 'w-8 h-8',
  md: 'w-10 h-10',
  lg: 'w-12 h-12',
}

export function Avatar({
  src,
  alt,
  fallbackText,
  size = 'md',
  className,
  href,
  onClick,
}: AvatarProps) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)

  const generateFallbackUrl = (name: string): string => {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`
  }

  const handleImageLoad = () => setImageLoaded(true)
  const handleImageError = () => {
    setImageError(true)
    setImageLoaded(false)
  }

  const avatarClasses = cn(
    sizeClasses[size],
    'rounded-full overflow-hidden relative object-cover',
    onClick && 'cursor-pointer',
    className
  )

  const imageElement = (
    <div className={avatarClasses} onClick={onClick}>
      {!imageLoaded && <div className="absolute inset-0 bg-zinc-800 animate-pulse rounded-full" />}
      {src && !imageError ? (
        <img
          src={src}
          alt={alt}
          className={cn(
            'w-full h-full object-cover transition-opacity duration-300',
            imageLoaded ? 'opacity-100' : 'opacity-0'
          )}
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
      ) : fallbackText ? (
        <img
          src={generateFallbackUrl(fallbackText)}
          alt={alt}
          className="w-full h-full object-cover"
          onLoad={handleImageLoad}
        />
      ) : (
        <div className="w-full h-full bg-zinc-800 flex items-center justify-center text-white text-sm">
          {alt.substring(0, 2).toUpperCase()}
        </div>
      )}
    </div>
  )

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="block">
        {imageElement}
      </a>
    )
  }

  return imageElement
}
