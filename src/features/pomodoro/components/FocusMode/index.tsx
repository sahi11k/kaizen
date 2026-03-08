import React, { useEffect, useRef } from "react";
import { X, Minimize } from "lucide-react";
import { getTabLabel } from "@/features/pomodoro/utils";
import { usePomodoroTimer } from "@/features/pomodoro/hooks";
import { Button } from "@/shared/ui";
import ProgressRing from "@/features/pomodoro/components/ProgressRing";
import {
  ResetTimerButton,
  PlayPauseButton,
} from "@/features/pomodoro/components/TimerControls";

interface FocusModeProps {
  onExit: () => void;
}

const FocusMode = ({ onExit }: FocusModeProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const {
    timerStarted,
    currentTab,
    duration,
    startTimer,
    stopTimer,
    resetTimer,
    timerTask,
    minutes,
    seconds,
    percentage,
    isPomodoro,
    fillColor,
    unfilledColor,
  } = usePomodoroTimer();

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    el.requestFullscreen?.().catch(() => {
      // Fullscreen denied (e.g. user gesture requirement) — stay as overlay
    });
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

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[var(--z-modal)] bg-background flex flex-col items-center justify-center select-none"
    >
      <Button
        onClick={handleExit}
        variant="icon"
        icon={<X className="size-6" />}
        className="absolute top-6 right-6"
        aria-label="Exit Focus Mode"
      />

      <span className="text-muted-foreground text-sm font-medium tracking-wide uppercase mb-8">
        {getTabLabel(currentTab)}
      </span>

      {isPomodoro && (
        <div className="bg-muted py-2 px-6 rounded-full max-w-[80%] mb-10">
          <div className="flex items-center justify-center gap-2 font-semibold">
            <span className="text-muted-foreground shrink-0">
              {timerTask
                ? `Session #${timerTask.completedSessions + 1} : `
                : ""}
            </span>
            <span className="whitespace-nowrap overflow-hidden text-ellipsis">
              {timerTask?.title || "Focus Time!"}
            </span>
          </div>
        </div>
      )}

      <ProgressRing
        percentage={percentage}
        fillColor={fillColor}
        unfilledColor={unfilledColor}
        className="w-72 h-72 md:w-96 md:h-96 lg:w-[28rem] lg:h-[28rem] mb-12"
      >
        <span className="text-6xl md:text-7xl lg:text-8xl font-semibold tabular-nums">
          {minutes}
          <span className="mx-1">:</span>
          {seconds}
        </span>
      </ProgressRing>

      <div className="flex items-center gap-6">
        <Button
          onClick={handleExit}
          variant="icon"
          icon={<Minimize />}
          className="rounded-full w-12 !h-12"
          aria-label="Minimize"
        />
        <PlayPauseButton
          timerStarted={timerStarted}
          onStart={handleToggle}
          onStop={handleToggle}
          showTooltip={false}
        />
        <ResetTimerButton
          onClick={() => resetTimer(duration)}
          showTooltip={false}
        />
      </div>
    </div>
  );
};

export default FocusMode;
