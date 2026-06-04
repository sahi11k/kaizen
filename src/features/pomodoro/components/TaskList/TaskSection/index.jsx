import React from "react";
import { FolderOpen } from "lucide-react";

import { EmptyState } from "@/shared/ui";

import TaskItem from "../ListItem";
import SortableContainer from "../SortableContainer";
import { TASK_LIST_CLASSES } from "../constants";

const TaskSectionEmptyState = ({ title, description }) => (
  <EmptyState
    icon={<FolderOpen className="size-8" />}
    title={title}
    description={description}
    className="min-h-full px-4 py-10"
  />
);

const TaskSection = ({
  tasks,
  emptyState,
  sortable = false,
  currentTask,
  onDragEnd,
  onTaskClick,
  onTaskEdit,
  onTaskRemove,
  onTaskComplete,
}) => {
  if (tasks.length === 0 && emptyState) {
    return <TaskSectionEmptyState {...emptyState} />;
  }

  const renderTaskItem = (task, { isSortable = true } = {}) => (
    <TaskItem
      key={task.id}
      task={task}
      isActive={currentTask?.id === task.id}
      isSortable={isSortable}
      onEdit={(event) => {
        event.stopPropagation();
        onTaskEdit(task);
      }}
      onRemove={(event) => {
        event.stopPropagation();
        onTaskRemove(task);
      }}
      onComplete={(event) => {
        event.stopPropagation();
        onTaskComplete(task.id);
      }}
      onClick={(event) => {
        event.stopPropagation();
        onTaskClick(task);
      }}
    />
  );

  return (
    <ul className={TASK_LIST_CLASSES.list} role="listbox">
      {sortable ? (
        <SortableContainer
          tasks={tasks}
          onDragEnd={onDragEnd}
          currentTask={currentTask}
        >
          {tasks.map((task) => renderTaskItem(task, { isSortable: true }))}
        </SortableContainer>
      ) : (
        tasks.map((task) => renderTaskItem(task, { isSortable: false }))
      )}
    </ul>
  );
};

export default TaskSection;
