import React, { useState } from 'react';
import { Share2, Github, Globe, Copy, Check } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';

const IdeaCard = ({ 
  id = '', 
  name,
  description,
  categories = [],
  github,
  website,
  event,
  author,
  type = 'community', // 'community', 'expert', or 'organization'
  organizationLogo,
  organizationName,
  features = []
}) => {
  const [copied, setCopied] = useState(false);
  const shareUrl = typeof window !== 'undefined' ? `${window.location.origin}/idea/${id}` : '';
  
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  // Format Twitter handle from URL
  const formatTwitterHandle = (url) => {
    if (typeof url !== 'string') return null;
    if (url.includes('twitter.com/') || url.includes('x.com/')) {
      const handle = url.split('/').pop();
      return `@${handle}`;
    }
    return url;
  };

  // Generate placeholder avatar URL based on twitter handle
  const getAvatarUrl = (twitterUrl) => {
    if (typeof twitterUrl !== 'string') return null;
    // Extract username from Twitter URL
    const username = twitterUrl.split('/').pop();
    
    // Generate a unique but consistent color based on username
    const getColor = (str) => {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
      }
      const color = (hash & 0x00FFFFFF).toString(16).toUpperCase();
      return "00000".substring(0, 6 - color.length) + color;
    };
    
    const color = getColor(username);
    // Use UI Avatars service to generate a profile picture with user's initials
    return `https://ui-avatars.com/api/?name=${username}&background=${color}&color=fff`;
  };

  // Extract expert details if provided
  const getExpertDetails = () => {
    if (typeof author === 'object' && author !== null) {
      return {
        name: author.name,
        avatar: author.avatar || getAvatarUrl(author.name),
        organization: author.organization,
        displayName: author.name,
        twitterUrl: typeof author.name === 'string' && 
                   (author.name.includes('twitter.com/') || author.name.includes('x.com/')) ? 
                   author.name : null
      };
    } else if (typeof author === 'string') {
      const formattedHandle = formatTwitterHandle(author);
      return {
        name: author,
        avatar: getAvatarUrl(author),
        organization: null,
        displayName: formattedHandle || author,
        twitterUrl: (author.includes('twitter.com/') || author.includes('x.com/')) ? author : null
      };
    }
    return null;
  };

  const expertDetails = type === 'expert' ? getExpertDetails() : null;

  // Render different card headers based on type
  const renderCardHeader = () => {
    if (type === 'organization') {
      return (
        <div className="flex items-center mb-4 pb-3 border-b border-zinc-800">
          {organizationLogo && (
            <div className="mr-3">
              <img 
                src={organizationLogo} 
                alt={organizationName || name}
                className="w-10 h-10 rounded object-contain" 
              />
            </div>
          )}
          <div className="flex-1">
            <h3 className="archivo text-md font-medium">{organizationName || name}</h3>
          </div>
        </div>
      );
    } else if (type === 'expert' && expertDetails) {
      return (
        <div className="flex items-center mb-4 pb-3 border-b border-zinc-800">
          {expertDetails.avatar && (
            <div className="mr-3">
              <a 
                href={expertDetails.twitterUrl || '#'} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block w-10 h-10 rounded-full overflow-hidden"
              >
                <img 
                  src={expertDetails.avatar} 
                  alt={expertDetails.displayName} 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = getAvatarUrl(expertDetails.name);
                  }}
                />
              </a>
            </div>
          )}
          <div className="flex-1">
            <h3 className="archivo text-md font-medium">
              <a 
                href={expertDetails.twitterUrl || '#'} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:underline"
              >
                {expertDetails.displayName}
              </a>
            </h3>
            {expertDetails.organization && (
              <p className="text-xs text-zinc-400">{expertDetails.organization}</p>
            )}
          </div>
        </div>
      );
    }
    
    // Default community header
    return (
      <div className="h-10">
        <h1 className="archivo text-lg mb-4">{name}</h1>
      </div>
    );
  };

  // Render feature list for organization cards
  const renderFeatures = () => {
    if (type === 'organization' && features && features.length > 0) {
      return (
        <div className="mt-2 mb-4">
          <h3 className="text-sm font-medium mb-1">Privacy features:</h3>
          <ul className="list-none pl-0">
            {features.map((feature, idx) => (
              <li key={idx} className="text-sm opacity-70">- {feature}</li>
            ))}
          </ul>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-[#0d0d0d] md:w-1/3 w-full p-6">
      {renderCardHeader()}
      
      {/* For organization cards, put name after the org header if not already used */}
      {type === 'organization' && organizationName && (
        <div className="h-10">
          <h1 className="archivo text-lg mb-4">{name}</h1>
        </div>
      )}
      
      {type !== 'expert' && <hr className="opacity-10 my-2" />}
      
      <div className="h-20">
        <h3 className="archivo mt-4 text-sm opacity-50">{description}</h3>
      </div>
      
      {renderFeatures()}
      
      <div className='flex justify-between items-center my-3'>
        <div className="flex flex-wrap gap-1 w-2/3">
          {categories.map((category, index) => (
            <Badge key={index} variant="secondary" className="mr-1 mb-1">{category}</Badge>
          ))}
        </div>
        <div className='w-1/3 text-xs text-end flex justify-end space-x-3'>
          {github && (
            <a href={github} target="_blank" rel="noopener noreferrer">
              <Github className='w-5 h-5' />
            </a>
          )}
          {website && (
            <a href={website} target="_blank" rel="noopener noreferrer">
              <Globe className='w-5 h-5' />
            </a>
          )}
          <Dialog>
            <DialogTrigger asChild>
              <button className="focus:outline-none">
                <Share2 className='w-5 h-5' />
              </button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Share this idea</DialogTitle>
                <DialogDescription>
                  Copy the link below to share this idea with others
                </DialogDescription>
              </DialogHeader>
              <div className="flex items-center space-x-2 mt-4">
                <input
                  className="flex h-10 w-full rounded-md border border-stone-800 bg-[#0d0d0d] px-3 py-2 text-sm"
                  value={shareUrl}
                  readOnly
                />
                <Button size="icon" onClick={handleCopyLink} variant="outline">
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <hr className="opacity-10 my-3" />
      {event && (
        <h3 className="archivo mt-2 text-sm opacity-50 text-end hover:underline cursor-pointer">{event}</h3>
      )}
    </div>
  );
};

export default IdeaCard;