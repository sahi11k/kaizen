import React from "react";

import TaskItem from "../ListItem";
import SortableContainer from "../SortableContainer";
import { TASK_LIST_CLASSES } from "../constants";

const TaskSection = ({
  tasks,
  sortable = false,
  currentTask,
  onDragEnd,
  onTaskClick,
  onTaskEdit,
  onTaskRemove,
  onTaskComplete,
}) => {

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
