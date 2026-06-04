import React from "react";
import { Filter } from "lucide-react";

import { cn } from "@/shared/lib/utils";
import { Select, Tooltip } from "@/shared/ui";

import { TASK_FILTER_LABELS, TASK_FILTERS } from "../constants";

const FILTER_OPTIONS = [
  TASK_FILTERS.ALL,
  TASK_FILTERS.PENDING,
  TASK_FILTERS.COMPLETED,
].map((filter) => ({
  value: filter,
  label: TASK_FILTER_LABELS[filter],
}));

const TaskFilterControl = ({ selectedFilter, onFilterChange, className }) => {
  const isFilterApplied = selectedFilter !== TASK_FILTERS.ALL;
  const tooltip = isFilterApplied
    ? `Filtered: ${TASK_FILTER_LABELS[selectedFilter]}`
    : "Filter tasks";

  return (
    <Tooltip content={tooltip}>
      <Select
        value={selectedFilter}
        options={FILTER_OPTIONS}
        onChange={onFilterChange}
        triggerContent={
          <Filter className={cn("size-4", isFilterApplied && "fill-current")} />
        }
        showChevron={false}
        aria-label={tooltip}
        aria-pressed={isFilterApplied}
        contentSide="bottom"
        contentAlign="end"
        className={cn(
          "!h-10 !w-10 !cursor-pointer !justify-center !rounded-xl !px-0 bg-transparent focus-visible:!border-border focus-visible:!ring-0",
          isFilterApplied
            ? "border border-transparent bg-sidebar-active text-sidebar-active-foreground hover:bg-sidebar-active hover:text-sidebar-active-foreground"
            : "border border-border",
          className,
        )}
        contentClassName="min-w-40"
      />
    </Tooltip>
  );
};

export default TaskFilterControl;
