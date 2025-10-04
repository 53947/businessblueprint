interface PathwayIconProps {
  className?: string;
}

export function DIYIcon({ className = "w-16 h-16" }: PathwayIconProps) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Gear outline */}
      <path
        d="M50 20 L55 18 L58 20 L60 18 L63 20 L68 22 L70 25 L72 28 L75 30 L78 35 L80 40 L80 45 L82 50 L80 55 L80 60 L78 65 L75 70 L72 72 L70 75 L68 78 L63 80 L60 82 L58 80 L55 82 L50 80 L45 82 L42 80 L40 82 L37 80 L32 78 L30 75 L28 72 L25 70 L22 65 L20 60 L20 55 L18 50 L20 45 L20 40 L22 35 L25 30 L28 28 L30 25 L32 22 L37 20 L40 18 L42 20 L45 18 Z"
        stroke="#0080FF"
        strokeWidth="3"
        fill="none"
        strokeLinejoin="round"
      />
      {/* Wrench */}
      <path
        d="M35 35 L40 30 L45 35 L42 38 L48 44 L55 37 L58 40 L51 47 L45 41 L39 47 L35 43 Z"
        fill="#0080FF"
        stroke="#0080FF"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Pencil */}
      <path
        d="M55 50 L65 40 L68 43 L58 53 L55 50 Z M65 40 L67 38 L70 41 L68 43 Z M55 50 L52 57 L58 53 Z"
        fill="#660099"
        stroke="#660099"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function MSPIcon({ className = "w-16 h-16" }: PathwayIconProps) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Gear outline */}
      <path
        d="M50 20 L55 18 L58 20 L60 18 L63 20 L68 22 L70 25 L72 28 L75 30 L78 35 L80 40 L80 45 L82 50 L80 55 L80 60 L78 65 L75 70 L72 72 L70 75 L68 78 L63 80 L60 82 L58 80 L55 82 L50 80 L45 82 L42 80 L40 82 L37 80 L32 78 L30 75 L28 72 L25 70 L22 65 L20 60 L20 55 L18 50 L20 45 L20 40 L22 35 L25 30 L28 28 L30 25 L32 22 L37 20 L40 18 L42 20 L45 18 Z"
        stroke="#FF6B35"
        strokeWidth="3"
        fill="none"
        strokeLinejoin="round"
      />
      {/* Person - head */}
      <circle cx="50" cy="42" r="8" fill="#FF6B35" />
      {/* Person - body */}
      <path
        d="M50 50 L50 62 M50 55 L42 60 M50 55 L58 60"
        stroke="#FF6B35"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function AICoachIcon({ className = "w-16 h-16" }: PathwayIconProps) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Baseball cap */}
      <path
        d="M25 45 Q25 25 50 25 Q75 25 75 45 L25 45 Z"
        fill="#0080FF"
      />
      {/* Cap visor */}
      <ellipse cx="50" cy="45" rx="28" ry="6" fill="#0080FF" />
      
      {/* AI letters on cap */}
      {/* Letter A */}
      <path
        d="M42 40 L45 30 L48 40 M43 36 L47 36"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Letter I */}
      <path
        d="M54 30 L54 40"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      
      {/* Left headphone */}
      <path
        d="M22 55 Q22 50 25 50 Q28 50 28 55 L28 65 Q28 68 25 68 Q22 68 22 65 Z"
        fill="#0080FF"
      />
      
      {/* Right headphone */}
      <path
        d="M72 55 Q72 50 75 50 Q78 50 78 55 L78 65 Q78 68 75 68 Q72 68 72 65 Z"
        fill="#0080FF"
      />
      
      {/* Face outline */}
      <path
        d="M28 55 Q28 48 35 48 L65 48 Q72 48 72 55 L72 70 Q72 80 50 80 Q28 80 28 70 Z"
        stroke="#0080FF"
        strokeWidth="4"
        fill="none"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CaptainIcon({ className = "w-16 h-16" }: PathwayIconProps) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Outer wheel rim */}
      <circle cx="50" cy="50" r="35" fill="none" stroke="#0080FF" strokeWidth="5" />
      
      {/* Inner hub with better visibility */}
      <circle cx="50" cy="50" r="12" fill="#0080FF" stroke="#0080FF" strokeWidth="2" />
      
      {/* 8 prominent wheel spokes with handles */}
      {/* Vertical spokes */}
      <path d="M50 15 L50 38 L45 38 L50 43 L55 38 L50 38 Z" fill="#0080FF" />
      <path d="M50 85 L50 62 L45 62 L50 57 L55 62 L50 62 Z" fill="#0080FF" />
      
      {/* Horizontal spokes */}
      <path d="M15 50 L38 50 L38 45 L43 50 L38 55 L38 50 Z" fill="#0080FF" />
      <path d="M85 50 L62 50 L62 45 L57 50 L62 55 L62 50 Z" fill="#0080FF" />
      
      {/* Diagonal spokes */}
      <path d="M25.8 25.8 L40 40" stroke="#0080FF" strokeWidth="5" strokeLinecap="round" />
      <circle cx="25.8" cy="25.8" r="4" fill="#0080FF" />
      
      <path d="M74.2 74.2 L60 60" stroke="#0080FF" strokeWidth="5" strokeLinecap="round" />
      <circle cx="74.2" cy="74.2" r="4" fill="#0080FF" />
      
      <path d="M74.2 25.8 L60 40" stroke="#0080FF" strokeWidth="5" strokeLinecap="round" />
      <circle cx="74.2" cy="25.8" r="4" fill="#0080FF" />
      
      <path d="M25.8 74.2 L40 60" stroke="#0080FF" strokeWidth="5" strokeLinecap="round" />
      <circle cx="25.8" cy="74.2" r="4" fill="#0080FF" />
    </svg>
  );
}
