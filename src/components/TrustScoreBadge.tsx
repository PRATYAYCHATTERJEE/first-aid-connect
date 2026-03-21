import { cn } from "@/lib/utils";

interface TrustScoreBadgeProps {
  score: number;
  showBar?: boolean;
  className?: string;
}

export function TrustScoreBadge({ score, showBar, className }: TrustScoreBadgeProps) {
  const color = score >= 90 ? "text-success" : score >= 70 ? "text-secondary" : "text-primary";
  const barColor = score >= 90 ? "bg-success" : score >= 70 ? "bg-secondary" : "bg-primary";

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <span className={cn("text-sm font-mono font-semibold", color)}>⭐ {score}</span>
      {showBar && (
        <div className="h-1.5 w-20 rounded-full bg-muted overflow-hidden">
          <div
            className={cn("h-full rounded-full transition-all duration-1000 ease-out", barColor)}
            style={{ width: `${score}%` }}
          />
        </div>
      )}
    </div>
  );
}
