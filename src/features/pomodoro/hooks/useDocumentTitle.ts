import { getFormattedTime, getTabLabel } from "@/features/pomodoro/helpers";
import { useTimerStore } from "@/features/pomodoro/store";
import { useEffect } from "react";

const useDocumentTitle = () => {
  const currentTab = useTimerStore((s) => s.currentTab);
  const timerValue = useTimerStore((s) => s.timerValue);
  const timerStarted = useTimerStore((s) => s.timerStarted);

  useEffect(() => {
    if (!timerStarted && timerValue === 0) return;
    const { minutes, seconds } = getFormattedTime(timerValue);
    document.title = `${getTabLabel(currentTab)} : ${minutes}:${seconds}`;
  }, [currentTab, timerValue, timerStarted]);
};

export default useDocumentTitle;
