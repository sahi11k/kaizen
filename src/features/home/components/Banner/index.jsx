import React from "react";
import { Link } from "react-router";
import { Button, Reveal } from "@/shared/ui";
import { DEFAULT_NAV_ROUTE } from "@/shared/constants";
import dashboardLight from "@/assets/images/dashboard-light.png";
import dashboardDark from "@/assets/images/dashboard-dark.png";

const Banner = () => {
  return (
    <div className="w-full max-w-7xl mx-auto h-screen flex items-center justify-center">
      <div className="flex h-[70%] gap-16 items-center justify-center">
        <div className="flex-2 flex flex-col gap-6">
          <Reveal delay={0}>
            <div className="flex flex-col gap-6">
              <span className="text-label inline-flex w-fit items-center gap-2 rounded-lg border border-border px-4 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Personal Productivity
              </span>
              <h1 className="heading-1">
                One place to <br /> focus, <br />
                <span className="italic text-primary">
                  reflect, and <br /> grow
                </span>
              </h1>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <p className="body-base max-w-xl text-muted-foreground">
              Kaizen ties together your focus sessions, journal, reading list,
              and task tracking into a single quiet view — so you can see how
              your time is actually being spent.
            </p>
          </Reveal>

          <Reveal delay={200}>
            <div className="flex items-center gap-6 mt-2">
              <Link to={DEFAULT_NAV_ROUTE}>
                <Button className="shadow-none">Get started</Button>
              </Link>
              <a href="#about">
                <Button variant="outline" className="shadow-none">
                  See what&apos;s inside
                </Button>
              </a>
            </div>
          </Reveal>
        </div>
        <div className="flex-3">
          <Reveal delay={150} className="relative">
            <div
              aria-hidden="true"
              className="absolute -inset-x-4 -inset-y-6 -z-10 rounded-full bg-primary/5 blur-[80px]"
            />
            <div className="rounded-lg border border-border overflow-hidden shadow-sm p-4 pb-6 bg-background">
              <img
                src={dashboardLight}
                alt="Kaizen dashboard"
                className="block dark:hidden w-full h-auto"
              />
              <img
                src={dashboardDark}
                alt="Kaizen dashboard"
                className="hidden dark:block w-full h-auto"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
};

export default Banner;
