// Universal slug generator for all string-to-slug needs
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

// Specific generators using the universal function
export function generateIdeaSlug(name: string): string {
  return generateSlug(name)
}

export function generateOrganizationSlug(orgName: string): string {
  return generateSlug(orgName)
}

// Enhanced idea ID generator with type safety
export function generateIdeaId(
  idea: { id?: string; name: string },
  index: number,
  type: string
): string {
  if (idea.id) return idea.id

  const nameSlug = generateSlug(idea.name)
  return `${type}-${nameSlug}-${index}`
}
