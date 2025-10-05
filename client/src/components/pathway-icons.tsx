import diyIcon from "@assets/do it yourself icon_1759648904285.png";
import mspIcon from "@assets/managed services icon_1759648904285.png";
import aiCoachIcon from "@assets/ai business coach icon_1759648904283.png";
import captainingIcon from "@assets/Captaining Icon_1759648904285.png";

interface PathwayIconProps {
  className?: string;
}

export function DIYIcon({ className = "w-16 h-16" }: PathwayIconProps) {
  return (
    <img 
      src={diyIcon} 
      alt="Do It Yourself (DIY)" 
      className={className}
      style={{ objectFit: 'contain', width: '90%', height: '90%' }}
    />
  );
}

export function MSPIcon({ className = "w-16 h-16" }: PathwayIconProps) {
  return (
    <img 
      src={mspIcon} 
      alt="Managed Services Provided (MSP)" 
      className={className}
      style={{ objectFit: 'contain', width: '90%', height: '90%' }}
    />
  );
}

export function AICoachIcon({ className = "w-16 h-16" }: PathwayIconProps) {
  return (
    <img 
      src={aiCoachIcon} 
      alt="AI Business Coach" 
      className={className}
      style={{ objectFit: 'contain', width: '90%', height: '90%' }}
    />
  );
}

export function CaptainIcon({ className = "w-16 h-16" }: PathwayIconProps) {
  return (
    <img 
      src={captainingIcon} 
      alt="Captaining Your Journey" 
      className={className}
      style={{ objectFit: 'contain', width: '90%', height: '90%' }}
    />
  );
}
