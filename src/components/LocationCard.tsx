import { Copy, Check } from "lucide-react";
import { useState } from "react";
import React from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface LocationCardProps {
  label: string;
  value: string;
  icon: React.ReactNode;
  copyable?: boolean;
  copyValue?: string; // Kopyalanacak değer (value'dan farklı olabilir)
  tooltip?: string; // Açıklayıcı tooltip
  accuracyValue?: number; // Doğruluk değeri (accuracy için renkli gösterim)
  isCoordinate?: boolean; // Koordinat için monospace font kullan
}

const LocationCard = ({ label, value, icon, copyable = false, copyValue, tooltip, accuracyValue, isCoordinate = false }: LocationCardProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!copyable) return;
    const textToCopy = copyValue || value;
    await navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Doğruluk rengini belirle
  const getAccuracyColor = (acc: number) => {
    if (acc <= 20) return 'border-green-500/30';
    if (acc <= 100) return 'border-yellow-500/30';
    return 'border-red-500/30';
  };

  return (
    <div 
      className={`glass-card rounded-xl p-3 transition-all duration-300 hover:scale-[1.01] ${copyable ? 'cursor-pointer active:scale-[0.98]' : ''} ${accuracyValue !== undefined ? getAccuracyColor(accuracyValue) : ''}`}
      onClick={handleCopy}
    >
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary/80">
          {React.isValidElement(icon) ? React.cloneElement(icon as React.ReactElement, { className: 'w-4 h-4' }) : icon}
        </div>
        <div className="flex-1 min-w-0">
          {tooltip ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="text-[10px] text-primary/80 uppercase tracking-wide mb-0.5 cursor-help font-medium">{label}</div>
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs text-sm">{tooltip}</p>
              </TooltipContent>
            </Tooltip>
          ) : (
            <p className="text-[10px] text-primary/80 uppercase tracking-wide mb-0.5 font-medium">{label}</p>
          )}
          <p className={`text-xs font-semibold text-foreground break-words leading-tight ${isCoordinate ? 'font-mono' : ''}`}>{value}</p>
          {accuracyValue !== undefined && (
            <div className="mt-1.5 h-1 bg-secondary/30 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-300 ${
                  accuracyValue <= 20 ? 'bg-green-500' : accuracyValue <= 100 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ width: `${Math.min(100, (1 - Math.min(accuracyValue / 200, 1)) * 100)}%` }}
              />
            </div>
          )}
        </div>
        {copyable && (
          <button 
            className="w-7 h-7 rounded-md bg-secondary/50 flex items-center justify-center transition-colors hover:bg-secondary/70 flex-shrink-0"
            onClick={(e) => {
              e.stopPropagation();
              handleCopy();
            }}
          >
            {copied ? (
              <Check className="w-3.5 h-3.5 text-primary" />
            ) : (
              <Copy className="w-3.5 h-3.5 text-muted-foreground" />
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default LocationCard;
