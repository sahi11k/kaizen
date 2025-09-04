import { useEffect, useState } from "react";

import { getTimerDurations } from "@/utils/timerHelpers";
import { TIMER_CONSTANTS } from "@/constants/pomodoro";

const { POMODORO_TAB, SHORT_BREAK_TAB, LONG_BREAK_TAB } = TIMER_CONSTANTS;

const useGetTimerValue = ({ activeTab, userSettings }) => {
  const getInitialTime = () => {
    return getCurrentTime(activeTab, userSettings);
  };

  const [timerValue, setTimerValue] = useState(getInitialTime);

  useEffect(() => {
    setTimerValue(getCurrentTime(activeTab, userSettings));
  }, [activeTab, userSettings]);

  return [timerValue, setTimerValue];
};

const getCurrentTime = (tabKey, userSettings) => {
  const { taskTime, shortBreakTime, longBreakTime } =
    getTimerDurations(userSettings);

  if (tabKey === POMODORO_TAB) return taskTime;
  if (tabKey === SHORT_BREAK_TAB) return shortBreakTime;
  if (tabKey === LONG_BREAK_TAB) return longBreakTime;

  return taskTime;
};

export { useGetTimerValue, getCurrentTime };
