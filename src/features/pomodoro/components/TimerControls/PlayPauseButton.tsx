import React from "react";
import { Play, Square } from "lucide-react";
import { Button } from "@/shared/ui";

interface PlayPauseButtonProps {
  timerStarted: boolean;
  onStart: () => void;
  onStop: () => void;
  className?: string;
  showLabel?: boolean;
}

const PlayPauseButton = ({
  timerStarted,
  onStart,
  onStop,
  className = "!h-16 !min-w-16 sm:!px-8 text-base",
  showLabel = true,
}: PlayPauseButtonProps): React.ReactNode => (
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
);

export default PlayPauseButton;
