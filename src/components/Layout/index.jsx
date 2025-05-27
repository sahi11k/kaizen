import React from "react";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { Outlet } from "react-router";

const Layout = () => {
  return (
    <React.Fragment>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </React.Fragment>
  );
};

export default Layout;
