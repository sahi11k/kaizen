import {
  fetchTasks,
  getLastWeekTaskSessions,
  getTotalSessionDuration,
} from "@/features/pomodoro/apis";
import { queryKeys } from "@/shared/constants";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";

export const useTasksQuery = (userId?: string) => {
  return useQuery({
    queryKey: queryKeys.tasks.all(userId),
    queryFn: () => fetchTasks(userId),
    enabled: !!userId,
  });
};

export const useTotalSessionDurationQuery = (userId?: string) => {
  return useQuery({
    queryKey: queryKeys.taskSessions.totalDuration(userId),
    queryFn: () => getTotalSessionDuration(userId),
    enabled: !!userId,
  });
};

export const useTaskSessionsQuery = (userId?: string) => {
  return useQuery({
    queryKey: queryKeys.taskSessions.all(userId),
    queryFn: () =>
      getLastWeekTaskSessions(
        {
          startDate: dayjs().subtract(7, "day").toISOString(),
          endDate: dayjs().toISOString(),
        },
        userId,
      ),
    enabled: !!userId,
  });
};
