import { alertTypeEmoji, alertTypeColors, type AlertType, type AlertStatus } from "@/lib/mock-data";
import { StatusBadge } from "./StatusBadge";
import { GlassCard } from "./GlassCard";
import { cn } from "@/lib/utils";

interface AlertCardProps {
  type: AlertType;
  distance: string;
  time: string;
  status: AlertStatus;
  responders: number;
  description?: string;
  className?: string;
  onRespond?: () => void;
}

export function AlertCard({ type, distance, time, status, responders, description, className, onRespond }: AlertCardProps) {
  return (
    <GlassCard className={cn("space-y-3", className)} glow={status === "Pending"}>
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl">{alertTypeEmoji[type]}</span>
          <span
            className="rounded-md px-2 py-0.5 text-xs font-semibold"
            style={{ background: `${alertTypeColors[type]}20`, color: alertTypeColors[type] }}
          >
            {type}
          </span>
        </div>
        <StatusBadge status={status} />
      </div>
      {description && <p className="text-sm text-muted-foreground">{description}</p>}
      <div className="flex items-center gap-4 text-xs text-muted-foreground font-mono">
        <span>📍 {distance}</span>
        <span>🕐 {time}</span>
        <span>👥 {responders} responding</span>
      </div>
      {status === "Pending" && (
        <div className="flex gap-2 pt-1">
          <button
            onClick={onRespond}
            className="rounded-md bg-success/20 px-3 py-1.5 text-xs font-semibold text-success transition-colors hover:bg-success/30 active:scale-95"
          >
            Respond
          </button>
          <button className="rounded-md bg-info/20 px-3 py-1.5 text-xs font-semibold text-info transition-colors hover:bg-info/30 active:scale-95">
            View on Map
          </button>
        </div>
      )}
    </GlassCard>
  );
}
