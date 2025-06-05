import { useEffect, useState } from "react";
import { TIMER_CONSTANTS } from "@/utils/constants";

const { ONGOING_TAB, TASK_TIME, SHORT_BREAK_TIME, LONG_BREAK_TIME } =
  TIMER_CONSTANTS;

const useGetTimerValue = ({ activeTab, isLongBreak }) => {
  const [timerValue, setTimerValue] = useState(TASK_TIME);

  useEffect(() => {
    setTimerValue(getCurrentTime(activeTab, isLongBreak));
  }, [activeTab, isLongBreak]);

  return [timerValue, setTimerValue];
};

const getCurrentTime = (tabKey, isLongBreak) => {
  if (tabKey === ONGOING_TAB) {
    return TASK_TIME;
  } else {
    return isLongBreak ? LONG_BREAK_TIME : SHORT_BREAK_TIME;
  }
};

export { useGetTimerValue, getCurrentTime };
