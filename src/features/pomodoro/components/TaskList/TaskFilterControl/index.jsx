import React from "react";
import { Filter } from "lucide-react";

import { cn } from "@/shared/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
  Tooltip,
} from "@/shared/ui";

import { TASK_FILTER_LABELS, TASK_FILTERS } from "../constants";

const FILTER_OPTIONS = [
  TASK_FILTERS.ALL,
  TASK_FILTERS.PENDING,
  TASK_FILTERS.COMPLETED,
];

const TaskFilterControl = ({ selectedFilter, onFilterChange, className }) => {
  const isFilterApplied = selectedFilter !== TASK_FILTERS.ALL;
  const tooltip = isFilterApplied ? `Filter: ${TASK_FILTER_LABELS[selectedFilter]}` : null;

  return (
    <DropdownMenu>
      <Tooltip content={tooltip}>
        <DropdownMenuTrigger
          aria-label={tooltip}
          className={cn(
            "flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border transition-colors outline-none",
            isFilterApplied
              ? "border-transparent bg-sidebar-active text-sidebar-active-foreground hover:bg-sidebar-active hover:text-sidebar-active-foreground"
              : "border-border bg-transparent",
            className,
          )}
        >
          <Filter className={cn("size-4", isFilterApplied && "fill-current")} />
        </DropdownMenuTrigger>
      </Tooltip>
      <DropdownMenuContent align="end" className="min-w-40">
        <DropdownMenuRadioGroup
          value={selectedFilter}
          onValueChange={onFilterChange}
        >
          {FILTER_OPTIONS.map((filter) => (
            <DropdownMenuRadioItem key={filter} value={filter}>
              {TASK_FILTER_LABELS[filter]}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TaskFilterControl;
