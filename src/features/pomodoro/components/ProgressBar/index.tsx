import React from "react";
import { cn } from "@/shared/lib/utils";

interface ProgressBarProps {
  percentage: number;
  fillColor: string;
  unfilledColor: string;
  className?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  percentage,
  fillColor,
  unfilledColor,
  className,
}) => {
  return (
    <div
      className={cn("w-full h-2 overflow-hidden", className)}
      style={{ backgroundColor: unfilledColor }}
    >
      <div
        className="h-full transition-all duration-1000 ease-linear"
        style={{ width: `${percentage}%`, backgroundColor: fillColor }}
      />
    </div>
  );
};

export default ProgressBar;
