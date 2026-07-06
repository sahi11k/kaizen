import React, { ReactNode } from "react";

interface TimerProgressBarProps {
  timerValue: number;
  duration: number;
}

const TimerProgressBar = ({
  timerValue,
  duration,
}: TimerProgressBarProps): ReactNode => {
  const progress =
    duration > 0 ? ((duration - timerValue) / duration) * 100 : 0;

  return (
    <div
      className="w-full h-2 rounded-full overflow-hidden"
      style={{
        backgroundColor: "var(--color-primary-soft)",
      }}
    >
      <div
        style={{
          width: `${progress}%`,
          backgroundColor: "var(--color-primary-soft-foreground)",
        }}
        className="h-full rounded-full transition-[width] duration-500 ease-linear"
      />
    </div>
  );
};

export default TimerProgressBar;
