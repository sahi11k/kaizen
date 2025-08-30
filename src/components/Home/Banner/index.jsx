import React from "react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";

const Banner = () => {
  return (
    <div className="flex flex-col flex-gap items-center justify-center relative bg-primary-light rounded-2xl min-h-[80vh] p-4">
      <h1 className="heading-1">kaïzen</h1>
      <p className="text-center  md:max-w-2xl">
        Transform your life one small step at a time. Build better habits, track
        your progress, and unlock your full potential through proven
        productivity techniques.
      </p>
      <Link to="/dashboard">
        <Button variant="outline" className="rounded-full">
          Start Your Journey
        </Button>
      </Link>
    </div>
  );
};

export default Banner;
