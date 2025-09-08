import React from "react";
import Banner from "@/components/Home/Banner";
import About from "@/components/Home/About";
import Quote from "@/components/Home/Quote";
import Testamonials from "@/components/Home/Testamonials";

const Home = () => {
  return (
    <div className="flex flex-col gap-12 m-4 mt-auto">
      <Banner />
      <About />
      <Quote />
      <Testamonials />
    </div>
  );
};

export default Home;
