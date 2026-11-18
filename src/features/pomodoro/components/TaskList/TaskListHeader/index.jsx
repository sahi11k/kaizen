import React from "react";
import { Plus } from "lucide-react";

import { Button } from "@/shared/ui";

import TaskFilterControl from "../TaskFilterControl";

const TaskListHeader = ({
  title,
  selectedFilter,
  onFilterChange,
  onAddTask,
}) => (
  <div className="flex items-center justify-between px-4 pb-2 pt-3 md:pt-4 xl:px-6 xl:pt-6">
    <span className="heading-6">{title}</span>
    <div className="flex items-center gap-2">
      <TaskFilterControl
        selectedFilter={selectedFilter}
        onFilterChange={onFilterChange}
        className="!size-8 sm:!size-9 lg:!size-10"
      />
      <Button
        icon={<Plus className="size-4" />}
        size="sm"
        className="!h-8 sm:!h-9"
        onClick={onAddTask}
      >
        New
      </Button>
    </div>
  </div>
);

export default TaskListHeader;
