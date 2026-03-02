import React from "react";
import { useAuthStore } from "@/features/auth";
import { Navigate } from "react-router";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuthStore();

  if (!user) {
    return <Navigate to="/auth/signup" replace />;
  }

  return children;
};

export default ProtectedRoute;
