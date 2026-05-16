import React, { useEffect, useRef } from "react";
import { Outlet } from "react-router";
import { useAuthStore } from "@/features/auth";
import useJournalsStore from "@/features/journals/store";
import PipManager from "@/features/pomodoro/components/Pip/Manager";
import TimerStateManager from "@/features/pomodoro/components/TimerStateManager";
import { Toast, Fallback } from "@/shared/ui";

const BaseLayout = () => {
  const { isLoading, user } = useAuthStore();
  const resetJournals = useJournalsStore((state) => state.resetJournals);
  const previousUserIdRef = useRef(undefined);

  useEffect(() => {
    if (user && window.location.href.includes("#")) {
      window.history.replaceState(null, "", window.location.pathname);
    }
  }, [user]);

  useEffect(() => {
    if (isLoading) return;

    const previousUserId = previousUserIdRef.current;
    const currentUserId = user?.id ?? null;

    if (previousUserId !== undefined && previousUserId !== currentUserId) {
      resetJournals();
    }

    previousUserIdRef.current = currentUserId;
  }, [isLoading, resetJournals, user?.id]);

  if (isLoading) {
    return <Fallback />;
  }

  return (
    <>
      {user && (
        <>
          <TimerStateManager />
          <PipManager />
        </>
      )}
      <Outlet />
      <Toast />
    </>
  );
};

export default BaseLayout;
