import React from "react";
import { Button } from "@/shared/ui";
import PlayPauseButton from "../PlayPauseButton";
import ResetTimerButton from "../ResetTimerButton";
import { Minimize } from "lucide-react";

interface TimerControlsFocusModeProps {
  timerStarted: boolean;
  handleExit: () => void;
  handleToggle: () => void;
  resetTimer: (duration: number) => void;
  duration: number;
}

const TimerControlsFocusMode = ({
  handleExit,
  handleToggle,
  timerStarted,
  resetTimer,
  duration,
}: TimerControlsFocusModeProps): React.ReactNode => (
  <div className="flex shrink-0 items-center justify-center gap-6">
    <Button
      onClick={handleExit}
      variant="icon"
      icon={<Minimize />}
      className="pomodoro-control-button"
      aria-label="Minimize"
    />
    <PlayPauseButton
      timerStarted={timerStarted}
      onStart={handleToggle}
      onStop={handleToggle}
    />
    <ResetTimerButton
      onClick={() => resetTimer(duration)}
      showTooltip={false}
    />
  </div>
);

export default TimerControlsFocusMode;
