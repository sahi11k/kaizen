import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { CREATE, EDIT, queryKeys } from "@/shared/constants";
import { arraysEqual } from "@/shared/lib/utils";
import { useTasksStore, useTimerStore } from "@/features/pomodoro/store";
import { useAuthStore } from "@/features/auth";
import { useTasksQuery } from "@/features/pomodoro/queries";
import {
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
  useSortTasksMutation,
} from "@/features/pomodoro/mutations";
import { getCurrentTime } from "@/features/pomodoro/utils";
import { useQueryClient } from "@tanstack/react-query";
import { Toast } from "@/shared/ui";
import { MIN_SESSIONS } from "@/features/pomodoro/constants";
import type { Task } from "@/features/pomodoro/types";
import {
  buildCreateTaskPayload,
  buildUpdateTaskPayload,
  getTaskGroups,
} from "@/features/pomodoro/components/TaskList/utils";

const { toast } = Toast;

const DEFAULT_FORM_VALUES = {
  title: "",
  description: "",
  totalSessions: MIN_SESSIONS,
  category: "others",
};

interface UseTaskListOptions {
  onItemClick?: () => void;
}

export default function useTaskList({ onItemClick }: UseTaskListOptions = {}) {
  const [showModal, setShowModal] = useState(false);
  const [mode, setMode] = useState(CREATE);
  const [formValues, setFormValues] =
    useState<Record<string, unknown>>(DEFAULT_FORM_VALUES);
  const [pendingTask, setPendingTask] = useState<Task | null>(null);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);

  const currentOrder = useRef<string[]>([]);

  const { user } = useAuthStore();
  const userId = user?.id;
  const { currentTask, createTaskRequestId, setCurrentTask } = useTasksStore();
  const queryClient = useQueryClient();
  const lastCreateTaskRequestId = useRef(createTaskRequestId);

  const { data: tasks = [], isLoading } = useTasksQuery(userId);

  const createTaskMutation = useCreateTaskMutation();
  const updateTaskMutation = useUpdateTaskMutation();
  const deleteTaskMutation = useDeleteTaskMutation();
  const sortTasksMutation = useSortTasksMutation();

  const handleCancel = useCallback(() => {
    setShowModal(false);
    setFormValues({ ...DEFAULT_FORM_VALUES });
    setMode(CREATE);
  }, []);

  const addTask = useCallback(() => {
    const maxRank =
      tasks.length > 0 ? Math.max(...tasks.map((task: any) => task.rank)) : 0;
    const task = buildCreateTaskPayload(formValues, maxRank + 1);

    createTaskMutation.mutate(
      { payload: task, userId },
      {
        onSuccess: () => {
          toast.success("Task Created");
          handleCancel();
        },
        onError: (error: Error) => {
          toast.error(error.message);
        },
      },
    );
  }, [createTaskMutation, formValues, handleCancel, tasks, userId]);

  const editTask = useCallback(() => {
    const task = buildUpdateTaskPayload(formValues);

    updateTaskMutation.mutate(
      { payload: task, userId },
      {
        onSuccess: (res: any) => {
          const updatedTask = res.data?.[0];
          if (currentTask?.id === task.id && updatedTask) {
            setCurrentTask(updatedTask);
          }
          toast.success("Task Updated");
          handleCancel();
        },
        onError: (error: Error) => {
          toast.error(error.message);
        },
      },
    );
  }, [
    currentTask?.id,
    formValues,
    handleCancel,
    setCurrentTask,
    updateTaskMutation,
    userId,
  ]);

  const formSubmitHandler = useCallback(() => {
    if (mode === CREATE) {
      addTask();
    } else if (mode === EDIT) {
      editTask();
    }
  }, [addTask, editTask, mode]);

  useEffect(() => {
    if (lastCreateTaskRequestId.current === createTaskRequestId) return;

    lastCreateTaskRequestId.current = createTaskRequestId;
    setFormValues({ ...DEFAULT_FORM_VALUES });
    setMode(CREATE);
    setShowModal(true);
  }, [createTaskRequestId]);

  const taskRemoveHandler = useCallback((task: Task) => {
    setTaskToDelete(task);
  }, []);

  const confirmTaskDelete = useCallback(() => {
    if (!taskToDelete) return;

    deleteTaskMutation.mutate(
      { taskId: taskToDelete.id, userId },
      {
        onSuccess: () => {
          if (currentTask?.id === taskToDelete.id) {
            setCurrentTask(null);
          }
          setTaskToDelete(null);
          toast.success("Task Deleted");
        },
        onError: (error: Error) => {
          toast.error(error.message);
        },
      },
    );
  }, [currentTask?.id, deleteTaskMutation, setCurrentTask, taskToDelete, userId]);

  const cancelTaskDelete = useCallback(() => {
    if (deleteTaskMutation.isPending) return;
    setTaskToDelete(null);
  }, [deleteTaskMutation.isPending]);

  const taskCompleteHandler = useCallback((taskId: string) => {
    const task = tasks.find((t: any) => t.id === taskId);
    if (!task) return;

    updateTaskMutation.mutate(
      {
        payload: { ...task, completed: !task.completed } as Task,
        userId,
      },
      {
        onSuccess: () => {
          toast.success("Task Updated");
        },
        onError: (error: Error) => {
          toast.error(error.message);
        },
      },
    );
  }, [tasks, updateTaskMutation, userId]);

  const taskEditHandler = useCallback((task: Task) => {
    setShowModal(true);
    setFormValues(task);
    setMode(EDIT);
  }, []);

  const taskDragHandler = useCallback((updatedTasks: Task[]) => {
    const newOrder = updatedTasks.map((task) => task.id);
    if (arraysEqual(newOrder, currentOrder.current)) {
      return;
    }

    sortTasksMutation.mutate(
      { payload: updatedTasks, userId },
      {
        onSuccess: () => {
          currentOrder.current = newOrder;
          toast.success("Task Order Updated");
        },
        onError: (error: Error) => {
          toast.error(error.message);
        },
      },
    );
  }, [sortTasksMutation, userId]);

  const { pendingTasks, completedTasks } = useMemo(
    () => getTaskGroups(tasks as Task[]),
    [tasks],
  );

  useEffect(() => {
    if (!currentTask && pendingTasks.length > 0) {
      setCurrentTask(pendingTasks[0] as Task);
    }
  }, [pendingTasks, currentTask, setCurrentTask]);

  const handleTaskClick = useCallback((task: Task) => {
    if (currentTask?.id === task.id) return;

    const { timerStarted } = useTimerStore.getState();
    if (timerStarted) {
      setPendingTask(task);
      return;
    }

    setCurrentTask(task);
    if (typeof onItemClick === "function") {
      onItemClick();
    }
  }, [currentTask?.id, onItemClick, setCurrentTask]);

  const confirmTaskSwitch = useCallback(() => {
    if (!pendingTask) return;
    const { currentTab } = useTimerStore.getState();
    const userSettings = queryClient.getQueryData(
      queryKeys.userSettings.all(userId),
    );
    const value = getCurrentTime(currentTab, userSettings);
    useTimerStore.getState().resetTimer(value);
    setCurrentTask(pendingTask);
    if (typeof onItemClick === "function") {
      onItemClick();
    }
    setPendingTask(null);
  }, [onItemClick, pendingTask, queryClient, setCurrentTask, userId]);

  const cancelTaskSwitch = useCallback(() => {
    setPendingTask(null);
  }, []);

  const isEmpty = tasks.length === 0 && !showModal;

  return {
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
    taskToDelete,
    confirmTaskDelete,
    cancelTaskDelete,
    isDeletingTask: deleteTaskMutation.isPending,
  };
}
