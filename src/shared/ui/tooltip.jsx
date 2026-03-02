import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

import { cn } from "@/shared/lib/utils";

function TooltipProvider({ delayDuration = 0, ...props }) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delayDuration={delayDuration}
      {...props}
    />
  );
}

function ShadTooltip({ ...props }) {
  return (
    <TooltipProvider>
      <TooltipPrimitive.Root data-slot="tooltip" {...props} />
    </TooltipProvider>
  );
}

function TooltipTrigger({ ...props }) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />;
}

function TooltipContent({
  className,
  sideOffset = 0,
  children,
  level = "image",
  ...props
}) {
  // level: "image" | "header" | "overlay"
  const levelZ =
    level === "overlay"
      ? "z-[var(--z-tooltip-overlay)]"
      : level === "header"
        ? "z-[var(--z-tooltip-header)]"
        : "z-[var(--z-tooltip-image)]";
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot="tooltip-content"
        sideOffset={sideOffset}
        className={cn(
          "bg-neutral-950 text-white dark:bg-popover dark:text-popover-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 w-fit origin-(--radix-tooltip-content-transform-origin) rounded-lg px-3 py-1.5 text-sm text-balance dark:shadow-md",
          levelZ,
          className,
        )}
        {...props}
      >
        {children}
        <TooltipPrimitive.Arrow className="bg-neutral-950 fill-neutral-950 dark:bg-popover dark:fill-popover size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]" />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  );
}

const Tooltip = ({
  content,
  sideOffset,
  children,
  side = "top",
  align = "center",
  contentClassName = "hidden lg:block",
  ...props
}) => {
  if (content === null) {
    return children;
  }
  return (
    <ShadTooltip {...props}>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent
        sideOffset={sideOffset}
        side={side}
        align={align}
        className={contentClassName}
        level={props.level}
      >
        {content}
      </TooltipContent>
    </ShadTooltip>
  );
};

export { Tooltip };
