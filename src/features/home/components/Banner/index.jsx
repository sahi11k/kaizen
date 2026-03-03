import React from "react";
import { Link } from "react-router";
import { Button } from "@/shared/ui";
import { DEFAULT_NAV_ROUTE } from "@/shared/constants";
import BannerIllustration from "@/assets/illustrations/banner.svg?react";

const Banner = () => {
  return (
    <div className="flex flex-col-reverse lg:flex-row items-center justify-center max-w-8xl mx-auto gap-4 lg:gap-12 xl:gap-24  px-6 lg:px-8 xl:px-16 lg:py-32">
      <div className="flex-1 flex flex-col justify-center gap-6 lg:gap-12">
        <h1 className="heading-1 text-center lg:text-left">
          Your journey to <br className="hidden lg:block" />
          <span className="text-primary/50 dark:text-primary/90">
            self-mastery
          </span>
          <br />
          starts here
        </h1>
        <p className="body-base md:max-w-2xl  text-center lg:text-left">
          Transform your life one small step at a time. Build better habits,
          track your progress, and unlock your full potential through proven
          productivity techniques.
        </p>
        <Link to={DEFAULT_NAV_ROUTE} className="mx-auto lg:mx-0 lg:-mt-3">
          <Button className="shadow-none" size="lg">
            Start Your Journey
          </Button>
        </Link>
      </div>
      <div className="h-60 w-60 md:h-80 md:w-80 lg:h-110 lg:w-110 xl:h-130 xl:w-130 dark:opacity-85">
        <BannerIllustration />
      </div>
    </div>
  );
};

export default Banner;
