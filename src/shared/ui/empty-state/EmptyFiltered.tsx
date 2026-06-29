import { SlidersHorizontal } from "lucide-react";
import { EmptyState } from "./index";
import { cn } from "@/shared/lib/utils";

interface EmptyFilteredProps {
  onClear?: () => void;
  description?: string;
  className?: string;
}

const EmptyFiltered = ({
  onClear,
  description = "No items match your current filters.",
  className,
}: EmptyFilteredProps): React.ReactElement => {
  return (
    <EmptyState
      className={cn("w-full py-20", className)}
      icon={
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-muted text-muted-foreground">
          <SlidersHorizontal className="w-7 h-7" />
        </div>
      }
      title="No matches found"
      description={description}
      action={
        onClear && (
          <button
            type="button"
            onClick={onClear}
            className="mt-2 text-sm font-medium text-primary hover:underline"
          >
            Clear filters
          </button>
        )
      }
    />
  );
};

export { EmptyFiltered };
