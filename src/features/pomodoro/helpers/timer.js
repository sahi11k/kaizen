import { TIMER_CONSTANTS } from "@/features/pomodoro/constants/pomodoro";

const { POMODORO_TAB, SHORT_BREAK_TAB, LONG_BREAK_TAB } = TIMER_CONSTANTS;

/**
 * Formats seconds into a display-friendly time object
 * @param {number} seconds - Total seconds to format
 * @returns {{ minutes: string, seconds: string }} Formatted time with zero-padded values
 */
export const getFormattedTime = (seconds) => {
  const minutes = String(Math.floor(seconds / 60)).padStart(2, "0");
  const remainingSeconds = String(seconds % 60).padStart(2, "0");
  return {
    minutes,
    seconds: remainingSeconds,
  };
};

/**
 * Determines the next timer tab based on current tab and pomodoro count
 * @param {string} currentTab - Current tab key (pomodoro, short_break, long_break)
 * @param {number} pomodoroCount - Current count of completed pomodoros
 * @param {number} longBreakInterval - Number of pomodoros before a long break
 * @returns {string} The next tab key
 */
export const getNextTab = (currentTab, pomodoroCount, longBreakInterval) => {
  if (currentTab === POMODORO_TAB) {
    const nextCount = pomodoroCount + 1;
    return nextCount > 0 && nextCount % longBreakInterval === 0
      ? LONG_BREAK_TAB
      : SHORT_BREAK_TAB;
  }
  // From any break, go back to Pomodoro
  return POMODORO_TAB;
};
