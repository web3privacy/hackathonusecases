import { useState, useMemo } from 'react'
import type { Idea, IdeaCardType } from '@/src/types'

interface UseIdeaFiltersProps {
  communityIdeas: Idea[]
  expertIdeas: Idea[]
  organizationIdeas: Idea[]
}

interface UseIdeaFiltersReturn {
  selectedIdeaType: IdeaCardType
  selectedTags: string[]
  allTags: string[]
  filteredIdeas: Idea[]
  setSelectedIdeaType: (type: IdeaCardType) => void
  toggleTag: (tag: string) => void
  clearFilters: () => void
  getRandomIdea: () => Idea | null
}

export function useIdeaFilters({
  communityIdeas,
  expertIdeas,
  organizationIdeas,
}: UseIdeaFiltersProps): UseIdeaFiltersReturn {
  const [selectedIdeaType, setSelectedIdeaType] = useState<IdeaCardType>('community')
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  // Get all unique tags from all ideas
  const allTags = useMemo(() => {
    const tagSet = new Set<string>()
    const allIdeas = [...communityIdeas, ...expertIdeas, ...organizationIdeas]

    allIdeas.forEach(idea => idea.categories?.forEach(cat => tagSet.add(cat)))

    return Array.from(tagSet).sort()
  }, [communityIdeas, expertIdeas, organizationIdeas])

  // Get ideas based on selected type
  const currentTypeIdeas = useMemo(() => {
    switch (selectedIdeaType) {
      case 'community':
        return communityIdeas
      case 'expert':
        return expertIdeas
      case 'organization':
        return organizationIdeas
      default:
        return [...communityIdeas, ...expertIdeas, ...organizationIdeas]
    }
  }, [selectedIdeaType, communityIdeas, expertIdeas, organizationIdeas])

  // Filter ideas based on selected tags
  const filteredIdeas = useMemo(() => {
    if (selectedTags.length === 0) return currentTypeIdeas

    return currentTypeIdeas.filter(idea => idea.categories?.some(cat => selectedTags.includes(cat)))
  }, [currentTypeIdeas, selectedTags])

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => (prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]))
  }

  const clearFilters = () => {
    setSelectedTags([])
  }

  const getRandomIdea = (): Idea | null => {
    if (filteredIdeas.length === 0) return null

    const randomIndex = Math.floor(Math.random() * filteredIdeas.length)
    return filteredIdeas[randomIndex] ?? null
  }

  return {
    selectedIdeaType,
    selectedTags,
    allTags,
    filteredIdeas,
    setSelectedIdeaType,
    toggleTag,
    clearFilters,
    getRandomIdea,
  }
}
