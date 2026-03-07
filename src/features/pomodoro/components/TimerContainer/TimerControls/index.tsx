import React from "react";
import {
  openPipWindow,
  isPipSupported,
} from "@/features/pomodoro/services/pip";
import { Button, Tooltip } from "@/shared/ui";
import { Play, Square, TimerResetIcon, PictureInPicture2 } from "lucide-react";
import PomoSettings from "@/features/pomodoro/components/PomodoroSettings";

interface TimerControlsProps {
  timerStarted: boolean;
  onReset: () => void;
  onStart: () => void;
  onStop: () => void;
}

const TimerControls: React.FC<TimerControlsProps> = ({
  timerStarted,
  onReset,
  onStart,
  onStop,
}) => {
  return (
    <div className="flex justify-center items-center gap-6 relative rounded-full w-fit mx-auto px-6">
      <Tooltip content="Reset Timer">
        <Button
          onClick={onReset}
          icon={<TimerResetIcon />}
          className="rounded-full w-12 !h-12"
          variant="icon"
          aria-label="Reset Timer"
        />
      </Tooltip>
      <Tooltip content={timerStarted ? "Pause Timer" : "Start Timer"}>
        <Button
          onClick={timerStarted ? onStop : onStart}
          icon={
            timerStarted ? (
              <Square className="size-4" fill="currentColor" />
            ) : (
              <Play className="size-4" fill="currentColor" />
            )
          }
          className="rounded-full !h-16 !min-w-16 sm:!px-8 text-base"
        >
          <span className="hidden sm:block">
            {timerStarted ? "Pause" : "Start"}
          </span>
        </Button>
      </Tooltip>
      <PomoSettings />
      {isPipSupported() && (
        <div className="hidden md:block absolute right-0 translate-x-full pl-6">
          <Tooltip content="Floating Timer">
            <Button
              onClick={openPipWindow}
              icon={<PictureInPicture2 />}
              className="rounded-full w-12 !h-12"
              variant="icon"
              aria-label="Floating Timer"
            />
          </Tooltip>
        </div>
      )}
    </div>
  );
};

export default TimerControls;
