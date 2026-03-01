import React, { useState, useRef } from "react";
import TaskItem from "@/features/pomodoro/components/Tasks/TaskItem";
import AddForm from "@/features/pomodoro/components/Tasks/AddForm";
import { CREATE, EDIT, queryKeys } from "@/shared/constants";
import SortableContainer from "@/features/pomodoro/components/Tasks/SortableContainer";
import { arraysEqual, deepCopy } from "@/shared/lib/utils";
import { useTasksStore, useTimerStore } from "@/features/pomodoro/store";
import useAuthStore from "@/features/auth/store";
import { useTasksQuery } from "@/features/pomodoro/services/queries";
import {
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
  useSortTasksMutation,
} from "@/features/pomodoro/services/mutations";
import { getCurrentTime } from "@/features/pomodoro/helpers";
import { useQueryClient } from "@tanstack/react-query";
import { Toast } from "@/shared/ui/toast";
import { Button } from "@/shared/ui/button";
import TaskSwitchDialog from "@/features/pomodoro/components/Tasks/TaskSwitchDialog";
import { FolderOpen, Plus } from "lucide-react";
import { Skeleton } from "@/shared/ui/skeleton";
import { MIN_SESSIONS } from "@/features/pomodoro/constants";
import { Tooltip } from "@/shared/ui/tooltip";

const { toast } = Toast;

const DEFAULT_FORM_VALUES = {
  title: "",
  description: "",
  totalSessions: MIN_SESSIONS,
  category: "others",
};

const DEFAULT_TITLE = "Untitled Task";

const TaskListContent = ({ onItemClick }) => {
  const [showModal, setShowModal] = useState(false);
  const [mode, setMode] = useState(CREATE);
  const [formValues, setFormValues] = useState(DEFAULT_FORM_VALUES);

  const currentOrder = useRef([]);

  const { user } = useAuthStore();
  const { currentTask, setCurrentTask } = useTasksStore();
  const queryClient = useQueryClient();

  const { data: tasks = [], isLoading } = useTasksQuery(user?.id);

  const createTaskMutation = useCreateTaskMutation();
  const updateTaskMutation = useUpdateTaskMutation();
  const deleteTaskMutation = useDeleteTaskMutation();
  const sortTasksMutation = useSortTasksMutation();

  const formSubmitHandler = () => {
    if (mode === CREATE) {
      addTask();
    } else if (mode === EDIT) {
      editTask();
    }
  };

  const addTask = () => {
    const { title, ...rest } = formValues;

    const maxRank =
      tasks.length > 0 ? Math.max(...tasks.map((task) => task.rank)) : 0;

    const task = {
      ...rest,
      completed: false,
      completedSessions: 0,
      rank: maxRank + 1,
      title: !title || title.trim().length <= 0 ? DEFAULT_TITLE : title,
    };

    createTaskMutation.mutate(
      { payload: task, userId: user.id },
      {
        onSuccess: () => {
          toast.success("Task Created");
          handleCancel();
        },
        onError: (error) => {
          toast.error(error.message);
        },
      },
    );
  };

  const editTask = () => {
    const { title } = formValues;
    const task = {
      ...formValues,
      title: !title || title.trim().length <= 0 ? DEFAULT_TITLE : title,
    };

    updateTaskMutation.mutate(
      { payload: task, userId: user.id },
      {
        onSuccess: (res) => {
          const updatedTask = res.data?.[0];
          if (currentTask?.id === task.id && updatedTask) {
            setCurrentTask(updatedTask);
          }
          toast.success("Task Updated");
          handleCancel();
        },
        onError: (error) => {
          toast.error(error.message);
        },
      },
    );
  };

  const handleCancel = () => {
    setShowModal(false);
    setFormValues(DEFAULT_FORM_VALUES);
    setMode(CREATE);
  };

  const taskRemoveHandler = (taskId) => {
    deleteTaskMutation.mutate(
      { taskId, userId: user.id },
      {
        onSuccess: () => {
          if (currentTask?.id === taskId) {
            setCurrentTask(null);
          }
          toast.success("Task Deleted");
        },
        onError: (error) => {
          toast.error(error.message);
        },
      },
    );
  };

  const taskCompleteHandler = (taskId) => {
    const task = tasks.find((t) => t.id === taskId);

    updateTaskMutation.mutate(
      {
        payload: { id: taskId, completed: !task.completed },
        userId: user.id,
      },
      {
        onSuccess: () => {
          toast.success("Task Updated");
        },
        onError: (error) => {
          toast.error(error.message);
        },
      },
    );
  };

  const taskEditHandler = (task) => {
    setShowModal(true);
    setFormValues(task);
    setMode(EDIT);
  };

  const taskDragHandler = (updatedTasks) => {
    const newOrder = updatedTasks.map((task) => task.id);
    if (arraysEqual(newOrder, currentOrder.current)) {
      return;
    }

    sortTasksMutation.mutate(
      { payload: updatedTasks, userId: user.id },
      {
        onSuccess: () => {
          currentOrder.current = newOrder;
          toast.success("Task Order Updated");
        },
        onError: (error) => {
          toast.error(error.message);
        },
      },
    );
  };

  const getCompletedTasks = () => {
    return tasks.filter((task) => task.completed).length;
  };

  const [pendingTask, setPendingTask] = useState(null);

  const handleTaskClick = (task) => {
    if (currentTask?.id === task.id) return;

    const { timerStarted } = useTimerStore.getState();
    if (timerStarted && currentTask) {
      setPendingTask(task);
      return;
    }

    setCurrentTask(task);
    if (typeof onItemClick === "function") {
      onItemClick();
    }
  };

  const confirmTaskSwitch = () => {
    if (!pendingTask) return;
    const { currentTab } = useTimerStore.getState();
    const userSettings = queryClient.getQueryData(
      queryKeys.userSettings.all(user?.id),
    );
    const value = getCurrentTime(currentTab, userSettings);
    useTimerStore.getState().resetTimer(value);
    setCurrentTask(pendingTask);
    if (typeof onItemClick === "function") {
      onItemClick();
    }
    setPendingTask(null);
  };

  const cancelTaskSwitch = () => {
    setPendingTask(null);
  };

  return (
    <>
      <div className="mt-4 xl:mt-6 pb-2 xl:pb-4 items-center justify-between hidden md:flex">
        <div>
          <span className="heading-3 mr-1">Tasks</span>
          <span
            className="text-muted-foreground text-sm"
            hidden={tasks.length === 0}
          >
            ({getCompletedTasks()}/{tasks.length})
          </span>
        </div>
        <Tooltip content="Add task">
          <Button
            onClick={() => setShowModal(true)}
            icon={<Plus className="size-4" />}
            size="sm"
          >
            Task
          </Button>
        </Tooltip>
      </div>
      <div className="h-full overflow-y-auto scrollbar-thin -mr-4 xl:-mr-6 -ml-2">
        <ul className="pr-2 xl:pr-4" role="listbox">
          <SortableContainer
            tasks={deepCopy(tasks)}
            onDragEnd={taskDragHandler}
            currentTask={currentTask}
          >
            {tasks.map((task) => {
              return (
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
            })}
          </SortableContainer>
        </ul>
        <div className="pr-6">
          {isLoading &&
            tasks.length === 0 &&
            Array.from({ length: 3 }).map((_, index) => (
              <Skeleton
                key={index}
                className="h-16 w-full bg-card mb-2 rounded-lg"
              />
            ))}
        </div>
        {tasks.length === 0 && !showModal && !isLoading && (
          <div className="flex justify-center items-center h-full">
            <div className="flex flex-col items-center gap-3 text-muted-foreground">
              <FolderOpen className="size-8" />
              <div className="flex flex-col items-center">
                <h3 className="heading-3">No Tasks</h3>
                <p className="body-description">Add a task to get started.</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <Button
        onClick={() => setShowModal(true)}
        className="rounded-full justify-end absolute right-8 bottom-20 h-12  px-6 flex items-center justify-center md:hidden"
        icon={<Plus className="size-4" />}
        variant="secondary"
      >
        Task
      </Button>

      <AddForm
        setFormValues={setFormValues}
        formValues={formValues}
        showModal={showModal}
        setShowModal={setShowModal}
        onSave={formSubmitHandler}
        onCancel={handleCancel}
        mode={mode}
      />

      <TaskSwitchDialog
        task={pendingTask}
        onConfirm={confirmTaskSwitch}
        onCancel={cancelTaskSwitch}
      />
    </>
  );
};

export default TaskListContent;
