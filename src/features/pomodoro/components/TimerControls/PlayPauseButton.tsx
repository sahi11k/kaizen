import React from "react";
import { Play, Square } from "lucide-react";
import { Button, Tooltip } from "@/shared/ui";

interface PlayPauseButtonProps {
  timerStarted: boolean;
  onStart: () => void;
  onStop: () => void;
  className?: string;
  showLabel?: boolean;
  showTooltip?: boolean;
}

const PlayPauseButton = ({
  timerStarted,
  onStart,
  onStop,
  className = "!h-16 !min-w-16 sm:!px-8 text-base",
  showLabel = true,
  showTooltip = true,
}: PlayPauseButtonProps): React.ReactNode => (
  <Tooltip content={showTooltip ? (timerStarted ? "Pause Timer" : "Start Timer") : null}>
    <Button
      onClick={timerStarted ? onStop : onStart}
      icon={
        timerStarted ? (
          <Square className="size-4" fill="currentColor" />
        ) : (
          <Play className="size-4" fill="currentColor" />
        )
      }
      className={`rounded-full ${className}`}
    >
      {showLabel && (
        <span className="hidden sm:block">
          {timerStarted ? "Pause" : "Start"}
        </span>
      )}
    </Button>
  </Tooltip>
);

export default PlayPauseButton;
