// Reusable brand logo components using OFFICIAL Business Blueprint brandmarks
import { Mail, Inbox, MessageCircle } from "lucide-react";
import bbHeaderLogo from "@assets/brand/bb-header-logo.png";
import bbFaviconPng from "@assets/brand/bb-favicon.png";
const bbAvatar = bbFaviconPng; // Lightbulb icon for Client Portal
const bbFavicon = '/brand-assets/Blueprint_Favicon.png';
const bbIcon = bbFaviconPng;
import bbLockup from "@assets/brand/bb-header-logo.png";
import webhostedLogo from "@assets/platforms/hostsblue-url.png";
import webhostedIcon from "@assets/platforms/hostsblue-brandmark.png";
import airswipedLogo from "@assets/platforms/swipesblue-brandmark.png";
import hostsBlueIcon from "@assets/platforms/hostsblue-brandmark.png";
import hostsBlueWordmark from "@assets/platforms/hostsblue-lockup.png";
import swipesBlueIcon from "@assets/platforms/swipesblue-brandmark.png";
import swipesBlueWordmark from "@assets/platforms/swipesblue-lockup.png";

// App color constants
const SEND_COLOR = "#1844A6";
const INBOX_COLOR = "#001882";
const LIVECHAT_COLOR = "#660099";

interface BrandLogoProps {
  brand: 'businessblueprint' | 'hostsblue' | 'swipesblue' | 'send' | 'inbox' | 'livechat';
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showIcon?: boolean;
  className?: string;
  textOnly?: boolean; // For text-only logos
  layout?: 'horizontal' | 'vertical'; // Layout direction
}

const sizeConfig = {
  sm: { icon: 'w-6 h-6', text: 'text-lg', logo: 'h-6', fontSize: '18px', iconPx: 24 },
  md: { icon: 'w-10 h-10', text: 'text-2xl', logo: 'h-10', fontSize: '24px', iconPx: 40 },
  lg: { icon: 'w-16 h-16', text: 'text-4xl', logo: 'h-16', fontSize: '36px', iconPx: 64 },
  xl: { icon: 'w-20 h-20', text: 'text-5xl', logo: 'h-20', fontSize: '48px', iconPx: 80 }
};

function LucideAppIcon({ icon: Icon, color, size }: { icon: typeof Mail; color: string; size: string }) {
  return (
    <div
      className={`${size} rounded-lg flex items-center justify-center`}
      style={{ backgroundColor: color }}
    >
      <Icon className="w-[60%] h-[60%] text-white" />
    </div>
  );
}

export function BrandLogo({
  brand,
  variant = 'light',
  size = 'md',
  showIcon = true,
  textOnly = false,
  layout = 'horizontal',
  className = ''
}: BrandLogoProps) {
  const isDark = variant === 'dark';
  const { icon: iconSize, logo: logoSize, text: textSize, fontSize: textFontSize } = sizeConfig[size];

  // Business Blueprint image-based logo
  if (brand === 'businessblueprint') {
    // Vertical layout for dashboard
    if (layout === 'vertical') {
      return (
        <div className={`flex flex-col items-center gap-2 ${className}`}>
          {showIcon && !textOnly && (
            <img
              src={bbAvatar}
              alt="businessblueprint.io icon"
              style={{ height: '48px', width: 'auto', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}
              className="object-contain"
            />
          )}
          <img
            src={bbLockup}
            alt="businessblueprint.io"
            style={{ height: '32px', width: 'auto' }}
            className="object-contain"
          />
        </div>
      );
    }

    // Horizontal layout (default)
    return (
      <img
        src={bbLockup}
        alt="businessblueprint.io"
        style={{ height: size === 'sm' ? '48px' : size === 'md' ? '56px' : '64px', width: 'auto' }}
        className={`object-contain ${className}`}
      />
    );
  }

  if (brand === 'hostsblue') {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        {showIcon && (
          <img
            src={hostsBlueIcon}
            alt="HostsBlue icon"
            className={`${iconSize} object-contain`}
          />
        )}
        <img
          src={hostsBlueWordmark}
          alt="HostsBlue"
          className={`${logoSize} object-contain`}
        />
      </div>
    );
  }

  if (brand === 'send') {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        {showIcon && (
          <LucideAppIcon icon={Mail} color={SEND_COLOR} size={iconSize} />
        )}
        <span className={textSize} style={{ color: SEND_COLOR, fontWeight: 600, fontFamily: 'Archivo Semi Expanded, Archivo, sans-serif' }}>
          <span style={{ color: '#09080E' }}>/</span> promote
        </span>
      </div>
    );
  }

  if (brand === 'swipesblue') {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        {showIcon && (
          <img
            src={swipesBlueIcon}
            alt="SwipesBlue icon"
            className={`${iconSize} object-contain`}
          />
        )}
        <img
          src={swipesBlueWordmark}
          alt="SwipesBlue"
          className={`${logoSize} object-contain`}
        />
      </div>
    );
  }

  // /respond uses Lucide Inbox icon
  if (brand === 'inbox') {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        {showIcon && (
          <LucideAppIcon icon={Inbox} color={INBOX_COLOR} size={iconSize} />
        )}
        <span className={textSize} style={{ color: INBOX_COLOR, fontWeight: 600, fontFamily: 'Archivo Semi Expanded, Archivo, sans-serif' }}>
          <span style={{ color: '#09080E' }}>/</span> respond
        </span>
      </div>
    );
  }

  // / engage uses Lucide MessageCircle icon
  if (brand === 'livechat') {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        {showIcon && (
          <LucideAppIcon icon={MessageCircle} color={LIVECHAT_COLOR} size={iconSize} />
        )}
        <span className={textSize} style={{ color: LIVECHAT_COLOR, fontWeight: 600, fontFamily: 'Archivo Semi Expanded, Archivo, sans-serif' }}>
          <span style={{ color: '#09080E' }}>/</span> engage
        </span>
      </div>
    );
  }

  return null;
}

// Compact version for smaller spaces
export function BrandLogoCompact({
  brand,
  variant = 'light',
  className = ''
}: Pick<BrandLogoProps, 'brand' | 'variant' | 'className'>) {
  return <BrandLogo brand={brand} variant={variant} size="sm" className={className} />;
}

// Icon only version
export function BrandIcon({
  brand,
  variant = 'light',
  size = 'md',
  className = ''
}: Omit<BrandLogoProps, 'showIcon' | 'textOnly'>) {
  const isDark = variant === 'dark';
  const { icon: iconSize } = sizeConfig[size];

  // PNG-based icons for platform brands
  const pngIconMap: Record<string, string> = {
    businessblueprint: bbAvatar,
    hostsblue: hostsBlueIcon,
    swipesblue: swipesBlueIcon,
  };

  if (pngIconMap[brand]) {
    return (
      <img
        src={pngIconMap[brand]}
        alt={`${brand} icon`}
        className={`${iconSize} object-contain ${className}`}
      />
    );
  }

  // Lucide-based icons for app brands
  const lucideMap: Record<string, { icon: typeof Mail; color: string }> = {
    send: { icon: Mail, color: SEND_COLOR },
    inbox: { icon: Inbox, color: INBOX_COLOR },
    livechat: { icon: MessageCircle, color: LIVECHAT_COLOR },
  };

  const lucideEntry = lucideMap[brand];
  if (lucideEntry) {
    return (
      <div className={className}>
        <LucideAppIcon icon={lucideEntry.icon} color={lucideEntry.color} size={iconSize} />
      </div>
    );
  }

  return null;
}
