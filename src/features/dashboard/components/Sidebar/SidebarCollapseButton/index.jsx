import React from "react";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { Button, Tooltip } from "@/shared/ui";
import { cn } from "@/shared/lib/utils";

const SidebarCollapseButton = ({ isCollapsed, onToggle, className }) => {
  const toggleLabel = isCollapsed ? "Expand sidebar" : "Collapse sidebar";

  return (
    <Tooltip content={toggleLabel} side="right" level="header">
      <Button
        variant="icon"
        className={cn(
          "pomodoro-control-button !h-8 !w-8 rounded-lg !bg-transparent",
          className,
        )}
        aria-label={toggleLabel}
        aria-expanded={!isCollapsed}
        onClick={onToggle}
        icon={
          isCollapsed ? (
            <PanelLeftOpen className="size-5" />
          ) : (
            <PanelLeftClose className="size-5" />
          )
        }
      />
    </Tooltip>
  );
};

export default SidebarCollapseButton;
