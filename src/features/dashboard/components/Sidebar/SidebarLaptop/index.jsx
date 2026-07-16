import React, { useEffect, useState } from "react";
import SidebarContent from "../SidebarContent";
import SidebarCollapseButton from "../SidebarCollapseButton";
import AccountDropdown from "../../AccountDropdown";
import { cn } from "@/shared/lib/utils";

const TABLET_SIDEBAR_QUERY = "(min-width: 768px)";
const DESKTOP_TOGGLE_QUERY = "(min-width: 1024px)";

const SidebarLaptop = () => {
  const [userIsCollapsed, setUserIsCollapsed] = useState(false);
  const [isTabletSidebar, setIsTabletSidebar] = useState(() =>
    typeof window === "undefined"
      ? false
      : window.matchMedia(TABLET_SIDEBAR_QUERY).matches,
  );
  const [isDesktopToggle, setIsDesktopToggle] = useState(() =>
    typeof window === "undefined"
      ? false
      : window.matchMedia(DESKTOP_TOGGLE_QUERY).matches,
  );

  useEffect(() => {
    const tabletQuery = window.matchMedia(TABLET_SIDEBAR_QUERY);
    const handleTabletChange = (event) => setIsTabletSidebar(event.matches);

    setIsTabletSidebar(tabletQuery.matches);
    tabletQuery.addEventListener("change", handleTabletChange);

    return () => tabletQuery.removeEventListener("change", handleTabletChange);
  }, []);

  useEffect(() => {
    const desktopQuery = window.matchMedia(DESKTOP_TOGGLE_QUERY);
    const handleDesktopChange = (event) => setIsDesktopToggle(event.matches);

    setIsDesktopToggle(desktopQuery.matches);
    desktopQuery.addEventListener("change", handleDesktopChange);

    return () =>
      desktopQuery.removeEventListener("change", handleDesktopChange);
  }, []);

  if (!isTabletSidebar) {
    return null;
  }

  const isCollapsed = !isDesktopToggle ? true : userIsCollapsed;

  const collapseButton = isDesktopToggle && (
    <SidebarCollapseButton
      isCollapsed={isCollapsed}
      onToggle={() => setUserIsCollapsed((prev) => !prev)}
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
          : "min-h-14 w-full overflow-hidden rounded-lg py-3 pr-10 pl-2 hover:bg-sidebar-account-hover hover:text-sidebar-hover-foreground",
      )}
      contentClassName="w-64"
      avatarClassName={isCollapsed ? "size-10" : "size-11"}
    />
  );

  return (
    <>
      <div
        className={cn(
          "hidden flex-shrink-0 transition-all duration-300 ease-in-out md:block",
          isCollapsed ? "w-18" : "w-72",
        )}
      />

      <aside
        className={cn(
          "fixed top-0 left-0 z-[var(--z-sidebar)] hidden h-screen flex-col space-y-6 overflow-hidden border-r-[0.5px] border-sidebar-border bg-sidebar px-6 pt-3 font-sans text-sidebar-foreground transition-all duration-300 ease-in-out md:flex md:pt-5",
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
