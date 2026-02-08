import React from "react";
import { Outlet } from "react-router";
import HeaderMain from "@/app/layouts/components/Header";
import FooterMain from "@/app/layouts/components/Footer";

const HomePageLayout = () => {
  return (
    <div className="min-h-screen">
      <HeaderMain />
      <main>
        <Outlet />
      </main>
      <FooterMain />
    </div>
  );
};

export default HomePageLayout;
