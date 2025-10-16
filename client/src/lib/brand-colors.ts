/**
 * Official Triad Blue Brand Colors
 * DO NOT modify without brand approval
 * 
 * Master Color Key Pattern: black-[signature-color]-fluorescent-green
 */

// Brand Icons
export const brandIcons = {
  businessblueprint: "Compass", // Compass + Pencil = AI
  webhosted: "Globe", // Global hosting
  airswiped: "Zap" // Energy/Speed
};

// Official Brand Color Hex Values
export const BRAND_HEX = {
  // Core Colors (shared across all platforms)
  black: '#000000',
  white: '#FFFFFF',
  fluorescentGreen: '#AAFF00', // TLD extension color (.io, .com)
  
  // Platform Signature Colors
  blueprintBlue: '#0080FF', // businessblueprint.io
  webhostPurple: '#660099', // hostsblue.com (webhosted.io)
  airswipeRed: '#CB0505', // swipesblue.com (airswiped.com)
  
  // Functional Colors
  portalPurple: '#660099', // Reserved for all portal pages
} as const;

// Tailwind Classes - Master Color Key Pattern
export const brandColors = {
  // businessblueprint.io - black + blueprint blue + fluorescent green
  businessblueprint: {
    home: { business: "text-black dark:text-white", blueprint: "text-[#0080FF]", io: "text-[#AAFF00]" },
    contact: { business: "text-black dark:text-white", blueprint: "text-[#0080FF]", io: "text-[#AAFF00]" },
    about: { business: "text-black dark:text-white", blueprint: "text-[#0080FF]", io: "text-[#AAFF00]" },
    pricing: { business: "text-black dark:text-white", blueprint: "text-[#0080FF]", io: "text-[#AAFF00]" },
    portal: { business: "text-black dark:text-white", blueprint: "text-[#660099]", io: "text-[#AAFF00]" } // Purple for portal
  },
  
  // hostsblue.com (webhosted.io) - black + purple + fluorescent green
  webhosted: {
    home: { web: "text-black dark:text-white", hosted: "text-[#660099]", io: "text-[#AAFF00]" },
    contact: { web: "text-black dark:text-white", hosted: "text-[#660099]", io: "text-[#AAFF00]" },
    about: { web: "text-black dark:text-white", hosted: "text-[#660099]", io: "text-[#AAFF00]" },
    pricing: { web: "text-black dark:text-white", hosted: "text-[#660099]", io: "text-[#AAFF00]" },
    portal: { web: "text-black dark:text-white", hosted: "text-[#660099]", io: "text-[#AAFF00]" }
  },
  
  // swipesblue.com (airswiped.com) - black + red + fluorescent green
  airswiped: {
    home: { air: "text-black dark:text-white", swiped: "text-[#CB0505]", com: "text-[#AAFF00]" },
    contact: { air: "text-black dark:text-white", swiped: "text-[#CB0505]", com: "text-[#AAFF00]" },
    about: { air: "text-black dark:text-white", swiped: "text-[#CB0505]", com: "text-[#AAFF00]" },
    pricing: { air: "text-black dark:text-white", swiped: "text-[#CB0505]", com: "text-[#AAFF00]" },
    portal: { air: "text-black dark:text-white", swiped: "text-[#CB0505]", com: "text-[#AAFF00]" }
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