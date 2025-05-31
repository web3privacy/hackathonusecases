import { useState, useEffect } from 'react'
import { IdeasAPI } from '@/src/lib/api/ideas'
import type { Idea } from '@/src/types'

interface UseIdeasReturn {
  communityIdeas: Idea[]
  expertIdeas: Idea[]
  organizationIdeas: Idea[]
  isLoading: boolean
  error: string | null
  refetch: () => Promise<void>
}

export function useIdeas(): UseIdeasReturn {
  const [communityIdeas, setCommunityIdeas] = useState<Idea[]>([])
  const [expertIdeas, setExpertIdeas] = useState<Idea[]>([])
  const [organizationIdeas, setOrganizationIdeas] = useState<Idea[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const { community, expert, organization } = await IdeasAPI.fetchAllIdeas()

      setCommunityIdeas(community)
      setExpertIdeas(expert)
      setOrganizationIdeas(organization)
    } catch (err) {
      setError('Failed to load ideas. Please try again later.')
      console.error('Error loading ideas:', err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return {
    communityIdeas,
    expertIdeas,
    organizationIdeas,
    isLoading,
    error,
    refetch: fetchData,
  }
}
