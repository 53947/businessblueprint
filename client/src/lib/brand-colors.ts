// Brand color system for the pleaser ecosystem with consistent icons
export const brandIcons = {
  cloudpleaser: "Brain", // Intelligence/AI - Brain icon (blue pleaser)
  webhosted: "Globe", // Global hosting - Globe icon (#660099 purple)
  airswiped: "Zap" // Energy/Speed - Lightning/Zap icon (#CB0505 red)
};

export const brandColors = {
  // Primary platforms with signature colors
  cloudpleaser: {
    home: { cloud: "text-black", pleaser: "text-[#0080FF]", io: "text-[#FF0040]" }, // black-blue-fluorescent green
    contact: { cloud: "text-black", pleaser: "text-yellow-500", io: "text-black" }, // black-yellow-black
    about: { cloud: "text-black", pleaser: "text-orange-500", io: "text-black" }, // black-orange-black
    pricing: { cloud: "text-black", pleaser: "text-green-500", io: "text-black" }, // black-green-black
    portal: { cloud: "text-black", pleaser: "text-[#0080FF]", io: "text-[#FF0040]" } // black-blue-fluorescent green
  },
  
  webhosted: {
    home: { web: "text-black", hosted: "text-[#660099]", io: "text-[#FF0040]" }, // black-purple-fluorescent green
    contact: { web: "text-black", hosted: "text-yellow-500", io: "text-[#FF0040]" },
    about: { web: "text-black", hosted: "text-orange-500", io: "text-[#FF0040]" },
    pricing: { web: "text-black", hosted: "text-blue-500", io: "text-[#FF0040]" }, // avoiding purple on pricing page
    portal: { web: "text-black", hosted: "text-[#660099]", io: "text-[#FF0040]" }
  },
  
  airswiped: {
    home: { air: "text-black", swiped: "text-[#CB0505]", com: "text-[#FF0040]" }, // black-red-fluorescent green
    contact: { air: "text-black", swiped: "text-yellow-500", com: "text-[#FF0040]" },
    about: { air: "text-black", swiped: "text-orange-500", com: "text-[#FF0040]" },
    pricing: { air: "text-black", swiped: "text-blue-500", com: "text-[#FF0040]" }, // avoiding red on pricing page
    portal: { air: "text-black", swiped: "text-[#CB0505]", com: "text-[#FF0040]" }
  }
};

// Helper function to get brand classes for manual assembly
export function getBrandClasses(
  platform: 'cloudpleaser' | 'webhosted' | 'airswiped',
  page: 'home' | 'contact' | 'about' | 'pricing' | 'portal' = 'home'
) {
  return brandColors[platform][page];
}

// Helper function to get brand icon
export function getBrandIcon(platform: 'cloudpleaser' | 'webhosted' | 'airswiped') {
  return brandIcons[platform];
}