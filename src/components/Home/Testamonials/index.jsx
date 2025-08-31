import React from "react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";

const Testamonials = () => {
  return (
    <section className="bg-primary/10 p-6 flex flex-col justify-center gap-4 rounded-2xl items-center min-h-[300px]">
      <div className="flex flex-col gap-2 items-center justify-center text-center">
        <h2 className="heading-2">Ready to transform your life?</h2>
        <p className="body-description text-center">
          Join thousands of people who are already improving their lives with
          Kaizen.
        </p>
      </div>
      <Link to="/dashboard">
        <Button variant="outline">Get Started</Button>
      </Link>
    </section>
  );
};

export default Testamonials;
