import { Wrench, Headphones, ShoppingCart, Ship, Mail } from "lucide-react";
import aiCoachIcon from "@assets/images_logos/coachblue48.png";

interface PathwayIconProps {
  className?: string;
}

export function DIYIcon({ className = "w-16 h-16" }: PathwayIconProps) {
  return (
    <div className={className} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Wrench style={{ width: '90%', height: '90%', color: '#FFA500' }} />
    </div>
  );
}

export function MSPIcon({ className = "w-16 h-16" }: PathwayIconProps) {
  return (
    <div className={className} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Headphones style={{ width: '90%', height: '90%', color: '#1844A6' }} />
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
      <ShoppingCart style={{ width: '90%', height: '90%', color: '#00FF40' }} />
    </div>
  );
}

export function CaptainIcon({ className = "w-16 h-16" }: PathwayIconProps) {
  return (
    <div className={className} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Ship style={{ width: '90%', height: '90%', color: '#F97316' }} />
    </div>
  );
}

export function SendIcon({ className = "w-16 h-16" }: PathwayIconProps) {
  return (
    <div className={className} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Mail style={{ width: '90%', height: '90%', color: '#1844A6' }} />
    </div>
  );
}
