import { useEffect, useRef, useState } from "react";

import { useAuthStore } from "@/features/auth";
import { useTimerStore } from "@/features/pomodoro/store";
import { getCurrentTime } from "@/features/pomodoro/utils";
import { useUserSettingsQuery } from "@/features/settings";
import usePomodoroTimer from "./usePomodoroTimer";

export default function useTimerContainer() {
  const timer = usePomodoroTimer();
  const { currentTask, duration, resetTimer, timerStarted } = timer;

  const [focusModeOpen, setFocusModeOpen] = useState(false);
  const [pendingTab, setPendingTab] = useState<string | null>(null);

  const setTab = useTimerStore((state) => state.setTab);

  const user = useAuthStore((state) => state.user);
  const { data: userSettings } = useUserSettingsQuery(user?.id);

  const prevTaskIdRef = useRef(currentTask?.id);

  useEffect(() => {
    if (prevTaskIdRef.current === currentTask?.id) return;

    prevTaskIdRef.current = currentTask?.id;
    resetTimer(duration);
  }, [currentTask?.id, duration, resetTimer]);

  const handleTabChange = (tab: string) => {
    if (timerStarted) {
      setPendingTab(tab);
      return;
    }

    setTab(tab, getCurrentTime(tab, userSettings));
  };

  const confirmTabSwitch = () => {
    if (!pendingTab) return;

    setTab(pendingTab, getCurrentTime(pendingTab, userSettings));
    setPendingTab(null);
  };

  const handleResetTimer = () => {
    resetTimer(duration);
  };

  return {
    ...timer,
    focusModeOpen,
    pendingTab,
    handleTabChange,
    confirmTabSwitch,
    handleResetTimer,
    closeFocusMode: () => setFocusModeOpen(false),
    openFocusMode: () => setFocusModeOpen(true),
    cancelTabSwitch: () => setPendingTab(null),
  };
}
