import { useState, useRef, useMemo, useEffect } from "react";
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
import { DefaultTask, Task } from "@/features/pomodoro/types";

const { toast } = Toast;

const DEFAULT_FORM_VALUES = {
  title: "",
  description: "",
  totalSessions: MIN_SESSIONS,
  category: "others",
};

const DEFAULT_TITLE = "Untitled Task";

interface UseTaskListOptions {
  onItemClick?: () => void;
}

export default function useTaskList({ onItemClick }: UseTaskListOptions = {}) {
  const [showModal, setShowModal] = useState(false);
  const [mode, setMode] = useState(CREATE);
  const [formValues, setFormValues] =
    useState<Record<string, unknown>>(DEFAULT_FORM_VALUES);
  const [pendingTask, setPendingTask] = useState<Task | null>(null);

  const currentOrder = useRef<string[]>([]);

  const { user } = useAuthStore();
  const { currentTask, setCurrentTask } = useTasksStore();
  const queryClient = useQueryClient();

  const { data: tasks = [], isLoading } = useTasksQuery(user?.id);

  const createTaskMutation = useCreateTaskMutation();
  const updateTaskMutation = useUpdateTaskMutation();
  const deleteTaskMutation = useDeleteTaskMutation();
  const sortTasksMutation = useSortTasksMutation();

  const addTask = () => {
    const title = formValues.title as string;
    const { title: _, ...rest } = formValues;

    const maxRank =
      tasks.length > 0 ? Math.max(...tasks.map((task: any) => task.rank)) : 0;

    const task = {
      ...rest,
      completed: false,
      completedSessions: 0,
      rank: maxRank + 1,
      title: !title || title.trim().length <= 0 ? DEFAULT_TITLE : title,
    } as unknown as DefaultTask;

    createTaskMutation.mutate(
      { payload: task, userId: user.id },
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
  };

  const editTask = () => {
    const title = formValues.title as string;
    const task = {
      ...formValues,
      title: !title || title.trim().length <= 0 ? DEFAULT_TITLE : title,
    } as Task;

    updateTaskMutation.mutate(
      { payload: task, userId: user.id },
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
  };

  const formSubmitHandler = () => {
    if (mode === CREATE) {
      addTask();
    } else if (mode === EDIT) {
      editTask();
    }
  };

  const handleCancel = () => {
    setShowModal(false);
    setFormValues(DEFAULT_FORM_VALUES);
    setMode(CREATE);
  };

  const taskRemoveHandler = (taskId: string) => {
    deleteTaskMutation.mutate(
      { taskId, userId: user.id },
      {
        onSuccess: () => {
          if (currentTask?.id === taskId) {
            setCurrentTask(null);
          }
          toast.success("Task Deleted");
        },
        onError: (error: Error) => {
          toast.error(error.message);
        },
      },
    );
  };

  const taskCompleteHandler = (taskId: string) => {
    const task = tasks.find((t: any) => t.id === taskId);

    updateTaskMutation.mutate(
      {
        payload: { ...task, completed: !task.completed } as Task,
        userId: user.id,
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
  };

  const taskEditHandler = (task: any) => {
    setShowModal(true);
    setFormValues(task);
    setMode(EDIT);
  };

  const taskDragHandler = (updatedTasks: any[]) => {
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
        onError: (error: Error) => {
          toast.error(error.message);
        },
      },
    );
  };

  const pendingTasks = useMemo(
    () => tasks.filter((task: any) => !task.completed),
    [tasks],
  );
  const completedTasks = useMemo(
    () => tasks.filter((task: any) => task.completed),
    [tasks],
  );

  useEffect(() => {
    if (!currentTask && pendingTasks.length > 0) {
      setCurrentTask(pendingTasks[0] as Task);
    }
  }, [pendingTasks, currentTask, setCurrentTask]);

  const handleTaskClick = (task: any) => {
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
  };
}
