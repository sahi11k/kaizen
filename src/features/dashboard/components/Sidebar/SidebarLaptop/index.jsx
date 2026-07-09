import React, { useEffect, useState } from "react";
import SidebarContent from "../SidebarContent";
import SidebarCollapseButton from "../SidebarCollapseButton";
import AccountDropdown from "../../AccountDropdown";
import { cn } from "@/shared/lib/utils";

const DESKTOP_SIDEBAR_QUERY = "(min-width: 1280px)";

const SidebarLaptop = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isDesktopSidebar, setIsDesktopSidebar] = useState(() =>
    typeof window === "undefined"
      ? false
      : window.matchMedia(DESKTOP_SIDEBAR_QUERY).matches,
  );

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
    <SidebarCollapseButton
      isCollapsed={isCollapsed}
      onToggle={() => setIsCollapsed((prev) => !prev)}
      className={cn(
        !isCollapsed && "absolute right-5 top-1/2 -translate-y-1/2",
      )}
    />
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
          : "min-h-14 w-full overflow-hidden rounded-lg py-3 pr-10 pl-2 hover:bg-sidebar-account-hover",
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
          "fixed top-0 left-0 z-[var(--z-sidebar)] hidden h-screen flex-col space-y-6 overflow-hidden border-r-[0.5px] border-sidebar-border bg-sidebar px-6 pt-3 font-sans text-sidebar-foreground transition-all duration-300 ease-in-out md:pt-5 xl:flex",
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
