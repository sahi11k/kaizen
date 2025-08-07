import { useEffect, useState } from "react";
import { TIMER_CONSTANTS } from "@/utils/constants";
import { getTimerDurations } from "@/utils/timerHelpers";

const { ONGOING_TAB } = TIMER_CONSTANTS;

const useGetTimerValue = ({ activeTab, isLongBreak, userSettings }) => {
  const getInitialTime = () => {
    const { taskTime } = getTimerDurations(userSettings);
    return taskTime;
  };

  const [timerValue, setTimerValue] = useState(getInitialTime);

  useEffect(() => {
    setTimerValue(getCurrentTime(activeTab, isLongBreak, userSettings));
  }, [activeTab, isLongBreak, userSettings]);

  return [timerValue, setTimerValue];
};

const getCurrentTime = (tabKey, isLongBreak, userSettings) => {
  const { taskTime, shortBreakTime, longBreakTime } =
    getTimerDurations(userSettings);

  if (tabKey === ONGOING_TAB) {
    return taskTime;
  }

  return isLongBreak ? longBreakTime : shortBreakTime;
};

export { useGetTimerValue, getCurrentTime };
