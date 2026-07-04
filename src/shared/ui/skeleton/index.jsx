import { cn } from "@/shared/lib/utils";

function Skeleton({ className, ...props }) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-muted rounded-lg animate-shimmer", className)}
      {...props}
    />
  );
}

export { Skeleton };
