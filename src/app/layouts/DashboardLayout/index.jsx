import { SidebarLaptop } from "@/app/layouts/components/Sidebar";
import { Outlet } from "react-router";
import BaseLayout from "@/app/layouts/BaseLayout";
import DashboardHeader from "@/features/dashboard/components/DashboardHeader";
import TimerManager from "@/features/pomodoro/components/TimerManager";
import PipManager from "@/features/pomodoro/components/PipManager";
import { useState } from "react";

const DashboardLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  return (
    <>
      <TimerManager />
      <PipManager />
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
    </>
  );
};

export default DashboardLayout;
