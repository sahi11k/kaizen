import { SidebarLaptop, DashboardHeader } from "@/features/dashboard";
import { Outlet } from "react-router";
import { useState } from "react";

const DashboardLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  return (
    <div className="min-h-screen flex">
      <SidebarLaptop isCollapsed={isCollapsed} />
      <main className="flex-1">
        <DashboardHeader
          setIsCollapsed={setIsCollapsed}
          isCollapsed={isCollapsed}
        />
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
