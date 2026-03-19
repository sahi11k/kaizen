import { getFormattedTime } from "@/features/pomodoro/utils";
import { TIMER_CONSTANTS } from "@/features/pomodoro/constants";
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
  const { minutes, seconds } = getFormattedTime(timerValue);

  return (
    <div className="w-full max-w-120 flex flex-col items-center gap-2">
      <SessionBadge
        isPomodoro={currentTab === POMODORO_TAB}
        currentTask={currentTask}
        className="w-full"
      />
      <div className="flex items-center justify-center text-[clamp(100px,16vw,160px)] font-semibold">
        {minutes}
        <span className="mx-1 -mt-2">:</span>
        {seconds}
      </div>
      <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
        <div
          style={{
            width: `${duration > 0 ? ((duration - timerValue) / duration) * 100 : 0}%`,
            backgroundColor:
              currentTab === POMODORO_TAB
                ? "var(--primary)"
                : "var(--break-filled)",
          }}
          className="h-full rounded-full transition-[width] duration-500 ease-linear"
        />
      </div>
    </div>
  );
};

export default TimerDisplay;
