import { TIMER_CONSTANTS } from "@/features/pomodoro/constants";

const {
  TASK_TIME,
  SHORT_BREAK_TIME,
  LONG_BREAK_TIME,
  POMODORO_TAB,
  SHORT_BREAK_TAB,
  LONG_BREAK_TAB,
} = TIMER_CONSTANTS;

export const getTimeInSeconds = (userMinutes, defaultSeconds) => {
  return userMinutes ? userMinutes * 60 : defaultSeconds;
};

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

export const getLongBreakInterval = (userSettings) => {
  return userSettings?.longBreakInterval || 4;
};

export const getCurrentTime = (tabKey, userSettings) => {
  const { taskTime, shortBreakTime, longBreakTime } =
    getTimerDurations(userSettings);

  if (tabKey === POMODORO_TAB) return taskTime;
  if (tabKey === SHORT_BREAK_TAB) return shortBreakTime;
  if (tabKey === LONG_BREAK_TAB) return longBreakTime;

  return taskTime;
};

export const isFullscreenSupported = () =>
  typeof document !== "undefined" && !!document.fullscreenEnabled;
