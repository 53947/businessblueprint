// Reusable brand logo components using new universal logos (work for light/dark)
import bbLogo from "@assets/Business Blueprint Logo and-or Icon All Versions_1759854008066.png";
import bbIcon from "@assets/Blueprint Icon_1760810447789.png";
import webhostedLogo from "@assets/Web Hosted all Version Logo_1759857389704.png";
import webhostedIcon from "@assets/webhostedio icon all versions_1759857279422.png";
import airswipedLogo from "@assets/swipesblue icon_1760810511865.png";
import sendLogo from "@assets/send logo_1760075605263.png";
import sendIcon from "@assets/send icon_1760074368870.png";
import inboxLogo from "@assets/inbox logo_1760075605262.png";
import inboxIcon from "@assets/Unified mailbox_1760074368869.png";
import livechatLogo from "@assets/livechat logo_1760075605262.png";
import livechatIcon from "@assets/LiveChat Widget_1760074368868.png";
import hostsBlueIcon from "@assets/Hosts Blue Icon New_1760810493739.png";
import swipesBlueIcon from "@assets/swipesblue icon_1760810511865.png";

interface BrandLogoProps {
  brand: 'businessblueprint' | 'webhosted' | 'airswiped' | 'send' | 'inbox' | 'livechat';
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showIcon?: boolean;
  className?: string;
  textOnly?: boolean; // For text-only logos
}

const sizeConfig = {
  sm: { icon: 'w-6 h-6', text: 'text-lg', logo: 'h-6' },
  md: { icon: 'w-10 h-10', text: 'text-2xl', logo: 'h-10' },
  lg: { icon: 'w-16 h-16', text: 'text-4xl', logo: 'h-16' },
  xl: { icon: 'w-20 h-20', text: 'text-5xl', logo: 'h-20' }
};

export function BrandLogo({ 
  brand, 
  variant = 'light', 
  size = 'md',
  showIcon = true,
  textOnly = false,
  className = '' 
}: BrandLogoProps) {
  const isDark = variant === 'dark';
  const { icon: iconSize, logo: logoSize, text: textSize } = sizeConfig[size];
  
  // Business Blueprint text-based logo matching Brand Logo Key
  if (brand === 'businessblueprint') {
    return (
      <div className={`flex items-end gap-1 ${className}`}>
        {showIcon && !textOnly && (
          <img 
            src={bbIcon} 
            alt="businessblueprint.io icon" 
            className={`${iconSize} object-contain`}
          />
        )}
        <div className={`${textSize} leading-none pb-0.5`} style={{ fontFamily: 'Archivo', fontWeight: 600 }}>
          <span style={{ color: '#FFA500', fontFamily: '"Archivo Semi Expanded", sans-serif' }}>business</span>
          <span style={{ color: '#0000FF' }}>blueprint</span>
          <span style={{ color: '#84D71A' }}>.io</span>
        </div>
      </div>
    );
  }

  if (brand === 'webhosted') {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        {showIcon && (
          <img 
            src={webhostedIcon} 
            alt="webhosted.io icon" 
            className={`${iconSize} object-contain`}
          />
        )}
        <img 
          src={webhostedLogo} 
          alt="webhosted.io" 
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

  // airswiped uses new lightning bolt icon
  if (brand === 'airswiped') {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        {showIcon && (
          <img 
            src={airswipedLogo} 
            alt="airswiped.com icon" 
            className={`${iconSize} object-contain`}
          />
        )}
        <div className={`font-archivo font-bold text-2xl leading-none`}>
          <span className={isDark ? 'text-white' : 'text-[#09080E]'}>air</span>
          <span className="text-[#FF0040]">swiped</span>
          <span className="text-[#84D71A]">.com</span>
        </div>
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
    businessblueprint: bbIcon,
    webhosted: hostsBlueIcon,
    airswiped: swipesBlueIcon,
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
