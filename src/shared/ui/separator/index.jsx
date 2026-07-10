import React from "react";
import { cn } from "@/shared/lib/utils";

export const Separator = ({ className }) => {
  return (
    <hr
      className={cn(
        "w-full max-w-7xl mx-auto border-t border-border",
        className,
      )}
    />
  );
};
