import { APP_CONFIG, IDEA_TYPES, type IdeaType } from '@/src/lib/constants/config'
import { generateIdeaId, generateSlug } from '@/src/lib/utils/id-generator'
import type { Idea } from '@/src/types'

export class IdeasAPI {
  private static async fetchJSON<T>(url: string): Promise<T> {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return response.json()
  }

  // Generic fetch function to eliminate repetition
  private static async fetchIdeasByType(type: IdeaType): Promise<Idea[]> {
    try {
      const endpoint =
        APP_CONFIG.DATA_ENDPOINTS[type.toUpperCase() as keyof typeof APP_CONFIG.DATA_ENDPOINTS]
      const data = await this.fetchJSON<Idea[]>(endpoint)
      return data.map((idea, index) => ({
        ...idea,
        id: generateIdeaId(idea, index, type),
      }))
    } catch (error) {
      const message = `Error fetching ${type} ideas:`
      if (type === IDEA_TYPES.ORGANIZATION) {
        console.warn(message, error)
      } else {
        console.error(message, error)
      }
      return []
    }
  }

  static async fetchCommunityIdeas(): Promise<Idea[]> {
    return this.fetchIdeasByType(IDEA_TYPES.COMMUNITY)
  }

  static async fetchExpertIdeas(): Promise<Idea[]> {
    return this.fetchIdeasByType(IDEA_TYPES.EXPERT)
  }

  static async fetchOrganizationIdeas(): Promise<Idea[]> {
    return this.fetchIdeasByType(IDEA_TYPES.ORGANIZATION)
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
        const nameAsId = generateSlug(idea.name)
        return nameAsId === id || `${nameAsId}-0` === id
      })
    }

    return foundIdea || null
  }
}
