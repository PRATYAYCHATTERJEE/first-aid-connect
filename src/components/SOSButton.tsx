import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

interface SOSButtonProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function SOSButton({ size = "md", className }: SOSButtonProps) {
  const navigate = useNavigate();
  const sizeClasses = {
    sm: "w-12 h-12 text-xs",
    md: "w-20 h-20 text-sm",
    lg: "w-32 h-32 text-lg",
  };

  return (
    <button
      onClick={() => navigate("/sos")}
      className={cn(
        "sos-pulse rounded-full bg-primary font-display font-bold text-primary-foreground",
        "transition-transform duration-150 active:scale-95",
        "flex items-center justify-center",
        "hover:brightness-110",
        sizeClasses[size],
        className
      )}
    >
      🚨 SOS
    </button>
  );
}
