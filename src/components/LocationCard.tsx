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
}

const LocationCard = ({ label, value, icon, copyable = false, copyValue, tooltip }: LocationCardProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!copyable) return;
    const textToCopy = copyValue || value;
    await navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div 
      className={`glass-card rounded-xl p-3 transition-all duration-300 hover:scale-[1.01] ${copyable ? 'cursor-pointer active:scale-[0.98]' : ''}`}
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
                <div className="text-[10px] text-muted-foreground uppercase tracking-wide mb-0.5 cursor-help">{label}</div>
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs text-sm">{tooltip}</p>
              </TooltipContent>
            </Tooltip>
          ) : (
            <p className="text-[10px] text-muted-foreground uppercase tracking-wide mb-0.5">{label}</p>
          )}
          <p className="text-xs font-semibold text-foreground break-words leading-tight">{value}</p>
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
