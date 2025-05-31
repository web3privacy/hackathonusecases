export const APP_CONFIG = {
  ITEMS_PER_PAGE: 4,
  CONTRIBUTE_URL:
    'https://docs.web3privacy.info/projects/privacy-idea-generator',
  LOGO_URL: 'https://web3privacy.info/logo.svg',
  DATA_ENDPOINTS: {
    COMMUNITY: '/data/ideas/community-ideas.json',
    EXPERT: '/data/ideas/expert-ideas.json',
    ORGANIZATION: '/data/ideas/organization-ideas.json',
  },
} as const

export const IDEA_TYPES = {
  COMMUNITY: 'community',
  EXPERT: 'expert',
  ORGANIZATION: 'organization',
} as const

export type IdeaType = (typeof IDEA_TYPES)[keyof typeof IDEA_TYPES]
