import { useAuthStore } from "@/features/auth";
import { getCurrentTime } from "@/features/pomodoro/helpers";
import { useUserSettingsQuery } from "@/features/settings";
import { useTimerStore } from "@/features/pomodoro/store";
import { useEffect } from "react";

const useDurationSync = () => {
  const currentTab = useTimerStore((s) => s.currentTab);
  const setDuration = useTimerStore((s) => s.setDuration);
  const user = useAuthStore((s) => s.user);
  const { data: userSettings } = useUserSettingsQuery(user?.id);

  useEffect(() => {
    setDuration(getCurrentTime(currentTab, userSettings));
  }, [currentTab, userSettings, setDuration]);
};

export default useDurationSync;
