import {
  useDurationSync,
  useTimerDocumentTitle,
  useTimerCompletion,
  useTimerSound,
} from "@/features/pomodoro/hooks";
import { useTimerStore } from "@/features/pomodoro/store";
import { useEffect, useRef } from "react";

/**
 * Headless component that manages timer side effects globally:
 * - Syncs duration with user settings and current tab
 * - Updates document title with timer countdown
 * - Handles timer completion (session API calls + auto-advance to next phase)
 * - Plays completion sound
 *
 * Must be mounted in DashboardLayout to persist across route changes.
 */
const TimerStateManager = () => {
  useDurationSync();
  useTimerDocumentTitle();
  useTimerCompletion();

  const timerStarted = useTimerStore((state) => state.timerStarted);
  const previousTimerStarted = useRef(timerStarted);
  const { play } = useTimerSound();

  useEffect(() => {
    if (timerStarted && !previousTimerStarted.current) {
      play("timerStart");
    }

    previousTimerStarted.current = timerStarted;
  }, [timerStarted, play]);

  return null;
};

export default TimerStateManager;
