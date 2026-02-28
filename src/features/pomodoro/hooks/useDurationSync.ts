import { useAuthStore } from "@/features/auth";
import { getCurrentTime } from "@/features/pomodoro/helpers";
import useTimerStore from "@/features/pomodoro/store/timer";
import { useEffect } from "react";

const useDurationSync = () => {
  const currentTab = useTimerStore((s) => s.currentTab);
  const setDuration = useTimerStore((s) => s.setDuration);
  const userSettings = useAuthStore((s) => s.userSettings);

  useEffect(() => {
    setDuration(getCurrentTime(currentTab, userSettings));
  }, [currentTab, userSettings, setDuration]);
};

export default useDurationSync;
