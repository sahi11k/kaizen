import React from "react";
import SidebarContent from "../SidebarContent";

const SidebarLaptop = () => {
  return (
    <>
      <div className="hidden xl:block w-18 flex-shrink-0" />

      <aside className="fixed top-0 left-0 h-screen px-6 flex flex-col space-y-6 border-r border-border transition-all duration-300 ease-in-out hidden xl:flex bg-background z-[var(--z-sidebar)] w-18 hover:w-64 hover:shadow-xl overflow-hidden">
        <SidebarContent />
      </aside>
    </>
  );
};

export default SidebarLaptop;
