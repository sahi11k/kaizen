import React from "react";
import useAuthStore from "@/store/auth";
import { STATUS } from "@/utils/constants";
import Fallback from "@/utils/components/Fallback";
import { Navigate } from "react-router";

const ProtectedRoute = ({ children }) => {
  const { user, userFetchStatus } = useAuthStore();

  if (userFetchStatus === STATUS.LOADING) {
    return <Fallback />;
  }

  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
