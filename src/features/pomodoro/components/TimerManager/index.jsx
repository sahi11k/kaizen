import {
  useDurationSync,
  useTimerDocumentTitle,
  useTimerCompletion,
} from "@/features/pomodoro/hooks";

/**
 * Headless component that manages timer side effects globally:
 * - Syncs duration with user settings and current tab
 * - Updates document title with timer countdown
 * - Handles timer completion (session API calls + auto-advance to next phase)
 * - Plays completion sound
 *
 * Must be mounted in DashboardLayout to persist across route changes.
 */
const TimerManager = () => {
  useDurationSync();
  useTimerDocumentTitle();
  useTimerCompletion();
  return null;
};

export default TimerManager;
