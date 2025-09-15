import React from "react";
import Banner from "@/components/Home/Banner";
import About from "@/components/Home/About";
import Quote from "@/components/Home/Quote";
import Testamonials from "@/components/Home/Testamonials";
import { TAB_TITLES } from "@/constants/routes";
import useTabTitle from "@/hooks/useTabTitle";

const Home = () => {
  useTabTitle(TAB_TITLES.HOME);
  return (
    <div className="flex flex-col">
      <Banner />
      <About />
      <Quote />
      <Testamonials />
    </div>
  );
};

export default Home;
