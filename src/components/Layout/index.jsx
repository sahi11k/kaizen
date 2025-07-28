import React, { useEffect } from "react";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { Outlet } from "react-router";
import { Toast } from "@/utils/components/Toast";
import styles from "./style.module.css";
import AuthLayout from "@/components/Layout/AuthLayout";
import useAuthStore from "@/store/auth";
import Fallback from "@/utils/components/Fallback";
import { STATUS } from "@/utils/constants";
import DashboardLayout from "@/components/Layout/DashboardLayout";

const Layout = () => {
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
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

Layout.Auth = AuthLayout;
Layout.Dashboard = DashboardLayout;

export default Layout;
