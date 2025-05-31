// Additional types for the AI API if you want to be more specific about the response
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
