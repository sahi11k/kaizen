import { TIMER_CONSTANTS } from "@/features/pomodoro/constants";

const { TASK_TIME, SHORT_BREAK_TIME, LONG_BREAK_TIME } = TIMER_CONSTANTS;

/**
 * Helper function to get time in seconds with fallback to default
 * @param {number} userMinutes - User setting in minutes
 * @param {number} defaultSeconds - Default fallback in seconds
 * @returns {number} Time in seconds
 */
export const getTimeInSeconds = (userMinutes, defaultSeconds) => {
  return userMinutes ? userMinutes * 60 : defaultSeconds;
};

/**
 * Get all timer durations based on user settings
 * @param {Object} userSettings - User settings object
 * @returns {Object} Timer durations in seconds
 */
export const getTimerDurations = (userSettings) => ({
  taskTime: getTimeInSeconds(userSettings?.pomodoroDuration, TASK_TIME),
  shortBreakTime: getTimeInSeconds(
    userSettings?.shortBreakDuration,
    SHORT_BREAK_TIME,
  ),
  longBreakTime: getTimeInSeconds(
    userSettings?.longBreakDuration,
    LONG_BREAK_TIME,
  ),
});

/**
 * Get long break interval from user settings with fallback
 * @param {Object} userSettings - User settings object
 * @returns {number} Long break interval
 */
export const getLongBreakInterval = (userSettings) => {
  return userSettings?.longBreakInterval || 4;
};
