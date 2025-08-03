import React from "react";
import BaseLayout from "@/components/Layout/BaseLayout";
import { Outlet } from "react-router";
import HeaderNav from "@/components/Layout/HeaderNav";
import Footer from "@/components/Layout/Footer";

const HomePageLayout = () => {
  return (
    <BaseLayout>
      <HeaderNav />
      <main>
        <Outlet />
      </main>
      <Footer />
    </BaseLayout>
  );
};

export default HomePageLayout;
