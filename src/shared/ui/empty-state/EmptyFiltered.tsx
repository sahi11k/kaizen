import { EmptyState } from "./index";
import { EmptyStateAction } from "./EmptyStateAction";
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
      className="flex-1 flex items-center justify-center"
      title="No matches found"
      description={description}
      action={
        onClear && (
          <EmptyStateAction onClick={onClear}>Clear filters</EmptyStateAction>
        )
      }
    />
  );
};

export { EmptyFiltered };
