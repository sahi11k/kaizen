import { useAuthStore } from "@/features/auth";
import { TIMER_CONSTANTS } from "@/features/pomodoro/constants/pomodoro";
import { getCurrentTime, getNextTab } from "@/features/pomodoro/helpers";
import useSound from "@/features/pomodoro/hooks/useSound";
import { useRecordPomodoroCompletionMutation } from "@/features/pomodoro/services/mutations";
import useTasksStore from "@/features/pomodoro/store/tasks";
import useTimerStore from "@/features/pomodoro/store/timer";
import { Task } from "@/features/pomodoro/types";
import { getLongBreakInterval } from "@/features/pomodoro/utils/timer";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
const { POMODORO_TAB } = TIMER_CONSTANTS;

const useTimerCompletion = () => {
  const { play } = useSound();
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
          queryClient.getQueryData<Task[]>(["tasks", user?.id]) ?? [];
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

        advanceToNextPhase(currentTab, preIncrementCount);
      } finally {
        completingRef.current = false;
      }
    };

    handleComplete();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [completionCount]);
};

const advanceToNextPhase = (currentTab, pomodoroCount) => {
  const settings = useAuthStore.getState().userSettings;
  const longBreakInterval = getLongBreakInterval(settings);
  const nextTab = getNextTab(currentTab, pomodoroCount, longBreakInterval);
  const nextDuration = getCurrentTime(nextTab, settings);
  useTimerStore.getState().setTab(nextTab, nextDuration);
};

export default useTimerCompletion;
