// Reusable brand logo components using new universal logos (work for light/dark)
import bbLogo from "@assets/Business Blueprint Logo and-or Icon All Versions_1759854008066.png";
import bbIcon from "@assets/businessblueprintio icon all version_1759854019511.png";
import webhostedLogo from "@assets/Web Hosted all Version Logo_1759857389704.png";
import webhostedIcon from "@assets/webhostedio icon all versions_1759857279422.png";
import airswipedIconLight from "@assets/airswipedcom icon light version_1759341905088.png";
import airswipedIconDark from "@assets/airswipedio icon dark version_1759341905089.png";
import sendLogo from "@assets/send logo_1759873220203.png";
import sendIcon from "@assets/send icon_1759873220203.png";

interface BrandLogoProps {
  brand: 'businessblueprint' | 'webhosted' | 'airswiped' | 'send';
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
  const { icon: iconSize, logo: logoSize } = sizeConfig[size];
  
  // For brands with image logos
  if (brand === 'businessblueprint' && !textOnly) {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        {showIcon && (
          <img 
            src={bbIcon} 
            alt="businessblueprint.io icon" 
            className={`${iconSize} object-contain`}
          />
        )}
        <img 
          src={bbLogo} 
          alt="businessblueprint.io" 
          className={`${logoSize} object-contain`}
        />
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

  // airswiped still uses light/dark versions (no new asset provided)
  if (brand === 'airswiped') {
    const iconSrc = isDark ? airswipedIconDark : airswipedIconLight;
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        {showIcon && (
          <img 
            src={iconSrc} 
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
    webhosted: webhostedIcon,
    airswiped: isDark ? airswipedIconDark : airswipedIconLight,
    send: sendIcon
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
