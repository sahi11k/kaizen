import { TIMER_CONSTANTS } from "@/features/pomodoro/constants";

const { POMODORO_TAB, SHORT_BREAK_TAB, LONG_BREAK_TAB } = TIMER_CONSTANTS;

export const getNextTab = (
  currentTab: string,
  pomodoroCount: number,
  longBreakInterval: number,
): string => {
  if (currentTab === POMODORO_TAB) {
    const nextCount = pomodoroCount + 1;
    return nextCount > 0 && nextCount % longBreakInterval === 0
      ? LONG_BREAK_TAB
      : SHORT_BREAK_TAB;
  }
  return POMODORO_TAB;
};

export const getTabLabel = (tab: string): string => {
  if (tab === POMODORO_TAB) return "Pomodoro";
  if (tab === SHORT_BREAK_TAB) return "Short Break";
  return "Long Break";
};
