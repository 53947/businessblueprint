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
      {/* Cap visor */}
      <ellipse cx="50" cy="45" rx="35" ry="8" fill="#0080FF" />
      {/* Cap top */}
      <path
        d="M50 25 Q65 30 65 45 L35 45 Q35 30 50 25 Z"
        fill="#0080FF"
      />
      {/* AI letters on cap - vector paths instead of text */}
      {/* Letter A */}
      <path
        d="M42 42 L45 32 L48 42 M43 38 L47 38"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Letter I */}
      <path
        d="M54 32 L54 42"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* Head */}
      <circle cx="50" cy="60" r="18" fill="none" stroke="#0080FF" strokeWidth="3" />
      {/* Shoulders */}
      <path
        d="M32 78 Q32 68 40 68 L60 68 Q68 68 68 78"
        fill="none"
        stroke="#0080FF"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function CaptainIcon({ className = "w-16 h-16" }: PathwayIconProps) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Captain's wheel */}
      <circle cx="50" cy="50" r="30" fill="none" stroke="#0080FF" strokeWidth="3" />
      <circle cx="50" cy="50" r="8" fill="#0080FF" />
      {/* Spokes */}
      <line x1="50" y1="20" x2="50" y2="35" stroke="#0080FF" strokeWidth="3" />
      <line x1="50" y1="65" x2="50" y2="80" stroke="#0080FF" strokeWidth="3" />
      <line x1="20" y1="50" x2="35" y2="50" stroke="#0080FF" strokeWidth="3" />
      <line x1="65" y1="50" x2="80" y2="50" stroke="#0080FF" strokeWidth="3" />
      <line x1="29.3" y1="29.3" x2="40.5" y2="40.5" stroke="#0080FF" strokeWidth="3" />
      <line x1="59.5" y1="59.5" x2="70.7" y2="70.7" stroke="#0080FF" strokeWidth="3" />
      <line x1="70.7" y1="29.3" x2="59.5" y2="40.5" stroke="#0080FF" strokeWidth="3" />
      <line x1="40.5" y1="59.5" x2="29.3" y2="70.7" stroke="#0080FF" strokeWidth="3" />
    </svg>
  );
}
