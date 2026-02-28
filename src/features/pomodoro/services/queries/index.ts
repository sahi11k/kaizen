import {
  fetchTasks,
  getLastWeekTaskSessions,
} from "@/features/pomodoro/services/apis";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";

export const useTasksQuery = (userId) => {
  return useQuery({
    queryKey: ["tasks", userId],
    queryFn: async () => {
      const response = await fetchTasks(userId);
      return response.data ?? [];
    },
    enabled: !!userId,
  });
};

export const useTaskSessionsQuery = (userId) => {
  return useQuery({
    queryKey: ["taskSessions", userId],
    queryFn: async () => {
      const payload = {
        startDate: dayjs().subtract(7, "day").toISOString(),
        endDate: dayjs().toISOString(),
      };
      const res = await getLastWeekTaskSessions(payload, userId);
      return res.data ?? [];
    },
    enabled: !!userId,
  });
};
