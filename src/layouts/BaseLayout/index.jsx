import React, { useEffect } from "react";
import useAuthStore from "@/store/auth";
import { STATUS } from "@/constants/db";

import { Toast } from "@/components/ui/toast";
import { Fallback } from "@/components/ui/fallback";

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
