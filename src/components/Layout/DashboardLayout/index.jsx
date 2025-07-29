import React, { useEffect } from "react";
import styles from "./style.module.css";
import { Outlet } from "react-router";
import useAuthStore from "@/store/auth";
import { STATUS } from "@/utils/constants";
import Fallback from "@/utils/components/Fallback";
import SideNav from "@/components/Layout/SideNav";
import { Toast } from "@/utils/components/Toast";

const DashboardLayout = () => {
  const { userFetchStatus, loadUser } = useAuthStore();

  useEffect(() => {
    if (userFetchStatus === STATUS.LOADING) {
      loadUser();
    }
  }, [loadUser, userFetchStatus]);

  if (userFetchStatus === STATUS.LOADING) {
    return <Fallback />;
  }

  return (
    <>
      <Toast />
      <div className={styles.dashboardLayout}>
        <aside className={styles.sideNav}>
          <SideNav />
        </aside>
        <main className={styles.mainContent}>
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default DashboardLayout;
