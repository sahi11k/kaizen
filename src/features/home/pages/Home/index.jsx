import React from "react";
import Banner from "@/features/home/components/Banner";
import About from "@/features/home/components/About";
import Quote from "@/features/home/components/Quote";
import Testamonials from "@/features/home/components/Testamonials";
import { TAB_TITLES } from "@/shared/constants/routes";
import useTabTitle from "@/shared/hooks/useTabTitle";

const Home = () => {
  useTabTitle(TAB_TITLES.HOME);
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
