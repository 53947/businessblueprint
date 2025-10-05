import diyIcon from "@assets/do it yourself icon_1759648904285.png";
import mspIcon from "@assets/managed services icon_1759648904285.png";
import aiCoachIcon from "@assets/ai business coach icon_1759648904283.png";
import captainingIcon from "@assets/Captaining Icon_1759648904285.png";

interface PathwayIconProps {
  className?: string;
}

export function DIYIcon({ className = "w-16 h-16" }: PathwayIconProps) {
  return (
    <div className={className} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <img 
        src={diyIcon} 
        alt="Do It Yourself (DIY)" 
        style={{ objectFit: 'contain', maxWidth: '90%', maxHeight: '90%' }}
      />
    </div>
  );
}

export function MSPIcon({ className = "w-16 h-16" }: PathwayIconProps) {
  return (
    <div className={className} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <img 
        src={mspIcon} 
        alt="Managed Services Provided (MSP)" 
        style={{ objectFit: 'contain', maxWidth: '90%', maxHeight: '90%' }}
      />
    </div>
  );
}

export function AICoachIcon({ className = "w-16 h-16" }: PathwayIconProps) {
  return (
    <div className={className} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <img 
        src={aiCoachIcon} 
        alt="AI Business Coach" 
        style={{ objectFit: 'contain', maxWidth: '90%', maxHeight: '90%' }}
      />
    </div>
  );
}

export function CaptainIcon({ className = "w-16 h-16" }: PathwayIconProps) {
  return (
    <div className={className} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <img 
        src={captainingIcon} 
        alt="Captaining Your Journey" 
        style={{ objectFit: 'contain', maxWidth: '90%', maxHeight: '90%' }}
      />
    </div>
  );
}
