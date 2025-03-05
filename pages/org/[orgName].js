import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { ArrowLeft, Github, Globe, Share2, Copy, Check } from "lucide-react";
import IdeaCard from "@/components/ui/idea-card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Function to read and parse the JSON files
const readIdeasFile = async (filename) => {
  try {
    const response = await fetch(`/ideas/${filename}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    
    // Add IDs to ideas if they don't have them
    return data.map((idea, index) => {
      if (!idea.id) {
        const filePrefix = filename.includes("community") ? "community" : 
                         filename.includes("expert") ? "expert" : "organization";
        const generatedId = `${filePrefix}-${idea.name.toLowerCase().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '')}-${index}`;
        return { ...idea, id: generatedId };
      }
      return idea;
    });
  } catch (error) {
    console.error(`Error fetching ${filename}:`, error);
    return [];
  }
};

export default function OrganizationPage() {
  const router = useRouter();
  const { orgName } = router.query;
  const [organizationIdeas, setOrganizationIdeas] = useState([]);
  const [organizationDetails, setOrganizationDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  useEffect(() => {
    const fetchOrganizationIdeas = async () => {
      if (!orgName) return;
      
      setIsLoading(true);
      try {
        // We'll try to fetch from all idea sources to find matching org ideas
        let allIdeas = [];
        
        try {
          const organizationData = await readIdeasFile("organization-ideas.json");
          allIdeas = [...allIdeas, ...organizationData];
        } catch (err) {
          console.warn("Error loading organization ideas:", err);
        }
        
        try {
          const expertData = await readIdeasFile("expert-ideas.json");
          allIdeas = [...allIdeas, ...expertData];
        } catch (err) {
          console.warn("Error loading expert ideas:", err);
        }
        
        try {
          const communityData = await readIdeasFile("community-ideas.json");
          allIdeas = [...allIdeas, ...communityData];
        } catch (err) {
          console.warn("Error loading community ideas:", err);
        }
        
        // Normalize the organization name for comparison
        const normalizedOrgName = orgName.toLowerCase();
        
        // Filter ideas that belong to this organization
        const filteredIdeas = allIdeas.filter(idea => {
          // For organization ideas, check organizationName
          if (idea.organizationName && 
              idea.organizationName.toLowerCase().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '') === normalizedOrgName) {
            return true;
          }
          
          return false;
        });

        if (filteredIdeas.length === 0) {
          setError(`No ideas found for ${orgName}`);
        } else {
          setOrganizationIdeas(filteredIdeas);
          
          // Find the organization details from the first matching idea
          const orgIdea = filteredIdeas.find(idea => idea.organizationName);
          if (orgIdea) {
            setOrganizationDetails({
              name: orgIdea.organizationName,
              logo: orgIdea.organizationLogo,
              github: orgIdea.github,
              website: orgIdea.website
            });
          }
        }
      } catch (err) {
        console.error("Error fetching organization ideas:", err);
        setError(`Failed to load ideas for ${orgName}. Please try again later.`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrganizationIdeas();
  }, [orgName]);

  if (isLoading) {
    return (
      <main className="bg-black w-full min-h-screen flex items-center justify-center text-white">
        <div>Loading ideas for {orgName}...</div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="bg-black w-full min-h-screen flex flex-col items-center justify-center text-white">
        <div className="mb-6">{error}</div>
        <Link href="/" className="bg-white text-black px-4 py-2 rounded flex items-center gap-2">
          <ArrowLeft size={16} />
          Return to Home
        </Link>
      </main>
    );
  }

  return (
    <main className="bg-black w-full min-h-screen pb-10 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header with organization info */}
        <div className="flex items-start mb-12 border-b border-zinc-800 pb-8">
          <Link href="/" className="mr-6 mt-2">
            <ArrowLeft className="text-white hover:text-gray-300" />
          </Link>
          
          {organizationDetails && (
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
                <div className="flex mt-2 space-x-6">
                  {organizationDetails.github && (
                    <a 
                      href={organizationDetails.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-xl hover:text-gray-300"
                    >
                      GitHub
                    </a>
                  )}
                  {organizationDetails.website && (
                    <a 
                      href={organizationDetails.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-xl hover:text-gray-300"
                    >
                      Website
                    </a>
                  )}
                  <Dialog>
                    <DialogTrigger asChild>
                      <button className="text-xl hover:text-gray-300 flex items-center">
                        <span className="mr-1">Share</span>
                        <Share2 className="w-5 h-5" />
                      </button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Share {organizationDetails.name} Ideas</DialogTitle>
                        <DialogDescription>
                          Copy the link below to share all {organizationDetails.name} ideas
                        </DialogDescription>
                      </DialogHeader>
                      <div className="flex items-center space-x-2 mt-4">
                        <input
                          className="flex h-10 w-full rounded-md border border-stone-800 bg-[#0d0d0d] px-3 py-2 text-sm"
                          value={shareUrl}
                          readOnly/>
                          <Button size="icon" onClick={handleCopyLink} variant="outline">
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </div>
            )}
            
            {!organizationDetails && (
              <h1 className="text-4xl font-bold">Ideas from {orgName}</h1>
            )}
          </div>
          
          {/* Ideas grid */}
          <div className="mt-12">
            <h2 className="text-3xl mb-8 archivo">Ideas ({organizationIdeas.length})</h2>
            <div className="md:flex flex-wrap md:justify-start justify-start gap-6 space-y-5 md:space-y-0">
              {organizationIdeas.map((idea, index) => {
                // Determine idea type
                let ideaType = "organization";
                
                return (
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
                    type={ideaType}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </main>
    );
  }