import React from "react";
import { EmptyState, EmptyStateAction } from "@/shared/ui";

const NotFound = () => {
  return (
    <EmptyState
      code="404"
      title="Page not found"
      description="The page you're looking for doesn't exist or has been moved."
      action={<EmptyStateAction to="/">← Go back home</EmptyStateAction>}
      className="flex items-center justify-center"
    />
  );
};

export default NotFound;
