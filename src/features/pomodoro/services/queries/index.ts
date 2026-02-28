import {
  fetchTasks,
  getLastWeekTaskSessions,
} from "@/features/pomodoro/services/apis";
import { queryKeys } from "@/shared/constants/queryKeys";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";

export const useTasksQuery = (userId) => {
  return useQuery({
    queryKey: queryKeys.tasks.all(userId),
    queryFn: () => fetchTasks(userId),
    enabled: !!userId,
  });
};

export const useTaskSessionsQuery = (userId) => {
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
