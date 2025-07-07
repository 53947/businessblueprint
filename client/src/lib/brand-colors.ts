// Brand color system for the pleaser ecosystem
export const brandColors = {
  // Primary platforms with signature colors
  cloudpleaser: {
    signature: "text-blue-600", // Blue for digital empowerment
    secondary: "text-purple-600",
    home: { primary: "text-blue-600", secondary: "text-purple-600" }
  },
  
  webhosted: {
    signature: "text-green-600", // Green for hosting/growth
    secondary: "text-emerald-600", 
    home: { primary: "text-green-600", secondary: "text-emerald-600" }
  },
  
  airswiped: {
    signature: "text-orange-600", // Orange for payments/energy
    secondary: "text-amber-600",
    home: { primary: "text-orange-600", secondary: "text-amber-600" }
  },

  // Page-specific colors (consistent across all platforms)
  pages: {
    contact: "text-green-600", // All contact pages use green pleaser
    portal: { primary: "text-blue-600", secondary: "text-purple-600" }, // All portal logins use blue/purple
    about: "text-indigo-600", // All about pages use indigo pleaser
    pricing: "text-purple-600", // All pricing pages use purple pleaser
    support: "text-teal-600" // All support pages use teal pleaser
  }
};

// Helper function to generate brand component
export function generateBrandLogo(
  platform: keyof typeof brandColors,
  page?: keyof typeof brandColors.pages,
  className?: string
) {
  const colors = page 
    ? brandColors.pages[page]
    : brandColors[platform].home;

  if (typeof colors === 'string') {
    // Single color for specific pages
    return (
      <div className={`text-2xl font-bold ${className || ''}`}>
        {platform}<span className={colors}>pleaser</span>
        <span className="text-gray-600">.io</span>
      </div>
    );
  } else {
    // Dual color for home pages and portal
    return (
      <div className={`text-2xl font-bold ${className || ''}`}>
        {platform}<span className={colors.primary}>pleaser</span>
        <span className={colors.secondary}>.io</span>
      </div>
    );
  }
}