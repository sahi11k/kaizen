import React from "react";
import { Link } from "react-router";
import { Button } from "@/shared/ui/button";
import { DEFAULT_NAV_ROUTE } from "@/shared/constants";

const Testamonials = () => {
  return (
    <section className="bg-primary text-primary-foreground py-12 flex flex-col justify-center gap-4 items-center my-12  ">
      <div className="flex flex-col gap-2 items-center justify-center text-center">
        <h2 className="heading-2">Ready to transform your life?</h2>
        <p className="body-description text-center !text-primary-foreground">
          Start your journey to self-mastery with Kaizen today.
        </p>
      </div>
      <Link to={DEFAULT_NAV_ROUTE}>
        <Button variant="secondary" rounded className="mt-4">
          Get Started
        </Button>
      </Link>
    </section>
  );
};

export default Testamonials;
