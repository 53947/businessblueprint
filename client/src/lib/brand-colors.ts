// Brand color system for the blueprint ecosystem with consistent icons
export const brandIcons = {
  businessblueprint: "Compass", // Compass + Pencil = AI (blueprint blue #0080FF)
  webhosted: "Globe", // Global hosting - Globe icon (purple #660099)
  airswiped: "Zap" // Energy/Speed - Lightning/Zap icon (red #CB0505)
};

export const brandColors = {
  // Primary platforms with signature colors - Master Color Key pattern: black prefix + signature hex + fluorescent green #FF0040
  businessblueprint: {
    home: { business: "text-black", blueprint: "text-[#0080FF]", io: "text-[#FF0040]" }, // black-blue-fluorescent green
    contact: { business: "text-black", blueprint: "text-yellow-500", io: "text-black" }, // black-yellow-black
    about: { business: "text-black", blueprint: "text-orange-500", io: "text-black" }, // black-orange-black
    pricing: { business: "text-black", blueprint: "text-green-500", io: "text-black" }, // black-green-black
    portal: { business: "text-black", blueprint: "text-[#0080FF]", io: "text-[#FF0040]" } // black-blue-fluorescent green
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
  platform: 'businessblueprint' | 'webhosted' | 'airswiped',
  page: 'home' | 'contact' | 'about' | 'pricing' | 'portal' = 'home'
) {
  return brandColors[platform][page];
}

// Helper function to get brand icon
export function getBrandIcon(platform: 'businessblueprint' | 'webhosted' | 'airswiped') {
  return brandIcons[platform];
}