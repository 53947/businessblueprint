// Brand Icons - TriadBlue Professional System
// Premium design with gradients, depth, and contextual metaphors

interface BrandIconProps {
  className?: string;
  size?: number;
}

// Shared gradient definitions
const GradientDefs = () => (
  <defs>
    <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#0000FF" />
      <stop offset="100%" stopColor="#1A33FF" />
    </linearGradient>
    <linearGradient id="orangeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#FF6B00" />
      <stop offset="100%" stopColor="#FF8F33" />
    </linearGradient>
    <filter id="dropShadow" x="-50%" y="-50%" width="200%" height="200%">
      <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.25" />
    </filter>
    <radialGradient id="glowGradient">
      <stop offset="0%" stopColor="#FF6B00" stopOpacity="0.6" />
      <stop offset="100%" stopColor="#FF6B00" stopOpacity="0" />
    </radialGradient>
  </defs>
);

// 1. Digital IQ Icon - Speedometer with analytics grid
export function DigitalIQIcon({ className = "", size = 64 }: BrandIconProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 64 64" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <GradientDefs />
      
      {/* Head silhouette base */}
      <path
        d="M32 4C20 4 10 14 10 26C10 32 12 37 15 41V52C15 54 16 56 18 57L32 62L46 57C48 56 49 54 49 52V41C52 37 54 32 54 26C54 14 44 4 32 4Z"
        fill="url(#blueGradient)"
        filter="url(#dropShadow)"
      />
      
      {/* Rim lighting */}
      <path
        d="M32 4C20 4 10 14 10 26C10 32 12 37 15 41"
        stroke="#3366FF"
        strokeWidth="1.5"
        opacity="0.5"
        fill="none"
      />
      
      {/* Analytics grid background */}
      <line x1="18" y1="24" x2="46" y2="24" stroke="#FF6B00" strokeWidth="0.5" opacity="0.3" />
      <line x1="18" y1="28" x2="46" y2="28" stroke="#FF6B00" strokeWidth="0.5" opacity="0.3" />
      <line x1="18" y1="32" x2="46" y2="32" stroke="#FF6B00" strokeWidth="0.5" opacity="0.3" />
      
      {/* Speedometer arc */}
      <path 
        d="M 18 32 A 14 14 0 0 1 46 32" 
        stroke="url(#orangeGradient)" 
        strokeWidth="4" 
        fill="none"
        strokeLinecap="round"
      />
      
      {/* Gauge segments */}
      <line x1="20" y1="32" x2="22" y2="29" stroke="#FF6B00" strokeWidth="2" strokeLinecap="round" />
      <line x1="26" y1="22" x2="27" y2="25" stroke="#FF6B00" strokeWidth="2" strokeLinecap="round" />
      <line x1="32" y1="18" x2="32" y2="21" stroke="#FF6B00" strokeWidth="2" strokeLinecap="round" />
      <line x1="38" y1="22" x2="37" y2="25" stroke="#FF6B00" strokeWidth="2" strokeLinecap="round" />
      <line x1="44" y1="32" x2="42" y2="29" stroke="#FF6B00" strokeWidth="2" strokeLinecap="round" />
      
      {/* Needle pointer with glow */}
      <circle cx="32" cy="32" r="8" fill="url(#glowGradient)" />
      <path 
        d="M 32 32 L 40 24" 
        stroke="url(#orangeGradient)" 
        strokeWidth="3" 
        strokeLinecap="round"
      />
      <circle cx="32" cy="32" r="3" fill="url(#orangeGradient)" />
      
      {/* Score indicator */}
      <text x="32" y="44" textAnchor="middle" fill="#FF6B00" fontSize="10" fontWeight="bold" fontFamily="Arial">SCORE</text>
    </svg>
  );
}

// 2. CommVerse Icon - 4 app quadrants orbiting core
export function CommverseIcon({ className = "", size = 64 }: BrandIconProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 64 64" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <GradientDefs />
      
      {/* Head silhouette base */}
      <path
        d="M32 4C20 4 10 14 10 26C10 32 12 37 15 41V52C15 54 16 56 18 57L32 62L46 57C48 56 49 54 49 52V41C52 37 54 32 54 26C54 14 44 4 32 4Z"
        fill="url(#blueGradient)"
        filter="url(#dropShadow)"
      />
      
      {/* Central hub with glow */}
      <circle cx="32" cy="28" r="6" fill="url(#glowGradient)" />
      <circle cx="32" cy="28" r="4" fill="url(#orangeGradient)" />
      
      {/* 4 app nodes in quadrants */}
      <circle cx="22" cy="20" r="4.5" fill="url(#orangeGradient)" opacity="0.9" />
      <circle cx="42" cy="20" r="4.5" fill="url(#orangeGradient)" opacity="0.9" />
      <circle cx="22" cy="36" r="4.5" fill="url(#orangeGradient)" opacity="0.9" />
      <circle cx="42" cy="36" r="4.5" fill="url(#orangeGradient)" opacity="0.9" />
      
      {/* Signal/connection lines flowing from center */}
      <path d="M 32 28 L 22 20" stroke="#FF6B00" strokeWidth="2" opacity="0.6" />
      <path d="M 32 28 L 42 20" stroke="#FF6B00" strokeWidth="2" opacity="0.6" />
      <path d="M 32 28 L 22 36" stroke="#FF6B00" strokeWidth="2" opacity="0.6" />
      <path d="M 32 28 L 42 36" stroke="#FF6B00" strokeWidth="2" opacity="0.6" />
      
      {/* Orbital ring */}
      <circle cx="32" cy="28" r="14" stroke="#FF6B00" strokeWidth="1.5" opacity="0.3" fill="none" strokeDasharray="4 4" />
      
      {/* App icons subtle indicators */}
      <path d="M 22 20 L 23 19" stroke="white" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
      <circle cx="42" cy="20" r="1.5" fill="white" opacity="0.6" />
      <rect x="21" y="35" width="2" height="2" fill="white" opacity="0.6" />
      <path d="M 41 35 L 43 37" stroke="white" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
    </svg>
  );
}

// 3. AI Coach Blue Icon - Guidance constellation with compass
export function CoachBlueIcon({ className = "", size = 64 }: BrandIconProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 64 64" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <GradientDefs />
      
      {/* Head silhouette base */}
      <path
        d="M32 4C20 4 10 14 10 26C10 32 12 37 15 41V52C15 54 16 56 18 57L32 62L46 57C48 56 49 54 49 52V41C52 37 54 32 54 26C54 14 44 4 32 4Z"
        fill="url(#blueGradient)"
        filter="url(#dropShadow)"
      />
      
      {/* Chat bubble outline */}
      <path
        d="M 20 26 C 20 20 25 16 32 16 C 39 16 44 20 44 26 C 44 32 39 36 32 36 L 28 36 L 26 40 L 27 36 C 23 34 20 30 20 26 Z"
        stroke="url(#orangeGradient)"
        strokeWidth="2.5"
        fill="none"
      />
      
      {/* Compass rose inside */}
      <circle cx="32" cy="26" r="8" stroke="#FF6B00" strokeWidth="1.5" opacity="0.4" fill="none" />
      
      {/* North arrow (guidance direction) */}
      <path 
        d="M 32 20 L 34 26 L 32 25 L 30 26 Z" 
        fill="url(#orangeGradient)"
      />
      
      {/* Compass points */}
      <circle cx="32" cy="19" r="1.5" fill="#FF6B00" opacity="0.7" />
      <circle cx="32" cy="33" r="1.5" fill="#FF6B00" opacity="0.4" />
      <circle cx="39" cy="26" r="1.5" fill="#FF6B00" opacity="0.4" />
      <circle cx="25" cy="26" r="1.5" fill="#FF6B00" opacity="0.4" />
      
      {/* Central pivot */}
      <circle cx="32" cy="26" r="2" fill="url(#orangeGradient)" />
      
      {/* Guidance stars */}
      <path d="M 24 18 L 24.5 19.5 L 23.5 19.5 Z" fill="#FF6B00" opacity="0.8" />
      <path d="M 40 18 L 40.5 19.5 L 39.5 19.5 Z" fill="#FF6B00" opacity="0.8" />
      <path d="M 36 32 L 36.5 33.5 L 35.5 33.5 Z" fill="#FF6B00" opacity="0.6" />
    </svg>
  );
}

// 4. Base Plan Icon - Three interlocking foundation slabs
export function BasePlanIcon({ className = "", size = 64 }: BrandIconProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 64 64" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <GradientDefs />
      
      {/* Head silhouette base */}
      <path
        d="M32 4C20 4 10 14 10 26C10 32 12 37 15 41V52C15 54 16 56 18 57L32 62L46 57C48 56 49 54 49 52V41C52 37 54 32 54 26C54 14 44 4 32 4Z"
        fill="url(#blueGradient)"
        filter="url(#dropShadow)"
      />
      
      {/* Foundation slabs - 3 tiers */}
      {/* Bottom tier - largest */}
      <rect x="18" y="36" width="28" height="7" rx="1.5" fill="url(#orangeGradient)" opacity="0.95" />
      <rect x="18" y="36" width="28" height="2" fill="#FF8F33" opacity="0.6" />
      
      {/* Middle tier */}
      <rect x="21" y="28" width="22" height="7" rx="1.5" fill="url(#orangeGradient)" opacity="0.9" />
      <rect x="21" y="28" width="22" height="2" fill="#FF8F33" opacity="0.5" />
      
      {/* Top tier */}
      <rect x="24" y="20" width="16" height="7" rx="1.5" fill="url(#orangeGradient)" opacity="0.85" />
      <rect x="24" y="20" width="16" height="2" fill="#FF8F33" opacity="0.4" />
      
      {/* Price tier indicators */}
      <text x="32" y="41" textAnchor="middle" fill="white" fontSize="5" fontWeight="bold">$99</text>
      <text x="32" y="33" textAnchor="middle" fill="white" fontSize="5" fontWeight="bold">$299</text>
      <text x="32" y="25" textAnchor="middle" fill="white" fontSize="5" fontWeight="bold">$999</text>
      
      {/* Structural grid lines */}
      <line x1="32" y1="20" x2="32" y2="43" stroke="#0000FF" strokeWidth="1" opacity="0.2" />
    </svg>
  );
}

// 5. 30-Day Action Plan Icon - Calendar arc with progress ribbon
export function ActionPlanIcon({ className = "", size = 64 }: BrandIconProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 64 64" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <GradientDefs />
      
      {/* Head silhouette base */}
      <path
        d="M32 4C20 4 10 14 10 26C10 32 12 37 15 41V52C15 54 16 56 18 57L32 62L46 57C48 56 49 54 49 52V41C52 37 54 32 54 26C54 14 44 4 32 4Z"
        fill="url(#blueGradient)"
        filter="url(#dropShadow)"
      />
      
      {/* Calendar page */}
      <rect x="20" y="18" width="24" height="24" rx="2" stroke="#FF6B00" strokeWidth="2" fill="none" opacity="0.6" />
      <rect x="20" y="18" width="24" height="5" fill="url(#orangeGradient)" />
      
      {/* Progress ribbon climbing upward */}
      <path 
        d="M 22 38 L 26 38 L 26 32 L 30 32 L 30 26 L 34 26 L 34 22" 
        stroke="url(#orangeGradient)" 
        strokeWidth="4" 
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* Week milestone markers */}
      <circle cx="24" cy="38" r="3" fill="url(#orangeGradient)" />
      <circle cx="28" cy="32" r="3" fill="url(#orangeGradient)" />
      <circle cx="32" cy="26" r="3" fill="url(#orangeGradient)" />
      <circle cx="35" cy="22" r="3" fill="url(#orangeGradient)" />
      
      {/* Checkmarks */}
      <path d="M 23 38 L 24 39 L 25.5 37" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <path d="M 27 32 L 28 33 L 29.5 31" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <path d="M 31 26 L 32 27 L 33.5 25" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      
      {/* Calendar grid faint */}
      <line x1="26" y1="23" x2="26" y2="42" stroke="#FF6B00" strokeWidth="0.5" opacity="0.2" />
      <line x1="32" y1="23" x2="32" y2="42" stroke="#FF6B00" strokeWidth="0.5" opacity="0.2" />
      <line x1="38" y1="23" x2="38" y2="42" stroke="#FF6B00" strokeWidth="0.5" opacity="0.2" />
    </svg>
  );
}

// 6. Build Method Icon - Modular toolkit triad (toggle, tools, automation)
export function BuildMethodIcon({ className = "", size = 64 }: BrandIconProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 64 64" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <GradientDefs />
      
      {/* Head silhouette base */}
      <path
        d="M32 4C20 4 10 14 10 26C10 32 12 37 15 41V52C15 54 16 56 18 57L32 62L46 57C48 56 49 54 49 52V41C52 37 54 32 54 26C54 14 44 4 32 4Z"
        fill="url(#blueGradient)"
        filter="url(#dropShadow)"
      />
      
      {/* DIY Toggle switch */}
      <rect x="18" y="20" width="12" height="6" rx="3" stroke="url(#orangeGradient)" strokeWidth="2" fill="none" />
      <circle cx="24" cy="23" r="2.5" fill="url(#orangeGradient)" />
      
      {/* MSP Wrench */}
      <rect x="26" y="30" width="2.5" height="12" rx="1.25" fill="url(#orangeGradient)" />
      <circle cx="27.25" cy="28" r="3" stroke="url(#orangeGradient)" strokeWidth="2" fill="none" />
      
      {/* ALC Automation gear */}
      <circle cx="40" cy="26" r="6" stroke="url(#orangeGradient)" strokeWidth="2.5" fill="none" />
      <circle cx="40" cy="26" r="2.5" fill="url(#orangeGradient)" />
      
      {/* Gear teeth */}
      <rect x="38.5" y="18" width="3" height="3" fill="#FF6B00" />
      <rect x="38.5" y="31" width="3" height="3" fill="#FF6B00" />
      <rect x="45" y="24.5" width="3" height="3" fill="#FF6B00" />
      <rect x="32" y="24.5" width="3" height="3" fill="#FF6B00" />
      
      {/* Connection circuit traces */}
      <path d="M 30 23 L 34 26" stroke="#FF6B00" strokeWidth="1.5" opacity="0.5" />
      <path d="M 28 30 L 34 28" stroke="#FF6B00" strokeWidth="1.5" opacity="0.5" />
      
      {/* Module indicators */}
      <circle cx="22" cy="23" r="1" fill="white" opacity="0.8" />
      <circle cx="27" cy="36" r="1" fill="white" opacity="0.8" />
      <circle cx="40" cy="26" r="1" fill="white" opacity="0.8" />
    </svg>
  );
}
