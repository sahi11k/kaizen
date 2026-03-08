import { useTimerStore, useTasksStore } from "@/features/pomodoro/store";
import { useAuthStore } from "@/features/auth";
import { useTasksQuery } from "@/features/pomodoro/queries";
import { getFormattedTime } from "@/features/pomodoro/utils";
import { TIMER_CONSTANTS } from "@/features/pomodoro/constants";
import { Task } from "@/features/pomodoro/types";

const { POMODORO_TAB } = TIMER_CONSTANTS;

interface PomodoroTimerReturn {
  timerValue: number;
  timerStarted: boolean;
  currentTab: string;
  duration: number;

  startTimer: (taskId?: string) => void;
  stopTimer: () => void;
  resetTimer: (value: number) => void;

  currentTask: Task | null;
  timerTask: Task | null;

  minutes: string;
  seconds: string;
  percentage: number;
  isPomodoro: boolean;
  fillColor: string;
  unfilledColor: string;
}

export default function usePomodoroTimer(): PomodoroTimerReturn {
  const timerValue = useTimerStore((s) => s.timerValue);
  const timerStarted = useTimerStore((s) => s.timerStarted);
  const currentTab = useTimerStore((s) => s.currentTab);
  const duration = useTimerStore((s) => s.duration);
  const timerTaskId = useTimerStore((s) => s.timerTaskId);
  const startTimer = useTimerStore((s) => s.startTimer);
  const stopTimer = useTimerStore((s) => s.stopTimer);
  const resetTimer = useTimerStore((s) => s.resetTimer);

  const user = useAuthStore((s) => s.user);
  const { data: tasks = [] } = useTasksQuery(user?.id) as { data: Task[] };
  const currentTask = useTasksStore((s) => s.currentTask);
  const timerTask = timerTaskId
    ? (tasks.find((t) => t.id === timerTaskId) ?? currentTask)
    : currentTask;

  const { minutes, seconds } = getFormattedTime(timerValue);
  const percentage =
    duration > 0 ? ((duration - timerValue) / duration) * 100 : 0;
  const isPomodoro = currentTab === POMODORO_TAB;

  const fillColor = isPomodoro
    ? "var(--pomodoro-filled)"
    : "var(--break-filled)";
  const unfilledColor = isPomodoro
    ? "var(--pomodoro-unfilled)"
    : "var(--break-unfilled)";

  return {
    timerValue,
    timerStarted,
    currentTab,
    duration,
    startTimer,
    stopTimer,
    resetTimer,
    currentTask,
    timerTask,
    minutes,
    seconds,
    percentage,
    isPomodoro,
    fillColor,
    unfilledColor,
  };
}
