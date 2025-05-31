import React from 'react'
import { useRouter } from 'next/router'
import { Button } from '@/src/components/ui/button'
import { Typography } from '@/src/components/ui/typography'
import { Container } from '@/src/components/ui/container'

interface ErrorDisplayProps {
  title?: string
  message: string
  showBackButton?: boolean
  onRetry?: () => void
  className?: string
}

export function ErrorDisplay({
  title = 'Something went wrong',
  message,
  showBackButton = true,
  onRetry,
  className,
}: ErrorDisplayProps) {
  const router = useRouter()

  return (
    <main className="bg-black w-full min-h-screen flex flex-col items-center justify-center text-white">
      <Container size="md" className={className}>
        <div className="text-center space-y-6">
          <Typography variant="title-section" as="h1">
            {title}
          </Typography>

          <Typography variant="subtitle" as="p">
            {message}
          </Typography>

          <div className="flex justify-center gap-4">
            {onRetry && (
              <Button variant="default" onClick={onRetry}>
                Try Again
              </Button>
            )}

            {showBackButton && (
              <Button variant="outline" onClick={() => router.push('/')}>
                Return to Home
              </Button>
            )}
          </div>
        </div>
      </Container>
    </main>
  )
}

interface ErrorFallbackProps {
  error?: Error
  resetError?: () => void
}

export function ErrorFallback({ error, resetError }: ErrorFallbackProps) {
  return (
    <ErrorDisplay
      title="Oops! Something went wrong"
      message={error?.message || 'An unexpected error occurred. Please try again.'}
      onRetry={resetError}
    />
  )
}

// Not Found component
export function NotFound({
  title = 'Page not found',
  message = "The page you're looking for doesn't exist or has been moved.",
}: {
  title?: string
  message?: string
}) {
  return <ErrorDisplay title={title} message={message} showBackButton={true} />
}
