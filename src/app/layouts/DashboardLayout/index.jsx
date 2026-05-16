import { SidebarLaptop, DashboardHeader } from "@/features/dashboard";
import { Outlet } from "react-router";

const DashboardLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <SidebarLaptop />
      <main className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <DashboardHeader />
        <div className="min-h-0 flex-1 overflow-y-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
