import React, { useEffect } from "react";
import { Outlet } from "react-router";
import { useAuthStore } from "@/features/auth";
import PipManager from "@/features/pomodoro/components/PipManager";
import TimerManager from "@/features/pomodoro/components/TimerManager";
import { Toast, Fallback } from "@/shared/ui";

const BaseLayout = () => {
  const { isLoading, user } = useAuthStore();

  useEffect(() => {
    if (user && window.location.href.includes("#")) {
      window.history.replaceState(null, "", window.location.pathname);
    }
  }, [user]);

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
