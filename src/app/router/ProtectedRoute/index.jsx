import React from "react";
import useAuthStore from "@/features/auth/store/auth";
import { Fallback } from "@/shared/ui/fallback";
import { Navigate } from "react-router";

const ProtectedRoute = ({ children }) => {
  const { user, isLoading } = useAuthStore();

  if (isLoading) {
    return <Fallback />;
  }

  if (!user) {
    return <Navigate to="/auth/signup" replace />;
  }

  return children;
};

export default ProtectedRoute;
