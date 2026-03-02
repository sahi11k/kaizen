import React from "react";
import { Outlet } from "react-router";
import { HeaderMain, FooterMain } from "@/features/home";

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
