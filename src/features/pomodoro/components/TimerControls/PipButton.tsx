import React from "react";
import { PictureInPicture2 } from "lucide-react";
import { Button, Tooltip } from "@/shared/ui";
import {
  openPipWindow,
  isPipSupported,
} from "@/features/pomodoro/services/pip";

const supported = isPipSupported();

const PipButton = (): React.ReactNode => (
  <Tooltip
    content={
      supported ? "Floating Timer" : "Floating timer not supported by browser"
    }
  >
    <Button
      onClick={openPipWindow}
      icon={<PictureInPicture2 />}
      className="rounded-full w-12 !h-12 hidden sm:block"
      variant="icon"
      aria-label="Floating Timer"
      disabled={!supported}
    />
  </Tooltip>
);

export default PipButton;
