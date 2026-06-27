import React from "react";
import { SidebarMobile } from "@/features/dashboard";
import AccountDropdown from "../AccountDropdown";

const DashboardHeader = () => {
  return (
    <>
      <div className="fixed top-4 left-4 z-[var(--z-header)] xl:hidden">
        <SidebarMobile />
      </div>
      <div className="fixed top-6 right-6 z-[var(--z-header)] xl:hidden">
        <AccountDropdown />
      </div>
    </>
  );
};

export default DashboardHeader;
