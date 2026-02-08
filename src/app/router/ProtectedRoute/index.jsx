import React from "react";
import useAuthStore from "@/features/auth/store/auth";
import { STATUS } from "@/shared/constants/db";
import { Fallback } from "@/shared/ui/fallback";
import { Navigate } from "react-router";

const ProtectedRoute = ({ children }) => {
  const { user, userFetchStatus } = useAuthStore();

  if (userFetchStatus === STATUS.LOADING) {
    return <Fallback />;
  }

  if (!user) {
    return <Navigate to="/auth/signup" replace />;
  }

  return children;
};

export default ProtectedRoute;
