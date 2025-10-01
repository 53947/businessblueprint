// Brand color system for the blueprint ecosystem with consistent icons
export const brandIcons = {
  businessblueprint: "Compass", // Compass + Pencil = AI (blueprint blue #0080FF)
  webhosted: "Globe", // Global hosting - Globe icon (purple #660099)
  airswiped: "Zap" // Energy/Speed - Lightning/Zap icon (red #FF0040)
};

export const brandColors = {
  // Primary platforms with signature colors - Master Color Key pattern: #09080E prefix + signature hex + green #84D71A
  businessblueprint: {
    home: { business: "text-[#09080E]", blueprint: "text-[#0080FF]", io: "text-[#84D71A]" }, // #09080E-blue-green
    contact: { business: "text-[#09080E]", blueprint: "text-yellow-500", io: "text-[#09080E]" }, // #09080E-yellow-#09080E
    about: { business: "text-[#09080E]", blueprint: "text-orange-500", io: "text-[#09080E]" }, // #09080E-orange-#09080E
    pricing: { business: "text-[#09080E]", blueprint: "text-green-500", io: "text-[#09080E]" }, // #09080E-green-#09080E
    portal: { business: "text-[#09080E]", blueprint: "text-[#0080FF]", io: "text-[#84D71A]" } // #09080E-blue-green
  },
  
  webhosted: {
    home: { web: "text-[#09080E]", hosted: "text-[#660099]", io: "text-[#84D71A]" }, // #09080E-purple-green
    contact: { web: "text-[#09080E]", hosted: "text-yellow-500", io: "text-[#84D71A]" },
    about: { web: "text-[#09080E]", hosted: "text-orange-500", io: "text-[#84D71A]" },
    pricing: { web: "text-[#09080E]", hosted: "text-blue-500", io: "text-[#84D71A]" }, // avoiding purple on pricing page
    portal: { web: "text-[#09080E]", hosted: "text-[#660099]", io: "text-[#84D71A]" }
  },
  
  airswiped: {
    home: { air: "text-[#09080E]", swiped: "text-[#FF0040]", com: "text-[#84D71A]" }, // #09080E-red-green
    contact: { air: "text-[#09080E]", swiped: "text-yellow-500", com: "text-[#84D71A]" },
    about: { air: "text-[#09080E]", swiped: "text-orange-500", com: "text-[#84D71A]" },
    pricing: { air: "text-[#09080E]", swiped: "text-blue-500", com: "text-[#84D71A]" }, // avoiding red on pricing page
    portal: { air: "text-[#09080E]", swiped: "text-[#FF0040]", com: "text-[#84D71A]" }
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