// Brand Icons - TriadBlue System
// Style: Blue (#0000FF) head silhouette + Orange (#FF6B00) accent
// LOCKED - Do not modify without approval

interface BrandIconProps {
  className?: string;
  size?: number;
}

// 1. Digital IQ Icon
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
      {/* Head silhouette */}
      <path
        d="M32 4C20 4 10 14 10 26C10 32 12 37 15 41L15 52C15 54 16 56 18 57L20 58L22 59L24 60L28 61L32 62L36 61L40 60L42 59L44 58L46 57C48 56 49 54 49 52L49 41C52 37 54 32 54 26C54 14 44 4 32 4Z"
        fill="#0000FF"
      />
      {/* Brain gears (top) */}
      <circle cx="24" cy="18" r="4" fill="#FF6B00" opacity="0.3" />
      <circle cx="32" cy="16" r="5" fill="#FF6B00" opacity="0.3" />
      <circle cx="40" cy="18" r="4" fill="#FF6B00" opacity="0.3" />
      {/* IQ Text */}
      <text x="32" y="42" textAnchor="middle" fill="#FF6B00" fontSize="20" fontWeight="bold" fontFamily="Arial">IQ</text>
    </svg>
  );
}

// 2. Commverse Bundle Icon
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
      {/* Head silhouette */}
      <path
        d="M32 4C20 4 10 14 10 26C10 32 12 37 15 41L15 52C15 54 16 56 18 57L20 58L22 59L24 60L28 61L32 62L36 61L40 60L42 59L44 58L46 57C48 56 49 54 49 52L49 41C52 37 54 32 54 26C54 14 44 4 32 4Z"
        fill="#0000FF"
      />
      {/* 4 connected app nodes */}
      <rect x="20" y="18" width="8" height="8" rx="2" fill="#FF6B00" />
      <rect x="36" y="18" width="8" height="8" rx="2" fill="#FF6B00" />
      <rect x="20" y="32" width="8" height="8" rx="2" fill="#FF6B00" />
      <rect x="36" y="32" width="8" height="8" rx="2" fill="#FF6B00" />
      {/* Connection lines */}
      <line x1="28" y1="22" x2="36" y2="22" stroke="#FF6B00" strokeWidth="2" />
      <line x1="24" y1="26" x2="24" y2="32" stroke="#FF6B00" strokeWidth="2" />
      <line x1="40" y1="26" x2="40" y2="32" stroke="#FF6B00" strokeWidth="2" />
      <line x1="28" y1="36" x2="36" y2="36" stroke="#FF6B00" strokeWidth="2" />
    </svg>
  );
}

// 3. AI Coach Blue Icon
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
      {/* Head silhouette */}
      <path
        d="M32 4C20 4 10 14 10 26C10 32 12 37 15 41L15 52C15 54 16 56 18 57L20 58L22 59L24 60L28 61L32 62L36 61L40 60L42 59L44 58L46 57C48 56 49 54 49 52L49 41C52 37 54 32 54 26C54 14 44 4 32 4Z"
        fill="#0000FF"
      />
      {/* Compass/guidance symbol */}
      <circle cx="32" cy="28" r="12" stroke="#FF6B00" strokeWidth="2" fill="none" />
      <path d="M32 16 L32 22" stroke="#FF6B00" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M32 34 L32 40" stroke="#FF6B00" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M44 28 L38 28" stroke="#FF6B00" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M26 28 L20 28" stroke="#FF6B00" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

// 4. Base Plan Icon
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
      {/* Head silhouette */}
      <path
        d="M32 4C20 4 10 14 10 26C10 32 12 37 15 41L15 52C15 54 16 56 18 57L20 58L22 59L24 60L28 61L32 62L36 61L40 60L42 59L44 58L46 57C48 56 49 54 49 52L49 41C52 37 54 32 54 26C54 14 44 4 32 4Z"
        fill="#0000FF"
      />
      {/* Stacked layers/tiers */}
      <rect x="18" y="34" width="28" height="6" rx="1" fill="#FF6B00" />
      <rect x="20" y="26" width="24" height="6" rx="1" fill="#FF6B00" />
      <rect x="22" y="18" width="20" height="6" rx="1" fill="#FF6B00" />
    </svg>
  );
}

// 5. 30-Day Action Plan Icon
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
      {/* Head silhouette */}
      <path
        d="M32 4C20 4 10 14 10 26C10 32 12 37 15 41L15 52C15 54 16 56 18 57L20 58L22 59L24 60L28 61L32 62L36 61L40 60L42 59L44 58L46 57C48 56 49 54 49 52L49 41C52 37 54 32 54 26C54 14 44 4 32 4Z"
        fill="#0000FF"
      />
      {/* Calendar grid */}
      <rect x="20" y="18" width="24" height="20" rx="2" stroke="#FF6B00" strokeWidth="2" fill="none" />
      {/* Header bar */}
      <rect x="20" y="18" width="24" height="4" fill="#FF6B00" />
      {/* Check marks */}
      <path d="M24 26 L26 28 L28 24" stroke="#FF6B00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M32 26 L34 28 L36 24" stroke="#FF6B00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M24 32 L26 34 L28 30" stroke="#FF6B00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

// 6. Build Method Icon
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
      {/* Head silhouette */}
      <path
        d="M32 4C20 4 10 14 10 26C10 32 12 37 15 41L15 52C15 54 16 56 18 57L20 58L22 59L24 60L28 61L32 62L36 61L40 60L42 59L44 58L46 57C48 56 49 54 49 52L49 41C52 37 54 32 54 26C54 14 44 4 32 4Z"
        fill="#0000FF"
      />
      {/* Wrench + Hammer crossed */}
      <rect x="24" y="16" width="3" height="20" rx="1.5" fill="#FF6B00" transform="rotate(45 32 28)" />
      <circle cx="26" cy="20" r="4" stroke="#FF6B00" strokeWidth="2" fill="none" />
      <rect x="37" y="16" width="3" height="20" rx="1.5" fill="#FF6B00" transform="rotate(-45 32 28)" />
      <rect x="36" y="18" width="6" height="4" fill="#FF6B00" transform="rotate(-45 32 28)" />
    </svg>
  );
}
