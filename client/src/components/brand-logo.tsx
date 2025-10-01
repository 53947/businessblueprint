// Reusable brand logo components using Archivo font with icons
import bbIconLight from "@assets/BluePrint Icon_1758878797458.png";
import webhostedIconLight from "@assets/webnhosted_1758744493181.png";
import airswipedIconLight from "@assets/airswiped_1758744493180.png";

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
      icon: bbIconLight,
      parts: [
        { text: 'business', color: isDark ? 'text-white' : 'text-black' },
        { text: 'blueprint', color: 'text-[#0080FF]' },
        { text: '.io', color: 'text-[#AAFF00]' }
      ]
    },
    webhosted: {
      icon: webhostedIconLight,
      parts: [
        { text: 'web', color: isDark ? 'text-white' : 'text-black' },
        { text: 'hosted', color: 'text-[#660099]' },
        { text: '.io', color: 'text-[#AAFF00]' }
      ]
    },
    airswiped: {
      icon: airswipedIconLight,
      parts: [
        { text: 'air', color: isDark ? 'text-white' : 'text-black' },
        { text: 'swiped', color: 'text-[#CB0505]' },
        { text: '.com', color: 'text-[#AAFF00]' }
      ]
    }
  };

  const config = brandConfig[brand];
  
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {showIcon && (
        <img 
          src={config.icon} 
          alt={`${brand} icon`} 
          className={`${iconSize} object-contain ${isDark ? 'brightness-0 invert' : ''}`}
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
    businessblueprint: bbIconLight,
    webhosted: webhostedIconLight,
    airswiped: airswipedIconLight
  };
  
  return (
    <img 
      src={iconMap[brand]} 
      alt={`${brand} icon`} 
      className={`${iconSize} object-contain ${isDark ? 'brightness-0 invert' : ''} ${className}`}
    />
  );
}
