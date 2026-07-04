import React from "react";
import { cn } from "@/shared/lib/utils";
import {
  getSessionIndicators,
  getSessionProgress,
} from "@/features/pomodoro/utils";

interface SessionBadgeProps {
  isPomodoro: boolean;
  currentTask: {
    completedSessions: number;
    title: string;
    totalSessions: number;
  } | null;
  className?: string;
}

const dotClassNames = {
  active: "bg-primary scale-125 shadow-[0_0_0_3px_var(--primary-soft)]",
  completed: "bg-primary/45",
  upcoming: "bg-muted-foreground/25",
};

const SessionBadge = ({
  isPomodoro,
  currentTask,
  className,
}: SessionBadgeProps): React.ReactNode => {
  const sessionProgress = currentTask
    ? getSessionProgress(
        currentTask.completedSessions,
        currentTask.totalSessions,
      )
    : null;
  const sessionIndicators = currentTask
    ? getSessionIndicators(
        currentTask.completedSessions,
        currentTask.totalSessions,
      )
    : [];

  return (
    <div className={cn("flex flex-col items-center gap-2.5", className)}>
      <div className="flex max-w-full justify-center gap-2 font-semibold">
        {isPomodoro ? (
          <>
            {sessionProgress && (
              <span className="label-overline shrink-0">
                {sessionProgress.isExtraSession
                  ? `Extra session ${sessionProgress.nextSession}`
                  : `Session ${sessionProgress.currentSession} of ${sessionProgress.totalSessions}`}
              </span>
            )}
            <span className="whitespace-nowrap overflow-hidden text-ellipsis text-xs">
              {currentTask?.title || "Focus Time!"}
            </span>
          </>
        ) : (
          <span className="label-overline">Time to Relax</span>
        )}
      </div>
      <div
        className="flex h-3 max-w-full items-center justify-center gap-2"
        aria-hidden={!isPomodoro || sessionIndicators.length === 0}
        aria-label={
          isPomodoro && sessionProgress
            ? `Session ${sessionProgress.currentSession} of ${sessionProgress.totalSessions}`
            : undefined
        }
      >
        {isPomodoro && sessionIndicators.length > 0
          ? sessionIndicators.map((indicator) => (
              <span
                key={indicator.index}
                className={cn(
                  "size-2 shrink-0 rounded-full transition-all",
                  dotClassNames[indicator.state],
                )}
              />
            ))
          : null}
      </div>
    </div>
  );
};

export default SessionBadge;
