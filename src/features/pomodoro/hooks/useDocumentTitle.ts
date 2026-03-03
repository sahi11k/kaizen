import { getFormattedTime, getTabLabel } from "@/features/pomodoro/utils";
import { useTimerStore } from "@/features/pomodoro/store";
import useDocumentTitle from "@/shared/hooks/useDocumentTitle";
import { useMemo } from "react";

const useTimerDocumentTitle = (): void => {
  const currentTab = useTimerStore((s) => s.currentTab);
  const timerValue = useTimerStore((s) => s.timerValue);
  const timerStarted = useTimerStore((s) => s.timerStarted);

  const title = useMemo(() => {
    if (!timerStarted && timerValue === 0) return "";
    const { minutes, seconds } = getFormattedTime(timerValue);
    return `${getTabLabel(currentTab)} : ${minutes}:${seconds}`;
  }, [currentTab, timerValue, timerStarted]);

  useDocumentTitle(title);
};

export default useTimerDocumentTitle;
