import React from "react";
import Banner from "@/features/home/components/Banner";
import About from "@/features/home/components/About";
import Philosophy from "@/features/home/components/Philosophy";
import { BROWSER_TAB_TITLES } from "@/shared/constants";
import useDocumentTitle from "@/shared/hooks/useDocumentTitle";

const Home = () => {
  useDocumentTitle(BROWSER_TAB_TITLES.HOME);
  return (
    <div className="flex flex-col">
      <Banner />
      <About />
      <Philosophy />
    </div>
  );
};

export default Home;
