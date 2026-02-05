import React, { useEffect } from "react";
import useAuthStore from "@/features/auth/store/auth";
import { STATUS } from "@/shared/constants/db";

import { Toast } from "@/shared/ui/toast";
import { Fallback } from "@/shared/ui/fallback";

const BaseLayout = ({ children, className = "" }) => {
  const { userFetchStatus, loadUser, user } = useAuthStore();

  useEffect(() => {
    if (userFetchStatus === STATUS.LOADING && !user) {
      loadUser();
    }
  }, [loadUser, userFetchStatus, user]);

  if (userFetchStatus === STATUS.LOADING) {
    return <Fallback />;
  }

  return (
    <div className={`min-h-screen ${className}`}>
      {children}
      <Toast />
    </div>
  );
};

export default BaseLayout;
