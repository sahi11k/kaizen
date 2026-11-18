import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

import { cn } from "@/shared/lib/utils";

function TooltipProvider({
  delayDuration = 0,
  ...props
}: React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Provider> & {
  delayDuration?: number;
}): React.ReactElement {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delayDuration={delayDuration}
      {...props}
    />
  );
}

function ShadTooltip(
  props: React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Root>,
): React.ReactElement {
  return (
    <TooltipProvider>
      <TooltipPrimitive.Root data-slot="tooltip" {...props} />
    </TooltipProvider>
  );
}

function TooltipTrigger(
  props: React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Trigger>,
): React.ReactElement {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />;
}

type TooltipLevel = "image" | "header" | "overlay";

interface TooltipContentProps extends React.ComponentPropsWithoutRef<
  typeof TooltipPrimitive.Content
> {
  level?: TooltipLevel;
}

function TooltipContent({
  className,
  sideOffset = 6,
  children,
  level = "image",
  ...props
}: TooltipContentProps): React.ReactElement {
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
          "bg-foreground text-background animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 w-fit origin-(--radix-tooltip-content-transform-origin) rounded-lg p-2 py-1.5 text-xs font-medium text-balance dark:shadow-md",
          levelZ,
          className,
        )}
        {...props}
      >
        {children}
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  );
}

interface TooltipProps extends React.ComponentPropsWithoutRef<
  typeof TooltipPrimitive.Root
> {
  content: React.ReactNode | null;
  sideOffset?: number;
  side?: "top" | "bottom" | "left" | "right";
  align?: "start" | "center" | "end";
  contentClassName?: string;
  level?: TooltipLevel;
  children: React.ReactNode;
}

const Tooltip = ({
  content,
  sideOffset,
  children,
  side = "top",
  align = "center",
  contentClassName = "hidden lg:block",
  level,
  ...props
}: TooltipProps): React.ReactElement => {
  if (content === null) {
    return <>{children}</>;
  }
  return (
    <ShadTooltip {...props}>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent
        sideOffset={sideOffset}
        side={side}
        align={align}
        className={contentClassName}
        level={level}
      >
        {content}
      </TooltipContent>
    </ShadTooltip>
  );
};

export { Tooltip };
export type { TooltipProps, TooltipContentProps, TooltipLevel };
