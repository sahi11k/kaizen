import { SidebarLaptop } from "@/components/Dashboard/Sidebar";
import { Outlet } from "react-router";
import BaseLayout from "@/layouts/BaseLayout";
import DashboardHeader from "@/components/Dashboard/DashboardHeader";
import { useState } from "react";

const DashboardLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  return (
    <BaseLayout className="flex">
      <SidebarLaptop isCollapsed={isCollapsed} />
      <main className="flex-1">
        <DashboardHeader
          setIsCollapsed={setIsCollapsed}
          isCollapsed={isCollapsed}
        />
        <Outlet />
      </main>
    </BaseLayout>
  );
};

export default DashboardLayout;
