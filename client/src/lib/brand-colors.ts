// Brand color system for the pleaser ecosystem with consistent icons
export const brandIcons = {
  cloudpleaser: "Brain", // Intelligence/AI - Brain icon (blue pleaser)
  webhosted: "Globe", // Global hosting - Globe icon (#FC8EA0 pink)
  airswiped: "Zap" // Energy/Speed - Lightning/Zap icon (#CB0505 red)
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
    home: { web: "text-black", pleaser: "text-[#FC8EA0]", io: "text-green-400" }, // black-pink-fluorescent green
    contact: { web: "text-black", pleaser: "text-yellow-500", io: "text-green-400" },
    about: { web: "text-black", pleaser: "text-orange-500", io: "text-green-400" },
    pricing: { web: "text-black", pleaser: "text-blue-500", io: "text-green-400" }, // avoiding pink on pricing page
    portal: { web: "text-black", pleaser: "text-[#FC8EA0]", io: "text-green-400" }
  },
  
  airswiped: {
    home: { air: "text-black", pleaser: "text-[#CB0505]", com: "text-green-400" }, // black-red-fluorescent green
    contact: { air: "text-black", pleaser: "text-yellow-500", com: "text-green-400" },
    about: { air: "text-black", pleaser: "text-orange-500", com: "text-green-400" },
    pricing: { air: "text-black", pleaser: "text-blue-500", com: "text-green-400" }, // avoiding red on pricing page
    portal: { air: "text-black", pleaser: "text-[#CB0505]", com: "text-green-400" }
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