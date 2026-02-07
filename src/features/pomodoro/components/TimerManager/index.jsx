import { useEffect, useRef } from "react";
import useTimerStore from "@/features/pomodoro/store/timer";
import useTasksStore from "@/features/pomodoro/store/tasks";
import useAuthStore from "@/features/auth/store/auth";
import useSound from "@/features/pomodoro/hooks/useSound";
import { addTaskSession, updateTask } from "@/features/pomodoro/api/tasks";
import { TIMER_CONSTANTS } from "@/features/pomodoro/constants/pomodoro";
import {
  getLongBreakInterval,
  getTimerDurations,
} from "@/features/pomodoro/utils/timer";
import {
  getFormattedTime,
  getNextTab,
} from "@/features/pomodoro/helpers/timer";
import { getCurrentTime } from "@/features/pomodoro/hooks/useGetTimerValue";

const { POMODORO_TAB, SHORT_BREAK_TAB } = TIMER_CONSTANTS;

/**
 * Headless component that manages timer side effects globally:
 * - Syncs duration with user settings and current tab
 * - Updates document title with timer countdown
 * - Handles timer completion (session API calls + auto-advance to next phase)
 * - Plays completion sound
 *
 * Must be mounted in DashboardLayout to persist across route changes.
 */
const TimerManager = () => {
  const { play } = useSound();
  const completingRef = useRef(false);

  const completionCount = useTimerStore((s) => s.completionCount);
  const currentTab = useTimerStore((s) => s.currentTab);
  const timerValue = useTimerStore((s) => s.timerValue);
  const timerStarted = useTimerStore((s) => s.timerStarted);
  const setDuration = useTimerStore((s) => s.setDuration);
  const userSettings = useAuthStore((s) => s.userSettings);

  const prevCompletionRef = useRef(completionCount);

  // Sync duration with current tab and user settings
  useEffect(() => {
    const { taskTime, shortBreakTime, longBreakTime } =
      getTimerDurations(userSettings);
    setDuration(
      currentTab === POMODORO_TAB
        ? taskTime
        : currentTab === SHORT_BREAK_TAB
          ? shortBreakTime
          : longBreakTime,
    );
  }, [currentTab, userSettings, setDuration]);

  // Update document title with timer countdown
  useEffect(() => {
    if (!timerStarted && timerValue === 0) return;
    const { minutes, seconds } = getFormattedTime(timerValue);
    const titlePrefix =
      currentTab === POMODORO_TAB
        ? "Pomodoro"
        : currentTab === SHORT_BREAK_TAB
          ? "Short Break"
          : "Long Break";
    document.title = `${titlePrefix} : ${minutes}:${seconds}`;
  }, [currentTab, timerValue, timerStarted]);

  // Handle timer completion
  useEffect(() => {
    if (completionCount > prevCompletionRef.current) {
      handleTimerComplete();
    }
    prevCompletionRef.current = completionCount;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [completionCount]);

  const handleTimerComplete = async () => {
    if (completingRef.current) return;
    completingRef.current = true;

    play("timerEnd");

    // Read fresh state from all stores to avoid stale closures
    const { currentTab, pomodoroCount, duration, timerTaskId } =
      useTimerStore.getState();
    const { user } = useAuthStore.getState();
    const tasksState = useTasksStore.getState();
    const { tasks, taskSessions } = tasksState;

    // Use the task the timer was started for, not the currently selected task
    const timerTask = timerTaskId
      ? (tasks.find((t) => t.id === timerTaskId) ?? null)
      : tasksState.currentTask;

    // Save pre-increment count — getNextTab internally adds 1
    const preIncrementCount = pomodoroCount;

    // Finish session if completing a pomodoro phase
    if (currentTab === POMODORO_TAB) {
      useTimerStore.getState().incrementPomodoroCount();

      if (timerTask && user?.id) {
        const completedSessions = timerTask.completedSessions + 1;
        const completed = completedSessions >= timerTask.totalSessions;

        const res = await updateTask(
          {
            id: timerTask.id,
            completedSessions,
            completed,
            timeSpent: timerTask.timeSpent + duration / 60,
          },
          user.id,
        );
        const sessionRes = await addTaskSession(
          {
            task_id: timerTask.id,
            duration: duration / 60,
            status: completed,
          },
          user.id,
        );

        if (!sessionRes.error) {
          tasksState.setTaskSessions([...taskSessions, ...sessionRes.data]);
        }

        if (res.error) {
          console.error("Failed to update task:", res.error);
        } else {
          tasksState.updateTask(res.data[0]);
          tasksState.setCurrentTask(res.data[0]);
        }
      }
    }

    // Advance to next tab
    const freshSettings = useAuthStore.getState().userSettings;
    const longBreakInterval = getLongBreakInterval(freshSettings);
    const next = getNextTab(currentTab, preIncrementCount, longBreakInterval);
    const value = getCurrentTime(next, freshSettings);
    useTimerStore.getState().setTab(next, value);

    completingRef.current = false;
  };

  return null;
};

export default TimerManager;
