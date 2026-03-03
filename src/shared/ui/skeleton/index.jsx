import { cn } from "@/shared/lib/utils";

function Skeleton({ className, ...props }) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-accent animate-pulse rounded-lg", className)}
      {...props}
    />
  );
}

export { Skeleton };
