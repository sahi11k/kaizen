import React from "react";
import { cn } from "@/shared/lib/utils";

interface TimerActionGroupProps {
  children: React.ReactNode;
  className?: string;
}

const TimerActionGroup = ({
  children,
  className,
}: TimerActionGroupProps): React.ReactNode => (
  <div
    className={cn(
      "flex shrink-0 items-center justify-center gap-4 lg:gap-6",
      className,
    )}
  >
    {children}
  </div>
);

export default TimerActionGroup;
