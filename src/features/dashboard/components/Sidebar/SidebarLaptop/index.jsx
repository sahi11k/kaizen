import React, { useEffect, useState } from "react";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import SidebarContent from "../SidebarContent";
import AccountDropdown from "../../AccountDropdown";
import { Button, Tooltip } from "@/shared/ui";
import { cn } from "@/shared/lib/utils";

const DESKTOP_SIDEBAR_QUERY = "(min-width: 1280px)";

const SidebarLaptop = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isDesktopSidebar, setIsDesktopSidebar] = useState(() =>
    typeof window === "undefined"
      ? false
      : window.matchMedia(DESKTOP_SIDEBAR_QUERY).matches,
  );
  const toggleLabel = isCollapsed ? "Expand sidebar" : "Collapse sidebar";
  const sidebarControlClassName =
    "!h-10 w-10 rounded-full !bg-transparent text-sidebar-muted-foreground hover:!bg-transparent hover:!text-primary";

  useEffect(() => {
    const mediaQuery = window.matchMedia(DESKTOP_SIDEBAR_QUERY);
    const handleChange = (event) => setIsDesktopSidebar(event.matches);

    setIsDesktopSidebar(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  if (!isDesktopSidebar) {
    return null;
  }

  const collapseButton = (
    <Tooltip content={toggleLabel} side="right" level="header">
      <Button
        variant="icon"
        className={cn(
          sidebarControlClassName,
          !isCollapsed && "absolute right-8 top-1/2 -translate-y-1/2",
        )}
        aria-label={toggleLabel}
        aria-expanded={!isCollapsed}
        onClick={() => setIsCollapsed((prev) => !prev)}
        icon={
          isCollapsed ? (
            <PanelLeftOpen className="size-6" />
          ) : (
            <PanelLeftClose className="size-6" />
          )
        }
      />
    </Tooltip>
  );

  const accountDropdown = (
    <AccountDropdown
      showUserText={!isCollapsed}
      align="start"
      side="top"
      triggerClassName={cn(
        "text-sidebar-foreground",
        isCollapsed
          ? "justify-center"
          : "min-h-14 w-full overflow-hidden rounded-lg py-3 pr-20 pl-4 hover:bg-sidebar-account-hover",
      )}
      contentClassName="w-64"
      avatarClassName={isCollapsed ? "size-10" : "size-11"}
    />
  );

  return (
    <>
      <div
        className={cn(
          "hidden flex-shrink-0 transition-all duration-300 ease-in-out xl:block",
          isCollapsed ? "w-18" : "w-72",
        )}
      />

      <aside
        className={cn(
          "fixed top-0 left-0 z-[var(--z-sidebar)] hidden h-screen flex-col space-y-6 overflow-hidden border-r-[0.5px] border-sidebar-border bg-sidebar px-6 font-sans text-sidebar-foreground transition-all duration-300 ease-in-out xl:flex",
          isCollapsed ? "w-18" : "w-72",
        )}
      >
        <SidebarContent isCollapsed={isCollapsed} />
        <div
          className={cn(
            "-mx-6 border-t-[0.5px] border-sidebar-border px-4 pt-2 pb-2",
            isCollapsed
              ? "flex flex-col items-center gap-3"
              : "relative flex items-center",
          )}
        >
          {isCollapsed ? (
            <>
              {collapseButton}
              {accountDropdown}
            </>
          ) : (
            <>
              {accountDropdown}
              {collapseButton}
            </>
          )}
        </div>
      </aside>
    </>
  );
};

export default SidebarLaptop;
