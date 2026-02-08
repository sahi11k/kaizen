import React, { useEffect } from "react";
import { Outlet } from "react-router";
import useAuthStore from "@/features/auth/store/auth";
import { STATUS } from "@/shared/constants/db";
import PipManager from "@/features/pomodoro/components/PipManager";
import TimerManager from "@/features/pomodoro/components/TimerManager";
import { Toast } from "@/shared/ui/toast";
import { Fallback } from "@/shared/ui/fallback";

const BaseLayout = () => {
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
    <>
      <TimerManager />
      <PipManager />
      <Outlet />
      <Toast />
    </>
  );
};

export default BaseLayout;
