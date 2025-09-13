import React from "react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { DEFAULT_NAV_ROUTE } from "@/constants/routes";
import bannerImage from "@/assets/images/banner.gif";

const Banner = () => {
  return (
    <div className="flex items-center justify-center max-w-8xl mx-auto gap-24 py-12 px-16">
      <div className="flex-1 flex flex-col justify-center gap-8">
        <h1 className="heading-1">
          Your Journey to <br />
          <span className="text-primary/60">Self-Mastery</span>
          <br />
          Starts Here
        </h1>
        <p className="body-base md:max-w-2xl mt-8">
          Transform your life one small step at a time. Build better habits,
          track your progress, and unlock your full potential through proven
          productivity techniques.
        </p>
        <Link to={DEFAULT_NAV_ROUTE}>
          <Button rounded size="lg">
            Start Your Journey
          </Button>
        </Link>
      </div>
      <div className="h-xl w-xl flex-1">
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
