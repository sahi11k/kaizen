import React from "react";
import { SidebarMobile } from "@/features/dashboard";
import AccountDropdown from "../AccountDropdown";

const DashboardHeader = () => {
  return (
    <div className="flex md:hidden items-center justify-between px-4 h-16 shrink-0 bg-background border-b border-border/50 z-[var(--z-header)]">
      <SidebarMobile />
      <AccountDropdown avatarClassName="size-9" />
    </div>
  );
};

export default DashboardHeader;
