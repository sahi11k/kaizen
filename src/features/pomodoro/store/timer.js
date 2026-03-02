import { create } from "zustand";
import { TIMER_CONSTANTS } from "@/features/pomodoro/constants";

const { POMODORO_TAB } = TIMER_CONSTANTS;

const useTimerStore = create((set, get) => {
  let intervalId = null;

  const clearTimer = () => {
    if (!intervalId) return;
    clearInterval(intervalId);
    intervalId = null;
  };

  return {
    timerValue: 0,
    timerStarted: false,
    currentTab: POMODORO_TAB,
    pomodoroCount: 0,
    duration: 0,
    completionCount: 0,
    timerTaskId: null,

    setTimerValue: (timerValue) => set({ timerValue }),
    setDuration: (duration) => set({ duration }),

    startTimer: (taskId) => {
      if (get().timerStarted) return;

      intervalId = setInterval(() => {
        const { timerValue } = get();
        if (timerValue <= 0) {
          clearTimer();
          set((state) => ({
            timerValue: 0,
            timerStarted: false,
            completionCount: state.completionCount + 1,
          }));
          return;
        }
        set({ timerValue: timerValue - 1 });
      }, 1000);

      set({ timerStarted: true, timerTaskId: taskId ?? get().timerTaskId });
    },

    stopTimer: () => {
      clearTimer();
      set({ timerStarted: false });
    },

    resetTimer: (timerValue) => {
      clearTimer();
      set({ timerStarted: false, timerValue, timerTaskId: null });
    },

    setTab: (tab, timerValue) => {
      clearTimer();
      set({ currentTab: tab, timerStarted: false, timerValue, timerTaskId: null });
    },

    incrementPomodoroCount: () =>
      set((state) => ({ pomodoroCount: state.pomodoroCount + 1 })),
  };
});

export default useTimerStore;
