import diyIcon from "@assets/app-icons/diy.png";
import mspIcon from "@assets/app-icons/managed-services.png";
import aiCoachIcon from "@assets/new logos and wordmarks/coachblue256.png";
import alcIcon from "@assets/app-icons/a-la-carte.png";
import captainingIcon from "@assets/app-icons/captaining.png";
import sendIcon from "@assets/app-icons/send-icon.png";

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

export function ALCIcon({ className = "w-16 h-16" }: PathwayIconProps) {
  return (
    <div className={className} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <img 
        src={alcIcon} 
        alt="À La Carte (ALC)" 
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

export function SendIcon({ className = "w-16 h-16" }: PathwayIconProps) {
  return (
    <div className={className} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <img 
        src={sendIcon} 
        alt="/ promote - Email + SMS Marketing" 
        style={{ objectFit: 'contain', maxWidth: '90%', maxHeight: '90%' }}
      />
    </div>
  );
}
