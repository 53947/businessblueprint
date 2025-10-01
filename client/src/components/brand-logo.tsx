// Reusable brand logo components using Archivo font with icons
import bbIconLight from "@assets/businessblueprintio icon light version_1759341905090.png";
import bbIconDark from "@assets/businessblueprintio icon dark version_1759341905089.png";
import webhostedIconLight from "@assets/webhostedio icon light version_1759341946145.png";
import webhostedIconDark from "@assets/webhostedio icon dark version_1759341923576.png";
import airswipedIconLight from "@assets/airswipedcom icon light version_1759341905088.png";
import airswipedIconDark from "@assets/airswipedio icon dark version_1759341905089.png";

interface BrandLogoProps {
  brand: 'businessblueprint' | 'webhosted' | 'airswiped';
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showIcon?: boolean;
  className?: string;
}

const sizeConfig = {
  sm: { icon: 'w-6 h-6', text: 'text-lg' },
  md: { icon: 'w-10 h-10', text: 'text-2xl' },
  lg: { icon: 'w-16 h-16', text: 'text-4xl' },
  xl: { icon: 'w-20 h-20', text: 'text-5xl' }
};

export function BrandLogo({ 
  brand, 
  variant = 'light', 
  size = 'md',
  showIcon = true,
  className = '' 
}: BrandLogoProps) {
  const isDark = variant === 'dark';
  const { icon: iconSize, text: textSize } = sizeConfig[size];
  
  const brandConfig = {
    businessblueprint: {
      iconLight: bbIconLight,
      iconDark: bbIconDark,
      parts: [
        { text: 'business', color: isDark ? 'text-white' : 'text-[#09080E]' },
        { text: 'blueprint', color: 'text-[#0080FF]' },
        { text: '.io', color: 'text-[#84D71A]' }
      ]
    },
    webhosted: {
      iconLight: webhostedIconLight,
      iconDark: webhostedIconDark,
      parts: [
        { text: 'web', color: isDark ? 'text-white' : 'text-[#09080E]' },
        { text: 'hosted', color: 'text-[#660099]' },
        { text: '.io', color: 'text-[#84D71A]' }
      ]
    },
    airswiped: {
      iconLight: airswipedIconLight,
      iconDark: airswipedIconDark,
      parts: [
        { text: 'air', color: isDark ? 'text-white' : 'text-[#09080E]' },
        { text: 'swiped', color: 'text-[#FF0040]' },
        { text: '.com', color: 'text-[#84D71A]' }
      ]
    }
  };

  const config = brandConfig[brand];
  const iconSrc = isDark ? config.iconDark : config.iconLight;
  
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {showIcon && (
        <img 
          src={iconSrc} 
          alt={`${brand} icon`} 
          className={`${iconSize} object-contain`}
        />
      )}
      <div className={`font-archivo font-bold ${textSize} leading-none`}>
        {config.parts.map((part, idx) => (
          <span key={idx} className={part.color}>{part.text}</span>
        ))}
      </div>
    </div>
  );
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
}: Omit<BrandLogoProps, 'showIcon'>) {
  const isDark = variant === 'dark';
  const { icon: iconSize } = sizeConfig[size];
  
  const iconMap = {
    businessblueprint: { light: bbIconLight, dark: bbIconDark },
    webhosted: { light: webhostedIconLight, dark: webhostedIconDark },
    airswiped: { light: airswipedIconLight, dark: airswipedIconDark }
  };
  
  const iconSrc = isDark ? iconMap[brand].dark : iconMap[brand].light;
  
  return (
    <img 
      src={iconSrc} 
      alt={`${brand} icon`} 
      className={`${iconSize} object-contain ${className}`}
    />
  );
}
