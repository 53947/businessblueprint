// Brand Icons - Clean, professional designs with depth and relevance
import coachIcon from "@assets/Coach Blue_1762496061116.png";

interface BrandIconProps {
  className?: string;
  size?: number;
}

// 1. Digital IQ Icon - Gauge meter with score
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
      <defs>
        <linearGradient id="blueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0000FF" />
          <stop offset="100%" stopColor="#3366FF" />
        </linearGradient>
        <linearGradient id="orangeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF6B00" />
          <stop offset="100%" stopColor="#FF8F33" />
        </linearGradient>
        <filter id="shadow">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.3" />
        </filter>
      </defs>
      
      {/* Gauge background circle */}
      <circle cx="32" cy="32" r="28" fill="url(#blueGrad)" filter="url(#shadow)" />
      
      {/* Inner ring */}
      <circle cx="32" cy="32" r="22" stroke="#3366FF" strokeWidth="2" fill="none" opacity="0.5" />
      
      {/* Gauge arc */}
      <path 
        d="M 12 32 A 20 20 0 1 1 52 32" 
        stroke="url(#orangeGrad)" 
        strokeWidth="6" 
        fill="none"
        strokeLinecap="round"
      />
      
      {/* Tick marks */}
      <line x1="12" y1="32" x2="16" y2="32" stroke="#FF6B00" strokeWidth="2.5" />
      <line x1="18" y1="18" x2="21" y2="21" stroke="#FF6B00" strokeWidth="2.5" />
      <line x1="32" y1="12" x2="32" y2="16" stroke="#FF6B00" strokeWidth="2.5" />
      <line x1="46" y1="18" x2="43" y2="21" stroke="#FF6B00" strokeWidth="2.5" />
      <line x1="52" y1="32" x2="48" y2="32" stroke="#FF6B00" strokeWidth="2.5" />
      
      {/* Needle */}
      <line x1="32" y1="32" x2="44" y2="22" stroke="#FF6B00" strokeWidth="3" strokeLinecap="round" />
      <circle cx="32" cy="32" r="3.5" fill="#FF6B00" />
      <circle cx="32" cy="32" r="1.5" fill="white" />
      
      {/* IQ label */}
      <text x="32" y="48" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">IQ</text>
    </svg>
  );
}

// 2. CommVerse Icon - 4 nodes in square formation
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
      <defs>
        <linearGradient id="blueGradComm" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0000FF" />
          <stop offset="100%" stopColor="#3366FF" />
        </linearGradient>
        <linearGradient id="orangeGradComm" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF6B00" />
          <stop offset="100%" stopColor="#FF8F33" />
        </linearGradient>
        <filter id="shadowComm">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.3" />
        </filter>
        <radialGradient id="glow">
          <stop offset="0%" stopColor="#FF6B00" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#FF6B00" stopOpacity="0" />
        </radialGradient>
      </defs>
      
      {/* Background circle */}
      <circle cx="32" cy="32" r="28" fill="url(#blueGradComm)" filter="url(#shadowComm)" />
      
      {/* Central glow */}
      <circle cx="32" cy="32" r="12" fill="url(#glow)" />
      
      {/* 4 app nodes in square */}
      <circle cx="20" cy="20" r="6" fill="url(#orangeGradComm)" filter="url(#shadowComm)" />
      <circle cx="44" cy="20" r="6" fill="url(#orangeGradComm)" filter="url(#shadowComm)" />
      <circle cx="20" cy="44" r="6" fill="url(#orangeGradComm)" filter="url(#shadowComm)" />
      <circle cx="44" cy="44" r="6" fill="url(#orangeGradComm)" filter="url(#shadowComm)" />
      
      {/* Connection lines */}
      <line x1="20" y1="20" x2="44" y2="20" stroke="#FF6B00" strokeWidth="2" opacity="0.5" />
      <line x1="44" y1="20" x2="44" y2="44" stroke="#FF6B00" strokeWidth="2" opacity="0.5" />
      <line x1="44" y1="44" x2="20" y2="44" stroke="#FF6B00" strokeWidth="2" opacity="0.5" />
      <line x1="20" y1="44" x2="20" y2="20" stroke="#FF6B00" strokeWidth="2" opacity="0.5" />
      
      {/* Central hub */}
      <circle cx="32" cy="32" r="4.5" fill="url(#orangeGradComm)" />
      
      {/* Diagonal connections to center */}
      <line x1="20" y1="20" x2="32" y2="32" stroke="#FF6B00" strokeWidth="1.5" opacity="0.4" />
      <line x1="44" y1="20" x2="32" y2="32" stroke="#FF6B00" strokeWidth="1.5" opacity="0.4" />
      <line x1="20" y1="44" x2="32" y2="32" stroke="#FF6B00" strokeWidth="1.5" opacity="0.4" />
      <line x1="44" y1="44" x2="32" y2="32" stroke="#FF6B00" strokeWidth="1.5" opacity="0.4" />
      
      {/* Node highlights */}
      <circle cx="20" cy="20" r="2" fill="white" opacity="0.6" />
      <circle cx="44" cy="20" r="2" fill="white" opacity="0.6" />
      <circle cx="20" cy="44" r="2" fill="white" opacity="0.6" />
      <circle cx="44" cy="44" r="2" fill="white" opacity="0.6" />
    </svg>
  );
}

// 3. AI Coach Blue Icon - Coach figure
export function CoachBlueIcon({ className = "", size = 64 }: BrandIconProps) {
  return (
    <img 
      src={coachIcon} 
      alt="AI Coach Blue" 
      width={size} 
      height={size}
      className={className}
      style={{ objectFit: 'contain' }}
    />
  );
}

// 4. Base Plan Icon - 3 foundation tiers
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
      <defs>
        <linearGradient id="orangeGradBase" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FF8F33" />
          <stop offset="100%" stopColor="#FF6B00" />
        </linearGradient>
        <filter id="shadowBase">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.3" />
        </filter>
      </defs>
      
      {/* Bottom tier - largest (Scale $999) */}
      <rect x="8" y="42" width="48" height="10" rx="2" fill="url(#orangeGradBase)" filter="url(#shadowBase)" />
      <rect x="8" y="42" width="48" height="3" fill="#FFA555" opacity="0.6" />
      <text x="32" y="50" textAnchor="middle" fill="white" fontSize="7" fontWeight="bold">$999</text>
      
      {/* Middle tier (Advanced $299) */}
      <rect x="14" y="28" width="36" height="10" rx="2" fill="url(#orangeGradBase)" filter="url(#shadowBase)" />
      <rect x="14" y="28" width="36" height="3" fill="#FFA555" opacity="0.6" />
      <text x="32" y="36" textAnchor="middle" fill="white" fontSize="7" fontWeight="bold">$299</text>
      
      {/* Top tier - smallest (Start $99) */}
      <rect x="20" y="14" width="24" height="10" rx="2" fill="url(#orangeGradBase)" filter="url(#shadowBase)" />
      <rect x="20" y="14" width="24" height="3" fill="#FFA555" opacity="0.6" />
      <text x="32" y="22" textAnchor="middle" fill="white" fontSize="7" fontWeight="bold">$99</text>
      
      {/* Structure line */}
      <line x1="32" y1="14" x2="32" y2="52" stroke="#0000FF" strokeWidth="1.5" opacity="0.2" />
    </svg>
  );
}

// 5. 30-Day Action Plan Icon - Calendar with progress steps
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
      <defs>
        <linearGradient id="orangeGradAction" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF6B00" />
          <stop offset="100%" stopColor="#FF8F33" />
        </linearGradient>
        <filter id="shadowAction">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.3" />
        </filter>
      </defs>
      
      {/* Calendar page */}
      <rect x="12" y="12" width="40" height="40" rx="3" stroke="#0000FF" strokeWidth="3" fill="white" filter="url(#shadowAction)" />
      
      {/* Calendar header */}
      <rect x="12" y="12" width="40" height="8" rx="3" fill="url(#orangeGradAction)" />
      
      {/* Progress ribbon climbing upward */}
      <path 
        d="M 18 46 L 24 46 L 24 36 L 30 36 L 30 26 L 36 26 L 36 18" 
        stroke="url(#orangeGradAction)" 
        strokeWidth="5" 
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.8"
      />
      
      {/* Week milestones */}
      <circle cx="21" cy="46" r="4" fill="url(#orangeGradAction)" filter="url(#shadowAction)" />
      <circle cx="27" cy="36" r="4" fill="url(#orangeGradAction)" filter="url(#shadowAction)" />
      <circle cx="33" cy="26" r="4" fill="url(#orangeGradAction)" filter="url(#shadowAction)" />
      <circle cx="36" cy="18" r="4" fill="url(#orangeGradAction)" filter="url(#shadowAction)" />
      
      {/* Checkmarks */}
      <path d="M 20 46 L 21 47 L 23 45" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M 26 36 L 27 37 L 29 35" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M 32 26 L 33 27 L 35 25" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none" />
      
      {/* Calendar grid */}
      <line x1="20" y1="20" x2="20" y2="52" stroke="#0000FF" strokeWidth="0.5" opacity="0.2" />
      <line x1="28" y1="20" x2="28" y2="52" stroke="#0000FF" strokeWidth="0.5" opacity="0.2" />
      <line x1="36" y1="20" x2="36" y2="52" stroke="#0000FF" strokeWidth="0.5" opacity="0.2" />
      <line x1="44" y1="20" x2="44" y2="52" stroke="#0000FF" strokeWidth="0.5" opacity="0.2" />
    </svg>
  );
}

// 6. Build Method Icon - Tools and execution options
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
      <defs>
        <linearGradient id="orangeGradBuild" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF6B00" />
          <stop offset="100%" stopColor="#FF8F33" />
        </linearGradient>
        <filter id="shadowBuild">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.3" />
        </filter>
      </defs>
      
      {/* DIY - Toggle switch */}
      <rect x="14" y="16" width="18" height="8" rx="4" stroke="url(#orangeGradBuild)" strokeWidth="2.5" fill="white" filter="url(#shadowBuild)" />
      <circle cx="24" cy="20" r="4" fill="url(#orangeGradBuild)" />
      <text x="23" y="14" textAnchor="middle" fill="#0000FF" fontSize="6" fontWeight="bold">DIY</text>
      
      {/* MSP - Wrench */}
      <rect x="26" y="30" width="3.5" height="18" rx="1.75" fill="url(#orangeGradBuild)" filter="url(#shadowBuild)" />
      <circle cx="27.75" cy="27" r="4.5" stroke="url(#orangeGradBuild)" strokeWidth="2.5" fill="white" filter="url(#shadowBuild)" />
      <text x="18" y="44" textAnchor="middle" fill="#0000FF" fontSize="6" fontWeight="bold">MSP</text>
      
      {/* ALC - Automation gear */}
      <circle cx="44" cy="32" r="10" stroke="url(#orangeGradBuild)" strokeWidth="3" fill="white" filter="url(#shadowBuild)" />
      <circle cx="44" cy="32" r="4" fill="url(#orangeGradBuild)" />
      
      {/* Gear teeth */}
      <rect x="42" y="20" width="4" height="4" fill="#FF6B00" />
      <rect x="42" y="40" width="4" height="4" fill="#FF6B00" />
      <rect x="52" y="30" width="4" height="4" fill="#FF6B00" />
      <rect x="32" y="30" width="4" height="4" fill="#FF6B00" />
      
      <text x="44" y="52" textAnchor="middle" fill="#0000FF" fontSize="6" fontWeight="bold">ALC</text>
      
      {/* Connection lines */}
      <path d="M 32 20 L 38 28" stroke="#0000FF" strokeWidth="1.5" opacity="0.3" strokeDasharray="2 2" />
      <path d="M 30 40 L 36 36" stroke="#0000FF" strokeWidth="1.5" opacity="0.3" strokeDasharray="2 2" />
    </svg>
  );
}
