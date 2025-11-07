// Reusable brand logo components using OFFICIAL Business Blueprint brandmarks
import bbHeaderLogo from "@assets/BBlueprint Main Header Logo_1762489845362.png";
import bbFaviconPng from "@assets/Blueprint_Favicon_1762489845363.png";
const bbAvatar = bbFaviconPng; // Lightbulb icon for Client Portal
const bbFavicon = '/brand-assets/Blueprint_Favicon.png';
const bbIcon = bbFaviconPng;
import bbLockup from "@assets/BBlueprint Main Header Logo_1762489845362.png";
import webhostedLogo from "@assets/hostsblue assets/hostsblue URL.png";
import webhostedIcon from "@assets/hostsblue assets/Hosts Blue Brandmark.png";
import airswipedLogo from "@assets/swipesblue/swipesblue brandmark.png";
import sendLogo from "@assets/logos and wordmarks/: send app logo.png";
import sendIcon from "@assets/native icons and favicons/: send app icon.png";
import inboxLogo from "@assets/logos and wordmarks/: inbox app logo.png";
import inboxIcon from "@assets/native icons and favicons/: inbox app icon.png";
import livechatLogo from "@assets/logos and wordmarks/: livechat app logo.png";
import livechatIcon from "@assets/native icons and favicons/: livechat app icon.png";
import hostsBlueIcon from "@assets/hostsblue assets/Hosts Blue Brandmark.png";
import swipesBlueIcon from "@assets/swipesblue/swipesblue brandmark.png";

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
    const textColor1 = '#8000FF'; // purple
    const textColor2 = '#0000FF'; // blue - same as businessblueprint
    const textColor3 = '#84D71A'; // green
    
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        {showIcon && !textOnly && (
          <img 
            src={hostsBlueIcon} 
            alt="hostsblue.com icon" 
            className={`${iconSize} object-contain`}
            style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}
          />
        )}
        {!textOnly && (
          <div className="leading-none pb-0.5" style={{ fontSize: textFontSize, fontWeight: 600, filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.1))' }}>
            <span style={{ color: textColor1, fontFamily: '"Archivo Semi Expanded", sans-serif' }}>hosts</span>
            <span style={{ color: textColor2, fontFamily: 'Archivo, sans-serif' }}>blue</span>
            <span style={{ color: textColor3, fontFamily: 'Archivo, sans-serif' }}>.com</span>
          </div>
        )}
        {textOnly && (
          <span className="leading-none" style={{ fontSize: textFontSize, fontWeight: 600, filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.1))' }}>
            <span style={{ color: textColor1, fontFamily: '"Archivo Semi Expanded", sans-serif' }}>hosts</span>
            <span style={{ color: textColor2, fontFamily: 'Archivo, sans-serif' }}>blue</span>
            <span style={{ color: textColor3, fontFamily: 'Archivo, sans-serif' }}>.com</span>
          </span>
        )}
      </div>
    );
  }

  if (brand === 'send') {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        {showIcon && (
          <img 
            src={sendIcon} 
            alt="/send icon" 
            className={`${iconSize} object-contain`}
          />
        )}
        <img 
          src={sendLogo} 
          alt="/send" 
          className={`${logoSize} object-contain`}
        />
      </div>
    );
  }

  // swipesblue uses new lightning bolt icon
  if (brand === 'swipesblue') {
    const textColor1 = '#FF0040'; // red
    const textColor2 = '#0000FF'; // blue - same as businessblueprint
    const textColor3 = '#84D71A'; // green
    
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        {showIcon && !textOnly && (
          <img 
            src={swipesBlueIcon} 
            alt="swipesblue.com icon" 
            className={`${iconSize} object-contain`}
            style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}
          />
        )}
        {!textOnly && (
          <div className="leading-none pb-0.5" style={{ fontSize: textFontSize, fontWeight: 600, filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.1))' }}>
            <span style={{ color: textColor1, fontFamily: '"Archivo Semi Expanded", sans-serif' }}>swipes</span>
            <span style={{ color: textColor2, fontFamily: 'Archivo, sans-serif' }}>blue</span>
            <span style={{ color: textColor3, fontFamily: 'Archivo, sans-serif' }}>.com</span>
          </div>
        )}
        {textOnly && (
          <span className="leading-none" style={{ fontSize: textFontSize, fontWeight: 600, filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.1))' }}>
            <span style={{ color: textColor1, fontFamily: '"Archivo Semi Expanded", sans-serif' }}>swipes</span>
            <span style={{ color: textColor2, fontFamily: 'Archivo, sans-serif' }}>blue</span>
            <span style={{ color: textColor3, fontFamily: 'Archivo, sans-serif' }}>.com</span>
          </span>
        )}
      </div>
    );
  }

  // /inbox uses new icon and logo
  if (brand === 'inbox') {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        {showIcon && (
          <img 
            src={inboxIcon} 
            alt="/inbox icon" 
            className={`${iconSize} object-contain`}
          />
        )}
        <img 
          src={inboxLogo} 
          alt="/inbox" 
          className={`${logoSize} object-contain`}
        />
      </div>
    );
  }

  // /livechat uses new icon and logo
  if (brand === 'livechat') {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        {showIcon && (
          <img 
            src={livechatIcon} 
            alt="/livechat icon" 
            className={`${iconSize} object-contain`}
          />
        )}
        <img 
          src={livechatLogo} 
          alt="/livechat" 
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
