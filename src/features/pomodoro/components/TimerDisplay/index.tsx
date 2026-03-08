import { getFormattedTime } from "@/features/pomodoro/utils";
import { TIMER_CONSTANTS } from "@/features/pomodoro/constants";
import ProgressRing from "@/features/pomodoro/components/ProgressRing";
import SessionBadge from "@/features/pomodoro/components/SessionBadge";
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
      <SessionBadge
        isPomodoro={currentTab === POMODORO_TAB}
        currentTask={currentTask}
        className="mx-auto max-w-100"
      />

      <ProgressRing
        percentage={percentage}
        fillColor={fillColor}
        unfilledColor={unfilledColor}
        className="w-64 h-64 md:h-72 md:w-72 lg:h-80 lg:w-80 xl:h-96 xl:w-96"
      >
        <div className="heading-1">
          <span>{minutes}</span>
          <span className="vertical-line">:</span>
          <span>{seconds}</span>
        </div>
      </ProgressRing>
    </>
  );
};

export default TimerDisplay;
