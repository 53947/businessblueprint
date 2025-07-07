// Brand color system for the pleaser ecosystem with consistent icons
export const brandIcons = {
  cloudpleaser: "Brain", // Intelligence/AI - Brain icon
  webhosted: "Globe", // Global hosting - Globe icon  
  airswiped: "Zap" // Energy/Speed - Lightning/Zap icon
};

export const brandColors = {
  // Primary platforms with signature colors
  cloudpleaser: {
    home: { cloud: "text-black", pleaser: "text-blue-500", io: "text-green-400" }, // black-blue-fluorescent green
    contact: { cloud: "text-black", pleaser: "text-yellow-500", io: "text-black" }, // black-yellow-black
    about: { cloud: "text-black", pleaser: "text-orange-500", io: "text-black" }, // black-orange-black
    pricing: { cloud: "text-black", pleaser: "text-green-500", io: "text-black" }, // black-green-black
    portal: { cloud: "text-black", pleaser: "text-blue-500", io: "text-purple-600" } // black-blue-purple
  },
  
  webhosted: {
    home: { web: "text-black", pleaser: "text-green-500", io: "text-emerald-400" },
    contact: { web: "text-black", pleaser: "text-yellow-500", io: "text-black" },
    about: { web: "text-black", pleaser: "text-orange-500", io: "text-black" },
    pricing: { web: "text-black", pleaser: "text-green-500", io: "text-black" },
    portal: { web: "text-black", pleaser: "text-green-500", io: "text-emerald-600" }
  },
  
  airswiped: {
    home: { air: "text-black", pleaser: "text-orange-500", com: "text-amber-400" },
    contact: { air: "text-black", pleaser: "text-yellow-500", com: "text-black" },
    about: { air: "text-black", pleaser: "text-orange-500", com: "text-black" },
    pricing: { air: "text-black", pleaser: "text-green-500", com: "text-black" },
    portal: { air: "text-black", pleaser: "text-orange-500", com: "text-amber-600" }
  }
};

// Helper function to generate brand component
export function generateBrandLogo(
  platform: 'cloudpleaser' | 'webhosted' | 'airswiped',
  page: 'home' | 'contact' | 'about' | 'pricing' | 'portal' = 'home',
  className?: string
) {
  const colors = brandColors[platform][page];
  
  if (platform === 'cloudpleaser') {
    return (
      <div className={`text-2xl font-bold ${className || ''}`}>
        <span className={colors.cloud}>cloud</span>
        <span className={colors.pleaser}>pleaser</span>
        <span className={colors.io}>.io</span>
      </div>
    );
  } else if (platform === 'webhosted') {
    return (
      <div className={`text-2xl font-bold ${className || ''}`}>
        <span className={colors.web}>web</span>
        <span className={colors.pleaser}>pleaser</span>
        <span className={colors.io}>.io</span>
      </div>
    );
  } else {
    return (
      <div className={`text-2xl font-bold ${className || ''}`}>
        <span className={colors.air}>air</span>
        <span className={colors.pleaser}>pleaser</span>
        <span className={colors.com}>.com</span>
      </div>
    );
  }
}

// Helper function to get brand icon
export function getBrandIcon(platform: 'cloudpleaser' | 'webhosted' | 'airswiped') {
  return brandIcons[platform];
}