import {
  archiveHabit,
  completeHabitForDate,
  createHabit,
  deleteHabit,
  unarchiveHabit,
  uncompleteHabitForDate,
  updateHabit,
} from "@/features/habits/apis";
import { Habit, HabitEntry } from "@/features/habits/types";
import { queryKeys } from "@/shared/constants";
import { deleteById, upsertById } from "@/shared/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type CompleteHabitResult = {
  habit: Habit;
  entry: HabitEntry;
};

type UncompleteHabitResult = {
  habit: Habit;
};

export const useCreateHabitMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ payload, userId }: { payload: unknown; userId?: string }) =>
      createHabit(payload, userId),
    onSuccess: (data: Habit[], variables) => {
      queryClient.setQueryData<Habit[]>(
        queryKeys.habits.all(variables.userId ?? "", "active"),
        (old) => [...(old ?? []), ...data],
      );
    },
  });
};

export const useUpdateHabitMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ payload, userId }: { payload: Habit; userId?: string }) =>
      updateHabit(payload, userId),
    onSuccess: (data: Habit[], variables) => {
      const updatedHabit = data?.[0];
      if (!updatedHabit) return;

      if (updatedHabit.archivedAt) {
        queryClient.setQueryData<Habit[]>(
          queryKeys.habits.all(variables.userId ?? "", "active"),
          (old) => deleteById(old ?? [], updatedHabit.id),
        );
        queryClient.setQueryData<Habit[]>(
          queryKeys.habits.all(variables.userId ?? "", "completed"),
          (old) => (old ? upsertById(old, updatedHabit) : old),
        );
      } else {
        queryClient.setQueryData<Habit[]>(
          queryKeys.habits.all(variables.userId ?? "", "active"),
          (old) => (old ? upsertById(old, updatedHabit) : old),
        );
        queryClient.setQueryData<Habit[]>(
          queryKeys.habits.all(variables.userId ?? "", "completed"),
          (old) => deleteById(old ?? [], updatedHabit.id),
        );
      }
      queryClient.setQueryData<Habit[]>(
        queryKeys.habits.all(variables.userId ?? "", "all"),
        (old) => (old ? upsertById(old, updatedHabit) : old),
      );
    },
  });
};

export const useArchiveHabitMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ habitId, userId }: { habitId: string; userId?: string }) =>
      archiveHabit(habitId, userId),
    onSuccess: (data: Habit[], variables) => {
      const completedHabit = data?.[0];
      queryClient.setQueryData<Habit[]>(
        queryKeys.habits.all(variables.userId ?? "", "active"),
        (old) => deleteById(old ?? [], variables.habitId),
      );
      if (!completedHabit) return;

      queryClient.setQueryData<Habit[]>(
        queryKeys.habits.all(variables.userId ?? "", "completed"),
        (old) => (old ? upsertById(old, completedHabit) : old),
      );
      queryClient.setQueryData<Habit[]>(
        queryKeys.habits.all(variables.userId ?? "", "all"),
        (old) => (old ? upsertById(old, completedHabit) : old),
      );
    },
  });
};

export const useUnarchiveHabitMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ habitId, userId }: { habitId: string; userId?: string }) =>
      unarchiveHabit(habitId, userId),
    onSuccess: (data: Habit[], variables) => {
      const activeHabit = data?.[0];
      queryClient.setQueryData<Habit[]>(
        queryKeys.habits.all(variables.userId ?? "", "completed"),
        (old) => deleteById(old ?? [], variables.habitId),
      );
      if (!activeHabit) return;

      queryClient.setQueryData<Habit[]>(
        queryKeys.habits.all(variables.userId ?? "", "active"),
        (old) => (old ? upsertById(old, activeHabit) : old),
      );
      queryClient.setQueryData<Habit[]>(
        queryKeys.habits.all(variables.userId ?? "", "all"),
        (old) => (old ? upsertById(old, activeHabit) : old),
      );
    },
  });
};

export const useDeleteHabitMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ habitId, userId }: { habitId: string; userId?: string }) =>
      deleteHabit(habitId, userId),
    onSuccess: (_data, variables) => {
      ["active", "completed", "all"].forEach((lifecycleFilter) => {
        queryClient.setQueryData<Habit[]>(
          queryKeys.habits.all(variables.userId ?? "", lifecycleFilter),
          (old) => deleteById(old ?? [], variables.habitId),
        );
      });
    },
  });
};

export const useCompleteHabitMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      payload,
      userId,
    }: {
      payload: { habitId: string; entryDate: string; progressValue: number };
      userId?: string;
    }) => completeHabitForDate(payload, userId),
    onMutate: async (variables) => {
      const queryKey = queryKeys.habitEntries.byDate(
        variables.userId ?? "",
        variables.payload.entryDate,
      );

      await queryClient.cancelQueries({ queryKey });

      const previousEntries = queryClient.getQueryData<HabitEntry[]>(queryKey);
      const optimisticEntry = {
        id: `optimistic-${variables.payload.habitId}-${variables.payload.entryDate}`,
        habitId: variables.payload.habitId,
        createdBy: variables.userId ?? "",
        entryDate: variables.payload.entryDate,
        status: "completed" as const,
        progressValue: variables.payload.progressValue,
        note: null,
        skipReason: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      queryClient.setQueryData<HabitEntry[]>(queryKey, (old) => [
        ...(old ?? []).filter(
          (entry) =>
            !(
              entry.habitId === variables.payload.habitId &&
              entry.entryDate === variables.payload.entryDate
            ),
        ),
        optimisticEntry,
      ]);

      return { previousEntries, queryKey };
    },
    onSuccess: (data: CompleteHabitResult, variables) => {
      queryClient.setQueryData<HabitEntry[]>(
        queryKeys.habitEntries.byDate(
          variables.userId ?? "",
          variables.payload.entryDate,
        ),
        (old) => [
          ...(old ?? []).filter(
            (entry) =>
              !(
                entry.habitId === variables.payload.habitId &&
                entry.entryDate === variables.payload.entryDate
              ),
          ),
          data.entry,
        ],
      );
      ["active", "completed", "all"].forEach((lifecycleFilter) => {
        queryClient.setQueryData<Habit[]>(
          queryKeys.habits.all(variables.userId ?? "", lifecycleFilter),
          (old) => (old ? upsertById(old, data.habit) : old),
        );
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.habitEntries.ranges(variables.userId ?? ""),
      });
      queryClient.invalidateQueries({
        queryKey: ["habits", variables.userId ?? ""],
      });
    },
    onError: (_error, _variables, context) => {
      if (context?.queryKey) {
        queryClient.setQueryData(context.queryKey, context.previousEntries);
      }
    },
  });
};

export const useUncompleteHabitMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      payload,
      userId,
    }: {
      payload: { habitId: string; entryDate: string };
      userId?: string;
    }) => uncompleteHabitForDate(payload, userId),
    onMutate: async (variables) => {
      const queryKey = queryKeys.habitEntries.byDate(
        variables.userId ?? "",
        variables.payload.entryDate,
      );

      await queryClient.cancelQueries({ queryKey });

      const previousEntries = queryClient.getQueryData<HabitEntry[]>(queryKey);
      queryClient.setQueryData<HabitEntry[]>(queryKey, (old) =>
        (old ?? []).filter(
          (entry) =>
            !(
              entry.habitId === variables.payload.habitId &&
              entry.entryDate === variables.payload.entryDate
            ),
        ),
      );

      return { previousEntries, queryKey };
    },
    onSuccess: (data: UncompleteHabitResult, variables) => {
      queryClient.setQueryData<HabitEntry[]>(
        queryKeys.habitEntries.byDate(
          variables.userId ?? "",
          variables.payload.entryDate,
        ),
        (old) =>
          (old ?? []).filter(
            (entry) =>
              !(
                entry.habitId === variables.payload.habitId &&
                entry.entryDate === variables.payload.entryDate
              ),
          ),
      );
      ["active", "completed", "all"].forEach((lifecycleFilter) => {
        queryClient.setQueryData<Habit[]>(
          queryKeys.habits.all(variables.userId ?? "", lifecycleFilter),
          (old) => (old ? upsertById(old, data.habit) : old),
        );
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.habitEntries.ranges(variables.userId ?? ""),
      });
      queryClient.invalidateQueries({
        queryKey: ["habits", variables.userId ?? ""],
      });
    },
    onError: (_error, _variables, context) => {
      if (context?.queryKey) {
        queryClient.setQueryData(context.queryKey, context.previousEntries);
      }
    },
  });
};
