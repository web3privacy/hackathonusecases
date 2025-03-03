import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import ShareableCard from "@/components/ui/shareable-card";

// Function to read and parse the JSON files
const readIdeasFile = async (filename) => {
  try {
    const response = await fetch(`/ideas/${filename}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching ${filename}:`, error);
    return [];
  }
};

export default function IdeaPage() {
  const router = useRouter();
  const { id } = router.query;
  const [idea, setIdea] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchIdea = async () => {
      if (!id) return;
      
      setIsLoading(true);
      try {
        // Fetch from both sources and find the matching idea
        const communityIdeas = await readIdeasFile("community-ideas.json");
        const expertIdeas = await readIdeasFile("expert-ideas.json");
        
        // Add ids to ideas if they don't have them
        const processedCommunityIdeas = communityIdeas.map((idea, index) => {
          if (!idea.id) {
            const generatedId = `community-${idea.name.toLowerCase().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '')}-${index}`;
            return { ...idea, id: generatedId };
          }
          return idea;
        });
        
        const processedExpertIdeas = expertIdeas.map((idea, index) => {
          if (!idea.id) {
            const generatedId = `expert-${idea.name.toLowerCase().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '')}-${index}`;
            return { ...idea, id: generatedId };
          }
          return idea;
        });
        
        const allIdeas = [...processedCommunityIdeas, ...processedExpertIdeas];
        
        // Try to find by id
        let foundIdea = allIdeas.find(idea => idea.id === id);
        
        // If not found by id, try finding by name converted to id format
        if (!foundIdea) {
          foundIdea = allIdeas.find(idea => {
            const nameAsId = idea.name.toLowerCase().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');
            return nameAsId === id || `${nameAsId}-0` === id;
          });
        }
        
        if (foundIdea) {
          setIdea(foundIdea);
        } else {
          setError("Idea not found");
        }
      } catch (err) {
        console.error("Error fetching idea:", err);
        setError("Failed to load this idea");
      } finally {
        setIsLoading(false);
      }
    };

    fetchIdea();
  }, [id]);

  if (isLoading) {
    return (
      <main className="bg-black w-full min-h-screen flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </main>
    );
  }

  if (error || !idea) {
    return (
      <main className="bg-black w-full min-h-screen flex flex-col items-center justify-center">
        <div className="text-white mb-4">{error || "Idea not found"}</div>
        <button 
          className="bg-white text-black px-4 py-2 rounded"
          onClick={() => router.push('/')}
        >
          Return to Home
        </button>
      </main>
    );
  }

  return (
    <main className="bg-black w-full min-h-screen pb-10">
      <nav className="flex justify-between p-5 items-center">
        <img
          className="inline-flex justify-center w-40"
          alt="Web3PrivacyNow"
          src="https://web3privacy.info/logo.svg"
        />
        <button 
          className="border archivo text-xs flex space-x-3 items-center p-2"
          onClick={() => router.push('/')}
        >
          <h3>BACK TO GENERATOR</h3>
        </button>
      </nav>
      
      <div className="flex flex-col items-center mt-10">
        <h1 className="major text-center text-3xl md:text-5xl mb-8">
          Shared Idea
        </h1>
        
        <ShareableCard 
          id={idea.id}
          name={idea.name}
          description={idea.description}
          categories={idea.categories}
          github={idea.github}
          website={idea.website}
          source={idea.event}
          author={idea.author}
        />
        
        <div className="mt-8">
          <button 
            className="bg-white text-[#0d0d0d] archivo text-sm flex space-x-3 items-center p-2 mt-4"
            onClick={() => router.push('/')}
          >
            EXPLORE MORE IDEAS
          </button>
        </div>
      </div>
    </main>
  );
}