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
import { getUserSession } from "@/db/apis/auth";

const Layout = () => {
  const { userFetchStatus, setUserFetchStatus, setUser } = useAuthStore();

  useEffect(() => {
    const loadUser = async () => {
      const response = await getUserSession();
      if (response.error || !response.data.session) {
        setUser(null);
      } else if (response.data.session) {
        setUser(response.data.session.user);
      }
      setUserFetchStatus(STATUS.FETCHED);
    };
    if (userFetchStatus === STATUS.LOADING) {
      loadUser();
    }
  }, [setUser, setUserFetchStatus, userFetchStatus]);

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

export default Layout;
