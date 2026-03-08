import React from "react";
import { TimerResetIcon } from "lucide-react";
import { Button, Tooltip } from "@/shared/ui";

interface ResetTimerButtonProps {
  onClick: () => void;
  showTooltip?: boolean;
}

const ResetTimerButton = ({ onClick, showTooltip = true }: ResetTimerButtonProps): React.ReactNode => (
  <Tooltip content={showTooltip ? "Reset Timer" : null}>
    <Button
      onClick={onClick}
      icon={<TimerResetIcon />}
      className="rounded-full w-12 !h-12"
      variant="icon"
      aria-label="Reset Timer"
    />
  </Tooltip>
);

export default ResetTimerButton;
