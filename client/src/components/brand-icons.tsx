// Brand Icons - TriadBlue System
// Cohesive circular design with contextually relevant orange symbols

interface BrandIconProps {
  className?: string;
  size?: number;
}

// 1. Digital IQ Icon - Gauge/measurement meter
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
      <circle cx="32" cy="32" r="28" fill="#0000FF" />
      <circle cx="32" cy="32" r="24" fill="#0033AA" opacity="0.3" />
      
      {/* Gauge arc */}
      <path 
        d="M 16 32 A 16 16 0 1 1 48 32" 
        stroke="#FF6B00" 
        strokeWidth="3" 
        fill="none"
        strokeLinecap="round"
      />
      
      {/* Gauge segments */}
      <line x1="16" y1="32" x2="19" y2="32" stroke="#FF6B00" strokeWidth="2" />
      <line x1="22" y1="20" x2="24" y2="22" stroke="#FF6B00" strokeWidth="2" />
      <line x1="32" y1="16" x2="32" y2="19" stroke="#FF6B00" strokeWidth="2" />
      <line x1="42" y1="20" x2="40" y2="22" stroke="#FF6B00" strokeWidth="2" />
      <line x1="48" y1="32" x2="45" y2="32" stroke="#FF6B00" strokeWidth="2" />
      
      {/* Needle pointer */}
      <path 
        d="M 32 32 L 42 24" 
        stroke="#FF6B00" 
        strokeWidth="2.5" 
        strokeLinecap="round"
      />
      <circle cx="32" cy="32" r="2" fill="#FF6B00" />
      
      {/* Spark/intelligence indicator */}
      <path d="M 38 42 L 40 38 L 36 38 L 38 34" fill="#FF6B00" />
    </svg>
  );
}

// 2. CommVerse Icon - 4 balls in square formation
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
      <circle cx="32" cy="32" r="28" fill="#0000FF" />
      <circle cx="32" cy="32" r="24" fill="#0033AA" opacity="0.3" />
      
      {/* 4 balls in square formation */}
      <circle cx="24" cy="24" r="5" fill="#FF6B00" />
      <circle cx="40" cy="24" r="5" fill="#FF6B00" />
      <circle cx="24" cy="40" r="5" fill="#FF6B00" />
      <circle cx="40" cy="40" r="5" fill="#FF6B00" />
      
      {/* Connection arcs between balls */}
      <path d="M 24 24 L 40 24" stroke="#FF6B00" strokeWidth="2" opacity="0.5" />
      <path d="M 40 24 L 40 40" stroke="#FF6B00" strokeWidth="2" opacity="0.5" />
      <path d="M 40 40 L 24 40" stroke="#FF6B00" strokeWidth="2" opacity="0.5" />
      <path d="M 24 40 L 24 24" stroke="#FF6B00" strokeWidth="2" opacity="0.5" />
      
      {/* Central hub */}
      <circle cx="32" cy="32" r="3" fill="#FF6B00" opacity="0.7" />
      <path d="M 24 24 L 32 32" stroke="#FF6B00" strokeWidth="1.5" opacity="0.4" />
      <path d="M 40 24 L 32 32" stroke="#FF6B00" strokeWidth="1.5" opacity="0.4" />
      <path d="M 24 40 L 32 32" stroke="#FF6B00" strokeWidth="1.5" opacity="0.4" />
      <path d="M 40 40 L 32 32" stroke="#FF6B00" strokeWidth="1.5" opacity="0.4" />
    </svg>
  );
}

// 3. AI Coach Blue Icon - Baseball cap + whistle
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
      <circle cx="32" cy="32" r="28" fill="#0000FF" />
      <circle cx="32" cy="32" r="24" fill="#0033AA" opacity="0.3" />
      
      {/* Baseball cap - dome/crown */}
      <path 
        d="M 20 26 Q 20 18 32 18 Q 44 18 44 26 L 44 28 Q 44 30 42 30 L 22 30 Q 20 30 20 28 Z" 
        fill="#FF6B00"
      />
      
      {/* Cap brim - extending forward */}
      <ellipse cx="35" cy="28" rx="11" ry="3.5" fill="#FF6B00" opacity="0.9" />
      
      {/* Cap button/logo on top */}
      <circle cx="32" cy="20" r="2" fill="#0000FF" opacity="0.5" />
      
      {/* Whistle body - round with hole */}
      <ellipse cx="28" cy="42" rx="5" ry="4" fill="#FF6B00" />
      <circle cx="28" cy="42" r="1.5" fill="#0000FF" />
      
      {/* Whistle mouthpiece */}
      <rect x="23" y="41" width="3" height="2" rx="1" fill="#FF6B00" />
      
      {/* Whistle pea/ball inside */}
      <circle cx="29" cy="42" r="0.8" fill="#0000FF" opacity="0.6" />
      
      {/* Lanyard/string */}
      <path 
        d="M 28 38 Q 32 36 32 32" 
        stroke="#FF6B00" 
        strokeWidth="1.5" 
        fill="none"
        strokeDasharray="2,2"
      />
    </svg>
  );
}

// 4. Base Plan Icon - Foundation blocks/layers
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
      <circle cx="32" cy="32" r="28" fill="#0000FF" />
      <circle cx="32" cy="32" r="24" fill="#0033AA" opacity="0.3" />
      
      {/* Stacked foundation blocks - pyramid */}
      <rect x="18" y="40" width="28" height="6" rx="1" fill="#FF6B00" />
      <rect x="21" y="33" width="22" height="6" rx="1" fill="#FF6B00" opacity="0.9" />
      <rect x="24" y="26" width="16" height="6" rx="1" fill="#FF6B00" opacity="0.8" />
      <rect x="27" y="19" width="10" height="6" rx="1" fill="#FF6B00" opacity="0.7" />
      
      {/* Grid lines for structure */}
      <line x1="32" y1="19" x2="32" y2="46" stroke="#0000FF" strokeWidth="1" opacity="0.3" />
      <line x1="26" y1="26" x2="38" y2="26" stroke="#0000FF" strokeWidth="1" opacity="0.2" />
      <line x1="24" y1="33" x2="40" y2="33" stroke="#0000FF" strokeWidth="1" opacity="0.2" />
    </svg>
  );
}

// 5. 30-Day Action Plan Icon - Stepped path with milestones
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
      <circle cx="32" cy="32" r="28" fill="#0000FF" />
      <circle cx="32" cy="32" r="24" fill="#0033AA" opacity="0.3" />
      
      {/* Stepped path going upward */}
      <path 
        d="M 18 44 L 24 44 L 24 36 L 30 36 L 30 28 L 36 28 L 36 20 L 42 20" 
        stroke="#FF6B00" 
        strokeWidth="3" 
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* Milestone markers (checkpoints) */}
      <circle cx="21" cy="44" r="3" fill="#FF6B00" />
      <circle cx="27" cy="36" r="3" fill="#FF6B00" />
      <circle cx="33" cy="28" r="3" fill="#FF6B00" />
      <circle cx="39" cy="20" r="3" fill="#FF6B00" />
      
      {/* Checkmarks at milestones */}
      <path d="M 19 44 L 20.5 45.5 L 23 43" stroke="#0000FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M 25 36 L 26.5 37.5 L 29 35" stroke="#0000FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M 31 28 L 32.5 29.5 L 35 27" stroke="#0000FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// 6. Build Method Icon - Tools and modular execution
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
      <circle cx="32" cy="32" r="28" fill="#0000FF" />
      <circle cx="32" cy="32" r="24" fill="#0033AA" opacity="0.3" />
      
      {/* Wrench */}
      <rect x="20" y="28" width="3" height="16" rx="1.5" fill="#FF6B00" />
      <circle cx="21.5" cy="26" r="4" stroke="#FF6B00" strokeWidth="2" fill="none" />
      <path d="M 19 26 L 24 26" stroke="#FF6B00" strokeWidth="1.5" />
      
      {/* Gear/cog */}
      <circle cx="38" cy="30" r="7" stroke="#FF6B00" strokeWidth="2.5" fill="none" />
      <circle cx="38" cy="30" r="3" fill="#FF6B00" />
      <rect x="36.5" y="22" width="3" height="4" fill="#FF6B00" />
      <rect x="36.5" y="34" width="3" height="4" fill="#FF6B00" />
      <rect x="42" y="28.5" width="4" height="3" fill="#FF6B00" />
      <rect x="30" y="28.5" width="4" height="3" fill="#FF6B00" />
      
      {/* Circuit/connection lines */}
      <path d="M 26 36 L 32 36 L 32 40 L 38 40" stroke="#FF6B00" strokeWidth="2" strokeLinecap="round" />
      <circle cx="26" cy="36" r="2" fill="#FF6B00" />
      <circle cx="38" cy="40" r="2" fill="#FF6B00" />
    </svg>
  );
}
