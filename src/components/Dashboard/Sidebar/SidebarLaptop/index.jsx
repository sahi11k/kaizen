import React from "react";
import SidebarContent from "../SidebarContent";

const SidebarLaptop = ({ isCollapsed }) => {
  return (
    <aside
      className={`bg-sidebar sticky top-0 h-screen px-6 flex flex-col space-y-6 border-r border-border transition-all duration-300 ease-in-out hidden xl:flex ${
        isCollapsed ? "w-18" : "w-64"
      }`}
    >
      <SidebarContent isCollapsed={isCollapsed} />
    </aside>
  );
};

export default SidebarLaptop;
