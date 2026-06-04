import React from "react";
import { Play, Square } from "lucide-react";
import { Button } from "@/shared/ui";
import { cn } from "@/shared/lib/utils";

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
  className = "h-16 min-w-16 text-base sm:px-8",
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
    className={cn("rounded-full", className)}
  >
    {showLabel && (
      <span className="hidden sm:block">
        {timerStarted ? "Pause" : "Start"}
      </span>
    )}
  </Button>
);

export default PlayPauseButton;
