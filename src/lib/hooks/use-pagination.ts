import { useState, useMemo } from 'react'
import { APP_CONFIG } from '@/src/lib/constants/config'

interface UsePaginationProps<T> {
  items: T[]
  itemsPerPage?: number
}

interface UsePaginationReturn<T> {
  currentPage: number
  totalPages: number
  paginatedItems: T[]
  setCurrentPage: (page: number) => void
  goToNextPage: () => void
  goToPrevPage: () => void
  canGoNext: boolean
  canGoPrev: boolean
}

export function usePagination<T>({
  items,
  itemsPerPage = APP_CONFIG.ITEMS_PER_PAGE,
}: UsePaginationProps<T>): UsePaginationReturn<T> {
  const [currentPage, setCurrentPage] = useState<number>(1)

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(items.length / itemsPerPage)),
    [items.length, itemsPerPage]
  )

  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return items.slice(startIndex, endIndex)
  }, [items, currentPage, itemsPerPage])

  const goToNextPage = () => {
    setCurrentPage(prev => Math.min(totalPages, prev + 1))
  }

  const goToPrevPage = () => {
    setCurrentPage(prev => Math.max(1, prev - 1))
  }

  const canGoNext = currentPage < totalPages
  const canGoPrev = currentPage > 1

  // Reset to page 1 if items change and current page is out of bounds
  if (currentPage > totalPages && totalPages > 0) {
    setCurrentPage(1)
  }

  return {
    currentPage,
    totalPages,
    paginatedItems,
    setCurrentPage,
    goToNextPage,
    goToPrevPage,
    canGoNext,
    canGoPrev,
  }
}
