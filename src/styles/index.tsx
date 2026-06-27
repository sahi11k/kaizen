import React from "react";

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
    <div className={className}>
      <div className="flex justify-center gap-2 font-semibold">
        {isPomodoro ? (
          <>
            <span className="text-muted-foreground shrink-0">
              {currentTask
                ? `SESSION #${currentTask.completedSessions + 1} : `
                : ""}
            </span>
            <span className="whitespace-nowrap overflow-hidden text-ellipsis">
              {currentTask?.title || "Focus Time!"}
            </span>
          </>
        ) : (
          <span>Time to Relax</span>
        )}
      </div>
    </div>
  );
};

export default SessionBadge;
