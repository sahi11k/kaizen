import { getFormattedTime } from "@/features/pomodoro/utils";
import { TIMER_CONSTANTS } from "@/features/pomodoro/constants";
import React, { ReactNode } from "react";

const { POMODORO_TAB } = TIMER_CONSTANTS;

interface CurrentTask {
  completedSessions: number;
  title: string;
}

interface TimerDisplayProps {
  timerValue: number;
  duration: number;
  currentTab: string;
  currentTask: CurrentTask | null;
}

const TimerDisplay = ({
  timerValue,
  duration,
  currentTab,
  currentTask,
}: TimerDisplayProps): ReactNode => {
  const percentage = ((duration - timerValue) / duration) * 100;
  const fillColor =
    currentTab === POMODORO_TAB
      ? "var(--pomodoro-filled)"
      : "var(--break-filled)";
  const unfilledColor =
    currentTab === POMODORO_TAB
      ? "var(--pomodoro-unfilled)"
      : "var(--break-unfilled)";

  const { minutes, seconds } = getFormattedTime(timerValue);

  return (
    <>
      <div className="mx-auto bg-muted py-2 px-6 rounded-full max-w-100">
        <div className="flex items-center justify-center gap-2 font-semibold">
          {currentTab === POMODORO_TAB ? (
            <>
              <span className="text-muted-foreground shrink-0">
                {currentTask
                  ? `Session #${currentTask?.completedSessions + 1} : `
                  : ""}
              </span>
              <span className="whitespace-nowrap overflow-hidden text-ellipsis">
                {currentTask?.title || "Focus Time!"}
              </span>
            </>
          ) : (
            <span>Yay! Break Time</span>
          )}
        </div>
      </div>

      <div className="w-64 h-64 md:h-72 md:w-72 lg:h-80 lg:w-80 xl:h-96 xl:w-96 relative">
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: `conic-gradient(${fillColor} ${percentage}%, ${unfilledColor} ${percentage}% 100%)`,
          }}
        />

        <div className="absolute inset-4 bg-background rounded-full flex justify-center items-center heading-1">
          <span>{minutes}</span>
          <span className="vertical-line">:</span>
          <span>{seconds}</span>
        </div>
      </div>
    </>
  );
};

export default TimerDisplay;
