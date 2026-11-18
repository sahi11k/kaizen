import { FilterX } from "lucide-react";
import { EmptyState } from "./index";
import { EmptyStateAction } from "./EmptyStateAction";

interface EmptyFilteredProps {
  onClear?: () => void;
  description?: string;
}

const EmptyFiltered = ({
  onClear,
  description = "No items match your current filters.",
}: EmptyFilteredProps): React.ReactElement => {
  return (
    <EmptyState
      className="flex-1 flex items-center justify-center"
      title="No matches found"
      description={description}
      action={
        onClear && (
          <EmptyStateAction onClick={onClear} className="gap-1.5">
            <FilterX className="size-4" />
            Clear filters
          </EmptyStateAction>
        )
      }
    />
  );
};

export { EmptyFiltered };
