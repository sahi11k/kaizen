import { useMemo } from "react";
import dayjs from "dayjs";

import { useAuthStore } from "@/features/auth";
import {
  useTasksQuery,
  useTaskSessionsForRangeQuery,
  useTotalSessionDurationQuery,
} from "@/features/pomodoro/queries";
import type { Task, TaskSession } from "@/features/pomodoro/types";
import { formatDuration } from "@/features/dashboard/utils/totalHoursWidgetHelper";
import {
  getCountDifferenceComparison,
  getWeeklyComparison,
  sumSessionMinutes,
} from "@/features/dashboard/utils/pomodoroMetricComparison";

type DateRange = {
  startDate: string;
  endDate: string;
};

type PomodoroMetricsDateRanges = {
  currentWeek: DateRange;
  previousWeek: DateRange;
  today: DateRange;
  yesterday: DateRange;
};

const getPomodoroMetricsDateRanges = (): PomodoroMetricsDateRanges => {
  const currentWeekStart = dayjs().startOf("week");
  const currentWeekEnd = dayjs().endOf("week");
  const previousWeekStart = currentWeekStart.subtract(1, "week");
  const previousWeekEnd = currentWeekStart.subtract(1, "millisecond");
  const todayStart = dayjs().startOf("day");
  const todayEnd = dayjs().endOf("day");
  const yesterdayStart = todayStart.subtract(1, "day");
  const yesterdayEnd = todayStart.subtract(1, "millisecond");

  return {
    currentWeek: {
      startDate: currentWeekStart.toISOString(),
      endDate: currentWeekEnd.toISOString(),
    },
    previousWeek: {
      startDate: previousWeekStart.toISOString(),
      endDate: previousWeekEnd.toISOString(),
    },
    today: {
      startDate: todayStart.toISOString(),
      endDate: todayEnd.toISOString(),
    },
    yesterday: {
      startDate: yesterdayStart.toISOString(),
      endDate: yesterdayEnd.toISOString(),
    },
  };
};

const getPlannedSessionTotals = (tasks: Task[] = []) =>
  tasks.reduce(
    (totals, task) => {
      const totalSessions = Math.max(0, Math.floor(task.totalSessions || 0));
      const completedSessions = Math.max(
        0,
        Math.floor(task.completedSessions || 0),
      );

      return {
        completed:
          totals.completed + Math.min(completedSessions, totalSessions),
        total: totals.total + totalSessions,
      };
    },
    { completed: 0, total: 0 },
  );

const getSessionCompletionRate = (tasks: Task[] = []) => {
  const plannedSessionTotals = getPlannedSessionTotals(tasks);

  if (plannedSessionTotals.total <= 0) {
    return null;
  }

  return Math.min(
    100,
    Math.round(
      (plannedSessionTotals.completed / plannedSessionTotals.total) * 100,
    ),
  );
};

export const usePomodoroMetrics = () => {
  const user = useAuthStore((state) => state.user);
  const dateRanges = useMemo(getPomodoroMetricsDateRanges, []);

  const { data: taskRecords = [] } = useTasksQuery(user?.id);
  const { data: totalMinutes = 0 } = useTotalSessionDurationQuery(user?.id);
  const { data: currentWeekSessionRecords = [] } = useTaskSessionsForRangeQuery(
    user?.id,
    dateRanges.currentWeek,
  );
  const { data: previousWeekSessionRecords = [] } =
    useTaskSessionsForRangeQuery(user?.id, dateRanges.previousWeek);
  const { data: todaySessionRecords = [] } = useTaskSessionsForRangeQuery(
    user?.id,
    dateRanges.today,
  );
  const { data: yesterdaySessionRecords = [] } = useTaskSessionsForRangeQuery(
    user?.id,
    dateRanges.yesterday,
  );

  const tasks = taskRecords as Task[];
  const currentWeekSessions = currentWeekSessionRecords as TaskSession[];
  const previousWeekSessions = previousWeekSessionRecords as TaskSession[];
  const todaySessions = todaySessionRecords as TaskSession[];
  const yesterdaySessions = yesterdaySessionRecords as TaskSession[];

  const totalTimeInvested =
    totalMinutes > 0 ? formatDuration(totalMinutes) : { value: null, unit: "" };
  const sessionCompletionRate = getSessionCompletionRate(tasks);
  const timeComparison = getWeeklyComparison(
    sumSessionMinutes(currentWeekSessions),
    sumSessionMinutes(previousWeekSessions),
  );
  const sessionsTodayComparison = getCountDifferenceComparison(
    todaySessions.length,
    yesterdaySessions.length,
  );

  return {
    totalTimeInvested,
    sessionCompletionRate,
    sessionsCompletedToday: todaySessions.length,
    timeComparison,
    sessionsTodayComparison,
  };
};
