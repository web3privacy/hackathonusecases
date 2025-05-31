export type IdeaCardType = 'community' | 'expert' | 'organization'

export interface AuthorObject {
  name: string
  organization?: string
  avatar?: string
}

export type Author = string | AuthorObject

export interface ExpertDetails {
  name: string
  avatar: string | null
  organization?: string
  displayName: string
  twitterUrl: string | null
}

export interface Idea {
  id?: string
  name: string
  description: string
  categories?: string[]
  github?: string
  website?: string
  event?: string
  author?: Author
  organization?: string
  organizationLogo?: string
  organizationName?: string
  features?: string[]
  featured?: boolean
}

export interface IdeaCardProps extends Idea {
  type?: IdeaCardType
}

export interface OrganizationDetails {
  name: string
  logo?: string
  github?: string
  website?: string
}

export interface Organization {
  name: string
  logo: string | null
  slug: string
}

// Helper types for components
export interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

// Helper type for Next.js pages
export interface IdeaPageProps {
  idea?: Idea
} 