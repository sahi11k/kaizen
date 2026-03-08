import React from "react";
import { cn } from "@/shared/lib/utils";

interface ProgressRingProps {
  percentage: number;
  fillColor: string;
  unfilledColor: string;
  className?: string;
  children?: React.ReactNode;
}

const ProgressRing: React.FC<ProgressRingProps> = ({
  percentage,
  fillColor,
  unfilledColor,
  className,
  children,
}) => {
  return (
    <div
      className={cn("relative rounded-full", className)}
      style={{
        background: `conic-gradient(${fillColor} ${percentage}%, ${unfilledColor} ${percentage}% 100%)`,
      }}
    >
      <div className="absolute inset-4 bg-background rounded-full flex justify-center items-center">
        {children}
      </div>
    </div>
  );
};

export default ProgressRing;
