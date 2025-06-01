import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Filter, Github, Globe, Share2, ChevronLeft, ChevronRight } from 'lucide-react'

// Updated imports using our improved structure
import { useIdeas } from '@/src/lib/hooks/use-ideas'
import { useIdeaFilters } from '@/src/lib/hooks/use-idea-filters'
import { usePagination } from '@/src/lib/hooks/use-pagination'
import { APP_CONFIG } from '@/src/lib/constants/config'
import { generateOrganizationSlug } from '@/src/lib/utils/id-generator'

// UI Components with correct paths
import { Badge } from '@/src/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/src/components/ui/tabs'
import IdeaCard from '@/src/components/ui/idea-card'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/src/components/ui/dialog'

// Types
import type { Idea, Organization, PaginationProps } from '@/src/types'

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex justify-center items-center space-x-4 mt-8 mb-8">
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage <= 1}
        className={`p-2 ${currentPage <= 1 ? 'opacity-50 cursor-not-allowed' : 'hover:text-zinc-300 cursor-pointer'}`}
        aria-label="Previous page"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <div className="archivo text-sm">
        {currentPage} / {Math.max(totalPages, 1)}
      </div>

      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage >= totalPages}
        className={`p-2 ${currentPage >= totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:text-zinc-300 cursor-pointer'}`}
        aria-label="Next page"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  )
}

const FilterModal = ({
  selectedIdeaType,
  selectedTags,
  allTags,
  setSelectedIdeaType,
  toggleTag,
}: {
  selectedIdeaType: string
  selectedTags: string[]
  allTags: string[]
  setSelectedIdeaType: (type: any) => void
  toggleTag: (tag: string) => void
}) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button className="archivo text-sm flex space-x-2 sm:space-x-3 items-center p-2 border">
          <Filter className="text-white w-4 h-4" />
          <span className="hidden sm:inline">Filter</span>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Filter Ideas</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          {/* Type Filter */}
          <div>
            <h3 className="text-sm font-medium mb-3">Filter by type</h3>
            <div className="space-y-2">
              {[
                { value: 'community', label: 'Community Ideas' },
                { value: 'expert', label: 'Expert Ideas' },
                { value: 'organization', label: 'Organization Ideas' },
              ].map(option => (
                <button
                  key={option.value}
                  onClick={() => setSelectedIdeaType(option.value)}
                  className={`w-full text-left p-2 rounded text-sm transition-colors ${
                    selectedIdeaType === option.value
                      ? 'bg-white text-black'
                      : 'bg-zinc-800 text-white hover:bg-zinc-700'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tags Filter */}
          <div>
            <h3 className="text-sm font-medium mb-3">
              Filter by tags ({selectedTags.length} selected)
            </h3>
            <div className="max-h-60 overflow-y-auto space-y-1">
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`w-full text-left p-2 rounded text-sm transition-colors ${
                    selectedTags.includes(tag)
                      ? 'bg-white text-black'
                      : 'bg-zinc-800 text-white hover:bg-zinc-700'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => setIsOpen(false)}
            className="w-full bg-white text-black p-2 rounded text-sm font-medium"
          >
            Apply Filters
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default function Home() {
  const router = useRouter()
  const [generatedIdea, setGeneratedIdea] = useState<Idea | null>(null)

  // Use our new custom hooks
  const { communityIdeas, expertIdeas, organizationIdeas, isLoading, error } = useIdeas()

  const { selectedIdeaType, selectedTags, allTags, setSelectedIdeaType, toggleTag, getRandomIdea } =
    useIdeaFilters({ communityIdeas, expertIdeas, organizationIdeas })

  // Get featured ideas
  const featuredCommunityIdeas = communityIdeas.filter(idea => idea.featured === true)
  const featuredExpertIdeas = expertIdeas.filter(idea => idea.featured === true)
  const featuredOrganizationIdeas = organizationIdeas.filter(idea => idea.featured === true)

  // Pagination hooks for each type
  const communityPagination = usePagination({ items: featuredCommunityIdeas })
  const expertPagination = usePagination({ items: featuredExpertIdeas })
  const organizationPagination = usePagination({ items: featuredOrganizationIdeas })

  // Extract unique organizations
  const uniqueOrganizations: Organization[] = Array.from(
    new Set(
      organizationIdeas.filter(idea => idea.organizationName).map(idea => idea.organizationName!)
    )
  ).map(orgName => {
    const orgIdea = organizationIdeas.find(idea => idea.organizationName === orgName)
    return {
      name: orgName,
      logo: orgIdea?.organizationLogo || null,
      slug: generateOrganizationSlug(orgName),
    }
  })

  const handleGenerateIdea = (): void => {
    const newIdea = getRandomIdea()
    setGeneratedIdea(newIdea)
    console.log('Generated idea:', newIdea)
  }

  const handleTabChange = (value: string): void => {
    setSelectedIdeaType(value as any)
  }

  return (
    <main className="bg-black w-full min-h-screen pb-10">
      <div
        className="bg-image-class p-5"
        style={{
          backgroundImage: `url(/images/generator.jpg)`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
      >
        <nav className="flex justify-between p-5 items-center">
          <img
            className="inline-flex justify-center w-32 sm:w-40"
            alt="Web3PrivacyNow"
            src={APP_CONFIG.LOGO_URL}
          />
          <a href={APP_CONFIG.CONTRIBUTE_URL} target="_blank" rel="noopener noreferrer">
            <button className="border archivo text-xs flex space-x-2 sm:space-x-3 items-center p-2">
              <h3 className="hidden sm:inline">CONTRIBUTE AN IDEA</h3>
              <h3 className="sm:hidden">CONTRIBUTE</h3>
              <Github className="w-4" />
            </button>
          </a>
        </nav>

        <div>
          <h1 className="major text-center text-2xl sm:text-3xl md:text-5xl px-4">
            privacy idea generator
          </h1>
          <h3 className="archivo text-center text-[#4c4c4c] mt-5 px-5 text-sm sm:text-base md:text-xl">
            Generate ideas curated by the Web3Privacy Now community and experts
          </h3>

          <div className="flex justify-center mt-10 md:mt-20 space-x-4 px-4">
            <Dialog>
              <DialogTrigger>
                <div
                  className="bg-white text-[#0d0d0d] archivo text-sm flex space-x-2 sm:space-x-3 items-center p-2"
                  onClick={handleGenerateIdea}
                >
                  <h3 className="hidden sm:inline">GENERATE IDEA</h3>
                  <h3 className="sm:hidden">GENERATE</h3>
                </div>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Generated Idea</DialogTitle>
                </DialogHeader>
                <div className="space-y-6">
                  {isLoading ? (
                    <p>Loading ideas...</p>
                  ) : error ? (
                    <p>{error}</p>
                  ) : generatedIdea ? (
                    <>
                      {/* Expert info display */}
                      {generatedIdea.author && typeof generatedIdea.author === 'object' && (
                        <div className="flex items-center mb-4">
                          {generatedIdea.author.avatar && (
                            <img
                              src={generatedIdea.author.avatar}
                              alt={generatedIdea.author.name}
                              className="w-10 h-10 rounded-full mr-3 object-cover"
                              onError={e => {
                                const target = e.target as HTMLImageElement
                                target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                  generatedIdea.author && typeof generatedIdea.author === 'object'
                                    ? generatedIdea.author.name
                                    : 'Unknown'
                                )}&background=random`
                              }}
                            />
                          )}
                          <div>
                            <h3 className="archivo text-md font-medium">
                              {generatedIdea.author.name}
                            </h3>
                            {generatedIdea.author.organization && (
                              <p className="text-xs text-zinc-400">
                                {generatedIdea.author.organization}
                              </p>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Organization info display */}
                      {generatedIdea.organizationName && (
                        <div className="flex items-center mb-4">
                          {generatedIdea.organizationLogo && (
                            <img
                              src={generatedIdea.organizationLogo}
                              alt={generatedIdea.organizationName}
                              className="w-12 h-12 mr-3 object-contain"
                            />
                          )}
                          <h3 className="archivo text-md font-medium">
                            {generatedIdea.organizationName}
                          </h3>
                        </div>
                      )}

                      <div className="h-10">
                        <h1 className="archivo text-lg mb-4">{generatedIdea.name}</h1>
                      </div>
                      <hr className="opacity-10 my-2" />
                      <div className="h-20">
                        <h3 className="archivo mt-4 text-sm opacity-50">
                          {generatedIdea.description}
                        </h3>
                      </div>

                      {/* Features list for organization ideas */}
                      {generatedIdea.features && generatedIdea.features.length > 0 && (
                        <div className="mt-4 mb-2">
                          <h4 className="text-sm font-medium">Privacy features:</h4>
                          <ul className="list-none pl-0">
                            {generatedIdea.features.map((feature, idx) => (
                              <li key={idx} className="text-sm opacity-70">
                                - {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <div className="flex justify-between items-center my-3">
                        <div className="flex space-x-3 w-2/3">
                          {generatedIdea.categories?.map((category, index) => (
                            <Badge key={index} variant="secondary">
                              {category}
                            </Badge>
                          ))}
                        </div>
                        <div className="w-1/3 text-xs text-end flex justify-end space-x-3">
                          {generatedIdea.github && (
                            <a
                              href={generatedIdea.github}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Github className="w-5 h-5" />
                            </a>
                          )}
                          {generatedIdea.website && (
                            <a
                              href={generatedIdea.website}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Globe className="w-5 h-5" />
                            </a>
                          )}
                        </div>
                      </div>
                      <hr className="opacity-10 my-3" />
                      {generatedIdea.event && (
                        <h3 className="archivo text-lg mb-4 text-center mx-auto">
                          {generatedIdea.event}
                        </h3>
                      )}
                      <div className="flex justify-center gap-4">
                        <button
                          className="bg-white text-[#0d0d0d] archivo text-sm flex space-x-3 items-center p-2 mt-4"
                          onClick={handleGenerateIdea}
                        >
                          GENERATE AGAIN
                        </button>
                        <button
                          className="border archivo text-sm flex items-center p-2 mt-4"
                          onClick={() => router.push(`/idea/${generatedIdea.id}`)}
                        >
                          <Share2 className="w-4 h-4 mr-2" />
                          SHARE
                        </button>
                      </div>
                    </>
                  ) : (
                    <div>Looks like no ideas were found for the specified filters</div>
                  )}
                </div>
              </DialogContent>
            </Dialog>

            <FilterModal
              selectedIdeaType={selectedIdeaType}
              selectedTags={selectedTags}
              allTags={allTags}
              setSelectedIdeaType={setSelectedIdeaType}
              toggleTag={toggleTag}
            />
          </div>
        </div>
      </div>

      {/* Organizations section */}
      {uniqueOrganizations.length > 0 && (
        <div className="container mx-auto max-w-6xl px-4 mt-16 mb-12">
          <h1 className="major text-center text-4xl mb-12 uppercase">ORGANIZATIONS</h1>
          <div className="flex flex-wrap justify-center gap-8">
            {uniqueOrganizations.map((org, index) => (
              <Link key={index} href={`/org/${org.slug}`} className="flex flex-col items-center">
                <div className="bg-zinc-900 p-8 rounded-md mb-2 hover:bg-zinc-800 transition-colors">
                  {org.logo ? (
                    <img src={org.logo} alt={org.name} className="w-24 h-24 object-contain" />
                  ) : (
                    <div className="w-24 h-24 flex items-center justify-center bg-zinc-800 rounded">
                      {org.name.substring(0, 2).toUpperCase()}
                    </div>
                  )}
                </div>
                <span className="text-center text-lg mt-2">{org.name}</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Featured Ideas section */}
      <div className="container mx-auto max-w-6xl px-4 mt-16">
        <h1 className="major text-center text-4xl uppercase mb-12">FEATURED IDEAS</h1>
        <Tabs defaultValue="community" className="mt-5" onValueChange={handleTabChange}>
          <div className="flex justify-center w-full overflow-x-auto">
            <TabsList className="archivo border border-zinc-800 min-w-fit">
              <TabsTrigger value="community" className="px-3 sm:px-6 text-xs sm:text-sm">
                Community ideas
              </TabsTrigger>
              <TabsTrigger value="expert" className="px-3 sm:px-6 text-xs sm:text-sm">
                Expert ideas
              </TabsTrigger>
              <TabsTrigger value="organization" className="px-3 sm:px-6 text-xs sm:text-sm">
                Organization ideas
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="mt-10 w-full text-left">
            <TabsContent value="community">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {communityPagination.paginatedItems.map((idea, index) => (
                  <IdeaCard
                    key={index}
                    id={idea.id}
                    name={idea.name}
                    description={idea.description}
                    categories={idea.categories}
                    github={idea.github}
                    website={idea.website}
                    event={idea.event}
                    type="community"
                  />
                ))}
              </div>
              <Pagination
                currentPage={communityPagination.currentPage}
                totalPages={communityPagination.totalPages}
                onPageChange={communityPagination.setCurrentPage}
              />
            </TabsContent>

            <TabsContent value="expert">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {expertPagination.paginatedItems.map((idea, index) => (
                  <IdeaCard
                    key={index}
                    id={idea.id}
                    name={idea.name}
                    description={idea.description}
                    categories={idea.categories}
                    author={idea.author}
                    organization={idea.organization}
                    github={idea.github}
                    website={idea.website}
                    event={idea.event}
                    type="expert"
                  />
                ))}
              </div>
              <Pagination
                currentPage={expertPagination.currentPage}
                totalPages={expertPagination.totalPages}
                onPageChange={expertPagination.setCurrentPage}
              />
            </TabsContent>

            <TabsContent value="organization">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {organizationPagination.paginatedItems.map((idea, index) => (
                  <IdeaCard
                    key={index}
                    id={idea.id}
                    name={idea.name}
                    description={idea.description}
                    categories={idea.categories}
                    github={idea.github}
                    website={idea.website}
                    organizationLogo={idea.organizationLogo}
                    organizationName={idea.organizationName}
                    features={idea.features}
                    type="organization"
                  />
                ))}
              </div>
              <Pagination
                currentPage={organizationPagination.currentPage}
                totalPages={organizationPagination.totalPages}
                onPageChange={organizationPagination.setCurrentPage}
              />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </main>
  )
}
