import { usePomodoroTimer } from "@/features/pomodoro/hooks";
import ProgressBar from "@/features/pomodoro/components/ProgressBar";
import SessionBadge from "@/features/pomodoro/components/SessionBadge";
import { PlayPauseButton } from "@/features/pomodoro/components/TimerControls";

/**
 * Compact timer UI rendered inside the Document PiP window.
 * Shows task info, timer countdown, play/pause icon button,
 * and a progress bar fixed at the bottom.
 */
const PipTimerContent = () => {
  const {
    timerStarted,
    startTimer,
    stopTimer,
    timerTask,
    minutes,
    seconds,
    percentage,
    isPomodoro,
    fillColor,
    unfilledColor,
  } = usePomodoroTimer();

  return (
    <div className="relative flex flex-col justify-center items-center gap-6 h-full bg-background text-foreground p-5 pb-7 select-none">
      <SessionBadge
        isPomodoro={isPomodoro}
        currentTask={timerTask}
        className="py-1.5 px-4 max-w-[90%] text-sm"
      />

      {/* Timer display */}
      <span className="text-6xl font-semibold tabular-nums leading-none">
        {minutes}:{seconds}
      </span>

      <PlayPauseButton
        timerStarted={timerStarted}
        onStart={() => startTimer(timerTask?.id)}
        onStop={stopTimer}
        className="!size-12"
        showLabel={false}
      />

      <ProgressBar
        percentage={percentage}
        fillColor={fillColor}
        unfilledColor={unfilledColor}
        className="absolute top-0 left-0"
      />
    </div>
  );
};

export default PipTimerContent;
