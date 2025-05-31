import type { Idea } from '@/src/types'
import { APP_CONFIG } from '@/src/lib/constants/config'

export class IdeasAPI {
  private static async fetchJSON<T>(url: string): Promise<T> {
    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      return response.json()
    } catch (error) {
      console.error(`Error fetching ${url}:`, error)
      throw error
    }
  }

  private static generateId(idea: Idea, index: number, type: string): string {
    if (idea.id) return idea.id

    const nameSlug = idea.name
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '')

    return `${type}-${nameSlug}-${index}`
  }

  static async fetchCommunityIdeas(): Promise<Idea[]> {
    try {
      const data = await this.fetchJSON<Idea[]>(APP_CONFIG.DATA_ENDPOINTS.COMMUNITY)
      return data.map((idea, index) => ({
        ...idea,
        id: this.generateId(idea, index, 'community'),
      }))
    } catch (error) {
      console.error('Error fetching community ideas:', error)
      return []
    }
  }

  static async fetchExpertIdeas(): Promise<Idea[]> {
    try {
      const data = await this.fetchJSON<Idea[]>(APP_CONFIG.DATA_ENDPOINTS.EXPERT)
      return data.map((idea, index) => ({
        ...idea,
        id: this.generateId(idea, index, 'expert'),
      }))
    } catch (error) {
      console.error('Error fetching expert ideas:', error)
      return []
    }
  }

  static async fetchOrganizationIdeas(): Promise<Idea[]> {
    try {
      const data = await this.fetchJSON<Idea[]>(APP_CONFIG.DATA_ENDPOINTS.ORGANIZATION)
      return data.map((idea, index) => ({
        ...idea,
        id: this.generateId(idea, index, 'organization'),
      }))
    } catch (error) {
      console.warn('No organization ideas found:', error)
      return []
    }
  }

  static async fetchAllIdeas(): Promise<{
    community: Idea[]
    expert: Idea[]
    organization: Idea[]
  }> {
    const [community, expert, organization] = await Promise.all([
      this.fetchCommunityIdeas(),
      this.fetchExpertIdeas(),
      this.fetchOrganizationIdeas(),
    ])

    return { community, expert, organization }
  }

  static async findIdeaById(id: string): Promise<Idea | null> {
    const { community, expert, organization } = await this.fetchAllIdeas()
    const allIdeas = [...community, ...expert, ...organization]

    // Try exact ID match first
    let foundIdea = allIdeas.find(idea => idea.id === id)

    // If not found, try name-based matching
    if (!foundIdea) {
      foundIdea = allIdeas.find(idea => {
        const nameAsId = idea.name
          .toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .replace(/[\s_-]+/g, '-')
          .replace(/^-+|-+$/g, '')
        return nameAsId === id || `${nameAsId}-0` === id
      })
    }

    return foundIdea || null
  }
}
