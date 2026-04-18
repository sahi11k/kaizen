import { fetchTodayMood } from "@/features/mood/apis";
import type { DailyMood } from "@/features/mood/types";
import { queryKeys } from "@/shared/constants";
import { useQuery } from "@tanstack/react-query";

interface UseTodayMoodQueryOptions {
  enabled?: boolean;
}

export function useTodayMoodQuery(
  userId: string | undefined,
  dateKey: string,
  options?: UseTodayMoodQueryOptions,
) {
  const enabled =
    Boolean(userId) && (options?.enabled === undefined || options.enabled);

  return useQuery<DailyMood | null, Error>({
    queryKey:
      userId != null && userId !== ""
        ? queryKeys.moods.today(userId, dateKey)
        : ["moods", "today", "disabled", dateKey],
    queryFn: () => {
      if (!userId) {
        throw new Error("useTodayMoodQuery: userId is required when enabled");
      }
      return fetchTodayMood(userId, dateKey);
    },
    enabled,
  });
}
