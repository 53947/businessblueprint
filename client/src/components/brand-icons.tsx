// Brand Icons - Official brand assets
import coachBlueIcon from "@assets/Coach Blue as Blue_1762721690836.png";
import commverseIcon from "@assets/Commverse_1762731195351.png";
import digitalIQIcon from "@assets/Digital IQ_1762535930956.png";
import digitalAssessmentIcon from "@assets/digital-iq-assessment-icon.png";

interface BrandIconProps {
  className?: string;
  size?: number;
}

// 1. Digital IQ Icon - Official brand icon (lightbulb) - USE ONLY FOR SCORE/METRIC
export function DigitalIQIcon({ className = "", size = 64 }: BrandIconProps) {
  return (
    <img 
      src={digitalIQIcon} 
      alt="Digital IQ" 
      width={size} 
      height={size}
      className={className}
      style={{ objectFit: 'contain' }}
    />
  );
}

// 2. Digital IQ Assessment Icon - Official brand icon (lightbulb with document)
export function DigitalAssessmentIcon({ className = "", size = 64 }: BrandIconProps) {
  return (
    <img 
      src={digitalAssessmentIcon} 
      alt="Digital IQ Assessment" 
      width={size} 
      height={size}
      className={className}
      style={{ objectFit: 'contain' }}
    />
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
      {/* Blue outline border (transparent background) */}
      <rect x="2" y="2" width="60" height="60" rx="12" stroke="#0000FF" strokeWidth="4" fill="none" />
      
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
      {/* Blue outline border (transparent background) */}
      <rect x="2" y="2" width="60" height="60" rx="12" stroke="#0000FF" strokeWidth="4" fill="none" />
      
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
      {/* Blue outline border (transparent background) */}
      <rect x="2" y="2" width="60" height="60" rx="12" stroke="#0000FF" strokeWidth="4" fill="none" />
      
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

// 7. Commverse Bundle Icon - Official brand icon (diagonal slash)
export function CommverseIcon({ className = "", size = 64 }: BrandIconProps) {
  return (
    <img 
      src={commverseIcon} 
      alt="Commverse" 
      width={size} 
      height={size}
      className={className}
      style={{ objectFit: 'contain' }}
    />
  );
}

// 8. AI Coach Blue Icon - Official brand icon (coach figure)
export function CoachBlueIcon({ className = "", size = 64 }: BrandIconProps) {
  return (
    <img 
      src={coachBlueIcon} 
      alt="AI Coach Blue" 
      width={size} 
      height={size}
      className={className}
      style={{ objectFit: 'contain' }}
    />
  );
}
