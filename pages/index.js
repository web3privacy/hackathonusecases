import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Filter, Github, Globe, Share2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import IdeaCard from "@/components/ui/idea-card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";
import bgCover from "../assets/generator.jpg";

// Function to read and parse the JSON file
const readIdeasFile = async (filename) => {
  try {
    const response = await fetch(`/ideas/${filename}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    
    // Add IDs to ideas if they don't have them
    const processedData = data.map((idea, index) => {
      if (!idea.id) {
        const filePrefix = filename.includes("community") ? "community" : 
                          filename.includes("expert") ? "expert" : "organization";
        const generatedId = `${filePrefix}-${idea.name.toLowerCase().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '')}-${index}`;
        return { ...idea, id: generatedId };
      }
      return idea;
    });
    
    console.log(`Data fetched from ${filename}:`, processedData);
    return processedData;
  } catch (error) {
    console.error(`Error fetching ${filename}:`, error);
    return [];
  }
};

// Function to select a random idea
const getRandomIdea = (ideas, selectedTags) => {
  if (ideas.length === 0) return null;
  const filteredIdeas =
    selectedTags.length > 0
      ? ideas.filter((idea) =>
        idea.categories.some((cat) => selectedTags.includes(cat))
      )
      : ideas;
  if (filteredIdeas.length === 0) return null;
  const randomIndex = Math.floor(Math.random() * filteredIdeas.length);
  return filteredIdeas[randomIndex];
};

// Function to get all unique tags from ideas
const getAllTags = (ideas) => {
  const tagSet = new Set();
  ideas.forEach((idea) => idea.categories.forEach((cat) => tagSet.add(cat)));
  return Array.from(tagSet);
};

// Function to determine card type based on idea properties
const getIdeaType = (idea) => {
  if (idea.organizationName || idea.organizationLogo || idea.features) {
    return 'organization';
  } else if (idea.author) {
    return 'expert';
  }
  return 'community';
};

export default function Home() {
  const router = useRouter();
  const contributeIdeaTo =
    "https://github.com/web3privacy/docs/blob/main/src/content/docs/projects/hackathon-use-cases-generator.md";
  const [communityIdeas, setCommunityIdeas] = useState([]);
  const [expertIdeas, setExpertIdeas] = useState([]);
  const [organizationIdeas, setOrganizationIdeas] = useState([]);
  const [selectedIdeaType, setSelectedIdeaType] = useState("community");
  const [generatedIdea, setGeneratedIdea] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [allTags, setAllTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [filteredTags, setFilteredTags] = useState([]);
  const [featuredCommunityIdeas, setFeaturedCommunityIdeas] = useState([]);
  const [featuredExpertIdeas, setFeaturedExpertIdeas] = useState([]);
  const [featuredOrganizationIdeas, setFeaturedOrganizationIdeas] = useState([]);
  const [uniqueOrganizations, setUniqueOrganizations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const communityData = await readIdeasFile("community-ideas.json");
        const expertData = await readIdeasFile("expert-ideas.json");
        
        // Try to fetch organization ideas, but don't fail if they don't exist
        let organizationData = [];
        try {
          organizationData = await readIdeasFile("organization-ideas.json");
        } catch (err) {
          console.warn("No organization ideas found:", err);
        }
        
        setCommunityIdeas(communityData);
        setExpertIdeas(expertData);
        setOrganizationIdeas(organizationData);
        
        const uniqueTags = getAllTags([...communityData, ...expertData, ...organizationData]);
        setAllTags(uniqueTags);
        setFilteredTags(uniqueTags);
        
        setFeaturedCommunityIdeas(
          communityData.filter((idea) => idea.featured === true)
        );
        setFeaturedExpertIdeas(
          expertData.filter((idea) => idea.featured === true)
        );
        setFeaturedOrganizationIdeas(
          organizationData.filter((idea) => idea.featured === true)
        );

        // Extract unique organizations for the organization links section
        if (organizationData.length > 0) {
          const orgs = Array.from(
            new Set(
              organizationData
                .filter(idea => idea.organizationName)
                .map(idea => idea.organizationName)
            )
          ).map(orgName => {
            const orgIdea = organizationData.find(idea => idea.organizationName === orgName);
            return {
              name: orgName,
              logo: orgIdea.organizationLogo || null,
              slug: orgName.toLowerCase().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '')
            };
          });
          setUniqueOrganizations(orgs);
        }
        
        setError(null);
      } catch (err) {
        setError("Failed to load ideas. Please try again later.");
        console.error("Error loading ideas:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleGenerateIdea = () => {
    let ideas;
    switch (selectedIdeaType) {
      case "community":
        ideas = communityIdeas;
        break;
      case "expert":
        ideas = expertIdeas;
        break;
      case "organization":
        ideas = organizationIdeas;
        break;
      default:
        ideas = [...communityIdeas, ...expertIdeas, ...organizationIdeas];
    }
    
    const newIdea = getRandomIdea(ideas, selectedTags);
    setGeneratedIdea(newIdea);
    console.log("Generated idea:", newIdea);
  };

  const handleTagToggle = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <main className="bg-black w-full min-h-screen pb-10">
      <div className="bg-image-class p-5" style={{ backgroundImage: `url(${bgCover.src})`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
        <nav className="flex justify-between p-5 items-center">
          <img
            className="inline-flex justify-center w-40"
            alt="Web3PrivacyNow"
            src="https://web3privacy.info/logo.svg"
          />
          <a href={contributeIdeaTo} target="_blank" rel="noopener noreferrer">
            <button className="border archivo text-xs flex space-x-3 items-center p-2">
              <h3>CONTRIBUTE AN IDEA</h3>
              <Github className="w-4" />
            </button>
          </a>
        </nav>
        <div>
          <h1 className="major text-center text-3xl md:text-5xl">
            privacy idea generator
          </h1>
          <h3 className="archivo text-center text-[#4c4c4c] mt-5 px-5 md:text-xl">
            Generate ideas curated by the Web3Privacy Now community and experts
          </h3>
          <div className="flex justify-center mt-10 md:mt-20 space-x-4">
            <Dialog>
              <DialogTrigger>
                <div
                  className="bg-white text-[#0d0d0d] archivo text-sm flex space-x-3 items-center p-2"
                  onClick={handleGenerateIdea}
                >
                  <h3>GENERATE IDEA</h3>
                </div>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogDescription className="">
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
                                onError={(e) => {
                                  e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(generatedIdea.author.name)}&background=random`;
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
                          <h1 className="archivo text-lg mb-4">
                            {generatedIdea.name}
                          </h1>
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
                                <li key={idx} className="text-sm opacity-70">- {feature}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        <div className="flex justify-between items-center my-3">
                          <div className="flex space-x-3 w-2/3">
                            {generatedIdea.categories.map((category, index) => (
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
                      <div>
                        Looks like no ideas were found for the specified filters
                      </div>
                    )}
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
            <DropdownMenu>
              <DropdownMenuTrigger className="archivo text-sm flex space-x-3 items-center p-2">
                <Filter className="text-white" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-72">
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    Filter by type (
                    {selectedIdeaType === "community"
                      ? "Community Ideas"
                      : selectedIdeaType === "expert"
                      ? "Expert Ideas"
                      : "Organization Ideas"}
                    )
                  </DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                      <DropdownMenuItem
                        onClick={() => setSelectedIdeaType("community")}
                      >
                        Community Ideas
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setSelectedIdeaType("expert")}
                      >
                        Expert Ideas
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setSelectedIdeaType("organization")}
                      >
                        Organization Ideas
                      </DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    Filter by tags ({selectedTags.length})
                  </DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent className="max-h-60 overflow-y-auto">
                      {allTags.map((tag) => (
                        <DropdownMenuCheckboxItem
                          key={tag}
                          checked={selectedTags.includes(tag)}
                          onCheckedChange={() => handleTagToggle(tag)}
                        >
                          {tag}
                        </DropdownMenuCheckboxItem>
                      ))}
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      
      {/* Organizations section styled like the screenshot */}
      {uniqueOrganizations.length > 0 && (
        <div className="mt-16 mb-12">
          <h1 className="major text-center text-4xl mb-12 uppercase">ORGANIZATIONS</h1>
          <div className="flex flex-wrap justify-center gap-8">
            {uniqueOrganizations.map((org, index) => (
              <Link 
                key={index} 
                href={`/org/${org.slug}`}
                className="flex flex-col items-center"
              >
                <div className="bg-zinc-900 p-8 rounded-md mb-2 hover:bg-zinc-800 transition-colors">
                  {org.logo ? (
                    <img 
                      src={org.logo} 
                      alt={org.name} 
                      className="w-24 h-24 object-contain" 
                    />
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
      
      <div className="mt-16">
        <h1 className="major text-center text-4xl uppercase mb-12">FEATURED IDEAS</h1>
        <Tabs defaultValue="community" className="mt-5">
          <div className="flex justify-center w-full">
            <TabsList className="archivo border border-zinc-800">
              <TabsTrigger
                value="community"
                onClick={() => setSelectedIdeaType("community")}
                className="px-6"
              >
                Community ideas
              </TabsTrigger>
              <TabsTrigger
                value="expert"
                onClick={() => setSelectedIdeaType("expert")}
                className="px-6"
              >
                Expert ideas
              </TabsTrigger>
              <TabsTrigger
                value="organization"
                onClick={() => setSelectedIdeaType("organization")}
                className="px-6"
              >
                Organization ideas
              </TabsTrigger>
            </TabsList>
          </div>
          <div className="mt-10 w-full text-left">
            <TabsContent value="community">
              <div className="md:flex flex-wrap md:justify-center justify-start px-5 gap-5 space-y-5 md:space-y-0">
                {featuredCommunityIdeas.map((idea, index) => (
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
            </TabsContent>
            <TabsContent value="expert">
              <div className="md:flex flex-wrap md:justify-center justify-start px-5 gap-5 space-y-5 md:space-y-0">
                {featuredExpertIdeas.map((idea, index) => (
                  <IdeaCard
                    key={index}
                    id={idea.id}
                    name={idea.name}
                    description={idea.description}
                    categories={idea.categories}
                    author={idea.author}
                    github={idea.github}
                    website={idea.website}
                    event={idea.event}
                    type="expert"
                  />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="organization">
              <div className="md:flex flex-wrap md:justify-center justify-start px-5 gap-5 space-y-5 md:space-y-0">
                {featuredOrganizationIdeas.map((idea, index) => (
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
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </main>
  );
}