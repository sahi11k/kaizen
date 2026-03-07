import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useLocation } from "react-router";
import { useTimerStore, usePipStore } from "@/features/pomodoro/store";
import { openPipWindow, syncPipTheme } from "@/features/pomodoro/services/pip";
import PipTimerContent from "@/features/pomodoro/components/Pip/Content";
import { useThemeStore, THEME } from "@/features/theme";

const POMODORO_PATH = "/dashboard/pomodoro";

/**
 * Headless component that manages the PIP window lifecycle.
 *
 * - Auto-opens PIP when the user navigates away from /dashboard/pomodoro
 *   while the timer is running (relies on transient user activation from the
 *   sidebar click).
 * - Attempts PIP on tab visibility change (may silently fail without gesture).
 * - PIP stays open on /pomodoro — user can also open it manually via the
 *   footer button in TimerContent.
 * - Renders PipTimerContent into the PIP window via createPortal.
 *
 * Must be mounted in DashboardLayout alongside TimerStateManager.
 */
const PipManager = () => {
  const { pathname } = useLocation();
  const pipContainer = usePipStore((s) => s.pipContainer);

  const timerStarted = useTimerStore((s) => s.timerStarted);

  const isOnPomodoro = pathname === POMODORO_PATH;
  const prevOnPomodoroRef = useRef(isOnPomodoro);

  // --- Auto-open PIP when navigating away from the pomodoro page ---
  useEffect(() => {
    const wasOnPomodoro = prevOnPomodoroRef.current;
    prevOnPomodoroRef.current = isOnPomodoro;

    if (wasOnPomodoro && !isOnPomodoro && timerStarted) {
      openPipWindow();
    }
  }, [isOnPomodoro, timerStarted]);

  // --- Attempt PIP on tab visibility change ---
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden && timerStarted) {
        openPipWindow();
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibility);
  }, [timerStarted]);

  // --- Sync PiP window theme when theme changes ---
  useEffect(() => {
    const unsub = useThemeStore.subscribe((state) => {
      syncPipTheme(state.theme === THEME.DARK);
    });
    return unsub;
  }, []);

  // --- Render PipTimerContent into the PIP window via portal ---
  if (!pipContainer) return null;
  return createPortal(<PipTimerContent />, pipContainer);
};

export default PipManager;
