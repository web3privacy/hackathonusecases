import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import IdeaCard from '@/src/components/ui/idea-card'
import { IdeasAPI } from '@/src/lib/api/ideas'
import { determineIdeaType, getIdeaTypeDisplayName } from '@/src/lib/utils/idea-helpers'
import { APP_CONFIG } from '@/src/lib/constants/config'
import type { Idea } from '@/src/types'

export default function IdeaPage() {
  const router = useRouter()
  const { id } = router.query
  const [idea, setIdea] = useState<Idea | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchIdea = async () => {
      if (!id || typeof id !== 'string') return

      setIsLoading(true)
      setError(null)

      try {
        const foundIdea = await IdeasAPI.findIdeaById(id)

        if (foundIdea) {
          setIdea(foundIdea)
        } else {
          setError('Idea not found')
        }
      } catch (err) {
        console.error('Error fetching idea:', err)
        setError('Failed to load this idea')
      } finally {
        setIsLoading(false)
      }
    }

    fetchIdea()
  }, [id])

  if (isLoading) {
    return (
      <main className="bg-black w-full min-h-screen flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </main>
    )
  }

  if (error || !idea) {
    return (
      <main className="bg-black w-full min-h-screen flex flex-col items-center justify-center">
        <div className="text-white mb-4">{error || 'Idea not found'}</div>
        <button className="bg-white text-black px-4 py-2 rounded" onClick={() => router.push('/')}>
          Return to Home
        </button>
      </main>
    )
  }

  const ideaType = determineIdeaType(idea)
  const displayName = getIdeaTypeDisplayName(ideaType)

  return (
    <main className="bg-black w-full min-h-screen pb-10">
      <nav className="flex justify-between p-5 items-center">
        <img
          className="inline-flex justify-center w-40"
          alt="Web3PrivacyNow"
          src={APP_CONFIG.LOGO_URL}
        />
        <button
          className="border archivo text-xs flex space-x-3 items-center p-2"
          onClick={() => router.push('/')}
        >
          <h3>BACK TO GENERATOR</h3>
        </button>
      </nav>

      <div className="container mx-auto max-w-4xl px-4 mt-10">
        <h1 className="major text-center text-3xl md:text-5xl mb-8">{displayName}</h1>

        <div className="flex justify-center">
          <div className="w-full max-w-2xl">
            <IdeaCard
              id={idea.id}
              name={idea.name}
              description={idea.description}
              categories={idea.categories}
              github={idea.github}
              website={idea.website}
              event={idea.event}
              author={idea.author}
              type={ideaType}
              organization={idea.organization}
              organizationLogo={idea.organizationLogo}
              organizationName={idea.organizationName}
              features={idea.features}
            />
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <button
            className="bg-white text-[#0d0d0d] archivo text-sm flex space-x-3 items-center p-2"
            onClick={() => router.push('/')}
          >
            EXPLORE MORE IDEAS
          </button>
        </div>
      </div>
    </main>
  )
}
