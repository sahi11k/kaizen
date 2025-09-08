import React from "react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { DEFAULT_NAV_ROUTE } from "@/constants/routes";

const Banner = () => {
  return (
    <div className="flex flex-col flex-gap items-center justify-center relative bg-primary text-primary-foreground rounded-2xl min-h-[80vh] p-4">
      <h1 className="heading-1">kaïzen</h1>
      <p className="body-base text-center md:max-w-2xl">
        Transform your life one small step at a time. Build better habits, track
        your progress, and unlock your full potential through proven
        productivity techniques.
      </p>
      <Link to={DEFAULT_NAV_ROUTE}>
        <Button variant="secondary" className="font-semibold !h-12 ">
          Start Your Journey
        </Button>
      </Link>
    </div>
  );
};

export default Banner;
