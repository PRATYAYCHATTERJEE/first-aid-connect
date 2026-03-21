import { GlassCard } from "./GlassCard";
import { StatusBadge } from "./StatusBadge";
import { TrustScoreBadge } from "./TrustScoreBadge";
import type { ResponderType } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

interface ResponderCardProps {
  name: string;
  type: ResponderType;
  distance: string;
  trust: number;
  status: "Available" | "Busy";
  skills: string[];
  className?: string;
}

const typeColors = {
  Volunteer: "bg-success/20 text-success",
  Medical: "bg-info/20 text-info",
  Authority: "bg-secondary/20 text-secondary",
};

function getInitials(name: string) {
  return name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();
}

const avatarBg = {
  Volunteer: "bg-success/30 text-success",
  Medical: "bg-info/30 text-info",
  Authority: "bg-secondary/30 text-secondary",
};

export function ResponderCard({ name, type, distance, trust, status, skills, className }: ResponderCardProps) {
  return (
    <GlassCard className={cn("space-y-3", className)}>
      <div className="flex items-center gap-3">
        <div className={cn("flex h-10 w-10 items-center justify-center rounded-full font-display font-bold text-sm", avatarBg[type])}>
          {getInitials(name)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-sm truncate">{name}</span>
            <StatusBadge status={status} />
          </div>
          <div className="flex items-center gap-2 mt-0.5">
            <span className={cn("rounded px-1.5 py-0.5 text-[10px] font-medium", typeColors[type])}>{type}</span>
            <span className="text-xs text-muted-foreground font-mono">📍 {distance}</span>
          </div>
        </div>
      </div>
      <TrustScoreBadge score={trust} showBar />
      <div className="flex flex-wrap gap-1.5">
        {skills.map(s => (
          <span key={s} className="rounded-full bg-muted px-2 py-0.5 text-[10px] text-muted-foreground">{s}</span>
        ))}
      </div>
      <button className="w-full rounded-md bg-primary/20 py-2 text-xs font-semibold text-primary transition-colors hover:bg-primary/30 active:scale-[0.98]">
        Alert This Responder
      </button>
    </GlassCard>
  );
}
