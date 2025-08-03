import { useState } from "react";
import SideNav from "@/components/Layout/SideNav";
import { Outlet } from "react-router";
import styles from "@/components/Layout/style.module.css";
import BaseLayout from "@/components/Layout/BaseLayout";

const DashboardLayout = () => {
  const [sidePanelCollapsed, setSidePanelCollapsed] = useState(false);

  return (
    <BaseLayout
      className={
        !sidePanelCollapsed
          ? styles.baseLayout_collapsed
          : styles.baseLayout_expanded
      }
    >
      <aside className={styles.sidePanel}>
        <SideNav
          isCollapsed={sidePanelCollapsed}
          setIsCollapsed={setSidePanelCollapsed}
        />
      </aside>
      <main className={styles.dashboardContainer}>
        <Outlet />
      </main>
    </BaseLayout>
  );
};

export default DashboardLayout;
