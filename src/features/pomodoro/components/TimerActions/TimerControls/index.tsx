import React from "react";

import FocusModeButton from "../FocusModeButton";
import PipButton from "../PipButton";
import PlayPauseButton from "../PlayPauseButton";
import ResetTimerButton from "../ResetTimerButton";
import PomodoroSettings from "../PomodoroSettingsButton";
import TimerActionGroup from "../TimerActionGroup";

interface TimerControlsProps {
  timerStarted: boolean;
  onFocusMode: () => void;
  onReset: () => void;
  onStart: () => void;
  onStop: () => void;
}

const TimerControls = ({
  timerStarted,
  onFocusMode,
  onReset,
  onStart,
  onStop,
}: TimerControlsProps): React.ReactNode => (
  <TimerActionGroup className="px-2 lg:gap-6">
    <FocusModeButton onClick={onFocusMode} />
    <ResetTimerButton onClick={onReset} />
    <PlayPauseButton
      timerStarted={timerStarted}
      onStart={onStart}
      onStop={onStop}
    />
    <PipButton />
    <PomodoroSettings />
  </TimerActionGroup>
);

export default TimerControls;
