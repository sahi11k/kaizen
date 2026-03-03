import { useBlocker } from "react-router";
import { useTimerStore } from "@/features/pomodoro/store";
import useIsMobile from "@/shared/hooks/useIsMobile";
import TimerWarningDialog from "@/features/pomodoro/components/TimerWarningDialog";

const TimerNavigationGuard = () => {
  const isMobile = useIsMobile();
  const timerStarted = useTimerStore((s) => s.timerStarted);

  const blocker = useBlocker(isMobile && timerStarted);

  const handleStay = () => {
    blocker.reset?.();
  };

  const handleLeave = () => {
    useTimerStore.getState().resetTimer(0);
    blocker.proceed?.();
  };

  return (
    <TimerWarningDialog
      open={blocker.state === "blocked"}
      onConfirm={handleLeave}
      onCancel={handleStay}
    />
  );
};

export default TimerNavigationGuard;
