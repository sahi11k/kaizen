import React from "react";
import { Outlet } from "react-router";
import useAuthStore from "@/features/auth/store/auth";
import PipManager from "@/features/pomodoro/components/PipManager";
import TimerManager from "@/features/pomodoro/components/TimerManager";
import { Toast } from "@/shared/ui/toast";
import { Fallback } from "@/shared/ui/fallback";

const BaseLayout = () => {
  const { isLoading, user } = useAuthStore();

  if (isLoading) {
    return <Fallback />;
  }

  return (
    <>
      {user && (
        <>
          <TimerManager />
          <PipManager />
        </>
      )}
      <Outlet />
      <Toast />
    </>
  );
};

export default BaseLayout;
