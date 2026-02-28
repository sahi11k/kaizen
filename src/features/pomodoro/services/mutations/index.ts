import {
  createTask,
  updateTask,
  deleteTask,
  sortTasks,
  addTaskSession,
} from "@/features/pomodoro/services/apis";

import {
  CreateTaskMutationPayload,
  Task,
  TaskSession,
  UpdateTaskMutationPayload,
  DeleteTaskMutationPayload,
  SortTasksMutationPayload,
  RecordPomodoroCompletionPayload,
} from "@/features/pomodoro/types";

import useTasksStore from "@/features/pomodoro/store/tasks";
import { upsertById, deleteById } from "@/shared/utils/jsUtils";
import { ApiResponse } from "@/types/apis";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateTaskMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ payload, userId }: CreateTaskMutationPayload) => {
      console.log("payload", payload);
      return createTask(payload, userId);
    },
    onSuccess: (res: ApiResponse<Task[]>, variables) => {
      if (res.error) throw new Error(res.error);

      queryClient.setQueryData<Task[]>(["tasks", variables.userId], (old) => [
        ...(old ?? []),
        ...(res.data ?? []),
      ]);
    },
    onError: (error: Error, variables) => {
      console.error({ error, variables });
    },
  });
};

export const useUpdateTaskMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ payload, userId }: UpdateTaskMutationPayload) =>
      updateTask(payload, userId),
    onSuccess: (res: ApiResponse<Task[]>, variables) => {
      if (res.error) throw new Error(res.error);

      const updatedTask = res.data?.[0];
      if (!updatedTask) return;

      queryClient.setQueryData<Task[]>(["tasks", variables.userId], (old) =>
        upsertById(old, updatedTask),
      );
    },
  });
};

export const useDeleteTaskMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ taskId, userId }: DeleteTaskMutationPayload) =>
      deleteTask(taskId, userId),
    onSuccess: (res: ApiResponse<Task[]>, variables) => {
      if (res.error) throw new Error(res.error);

      queryClient.setQueryData<Task[]>(["tasks", variables.userId], (old) =>
        deleteById(old ?? [], variables.taskId),
      );
    },
  });
};

export const useSortTasksMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ payload, userId }: SortTasksMutationPayload) => {
      const newOrder = payload.map(({ id, createdAt }, i) => ({
        id,
        rank: i + 1,
        createdAt,
      }));
      return sortTasks(newOrder, userId);
    },
    onMutate: ({ payload, userId }) => {
      const optimistic = payload.map((task, i) => ({ ...task, rank: i + 1 }));
      queryClient.setQueryData<Task[]>(["tasks", userId], optimistic);

      const previousTasks = queryClient.getQueryData<Task[]>(["tasks", userId]);

      return { previousTasks };
    },
    onSuccess: (res: ApiResponse<Task[]>, variables) => {
      if (res.error) throw new Error(res.error);
      const sorted = [...(res.data ?? [])].sort((a, b) => a.rank - b.rank);
      queryClient.setQueryData<Task[]>(["tasks", variables.userId], sorted);
    },
    onError: (error, variables, context) => {
      if (context?.previousTasks) {
        queryClient.setQueryData(
          ["tasks", variables.userId],
          context.previousTasks,
        );
      }
    },
  });
};

export const useRecordPomodoroCompletionMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      task,
      userId,
      duration,
    }: RecordPomodoroCompletionPayload) => {
      const completedSessions = task.completedSessions + 1;
      const completed = completedSessions >= task.totalSessions;
      const durationMinutes = duration / 60;

      const sessionRes = await addTaskSession(
        { taskId: task.id, duration: durationMinutes, status: completed },
        userId,
      );

      if (sessionRes.error) throw new Error(sessionRes.error as string);

      const taskRes = await updateTask(
        {
          id: task.id,
          completedSessions,
          completed,
          timeSpent: task.timeSpent + durationMinutes,
        },
        userId,
      );

      return { taskRes, sessionRes };
    },
    onSuccess: ({ taskRes, sessionRes }, { userId }) => {
      if (taskRes.error) throw new Error(taskRes.error as string);
      if (sessionRes.error) throw new Error(sessionRes.error as string);

      queryClient.setQueryData<Task[]>(["tasks", userId], (old) =>
        upsertById(old, taskRes.data?.[0]),
      );

      queryClient.setQueryData<TaskSession[]>(
        ["taskSessions", userId],
        (old) => [...(old ?? []), ...(sessionRes.data ?? [])],
      );
    },
  });
};
