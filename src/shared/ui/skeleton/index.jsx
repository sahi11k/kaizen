import { cn } from "@/shared/lib/utils";
import "./skeleton.css";

function Skeleton({ className, ...props }) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-card rounded-lg animate-shimmer", className)}
      {...props}
    />
  );
}

export { Skeleton };
