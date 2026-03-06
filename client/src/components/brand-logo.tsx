// Reusable brand logo components using OFFICIAL Business Blueprint brandmarks
import bbHeaderLogo from "@assets/brand/bb-header-logo.png";
import bbFaviconPng from "@assets/brand/bb-favicon.png";
const bbAvatar = bbFaviconPng; // Lightbulb icon for Client Portal
const bbFavicon = '/brand-assets/Blueprint_Favicon.png';
const bbIcon = bbFaviconPng;
import bbLockup from "@assets/brand/bb-header-logo.png";
import webhostedLogo from "@assets/platforms/hostsblue-url.png";
import webhostedIcon from "@assets/platforms/hostsblue-brandmark.png";
import airswipedLogo from "@assets/platforms/swipesblue-brandmark.png";
import sendLogo from "@assets/app-icons/send-logo.png";
import sendIcon from "@assets/app-icons/send-icon.png";
import inboxLogo from "@assets/app-icons/inbox-logo.png";
import inboxIcon from "@assets/app-icons/inbox-icon.png";
import livechatLogo from "@assets/app-icons/livechat-logo.png";
import livechatIcon from "@assets/app-icons/livechat-icon.png";
import hostsBlueIcon from "@assets/platforms/hostsblue-brandmark.png";
import hostsBlueWordmark from "@assets/platforms/hostsblue-lockup.png";
import swipesBlueIcon from "@assets/platforms/swipesblue-brandmark.png";
import swipesBlueWordmark from "@assets/platforms/swipesblue-lockup.png";

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
  sm: { icon: 'w-6 h-6', text: 'text-lg', logo: 'h-6', fontSize: '18px' },
  md: { icon: 'w-10 h-10', text: 'text-2xl', logo: 'h-10', fontSize: '24px' },
  lg: { icon: 'w-16 h-16', text: 'text-4xl', logo: 'h-16', fontSize: '36px' },
  xl: { icon: 'w-20 h-20', text: 'text-5xl', logo: 'h-20', fontSize: '48px' }
};

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
          <img 
            src={sendIcon} 
            alt="/ promote icon"
            className={`${iconSize} object-contain`}
          />
        )}
        <img
          src={sendLogo}
          alt="/ promote" 
          className={`${logoSize} object-contain`}
        />
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

  // /respond uses new icon and logo
  if (brand === 'inbox') {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        {showIcon && (
          <img
            src={inboxIcon}
            alt="/respond icon"
            className={`${iconSize} object-contain`}
          />
        )}
        <img
          src={inboxLogo}
          alt="/respond"
          className={`${logoSize} object-contain`}
        />
      </div>
    );
  }

  // / engage uses new icon and logo
  if (brand === 'livechat') {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        {showIcon && (
          <img
            src={livechatIcon}
            alt="/ engage icon"
            className={`${iconSize} object-contain`}
          />
        )}
        <img
          src={livechatLogo}
          alt="/ engage" 
          className={`${logoSize} object-contain`}
        />
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
  
  const iconMap = {
    businessblueprint: bbAvatar,
    hostsblue: hostsBlueIcon,
    swipesblue: swipesBlueIcon,
    send: sendIcon,
    inbox: inboxIcon,
    livechat: livechatIcon
  };
  
  const iconSrc = iconMap[brand];
  
  return (
    <img 
      src={iconSrc} 
      alt={`${brand} icon`} 
      className={`${iconSize} object-contain ${className}`}
    />
  );
}
