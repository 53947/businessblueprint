/**
 * Official Triad Blue Brand Colors
 * DO NOT modify without brand approval
 */

// Brand Icons
export const brandIcons = {
  businessblueprint: "Compass", // Compass + Pencil = AI
  webhosted: "Globe", // Global hosting
  airswiped: "Zap" // Energy/Speed
};

// Official Brand Color Hex Values
export const BRAND_HEX = {
  // Core Colors
  black: '#09080E', // Primary black (NOT #000000)
  white: '#FFFFFF',
  
  // Triad Blue
  triadBlue: '#0000FF',
  triadBlueAlt: '#0057FF',
  
  // Platform Signature Colors
  businessBlueprint: '#FFA500', // Orange
  hostsBlue: '#660099', // Purple
  swipesBlue: '#FF0040', // Red
  
  // TLD & Accent
  tldGreen: '#84D71A', // 3rd rank accent color
  
  // App-Specific Colors
  send: '#E6B747',
  inbox: '#0080FF',
  inboxAlt: '#FF96DD',
  livechat: '#8000FF',
  
  // UI Element Colors
  buttonPrimary: '#0057FF',
  buttonSecondary: '#F79248',
  
  // Header Colors
  headerBlue: '#0000FF',
  headerOrange: '#F79248',
  headerBlack: '#09080E',
  
  // Content/Font Colors
  contentBlack: '#09080E',
  contentGray: '#5B5B5B',
  
  // Pathway Colors
  aiCoachBlack: '#09080E',
  aiCoachRed: '#FF0040',
  diy: '#0057FF',
  msp: '#F79248',
} as const;

// Tailwind Classes - Platform Branding
export const brandColors = {
  // businessblueprint.io
  businessblueprint: {
    home: { business: "text-[#09080E] dark:text-white", blueprint: "text-[#FFA500]", io: "text-[#84D71A]" },
    contact: { business: "text-[#09080E] dark:text-white", blueprint: "text-[#FFA500]", io: "text-[#84D71A]" },
    about: { business: "text-[#09080E] dark:text-white", blueprint: "text-[#FFA500]", io: "text-[#84D71A]" },
    pricing: { business: "text-[#09080E] dark:text-white", blueprint: "text-[#FFA500]", io: "text-[#84D71A]" },
    portal: { business: "text-[#09080E] dark:text-white", blueprint: "text-[#FFA500]", io: "text-[#84D71A]" }
  },
  
  // hostsblue.com (webhosted.io)
  webhosted: {
    home: { web: "text-[#09080E] dark:text-white", hosted: "text-[#660099]", io: "text-[#84D71A]" },
    contact: { web: "text-[#09080E] dark:text-white", hosted: "text-[#660099]", io: "text-[#84D71A]" },
    about: { web: "text-[#09080E] dark:text-white", hosted: "text-[#660099]", io: "text-[#84D71A]" },
    pricing: { web: "text-[#09080E] dark:text-white", hosted: "text-[#660099]", io: "text-[#84D71A]" },
    portal: { web: "text-[#09080E] dark:text-white", hosted: "text-[#660099]", io: "text-[#84D71A]" }
  },
  
  // swipesblue.com (airswiped.com)
  airswiped: {
    home: { air: "text-[#09080E] dark:text-white", swiped: "text-[#FF0040]", com: "text-[#84D71A]" },
    contact: { air: "text-[#09080E] dark:text-white", swiped: "text-[#FF0040]", com: "text-[#84D71A]" },
    about: { air: "text-[#09080E] dark:text-white", swiped: "text-[#FF0040]", com: "text-[#84D71A]" },
    pricing: { air: "text-[#09080E] dark:text-white", swiped: "text-[#FF0040]", com: "text-[#84D71A]" },
    portal: { air: "text-[#09080E] dark:text-white", swiped: "text-[#FF0040]", com: "text-[#84D71A]" }
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