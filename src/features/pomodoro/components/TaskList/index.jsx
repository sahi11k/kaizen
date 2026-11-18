import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { Plus } from "lucide-react";

import TaskForm from "@/features/pomodoro/components/TaskForm";
import TimerWarningDialog from "@/features/pomodoro/components/TimerWarningDialog";
import useTaskList from "@/features/pomodoro/hooks/useTaskList";
import { EmptyState, EmptyStateAction } from "@/shared/ui";

import TaskDeleteDialog from "./TaskDeleteDialog";
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

  // When a task is added (new tasks are ranked last), scroll the list to the bottom
  // so the new task is visible. Skips the first load and any non-add change.
  const listRef = useRef(null);
  const prevTaskCount = useRef(null);
  useEffect(() => {
    if (isLoading) return;
    const count = tasks.length;
    const prev = prevTaskCount.current;
    prevTaskCount.current = count;
    if (prev === null || count <= prev) return;
    const frame = requestAnimationFrame(() => {
      const el = listRef.current;
      if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
    });
    return () => cancelAnimationFrame(frame);
  }, [isLoading, tasks.length]);

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

      <div className="flex min-h-0 flex-1 flex-col">
        {isLoading && isEmpty && <TaskListSkeleton />}

        {isEmpty && !isLoading && (
          <EmptyState
            title="No tasks"
            description="Add something you want to get done."
            action={
              <EmptyStateAction onClick={openTaskForm} className="gap-1.5">
                <Plus className="size-4" />
                New
              </EmptyStateAction>
            }
            className="flex items-center justify-center"
          />
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
          <div ref={listRef} className="min-h-0 flex-1 overflow-y-auto">
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
