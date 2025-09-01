import React from "react";
import SidebarContent from "../SidebarContent";

const SidebarLaptop = ({ isCollapsed }) => {
  return (
    <aside
      className={`sticky top-0 h-screen px-6 flex flex-col space-y-5 border-r border-border transition-all duration-300 ease-in-out hidden lg:flex ${
        isCollapsed ? "w-18" : "w-72"
      }`}
    >
      <SidebarContent isCollapsed={isCollapsed} />
    </aside>
  );
};

export default SidebarLaptop;
