import { Button } from "@/components/ui/button";
import { Share2, Facebook, Twitter, Linkedin, MessageCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface SocialShareProps {
  toolName: string;
  toolUrl: string;
  toolDescription: string;
}

export default function SocialShare({ toolName, toolUrl, toolDescription }: SocialShareProps) {
  const [copied, setCopied] = useState(false);

  const shareText = `Check out ${toolName} - ${toolDescription}`;
  const encodedUrl = encodeURIComponent(toolUrl);
  const encodedText = encodeURIComponent(shareText);

  const socialLinks = [
    {
      name: "Facebook",
      icon: <Facebook className="w-4 h-4" />,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: "hover:bg-blue-600 hover:text-white",
    },
    {
      name: "Twitter",
      icon: <Twitter className="w-4 h-4" />,
      url: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`,
      color: "hover:bg-sky-500 hover:text-white",
    },
    {
      name: "LinkedIn",
      icon: <Linkedin className="w-4 h-4" />,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      color: "hover:bg-blue-700 hover:text-white",
    },
    {
      name: "WhatsApp",
      icon: <MessageCircle className="w-4 h-4" />,
      url: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
      color: "hover:bg-green-500 hover:text-white",
    },
  ];

  const handleCopyLink = () => {
    navigator.clipboard.writeText(toolUrl);
    setCopied(true);
    toast.success("Link copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Share2 className="w-5 h-5 text-primary" />
        <h3 className="font-bold text-foreground">Share This Tool</h3>
      </div>

      <div className="flex flex-wrap gap-2">
        {socialLinks.map((social) => (
          <a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            title={`Share on ${social.name}`}
          >
            <Button
              variant="outline"
              size="sm"
              className={`gap-2 transition-all duration-200 ${social.color}`}
            >
              {social.icon}
              <span className="hidden sm:inline">{social.name}</span>
            </Button>
          </a>
        ))}

        <Button
          variant="outline"
          size="sm"
          onClick={handleCopyLink}
          className="gap-2 hover:bg-gray-200 transition-all duration-200"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
          <span className="hidden sm:inline">{copied ? "Copied!" : "Copy"}</span>
        </Button>
      </div>

      <p className="text-xs text-muted-foreground">
        Help others discover this tool by sharing it on social media.
      </p>
    </div>
  );
}
