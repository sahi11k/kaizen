import React, { useCallback, useMemo, useState } from "react";
import { Plus } from "lucide-react";

import TaskForm from "@/features/pomodoro/components/TaskForm";
import TimerWarningDialog from "@/features/pomodoro/components/TimerWarningDialog";
import useTaskList from "@/features/pomodoro/hooks/useTaskList";
import { EmptyState, EmptyStateAction, FloatingButton } from "@/shared/ui";

import TaskDeleteDialog from "./TaskDeleteDialog";
import TaskFilterControl from "./TaskFilterControl";
import TaskListHeader from "./TaskListHeader";
import TaskListSkeleton from "./TaskListSkeleton";
import TaskSection from "./TaskSection";
import {
  DEFAULT_TASK_FILTER,
  TASK_FILTERS,
  TASK_LIST_EMPTY_STATES,
} from "./constants";
import { getFilteredTasks } from "./utils";

const TaskList = ({ onItemClick, showHeader, headerTitle = "Tasks" }) => {
  const [selectedFilter, setSelectedFilter] = useState(DEFAULT_TASK_FILTER);
  const {
    isLoading,
    isEmpty,
    tasks,
    currentTask,
    showModal,
    setShowModal,
    formValues,
    setFormValues,
    mode,
    formSubmitHandler,
    handleCancel,
    taskRemoveHandler,
    taskCompleteHandler,
    taskEditHandler,
    taskDragHandler,
    handleTaskClick,
    pendingTask,
    confirmTaskSwitch,
    cancelTaskSwitch,
    taskToDelete,
    confirmTaskDelete,
    cancelTaskDelete,
    isDeletingTask,
  } = useTaskList({ onItemClick });

  const filteredTasks = useMemo(
    () => getFilteredTasks(tasks, selectedFilter),
    [selectedFilter, tasks],
  );

  const isPendingFilter = selectedFilter === TASK_FILTERS.PENDING;

  const openTaskForm = useCallback(() => {
    setShowModal(true);
  }, [setShowModal]);

  return (
    <>
      {showHeader && (
        <TaskListHeader
          title={headerTitle}
          selectedFilter={selectedFilter}
          onFilterChange={setSelectedFilter}
          onAddTask={openTaskForm}
        />
      )}

      <div className="h-full min-h-0">
        {isLoading && isEmpty && <TaskListSkeleton />}

        {isEmpty && !isLoading && (
          <EmptyState
            title="No tasks"
            description="Add something you want to get done."
            action={
              <EmptyStateAction onClick={openTaskForm}>
                Add Task
              </EmptyStateAction>
            }
            className="flex items-center justify-center"
          />
        )}

        {!isEmpty && (
          <div className="flex justify-end px-3 pb-2 pt-2 md:hidden">
            <TaskFilterControl
              selectedFilter={selectedFilter}
              onFilterChange={setSelectedFilter}
            />
          </div>
        )}

        {!isEmpty &&
          filteredTasks.length === 0 &&
          !isLoading &&
          TASK_LIST_EMPTY_STATES[selectedFilter] && (
            <EmptyState
              title={TASK_LIST_EMPTY_STATES[selectedFilter].title}
              description={TASK_LIST_EMPTY_STATES[selectedFilter].description}
              className="flex items-center justify-center"
            />
          )}

        {!isEmpty && filteredTasks.length > 0 && (
          <div className="h-full min-h-0 overflow-y-auto">
            <TaskSection
              tasks={filteredTasks}
              sortable={isPendingFilter}
              currentTask={currentTask}
              onDragEnd={taskDragHandler}
              onTaskClick={handleTaskClick}
              onTaskEdit={taskEditHandler}
              onTaskRemove={taskRemoveHandler}
              onTaskComplete={taskCompleteHandler}
            />
          </div>
        )}
      </div>

      <FloatingButton
        onClick={openTaskForm}
        className="md:hidden"
        icon={<Plus className="size-4" />}
        label="New"
      />

      <TaskForm
        setFormValues={setFormValues}
        formValues={formValues}
        showModal={showModal}
        setShowModal={setShowModal}
        onSave={formSubmitHandler}
        onCancel={handleCancel}
        mode={mode}
      />

      <TimerWarningDialog
        open={!!pendingTask}
        onConfirm={confirmTaskSwitch}
        onCancel={cancelTaskSwitch}
      />

      <TaskDeleteDialog
        task={taskToDelete}
        isDeleting={isDeletingTask}
        onCancel={cancelTaskDelete}
        onConfirm={confirmTaskDelete}
      />
    </>
  );
};

export default TaskList;
