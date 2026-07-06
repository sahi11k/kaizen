import { getFormattedTime } from "@/features/pomodoro/utils";
import { TIMER_CONSTANTS } from "@/features/pomodoro/constants";
import SessionBadge from "@/features/pomodoro/components/SessionBadge";
import TimerProgressBar from "@/features/pomodoro/components/TimerProgressBar";
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
    <div className="w-full max-w-md flex flex-col items-center gap-y-12">
      <SessionBadge
        isPomodoro={currentTab === POMODORO_TAB}
        currentTask={currentTask}
        className="w-full max-w-md"
      />
      <div className="heading-0 !font-mono tracking-tight flex items-center justify-center">
        {minutes}
        <span className="-mt-6">:</span>
        {seconds}
      </div>
      <TimerProgressBar timerValue={timerValue} duration={duration} />
    </div>
  );
};

export default TimerDisplay;
