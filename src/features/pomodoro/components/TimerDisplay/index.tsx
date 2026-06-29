import { getFormattedTime } from "@/features/pomodoro/utils";
import { TIMER_CONSTANTS } from "@/features/pomodoro/constants";
import SessionBadge from "@/features/pomodoro/components/SessionBadge";
import React, { ReactNode } from "react";

const { POMODORO_TAB } = TIMER_CONSTANTS;

interface CurrentTask {
  completedSessions: number;
  title: string;
  totalSessions: number;
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
  const { minutes, seconds } = getFormattedTime(timerValue);

  return (
    <div className="w-full max-w-lg flex flex-col items-center gap-1">
      <SessionBadge
        isPomodoro={currentTab === POMODORO_TAB}
        currentTask={currentTask}
        className="w-full"
      />
      <div className="font-number flex items-center justify-center text-[clamp(100px,16vw,180px)] tracking-tight">
        {minutes}
        <span className="-mt-4">:</span>
        {seconds}
      </div>
      <div
        className="w-full h-2 rounded-full overflow-hidden"
        style={{
          backgroundColor: "var(--color-primary-soft)",
        }}
      >
        <div
          style={{
            width: `${duration > 0 ? ((duration - timerValue) / duration) * 100 : 0}%`,
            backgroundColor: "var(--color-primary-soft-foreground)",
          }}
          className="h-full rounded-full transition-[width] duration-500 ease-linear"
        />
      </div>
    </div>
  );
};

export default TimerDisplay;
