import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: "Pending" | "Responding" | "Resolved" | "Available" | "Busy";
  className?: string;
}

const statusStyles = {
  Pending: "bg-primary/20 text-primary",
  Responding: "bg-secondary/20 text-secondary",
  Resolved: "bg-success/20 text-success",
  Available: "bg-success/20 text-success",
  Busy: "bg-muted text-muted-foreground",
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium",
        statusStyles[status],
        status === "Pending" && "animate-pulse",
        className
      )}
    >
      <span className={cn(
        "h-1.5 w-1.5 rounded-full",
        status === "Pending" && "bg-primary",
        status === "Responding" && "bg-secondary",
        status === "Resolved" && "bg-success",
        status === "Available" && "bg-success",
        status === "Busy" && "bg-muted-foreground",
      )} />
      {status}
    </span>
  );
}
