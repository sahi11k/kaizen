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
  <div className="mt-4 hidden items-center justify-between px-4 pb-2 md:flex xl:mt-6 xl:px-6 xl:pb-4">
    <span className="heading-6">{title}</span>
    <div className="flex items-center gap-2">
      <TaskFilterControl
        selectedFilter={selectedFilter}
        onFilterChange={onFilterChange}
      />
      <Button icon={<Plus className="size-4" />} size="sm" onClick={onAddTask}>
        New
      </Button>
    </div>
  </div>
);

export default TaskListHeader;
