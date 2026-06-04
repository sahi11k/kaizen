import React from "react";
import { Maximize } from "lucide-react";
import { Button, Tooltip } from "@/shared/ui";
import { isFullscreenSupported } from "@/features/pomodoro/utils/timerHelpers";

interface FocusModeButtonProps {
  onClick: () => void;
}

const FocusModeButton = ({
  onClick,
}: FocusModeButtonProps): React.ReactNode => (
  <Tooltip content="Focus Mode">
    <Button
      onClick={onClick}
      icon={<Maximize />}
      className="pomodoro-control-button pomodoro-control-button-hidden"
      variant="icon"
      aria-label="Focus Mode"
      disabled={!isFullscreenSupported()}
    />
  </Tooltip>
);

export default FocusModeButton;
