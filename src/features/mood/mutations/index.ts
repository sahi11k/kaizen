import { upsertDailyMood } from "@/features/mood/apis";
import type { DailyMood, MoodValue } from "@/features/mood/types";
import { queryKeys } from "@/shared/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export interface UpsertDailyMoodVariables {
  mood: MoodValue;
  entryDate: string;
  userId: string;
}

interface UpsertDailyMoodContext {
  previousMood: DailyMood | null | undefined;
  queryKey: ReturnType<typeof queryKeys.moods.today>;
}

export function useUpsertDailyMoodMutation() {
  const queryClient = useQueryClient();

  return useMutation<
    DailyMood,
    Error,
    UpsertDailyMoodVariables,
    UpsertDailyMoodContext
  >({
    mutationFn: ({ mood, entryDate, userId }: UpsertDailyMoodVariables) =>
      upsertDailyMood({ mood, entryDate }, userId),
    onMutate: async (variables) => {
      const queryKey = queryKeys.moods.today(
        variables.userId,
        variables.entryDate,
      );

      await queryClient.cancelQueries({ queryKey });

      const previousMood = queryClient.getQueryData<DailyMood | null>(queryKey);
      const now = new Date().toISOString();

      queryClient.setQueryData<DailyMood | null>(queryKey, {
        id: previousMood?.id ?? `optimistic-${variables.entryDate}`,
        mood: variables.mood,
        entryDate: variables.entryDate,
        createdBy: variables.userId,
        createdAt: previousMood?.createdAt ?? now,
        updatedAt: now,
      });

      return { previousMood, queryKey };
    },
    onError: (_error, _variables, context) => {
      if (!context) return;
      queryClient.setQueryData<DailyMood | null>(
        context.queryKey,
        context.previousMood ?? null,
      );
    },
    onSuccess: (data, variables) => {
      queryClient.setQueryData<DailyMood | null>(
        queryKeys.moods.today(variables.userId, variables.entryDate),
        data,
      );
    },
  });
}
