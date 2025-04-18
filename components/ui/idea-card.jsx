import React, { useState, useEffect } from 'react';
import Link from 'next/link';
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
import ReactMarkdown from 'react-markdown';

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
  organization,
  organizationLogo,
  organizationName,
  features = []
}) => {
  const [copied, setCopied] = useState(false);
  const [avatarLoaded, setAvatarLoaded] = useState(false);
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

  const getExpertDetails = () => {
    if (typeof author === 'object' && author !== null) {
      const isTwitterUrl = typeof author.name === 'string' &&
        (author.name.includes('twitter.com/') || author.name.includes('x.com/'));
      const twitterHandle = isTwitterUrl ? author.name.split('/').pop() : null;
      const twitterAvatar = twitterHandle ? `https://unavatar.io/twitter/${twitterHandle}` : null;

      return {
        name: author.name,
        avatar: twitterAvatar,
        organization: author.organization || organization,
        displayName: isTwitterUrl ? `@${twitterHandle}` : author.name,
        twitterUrl: isTwitterUrl ? author.name : null
      };
    } else if (typeof author === 'string') {
      const isTwitterUrl = author.includes('twitter.com/') || author.includes('x.com/');
      const twitterHandle = isTwitterUrl ? author.split('/').pop() : null;
      const twitterAvatar = twitterHandle ? `https://unavatar.io/twitter/${twitterHandle}` : null;

      return {
        name: author,
        avatar: twitterAvatar,
        organization: organization,
        displayName: isTwitterUrl ? `@${twitterHandle}` : author,
        twitterUrl: isTwitterUrl ? author : null
      };
    }
    return null;
  };
  const expertDetails = type === 'expert' ? getExpertDetails() : null;

  const getOrgPathName = () => {
    if (organizationName) {
      return organizationName.toLowerCase().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');
    }
    return null;
  };

  const renderCardHeader = () => {
    if (type === 'organization') {
      const orgPath = getOrgPathName();
      return (
        <div className="flex items-center mb-4 pb-3 border-b border-zinc-800">
          {organizationLogo && (
            <div className="mr-3">
              <Link href={`/org/${orgPath}`}>
                <img
                  src={organizationLogo}
                  alt={organizationName || name}
                  className="w-10 h-10 rounded object-contain cursor-pointer"
                />
              </Link>
            </div>
          )}
          <div className="flex-1">
            <Link
              href={`/org/${orgPath}`}
              className="archivo text-md font-medium hover:underline"
            >
              {organizationName || name}
            </Link>
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
                className="block w-10 h-10 rounded-full overflow-hidden relative"
              >
                {!avatarLoaded && (
                  <div className="absolute inset-0 bg-zinc-800 animate-pulse rounded-full" />
                )}
                <img
                  src={expertDetails.avatar}
                  alt={expertDetails.displayName}
                  className={`w-full h-full object-cover transition-opacity duration-300 ${
                    avatarLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                  onLoad={() => setAvatarLoaded(true)}
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
          </div>
        </div>
      );
    }
    return (
      <div className="h-10">
        <h1 className="archivo text-lg mb-4">{name}</h1>
      </div>
    );
  };

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

  const renderDescription = () => {
    return (
      <div className="mt-4 mb-4 archivo text-sm opacity-70 prose prose-invert prose-sm max-w-none">
        <ReactMarkdown>{description}</ReactMarkdown>
      </div>
    );
  };

  return (
    <div className="bg-[#0d0d0d] md:w-1/3 w-full p-6 relative">
      {renderCardHeader()}

      {type === 'organization' && organizationName && name !== organizationName && (
        <div className="h-10">
          <h1 className="archivo text-lg mb-4">{name}</h1>
        </div>
      )}

      {type !== 'expert' && <hr className="opacity-10 my-2" />}

      {renderDescription()}

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

      {type === 'expert' && expertDetails?.organization && (
        <p className="archivo text-right">{expertDetails.organization}</p>
      )}

      {event && (
        <h3 className="archivo mt-2 text-sm opacity-50 text-end hover:underline cursor-pointer">{event}</h3>
      )}
    </div>
  );
};

export default IdeaCard;