import { useAuthStore } from "@/features/auth";
import { getCurrentTime } from "@/features/pomodoro/utils";
import { useUserSettingsQuery } from "@/features/settings";
import { useTimerStore } from "@/features/pomodoro/store";
import { useEffect, useRef } from "react";

const useDurationSync = () => {
  const currentTab = useTimerStore((s) => s.currentTab);
  const timerStarted = useTimerStore((s) => s.timerStarted);
  const setDuration = useTimerStore((s) => s.setDuration);
  const setTimerValue = useTimerStore((s) => s.setTimerValue);
  const user = useAuthStore((s) => s.user);
  const { data: userSettings } = useUserSettingsQuery(user?.id);

  const timerStartedRef = useRef(timerStarted);
  timerStartedRef.current = timerStarted;

  useEffect(() => {
    const duration = getCurrentTime(currentTab, userSettings);

    setDuration(duration);

    if (!timerStartedRef.current) {
      setTimerValue(duration);
    }
  }, [currentTab, userSettings, setDuration, setTimerValue]);
};

export default useDurationSync;
