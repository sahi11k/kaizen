import React from "react";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { Outlet } from "react-router";
import { Toast } from "@/utils/components/Toast";
import styles from "./style.module.css";
import AuthLayout from "@/components/Layout/AuthLayout";

const Layout = () => {
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
