import type { Idea, IdeaCardType } from '@/src/types'

export function determineIdeaType(idea: Idea): IdeaCardType {
  if (idea.organizationName || idea.organizationLogo || idea.features) {
    return 'organization'
  } else if (idea.author) {
    return 'expert'
  }
  return 'community'
}

export function getIdeaTypeDisplayName(type: IdeaCardType): string {
  switch (type) {
    case 'community':
      return 'Community Idea'
    case 'expert':
      return 'Expert Idea'
    case 'organization':
      return 'Organization Idea'
    default:
      return 'Idea'
  }
}
