import React from "react";
import { Outlet } from "react-router";
import BaseLayout from "@/app/layouts/BaseLayout";
import HeaderMain from "@/app/layouts/components/Header";
import FooterMain from "@/app/layouts/components/Footer";

const HomePageLayout = () => {
  return (
    <BaseLayout>
      <HeaderMain />
      <main>
        <Outlet />
      </main>
      <FooterMain />
    </BaseLayout>
  );
};

export default HomePageLayout;
