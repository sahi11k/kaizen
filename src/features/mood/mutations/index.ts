import { upsertDailyMood } from "@/features/mood/apis";
import type { DailyMood, MoodValue } from "@/features/mood/types";
import { queryKeys } from "@/shared/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export interface UpsertDailyMoodVariables {
  mood: MoodValue;
  entryDate: string;
  userId: string;
}

export function useUpsertDailyMoodMutation() {
  const queryClient = useQueryClient();

  return useMutation<DailyMood, Error, UpsertDailyMoodVariables>({
    mutationFn: ({ mood, entryDate, userId }: UpsertDailyMoodVariables) =>
      upsertDailyMood({ mood, entryDate }, userId),
    onSuccess: (data, variables) => {
      queryClient.setQueryData<DailyMood | null>(
        queryKeys.moods.today(variables.userId, variables.entryDate),
        data,
      );
    },
  });
}
