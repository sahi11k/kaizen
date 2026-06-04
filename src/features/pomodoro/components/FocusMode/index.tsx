import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { usePomodoroTimer } from "@/features/pomodoro/hooks";
import { Button } from "@/shared/ui";
import SessionBadge from "@/features/pomodoro/components/SessionBadge";
import TimerControlsFocusMode from "@/features/pomodoro/components/TimerActions/TimerControlsFocusMode";

interface FocusModeProps {
  onExit: () => void;
}

const FocusMode = ({ onExit }: FocusModeProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const {
    timerStarted,
    timerValue,
    duration,
    startTimer,
    stopTimer,
    resetTimer,
    timerTask,
    minutes,
    seconds,
    isPomodoro,
  } = usePomodoroTimer();

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    el.requestFullscreen?.().catch(() => {});
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        onExit();
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, [onExit]);

  const handleExit = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      onExit();
    }
  };

  const handleToggle = () => {
    if (timerStarted) {
      stopTimer();
    } else {
      startTimer(timerTask?.id);
    }
  };

  const progressPercent =
    duration > 0 ? ((duration - timerValue) / duration) * 100 : 0;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[var(--z-modal)] bg-background flex flex-col items-center justify-center select-none gap-20 px-8"
    >
      <Button
        onClick={handleExit}
        variant="icon"
        icon={<X className="size-6" />}
        className="pomodoro-control-button absolute top-6 right-6"
        aria-label="Exit Focus Mode"
      />

      <div className="flex flex-col items-center gap-16 w-full max-w-2xl">
        <SessionBadge
          isPomodoro={isPomodoro}
          currentTask={timerTask}
          className="w-full text-xl"
        />

        <span className="font-number text-[clamp(6rem,20vw,14rem)] tracking-tight leading-none">
          {minutes}
          <span className="mx-2">:</span>
          {seconds}
        </span>

        <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
          <div
            style={{
              width: `${progressPercent}%`,
              backgroundColor: isPomodoro
                ? "var(--primary)"
                : "var(--break-filled)",
            }}
            className="h-full rounded-full transition-[width] duration-500 ease-linear"
          />
        </div>
      </div>
      <TimerControlsFocusMode
        timerStarted={timerStarted}
        handleExit={handleExit}
        handleToggle={handleToggle}
        resetTimer={resetTimer}
        duration={duration}
      />
    </div>
  );
};

export default FocusMode;
