import React, { useEffect, useRef } from "react";
import { X, Minimize } from "lucide-react";
import { usePomodoroTimer } from "@/features/pomodoro/hooks";
import { Button } from "@/shared/ui";
import ProgressRing from "@/features/pomodoro/components/ProgressRing";
import {
  ResetTimerButton,
  PlayPauseButton,
} from "@/features/pomodoro/components/TimerControls";
import SessionBadge from "@/features/pomodoro/components/SessionBadge";

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

      <SessionBadge
        isPomodoro={isPomodoro}
        currentTask={timerTask}
        className="max-w-[80%] mb-10"
      />

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
