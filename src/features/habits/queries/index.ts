import {
  fetchHabitEntriesForDate,
  fetchHabitEntriesForRange,
  fetchHabits,
} from "@/features/habits/apis";
import { getTodayDateKey } from "@/features/habits/utils";
import { queryKeys } from "@/shared/constants";
import { useQuery } from "@tanstack/react-query";

export const useHabitsQuery = (
  userId?: string,
  lifecycleFilter = "active",
  enabled = true,
) => {
  return useQuery({
    queryKey: queryKeys.habits.all(userId ?? "", lifecycleFilter),
    queryFn: () => fetchHabits(userId, lifecycleFilter),
    enabled: !!userId && enabled,
  });
};

export const useHabitEntriesForDateQuery = (
  userId?: string,
  dateKey = getTodayDateKey(),
) => {
  return useQuery({
    queryKey: queryKeys.habitEntries.byDate(userId ?? "", dateKey),
    queryFn: () => fetchHabitEntriesForDate(dateKey, userId),
    enabled: !!userId,
  });
};

export const useTodayHabitEntriesQuery = (userId?: string) => {
  return useHabitEntriesForDateQuery(userId, getTodayDateKey());
};

export const useHabitEntriesForRangeQuery = ({
  userId,
  habitId,
  startDate,
  endDate,
}: {
  userId?: string;
  habitId?: string;
  startDate: string;
  endDate: string;
}) => {
  return useQuery({
    queryKey: queryKeys.habitEntries.byRange(
      userId ?? "",
      habitId ?? "",
      startDate,
      endDate,
    ),
    queryFn: () =>
      fetchHabitEntriesForRange({ userId, habitId, startDate, endDate }),
    enabled: !!userId && !!habitId && !!startDate && !!endDate,
  });
};
