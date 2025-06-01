// Experimental feature: AI integration for the idea generation - for more information see: https://github.com/web3privacy/privacy-idea-generator/issues/3
// note: requires user to have either a commercial AI token or their own local one running as well as own deployment of the webapp
// the front-end deployed at ideas.web3privacy.info will not provide AI integration or offer free token for requests

// Below are additional types for the AI API if you want to be more specific about the response - see src/pages/api/ai.ts for more details.
export interface AIIdeaResponse {
  name: string
  description: string
  categories?: string[]
  github?: string
  website?: string
  event?: string
  author?:
    | string
    | {
        name: string
        organization?: string
      }
  basedOn?: string[]
}

export interface AIGeneratedResponse {
  idea: AIIdeaResponse
  basedOn?: string[]
}
