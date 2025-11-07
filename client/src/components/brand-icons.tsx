// Brand Icons - Matching Coach Blue style (orange strokes, blue border, transparent background)
import coachIcon from "@assets/Coach Blue_1762496061116.png";

interface BrandIconProps {
  className?: string;
  size?: number;
}

// 1. Digital IQ Icon - Gauge/meter showing score
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
      {/* Blue rounded border */}
      <rect x="0" y="0" width="64" height="64" rx="12" fill="#0000FF" />
      
      {/* Gauge arc - bottom half circle */}
      <path 
        d="M 12 38 A 20 20 0 0 1 52 38" 
        stroke="#FF6B00" 
        strokeWidth="3" 
        fill="none"
        strokeLinecap="round"
      />
      
      {/* Tick marks */}
      <line x1="12" y1="38" x2="15" y2="35" stroke="#FF6B00" strokeWidth="3" strokeLinecap="round" />
      <line x1="20" y1="24" x2="22" y2="27" stroke="#FF6B00" strokeWidth="3" strokeLinecap="round" />
      <line x1="32" y1="18" x2="32" y2="22" stroke="#FF6B00" strokeWidth="3" strokeLinecap="round" />
      <line x1="44" y1="24" x2="42" y2="27" stroke="#FF6B00" strokeWidth="3" strokeLinecap="round" />
      <line x1="52" y1="38" x2="49" y2="35" stroke="#FF6B00" strokeWidth="3" strokeLinecap="round" />
      
      {/* Needle pointing to high score */}
      <line x1="32" y1="38" x2="44" y2="26" stroke="#FF6B00" strokeWidth="3" strokeLinecap="round" />
      
      {/* Center dot */}
      <circle cx="32" cy="38" r="3" stroke="#FF6B00" strokeWidth="3" fill="none" />
    </svg>
  );
}

// 2. Digital Assessment Icon - Clipboard with checkmark
export function DigitalAssessmentIcon({ className = "", size = 64 }: BrandIconProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 64 64" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Blue rounded border */}
      <rect x="0" y="0" width="64" height="64" rx="12" fill="#0000FF" />
      
      {/* Orange clipboard outline */}
      <rect x="20" y="14" width="24" height="32" rx="2" stroke="#FF6B00" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      
      {/* Clipboard clip at top */}
      <rect x="28" y="10" width="8" height="5" rx="1" stroke="#FF6B00" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      
      {/* Checkmark */}
      <path 
        d="M 26 26 L 29 30 L 34 22" 
        stroke="#FF6B00" 
        strokeWidth="3" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        fill="none"
      />
      
      {/* Two list lines */}
      <line x1="26" y1="34" x2="38" y2="34" stroke="#FF6B00" strokeWidth="3" strokeLinecap="round" />
      <line x1="26" y1="40" x2="38" y2="40" stroke="#FF6B00" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

// 3. 30-Day Action Plan Icon - Calendar with progress path
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
      {/* Blue rounded border */}
      <rect x="0" y="0" width="64" height="64" rx="12" fill="#0000FF" />
      
      {/* Calendar outline */}
      <rect x="14" y="18" width="36" height="32" rx="2" stroke="#FF6B00" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      
      {/* Calendar binding rings */}
      <line x1="22" y1="14" x2="22" y2="22" stroke="#FF6B00" strokeWidth="3" strokeLinecap="round" />
      <line x1="32" y1="14" x2="32" y2="22" stroke="#FF6B00" strokeWidth="3" strokeLinecap="round" />
      <line x1="42" y1="14" x2="42" y2="22" stroke="#FF6B00" strokeWidth="3" strokeLinecap="round" />
      
      {/* Progress path - steps going up */}
      <path 
        d="M 20 44 L 26 44 L 26 36 L 32 36 L 32 28 L 38 28" 
        stroke="#FF6B00" 
        strokeWidth="3" 
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      
      {/* Step markers */}
      <circle cx="20" cy="44" r="2.5" stroke="#FF6B00" strokeWidth="3" fill="none" />
      <circle cx="26" cy="36" r="2.5" stroke="#FF6B00" strokeWidth="3" fill="none" />
      <circle cx="32" cy="28" r="2.5" stroke="#FF6B00" strokeWidth="3" fill="none" />
    </svg>
  );
}

// 4. Base Plans Icon - Three stacked tiers
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
      {/* Blue rounded border */}
      <rect x="0" y="0" width="64" height="64" rx="12" fill="#0000FF" />
      
      {/* Three stacked bars - bottom (largest) */}
      <rect x="12" y="42" width="40" height="8" rx="2" stroke="#FF6B00" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      
      {/* Middle tier */}
      <rect x="18" y="30" width="28" height="8" rx="2" stroke="#FF6B00" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      
      {/* Top tier (smallest) */}
      <rect x="24" y="18" width="16" height="8" rx="2" stroke="#FF6B00" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      
      {/* Central support line */}
      <line x1="32" y1="18" x2="32" y2="50" stroke="#FF6B00" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

// 5. Execution Styles/Build Method Icon - Y-shaped path (DIY/MSP/ALC)
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
      {/* Blue rounded border */}
      <rect x="0" y="0" width="64" height="64" rx="12" fill="#0000FF" />
      
      {/* Trunk - vertical line */}
      <line x1="32" y1="48" x2="32" y2="32" stroke="#FF6B00" strokeWidth="3" strokeLinecap="round" />
      
      {/* Left branch */}
      <line x1="32" y1="32" x2="18" y2="16" stroke="#FF6B00" strokeWidth="3" strokeLinecap="round" />
      
      {/* Center branch */}
      <line x1="32" y1="32" x2="32" y2="16" stroke="#FF6B00" strokeWidth="3" strokeLinecap="round" />
      
      {/* Right branch */}
      <line x1="32" y1="32" x2="46" y2="16" stroke="#FF6B00" strokeWidth="3" strokeLinecap="round" />
      
      {/* Three terminals */}
      <circle cx="18" cy="16" r="3" stroke="#FF6B00" strokeWidth="3" fill="none" />
      <circle cx="32" cy="16" r="3" stroke="#FF6B00" strokeWidth="3" fill="none" />
      <circle cx="46" cy="16" r="3" stroke="#FF6B00" strokeWidth="3" fill="none" />
    </svg>
  );
}

// 6. Execution Styles Icon - Same as BuildMethod
export const ExecutionStylesIcon = BuildMethodIcon;

// 7. Commverse Bundle Icon - 4 apps connected
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
      {/* Blue rounded border */}
      <rect x="0" y="0" width="64" height="64" rx="12" fill="#0000FF" />
      
      {/* Four circles in 2x2 grid */}
      <circle cx="22" cy="22" r="6" stroke="#FF6B00" strokeWidth="3" fill="none" />
      <circle cx="42" cy="22" r="6" stroke="#FF6B00" strokeWidth="3" fill="none" />
      <circle cx="22" cy="42" r="6" stroke="#FF6B00" strokeWidth="3" fill="none" />
      <circle cx="42" cy="42" r="6" stroke="#FF6B00" strokeWidth="3" fill="none" />
      
      {/* Connection lines to center */}
      <line x1="22" y1="22" x2="32" y2="32" stroke="#FF6B00" strokeWidth="3" strokeLinecap="round" />
      <line x1="42" y1="22" x2="32" y2="32" stroke="#FF6B00" strokeWidth="3" strokeLinecap="round" />
      <line x1="22" y1="42" x2="32" y2="32" stroke="#FF6B00" strokeWidth="3" strokeLinecap="round" />
      <line x1="42" y1="42" x2="32" y2="32" stroke="#FF6B00" strokeWidth="3" strokeLinecap="round" />
      
      {/* Central hub */}
      <circle cx="32" cy="32" r="3" stroke="#FF6B00" strokeWidth="3" fill="none" />
    </svg>
  );
}

// 8. AI Coach Blue Icon - Coach figure (using provided image)
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
