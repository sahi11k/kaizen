import React from "react";
import { Link } from "react-router";
import NotFoundIllustration from "@/assets/illustrations/not-found.svg?react";
import { Button } from "@/shared/ui";

const NotFound = () => {
  return (
    <div className="h-full w-full flex justify-center items-center">
      <div className="flex flex-col justify-center items-center gap-6">
        <div className="w-80 md:w-100">
          <NotFoundIllustration />
        </div>
        <div className="flex flex-col items-center justify-center">
          <h2 className="heading-2">Page Not Found</h2>
          <p className="body-description text-center">
            The page you&apos;re looking for doesn&apos;t exist or has been
            moved.
          </p>
        </div>
        <Link to="/">
          <Button>Go Back Home</Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
