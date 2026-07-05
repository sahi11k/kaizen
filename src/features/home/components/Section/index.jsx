import React from "react";
import { cn } from "@/shared/lib/utils";

const Section = ({ id, eyebrow, title, children, className }) => {
  return (
    <div
      id={id}
      className={cn(
        "max-w-7xl mx-auto px-6 lg:px-8 xl:px-0 pt-10 lg:pt-14 pb-10 lg:pb-14 flex flex-col gap-12 lg:gap-16 border-t border-border",
        className,
      )}
    >
      {(eyebrow || title) && (
        <div className="flex flex-col gap-4 max-w-2xl">
          {eyebrow && <span className="label">{eyebrow}</span>}
          {title}
        </div>
      )}
      {children}
    </div>
  );
};

export default Section;
