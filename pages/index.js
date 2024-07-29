import { useState, useEffect } from "react";
import { Filter, Github, Globe } from "lucide-react";
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
import {
  UserPlus,
  Mail,
  MessageSquare,
  DropdownMenuSeparator,
  PlusCircle,
} from "lucide-react";

// Function to read and parse the JSON file
const readIdeasFile = async (filename) => {
  try {
    const response = await fetch(`/ideas/${filename}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log(`Data fetched from ${filename}:`, data);
    return data;
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

export default function Home() {
  const contributeIdeaTo =
    "https://github.com/web3privacy/docs/blob/main/src/content/docs/projects/hackathon-use-cases-generator.md";
  const [communityIdeas, setCommunityIdeas] = useState([]);
  const [expertIdeas, setExpertIdeas] = useState([]);
  const [selectedIdeaType, setSelectedIdeaType] = useState("community");
  const [generatedIdea, setGeneratedIdea] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [allTags, setAllTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [filteredTags, setFilteredTags] = useState([]);
  const [featuredCommunityIdeas, setFeaturedCommunityIdeas] = useState([]);
  const [featuredExpertIdeas, setFeaturedExpertIdeas] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const communityData = await readIdeasFile("community-ideas.json");
        const expertData = await readIdeasFile("expert-ideas.json");
        setCommunityIdeas(communityData);
        setExpertIdeas(expertData);
        const uniqueTags = getAllTags([...communityData, ...expertData]);
        setAllTags(uniqueTags);
        setFilteredTags(uniqueTags);
        setFeaturedCommunityIdeas(
          communityData.filter((idea) => idea.featured === true)
        );
        setFeaturedExpertIdeas(
          expertData.filter((idea) => idea.featured === true)
        );
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
    const ideas =
      selectedIdeaType === "community" ? communityIdeas : expertIdeas;
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
      <nav className="flex justify-between p-5 items-center bg-[#0d0d0d]">
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
      <div className="bg-[#0d0d0d] h-96 pt-20">
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
                      <h3 className="archivo mt-2 text-sm opacity-50 text-end hover:underline cursor-pointer">
                        Source: {generatedIdea.event}
                      </h3>
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
                    : "Expert Ideas"}
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
      <div className="mt-10">
        <h1 className="major text-center text-xl">featured ideas</h1>
        <Tabs defaultValue="community" className="mt-5">
          <div className="flex justify-center w-full">
            <TabsList className="archivo">
              <TabsTrigger value="community">Community ideas</TabsTrigger>
              <TabsTrigger value="expert">Expert ideas</TabsTrigger>
            </TabsList>
          </div>
          <div className="mt-10 w-full text-left">
            <TabsContent value="community">
              <div className="md:flex flex-wrap md:justify-center justify-start px-5 gap-5 space-y-5 md:space-y-0">
                {featuredCommunityIdeas.map((idea, index) => (
                  <IdeaCard
                    key={index}
                    name={idea.name}
                    description={idea.description}
                    categories={idea.categories}
                    github={idea.Github}
                    source={idea.event}
                  />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="expert">
              <div className="md:flex flex-wrap md:justify-center justify-start px-5 gap-5 space-y-5 md:space-y-0">
                {featuredExpertIdeas.map((idea, index) => (
                  <IdeaCard
                    key={index}
                    name={idea.name}
                    description={idea.description}
                    categories={idea.categories}
                    github={idea.Github}
                    source={idea.event}
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
