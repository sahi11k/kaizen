import React from "react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { DEFAULT_NAV_ROUTE } from "@/constants/routes";
import bannerImage from "@/assets/illustrations/banner.gif";

const Banner = () => {
  return (
    <div className="flex flex-col-reverse lg:flex-row items-center justify-center max-w-8xl mx-auto gap-6 lg:gap-12 px-6 lg:px-8 xl:px-16 xl:gap-24 lg:py-24">
      <div className="flex-1 flex flex-col justify-center gap-6 lg:gap-12">
        <h1 className="heading-1 text-center lg:text-left">
          Your Journey to <br className="hidden lg:block" />
          <span className="text-primary/60">Self-Mastery</span>
          <br />
          Starts Here
        </h1>
        <p className="body-base md:max-w-2xl  text-center lg:text-left">
          Transform your life one small step at a time. Build better habits,
          track your progress, and unlock your full potential through proven
          productivity techniques.
        </p>
        <Link to={DEFAULT_NAV_ROUTE} className="mx-auto lg:mx-0 lg:-mt-4">
          <Button rounded size="lg">
            Start Your Journey
          </Button>
        </Link>
      </div>
      <div className="h-60 w-60 md:h-80 md:w-80 lg:h-110 lg:w-110 xl:h-140 xl:w-140">
        <img
          src={bannerImage}
          alt="Banner"
          className="mix-blend-multiply object-contain h-full w-full"
        />
      </div>
    </div>
  );
};

export default Banner;
