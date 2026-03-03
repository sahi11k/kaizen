import React from "react";
import Banner from "@/features/home/components/Banner";
import About from "@/features/home/components/About";
import Quote from "@/features/home/components/Quote";
import Testamonials from "@/features/home/components/Testamonials";
import { BROWSER_TAB_TITLES } from "@/shared/constants";
import useDocumentTitle from "@/shared/hooks/useDocumentTitle";

const Home = () => {
  useDocumentTitle(BROWSER_TAB_TITLES.HOME);
  return (
    <div className="flex flex-col gap-6">
      <Banner />
      <About />
      <Quote />
      <Testamonials />
    </div>
  );
};

export default Home;
