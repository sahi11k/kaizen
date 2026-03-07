import React from "react";
import TaskItem from "./ListItem";
import TaskForm from "@/features/pomodoro/components/TaskForm";
import SortableContainer from "./SortableContainer";
import { deepCopy } from "@/shared/lib/utils";
import useTaskList from "@/features/pomodoro/hooks/useTaskList";
import {
  FloatingButton,
  ListHeader,
  SectionedList,
  EmptyState,
  Skeleton,
} from "@/shared/ui";
import TimerWarningDialog from "@/features/pomodoro/components/TimerWarningDialog";
import { FolderOpen, Plus } from "lucide-react";

const TaskList = ({ onItemClick, showHeader }) => {
  const {
    tasks,
    isLoading,
    isEmpty,
    currentTask,
    pendingTasks,
    completedTasks,
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
  } = useTaskList({ onItemClick });

  const renderTaskItem = (task) => (
    <TaskItem
      key={task.id}
      task={task}
      isActive={currentTask?.id === task.id}
      onEdit={(e) => {
        e.stopPropagation();
        taskEditHandler(task);
      }}
      onRemove={(e) => {
        e.stopPropagation();
        taskRemoveHandler(task.id);
      }}
      onComplete={(e) => {
        e.stopPropagation();
        taskCompleteHandler(task.id);
      }}
      onClick={(e) => {
        e.stopPropagation();
        handleTaskClick(task);
      }}
      showModal={showModal}
    />
  );

  const sections = [
    ...(tasks.length > 0
      ? [
          {
            key: "pending",
            label: `Pending (${pendingTasks.length})`,
            content:
              pendingTasks.length === 0 ? (
                <li className="list-none text-muted-foreground text-sm px-2 py-2">
                  All tasks completed. Nice work!
                </li>
              ) : (
                <SortableContainer
                  tasks={deepCopy(pendingTasks)}
                  onDragEnd={taskDragHandler}
                  currentTask={currentTask}
                >
                  {pendingTasks.map(renderTaskItem)}
                </SortableContainer>
              ),
          },
        ]
      : []),
    ...(completedTasks.length > 0
      ? [
          {
            key: "completed",
            label: `Completed (${completedTasks.length})`,
            content: completedTasks.map(renderTaskItem),
          },
        ]
      : []),
  ];

  return (
    <>
      {showHeader && (
        <ListHeader
          title="Tasks"
          buttonProps={{
            label: "Task",
            icon: <Plus className="size-4" />,
            tooltip: "Add task",
            onClick: () => setShowModal(true),
          }}
        />
      )}
      <div className="h-full overflow-y-auto">
        {isLoading && isEmpty && (
          <div className="m-2">
            {Array.from({ length: 3 }).map((_, index) => (
              <Skeleton
                key={index}
                className="h-16 w-full bg-card mb-2 rounded-lg"
              />
            ))}
          </div>
        )}

        {isEmpty && !isLoading && (
          <EmptyState
            icon={<FolderOpen className="size-8" />}
            title="No Tasks"
            description="Add a task to get started."
          />
        )}

        {!isEmpty && <SectionedList sections={sections} />}
      </div>

      <FloatingButton
        onClick={() => setShowModal(true)}
        className="md:hidden"
        icon={<Plus className="size-4" />}
        label="Task"
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
    </>
  );
};

export default TaskList;
