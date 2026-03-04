import { useAuthStore } from "@/features/auth";
import { TIMER_CONSTANTS } from "@/features/pomodoro/constants";
import {
  getCurrentTime,
  getNextTab,
  getLongBreakInterval,
} from "@/features/pomodoro/utils";
import { useTimerSound } from "@/features/pomodoro/hooks";
import { useRecordPomodoroCompletionMutation } from "@/features/pomodoro/mutations";
import { useTasksStore, useTimerStore } from "@/features/pomodoro/store";
import { Task } from "@/features/pomodoro/types";
import { queryKeys } from "@/shared/constants";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
const { POMODORO_TAB } = TIMER_CONSTANTS;

const useTimerCompletion = () => {
  const { play } = useTimerSound();
  const completingRef = useRef(false);
  const queryClient = useQueryClient();
  const { mutate: recordPomodoroCompletion } =
    useRecordPomodoroCompletionMutation();
  const completionCount = useTimerStore((s) => s.completionCount);
  const prevCompletionRef = useRef(completionCount);

  useEffect(() => {
    const shouldHandle = completionCount > prevCompletionRef.current;
    prevCompletionRef.current = completionCount;
    if (!shouldHandle) return;

    const handleComplete = () => {
      if (completingRef.current) return;
      completingRef.current = true;

      try {
        play("timerEnd");

        const { currentTab, pomodoroCount, duration, timerTaskId } =
          useTimerStore.getState();
        const { user } = useAuthStore.getState();
        const tasks =
          queryClient.getQueryData<Task[]>(queryKeys.tasks.all(user?.id)) ?? [];
        const currentTask = useTasksStore.getState().currentTask;

        const timerTask = timerTaskId
          ? (tasks.find((t) => t.id === timerTaskId) ?? null)
          : currentTask;

        const preIncrementCount = pomodoroCount;

        if (currentTab === POMODORO_TAB) {
          useTimerStore.getState().incrementPomodoroCount();

          if (timerTask && user?.id) {
            recordPomodoroCompletion({
              task: timerTask,
              userId: user.id,
              duration,
            });
          }
        }

        const userSettings = queryClient.getQueryData(
          queryKeys.userSettings.all(user?.id),
        );

        advanceToNextPhase(currentTab, preIncrementCount, userSettings);
      } finally {
        completingRef.current = false;
      }
    };

    handleComplete();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [completionCount]);
};

const advanceToNextPhase = (currentTab, pomodoroCount, settings) => {
  const longBreakInterval = getLongBreakInterval(settings);
  const nextTab = getNextTab(currentTab, pomodoroCount, longBreakInterval);
  const nextDuration = getCurrentTime(nextTab, settings);
  useTimerStore.getState().setTab(nextTab, nextDuration);
};

export default useTimerCompletion;
