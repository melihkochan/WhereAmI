import { ReactNode } from "react";

interface ActionButtonProps {
  onClick: () => void;
  icon: ReactNode;
  label: string;
  variant?: "primary" | "secondary";
}

const ActionButton = ({ onClick, icon, label, variant = "secondary" }: ActionButtonProps) => {
  const baseStyles = "flex flex-col items-center gap-1.5 sm:gap-2 p-3 sm:p-4 rounded-xl sm:rounded-2xl transition-all duration-300 active:scale-95";
  
  const variants = {
    primary: "bg-primary text-primary-foreground glow-primary hover:bg-primary/90",
    secondary: "glass-card hover:bg-secondary/50"
  };

  return (
    <button className={`${baseStyles} ${variants[variant]}`} onClick={onClick}>
      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center bg-white/10">
        {icon}
      </div>
      <span className="text-[10px] sm:text-xs font-medium">{label}</span>
    </button>
  );
};

export default ActionButton;
