import React from "react";
import { cn } from "@/shared/lib/utils";

interface SessionBadgeProps {
  isPomodoro: boolean;
  currentTask: { completedSessions: number; title: string } | null;
  className?: string;
}

const SessionBadge = ({
  isPomodoro,
  currentTask,
  className,
}: SessionBadgeProps): React.ReactNode => {
  return (
    <div className={cn("bg-muted py-2 px-6 rounded-full", className)}>
      <div className="flex items-center justify-center gap-2 font-semibold">
        {isPomodoro ? (
          <>
            <span className="text-muted-foreground shrink-0">
              {currentTask
                ? `Session #${currentTask.completedSessions + 1} : `
                : ""}
            </span>
            <span className="whitespace-nowrap overflow-hidden text-ellipsis">
              {currentTask?.title || "Focus Time!"}
            </span>
          </>
        ) : (
          <span>Yay! Break Time</span>
        )}
      </div>
    </div>
  );
};

export default SessionBadge;
