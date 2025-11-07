// Brand Icons - Matching Coach Blue style (orange strokes on black, blue border)
import coachIcon from "@assets/Coach Blue_1762496061116.png";

interface BrandIconProps {
  className?: string;
  size?: number;
}

// 1. Digital Assessment Icon - Clipboard with checkmark
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
      
      {/* Black background */}
      <rect x="4" y="4" width="56" height="56" rx="8" fill="#000000" />
      
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

// 2. Base Plans Icon - Three stacked tiers
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
      
      {/* Black background */}
      <rect x="4" y="4" width="56" height="56" rx="8" fill="#000000" />
      
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

// 3. Execution Styles Icon - Y-shaped path (DIY/MSP/ALC)
export function ExecutionStylesIcon({ className = "", size = 64 }: BrandIconProps) {
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
      
      {/* Black background */}
      <rect x="4" y="4" width="56" height="56" rx="8" fill="#000000" />
      
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

// 4. Commverse Bundle Icon - 4 apps connected
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
      
      {/* Black background */}
      <rect x="4" y="4" width="56" height="56" rx="8" fill="#000000" />
      
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

// 5. AI Coach Blue Icon - Coach figure (using provided image)
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

// Legacy names for backwards compatibility
export const DigitalIQIcon = DigitalAssessmentIcon;
export const ActionPlanIcon = DigitalAssessmentIcon;
export const BuildMethodIcon = ExecutionStylesIcon;
