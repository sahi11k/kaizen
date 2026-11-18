import React from "react";
import { TimerResetIcon } from "lucide-react";

import { Button, Tooltip } from "@/shared/ui";

interface ResetTimerProps {
  onClick: () => void;
  showTooltip?: boolean;
}

const ResetTimer = ({
  onClick,
  showTooltip = true,
}: ResetTimerProps): React.ReactNode => (
  <Tooltip content={showTooltip ? "Reset Timer" : null}>
    <Button
      onClick={onClick}
      icon={<TimerResetIcon />}
      className="pomodoro-action-button !size-11 sm:!size-12"
      variant="icon"
      aria-label="Reset Timer"
    />
  </Tooltip>
);

export default ResetTimer;
