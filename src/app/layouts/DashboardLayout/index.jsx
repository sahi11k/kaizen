import { SidebarLaptop, DashboardHeader } from "@/features/dashboard";
import { Outlet } from "react-router";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen flex">
      <SidebarLaptop />
      <main className="flex-1 overflow-hidden">
        <DashboardHeader />
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
