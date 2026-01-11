import { MapPin } from "lucide-react";

interface LocationPinProps {
  isLocating?: boolean;
}

const LocationPin = ({ isLocating = false }: LocationPinProps) => {
  return (
    <div className="relative flex items-center justify-center">
      {/* Outer glow rings */}
      <div className="absolute w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-primary/10 animate-ping" style={{ animationDuration: '2s' }} />
      <div className="absolute w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-primary/20 animate-ping" style={{ animationDuration: '1.5s', animationDelay: '0.3s' }} />
      
      {/* Main pin container */}
      <div className={`relative z-10 ${isLocating ? 'animate-float' : ''}`}>
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center glow-primary animate-pulse-glow">
          <MapPin className="w-8 h-8 sm:w-10 sm:h-10 text-primary-foreground" strokeWidth={2.5} />
        </div>
        
        {/* Pin shadow */}
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-10 h-2.5 sm:w-12 sm:h-3 bg-primary/30 rounded-full blur-md" />
      </div>
    </div>
  );
};

export default LocationPin;
