import React from "react";
import { Link } from "react-router";
import { Button } from "@/shared/ui";
import { DEFAULT_NAV_ROUTE } from "@/shared/constants";
import Metrics from "@/features/home/components/Metrics";
import dashboardLight from "@/assets/images/dashboard-light.png";
import dashboardDark from "@/assets/images/dashboard-dark.png";

const Banner = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-6 lg:px-8 xl:px-0 pt-16 lg:pt-24 pb-10 lg:pb-14 flex flex-col gap-16 lg:gap-24">
      <div className="flex flex-col lg:flex-row items-start">
        <div className="flex-3 flex flex-col gap-6 lg:gap-8 max-w-2xl">
          <div className="flex flex-col gap-6">
            <span className="label inline-flex w-fit items-center gap-2 rounded-lg border border-border px-4 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              Personal Productivity
            </span>
            <h1 className="font-serif font-normal leading-none text-4xl lg:text-6xl xl:text-7xl">
              One place to focus,
              <br />
              <span className="italic text-primary">reflect, and grow</span>
            </h1>
          </div>
          <p className="body-base max-w-xl text-muted-foreground">
            Kaizen ties together your focus sessions, journal, reading list, and
            task tracking into a single quiet view — so you can see how your
            time is actually being spent.
          </p>

          <div className="flex items-center gap-6 mt-2">
            <Link to={DEFAULT_NAV_ROUTE}>
              <Button size="lg" className="shadow-none">
                Get started
              </Button>
            </Link>
            <a href="#about">
              <Button size="lg" variant="outline" className="shadow-none">
                See what&apos;s inside
              </Button>
            </a>
          </div>
        </div>
        <div className="hidden lg:flex flex-1 justify-end lg:mt-10 xl:mt-12">
          <DashboardPreview />
        </div>
      </div>
      <Metrics />
    </div>
  );
};

const DashboardPreview = () => {
  return (
    <div className="w-full max-w-lg rounded-lg border border-border overflow-hidden shadow-sm">
      <img
        src={dashboardLight}
        alt="Kaizen dashboard"
        className="block dark:hidden w-full h-auto -mt-0.5"
      />
      <img
        src={dashboardDark}
        alt="Kaizen dashboard"
        className="hidden dark:block w-full h-auto -mt-0.5"
      />
    </div>
  );
};

export default Banner;
