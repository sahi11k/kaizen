import React from "react";
import { cn } from "@/shared/lib/utils";

const Section = ({ id, eyebrow, title, children, className }) => {
  return (
    <div
      id={id}
      className={cn(
        "max-w-7xl mx-auto flex flex-col gap-12 lg:gap-16 py-16 xl:py-24",
        className,
      )}
    >
      {(eyebrow || title) && (
        <div className="flex flex-col gap-4 max-w-2xl">
          {eyebrow && <span className="text-label">{eyebrow}</span>}
          {title}
        </div>
      )}
      {children}
    </div>
  );
};

export default Section;
