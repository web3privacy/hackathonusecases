import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import IdeaCard from '@/src/components/ui/idea-card'
import { IdeasAPI } from '@/src/lib/api/ideas'
import { generateOrganizationSlug } from '@/src/lib/utils/id-generator'
import { APP_CONFIG } from '@/src/lib/constants/config'
import type { Idea, OrganizationDetails } from '@/src/types'

export default function OrganizationPage() {
  const router = useRouter()
  const { orgName } = router.query
  const [organizationIdeas, setOrganizationIdeas] = useState<Idea[]>([])
  const [organizationDetails, setOrganizationDetails] = useState<OrganizationDetails | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchOrganizationData = async () => {
      if (!orgName || typeof orgName !== 'string') return

      setIsLoading(true)
      setError(null)

      try {
        const allOrgIdeas = await IdeasAPI.fetchOrganizationIdeas()

        // Find ideas for this organization
        const ideas = allOrgIdeas.filter(idea => {
          if (!idea.organizationName) return false
          const ideaSlug = generateOrganizationSlug(idea.organizationName)
          return ideaSlug === orgName
        })

        if (ideas.length === 0) {
          setError('Organization not found')
          return
        }

        setOrganizationIdeas(ideas)

        // Extract organization details from the first idea
        const firstIdea = ideas[0]
        if (firstIdea && firstIdea.organizationName) {
          setOrganizationDetails({
            name: firstIdea.organizationName,
            logo: firstIdea.organizationLogo,
            github: firstIdea.github,
            website: firstIdea.website,
          })
        }
      } catch (err) {
        console.error('Error fetching organization data:', err)
        setError('Failed to load organization data')
      } finally {
        setIsLoading(false)
      }
    }

    fetchOrganizationData()
  }, [orgName])

  if (isLoading) {
    return (
      <main className="bg-black w-full min-h-screen flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </main>
    )
  }

  if (error || !organizationDetails) {
    return (
      <main className="bg-black w-full min-h-screen flex flex-col items-center justify-center">
        <div className="text-white mb-4">{error || 'Organization not found'}</div>
        <button className="bg-white text-black px-4 py-2 rounded" onClick={() => router.push('/')}>
          Return to Home
        </button>
      </main>
    )
  }

  return (
    <main className="bg-black w-full min-h-screen pb-10 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header with organization info */}
        <div className="flex items-start mb-12 border-b border-zinc-800 pb-8">
          <Link href="/" className="mr-6 mt-2">
            <ArrowLeft className="text-white hover:text-gray-300" />
          </Link>

          <div className="flex flex-col md:flex-row md:items-center gap-6">
            {organizationDetails.logo && (
              <img
                src={organizationDetails.logo}
                alt={organizationDetails.name}
                className="w-20 h-20 object-contain"
              />
            )}
            <div>
              <h1 className="text-3xl font-bold mb-4">{organizationDetails.name}</h1>
              <div className="flex gap-4">
                {organizationDetails.github && (
                  <a
                    href={organizationDetails.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline"
                  >
                    GitHub
                  </a>
                )}
                {organizationDetails.website && (
                  <a
                    href={organizationDetails.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline"
                  >
                    Website
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Ideas grid */}
        <div className="mt-12">
          <h2 className="text-3xl mb-8 archivo">Ideas ({organizationIdeas.length})</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {organizationIdeas.map((idea, index) => (
              <IdeaCard
                key={index}
                id={idea.id}
                name={idea.name}
                description={idea.description}
                categories={idea.categories}
                github={idea.github}
                website={idea.website}
                event={idea.event}
                author={idea.author}
                organizationLogo={idea.organizationLogo}
                organizationName={idea.organizationName}
                features={idea.features}
                type="organization"
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
