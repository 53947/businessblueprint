import { ExternalLink } from "lucide-react";

interface SocialLinksDisplayProps {
  facebookUrl?: string | null;
  instagramUrl?: string | null;
  linkedinUrl?: string | null;
  twitterUrl?: string | null;
  youtubeUrl?: string | null;
}

const PLATFORMS: { key: keyof SocialLinksDisplayProps; label: string; color: string }[] = [
  { key: "facebookUrl", label: "Facebook", color: "text-blue-600" },
  { key: "instagramUrl", label: "Instagram", color: "text-pink-600" },
  { key: "linkedinUrl", label: "LinkedIn", color: "text-blue-700" },
  { key: "twitterUrl", label: "X / Twitter", color: "text-gray-800" },
  { key: "youtubeUrl", label: "YouTube", color: "text-red-600" },
];

export function SocialLinksDisplay(props: SocialLinksDisplayProps) {
  const links = PLATFORMS.filter((p) => props[p.key]);

  if (links.length === 0) {
    return <p className="text-sm text-gray-500 italic">No social links set</p>;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {links.map((platform) => (
        <a
          key={platform.key}
          href={props[platform.key]!}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border text-sm font-medium hover:bg-gray-50 transition-colors ${platform.color}`}
        >
          <ExternalLink className="w-3.5 h-3.5" />
          {platform.label}
        </a>
      ))}
    </div>
  );
}
