import { TIMER_CONSTANTS } from "@/features/pomodoro/constants";
import { getTimerDurations } from "@/features/pomodoro/utils/timer";

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

/**
 * Returns a human-readable label for the given timer tab
 * @param {string} tab - Tab key (pomodoro, short_break, long_break)
 * @returns {string} Display label
 */
export const getTabLabel = (tab) => {
  if (tab === POMODORO_TAB) return "Pomodoro";
  if (tab === SHORT_BREAK_TAB) return "Short Break";
  return "Long Break";
};

/**
 * Gets the timer duration in seconds for the given tab and user settings
 * @param {string} tabKey - Current tab key (pomodoro, short_break, long_break)
 * @param {Object} userSettings - User settings object
 * @returns {number} Timer duration in seconds
 */
export const getCurrentTime = (tabKey, userSettings) => {
  const { taskTime, shortBreakTime, longBreakTime } =
    getTimerDurations(userSettings);

  if (tabKey === POMODORO_TAB) return taskTime;
  if (tabKey === SHORT_BREAK_TAB) return shortBreakTime;
  if (tabKey === LONG_BREAK_TAB) return longBreakTime;

  return taskTime;
};
