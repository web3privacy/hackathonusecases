import React, { useState } from 'react';
import { Share2, Github, Globe, Copy, Check } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';

export default function ShareableCard({ 
  id = '', 
  name, 
  description, 
  categories = [], 
  github, 
  source, 
  website, 
  author 
}) {
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

  return (
    <div className="bg-[#0d0d0d] md:w-1/3 w-full p-6">
      <div className="h-10">
        <h1 className="archivo text-lg mb-4">{name}</h1>
      </div>
      <hr className="opacity-10 my-2" />
      <div className="h-20">
        <h3 className="archivo mt-4 text-sm opacity-50">{description}</h3>
      </div>
      <div className='flex justify-between items-center my-3'>
        <div className="flex flex-wrap space-x-2 w-2/3">
          {categories.map((category, index) => (
            <Badge key={index} variant="secondary">{category}</Badge>
          ))}
        </div>
        <div className='w-1/3 text-xs text-end flex justify-end space-x-3'>
          {github &&
            <a href={github} target="_blank" rel="noopener noreferrer">
              <Github className='w-5 h-5' />
            </a>
          }
          {website &&
            <a href={website} target="_blank" rel="noopener noreferrer">
              <Globe className='w-5 h-5' />
            </a>
          }
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
      {source &&
        <h3 className="archivo mt-2 text-sm opacity-50 text-end hover:underline cursor-pointer">{source}</h3>
      }
      {author &&
        <h3 className="archivo mt-2 text-sm opacity-50 text-end hover:underline cursor-pointer">
          <a href={author} target="_blank" rel="noopener noreferrer">
            {author.toString().replace("https://twitter.com/", "@")}
          </a>
        </h3>
      }
    </div>
  );
}