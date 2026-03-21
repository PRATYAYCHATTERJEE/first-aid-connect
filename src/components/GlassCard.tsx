import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  glow?: boolean;
}

export function GlassCard({ children, className, glow }: GlassCardProps) {
  return (
    <div
      className={cn(
        "glass rounded-lg p-4",
        glow && "animate-glow-red",
        className
      )}
    >
      {children}
    </div>
  );
}
