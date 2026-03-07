import {
  createTask,
  updateTask,
  deleteTask,
  sortTasks,
  addTaskSession,
} from "@/features/pomodoro/apis";

import {
  CreateTaskMutationPayload,
  Task,
  TaskSession,
  UpdateTaskMutationPayload,
  DeleteTaskMutationPayload,
  SortTasksMutationPayload,
  RecordPomodoroCompletionPayload,
} from "@/features/pomodoro/types";

import { queryKeys } from "@/shared/constants";
import { upsertById, deleteById } from "@/shared/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateTaskMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ payload, userId }: CreateTaskMutationPayload) =>
      createTask(payload, userId),
    onSuccess: (data: Task[], variables) => {
      queryClient.setQueryData<Task[]>(
        queryKeys.tasks.all(variables.userId),
        (old) => [...(old ?? []), ...data],
      );
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
    onSuccess: (data: Task[], variables) => {
      const updatedTask = data?.[0];
      if (!updatedTask) return;

      queryClient.setQueryData<Task[]>(
        queryKeys.tasks.all(variables.userId),
        (old) => upsertById(old, updatedTask),
      );
    },
  });
};

export const useDeleteTaskMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ taskId, userId }: DeleteTaskMutationPayload) =>
      deleteTask(taskId, userId),
    onSuccess: (_res, variables) => {
      queryClient.setQueryData<Task[]>(
        queryKeys.tasks.all(variables.userId),
        (old) => deleteById(old ?? [], variables.taskId),
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
    onMutate: async ({ payload, userId }) => {
      await queryClient.cancelQueries({
        queryKey: queryKeys.tasks.all(userId),
      });
      const previousTasks = queryClient.getQueryData<Task[]>(
        queryKeys.tasks.all(userId),
      );

      const sortedIds = new Set(payload.map((t) => t.id));
      const untouched = (previousTasks ?? []).filter(
        (t) => !sortedIds.has(t.id),
      );
      const optimistic = payload.map((task, i) => ({ ...task, rank: i + 1 }));
      queryClient.setQueryData<Task[]>(queryKeys.tasks.all(userId), [
        ...optimistic,
        ...untouched,
      ]);

      return { previousTasks };
    },
    onSuccess: (data: Task[], variables) => {
      const returnedIds = new Set(data.map((t) => t.id));
      const previousTasks =
        queryClient.getQueryData<Task[]>(
          queryKeys.tasks.all(variables.userId),
        ) ?? [];
      const untouched = previousTasks.filter((t) => !returnedIds.has(t.id));
      const sorted = [...data].sort((a, b) => a.rank - b.rank);
      queryClient.setQueryData<Task[]>(
        queryKeys.tasks.all(variables.userId),
        [...sorted, ...untouched],
      );
    },
    onError: (error, variables, context) => {
      if (context?.previousTasks) {
        queryClient.setQueryData(
          queryKeys.tasks.all(variables.userId),
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
      const durationMinutes = duration / 60;

      const sessionRes = await addTaskSession(
        {
          taskId: task?.id ?? null,
          duration: durationMinutes,
        },
        userId,
      );

      let taskRes: Task[] = [];
      if (task) {
        const completedSessions = task.completedSessions + 1;
        const completed = completedSessions >= task.totalSessions;
        taskRes = (await updateTask(
          { id: task.id, completedSessions, completed },
          userId,
        )) as Task[];
      }

      return { tasks: taskRes, sessions: sessionRes };
    },
    onSuccess: ({ tasks, sessions }, { userId, duration }) => {
      if (tasks.length > 0) {
        queryClient.setQueryData<Task[]>(queryKeys.tasks.all(userId), (old) =>
          upsertById(old, tasks[0]),
        );
      }

      queryClient.setQueryData<TaskSession[]>(
        queryKeys.taskSessions.all(userId),
        (old) => [...(old ?? []), ...(sessions as TaskSession[])],
      );

      const durationMinutes = duration / 60;
      queryClient.setQueryData<number>(
        queryKeys.taskSessions.totalDuration(userId),
        (old) => (old ?? 0) + durationMinutes,
      );
    },
  });
};
