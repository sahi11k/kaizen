import React from "react";
import { Outlet } from "react-router";
import BaseLayout from "@/layouts/BaseLayout";
import HeaderMain from "@/components/HeaderMain";
import FooterMain from "@/components/FooterMain";

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
